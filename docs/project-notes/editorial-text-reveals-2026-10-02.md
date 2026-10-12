# Editorial text reveals

## Goal
Add a restrained, reduced-motion-aware reveal language that makes the site feel more editorial without delaying access to content or changing its visual identity.

## Implementation
- Build one reusable reveal wrapper using the browser’s intersection observer, with content visible by default before hydration.
- Use subtle opacity and vertical movement only; avoid word-by-word splitting, large transforms, or decorative effects.
- Establish the pattern on the homepage: reveal the hero label, headline, supporting copy, and section headings in short staggered groups.
- Apply the same pattern to shared page introductions and section headings, then to the principal content blocks on About, What We Do, Resources, Events, and Contact.
- Keep interactive controls immediately usable and avoid animating form fields, navigation, filters, or success/error announcements.
- Disable all reveal movement and delay when the visitor requests reduced motion.

## Verification
- Add focused browser checks confirming content remains visible without JavaScript timing assumptions and animations are disabled under reduced motion.
- Run the existing phone and tablet checks across all six pages.
- Inspect homepage and inner-page rendering at desktop and mobile sizes, then confirm a clean preview build.

## Technical details
- Use React plus `IntersectionObserver`; do not add GSAP or another animation dependency for this lightweight effect.
- Preserve semantic headings and accessible reading order; animation wrappers will not duplicate or split text for assistive technology.
