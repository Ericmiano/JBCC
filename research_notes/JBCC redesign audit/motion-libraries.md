# Motion libraries for an institutional JBCC redesign

## GSAP APIs and an interactive JBCC hero

### Takeaway

Use GSAP as a small choreography layer for a real, locally sourced project image or hand-drawn SVG: one short line-drawing and text entrance, followed by restrained reveals as editorial sections enter view. Give visitors a purposeful, click-or-tap hero selector that routes to verified site content; keep the copy and navigation useful with all animation disabled. In this repository, implement through the existing shared reveal, line-drawing, and image-reveal wrappers specified in its `AGENTS.md` instructions.

### Cited Findings

- GSAP is framework-agnostic; its React integration `@gsap/react` provides `useGSAP()`, a `useEffect`/`useLayoutEffect` replacement that uses `gsap.context()` for automatic cleanup and optional React-ref scoping. [GSAP React guide](https://gsap.com/resources/React/)
- GSAP documents that React Strict Mode can execute effects twice in development, which can create duplicate animations if cleanup is omitted; `useGSAP()` reverts animations, ScrollTriggers, Draggables, and SplitText instances created in its callback. [GSAP React guide](https://gsap.com/resources/React/)
- GSAP's `contextSafe()` is for GSAP work created later by event callbacks or timers; manually attached event listeners still need to be removed during cleanup. [GSAP React guide](https://gsap.com/resources/React/)
- `gsap.matchMedia()` can scope animation setup to browser media queries; GSAP records and reverts animations and ScrollTriggers when conditions stop matching. Its examples include a `prefers-reduced-motion` condition, and it can also vary setups by breakpoint. [GSAP `matchMedia()` documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
- Use `gsap.matchMedia()`, not the older `ScrollTrigger.matchMedia()` API; GSAP marks the latter deprecated in favor of `gsap.matchMedia()` in GSAP 3.11 and later. [Deprecated API documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.matchMedia%28%29/)
- ScrollTrigger supports entrance triggers, scrubbed timelines, pinning, start/end positions, and responsive setups; its docs say it synchronizes scroll updates with screen refreshes, throttles resize recalculation, and does not itself take over native scrolling. GSAP warns against animating the pinned element itself because that affects its measurements. [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

### Inferences

- A JBCC hero can feel interactive without a moving carousel: start with a genuine Kenyan built-environment image or a carefully drawn structural detail, add a fine survey-grid/line overlay, then give visitors a row of native buttons for destinations verified on the live site. A selection can change one large image/detail and a short, factual caption with a clear link to that page. This creates an invitation to explore while avoiding generated-looking generic imagery and unsupported claims.
- On first load, reveal the photograph and a few drawing strokes in one short GSAP timeline, then settle. Keep headline, lead, buttons, and destination captions present in the DOM and visible without requiring JavaScript animation to complete. Use simple `transform`/`opacity` changes for entrances where possible; avoid a long pinned hero, auto-advancing carousel, forced scroll, and cursor-following tilt as the main interaction. These are design judgments informed by the documented React cleanup, media-condition, ScrollTrigger, and motion guidance above.
- Use a single component-level `useGSAP()` with a ref as scope. Make any button-triggered GSAP effects context-safe, and use `gsap.matchMedia()` for desktop-only flourish and reduced-motion/breakpoint branches. Prefer the repository's shared motion wrappers where they already encode live reduced-motion changes; do not add a second animation owner to the same elements.
- For scroll motion, animate a short, editorial reveal when content enters view and settle it once. Avoid pinning content for the sake of spectacle; normal scrolling lets visitors choose their pace and helps them reach the whole site.

### Gaps

- This research did not inspect the local package manifest, installed GSAP version, component wrappers, or current hero code. Confirm whether GSAP/`@gsap/react` are already installed and how the repository wrappers are designed before proposing code-level changes.
- The live JBCC site could not be fetched through the research browser during this pass. The hero's buttons, photographs, and captions must be mapped to the pages and assets the primary audit verifies; do not infer JBCC services or invent statistics here.

## React Bits components for a restrained architectural direction

### Takeaway

Use React Bits as a source of component patterns, not as a layer of unrelated “wow” effects. The current catalog lists architectural-friendly background concepts such as Topography and Grid Scan; these could inspire a low-contrast drafting texture, while GSAP and the project's shared wrappers handle the actual image/line reveal. The Staggered Text docs explicitly expose a reduced-motion option, but its visual and assistive-technology behavior still needs review in the copied source.

### Cited Findings

- React Bits' official index groups many components into backgrounds, animations, and text animations, and lists Topography and Grid Scan among the backgrounds. [React Bits component index](https://reactbits.dev/get-started/index)
- React Bits' official GitHub repository describes the components as customizable, copy-ready React components and documents JavaScript/CSS and TypeScript/CSS/Tailwind variants; it supports manual copying and CLI installation through shadcn or jsrepo. [React Bits repository](https://github.com/DavidHDev/react-bits)
- React Bits' Staggered Text docs support word, character, or line segmentation, choose an HTML tag through `as`, and expose `respectReducedMotion` with a default of `true`. The docs also describe an intersection-observer threshold for entering-view animation. [Staggered Text component documentation](https://pro.reactbits.dev/docs/components/staggered-text)
- The repository license is MIT plus Commons Clause: it permits use, copying, modification, and commercial use as part of an application, website, or product, while forbidding selling, sublicensing, or redistributing the components themselves as standalone components. Preserve the license notice for copies or substantial portions and verify the current terms when choosing a component. [React Bits license](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)

### Inferences

- Best fit: treat Topography or Grid Scan as a reference for a very faint, thin-line plan/grid motif behind actual JBCC project photography or a locally authored SVG. Keep it static or make the motion brief and user-controlled; the site's institutional identity and evidence-bearing content should remain the visual focus. The catalog pages retrieved here identify the components but do not expose their implementation details, so this is a design recommendation, not a claim that a default component is accessible or light on devices.
- If a text entrance is used, choose word- or line-level staging rather than character-by-character decoding. Preserve a normal semantic heading and ensure the effect does not leave important text hidden. The official `respectReducedMotion` prop is useful, but the copied implementation should still be checked for screen-reader output, visible initial state, focus behavior, and whether the preference change is handled live.
- Adopt at most one React Bits effect per view and do not animate the same node from both React Bits and GSAP. Competing transforms and competing reduced-motion systems make motion difficult to control; the repository's existing shared wrappers should remain the standard for editorial text and image reveals.
- Avoid adopting cursor trails, electric/glitch text, parallax, or generic floating-card effects merely because they are available in the library. For JBCC, the source's own project imagery, document covers, contract excerpts, event photographs, and drawing-like details can provide the distinctiveness that stock effects cannot.

### Gaps

- The React Bits background pages could not be expanded by the research browser, so current Topography and Grid Scan props, dependencies, rendering approach, and reduced-motion behavior were not independently verified. Inspect the selected source before shipping; prefer a CSS/SVG implementation if the copied background needs a continuous Canvas/WebGL loop.
- The Staggered Text page is hosted in React Bits Pro documentation. Confirm the component's availability and its current license/terms for the chosen installation path; the free repository license alone should not be assumed to cover a separately hosted Pro component.

## Accessibility, input, and performance safeguards

### Takeaway

Keep all content available without motion, respect `prefers-reduced-motion` in both CSS and JavaScript, make every interaction work with keyboard and touch, and let visitors pause any continuous ambient motion. Favor a quiet SVG/photo composition and short transform/opacity transitions over GPU-heavy effects; preserve normal page scrolling and test the actual result on a modest phone.

### Cited Findings

- W3C's WCAG 2.2 criterion 2.3.3 (Level AAA) says motion animation triggered by interaction must be disableable unless essential. W3C notes that extra movement caused by scrolling and parallax may cause vestibular symptoms, and identifies reduced-motion preferences or a site-wide motion control as ways to prevent unnecessary effects. [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- WCAG 2.2 criterion 2.2.2 (Level A) requires a mechanism to pause, stop, or hide automatically starting moving/blinking/scrolling content when it lasts over five seconds alongside other content, subject to its essential-motion exception. W3C recommends one control for multiple moving elements where possible. [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- MDN documents that the `prefers-reduced-motion` media feature reflects the user's operating-system/browser motion preference and can select an alternate presentation. [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- WCAG's input-modality guidance explains that functionality should be operable with pointer input, and that complex or timed gestures such as dragging/swiping need a single-pointer alternative. WCAG 2.2's minimum target-size criterion uses 24 by 24 CSS pixels, with listed exceptions. [W3C: Input Modalities](https://www.w3.org/WAI/WCAG22/Understanding/input-modalities.html); [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- MDN explains that `requestAnimationFrame()` schedules work before repaint and pauses in background tabs; it also notes that transform animations can be moved off the main thread when they avoid reflow/repaint. MDN's summary recommends CSS transitions/animations where they suffice and JavaScript for more complex cases. [MDN: CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance)
- GSAP's media-query API directly supports `prefers-reduced-motion`, while React Bits' Staggered Text component exposes a reduced-motion prop. [GSAP `matchMedia()` documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/); [Staggered Text component documentation](https://pro.reactbits.dev/docs/components/staggered-text)

### Inferences

- Use semantic links and buttons for hero destinations. Make buttons keyboard-focusable with clear visible focus, meaningful names, and generous touch area (aim for 44 by 44 CSS pixels where layout allows; WCAG 2.2's AA minimum is 24 by 24 except for its exceptions). Don't make hover, pointer position, drag, or timed gestures the only way to reveal or select content.
- The reduced-motion state should be a real alternate presentation: make the complete hero copy and controls visible immediately, remove looping/parallax/scroll-linked movement, and replace line/image reveals with an instant state or a subtle opacity-only change. Re-check the preference if it changes during a visit so elements do not remain hidden. This also matches the supplied project instruction that shared wrappers settle when the live preference changes.
- A one-time entrance that settles in under five seconds avoids the specific WCAG 2.2.2 duration condition; respecting reduced motion remains the better experience for vestibular users. If any hero/background animation continues beyond five seconds, include a visible, keyboard-operable pause/stop control. Make that control operate all ambient moving effects on the view together.
- Animate primarily transform and opacity, limit the number of animated elements, and avoid continuous full-viewport Canvas/WebGL unless it provides real information. For low-end phones, keep the effect off the critical content path and offer a static local image/SVG fallback. The final rendering cost still depends on implementation and devices, so profile on a modest phone rather than relying on a library's marketing claim.
- The user-supplied repository instructions require centralized reduced-motion overrides and dual-contrast keyboard focus in global CSS, and shared editorial/image/line reveal wrappers. Keep these constraints central rather than letting each new animation add its own accessibility behavior.

### Gaps

- The retrieved component documentation does not establish that every React Bits component respects reduced motion, keyboard, touch, or low-end-device constraints. Audit the exact copied component and its transitive dependencies instead of generalizing from one component's prop.
- No performance profile or accessibility check was run on the local site as this was a research-only subtask. Verify keyboard-only operation, screen-reader announcements, contrast/focus visibility, live reduced-motion changes, and frame/load behavior after implementation.
