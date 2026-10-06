<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Run `bun run test:e2e` after shared navigation, responsive layout, contact-flow, or metadata changes because these behaviors are covered across phone and tablet widths.
- Use the shared editorial reveal wrapper for scroll-based text motion so accessibility and reduced-motion behavior stay consistent.
- Use shared line-drawing and image-reveal wrappers for decorative motion so selective rollout and reduced-motion bypass remain consistent.
- Build JBCC page compositions from shared editorial ledger primitives and asymmetric measured columns, avoiding repetitive card grids so the institutional design remains cohesive.
