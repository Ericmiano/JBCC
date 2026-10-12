import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

const AXE = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const pages = ["/", "/about", "/what-we-do", "/resources", "/events", "/contact", "/terms", "/privacy", "/cookies", "/accessibility", "/ask"];

// Close the cookie notice up front so the fixed bar never overlaps controls under test.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => { try { window.localStorage.setItem("jbcc-cookie-notice", "dismissed"); } catch { /* ignore */ } });
});

/** Load a page and wait until React has hydrated, so clicks and style checks never race the dev server. */
async function gotoReady(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
  // Judge settled content: under parallel load WebKit can still be fading text in when the page reports idle.
  await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState !== "running"));
}

async function axe(page: Page, rules?: string[]) {
  await page.addScriptTag({ content: AXE });
  return page.evaluate(async (only) => {
    // @ts-expect-error injected global
    const r = await window.axe.run(document, only ? { runOnly: { type: "rule", values: only } } : { runOnly: ["wcag2a", "wcag2aa", "best-practice"] });
    // Contrast failures include the measured colours and ratio so a CI annotation is enough to diagnose them.
    type Node = { target: string[]; any: { data?: { fgColor?: string; bgColor?: string; contrastRatio?: number } }[] };
    const detail = (n: Node) => { const d = n.any[0]?.data; return d?.contrastRatio ? ` (${d.fgColor} on ${d.bgColor}, ${d.contrastRatio}:1)` : ""; };
    return r.violations.map((v: { id: string; nodes: Node[] }) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ") + detail(n)).slice(0, 3).join(", ")}`);
  }, rules ?? null);
}

for (const path of pages) {
  test.describe(`a11y ${path}`, () => {
    test.use({ reducedMotion: "reduce" });
    // WebKit can ignore the context-level option under the test runner; emulate on the page as well.
    test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "reduce" }); });

    test("axe passes, single main landmark, ordered headings", async ({ page }) => {
      await gotoReady(page, path);
      expect(await axe(page)).toEqual([]);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("header").first()).toBeVisible();
      await expect(page.locator("footer")).toHaveCount(1);
      const levels = await page.$$eval("h1,h2,h3,h4,h5,h6", (hs) => hs.map((h) => Number(h.tagName[1])));
      expect(levels[0]).toBe(1);
      expect(levels.filter((l) => l === 1)).toHaveLength(1);
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    });

    test("skip link and keyboard focus are visible", async ({ page, browserName }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await gotoReady(page, path);
      const skip = page.getByRole("link", { name: "Skip to main content" });
      // WebKit follows Safari's default of leaving links out of the Tab order (people use Option+Tab).
      // There the skip link is focused directly; its styling and Enter behaviour are still checked.
      if (browserName === "webkit") await skip.focus();
      else await page.keyboard.press("Tab");
      await expect(skip).toBeFocused();
      const box = await skip.boundingBox();
      expect(box && box.height >= 44).toBeTruthy();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeFocused();
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press("Tab");
        const outline = await page.evaluate(() => document.activeElement === document.body ? "body" : getComputedStyle(document.activeElement!).outlineStyle);
        // In WebKit a page whose only controls are links runs out of Tab stops; that is the browser setting above, not a styling gap.
        if (outline === "body" && browserName === "webkit") break;
        expect(outline).not.toBe("none");
      }
    });

    test("200% zoom keeps contrast, no horizontal scroll, 44px targets", async ({ page }) => {
      await page.setViewportSize({ width: 640, height: 900 });
      await gotoReady(page, path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      expect(await axe(page, ["color-contrast"])).toEqual([]);
      const small = await page.$$eval("a,button,input,select,textarea", (els) => els.filter((e) => {
        const r = e.getBoundingClientRect();
        // WCAG 2.5.8 exempts links inside a sentence, whether in a paragraph or a list item.
        const inline = e.tagName === "A" && e.closest("p, li, dd") && getComputedStyle(e).display === "inline";
        return r.width > 0 && !e.closest("[aria-hidden=true]") && !e.classList.contains("sr-only") && !inline && r.height < 44;
      }).map((e) => e.textContent?.trim().slice(0, 30)));
      expect(small).toEqual([]);
    });

    test("forced colors keep focus visible", async ({ page, browserName }) => {
      await page.emulateMedia({ forcedColors: "active" });
      await gotoReady(page, path);
      if (browserName === "webkit") {
        // See the skip-link test: focus the second keyboard stop directly instead of tabbing past links.
        await page.keyboard.press("Tab");
        await page.locator("header a[href], header button").first().focus();
      } else {
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
      }
      const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
      expect(outline).not.toBe("none");
    });
  });
}

test("page changes are announced to screen readers", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoReady(page, "/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page.locator("#route-announcer")).toContainText("page loaded");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("contact errors are summarised, associated, and focus the first invalid field", async ({ page }) => {
  await gotoReady(page, "/contact");
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#name")).toHaveAttribute("aria-describedby", /name-error/);
  await expect(page.getByRole("status").filter({ hasText: "Please correct" })).toBeVisible();
  await page.locator("#error-summary a", { hasText: "Email" }).click();
  await expect(page.locator("#email")).toBeFocused();
});

test("resource filters expose pressed state", async ({ page }) => {
  await gotoReady(page, "/resources");
  const chip = page.getByRole("button", { name: "2022", exact: true });
  await chip.click();
  await expect(chip).toHaveAttribute("aria-pressed", "true");
});

for (const width of [280, 320]) {
  for (const path of pages) {
    test(`reflow at ${width}px on ${path}: no horizontal overflow or clipped content`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await gotoReady(page, path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
      const offenders = await page.$$eval("main *, header *, footer *", (els) => els.filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.right > document.documentElement.clientWidth + 1 && !e.closest(".sr-only, [aria-hidden=true], .image-reveal-trigger");
      }).map((e) => `${e.tagName}.${String(e.className).slice(0, 40)}`).slice(0, 5));
      expect(offenders).toEqual([]);
    });
  }
}

test.describe("reduced motion across interactions", () => {
  test.use({ reducedMotion: "reduce" });
  for (const path of pages) {
    test(`no running animations or transitions on ${path} after interaction and navigation`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 1280, height: 900 });
      await gotoReady(page, path);
      for (const b of (await page.locator("main button:visible").all()).slice(0, 3)) await b.hover();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const moving = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").map((a) => `${(a as CSSAnimation).animationName ?? (a as CSSTransition).transitionProperty} ${(a.effect as KeyframeEffect)?.target?.tagName} ${String((a.effect as KeyframeEffect)?.target?.className).slice(0, 50)}`));
      expect(moving).toEqual([]);
      const timed = await page.$$eval("*", (els) => els.filter((e) => { const s = getComputedStyle(e); return s.transitionDuration.split(",").some((d) => parseFloat(d) > 0) || s.animationName !== "none"; }).length);
      expect(timed).toBe(0);
      await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: path === "/contact" ? "About" : "Contact" }).click();
      await expect(page.locator("#route-announcer")).toContainText("page loaded");
      expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    });
  }
});
