> [!IMPORTANT]
> Preserve published Git history. Do not force push or rewrite commits that
> have already been published.

- Run `bun run test:e2e` after shared navigation, responsive layout, contact-flow, or metadata changes because these behaviors are covered across phone and tablet widths.
- Run `bun run test:a11y` after changes that affect focus, contrast, motion, or page structure; pull requests run that suite in Chromium, Firefox, and WebKit.
- When published page content, documents, seminars, or policies change, update `src/lib/ask/knowledge.ts` so Ask JBCC answers from the current site. Ask JBCC must call Claude only through Cloudflare AI Gateway and cite only knowledge-base links.
- Use the shared editorial reveal wrapper for scroll-based text motion so accessibility and reduced-motion behavior stay consistent.
- Use the shared image-reveal wrapper for photo motion so reduced-motion bypass stays consistent. Do not add grid-line, line-drawing or navy-tinted overlay backgrounds; show JBCC photographs at full colour beside text on solid panels.
- Use `mail@jbcc.co.ke` and `https://jbcc.co.ke` for the Council. `jbcc.or.ke` is the former WordPress site and is linked only as document provenance.
- Build JBCC page compositions from shared editorial ledger primitives and asymmetric measured columns, avoiding repetitive card grids so the institutional design remains cohesive.
- Keep reduced-motion overrides and dual-contrast keyboard focus centralized in global CSS; shared reveal wrappers settle on live preference changes so content never re-hides.
