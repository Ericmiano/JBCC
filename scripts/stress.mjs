// Load test: many concurrent visitors fetching pages, assets and documents for a fixed time.
//   node scripts/stress.mjs [baseUrl] [concurrency] [seconds]
//   node scripts/stress.mjs http://localhost:4173 50 30
// For a password-protected staging site, set STRESS_AUTH=user:password.
// Exits non-zero if any request errors or returns 5xx, or if p95 latency passes STRESS_MAX_P95_MS (default 1000).
const [base = "http://localhost:4173", concurrency = "50", seconds = "30"] = process.argv.slice(2);
const maxP95 = Number(process.env.STRESS_MAX_P95_MS || 1000);
const headers = process.env.STRESS_AUTH ? { authorization: `Basic ${Buffer.from(process.env.STRESS_AUTH).toString("base64")}` } : {};

const home = await fetch(base, { headers }).then((res) => res.text());
const assets = [...new Set(home.match(/\/assets\/[\w.-]+\.(?:js|css)/g) ?? [])];
// Weighted like real traffic: mostly pages, then assets, then the odd document, image or missing page.
const paths = [
  ...["/", "/", "/", "/about", "/what-we-do", "/resources", "/resources", "/events", "/contact", "/privacy"],
  ...assets,
  "/media/jbcc-hero-group.jpg",
  "/documents/JBCC-Price-List-November-2017.pdf",
  "/no-such-page",
];

const latencies = [];
const statuses = {};
let errors = 0;
const deadline = Date.now() + Number(seconds) * 1000;

async function visitor() {
  while (Date.now() < deadline) {
    const path = paths[Math.floor(Math.random() * paths.length)];
    const started = performance.now();
    try {
      const res = await fetch(base + path, { headers });
      await res.arrayBuffer();
      statuses[res.status] = (statuses[res.status] ?? 0) + 1;
      latencies.push(performance.now() - started);
    } catch {
      errors++;
    }
  }
}

console.log(`${concurrency} concurrent visitors for ${seconds}s against ${base} (${paths.length} paths)`);
await Promise.all(Array.from({ length: Number(concurrency) }, visitor));

latencies.sort((a, b) => a - b);
const at = (q) => Math.round(latencies[Math.min(latencies.length - 1, Math.floor(q * latencies.length))] ?? 0);
const serverErrors = Object.entries(statuses).filter(([code]) => Number(code) >= 500).reduce((sum, [, n]) => sum + n, 0);
console.log(`requests: ${latencies.length} (${Math.round(latencies.length / Number(seconds))}/s), network errors: ${errors}`);
console.log(`status codes: ${JSON.stringify(statuses)}`);
console.log(`latency ms: p50 ${at(0.5)}, p95 ${at(0.95)}, p99 ${at(0.99)}, max ${at(1)}`);
if (errors || serverErrors || at(0.95) > maxP95) {
  console.error("FAIL: errors, 5xx responses or slow p95");
  process.exit(1);
}
console.log("PASS");
