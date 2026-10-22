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
