import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/about", "/what-we-do", "/resources", "/events", "/contact"];
const viewports = [
  { name: "small phone", width: 360, height: 800 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "tablet landscape", width: 1024, height: 768 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route} renders without horizontal overflow`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator("main")).toBeVisible();
        await expectNoHorizontalOverflow(page);
      });
    }

    test("mobile navigation closes with Escape and restores trigger focus", async ({ page }) => {
      await page.goto("/");
      const trigger = page.getByRole("button", { name: "Open menu" });
      if (viewport.width >= 1024) {
        await expect(trigger).toBeHidden();
        return;
      }
      await trigger.click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    });
  });
}

test("reduced motion disables mobile menu animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const animationName = await page.getByRole("navigation", { name: "Mobile navigation" }).evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
});

test("every page exposes complete sharing metadata", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:image"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
    ]) {
      await expect(page.locator(selector)).toHaveAttribute("content", /.+/);
    }
  }
});