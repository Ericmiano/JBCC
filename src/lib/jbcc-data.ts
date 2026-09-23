export const siteLinks = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "What we do", to: "/what-we-do" as const },
  { label: "Resources", to: "/resources" as const },
  { label: "Events", to: "/events" as const },
  { label: "Contact", to: "/contact" as const },
];

export const resources = [
  { title: "Final JBCC Price Index — June 2022", type: "Price Indices", year: "2022", size: "193 KB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/FINAL-JBCC-PRICEINDEX-JUNE-2022.pdf" },
  { title: "Final JBCC Price Index — March 2022", type: "Price Indices", year: "2022", size: "195 KB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/FINAL-PRICE-INDEX-MARCH-2022.pdf" },
  { title: "JBCC Price Index — June 2021", type: "Price Indices", year: "2021", size: "231 KB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/Price-Index-JUNE-2021.pdf" },
  { title: "JBCC Price Index — March 2020", type: "Price Indices", year: "2020", size: "2.5 MB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/JBCC-MARCH-2020.pdf" },
  { title: "JBCC Price List 2018", type: "Price Indices", year: "2018", size: "217 KB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/JBCC-PRICE-LIST-2018.pdf" },
  { title: "JBCC Price List 2017", type: "Price Indices", year: "2017", size: "4.1 MB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/JBCC-PRICE-LIST-2017.pdf" },
  { title: "Physical Planning Handbook — Draft 2002", type: "Guidelines", year: "2002", size: "310 KB", url: "https://jbcc.or.ke/wp-content/uploads/2022/06/Physical-Planning-Handbook-Draft-2002.pdf" },
] as const;

export const workAreas = [
  { no: "01", title: "Contract documentation", text: "Promoting equitable forms of contracts, price fluctuation clauses and documents for Kenya’s building industry." },
  { no: "02", title: "Industry development", text: "Advancing planning and building practice while promoting excellence and honourable professional conduct." },
  { no: "03", title: "Dispute resolution", text: "Promoting conciliation and arbitration, including the nomination of arbitrators, experts and umpires." },
  { no: "04", title: "Industry information", text: "Publishing papers, periodicals, books, circulars and practical information for the built environment." },
  { no: "05", title: "Professional engagement", text: "Bringing industry bodies together and representing built-environment views to public institutions." },
] as const;

export const partners = [
  ["AAK", "Architectural Association of Kenya"],
  ["KABCEC", "Kenya Association of Building & Civil Engineering Contractors"],
  ["IEK", "Institution of Engineers of Kenya"],
  ["IQSK", "Institute of Quantity Surveyors of Kenya"],
  ["ACEK", "Association of Consulting Engineers of Kenya"],
  ["CIArb (K)", "Chartered Institute of Arbitrators, Kenya Branch"],
  ["KPDA", "Kenya Property Developers Association"],
  ["KFMB", "Kenya Federation of Master Builders"],
] as const;

export const board = [
  { name: "Arch. Muchiri L. Waititu", role: "Chairperson · AAK", image: "muchiri-waititu.jpg.asset.json" },
  { name: "QS Peter Kariuki", role: "Vice-Chairperson · IQSK", image: "peter-kariuki.jpg.asset.json" },
  { name: "Kenneth Luusa", role: "Secretary · KPDA", image: "kenneth-luusa.jpg.asset.json" },
  { name: "Eng. Nathaniel Matalanga", role: "Member · IEK", image: "nathaniel-matalanga.jpg.asset.json" },
  { name: "Ramesh Kurji Vishram", role: "Member · KABCEC", image: "ramesh-vishram.jpg.asset.json" },
  { name: "QS Josephat Munyoki", role: "Member · KFMB", image: "josephat-munyoki.jpg.asset.json" },
  { name: "Dr. Eng. Siphila Wanjiku", role: "Member · ACEK", image: "siphila-wanjiku.jpg.asset.json" },
  { name: "QS Nyagah Kithinji Boore", role: "Member · CIArb (K)", image: "nyagah-boore.jpg.asset.json" },
] as const;

export const searchItems = [
  ...siteLinks.map((item) => ({ title: item.label, type: "Page", to: item.to })),
  ...resources.map((item) => ({ title: item.title, type: item.type, url: item.url })),
] as const;