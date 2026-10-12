import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/about", "/what-we-do", "/resources", "/events", "/contact", "/terms", "/privacy", "/cookies", "/accessibility", "/ask"];
const viewports = [
  { name: "small phone", width: 360, height: 800 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "tablet landscape", width: 1024, height: 768 },
];

// Close the cookie notice up front so the fixed bar never overlaps controls under test.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => { try { window.localStorage.setItem("jbcc-cookie-notice", "dismissed"); } catch { /* ignore */ } });
});

async function openHydratedPage(page: Page, route: string) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
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
  const headingReveal = page.getByRole("heading", { name: "Contracts, price indices and guidance." }).locator("..");
  await expect(headingReveal).toBeVisible();
  const presentation = await headingReveal.evaluate((element) => {
    const style = getComputedStyle(element);
    return { opacity: style.opacity, transform: style.transform };
  });
  expect(presentation.opacity).toBe("1");
  expect(presentation.transform).toBe("none");
});

test("hero slideshow uses the live-site media with slide choice and a pause control", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/");
  const hero = page.getByRole("region", { name: "JBCC highlights" });
  await expect(hero.locator('video[src="/media/jbcc-hero-loop.mp4"]')).toHaveCount(1);
  await expect(hero.locator('img[src="/media/jbcc-hero-group.jpg"]')).toHaveCount(1);
  await expect(hero.locator('img[src="/media/jbcc-hero-launch.jpg"]')).toHaveCount(1);
  const pause = page.getByRole("button", { name: "Pause slideshow" });
  await pause.click();
  await expect(page.getByRole("button", { name: "Play slideshow" })).toBeVisible();
  const council = page.getByRole("group", { name: "Choose a slide" }).getByRole("button", { name: "The council" });
  await council.click();
  await expect(council).toHaveAttribute("aria-current", "true");
  await expect(hero.getByRole("link", { name: "About the Council" })).toHaveAttribute("href", "/about");
});

test("reduced motion keeps the hero still and its slides selectable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/");
  await expect(page.getByRole("button", { name: "Play slideshow" })).toBeDisabled();
  expect(await page.locator('video[src="/media/jbcc-hero-loop.mp4"]').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  await page.getByRole("button", { name: "Seminars and launches" }).click();
  await expect(page.getByRole("region", { name: "JBCC highlights" }).getByRole("link", { name: "Seminar information" })).toHaveAttribute("href", "/events");
});

test("the full forum video opens on request in a labelled dialog", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openHydratedPage(page, "/");
  await page.getByRole("button", { name: "Watch the video" }).click();
  const dialog = page.getByRole("dialog", { name: "Status of the Built Environment forum" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('video[src="/media/jbcc-video.mp4"]')).toHaveAttribute("controls", "");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("the cookie notice explains the site's cookie use and stays dismissed", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, baseURL: "http://localhost:8080" });
  const page = await context.newPage();
  await openHydratedPage(page, "/");
  const notice = page.getByRole("region", { name: "Cookie notice" });
  await expect(notice).toContainText("no tracking or advertising cookies");
  await expect(notice.getByRole("link", { name: "Read the cookie policy" })).toHaveAttribute("href", "/cookies");
  await notice.getByRole("button", { name: "OK" }).click();
  await expect(notice).toBeHidden();
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("region", { name: "Cookie notice" })).toHaveCount(0);
  await context.close();
});

test("footer links to every site policy and the Secretariat's new address", async ({ page }) => {
  await openHydratedPage(page, "/");
  const policies = page.getByRole("navigation", { name: "Site policies" });
  for (const [name, href] of [["Terms of use", "/terms"], ["Privacy policy", "/privacy"], ["Cookie policy", "/cookies"], ["Accessibility", "/accessibility"]]) {
    await expect(policies.getByRole("link", { name })).toHaveAttribute("href", href);
  }
  await expect(page.locator("footer").getByRole("link", { name: "mail@jbcc.co.ke" })).toHaveAttribute("href", "mailto:mail@jbcc.co.ke");
  expect(await page.locator('a[href^="mailto:mail@jbcc.or.ke"]').count()).toBe(0);
});

test("the about-page source image reveal remains settled", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openHydratedPage(page, "/about");
  const imageReveal = page.locator('[data-image-reveal]').nth(1);
  await imageReveal.scrollIntoViewIfNeeded();
  await expect(imageReveal).toHaveAttribute("data-image-reveal", "visible");
  const timings = await imageReveal.evaluate((element) => ({
    delay: getComputedStyle(element).transitionDelay,
    maskDuration: getComputedStyle(element).transitionDuration,
    imageDuration: getComputedStyle(element.querySelector("img") as Element).transitionDuration,
  }));
  expect(timings).toEqual({ delay: "0.24s", maskDuration: "0.72s", imageDuration: "0.9s" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(imageReveal).toHaveAttribute("data-image-reveal", "visible");
  await expect.poll(() => imageReveal.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
});

test("reduced motion bypasses image masks on introductions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await openHydratedPage(page, "/about");
  const presentations = await page.locator('[data-image-reveal]').evaluateAll((elements) => elements.map((element) => {
    const image = element.querySelector("img");
    return {
      clipPath: getComputedStyle(element).clipPath,
      imageTransform: image ? getComputedStyle(image).transform : "none",
    };
  }));
  expect(presentations.length).toBeGreaterThan(0);
  for (const presentation of presentations) {
    expect(presentation.clipPath).toBe("none");
    expect(presentation.imageTransform).toBe("none");
  }
});

test("narrow viewport image masks survive rapid scrolling and remain settled", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openHydratedPage(page, "/about");
  const pageImage = page.locator('[data-image-reveal]').first();

  await page.evaluate(() => {
    for (const y of [0, 300, 0, document.body.scrollHeight, 0]) window.scrollTo(0, y);
  });
  await expect(pageImage).toHaveAttribute("data-image-reveal", "visible");
  await page.waitForTimeout(1000);
  await expect.poll(() => pageImage.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
  await page.evaluate(() => window.scrollTo(0, 100));
  await expect(pageImage).toHaveAttribute("data-image-reveal", "visible");
  await expectNoHorizontalOverflow(page);
});

test("active narrow viewport reveals remain stable through resizing", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await openHydratedPage(page, "/about");
  const pageImage = page.locator('[data-image-reveal]').first();
  await expect(pageImage).toHaveAttribute("data-image-reveal", "visible");

  for (const viewport of [{ width: 320, height: 568 }, { width: 430, height: 932 }, { width: 375, height: 667 }]) {
    await page.setViewportSize(viewport);
    await expect(pageImage).toHaveAttribute("data-image-reveal", "visible");
    await expectNoHorizontalOverflow(page);
  }
  await expect.poll(() => pageImage.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
  const presentation = await pageImage.evaluate((element) => ({
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

test("every page preserves still editorial compositions under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await openHydratedPage(page, route);
    const presentations = await page.locator('.editorial-reveal, .image-reveal, .image-reveal > img').evaluateAll((elements) => elements.map((element) => {
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
  expect(await page.locator('[data-editorial-reveal="waiting"], [data-image-reveal="waiting"]').count()).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-image-reveal", "visible");
  expect(await portrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe("inset(0px)");
});

test("keyboard focus stays distinct on links, filters, fields, and menus across every page", async ({ page }) => {
  test.setTimeout(120_000);
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
