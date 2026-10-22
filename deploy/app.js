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

async function start() {
  const { middleware } = await import("./server/index.mjs");

  const server = http.createServer((req, res) => {
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
