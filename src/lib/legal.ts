export const LEGAL_LAST_UPDATED = "12 October 2026";

export const legalLinks = [
  { label: "Terms of use", to: "/terms" as const },
  { label: "Privacy policy", to: "/privacy" as const },
  { label: "Cookie policy", to: "/cookies" as const },
  { label: "Accessibility", to: "/accessibility" as const },
];

export function legalHead(origin: string, path: string, title: string, description: string) {
  return {
    meta: [
      { title: `${title} — JBCC` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — JBCC` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${origin}${path}` },
      { property: "og:image", content: `${origin}/media/jbcc-hero-group.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${title} — JBCC` },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${origin}/media/jbcc-hero-group.jpg` },
    ],
    links: [{ rel: "canonical", href: `${origin}${path}` }],
  };
}
