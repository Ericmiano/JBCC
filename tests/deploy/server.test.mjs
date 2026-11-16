// Checks deploy/app.js against a running production build:
//   bun run build && cp deploy/app.js deploy/package.json .output/ && PORT=4173 node .output/app.js
//   node --test tests/deploy/
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const base = new URL(process.env.SITE_BASE_URL || "http://localhost:4173");

function send(method, path, { headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: base.hostname, port: base.port, method, path, headers }, (res) => {
      res.resume();
      res.on("end", () => resolve(res));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

test("pages and static files carry the security headers", async () => {
  for (const path of ["/", "/robots.txt", "/favicon.png"]) {
    const res = await send("GET", path);
    assert.equal(res.statusCode, 200, path);
    assert.match(res.headers["content-security-policy"], /frame-ancestors 'none'/, path);
    assert.equal(res.headers["x-content-type-options"], "nosniff", path);
    assert.equal(res.headers["x-frame-options"], "DENY", path);
  }
});

test("sitemap lists the live domain", async () => {
  const res = await fetch(new URL("/sitemap.xml", base));
  assert.equal(res.status, 200);
  assert.match(await res.text(), /<loc>https:\/\/jbcc\.co\.ke\/resources<\/loc>/);
});

test("unknown pages return 404", async () => {
  assert.equal((await send("GET", "/no-such-page")).statusCode, 404);
});

test("unsupported methods are refused", async () => {
  assert.equal((await send("PUT", "/")).statusCode, 405);
  assert.equal((await send("DELETE", "/")).statusCode, 405);
});

test("request bodies must be small and declare their length", async () => {
  assert.equal((await send("POST", "/", { headers: { "content-length": String(1024 * 1024) } })).statusCode, 413);
  assert.equal((await send("POST", "/", { headers: { "transfer-encoding": "chunked" }, body: "x" })).statusCode, 411);
});
