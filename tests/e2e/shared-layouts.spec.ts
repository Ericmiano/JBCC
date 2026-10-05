import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/about", "/what-we-do", "/resources", "/events", "/contact"];
const viewports = [
  { name: "small phone", width: 360, height: 800 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "tablet landscape", width: 1024, height: 768 },
];

async function openHydratedPage(page: Page, route: string) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route} renders without horizontal overflow`, async ({ page }) => {
        await openHydratedPage(page, route);
        await expect(page.locator("main")).toBeVisible();
        await expectNoHorizontalOverflow(page);
      });
    }

    test("mobile navigation closes with Escape and restores trigger focus", async ({ page }) => {
      await openHydratedPage(page, "/");
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
  await openHydratedPage(page, "/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const animationName = await page.getByRole("navigation", { name: "Mobile navigation" }).evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toBe("none");
});

test("editorial reveals remain visible without motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/");
  const headingReveal = page.getByRole("heading", { name: "The framework behind better construction." }).locator("..");
  await expect(headingReveal).toBeVisible();
  const presentation = await headingReveal.evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: style.opacity, transform: style.transform };
  });
  expect(presentation.opacity).toBe("1");
  expect(presentation.transform).toBe("none");
});

test("architectural lines draw and masked images bypass reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openHydratedPage(page, "/");
  const lineLayer = page.locator('[data-line-drawing]').first();
  await expect(lineLayer).toHaveAttribute("data-line-drawing", "visible");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  const image = page.locator('[data-image-reveal]').first();
  const presentation = await image.evaluate((element) => ({ clipPath: getComputedStyle(element).clipPath, transform: getComputedStyle(element.querySelector("img") as Element).transform }));
  expect(presentation.clipPath).toBe("none");
  expect(presentation.transform).toBe("none");
});

test("every page exposes complete sharing metadata", async ({ page }) => {
  for (const route of routes) {
    await openHydratedPage(page, route);
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

test("contact success state gives clear next steps", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/contact");
  await page.locator("#name").fill("Test Visitor");
  await page.locator("#email").fill("visitor@example.com");
  await page.locator("#subject").fill("Document enquiry");
  await page.locator("#message").fill("Please share more information about this document.");
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiry is ready, Test Visitor." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open email again" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy email address" })).toBeVisible();
  await page.getByRole("button", { name: "Start another enquiry" }).click();
  await expect(page.locator("#name")).toBeFocused();
});