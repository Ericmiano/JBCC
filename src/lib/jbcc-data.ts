export const siteLinks = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "What we do", to: "/what-we-do" as const },
  { label: "Resources", to: "/resources" as const },
  { label: "Events", to: "/events" as const },
  { label: "Ask JBCC", to: "/ask" as const },
  { label: "Contact", to: "/contact" as const },
];

export const resources = [
  { title: "JBCC Price Index — June 2022", type: "Price Indices", year: "2022", size: "193 KB", status: "Historical", issuer: "JBCC", edition: "Fluctuations clause price list · Nairobi zone · Ref 06/2022", url: "/documents/Final-JBCC-Price-Index-June-2022.pdf", sourceUrl: "https://jbcc.or.ke/download/final-jbcc-preindex-june-2022/" },
  { title: "JBCC Price Index — March 2022", type: "Price Indices", year: "2022", size: "195 KB", status: "Historical", issuer: "JBCC", edition: "Fluctuations clause price list · Nairobi zone · Ref 03/2022", url: "/documents/Final-Price-Index-March-2022.pdf", sourceUrl: "https://jbcc.or.ke/download/final-price-index-march-2022/" },
  { title: "JBCC Price Index — June 2021", type: "Price Indices", year: "2021", size: "231 KB", status: "Historical", issuer: "JBCC", edition: "Fluctuations clause price list · Nairobi zone · Ref 06/2021", url: "/documents/Price-Index-June-2021.pdf", sourceUrl: "https://jbcc.or.ke/download/price-index-june-2021/" },
  { title: "JBCC Price Index — March 2020", type: "Price Indices", year: "2020", size: "2.5 MB", status: "Historical", issuer: "JBCC", edition: "Fluctuations clause price list · Nairobi zone · Ref 03/2020 · scanned", url: "/documents/JBCC-March-2020.pdf", sourceUrl: "https://jbcc.or.ke/download/jbcc-march-2020/" },
  { title: "JBCC Price List — Q1 2018", type: "Price Indices", year: "2018", size: "217 KB", status: "Historical", issuer: "JBCC", edition: "Prices as at 31 March 2018 · Nairobi zone · Ref Q1/2018", url: "/documents/JBCC-Price-List-2018.pdf", sourceUrl: "https://jbcc.or.ke/download/jbcc-price-list-2018/" },
  { title: "JBCC Price List — November 2017", type: "Price Indices", year: "2017", size: "206 KB", status: "Historical", issuer: "JBCC", edition: "Prices as at 30 November 2017 · Nairobi zone · Ref 11/2017", url: "/documents/JBCC-Price-List-November-2017.pdf", sourceUrl: "https://jbcc.or.ke/download/jbcc-price-list-2017/", alternate: { label: "Scanned original", size: "4.1 MB", url: "/documents/JBCC-Price-List-2017.pdf" } },
  { title: "Physical Planning Handbook — Draft 2002", type: "Guidelines", year: "2002", size: "310 KB", status: "Draft", issuer: "Ministry of Lands and Settlement, Department of Physical Planning", edition: "Draft dated February 2002 · hosted in JBCC’s public catalogue", url: "/documents/Physical-Planning-Handbook-Draft-2002.pdf", sourceUrl: "https://jbcc.or.ke/download/physical-planning-handbook-draft-2002/" },
] as const;

export const newestPriceIndex = resources.find((resource) => resource.title.startsWith("JBCC Price Index —"));

/**
 * Board of Directors as listed on JBCC's previous website (index.php?view=about), archived by the
 * Wayback Machine on 15 September 2018. Historical record only; not the current board.
 */
export const board2018 = {
  capturedOn: "15 September 2018",
  source: "https://web.archive.org/web/20180915102519/http://www.jbcc.or.ke/index.php?view=about",
  members: [
    { name: "Kairu Bachia", role: "Quantity Surveyor, Chairman", body: "AAK" },
    { name: "Kanti Sanghani", role: "", body: "" },
    { name: "David Maina Nguyo", role: "Quantity Surveyor", body: "AAK" },
    { name: "Paul Ambatsa", role: "Quantity Surveyor", body: "AAK" },
    { name: "Aaron Gitonga", role: "Quantity Surveyor", body: "AAK" },
    { name: "Muchiri Waititu", role: "Architect", body: "AAK" },
    { name: "Evans Goro", role: "Engineer", body: "AAK" },
    { name: "Neelesh Hirani", role: "Secretary, Quantity Surveyor", body: "KABCEC" },
    { name: "Wilson Mugambi", role: "Architect", body: "AAK" },
    { name: "Dhanji Raghwani", role: "", body: "KABCEC" },
    { name: "Bobby Jandu", role: "", body: "KABCEC" },
    { name: "Hirji Seyani", role: "", body: "KABCEC" },
    { name: "Wilson Oluoch", role: "", body: "KABCEC" },
  ],
} as const;

/** Activities JBCC published on earlier versions of its website. */
export const pastActivities = [
  {
    year: "2018",
    title: "Review of the Agreement and Conditions of Contract for Building Works",
    text: "JBCC began reviewing its Agreement and Conditions of Contract for Building Works to reflect recent developments in the construction industry, and invited practitioners to send views on any part of the contract they wanted deliberated or revised.",
    source: "https://web.archive.org/web/20180915102523/http://www.jbcc.or.ke/index.php?view=activities",
  },
] as const;

export const seminarTopics = [
  "Principal Building Agreement",
  "Nominated / Selected Subcontract Agreement",
  "Minor Works Agreement",
  "Contract administration methods",
] as const;

export const unavailableResources = [
  { title: "Building Code 2006", type: "Guidelines", year: "2006", sourceUrl: "https://jbcc.or.ke/download/building-code-2006/" },
  { title: "JBCC Price Index — September 2022", type: "Price Indices", year: "2022", sourceUrl: "https://jbcc.or.ke/download/final-price-index-september-2022/" },
] as const;

export const workAreas = [
  { no: "01", title: "Discuss industry questions", text: "Provide a shared forum to discuss questions affecting Kenya’s building and construction industry." },
  { no: "02", title: "Develop shared contract procedures", text: "Promote equitable contract forms, cooperation and stability through contract and subcontract procedures and model forms." },
  { no: "03", title: "Maintain price fluctuation information", text: "Maintain information used in clauses addressing fluctuations in construction input prices." },
  { no: "04", title: "Support dispute resolution", text: "Promote conciliation and arbitration, including appointments of arbitrators, experts and umpires." },
] as const;

/** The seven objectives published on the live Services page (jbcc.or.ke/services, captured 9 October 2026). */
export const objectives = [
  { no: "01", title: "Consider industry questions", text: "To promote the consideration and discussion of all questions affecting the building industry, including builders and contractors on public and private works, architects, surveyors and engineers, and all ancillary and allied trades and professions." },
  { no: "02", title: "Promote equitable contracts", text: "To arrange and promote the adoption of equitable forms of contracts and other documents used in the building industry; to promote co-operation and stability through contract and subcontract procedure and model forms of contract; and to produce the particulars required for the fluctuations clauses in any agreement." },
  { no: "03", title: "Settle disputes by conciliation or arbitration", text: "To promote and encourage the settlement of disputes by conciliation or arbitration; to act as or nominate arbitrators, experts and umpires; and to help form, develop and maintain Boards of Conciliation and Arbitrators." },
  { no: "04", title: "Advance planning and building practice", text: "To advance the science and art of planning and building, promote excellence in the construction of buildings and just and honourable practice in the conduct of business, and suppress malpractice." },
  { no: "05", title: "Connect the industry with public bodies", text: "To give members of the Legislature and other public bodies facilities for conferring with people engaged in the building industry and ascertaining their views on matters affecting the industry." },
  { no: "06", title: "Inform and publish", text: "To furnish people engaged in the building industry with information on matters affecting it, and to print, publish, issue and circulate papers, periodicals, books and circulars that serve these objectives." },
  { no: "07", title: "Support allied organisations", text: "To subscribe to, support and promote any society, organisation or movement whose objectives benefit the building industry directly or indirectly." },
] as const;

export const mission = [
  "Monitoring and reviewing developments in the building and construction industry.",
  "Publishing relevant sets of contract documents, forms and guidelines relating to the building and construction industry.",
] as const;

export const vision = "To be the leading provider of contract administration and documents in the building and construction industry.";

/** Descriptions and websites from the constituent-body pages on jbcc.or.ke (last modified June 2022). */
export const partners = [
  { abbr: "AAK", name: "Architectural Association of Kenya", founded: "1967", url: "https://aak.or.ke/", text: "Kenya’s professional society for architects, quantity surveyors, town planners, engineers, landscape architects, environmental design consultants and construction project managers. It links professionals in government, the private sector and academia with policy makers, manufacturers, developers and financial institutions." },
  { abbr: "KABCEC", name: "Kenya Association of Building & Civil Engineering Contractors", founded: "1949", url: "https://kabcec.co.ke/", text: "Brings together building and civil engineering contractors in Kenya. JBCC’s source page describes a membership of more than 400 employer organisations. JBCC’s 2018 website noted that KABCEC takes part in formulating, revising and amending the conditions of contract for building works." },
  { abbr: "IEK", name: "Institution of Engineers of Kenya", founded: undefined, url: "https://www.iekenya.org/", text: "The learned society of the engineering profession, cooperating with national and international institutions to develop and apply engineering for the benefit of humanity." },
  { abbr: "IQSK", name: "Institute of Quantity Surveyors of Kenya", founded: undefined, url: "https://www.iqskenya.org/", text: "Promotes and safeguards the interests of Kenyan quantity surveyors, with the primary objective of advancing quantity surveying practice in Kenya." },
  { abbr: "ACEK", name: "Association of Consulting Engineers of Kenya", founded: "1968", url: "https://www.acek.co.ke/", text: "Advocates for the business and professional interests of consulting engineers and gives government, public institutions and industry a forum to engage consulting engineers as a group." },
  { abbr: "CIArb (K)", name: "Chartered Institute of Arbitrators, Kenya Branch", founded: "1984", url: "https://ciarbkenya.org/", text: "A branch of the Chartered Institute of Arbitrators, founded in London in 1915. It promotes the resolution of disputes by arbitration, mediation, adjudication and other forms of alternative dispute resolution." },
  { abbr: "KPDA", name: "Kenya Property Developers Association", founded: "2006", url: "https://www.kpda.or.ke/", text: "The representative body of Kenya’s residential, commercial and industrial property development sector, working with policy makers, financiers and citizens so the industry grows in an organised, efficient and ethical way." },
  { abbr: "KFMB", name: "Kenya Federation of Master Builders", founded: undefined, url: "https://kenyafederationofmasterbuilders.org/", text: "A contractors’ association that develops contractors through advocacy, vocational training, networking and capacity building." },
] as const;

/** Questions from the live FAQ page, last modified June 2022. Answers are historical and need Secretariat confirmation. */
export const faqs = [
  { q: "What is JBCC?", a: "The Joint Building and Construction Council is an umbrella body for eight associations in the building and construction industry." },
  { q: "What is the JBCC price index?", a: "A document with construction material prices, used by built-environment professionals. The FAQ described it as produced quarterly." },
  { q: "How often does JBCC produce its documents?", a: "The FAQ said four times a year, every three months. The newest file in the public catalogue is from June 2022." },
  { q: "Which associations are JBCC partners?", a: "AAK, IEK, IQSK, KABCEC, KPDA, KFMB, ACEK and CIArb (K). The source FAQ spells KFMB as “KFMD”." },
  { q: "How much is the JBCC Green Book?", a: "The FAQ quoted KSh 3,500–5,000. This is a 2022 figure, so confirm the current price with the Secretariat." },
  { q: "Where is the Green Book available?", a: "At the Secretariat, Suite 605, Blue Violets Plaza." },
] as const;

export const officeHours = "Monday to Friday, 8.00am to 5.00pm";

export const socialLinks = [
  { label: "Facebook", handle: "jbcckenya", url: "https://www.facebook.com/jbcckenya" },
  { label: "X (Twitter)", handle: "@jbcckenya", url: "https://twitter.com/jbcckenya" },
  { label: "Instagram", handle: "jbcckenya", url: "https://www.instagram.com/jbcckenya/" },
] as const;

export const searchItems = [
  ...siteLinks.map((item) => ({ title: item.label, type: "Page", to: item.to })),
  ...resources.map((item) => ({ title: item.title, type: item.type, url: item.url })),
  ...partners.map((item) => ({ title: `${item.name} (${item.abbr})`, type: "Constituent body", to: "/about" as const })),
  { title: "Board of Directors listed in 2018", type: "History", to: "/about" as const },
  ...pastActivities.map((item) => ({ title: `${item.title} (${item.year})`, type: "Past activity", to: "/events" as const })),
  { title: "Terms of use", type: "Site policy", to: "/terms" as const },
  { title: "Privacy policy", type: "Site policy", to: "/privacy" as const },
  { title: "Cookie policy", type: "Site policy", to: "/cookies" as const },
  { title: "Accessibility statement", type: "Site policy", to: "/accessibility" as const },
  ...unavailableResources.map((item) => ({ title: item.title, type: "Source entry unavailable", url: item.sourceUrl })),
] as const;
