#!/usr/bin/env bash
# Deploys the built site to a DirectAdmin "Setup Node.js App" over SSH.
#
#   bun run build
#   DEPLOY_HOST=server.example DEPLOY_USER=jbcc DEPLOY_APP_DIR=jbcc-staging scripts/deploy.sh
#
# Required: DEPLOY_HOST, DEPLOY_USER, DEPLOY_APP_DIR (application root, relative to the
# account's home directory, exactly as entered in "Setup Node.js App").
# Optional: DEPLOY_PORT (default 22), DEPLOY_SSH_KEY_FILE (private key; default ssh config).
#
# Only app.js, server/, public/ and nitro.json are replaced. The previous release is kept
# in .previous/ for rollback, and tmp/restart.txt is touched so Passenger restarts the app.
set -euo pipefail

: "${DEPLOY_HOST:?Set DEPLOY_HOST}"
: "${DEPLOY_USER:?Set DEPLOY_USER}"
: "${DEPLOY_APP_DIR:?Set DEPLOY_APP_DIR}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"

if [[ ! "$DEPLOY_APP_DIR" =~ ^[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)*$ ]] || [[ "$DEPLOY_APP_DIR" == *..* ]]; then
  echo "DEPLOY_APP_DIR must be a path inside the home directory, e.g. jbcc-staging" >&2
  exit 1
fi

root="$(cd "$(dirname "$0")/.." && pwd)"
if [ ! -f "$root/.output/server/index.mjs" ] || ! grep -q '"node-middleware"' "$root/.output/nitro.json"; then
  echo "No Node build found. Run 'bun run build' first." >&2
  exit 1
fi

bundle="$root/.deploy"
rm -rf "$bundle"
mkdir -p "$bundle"
cp -R "$root/.output/server" "$root/.output/public" "$root/.output/nitro.json" "$bundle/"
cp "$root/deploy/app.js" "$bundle/app.js"

ssh_args=(-p "$DEPLOY_PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes)
if [ -n "${DEPLOY_SSH_KEY_FILE:-}" ]; then ssh_args+=(-i "$DEPLOY_SSH_KEY_FILE" -o IdentitiesOnly=yes); fi

# Runs on the server. The archive arrives on stdin; the script travels base64-encoded in the
# command so the two never compete for the same stream.
remote_script=$(cat <<'REMOTE'
set -euo pipefail
cd "$HOME"
mkdir -p "$APP_DIR"
cd "$APP_DIR"
rm -rf .incoming
mkdir .incoming
tar -xzf - -C .incoming
rm -rf .previous
mkdir .previous
for item in app.js server public nitro.json; do
  if [ -e "$item" ]; then mv "$item" .previous/; fi
  mv ".incoming/$item" .
done
rm -rf .incoming
mkdir -p tmp
touch tmp/restart.txt
echo "Deployed $(date -u +%Y-%m-%dT%H:%M:%SZ); previous release kept in $(pwd)/.previous"
REMOTE
)
encoded=$(printf '%s' "$remote_script" | base64 | tr -d '\r\n')

echo "Deploying to ${DEPLOY_USER}@${DEPLOY_HOST}:~/${DEPLOY_APP_DIR}"
tar -czf - -C "$bundle" . | ssh "${ssh_args[@]}" "${DEPLOY_USER}@${DEPLOY_HOST}" \
  "APP_DIR='${DEPLOY_APP_DIR}' bash -c \"\$(echo ${encoded} | base64 -d)\""

rm -rf "$bundle"
