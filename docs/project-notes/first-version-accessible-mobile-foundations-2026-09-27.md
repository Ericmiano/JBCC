# First version: accessible mobile foundations

## Scope
Deliver the shared mobile foundation first. This version covers the header and menu, search overlay, footer, page introductions, section headings, resource rows, and the Contact form. Page-specific visual refinements beyond these shared patterns remain a follow-up.

## Priorities
1. Keyboard navigation and predictable focus behavior.
2. Screen-reader announcements and clear form errors.
3. Stable phone layouts with 44px minimum primary tap targets and no horizontal overflow.
4. Complete page metadata and source-aligned structured data.

## Implementation
- Make the mobile menu scroll safely, expose its open state, close with Escape, and clearly identify the active page.
- Make search keyboard-dismissible, prevent background scrolling, label its input, and announce changing results.
- Tighten shared spacing and typography for narrow screens without changing JBCC’s visual identity.
- Reflow resource rows so titles, metadata, and actions remain readable and tappable.
- Add associated field errors, focus the first invalid field, announce validation and submission states, and add a honeypot plus minimum-completion-time spam check.
- Add unique canonical, Open Graph, and Twitter metadata to all six pages; add Organization, resource-library, and event-series structured data without invented facts.

## Acceptance criteria
- At 390px width, all six pages have no horizontal scrolling and shared content remains readable.
- Every menu, search, filter, resource action, and form control is reachable and operable by keyboard; Escape closes overlays and menus.
- Icon-only controls have accessible names; primary mobile controls are at least 44×44px.
- Invalid Contact submission announces a summary, marks each invalid field, links errors to inputs, and focuses the first error.
- Valid Contact submission announces that the email draft is ready; suspected spam receives a clear error and opens no email client.
- Every content route outputs a unique title, description, Open Graph title/description/type/URL, Twitter card, and canonical URL.
- Structured data matches visible, verified JBCC information and contains no fabricated event dates.
- Mobile and desktop checks complete without build or runtime errors.
