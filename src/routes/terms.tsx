import { createFileRoute, Link } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { legalHead } from "@/lib/legal";

export const Route = createFileRoute("/terms")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => legalHead(loaderData ?? "", "/terms", "Terms of use", "The terms that apply when you use the Joint Building & Construction Council website and its downloadable documents."),
  component: TermsPage,
});

const sections: LegalSection[] = [
  { id: "about", title: "About these terms", body: <>
    <p>This website is operated by the Joint Building and Construction Council (JBCC), Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road, P.O. Box 44258, Nairobi 00100, Kenya.</p>
    <p>By using the website you agree to these terms. If you do not agree, please do not use the website.</p>
  </> },
  { id: "information", title: "Information on this website", body: <>
    <p>The content is general information about JBCC, its constituent bodies, documents and seminars. It is not legal, contractual or professional advice for a particular project.</p>
    <p>Price indices, price lists and other documents are dated. Many are historical and may no longer be current. Check the date and status shown with each document, and confirm current editions, prices and seminar dates with the Secretariat before relying on them.</p>
    <p>Ask JBCC answers are written by AI from this website’s published content. They can be wrong or incomplete and are not advice. Check the linked sources and confirm anything you rely on with the Secretariat.</p>
    <p>Advisory Notes are given in good faith to explain the most effective use of JBCC documents. JBCC disclaims liability for any loss, damage or expense incurred by acting on them.</p>
  </> },
  { id: "documents", title: "Using documents and downloads", body: <>
    <p>You may view, download and print documents from this website for your own reference and for internal use within your organisation.</p>
    <p>You may not sell, alter, or republish JBCC documents, or present them as current editions, without JBCC’s written permission.</p>
    <p>Some documents in the archive were issued by other bodies, such as the Physical Planning Handbook issued by the Ministry of Lands and Settlement. Rights in those documents remain with their issuers.</p>
  </> },
  { id: "intellectual-property", title: "Names, logos and content", body: <>
    <p>The JBCC name, abbreviation and logo, and the text, photographs and video on this website, belong to JBCC or are used with permission. Names and logos of constituent bodies belong to those bodies.</p>
    <p>You may quote short extracts with a clear acknowledgement of JBCC as the source. For any other reuse, ask the Secretariat at <a href="mailto:mail@jbcc.co.ke">mail@jbcc.co.ke</a>.</p>
  </> },
  { id: "enquiries", title: "Enquiries and the contact form", body: <>
    <p>The contact form prepares an email in your own email app. Nothing is sent to JBCC until you send that email yourself. See the <Link to="/privacy">privacy policy</Link> for how we handle the information you send.</p>
  </> },
  { id: "links", title: "Links to other websites", body: <>
    <p>The website links to constituent bodies, social media pages and the former JBCC website. JBCC is not responsible for the content, availability or privacy practices of other websites.</p>
  </> },
  { id: "liability", title: "Availability and liability", body: <>
    <p>We aim to keep the website available and accurate, but we do not guarantee that it will be uninterrupted, error-free or up to date.</p>
    <p>To the extent permitted by the laws of Kenya, JBCC is not liable for any loss arising from use of, or reliance on, the website or its documents. Nothing in these terms limits liability that cannot be limited by law.</p>
  </> },
  { id: "changes", title: "Changes to these terms", body: <>
    <p>We may update these terms from time to time. The date at the top of this page shows when they were last changed.</p>
  </> },
  { id: "law", title: "Governing law", body: <>
    <p>These terms are governed by the laws of Kenya, and the courts of Kenya have jurisdiction over any dispute arising from them.</p>
  </> },
  { id: "contact", title: "Contact", body: <>
    <p>Email <a href="mailto:mail@jbcc.co.ke">mail@jbcc.co.ke</a> or call <a href="tel:+254202420806">+254 20 2420 806</a>.</p>
  </> },
];

function TermsPage() {
  return <LegalDocument eyebrow="Site policies" title="Terms of use" summary="The rules for using this website, its information and its downloadable documents." sections={sections} />;
}
