// Mobile Lighthouse checks for all six pages. Usage: bun run test:lighthouse
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

const base = process.env.LH_BASE_URL ?? "http://localhost:8080";
const pages = ["/", "/about", "/what-we-do", "/resources", "/events", "/contact"];
const min = { performance: Number(process.env.LH_MIN_PERF ?? 0.3), accessibility: Number(process.env.LH_MIN_A11Y ?? 0.94) };

const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless=new", "--no-sandbox"] });
let failed = false;
try {
  for (const path of pages) {
    const { lhr } = await lighthouse(`${base}${path}`, { port: chrome.port, onlyCategories: ["performance", "accessibility"], formFactor: "mobile", output: "json", logLevel: "error" });
    const perf = lhr.categories.performance.score ?? 0;
    const a11y = lhr.categories.accessibility.score ?? 0;
    const ok = perf >= min.performance && a11y >= min.accessibility;
    if (!ok) failed = true;
    console.log(`${ok ? "PASS" : "FAIL"} ${path.padEnd(12)} performance ${Math.round(perf * 100)}  accessibility ${Math.round(a11y * 100)}`);
  }
} finally {
  await chrome.kill();
}
process.exit(failed ? 1 : 0);
