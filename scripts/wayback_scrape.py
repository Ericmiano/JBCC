"""Scrape jbcc.or.ke as archived by the Wayback Machine at given snapshot timestamps.

For each snapshot: the homepage, every internal page it links to, and WP Download
Manager package pages linked from those pages, each from the capture closest to the
snapshot time. Then every image/document those pages reference. Original bytes are
fetched with the `id_` flag (no Wayback toolbar or URL rewriting). Captures shared
between snapshots are downloaded once.

usage: python -I scripts/wayback_scrape.py site-source-archive/wayback TS [TS ...]
"""
import gzip, hashlib, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request, zlib
from html.parser import HTMLParser

sys.stdout.reconfigure(encoding="utf-8")
OUT = sys.argv[1]
SNAPSHOTS = sys.argv[2:]
UA = "JBCC-archive-research/1.0 (contact: mail@jbcc.co.ke)"
HOSTS = {"jbcc.or.ke", "www.jbcc.or.ke"}
MEDIA_RE = re.compile(r"\.(jpe?g|png|gif|webp|svg|mp4|pdf|docx?|xlsx?|pptx?)$", re.I)
SKIP_PATH = re.compile(r"^/(wp-json|wp-admin|wp-login|feed|comments|xmlrpc|cart|checkout|my-account|shop)|/feed/?$|^/\?|^/(category|tag|author)/", re.I)

# Archived third-party pages (e.g. saved Google Drive viewers) embed public client API keys.
# Redact them so the archive never trips secret scanning or republishes someone else's key.
SECRET_PATTERNS = [re.compile(r"AIza[0-9A-Za-z_-]{35}")]


def redact(text):
    for pattern in SECRET_PATTERNS:
        text = pattern.sub("REDACTED-GOOGLE-API-KEY", text)
    return text



def fetch(url, tries=4):
    for attempt in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "gzip"})
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                body = r.read()
                enc = (r.headers.get("Content-Encoding") or "").lower()
                if enc == "gzip" or body[:2] == b"\x1f\x8b":
                    try: body = gzip.decompress(body)
                    except OSError: pass
                elif enc == "deflate":
                    body = zlib.decompress(body)
                return r.status, r.geturl(), r.headers.get("Content-Type", ""), body
        except urllib.error.HTTPError as e:
            if e.code in (404, 403, 410):
                return e.code, url, "", b""
            wait = 10 * (attempt + 1)
        except (urllib.error.URLError, TimeoutError, ConnectionError):
            wait = 10 * (attempt + 1)
        time.sleep(wait)
    return 0, url, "", b""


def captured_ts(final_url):
    m = re.search(r"/web/(\d{14})", final_url)
    return m.group(1) if m else None


class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = set(); self.media = set(); self.text = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"): self.skip += 1
        if tag in ("p", "div", "li", "h1", "h2", "h3", "h4", "br", "section", "tr", "td", "a"): self.text.append("\n")
        if tag == "a" and a.get("href"): self.links.add(a["href"])
        for key in ("src", "data-src", "data-lazyload", "data-lazy-src", "href", "poster", "data-mp4", "data-thumb"):
            v = (a.get(key) or "").strip()
            if v and MEDIA_RE.search(urllib.parse.urlsplit(v).path): self.media.add(v)
        for v in re.findall(r"url\(['\"]?([^'\")]+)", a.get("style") or ""):
            if MEDIA_RE.search(urllib.parse.urlsplit(v).path): self.media.add(v)
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"): self.skip = max(0, self.skip - 1)
    def handle_data(self, d):
        if not self.skip: self.text.append(d)


def canonical(url, base="https://jbcc.or.ke/"):
    url = urllib.parse.urljoin(base, url.strip())
    p = urllib.parse.urlsplit(url)
    if p.scheme not in ("http", "https") or p.hostname not in HOSTS: return None
    path = p.path or "/"
    return urllib.parse.urlunsplit(("https", "jbcc.or.ke", path, p.query, ""))


def slug(url):
    p = urllib.parse.urlsplit(url)
    s = (p.path.strip("/") or "home").replace("/", "__")
    if p.query: s += "__" + re.sub(r"[^A-Za-z0-9]+", "-", p.query)[:60]
    return s[:150]


os.makedirs(OUT, exist_ok=True)
pages_dir = os.path.join(OUT, "pages"); media_dir = os.path.join(OUT, "media")
os.makedirs(pages_dir, exist_ok=True); os.makedirs(media_dir, exist_ok=True)
capture_cache = {}  # (url, captured_ts) -> record
manifest = {"source": "https://web.archive.org", "site": "https://jbcc.or.ke", "retrieved_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "snapshots": {}, "pages": {}, "media": {}}


def get_page(url, ts):
    status, final, ctype, body = fetch(f"https://web.archive.org/web/{ts}id_/{url}")
    time.sleep(1.5)
    cap = captured_ts(final) or ts
    key = f"{url} @ {cap}"
    if key in manifest["pages"]:
        return manifest["pages"][key], None
    rec = {"url": url, "captured": cap, "status": status, "content_type": ctype.split(";")[0], "bytes": len(body)}
    parser = None
    if status == 200 and body and "html" in ctype.lower():
        html = redact(body.decode("utf-8", errors="replace"))
        name = f"{slug(url)}@{cap}"
        open(os.path.join(pages_dir, name + ".html"), "w", encoding="utf-8").write(html)
        parser = Links(); parser.feed(html)
        text = "\n".join(t for t in (re.sub(r"\s+", " ", x).strip() for x in "".join(parser.text).split("\n")) if t)
        open(os.path.join(pages_dir, name + ".txt"), "w", encoding="utf-8").write(text)
        rec.update(file=f"pages/{name}.html", text_file=f"pages/{name}.txt", text_sha1=hashlib.sha1(text.encode()).hexdigest())
    manifest["pages"][key] = rec
    return rec, parser


for ts in SNAPSHOTS:
    print(f"== snapshot {ts}", flush=True)
    snap = {"pages": [], "media": []}
    home, hp = get_page("https://jbcc.or.ke/", ts)
    snap["pages"].append(f"https://jbcc.or.ke/ @ {home['captured']}")
    level1 = sorted({c for c in (canonical(h) for h in (hp.links if hp else [])) if c and not SKIP_PATH.search(urllib.parse.urlsplit(c).path)} - {"https://jbcc.or.ke/"})
    media_refs = set(hp.media) if hp else set()
    queue = [(u, 1) for u in level1]
    seen = set(level1) | {"https://jbcc.or.ke/"}
    while queue:
        url, depth = queue.pop(0)
        rec, parser = get_page(url, ts)
        snap["pages"].append(f"{url} @ {rec['captured']}")
        print(f"  {rec['status']} {rec['captured']} {url}", flush=True)
        if parser:
            media_refs |= parser.media
            if depth == 1:  # follow only document-package links one level deeper
                for h in parser.links:
                    c = canonical(h, url)
                    if c and c not in seen and "/download/" in c and "wpdmdl=" not in c:
                        seen.add(c); queue.append((c, 2))
                    elif c and "wpdmdl=" in c:
                        media_refs.add(c)
    for ref in sorted(media_refs):
        src = urllib.parse.urljoin("https://jbcc.or.ke/", ref.strip())
        if src.startswith("//"): src = "https:" + src
        p = urllib.parse.urlsplit(src)
        if p.hostname not in HOSTS | {"jbcc.jamirogroup.com"}: continue
        snap["media"].append(src)
        if src in manifest["media"]: continue
        status, final, ctype, body = fetch(f"https://web.archive.org/web/{ts}id_/{src}")
        time.sleep(1.0)
        rec = {"url": src, "captured": captured_ts(final), "status": status, "content_type": ctype.split(";")[0], "bytes": len(body)}
        if status == 200 and body and "html" not in ctype.lower():
            rel = p.path.lstrip("/")
            if "wpdmdl=" in src:
                rel = "downloads/" + slug(src) + (".pdf" if body[:4] == b"%PDF" else ".bin")
            path = os.path.join(media_dir, *rel.split("/"))
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, "wb").write(body)
            rec["file"] = "media/" + rel
            rec["sha1"] = hashlib.sha1(body).hexdigest()
        manifest["media"][src] = rec
        print(f"  media {status} {rec['bytes']:>9} {src}", flush=True)
    manifest["snapshots"][ts] = snap
    json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)

json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print("pages:", len(manifest["pages"]), "media:", len(manifest["media"]))
