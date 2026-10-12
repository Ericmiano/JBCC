# Progressive line and image reveals

## Goal
Extend the editorial motion system with architectural line drawing and selective masked image reveals, while preserving the site’s restrained technical character.

## Implementation
- Add a reusable progressive SVG line layer that draws measured structural paths when its section enters view.
- Place the line layer selectively in the homepage hero, inner-page introductions, and one key homepage information panel.
- Add a reusable masked image reveal that uncovers imagery with a short directional wipe and subtle image settling.
- Apply masks only to the homepage hero image, inner-page introduction image, and Board portraits; leave logos, icons, resources, and functional UI immediate.
- Keep all content and images visible before hydration, and bypass line drawing, clipping, transforms, and delays under reduced motion.

## Verification
- Add automated checks for completed SVG drawing and reduced-motion image visibility.
- Run all shared phone, tablet, navigation, metadata, and contact-flow tests.
- Inspect homepage, inner-page introduction, and Board imagery on desktop and mobile; confirm a clean preview build.

## Technical details
- Reuse the existing IntersectionObserver reveal approach without adding a runtime animation library.
- Decorative SVGs remain hidden from assistive technology and cannot intercept pointer input.
