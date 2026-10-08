# Structured Foundations

id like a rebuild of this site jbcc.or.ke. pull real media, documents and info from the site instead of ai generated content. follow this design guide The key is that we should not redesign JBCC into a generic modern corporate website. The existing identity is already quite clear: dark navy + white + JBCC red, with Poppins typography. The redesign should make that identity substantially more sophisticated while preserving recognition.

JBCC 2026 — New Website Design Direction
1. The core concept
"The Framework Behind Construction"

The visual language should borrow subtly from:
architectural drawings, construction grids, structural systems, technical documentation, contracts and documents, measured spaces, material textures, lines and geometry. But not literally turn the website into a blueprint.
The result should feel:
Professional → authoritative → technical → contemporary → interactive
rather than:
Corporate → generic → card-heavy → static

2. The visual personality
- Structured: Grid-based layouts, alignment and strong typography
- Editorial: Large headlines, photography and asymmetric compositions
- Technical: Small labels, rules, numbering, metadata
- Dynamic: Scroll reveals, image movement, transitions
- Functional: Search, quick access, filtering and direct navigation
The site should feel almost like a digital publication + professional resource centre, rather than a conventional organization website.

3. Colour system
Primary:
JBCC NAVY: #030F27 (navigation, footer, major sections, headings, dark hero sections, overlays)
JBCC RED: #EA1C25 (used sparingly: CTA, active navigation, hover states, section markers, important data, interactive indicators)
Background:
OFF WHITE: #F7F7F5 (major content areas)
WHITE: #FFFFFF (cards, document panels and contrast)
Secondary dark:
CHARCOAL: #111827 (for some dark content)
Text:
PRIMARY TEXT: #030F27
SECONDARY TEXT: #667085

4. Typography
Keep Poppins because it is already part of the visual identity.
Hero: 72–96px desktop, 44–56px mobile
Section headings: 48–64px desktop, 36–42px mobile
Body: 16–18px, line-height: 1.6–1.8
Technical labels: 11–13px, uppercase, letter spacing (e.g. JBCC / RESOURCES / 01)

5. Homepage structure & visual sequence:
- SECTION 01 — HERO: Full viewport, dark navy background, large statement ("JBCC / JOINT BUILDING & CONSTRUCTION COUNCIL / The framework behind better construction."), subtle grid, thin architectural lines, red accent. Integrated transparent/dark header that transitions into solid sticky header on scroll.
- SECTION 02 — QUICK ACCESS: Directly below hero ("NEED SOMETHING? Search the JBCC website", quick buttons for CONTRACTS, PRICE INDICES, DOCUMENTS, PUBLICATIONS, EVENTS, CONTACT).
- SECTION 03 — WHO IS JBCC: Editorial layout ("WHO WE ARE - JBCC was founded in 1980 by AAK and KABCEC..."), factual verified numbers: 1980 Established, 8 Partner Organizations, 40+ Years.
- SECTION 04 — WHAT WE DO: Interactive vertical list replacing generic services:
  01 CONTRACT DOCUMENTATION
  02 INDUSTRY DEVELOPMENT
  03 DISPUTE RESOLUTION
  04 INDUSTRY INFORMATION
  05 PROFESSIONAL ENGAGEMENT
  (Grounded in JBCC statutory memorandum objectives, hovering updates background preview).
- SECTION 05 — THE JBCC RESOURCE CENTRE: Filterable categories (Contracts, Price Indices, Advisory Notes, Publications, Guidelines), featured resource (JBCC Price Index), horizontal/ledger list of documents with view/download capability. Accommodates future quarterly documents.
- SECTION 06 — NEWS & EVENTS: Consolidated news, seminars, announcements. Replaces broken [qemcalendar] shortcode with functional Event system with dates, Nairobi venue, seminar schedules, CPD certificate notice, and registration enquiry.
- SECTION 07 — OUR PARTNERS: The 8 constituent bodies (AAK - Architectural Association of Kenya, KABCEC - Kenya Association of Building & Civil Engineering Contractors, IEK - Institution of Engineers of Kenya, IQSK - Institute of Quantity Surveyors of Kenya, ACEK - Association of Consulting Engineers of Kenya, CIArb Kenya - Chartered Institute of Arbitrators, KPDA - Kenya Property Developers Association, KFMB - Kenya Federation of Master Builders). Monotone/refined partner grid with active hover states.
- SECTION 08 — CONTACT: Secretariat details: Suite 605, Blue Violets Plaza, Kamburu Drive off Ngong Road, Nairobi, Kenya. Phones: +254 20 2420 806 / +254 20 2420 582, Email: mail@jbcc.or.ke. Clean contact enquiry form and location details.
- FOOTER: Architectural footer with clean institutional links, removing any legacy theme/third-party links.

6. Dedicated Pages & Features:
- Universal Search overlay / modal (Cmd+K) for instant searching across documents, pages, and events.
- Resource Library page with faceted filtering (by document type and year), document previews, and download buttons.
- About Us page (History since 1980, constituent bodies, memorandum objectives, governance).
- Clean URL structure (/about/, /resources/, /what-we-do/, /events/, /contact/).
- High accessibility: semantic headings, descriptive alt text, visible focus, prefers-reduced-motion support.

7. Explicit anti-patterns banned:
- No generic AI hero slogans ("Building the Future Together", etc.)
- No gradient blobs (purple/blue, red/orange)
- No glassmorphism, glowing borders, or frosted glass cards everywhere
- No "everything is a card" with random icon soup
- No over-rounded 24px borders; use structured, square or subtle architectural edges
- No SaaS dashboard aesthetic or fabricated statistics ("97% satisfaction", etc.)
- No fake testimonials or stock business handshaking photos
- No floating 3D objects or isometric illustrations
- No scroll-jacking or forced scroll animations
- No overuse of red buttons everywhere

build the complete site

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f373b07-8624-4117-8c5a-09efe7064d8d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
