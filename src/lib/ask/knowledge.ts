import {
  faqs,
  mission,
  newestPriceIndex,
  objectives,
  officeHours,
  partners,
  resources,
  seminarTopics,
  socialLinks,
  unavailableResources,
  vision,
} from "@/lib/jbcc-data";

/**
 * Everything "Ask JBCC" may answer from. Each entry is one citable source: the
 * model only sees this text, and every citation it returns points back to an
 * entry's `url`. Built from the same data the pages render, so answers stay in
 * step with what the site publishes. Order is stable so the prompt prefix caches.
 */
export type KnowledgeSource = {
  /** Site-relative link shown to visitors when this source is cited. */
  url: string;
  title: string;
  kind: "Page" | "Document" | "Seminars" | "Constituent body" | "FAQ" | "Contact" | "Site policy";
  text: string;
};

const SECRETARIAT = "Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road, P.O. Box 44258, Nairobi 00100";

export const knowledgeSources: readonly KnowledgeSource[] = [
  {
    url: "/about",
    title: "About JBCC: history and representation",
    kind: "Page",
    text: [
      "The Joint Building and Construction Council (JBCC) was founded in 1980 by the Architectural Association of Kenya (AAK) and the Kenya Association of Building and Civil Engineering Contractors (KABCEC).",
      "Its committee represents building owners and developers, professional consultants, and general and specialist contractors, whose experience informs JBCC documents.",
      "JBCC describes its documents as expressing the consensus of its constituent members, published in the interests of standardisation and good practice, with an equitable distribution of contractual risk.",
      `Vision: ${vision}`,
      `Mission: ${mission.join(" ")}`,
      `Eight constituent bodies now sit on the Council: ${partners.map((p) => `${p.name} (${p.abbr})`).join(", ")}.`,
      "A current, dated board roster has not been published on this website. Contact the Secretariat for current office holders.",
    ].join("\n"),
  },
  {
    url: "/what-we-do",
    title: "What JBCC does: the Council's seven objectives",
    kind: "Page",
    text: objectives.map((o) => `Objective ${Number(o.no)}, ${o.title}: ${o.text}`).join("\n"),
  },
  {
    url: "/what-we-do",
    title: "Advisory Notes",
    kind: "Page",
    text: [
      "Advisory Notes are a free JBCC service that explains how JBCC contract documentation is developed, interpreted and applied.",
      "They address specific contractual elements in more detail than the documents allow and help users carry out their roles under the contract, instead of issuing a new edition for every change.",
      "Comments and suggestions for future topics are welcome at mail@jbcc.co.ke.",
      "Disclaimer: Advisory Notes give advice in good faith on the most effective use of JBCC documents; JBCC disclaims liability for any loss, damage or expense incurred by acting on them.",
    ].join("\n"),
  },
  {
    url: "/resources",
    title: "Resource centre: document archive status",
    kind: "Page",
    text: [
      `The resource centre lists ${resources.length} downloadable PDFs captured from JBCC's public catalogue. All are historical or draft; none is confirmed as current.`,
      `The newest downloadable price index is ${newestPriceIndex?.title.replace("JBCC Price Index — ", "") ?? "not listed"}.`,
      `Catalogue entries without a downloadable file: ${unavailableResources.map((r) => `${r.title} (${r.year})`).join("; ")}. Their source pages returned "no file attached" or "file not found".`,
      "Confirm current editions and prices with the Secretariat before relying on any archived record.",
    ].join("\n"),
  },
  ...resources.map((r): KnowledgeSource => ({
    url: r.url,
    title: r.title,
    kind: "Document",
    text: [
      `${r.title}. Category: ${r.type}. Year: ${r.year}. Status: ${r.status}. Issued by: ${r.issuer}.`,
      `Edition details: ${r.edition}. Format: PDF, ${r.size}.`,
      r.type === "Price Indices"
        ? "JBCC publishes fluctuation clause price lists for operating the building contract fluctuation clause where the prices are cited in contract documents. This edition is historical, not a current price."
        : "This document is hosted in JBCC's public catalogue but was issued by another body.",
    ].join("\n"),
  })),
  {
    url: "/events",
    title: "Seminars on JBCC agreements",
    kind: "Seminars",
    text: [
      `JBCC lists these seminar subjects: ${seminarTopics.join("; ")}.`,
      "An attendance certificate is issued for each seminar attended.",
      "No upcoming seminar dates are published on this website. Ask the Secretariat at mail@jbcc.co.ke for the next schedule, fees and registration.",
    ].join("\n"),
  },
  ...partners.map((p): KnowledgeSource => ({
    url: "/about",
    title: `${p.name} (${p.abbr})`,
    kind: "Constituent body",
    text: `${p.name} (${p.abbr}) is a JBCC constituent body.${p.founded ? ` Established ${p.founded}.` : ""} ${p.text} Website: ${p.url}`,
  })),
  {
    url: "/resources#faq-title",
    title: "Frequently asked questions (June 2022)",
    kind: "FAQ",
    text: [
      "These answers come from the JBCC FAQ last updated in June 2022 and may be out of date.",
      ...faqs.map((f) => `Q: ${f.q} A: ${f.a}`),
    ].join("\n"),
  },
  {
    url: "/contact",
    title: "Contact the JBCC Secretariat",
    kind: "Contact",
    text: [
      `Office: ${SECRETARIAT}.`,
      "Email: mail@jbcc.co.ke. Telephone: +254 20 2420 806 or +254 20 2420 582.",
      `Office hours: ${officeHours}.`,
      `Social media: ${socialLinks.map((s) => `${s.label} ${s.handle}`).join(", ")}.`,
      "The Secretariat handles enquiries about documents, price indices, seminars, Advisory Notes and Council business.",
    ].join("\n"),
  },
  {
    url: "/terms",
    title: "Terms of use",
    kind: "Site policy",
    text: "Website content is general information, not legal or professional advice. Documents are dated and many are historical. Visitors may download and print documents for their own reference and internal use, but may not sell, alter or republish JBCC documents without written permission. The terms are governed by the laws of Kenya.",
  },
  {
    url: "/privacy",
    title: "Privacy policy",
    kind: "Site policy",
    text: "JBCC handles personal data under Kenya's Data Protection Act, 2019. The website has no accounts, analytics or advertising. The contact form opens the visitor's own email app. Questions typed into Ask JBCC are sent to JBCC's AI providers to generate an answer and are not used to identify visitors. Visitors can exercise their data rights by emailing mail@jbcc.co.ke.",
  },
  {
    url: "/cookies",
    title: "Cookie policy",
    kind: "Site policy",
    text: "The website uses no tracking or advertising cookies. It stores one local-storage item that remembers the visitor closed the cookie notice.",
  },
  {
    url: "/accessibility",
    title: "Accessibility statement",
    kind: "Site policy",
    text: "The website aims to meet WCAG 2.2 AA. Known limitations: the forum video has no captions yet, two archived price lists are scanned images, and older PDFs lack accessibility tagging. The Secretariat can provide information in another format on request.",
  },
];

/** Links the model may cite. Anything else in a citation is dropped before it reaches the page. */
export const knowledgeUrls: ReadonlySet<string> = new Set(knowledgeSources.map((source) => source.url));

const STOP_WORDS = new Set("a an and are as at be by can do does for from how i in is it jbcc me my of on or the to what when where which who why with you your".split(" "));

function terms(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

/**
 * Keyword ranking used when no model answer is available, so visitors still get
 * pointers to the right pages. Titles weigh more than body text.
 */
export function findRelevantSources(question: string, limit = 4): KnowledgeSource[] {
  const wanted = terms(question);
  if (!wanted.length) return [];
  const seen = new Set<string>();
  return knowledgeSources
    .map((source) => {
      const title = terms(source.title);
      const body = terms(source.text);
      const score = wanted.reduce((sum, term) => sum + (title.some((t) => t.startsWith(term)) ? 3 : 0) + body.filter((t) => t.startsWith(term)).length, 0);
      return { source, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .filter(({ source }) => (seen.has(source.url + source.title) ? false : (seen.add(source.url + source.title), true)))
    .slice(0, limit)
    .map(({ source }) => source);
}
