# Mobile, metadata, and contact improvements

## Outcome
Polish all six JBCC pages for phone use, add complete page-specific search and social metadata with appropriate structured data, and make the contact form clearer, safer, and accessible.

## Mobile layouts
- Refine shared navigation, search, footer, headings, and content spacing for narrow screens.
- Improve the homepage’s quick access, work-area controls, resources, event panel, and partner grid.
- Make About board/member rows, What We Do entries, resource rows and filters, Events content, and Contact details/forms easier to scan and tap.
- Preserve the existing square-edged navy, white, red, and Poppins visual system.

## Metadata and structured data
- Give every route a unique title, description, Open Graph title/description/type, Twitter card, canonical URL, and self-referencing Open Graph URL.
- Add verified Organization structured data to the homepage and Contact page.
- Add CollectionPage/DigitalDocument structured data for the resource library and EventSeries structured data for the events page without inventing event dates.
- Keep structured data aligned with the visible, source-verified JBCC content.

## Contact form
- Keep the email-client submission approach and add required fields, field-level descriptions, error styling, and focus on the first invalid field.
- Add an accessible status announcement for validation and successful preparation of the enquiry.
- Add lightweight spam protection with a hidden honeypot and minimum-completion-time check.
- Provide a visible fallback error if an email client cannot be opened, without storing visitor data.

## Verification
- Test all six pages at mobile and desktop widths for overflow, navigation, filters, readable layouts, and metadata.
- Test invalid, spam-like, and valid contact submissions, plus keyboard and announcement behavior.
- Confirm the preview builds cleanly with no runtime errors.
