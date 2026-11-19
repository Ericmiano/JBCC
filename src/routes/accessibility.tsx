import { createFileRoute } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { legalHead } from "@/lib/legal";

export const Route = createFileRoute("/accessibility")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => legalHead(loaderData ?? "", "/accessibility", "Accessibility statement", "How the JBCC website supports accessible use and how to request an accessible format."),
  component: AccessibilityPage,
});

const sections: LegalSection[] = [
  { id: "commitment", title: "Our aim", body: <>
    <p>We want everyone to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
  </> },
  { id: "features", title: "What you can do", body: <>
    <ul>
      <li>Use every page and control with a keyboard, with a visible focus outline and a skip link to the main content.</li>
      <li>Zoom to 200% and use narrow screens without content being cut off.</li>
      <li>Pause the homepage slideshow, or turn on your device’s reduced-motion setting to stop it and other animations.</li>
      <li>Use Windows high-contrast mode and screen readers, which receive page-change and form-error announcements.</li>
    </ul>
  </> },
  { id: "feedback", title: "Feedback and accessible formats", body: <>
    <p>If something on the website does not work for you, or you need a document in another format, email <a href="mailto:mail@jbcc.co.ke">mail@jbcc.co.ke</a> or call <a href="tel:+254202420806">+254 20 2420 806</a>. Please tell us the page or document and the format you need.</p>
  </> },
  { id: "testing", title: "How we test", body: <>
    <p>Automated checks run on every page for landmarks, headings, colour contrast, keyboard focus, 200% zoom, reflow at 320 pixels, reduced motion and target size. We also review pages with a keyboard.</p>
  </> },
];

function AccessibilityPage() {
  return <LegalDocument eyebrow="Site policies" title="Accessibility statement" summary="How this website supports accessible use and how to get help." sections={sections} />;
}
