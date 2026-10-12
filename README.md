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
- `bun run test:e2e` — run the Playwright end-to-end suite in Chromium.
- `bun run test:a11y` — run the accessibility regression suite in Chromium,
  Firefox, and WebKit. Install the engines first with
  `bunx playwright install chromium firefox webkit`. Pull requests run this
  suite in all three engines through `.github/workflows/accessibility.yml`.
- `bun run test:lighthouse` — run the mobile Lighthouse checks against the
  local preview server.
- `bun run lint` — check source formatting and lint rules.

## Ask JBCC

`/ask` lets visitors ask about the site's published documents, pages,
seminars, and policies. The server sends the question, together with every
entry in `src/lib/ask/knowledge.ts` as citable search results, to Claude
through Cloudflare AI Gateway. Answers list only citations that point at known
site links. Keep `knowledge.ts` in step with page content when pages change.

Set these as Worker secrets or vars (`wrangler secret put NAME`), or in your
shell for local development:

| Name | Required | Purpose |
|---|---|---|
| `AI_GATEWAY_URL` | One of these | Full endpoint, `https://gateway.ai.cloudflare.com/v1/<account>/<gateway>/anthropic` |
| `CLOUDFLARE_ACCOUNT_ID` and `AI_GATEWAY_ID` | One of these | Used to build the endpoint when `AI_GATEWAY_URL` is unset |
| `CF_AIG_TOKEN` | If the gateway is authenticated | Sent as `cf-aig-authorization` |
| `ANTHROPIC_API_KEY` | Unless the key is stored in the gateway | Anthropic API key |

Without a gateway the page stays usable: it says AI answers are off and lists
related pages found by keyword. Configure rate limiting and caching on the
gateway; the Worker's own limit of six questions per visitor every five
minutes applies per isolate only.

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
