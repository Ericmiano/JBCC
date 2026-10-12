# JBCC design principles

## Institutional identity

Retain JBCC’s recognizable navy, white, and restrained red palette with Poppins typography. Make the site feel like a Kenyan industry body that keeps useful records and helps visitors act on them: a digital publication and professional resource centre with a strong editorial structure.

Use measured columns, alignment, document metadata, construction details, and authentic JBCC photography and video shown at full colour. Let verified JBCC material establish the visual identity instead of generic corporate slogans, gradients, decorative stock images, or invented statistics.

## Visual system

- **Navy:** `#030F27` for navigation, footer, major sections, and dark overlays.
- **JBCC red:** `#EA1C25` used sparingly for active states, section markers, and key actions.
- **Paper:** `#F7F7F5` for primary content areas, with white where contrast needs it.
- **Typography:** Poppins; large concise headings, 16–18px body copy with generous line spacing, and small uppercase labels for dates, sections, and document metadata.
- **Composition:** asymmetric measured columns and editorial ledger rows; photographs sit in front, beside text on solid navy or paper panels, never under a navy tint. Avoid repeated card grids and oversized rounded panels.

## Content and navigation

The homepage should identify JBCC’s role in contract documentation, price information, and professional guidance; help visitors find the resource archive; explain the Council and its constituent bodies; show its documented objectives and seminar subjects; and make Secretariat contact routes easy to find.

Use clear route labels and provide useful context before a link or download. Show each file’s title, publication date or edition, format, and archive/current status. Date historical prices, indexes, event information, and governance claims. Do not invent events, current office holders, testimonials, project records, or measures of impact.

## Interaction and motion

Prefer user-selected controls and direct links. The homepage hero is the only auto-advancing element, and it must keep a visible pause control. Keep scrolling under visitor control. Use the shared editorial reveal wrapper for scroll-based text and the shared image-reveal wrapper for photo motion. Keep reduced-motion behavior and dual-contrast keyboard focus centralized in global CSS. Ensure all information remains available when motion is reduced or unavailable.

The homepage hero reuses the live site’s slider media: the forum video loop and two event photographs. It may advance automatically only with a visible pause control, pauses on hover and focus, and stays still under reduced motion. Keep the heading visible from first paint, make slide controls work by keyboard and touch, and give each slide one factual sentence and one direct destination. Offer the full video on request in a dialog.

## Anti-patterns

Avoid generic “building the future” copy, fabricated counters, generated-looking skylines, generic handshake or office-stock photography, gradient blobs, glass panels, glowing borders, repeated icon cards, fake testimonials, floating 3D objects, custom cursors, text-scrambling effects, forced or scroll-jacking motion, grid-line or drafting-line backgrounds, navy tints over photographs, slash-separated labels such as “Index / 01”, and visibly numbered section markers. Use a visual effect only when it supports a real JBCC task or record.
