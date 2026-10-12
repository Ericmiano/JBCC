# Live JBCC Site Inventory

Research checked 8 October 2026 (Africa/Nairobi). Findings below distinguish what the public site currently says from claims that should be reconfirmed before republication.

## Public routes and institutional information

### Takeaway

JBCC's public site is WordPress and has a published sitemap and REST API. The institutional material to preserve is its 1980 founding by AAK and KABCEC, its consensus contract-document role, core industry objectives, constituent bodies, resources, seminars, and contact details. The homepage contains construction-company template copy, while the post sitemap is polluted with unrelated betting/casino SEO posts; neither should be treated as authoritative JBCC content.

### Cited Findings

- `robots.txt` allows normal public crawling of the site and identifies `https://jbcc.or.ke/wp-sitemap.xml` as its sitemap. The sitemap index publishes post, page, WP Download Manager (`wpdmpro`), product, project, member, testimonial, partner, taxonomy, and user indexes. [robots.txt](https://jbcc.or.ke/robots.txt); [WordPress sitemap index](https://jbcc.or.ke/wp-sitemap.xml)
- The sitemap currently lists 466 posts and 50 pages; the other published indexes list 9 WP Download Manager packages, 6 products, 45 projects, 9 members, 3 testimonials, and 9 partners. The 466-post index contains many foreign-language betting/casino SEO titles. Do not mirror the whole post index as JBCC editorial content. [WordPress sitemap index](https://jbcc.or.ke/wp-sitemap.xml); [post sitemap](https://jbcc.or.ke/wp-sitemap-posts-post-1.xml); [page sitemap](https://jbcc.or.ke/wp-sitemap-posts-page-1.xml)
- Main institutional pages observed responding with HTTP 200 include `/`, `/about-us/`, `/services/`, `/contact-us/`, `/advisory-notes/`, `/e-documents/`, `/frequently-asked-questions/`, `/seminars/`, and `/events/`. The site's WP Download Manager index provides nine additional `/download/.../` routes. [page sitemap](https://jbcc.or.ke/wp-sitemap-posts-page-1.xml); [download sitemap](https://jbcc.or.ke/wp-sitemap-posts-wpdmpro-1.xml)
- The About page says JBCC was registered as a company founded by the Architectural Association of Kenya (AAK) and Kenya Association of Building and Civil Engineering Contractors (KABCEC) in 1980. It describes a representative body of building owners/developers, professional consultants, and general/specialist contractors whose experience informs JBCC documents, and says those documents express constituent consensus, standardization/good practice, equitable contractual risk, and use in Africa and elsewhere. [About JBCC](https://jbcc.or.ke/about-us/)
- The Services page's substantive copy is headed “Objectives.” It describes discussion of questions affecting the building industry; promoting equitable contract forms, cooperation and stability through contract/subcontract procedures and model forms; maintaining information for fluctuations clauses; and promoting conciliation/arbitration and related appointments. The page also has generic construction-template language (“We shape the life of tomorrow”). [Services](https://jbcc.or.ke/services/)
- The FAQ describes JBCC as an umbrella for eight other associations and names AAK, IEK, IQSK, KABCEC, KPDA, “KFMD,” ACEK, and CIArb(K). A separate JBCC partner route is `/partner/kfmb/`, so “KFMD” appears to be a typo for KFMB on the FAQ and should be checked before copy is reused. The FAQ says price indices are quarterly, says JBCC documents are issued four times per year, and quotes KSh 3,500–5,000 for a “green book”; these are live-site claims, not independently current-verified facts. [FAQ](https://jbcc.or.ke/frequently-asked-questions/); [partner index](https://jbcc.or.ke/wp-sitemap-posts-partner-1.xml)
- The Contact page gives Suite 605, Blue Violets Plaza, Kamburu Drive off Ngong Road, P.O. Box 44258, Nairobi 00100; `mail@jbcc.or.ke`; +254 20 2420 806 and +254 20 2420582. The footer says Monday–Friday, 8:00–17:00. These are the public site’s current displayed details. [Contact](https://jbcc.or.ke/contact-us/)
- The Advisory Notes page describes a free service to explain JBCC contract documentation and keep participants informed; it invites comments at `mail@jbcc.or.ke` and contains a disclaimer that the notes advise on effective use of JBCC documents. [Advisory Notes](https://jbcc.or.ke/advisory-notes/)
- The Seminars page names the Principal Building Agreement, Nominated/Selected Subcontract Agreement, Minor Works Agreement, and contract administration methods, says to email for seminar information, and says attendance certificates are provided. The Events page displays archive months only through August 2024 and many spam categories; I found no current upcoming-event listing during this pass. [Seminars](https://jbcc.or.ke/seminars/); [Events](https://jbcc.or.ke/events/)
- The E-Documents page currently renders no document listing beyond the site shell/footer. The homepage headline and body include generic builder/renovation copy (“foundations to framing,” siding, roofing, windows and finishes), a “Get a Quote” CTA, and “highest quality work”; this does not describe JBCC's institutional function. [E-Documents](https://jbcc.or.ke/e-documents/); [Homepage](https://jbcc.or.ke/)

### Inferences

- Preserve verified institutional purpose and service language, then rewrite the generic contractor-template hero and service framing around contracts, industry coordination, price information, dispute resolution, and member bodies. This follows the contrast between the About/Objectives pages and the homepage template copy. [About JBCC](https://jbcc.or.ke/about-us/); [Services](https://jbcc.or.ke/services/); [Homepage](https://jbcc.or.ke/)
- Treat event dates, index cadence, Green Book price, and any “over 40 years” experience wording as dated claims: the event archive ends in 2024, while the linked document packages I checked are dated no later than 2022. [Events](https://jbcc.or.ke/events/); [download sitemap](https://jbcc.or.ke/wp-sitemap-posts-wpdmpro-1.xml)

### Gaps

- The public sitemap is a WordPress route index, not a definitive business-content inventory: it includes template pages, stale routes, spam posts, and archive/taxonomy pages. A full crawl was not performed, and not all routes were reviewed in detail. [WordPress sitemap index](https://jbcc.or.ke/wp-sitemap.xml)
- The site does not establish whether quarterly publication, Green Book pricing, current seminar schedules, or the stated hours remain operationally accurate; ask JBCC to confirm those before launch. [FAQ](https://jbcc.or.ke/frequently-asked-questions/); [Seminars](https://jbcc.or.ke/seminars/); [Contact](https://jbcc.or.ke/contact-us/)

## Public media and documents

### Takeaway

The public WordPress media API provides a useful but inconsistent asset index. It reports 359 attachments, while four anonymous page requests yielded only 276 records, leaving 83 records unexplained; the saved CSV is a 276-record snapshot and must not be described as complete. Nine public download-package pages are listed, and seven corresponding `wpdmdl` requests returned PDF headers in the checks below.

### Cited Findings

- `https://jbcc.or.ke/wp-json/` identifies the site as “The Joint Building Construction Council” and exposes the public `wp/v2` namespace. A one-record media query reports `X-WP-Total: 359` and `X-WP-TotalPages: 359` at `per_page=1`. [WordPress REST API root](https://jbcc.or.ke/wp-json/); [media API, one per page](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=1)
- With `per_page=100`, the four page requests returned 72, 65, 90, and 49 records (276 total), although their headers still reported 359 total and 4 pages. The difference is 83 records; the reason is unknown. The accessible records captured here comprise 198 JPEGs, 76 PNGs, one MP4, and one TXT file. This is only a snapshot. [Media page 1](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=1); [page 2](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=2); [page 3](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=3); [page 4](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=4)
- The 276-record capture is saved at [`media-api-page-snapshot-276.csv`](media-api-page-snapshot-276.csv). It contains the captured source URLs, filenames, MIME types, and available dimensions/sizes. It does not prove completeness of the site’s uploads directory or all assets referenced by pages/plugins/themes.
- A public MP4 attachment is `https://jbcc.or.ke/wp-content/uploads/2022/06/Full-video.mp4`. Image attachments include video-slider thumbnails under `/wp-content/uploads/revslider/video-media/Full-video_1.jpeg` and `Full-video_2.jpeg`, and `/wp-content/uploads/2019/05/video-img.jpg`. A publicly linked JBCC logo is `/wp-content/uploads/2022/06/jbcc-logo.png`. [Media API](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=1); [download page example](https://jbcc.or.ke/download/physical-planning-handbook-draft-2002/)
- The download sitemap lists these nine public package routes: [Physical Planning Handbook, Draft 2002](https://jbcc.or.ke/download/physical-planning-handbook-draft-2002/), [Price Index June 2021](https://jbcc.or.ke/download/price-index-june-2021/), [Building Code 2006](https://jbcc.or.ke/download/building-code-2006/), [JBCC Price List 2018](https://jbcc.or.ke/download/jbcc-price-list-2018/), [JBCC Price List 2017](https://jbcc.or.ke/download/jbcc-price-list-2017/), [JBCC March 2020](https://jbcc.or.ke/download/jbcc-march-2020/), [Final JBCC Preindex June 2022](https://jbcc.or.ke/download/final-jbcc-preindex-june-2022/), [Final Price Index March 2022](https://jbcc.or.ke/download/final-price-index-march-2022/), and [Final Price Index September 2022](https://jbcc.or.ke/download/final-price-index-september-2022/). [Download sitemap](https://jbcc.or.ke/wp-sitemap-posts-wpdmpro-1.xml)
- The respective package pages display these approximate sizes: 310 KB, 231 KB, 4 KB, 217 KB, 4 MB, 3 MB, 193 KB, 195 KB, and 195 KB. The public `?wpdmdl=` requests returned HTTP 200 with `application/pdf` for IDs 9345, 9348, 9582, 9584, 9586, 9650, and 9652. IDs 9350 (Building Code 2006) and 9664 (September 2022 index) returned `text/html` on the header request used, so actual file delivery for those two was not verified. These package-page figures and download IDs should be checked again when acquiring the files. [Download sitemap](https://jbcc.or.ke/wp-sitemap-posts-wpdmpro-1.xml); [example package page](https://jbcc.or.ke/download/final-jbcc-preindex-june-2022/)

### Inferences

- Fetch/compare media records against all four pages and every file link in page content before marking the asset transfer complete. The 83-record mismatch and uploads/theme/plugin assets outside the attachment API mean the current CSV is a starting manifest only. [Media API, page 1](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=100&page=1); [WordPress sitemap index](https://jbcc.or.ke/wp-sitemap.xml)
- Preserve the package titles and files as distinct resources, but visibly date old indices and price lists so visitors do not mistake 2022/older files for current releases. The latest dated package in the public index is the September 2022 price index. [Download sitemap](https://jbcc.or.ke/wp-sitemap-posts-wpdmpro-1.xml)

### Gaps

- No full crawl of page HTML, media files, uploads directories, third-party embeds, or theme/plugin files was completed. The media API count mismatch prevents an exhaustive claim. [WordPress sitemap index](https://jbcc.or.ke/wp-sitemap.xml); [media API](https://jbcc.or.ke/wp-json/wp/v2/media?per_page=1)
- Building Code 2006 and September 2022 download delivery were not confirmed as PDF bytes; their landing pages exist and display a download package, but the tested download response was HTML. [Building Code page](https://jbcc.or.ke/download/building-code-2006/); [September 2022 page](https://jbcc.or.ke/download/final-price-index-september-2022/)

## Board roster verification

### Takeaway

The local eight-person roster should not be presented as current. An AAK report says the JBCC board was reconstituted and records new AAK, KABCEC, and KPDA appointees, including a new chair, which conflicts with the local roster. One local member name is corroborated by an IEK page, but no current complete JBCC roster was found.

### Cited Findings

- The local redesign data lists Arch. Muchiri L. Waititu as Chairperson (AAK), QS Peter Kariuki as Vice-Chairperson (IQSK), Kenneth Luusa as Secretary (KPDA), and five additional member representatives: Nathaniel Matalanga, Ramesh Kurji Vishram, Josephat Munyoki, Siphila Wanjiku, and Nyagah Kithinji Boore. [Local JBCC data](../../src/lib/jbcc-data.ts)
- The official AAK AGM report says the JBCC board “reconstituted” and that AAK appointed QS Haron Nyakundi to take over the chairmanship; it also records KABCEC appointee Mr. Dhanji Raghwani and KPDA appointee Mr. Alex Waiharo. This conflicts with the local Chairperson and its KABCEC/KPDA representatives. The report does not publish a complete roster in the section found. [AAK AGM Report PDF](https://aak.or.ke/wp-content/uploads/2026/02/AAK-AGM-Report-2025_compressed.pdf)
- IEK's public nominations page lists Eng. Nathaniel Matalanga as a board member of JBCC, corroborating that name but not establishing the appointment date or full current board. [IEK nominations page](https://mail.iekenya.org/members-nominated-institution-engineers-kenya-iek-boards)
- The live JBCC sitemap includes a QS Peter Kariuki member page and a Muchiri member page, but the retrieved pages show titles and generic shells rather than JBCC office/board roles. KPDA's current management page lists Ken Luusa as KPDA Chairman; it does not verify his claimed JBCC secretary role. [JBCC Peter Kariuki page](https://jbcc.or.ke/member/qs-peter-kariuki/); [JBCC Muchiri page](https://jbcc.or.ke/member/member-construction-2/); [KPDA management structure](https://www.kpda.or.ke/management-structure)

### Inferences

- Treat Haron Nyakundi, Dhanji Raghwani, and Alex Waiharo as the latest sourced appointments identified here, while describing the rest of the current board as unverified. The AAK report's description of a reconstitution makes the local full roster likely stale, but does not alone establish every seat. [AAK AGM Report PDF](https://aak.or.ke/wp-content/uploads/2026/02/AAK-AGM-Report-2025_compressed.pdf)
- Verify names, roles, representation, and term dates with JBCC before publishing a full board grid; keep unsupported names out of a “current board” presentation. [AAK AGM Report PDF](https://aak.or.ke/wp-content/uploads/2026/02/AAK-AGM-Report-2025_compressed.pdf); [JBCC sitemap](https://jbcc.or.ke/wp-sitemap.xml)

### Gaps

- I found no public JBCC page with a dated, complete current board roster. The local board roles beyond the changes documented in the AAK report therefore remain unverified. [JBCC About page](https://jbcc.or.ke/about-us/); [AAK AGM Report PDF](https://aak.or.ke/wp-content/uploads/2026/02/AAK-AGM-Report-2025_compressed.pdf)
