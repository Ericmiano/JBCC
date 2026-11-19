# JBCC website

A responsive website redesign for the Joint Building & Construction Council of
Kenya. The site presents the Council's work, constituent bodies, resources,
events, and Secretariat contact details.

## Development

Install dependencies with Bun, then start the Vite development server:

```sh
bun install
bun run dev
```

## Project commands

- `bun run build` — create a production build.
- `bun run test:e2e` — run the Playwright end-to-end suite in Chromium. The
  suite expects Ask JBCC switched on, so start the dev server against the test
  gateway: `node tests/support/stub-gateway.mjs &` then
  `ASK_GATEWAY_URL=http://localhost:9911/anthropic bun run dev`. CI does the same.
- `bun run test:a11y` — run the accessibility regression suite in Chromium,
  Firefox, and WebKit. Install the engines first with
  `bunx playwright install chromium firefox webkit`. Pull requests run this
  suite in all three engines through `.github/workflows/accessibility.yml`.
- `bun run test:lighthouse` — run the mobile Lighthouse checks against the
  local preview server.
- `bun run lint` — check source formatting and lint rules.
- `node --test tests/deploy/server.test.mjs` — check the production server's security headers,
  request limits, sitemap and 404s. Needs the production build running (see
  Deploying).
- `node scripts/stress.mjs <url> <visitors> <seconds>` — load test. Fails on any
  5xx response or a p95 latency over one second. Set `STRESS_AUTH=user:password`
  for the staging site.

## Ask JBCC

`/ask` lets visitors ask about the site's published documents, pages,
seminars, and policies. The server sends the question, together with every
entry in `src/lib/ask/knowledge.ts` as citable search results, to the answer
service through a Cloudflare gateway. Answers list only citations that point at known
site links. Keep `knowledge.ts` in step with page content when pages change.

Set these as environment variables in DirectAdmin's "Setup Node.js App"
screen, or in your shell for local development:

| Name | Required | Purpose |
|---|---|---|
| `ASK_GATEWAY_URL` | One of these | Full endpoint, `https://gateway.ai.cloudflare.com/v1/<account>/<gateway>/anthropic` |
| `CLOUDFLARE_ACCOUNT_ID` and `ASK_GATEWAY_ID` | One of these | Used to build the endpoint when `ASK_GATEWAY_URL` is unset |
| `ASK_GATEWAY_TOKEN` | If the gateway is authenticated | Sent as `cf-aig-authorization` |
| `ASK_API_KEY` | Unless the key is stored in the gateway | API key for the answer service (Anthropic) |

Without a gateway, Ask JBCC is hidden: it leaves the navigation, search and the
privacy and terms pages, and `/ask` returns 404. It appears once
`ASK_GATEWAY_URL` (or the account and gateway IDs) is set and the app restarts;
add `/ask` back to `public/sitemap.xml` then. Configure rate limiting and caching on the
gateway; the site's own limit of six questions per visitor every five
minutes applies per server process only.

## Deploying

The site runs on DirectAdmin as a Node.js app (Passenger). `bun run build`
produces a self-contained server in `.output/`; `deploy/app.js` is the startup
file that wraps it, and `deploy/package.json` marks it as CommonJS so a
`"type": "module"` file higher up can't break it; `scripts/deploy.sh` copies
them to the server over SSH, keeps the previous release in `.previous/`, and
restarts the app.

`deploy/app.js` also sets the security headers (a same-origin Content Security
Policy, HSTS, no framing, nosniff), refuses methods other than GET, HEAD and
POST, caps request bodies at 64 KB, and works out each visitor's address for
the Ask JBCC rate limit from the proxy, not from headers the visitor sends.

To run the production build locally, as CI does for Lighthouse:

```sh
bun run build
cp deploy/app.js deploy/package.json .output/
PORT=4173 node .output/app.js
```

### One-time server setup

1. In DirectAdmin, add the subdomain `staging.jbcc.co.ke`.
2. Under **Setup Node.js App**, create two apps with the newest Node.js
   version (20 or later) and startup file `app.js`:

   | App | Application root | Application URL |
   |---|---|---|
   | Staging | `jbcc-staging` | `staging.jbcc.co.ke` |
   | Live | `jbcc-app` | `jbcc.co.ke` (create when ready to launch) |

3. Add environment variables to each app, then restart it:

   | Name | Staging | Live |
   |---|---|---|
   | `SITE_URL` | `https://staging.jbcc.co.ke` | `https://jbcc.co.ke` |
   | `SITE_ACCESS_PASSWORD` | A password for reviewers | Leave unset |
   | `SITE_ACCESS_USER` | Optional, default `jbcc` | Leave unset |
   | Ask JBCC variables | As in the Ask JBCC table | Same |

   A password also sends a no-index header and a blocking `robots.txt`, so
   the preview stays out of search engines. `SITE_NOINDEX=true` does the same
   without a password.
4. Turn on Let's Encrypt SSL for both domains.
5. Add the deploy key's public half under **SSH Keys** in DirectAdmin.

### GitHub settings

Repository secrets, shared by both environments:

| Secret | Value |
|---|---|
| `DEPLOY_HOST` | SSH host name |
| `DEPLOY_PORT` | SSH port, if not 22 |
| `DEPLOY_USER` | DirectAdmin user name |
| `DEPLOY_SSH_KEY` | Private half of the deploy key |
| `DEPLOY_KNOWN_HOSTS` | Output of `ssh-keyscan -p <port> <host>` |

Create GitHub environments named `staging` and `production`, each with a
variable `DEPLOY_APP_DIR` (`jbcc-staging` and `jbcc-app`). Add required
reviewers to `production` so a live deploy needs approval.

### How deploys run

- Every push to `main` that passes **Quality checks** deploys to staging.
- The live site deploys only from **Actions → Deploy → Run workflow →
  production**.
- To deploy by hand from your computer:

  ```sh
  bun run build
  DEPLOY_HOST=<host> DEPLOY_USER=<user> DEPLOY_APP_DIR=jbcc-staging scripts/deploy.sh
  ```

- To roll back, swap `.previous/` back into the application root over SSH
  and touch `tmp/restart.txt`.

### Going live

1. Point the `jbcc.co.ke` DNS A record at the DirectAdmin server and wait for
   it to resolve; Let's Encrypt can't issue a certificate before that.
2. Create the Live app (table above) with `SITE_URL=https://jbcc.co.ke` and no
   password, then turn on SSL and **Force SSL redirect** for the domain.
3. Run **Actions → Deploy → Run workflow → production**.
4. Check `https://jbcc.co.ke/`, `/robots.txt` (it should allow crawling) and
   `/sitemap.xml`, then run `node scripts/stress.mjs https://jbcc.co.ke 20 20`.
5. Decide what happens to `jbcc.or.ke`. Redirecting it to `https://jbcc.co.ke`
   keeps old bookmarks working but also sends the resource centre's
   provenance links (`jbcc.or.ke/download/…`) to the new home page.

## Content and source files

The redesigned routes are `/`, `/about`, `/what-we-do`, `/resources`,
`/events`, and `/contact`, plus the site policies `/terms`, `/privacy`,
`/cookies`, and `/accessibility`. Institutional facts and resource metadata live in
`src/lib/jbcc-data.ts`.

The full public-source capture and its manifest are kept in
`site-source-archive/`. Selected local copies used by the site live in
`public/media/` and `public/documents/`. See `reports/JBCC redesign audit.md`
for the capture limits and source findings. The visual direction is recorded
in `docs/design-principles.md`.
