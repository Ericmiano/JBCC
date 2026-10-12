import { createFileRoute, Link } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { legalHead } from "@/lib/legal";
import { COOKIE_NOTICE_KEY } from "@/components/cookie-notice";

export const Route = createFileRoute("/cookies")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => legalHead(loaderData ?? "", "/cookies", "Cookie policy", "The JBCC website uses no tracking or advertising cookies. This policy explains what it does store."),
  component: CookiesPage,
});

const sections: LegalSection[] = [
  { id: "summary", title: "In short", body: <>
    <p>This website does not use cookies for analytics, advertising or tracking. It loads no third-party trackers, and its fonts, images and video are served from this website.</p>
  </> },
  { id: "what", title: "What cookies are", body: <>
    <p>Cookies are small files that websites store in your browser. Similar technologies, such as local storage, keep information on your device in the same way.</p>
  </> },
  { id: "store", title: "What this website stores", body: <>
    <dl className="grid gap-x-6 gap-y-2 border-y border-border py-4 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
      <dt className="font-semibold text-foreground">Name</dt><dd className="break-all font-mono text-xs leading-6">{COOKIE_NOTICE_KEY}</dd>
      <dt className="font-semibold text-foreground">Type</dt><dd>Local storage, strictly necessary</dd>
      <dt className="font-semibold text-foreground">Purpose</dt><dd>Remembers that you closed the cookie notice, so it does not appear on every page.</dd>
      <dt className="font-semibold text-foreground">Duration</dt><dd>Until you clear your browser data</dd>
    </dl>
    <p>Our hosting provider may set a strictly necessary security cookie to tell people from automated attacks. It is not used to track you.</p>
  </> },
  { id: "links", title: "Other websites", body: <>
    <p>Links to constituent bodies, social media and the former JBCC website take you to sites with their own cookie policies. Those sites may set cookies once you visit them.</p>
  </> },
  { id: "control", title: "Managing cookies", body: <>
    <p>You can block or delete cookies and local storage in your browser settings. The website still works if you do. You may simply see the cookie notice again.</p>
  </> },
  { id: "changes", title: "Changes", body: <>
    <p>If we add any cookie that is not strictly necessary, we will update this policy and ask for your consent first. See also the <Link to="/privacy">privacy policy</Link>.</p>
  </> },
];

function CookiesPage() {
  return <LegalDocument eyebrow="Site policies" title="Cookie policy" summary="This website uses no tracking cookies. Here is the one thing it does store, and why." sections={sections} />;
}
