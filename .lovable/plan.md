# Architectural institutional redesign

## Direction
- Keep JBCC’s navy, red, off-white, white, charcoal, and Poppins identity.
- Apply the selected architectural institutionalism direction across all six pages.
- Replace repetitive card-like compositions with editorial ledgers, measured columns, strong rules, folio numbering, and integrated documentary imagery.
- Preserve the site’s formal tone, real content, accessibility, metadata, search, forms, and current navigation behavior.

## Implementation
- Recompose the homepage around an asymmetric 7/5 institutional hero and stronger publication-style section rhythms.
- Update shared page introductions and headings so About, What We Do, Resources, Events, and Contact inherit the same authored system.
- Refine repeated lists, filters, Board portraits, event notices, resource rows, contact details, and form presentation without changing their functionality.
- Keep the existing reveal durations and stagger while reducing mobile paint/layout work through stable containment, transform hints only while active, and one-shot observer cleanup.

## Verification
- Add narrow-phone browser tests for SVG drawings and image masks.
- Stress rapid scrolling and viewport resizing, confirming each reveal settles once and remains settled.
- Verify reduced-motion behavior, horizontal overflow, navigation, contact flow, metadata, and all six pages.
- Run the complete browser suite and confirm the preview build is clean.