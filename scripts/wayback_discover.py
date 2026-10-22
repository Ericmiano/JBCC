"""Full-history Wayback Machine discovery for jbcc.or.ke.

Lists every URL the Wayback Machine holds for the domain, drops SEO-spam posts and
theme/plugin/system files, then downloads:
  - every distinct capture (by content digest) of each remaining HTML page,
  - one capture of each image, video and document.
Original bytes are fetched with the `id_` flag. Pages also get an extracted .txt.

usage: python -I scripts/wayback_discover.py site-source-archive/wayback/history
"""
import gzip, hashlib, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request, zlib
from html.parser import HTMLParser

sys.stdout.reconfigure(encoding="utf-8")
OUT = sys.argv[1]
UA = "JBCC-archive-research/1.0 (contact: mail@jbcc.co.ke)"
CDX = "https://web.archive.org/cdx/search/cdx"
SPAM = re.compile(r"casino|[^a-z]bet|1win|1xbet|mostbet|pin-?up|aviator|kazino|vulkan|bonus|slot|onlayn|bukmeker|mərc|qeydiyyat", re.I)
NOISE = re.compile(r"/wp-(includes|admin|json|login)|/wp-content/(plugins|themes)/|/\.well-known/|/(ads|app-ads)\.txt|/xmlrpc|/feed/?$|/comments/|favicon\.ico|/fontawesome/|/css/|/js/|\.(css|js|ttf|woff2?|eot)(\?|$)|[?&](replytocom|share|p)=", re.I)
DOC = re.compile(r"\.(pdf|docx?|xlsx?|pptx?)(\?|$)|wpdmdl=", re.I)

# Archived third-party pages (e.g. saved Google Drive viewers) embed public client API keys.
# Redact them so the archive never trips secret scanning or republishes someone else's key.
SECRET_PATTERNS = [re.compile(r"AIza[0-9A-Za-z_-]{35}")]


def redact(text):
    for pattern in SECRET_PATTERNS:
        text = pattern.sub("REDACTED-GOOGLE-API-KEY", text)
    return text



def get(url, tries=5):
    for attempt in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "gzip"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                body = r.read()
                if (r.headers.get("Content-Encoding") or "").lower() == "gzip" or body[:2] == b"\x1f\x8b":
                    try: body = gzip.decompress(body)
                    except OSError: pass
                elif (r.headers.get("Content-Encoding") or "").lower() == "deflate":
                    body = zlib.decompress(body)
                return r.status, r.geturl(), r.headers.get("Content-Type", ""), body
        except urllib.error.HTTPError as e:
            if e.code in (403, 404, 410): return e.code, url, "", b""
        except (urllib.error.URLError, TimeoutError, ConnectionError):
            pass
        time.sleep(15 * (attempt + 1))
    return 0, url, "", b""


def cdx(params):
    q = urllib.parse.urlencode({**params, "output": "json"})
    status, _, _, body = get(f"{CDX}?{q}")
    if status != 200 or not body: raise SystemExit(f"CDX query failed ({status}): {params}")
    rows = json.loads(body)
    return [dict(zip(rows[0], r)) for r in rows[1:]] if rows else []


class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.out = []; self.skip = 0; self.links = set()
    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript", "svg"): self.skip += 1
        if tag in ("p", "div", "li", "h1", "h2", "h3", "h4", "br", "section", "tr", "td", "a", "table"): self.out.append("\n")
        a = dict(attrs)
        for k in ("href", "src"):
            if a.get(k): self.links.add(a[k])
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"): self.skip = max(0, self.skip - 1)
    def handle_data(self, d):
        if not self.skip: self.out.append(d)


def slug(url):
    p = urllib.parse.urlsplit(url)
    s = (p.path.strip("/") or "home").replace("/", "__")
    if p.query: s += "__" + re.sub(r"[^A-Za-z0-9]+", "-", p.query).strip("-")
    return re.sub(r"[^A-Za-z0-9._@-]+", "-", s)[:140]


os.makedirs(OUT, exist_ok=True)
print("querying capture index…", flush=True)
rows = cdx({"url": "jbcc.or.ke", "matchType": "domain", "fl": "timestamp,original,statuscode,mimetype,digest", "filter": "statuscode:200", "limit": "20000"})
print(f"{len(rows)} successful captures in the index", flush=True)

keep = [r for r in rows if not SPAM.search(urllib.parse.unquote(r["original"])) and not NOISE.search(r["original"])]
pages, assets = {}, {}
for r in keep:
    mime = r["mimetype"].lower()
    key = re.sub(r"^https?://(www\.)?", "", r["original"]).replace(":80/", "/").rstrip("/") or "jbcc.or.ke"
    if "html" in mime and not DOC.search(r["original"]):
        pages.setdefault(key, {}).setdefault(r["digest"], r)  # first capture of each distinct version
    elif mime.startswith(("image/", "video/")) or DOC.search(r["original"]) or mime in ("application/pdf", "application/msword"):
        prev = assets.get(key)
        if not prev or r["timestamp"] > prev["timestamp"]: assets[key] = r  # newest capture of each file

manifest = {"retrieved_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "index_captures": len(rows), "pages": [], "assets": []}
for key in sorted(pages):
    for digest, r in sorted(pages[key].items(), key=lambda kv: kv[1]["timestamp"]):
        status, final, ctype, body = get(f"https://web.archive.org/web/{r['timestamp']}id_/{r['original']}")
        time.sleep(1.5)
        rec = {"url": r["original"], "captured": r["timestamp"], "digest": digest, "status": status, "bytes": len(body)}
        if status == 200 and body:
            name = f"pages/{slug(r['original'])}@{r['timestamp']}"
            os.makedirs(os.path.join(OUT, "pages"), exist_ok=True)
            html = redact(body.decode("utf-8", errors="replace"))
            open(os.path.join(OUT, name + ".html"), "w", encoding="utf-8", newline="\n").write(html)
            t = Text(); t.feed(html)
            text = "\n".join(x for x in (re.sub(r"\s+", " ", y).strip() for y in "".join(t.out).split("\n")) if x)
            open(os.path.join(OUT, name + ".txt"), "w", encoding="utf-8", newline="\n").write(text)
            rec.update(file=name + ".html", text_file=name + ".txt", links=sorted(t.links))
        manifest["pages"].append(rec)
        print(f"page  {status} {r['timestamp']} {r['original']}", flush=True)

for key in sorted(assets):
    r = assets[key]
    status, final, ctype, body = get(f"https://web.archive.org/web/{r['timestamp']}id_/{r['original']}")
    time.sleep(1.0)
    rec = {"url": r["original"], "captured": r["timestamp"], "mimetype": r["mimetype"], "status": status, "bytes": len(body)}
    if status == 200 and body:
        p = urllib.parse.urlsplit(r["original"])
        rel = "assets/" + (p.hostname or "jbcc.or.ke").replace("www.", "") + p.path
        if p.query: rel += "__" + re.sub(r"[^A-Za-z0-9]+", "-", p.query)
        path = os.path.join(OUT, *rel.split("/"))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        open(path, "wb").write(body)
        rec.update(file=rel, sha1=hashlib.sha1(body).hexdigest())
    manifest["assets"].append(rec)
    print(f"asset {status} {r['timestamp']} {len(body):>9} {r['original']}", flush=True)

json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print(f"done: {len(manifest['pages'])} page versions, {len(manifest['assets'])} assets")
