# JBCC source-site archive

Captured on 8 October 2026 from the public site at <https://jbcc.or.ke>.

## Contents

- `uploads/` contains the 275 media files successfully retrieved from the public WordPress media API. Paths preserve the source site's `wp-content/uploads` structure.
  A supplementary capture on 9 October 2026 added 17 original-size files that live institutional pages display but the anonymous API does not expose: eight board portraits from the About page and nine constituent-body logos. They are listed under `supplementary_media` in the manifest, bringing `uploads/` to 292 files.
- `documents/` contains the seven valid PDF files retrieved from the nine public WordPress Download Manager (WPDM) document entries.
- `package-pages/` preserves two HTML responses from WPDM entries that did not provide the advertised PDF.
- `manifest.json` records source URLs, local paths, file sizes, statuses, the failed media request, and the count discrepancy.

## Completeness and source problems

The public media API reported 359 items but exposed 276 records through anonymous pagination. Of those records, 275 files downloaded; media ID 9655 (`Full-video_2.jpeg`) returned HTTP 404. The remaining 83 reported items were not exposed by the anonymous API, so this is a best-effort public snapshot, not a complete copy of all 359 records. Seventeen of those hidden items were later recovered from page HTML; the rest are not referenced by the institutional pages checked.

The public WPDM index listed nine documents. Seven responses were valid PDFs. The Building Code 2006 package returned “No file is attached with this package!” and the September 2022 price-index package returned “File not found!” These HTML responses are retained in `package-pages/`, not mislabeled as PDFs. The newest valid price index downloaded is June 2022; verify current editions and prices with JBCC before relying on it.

The site's public post API also contains unrelated betting/casino SEO spam, demo-theme records, and obsolete commerce content. Those records are not institutional JBCC copy and are intentionally not imported into the redesign. The media archive includes similar theme leftovers; reuse individual files only after confirming relevance, provenance, and rights.

`public/media/` and `public/documents/` hold the small verified subset used by the redesign. The full archive remains outside the served public directory.
