// Startup file for DirectAdmin's "Setup Node.js App" (Passenger). CommonJS on purpose:
// Passenger loads the startup file with require(). The built site sits beside it in
// server/ and public/, copied from .output/ by scripts/deploy.sh.
//
// Environment variables (set in the Node.js app screen):
//   SITE_ACCESS_PASSWORD  When set, every request needs this password (staging only).
//   SITE_ACCESS_USER      Username for that prompt. Default: jbcc
//   SITE_NOINDEX          "true" keeps search engines out. Implied by SITE_ACCESS_PASSWORD.
//   SITE_URL              Public address, e.g. https://staging.jbcc.co.ke, for canonical links.
"use strict";

const http = require("node:http");
const { timingSafeEqual } = require("node:crypto");

const password = (process.env.SITE_ACCESS_PASSWORD || "").trim();
const user = (process.env.SITE_ACCESS_USER || "jbcc").trim();
const noindex = Boolean(password) || process.env.SITE_NOINDEX === "true";

function same(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function authorised(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ")) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const split = decoded.indexOf(":");
  if (split < 0) return false;
  // Evaluate both comparisons so timing doesn't reveal which part was wrong.
  const userOk = same(decoded.slice(0, split), user);
  const passwordOk = same(decoded.slice(split + 1), password);
  return userOk && passwordOk;
}

// 'unsafe-inline' scripts: TanStack Start writes inline hydration scripts. Everything else is same-origin only.
const SECURITY_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "media-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // No upgrade-insecure-requests: WebKit applies it to http://localhost and breaks local and CI runs;
    // every asset is same-origin, so over HTTPS it would change nothing.
    "frame-ancestors 'none'",
  ].join("; "),
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};
const ALLOWED_METHODS = new Set(["GET", "HEAD", "POST"]);
const MAX_BODY_BYTES = 64 * 1024; // Ask JBCC posts a 400-character question; nothing else accepts a body.

// Client address for rate limiting. Behind Apache/Passenger the proxy appends the real address as the last
// X-Forwarded-For entry; earlier entries and cf-connecting-ip are whatever the visitor chose to send.
function clientIp(req) {
  const socket = req.socket.remoteAddress;
  const fromProxy = !socket || socket === "127.0.0.1" || socket === "::1" || socket === "::ffff:127.0.0.1";
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",").map((part) => part.trim()).filter(Boolean);
  return (fromProxy && forwarded.at(-1)) || socket || "unknown";
}

async function start() {
  const { middleware } = await import("./server/index.mjs");

  const server = http.createServer((req, res) => {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(name, value);
    if (!ALLOWED_METHODS.has(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD, POST", "Content-Type": "text/plain; charset=utf-8" });
      res.end("Method not allowed\n");
      return;
    }
    // A POST must declare its length (fetch always does), so a chunked body can't bypass the cap.
    const length = req.headers["content-length"];
    if (req.method === "POST" ? !(Number(length) <= MAX_BODY_BYTES) : Number(length || 0) > MAX_BODY_BYTES) {
      res.writeHead(length === undefined ? 411 : 413, { "Content-Type": "text/plain; charset=utf-8", Connection: "close" });
      res.end("Request body missing a length or too large\n");
      return;
    }
    req.headers["x-jbcc-client-ip"] = clientIp(req);
    delete req.headers["cf-connecting-ip"];

    if (noindex) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
      if (req.url === "/robots.txt" || req.url?.startsWith("/robots.txt?")) {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        res.end("User-agent: *\nDisallow: /\n");
        return;
      }
    }
    if (password && !authorised(req)) {
      res.writeHead(401, {
        "WWW-Authenticate": 'Basic realm="JBCC preview", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end("This preview of the JBCC website needs a password.\n");
      return;
    }
    if (password) res.setHeader("Cache-Control", "private, no-store");
    middleware(req, res);
  });

  // Drop clients that trickle headers or bodies so slow connections can't hold the process open.
  server.headersTimeout = 20_000;
  server.requestTimeout = 60_000;

  // Passenger takes over listen(); PORT is only used when running `node app.js` directly.
  const port = Number(process.env.PORT) || 3000;
  server.listen(port, () => {
    if (!process.env.PASSENGER_APP_ENV) console.log(`JBCC site listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("JBCC site failed to start", error);
  process.exit(1);
});
