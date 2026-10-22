# Wayback Machine snapshots of jbcc.or.ke

Scraped on 22 October 2026 with `scripts/wayback_scrape.py` from the Internet
Archive's Wayback Machine. Files are the original bytes as captured (`id_`
mode), without the Wayback toolbar or rewritten links.

## Snapshots

The three most recent homepage captures:

| Snapshot | Homepage capture |
|---|---|
| 12 February 2025, 08:58 UTC | `20250212085829` |
| 7 February 2025, 09:09 UTC | `20250207090904` |
| 18 November 2024, 21:56 UTC | `20241118215638` |

The three homepages have identical text, links and images. They differ only
in WordPress version strings (6.7.1 to 6.7.2) and per-request security tokens.

For each snapshot, every internal page linked from the homepage was requested
from the capture closest to that date, along with the document download pages
those pages link to and the images and files they use.

## What the archive holds

- **Pages.** Besides the homepage, the Wayback Machine has only ever archived
  four internal pages, all from March 2023: About Us, Advisory Notes, Contact
  Us and Services. The constituent-body pages, FAQ, Seminars, Articles and
  every `/download/` package page were never captured. The manifest records
  them with status 404.
- **Text compared with the live site on 22 October 2026.** Home, About Us,
  Contact Us and Services match the live pages. The March 2023 Advisory Notes
  page lacks the M-Pesa payment form and the document list the live page
  shows now.
- **Media.** All 11 archived images are byte-identical to files already in
  `../uploads/`. The only file not held there is a 68-byte placeholder image
  from the slider plugin.
- **Older versions.** Outside these three snapshots, the archive also holds a
  2018 version of the site, including `/docs/jbccPriceList.pdf`, and earlier
  homepage captures from 2020 to 2023. They were not scraped.

## Layout

- `pages/` holds each captured page as `<slug>@<capture timestamp>.html` with
  extracted text in a matching `.txt` file.
- `media/` mirrors the original site paths.
- `manifest.json` lists, per snapshot, the page and media captures used,
  with capture timestamps, HTTP status and SHA-1 hashes.

## Full-history search (`history/`)

`scripts/wayback_discover.py` lists every URL the Wayback Machine holds for
`jbcc.or.ke` and its subdomains (429 successful captures), drops SEO-spam posts
and theme or plugin files, and saves every distinct version of each remaining
page plus one copy of each image and document. Run on 22 October 2026, it also
found the WordPress build host `jbcc.jamirogroup.com` (March–April 2023), whose
15 page captures match the live pages apart from the Advisory Notes file sizes.

What it found that the March 2023 to February 2025 snapshots did not:

- **The 2018 site** (`www.jbcc.or.ke/index.php?view=…`, also served from
  `old.jbcc.or.ke` until 2023): About, Activities, Downloads, Media Center and
  Contact pages. The About page lists a 13-member Board of Directors; the
  Activities page records the 2018 review of the Agreement and Conditions of
  Contract for Building Works; the Downloads page offers the November 2017
  price list.
- **The November 2017 price list as a text PDF.** The 2018 site's
  `docs/jbccPriceList.pdf` is a saved Google Drive viewer page, not a PDF. The
  Drive file it points to was still public and is saved in
  `history/assets/drive.google.com/`. It is a searchable 6-page PDF of the same
  edition (ref 11/2017) that the live site only offers as a 4.1 MB scan.
- **Images.** The 2018–2022 logo matches the current one. A 1000×534 stock
  construction banner (`JBCC-slidebanner.png`) and a placeholder profile image
  were not used on the new site.
- **Not usable.** Homepage captures from June and August 2024 are truncated
  mid-page, and the Media Center page and the 2023 Seminars calendar were
  empty.

Added to the website from this search: the text PDF (Resources), the 2018 board
as a dated historical record (About), the 2018 contract review (Events, Past
activities), and KABCEC's role in revising the contract conditions (About).

## Redaction

Saved pages are scanned for Google API keys (`AIza…`) and the keys are replaced
with `REDACTED-GOOGLE-API-KEY`. The 2018 `jbccPriceList.pdf.saved-drive-page.html`
contained Google's own client keys for the Drive viewer; they are not JBCC
credentials, but they triggered GitHub secret scanning, so they were redacted.
Both scrape scripts now redact such keys automatically.
