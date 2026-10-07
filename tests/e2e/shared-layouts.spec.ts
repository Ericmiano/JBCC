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

test("offscreen SVG drawings trigger once and remain settled after return scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openHydratedPage(page, "/");
  const lineLayer = page.locator('[data-line-drawing]').nth(1);
  await expect(lineLayer).toHaveAttribute("data-line-drawing", "waiting");
  await lineLayer.scrollIntoViewIfNeeded();
  await expect(lineLayer).toHaveAttribute("data-line-drawing", "visible");
  await expect.poll(() => lineLayer.locator("path").first().evaluate((path) => getComputedStyle(path).strokeDashoffset)).toBe("0px");
  await page.evaluate(() => window.scrollTo(0, 0));
  await lineLayer.scrollIntoViewIfNeeded();
  await expect(lineLayer).toHaveAttribute("data-line-drawing", "visible");
  expect(await lineLayer.locator("path").first().evaluate((path) => getComputedStyle(path).transitionDuration)).toBe("0.9s");
});

test("Board image masks trigger once, stagger consistently, and remain settled", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openHydratedPage(page, "/about");
  const portraits = page.locator('[data-image-reveal]');
  const firstPortrait = portraits.nth(1);
  await expect(firstPortrait).toHaveAttribute("data-image-reveal", "waiting");
  const portraitTop = await firstPortrait.locator("..").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((top) => window.scrollTo({ top: top - 250, behavior: "instant" }), portraitTop);
  await expect(firstPortrait).toHaveAttribute("data-image-reveal", "visible");
  await expect(portraits.nth(4)).toHaveAttribute("data-image-reveal", "visible");
  const timings = await portraits.nth(4).evaluate((element) => ({
    delay: getComputedStyle(element).transitionDelay,
    maskDuration: getComputedStyle(element).transitionDuration,
    imageDuration: getComputedStyle(element.querySelector("img") as Element).transitionDuration,
  }));
  expect(timings).toEqual({ delay: "0.24s", maskDuration: "0.72s", imageDuration: "0.9s" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.evaluate((top) => window.scrollTo({ top: top - 250, behavior: "instant" }), portraitTop);
  await expect(firstPortrait).toHaveAttribute("data-image-reveal", "visible");
  await expect.poll(() => firstPortrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
});

test("reduced motion bypasses drawings and image masks on hero, introductions, and portraits", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/about");
  const presentations = await page.locator('[data-line-drawing], [data-image-reveal]').evaluateAll((elements) => elements.map((element) => {
    const image = element.querySelector("img");
    const path = element.querySelector("path");
    return {
      clipPath: getComputedStyle(element).clipPath,
      imageTransform: image ? getComputedStyle(image).transform : "none",
      dashOffset: path ? getComputedStyle(path).strokeDashoffset : "0px",
    };
  }));
  expect(presentations.length).toBeGreaterThan(2);
  for (const presentation of presentations) {
    expect(presentation.clipPath).toBe("none");
    expect(presentation.imageTransform).toBe("none");
    expect(presentation.dashOffset).toBe("0px");
  }
});

test("narrow viewport drawings and masks survive rapid scrolling and remain settled", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openHydratedPage(page, "/about");
  const line = page.locator('[data-line-drawing]').first();
  const portraits = page.locator('[data-image-reveal]');
  const firstPortrait = portraits.nth(1);
  const portraitTop = await firstPortrait.locator("..").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);

  await page.evaluate((top) => {
    for (const y of [0, top - 700, top - 200, 0, top - 100, document.body.scrollHeight]) window.scrollTo(0, y);
  }, portraitTop);
  await expect(line).toHaveAttribute("data-line-drawing", "visible");
  await expect(firstPortrait).toHaveAttribute("data-image-reveal", "visible");
  await page.waitForTimeout(1000);
  await expect.poll(() => firstPortrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
  await page.evaluate((top) => window.scrollTo(0, top - 100), portraitTop);
  await expect(firstPortrait).toHaveAttribute("data-image-reveal", "visible");
  await expectNoHorizontalOverflow(page);
});

test("active narrow viewport reveals remain stable through resizing", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await openHydratedPage(page, "/about");
  const portrait = page.locator('[data-image-reveal]').nth(1);
  const top = await portrait.locator("..").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 100), top);
  await expect(portrait).toHaveAttribute("data-image-reveal", "visible");

  for (const viewport of [{ width: 320, height: 568 }, { width: 430, height: 932 }, { width: 375, height: 667 }]) {
    await page.setViewportSize(viewport);
    await expect(portrait).toHaveAttribute("data-image-reveal", "visible");
    await expectNoHorizontalOverflow(page);
  }
  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
  const presentation = await portrait.evaluate((element) => ({
    clipPath: getComputedStyle(element).clipPath,
    transitionDuration: getComputedStyle(element).transitionDuration,
  }));
  expect(presentation).toEqual({ clipPath: "inset(0px)", transitionDuration: "0.72s" });
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

test("all six pages preserve still editorial compositions under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await openHydratedPage(page, route);
    const presentations = await page.locator('.editorial-reveal, .image-reveal, .image-reveal > img, .architectural-lines path').evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      return { opacity: style.opacity, transform: style.transform, clipPath: style.clipPath, animation: style.animationName, duration: style.transitionDuration, delay: style.transitionDelay, willChange: style.willChange };
    }));
    expect(presentations.length).toBeGreaterThan(0);
    for (const presentation of presentations) {
      expect(presentation).toMatchObject({ transform: "none", clipPath: "none", animation: "none", duration: "0s", delay: "0s", willChange: "auto" });
    }
    expect(await page.locator('.editorial-reveal').evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "1"))).toBe(true);
    await page.getByRole("button", { name: "Open menu" }).click();
    expect(await page.getByRole("navigation", { name: "Mobile navigation" }).evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("changing motion preference settles waiting reveals without restarting them", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/about");
  const portrait = page.locator('[data-image-reveal]').nth(1);
  await expect(portrait).toHaveAttribute("data-image-reveal", "waiting");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait).toHaveAttribute("data-image-reveal", "visible");
  expect(await page.locator('[data-editorial-reveal="waiting"], [data-image-reveal="waiting"], [data-line-drawing="waiting"]').count()).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-image-reveal", "visible");
  expect(await portrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
});

test("keyboard focus stays distinct on links, filters, fields, and menus across all six pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await openHydratedPage(page, route);
    await page.keyboard.press("Tab");
    const controls = page.locator('a[href]:visible, button:visible, input:not([type="hidden"]):visible, textarea:visible, select:visible');
    let checked = 0;
    for (const control of await controls.all()) {
      if (await control.getAttribute("tabindex") === "-1" || await control.isDisabled()) continue;
      await control.focus();
      const focus = await control.evaluate((element) => {
        const style = getComputedStyle(element);
        return { visible: element.matches(":focus-visible"), width: style.outlineWidth, outline: style.outlineStyle, shadow: style.boxShadow };
      });
      expect(focus.visible).toBe(true);
      expect(focus.width).toBe("3px");
      expect(focus.outline).toBe("solid");
      expect(focus.shadow).not.toBe("none");
      checked++;
    }
    expect(checked).toBeGreaterThan(10);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});