# Institutional Design and Motion Research

## What distinguishes a specific editorial institution from a generic AI landing page?

### Takeaway

JBCC should feel like a Kenyan industry body that keeps useful records and helps people act on them: lead with verified material, local context, clear document routes, and a recognizable editorial system. Treat “AI tropes” as a design judgement, not a measurable category: the practical test is whether an element could be swapped onto any generic startup page without changing its meaning.

### Cited Findings

- GOV.UK’s research guidance says design should start with evidence about who uses a service, what they are trying to do, and where they struggle; suggestions not based on users are assumptions to validate. [GOV.UK: Learning about users and their needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)
- A link’s label, surrounding context, and users’ prior knowledge shape its “information scent”; clear, self-explanatory labels help users judge whether a destination will meet their need. [Nielsen Norman Group: Information Scent](https://www.nngroup.com/articles/information-scent/)
- GOV.UK’s image guidance says to avoid images used as unnecessary decoration and generic stock photography, use photography to show lifelike things, and keep information available in text rather than baked into an image. [GOV.UK Design System: Images](https://design-system.service.gov.uk/styles/images/)
- The Canadian Centre for Architecture (CCA) describes its collection through concrete archival types—holdings, prints and drawings, photography, artefacts, audiovisual and digital materials, and library collections—and says cataloguing context can improve discovery of histories and narratives. [CCA: Collection](https://www.cca.qc.ca/en/about-collection)

### Inferences

- **Make the visual language specific to JBCC’s work.** Keep the project’s editorial ledger, measured columns, and drawing-line vocabulary, but make the content itself carry the identity: document covers, index tables, construction details, meeting records, member bodies, and locally sourced building photography with date, place, creator, and rights credit where known. The existing home page already uses editorial reveals, architectural linework, a work-area selector, and a static hero image; build on those shared primitives instead of layering on generic ambient effects. [Current home page](../../src/routes/index.tsx) · [Project instructions](../../AGENTS.md)
- **Avoid interchangeable “AI landing page” signals as an editorial choice:** abstract gradient blobs, glass-effect card walls, fake counters, vague claims such as “building the future,” generated skyline imagery, a custom cursor, and a row of identical feature cards. These are judgement calls rather than claims from a usability standard; retain any element only when it communicates real JBCC information or helps a task.
- **Give every story an evidentiary spine:** what changed or was built; where and when; who commissioned, designed, built, or maintains it; which JBCC guidance or record applies; and a direct source/download. Prefer short, attributed field notes over unsubstantiated promotional language. CCA’s collection practice is a useful precedent for treating records and their descriptions as public knowledge, not decorative content.
- **Keep authenticity legible.** Use existing, verified site media and credited local project material; show the document title, date/edition, issuing body, and file type before a download. If provenance, currency, or usage rights are unknown, flag that gap rather than silently presenting the item as verified.

### Gaps

- This research did not include JBCC visitor interviews, search logs, analytics, or member/secretariat enquiry data. The exact task hierarchy and choice of hero content remain assumptions until checked with users.
- Image permissions and source credits for material found on the current site need separate verification before republication.

## Which architecture, civic, and cultural institution sites offer useful patterns?

### Takeaway

Use the Aga Khan Award for Architecture (AKAA) for an architecture-specific searchable project archive, CCA for collection taxonomy and contextual cataloguing, and RIBA for issue-led regional and subject groupings. Adapt their information patterns to JBCC’s own records and audiences; do not imitate their branding or assume their audiences are the same.

### Cited Findings

- AKAA describes its scope as architecture, planning, historic preservation, and landscape architecture; it highlights local resources and appropriate technology, and links to a Project Finder that filters projects by area, year, or building type. [AKAA overview](https://the.akdn/en/what-we-do/award-programmes/aga-khan-award-for-architecture) · [AKAA Project Finder](https://the.akdn/en/how-we-work/our-agencies/aga-khan-trust-culture/aga-khan-award-for-architecture/aga-khan-award-for-architecture-project-finder)
- CCA separates archives, prints and drawings, photography, artefacts, audiovisual and digital materials, and library holdings; it provides finding aids and a search tool for authors, works, or keywords. Its broader archive includes complete works or project records, which it describes as a way to understand how architectural ideas developed and materialized. [CCA collection](https://www.cca.qc.ca/en/about-collection) · [CCA archival holdings](https://www.cca.qc.ca/en/archives/)
- RIBA’s award site groups work by national, regional, international, conservation, housing, and reuse themes, and gives a short explanation of what each award recognizes. [RIBA Awards](https://www.riba.org/explore/awards/)
- RIBA’s official “Google Arts & Culture” feature describes curated stories assembled from photographs, drawings, models, audio, and video; it includes a regional story on civic architecture in modern Ghana. [RIBA and Google Arts & Culture](https://www.old.architecture.com/explore-architecture/google-arts-and-culture)
- CCA’s archive page explains the value of project records as a way to see the genesis and materialization of architectural ideas, while the AKAA Project Finder gives visitors practical filters rather than a purely promotional project gallery. [CCA archival holdings](https://www.cca.qc.ca/en/archives/) · [AKAA Project Finder](https://the.akdn/en/how-we-work/our-agencies/aga-khan-trust-culture/aga-khan-award-for-architecture/aga-khan-award-for-architecture-project-finder)

### Inferences

- Create a **JBCC record finder** rather than a showcase of decorative resource cards: search first, then filter by resource type (contract/form, price index, publication, guidance), topic, date/edition, and current/archived status where that information exists. Show the metadata and intended audience in the result row, then make the file type and download action explicit.
- Make the project’s existing resource section work as a small archive. A document detail view can include a plain-language summary, source/issuer, publication date or edition, related resources, and file format. For index series, allow a simple year/month route if the source data supports it.
- Build narrative pages from real Kenya-based material: an annotated project, a member-body contribution, a contract clause in practice, or an index change. Use drawings, site photographs, scans, and short interviews only where the archive or contributors can substantiate them. The Ghana civic-architecture story is a useful format precedent for telling a place-based story, not a template to copy.
- The homepage can connect these editorial stories to practical routes—“Find a contract form,” “Check a price index,” “See current guidance”—so a visitor can browse the institution’s work without hiding the services behind a campaign-style hero.

### Gaps

- The references show viable patterns, but they do not prove which archive filters, story formats, or entry points JBCC visitors prefer. Validate with common tasks from site search and Secretariat/member queries.
- Do not promise a project catalogue, publication series, or current-events feed until the live source material is found, verified, and maintainable.

## How can storytelling, navigation, and animation improve engagement without marketing fluff?

### Takeaway

Use interaction to reveal real information and give visitors a reason to continue into useful sections. Make the main routes visible, keep navigation labels descriptive, and keep animation restrained, reversible, and responsive to motion preferences.

### Cited Findings

- GOV.UK recommends selecting only the most useful top-level sections for navigation; navigation is not a full site map. It also recommends showing service-level tools such as search where they help users. [GOV.UK Design System: Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/)
- NN/G says the homepage should make navigation choices clear and let people understand what lies beneath links; its guidance also recommends a visible, simple search input and warns against animating critical content such as the main headline. [NN/G: Homepage Usability Guidelines](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/)
- WCAG 2.2 SC 2.2.2 requires a way to pause, stop, or hide certain automatically moving content when it runs for more than five seconds alongside other content. SC 2.3.3 (Level AAA) says non-essential motion animation triggered by interaction can be disabled. W3C’s C39 technique shows how `prefers-reduced-motion` can suppress such motion. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) · [Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions) · [W3C reduced-motion technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C39)
- GSAP’s ScrollTrigger can play, reverse, or scrub an animation against scroll progress; `gsap.matchMedia()` supports media-query conditions including `prefers-reduced-motion` and reverts animations when conditions change. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)
- React Bits offers a catalogue of reusable React effects and motion components. Its examples vary considerably in visual intensity, so component choice and implementation still need to be checked against the JBCC content and accessibility needs. [React Bits component catalogue](https://www.reactbits.dev/get-started/index)

### Inferences

- **Hero direction:** use one genuine, well-credited image or drawing from JBCC’s verified media set; keep the main title still and readable. Offer three clearly labelled starting points tied to actual pages—such as contract documents, price indices, and council guidance—and let a visitor select one with a button or accessible tab. Each selection can change a small annotated drawing/detail and a one-sentence description, then link directly to the relevant section. Do not auto-rotate the choices.
- **Scroll story:** use an unobtrusive section index/progress indicator and links such as “Read the council’s history,” “Browse resources,” and “View member bodies.” A single architectural line drawing can assemble as the visitor scrolls through the explanation it illustrates. Keep the full text and all links in the document flow so the experience works without animation.
- **GSAP’s role:** reserve ScrollTrigger for a bounded, meaningful sequence—e.g. drawing-line progress tied to a short explainer or a photo/drawing transition that communicates a documented change. Use ordinary enter/reveal triggers for small movements; avoid pinning large sections, scroll-jacking, endless marquees, or a hero that delays the headline. Use `gsap.matchMedia()` for reduced motion and viewport variations, and revert timelines/ScrollTriggers on route teardown.
- **React Bits’ role:** treat the library as a source of component ideas, not a visual style to apply wholesale. A subtle image reveal or a clearly bounded, user-triggered detail interaction could fit; cursor trails, glitch/scramble text, ambient particles, and abstract WebGL backgrounds add little to JBCC’s institutional content. Keep the project’s shared reveal wrappers for scroll-based text and decorative image/line motion, with the central reduced-motion behavior already required by [AGENTS.md](../../AGENTS.md); add a library effect only where it provides a distinct interaction.
- **Avoid interaction traps:** keyboard users should be able to operate the hero controls; focus must remain visible; controls should be large enough to use on touch. Keep a nonanimated state, avoid text that moves while visitors read, and provide pause/stop control for any nonessential motion that runs automatically. These recommendations extend the W3C motion and WCAG requirements above.
- **Replace marketing fluff with an editorial sequence:** “what this record is” → “why it matters to a Kenyan project/team” → “who issued it and when” → “read, download, or contact.” Use specific event titles, dates, speakers, materials, and next steps instead of claims such as “transforming the future.”

### Gaps

- The user’s request for an engaging journey does not establish a measured engagement problem. The proposed hero controls and story order should be tested with architects, contractors, consultants, students, and public-sector users before the pattern is treated as validated.
- Animation libraries do not by themselves establish accessibility or content quality. Confirm keyboard behavior, reduced-motion behavior, device performance, focus visibility, and whether the effect works with actual JBCC imagery before adopting a component.
