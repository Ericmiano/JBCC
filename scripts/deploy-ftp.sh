#!/usr/bin/env bash
# Deploys the built site to a DirectAdmin "Setup Node.js App" over FTPS. HostAfrica's shared
# hosting allows no SSH from outside, so files go up by FTP and the app restarts when
# tmp/restart.txt is re-uploaded.
#
#   bun run build
#   FTP_USER=deploy@jbcc.co.ke FTP_PASSWORD=... DEPLOY_APP_DIR=jbcc-staging scripts/deploy-ftp.sh
#
# DEPLOY_APP_DIR is the application root relative to the FTP account's home (the deploy account
# opens at domains/jbcc.co.ke). FTP_HOST defaults to jbcc.co.ke.
#
# Only files whose SHA-256 differs from the manifest left by the last deploy are uploaded.
# shortcut: files removed from the build stay on the server (old hashed assets are harmless);
# clear the folder in File Manager and redeploy if it ever needs tidying.
set -euo pipefail

: "${FTP_USER:?Set FTP_USER}"
: "${FTP_PASSWORD:?Set FTP_PASSWORD}"
: "${DEPLOY_APP_DIR:?Set DEPLOY_APP_DIR}"
host="${FTP_HOST:-jbcc.co.ke}"

if [[ ! "$DEPLOY_APP_DIR" =~ ^[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)*$ ]] || [[ "$DEPLOY_APP_DIR" == *..* ]]; then
  echo "DEPLOY_APP_DIR must be a path inside the FTP account, e.g. jbcc-staging" >&2
  exit 1
fi

root="$(cd "$(dirname "$0")/.." && pwd)"
if [ ! -f "$root/.output/server/index.mjs" ] || ! grep -q '"node-middleware"' "$root/.output/nitro.json"; then
  echo "No Node build found. Run 'bun run build' first." >&2
  exit 1
fi

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
bundle="$work/bundle"
mkdir -p "$bundle"
cp -R "$root/.output/server" "$root/.output/public" "$root/.output/nitro.json" "$bundle/"
cp "$root/deploy/app.js" "$root/deploy/package.json" "$bundle/"
# Windows sha256sum marks binary mode with "*"; normalise so manifests match across machines.
(cd "$bundle" && find . -type f -print0 | sort -z | xargs -0 sha256sum) | sed 's/ \*\.\//  .\//' > "$work/manifest"

# Credentials go in a netrc file so they never appear in a process list.
printf 'machine %s login "%s" password "%s"\n' "$host" "$FTP_USER" "$FTP_PASSWORD" > "$work/netrc"
chmod 600 "$work/netrc"
base="ftp://$host/$DEPLOY_APP_DIR"
ftp() { curl -sS -g --netrc-file "$work/netrc" --ssl-reqd --ftp-create-dirs --retry 5 --retry-all-errors --retry-delay 3 "$@"; }

if ! ftp -o "$work/previous" "$base/.deploy-manifest" 2>/dev/null; then : > "$work/previous"; fi
# Static files first, then server code, then the startup file, so a request mid-deploy finds
# assets before the code that references them.
comm -13 <(sort "$work/previous") <(sort "$work/manifest") | sed 's/^[0-9a-f]*  \.\///' \
  | awk '{ print (/^public\// ? 1 : /^server\// ? 2 : 3) "\t" $0 }' | sort -s -k1,1n | cut -f2- > "$work/changed"
echo "Deploying to $host:$DEPLOY_APP_DIR — $(wc -l < "$work/changed") of $(wc -l < "$work/manifest") files changed"

# Paths inside a curl config file are not translated by Git Bash, so give Windows curl a Windows path.
bundle_path="$bundle"
if command -v cygpath >/dev/null; then bundle_path="$(cygpath -m "$bundle")"; fi
cp "$work/changed" "$work/pending"
for round in 1 2 3 4 5; do
  [ -s "$work/pending" ] || break
  : > "$work/config"
  while IFS= read -r file; do printf 'upload-file = "%s"\nurl = "%s/%s"\n' "$bundle_path/$file" "$base" "$file" >> "$work/config"; done < "$work/pending"
  # Carry on past failed files; each is retried in the next round.
  ftp -K "$work/config" -w '%{http_code} %{url}\n' > "$work/log" 2>/dev/null || true
  grep '^226 ' "$work/log" | sed "s|^226 $base/||" | sort > "$work/done" || true
  sort "$work/pending" | comm -23 - "$work/done" > "$work/left"
  mv "$work/left" "$work/pending"
  echo "round $round: $(wc -l < "$work/pending") files left"
done
if [ -s "$work/pending" ]; then
  echo "These files did not upload; the app was not restarted:" >&2
  cat "$work/pending" >&2
  exit 1
fi

ftp -T "$work/manifest" "$base/.deploy-manifest" -o /dev/null
date -u +%Y-%m-%dT%H:%M:%SZ > "$work/restart.txt"
ftp -T "$work/restart.txt" "$base/tmp/restart.txt" -o /dev/null
echo "Deployed and restarted $(cat "$work/restart.txt")"
