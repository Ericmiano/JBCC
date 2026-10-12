import { createFileRoute, Link } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";
import { LegalDocument, type LegalSection } from "@/components/legal-document";
import { legalHead } from "@/lib/legal";

export const Route = createFileRoute("/privacy")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => legalHead(loaderData ?? "", "/privacy", "Privacy policy", "How the Joint Building & Construction Council handles personal data under Kenya’s Data Protection Act, 2019."),
  component: PrivacyPage,
});

const sections: LegalSection[] = [
  { id: "who", title: "Who we are", body: <>
    <p>The Joint Building and Construction Council (JBCC) is the data controller for personal data collected through this website and the Secretariat’s email and telephone lines. We handle personal data in line with Kenya’s Data Protection Act, 2019.</p>
  </> },
  { id: "collect", title: "What we collect", body: <>
    <p>This website has no user accounts, analytics, advertising or tracking tools.</p>
    <ul>
      <li><strong>Enquiries.</strong> The contact form does not send data to us. It opens an email in your own email app. If you send it, we receive your name, email address and message. The same applies when you email or call the Secretariat directly.</li>
      <li><strong>Technical data.</strong> Our hosting provider processes your IP address, browser details and the pages you request, so it can deliver the website and protect it from abuse.</li>
      <li><strong>Ask JBCC questions.</strong> When you use <Link to="/ask">Ask JBCC</Link>, your question is sent through Cloudflare AI Gateway to Anthropic, which generates the answer. We don’t attach your name or contact details. Please don’t include personal or confidential information in a question.</li>
      <li><strong>Browser storage.</strong> If you close the cookie notice, your browser stores a note of that on your device. It does not identify you. See the <Link to="/cookies">cookie policy</Link>.</li>
    </ul>
  </> },
  { id: "use", title: "How we use it", body: <>
    <ul>
      <li>To answer your enquiry about documents, price indices, seminars or Council business.</li>
      <li>To keep a record of correspondence with the Secretariat.</li>
      <li>To run the website securely.</li>
    </ul>
    <p>We rely on your consent when you contact us, and on our legitimate interest in running the Secretariat and the website. We do not use your data for automated decision-making or marketing without your consent.</p>
  </> },
  { id: "share", title: "Sharing your data", body: <>
    <p>We do not sell personal data. We share it only with service providers that host the website or our email, and, for Ask JBCC questions, Cloudflare and Anthropic, under appropriate safeguards, or where the law requires us to.</p>
    <p>Some of these providers may process data outside Kenya. Where they do, we rely on safeguards permitted by the Data Protection Act, 2019.</p>
  </> },
  { id: "retention", title: "How long we keep it", body: <>
    <p>We keep enquiry emails only as long as needed to respond and to maintain reasonable records of Secretariat business, and then delete them. Hosting logs are kept by our provider for a short period for security.</p>
  </> },
  { id: "rights", title: "Your rights", body: <>
    <p>Under the Data Protection Act, 2019 you have the right to:</p>
    <ul>
      <li>be informed about how your data is used</li>
      <li>access the personal data we hold about you</li>
      <li>object to processing</li>
      <li>have inaccurate data corrected</li>
      <li>have false or misleading data deleted</li>
    </ul>
    <p>To use these rights, email <a href="mailto:mail@jbcc.co.ke">mail@jbcc.co.ke</a>. If you are unhappy with our response, you can complain to the <a href="https://www.odpc.go.ke/" target="_blank" rel="noreferrer">Office of the Data Protection Commissioner</a>.</p>
  </> },
  { id: "security", title: "Security", body: <>
    <p>The website is served over an encrypted connection. Please do not send sensitive personal data, such as identity or payment details, through email.</p>
  </> },
  { id: "changes", title: "Changes to this policy", body: <>
    <p>We may update this policy. The date at the top of this page shows when it was last changed.</p>
  </> },
  { id: "contact", title: "Contact", body: <>
    <p>JBCC Secretariat, Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road, P.O. Box 44258, Nairobi 00100. Email <a href="mailto:mail@jbcc.co.ke">mail@jbcc.co.ke</a>.</p>
  </> },
];

function PrivacyPage() {
  return <LegalDocument eyebrow="Site policies" title="Privacy policy" summary="What personal data this website and the Secretariat handle, why, and your rights under Kenyan law." sections={sections} />;
}
