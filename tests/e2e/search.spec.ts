import { expect, test, type Page } from "@playwright/test";

async function openSearch(page: Page) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
  await page.getByRole("button", { name: /Search/ }).first().click();
  return page.getByLabel("Search pages and documents");
}

const results = (page: Page) => page.locator("#search-results a:not([href^='/ask'])");

test("search matches every word, in any order, beyond titles", async ({ page }) => {
  const input = await openSearch(page);
  const cases: [string, RegExp][] = [
    ["2022 price index june", /JBCC Price Index — June 2022/],
    ["chairperson", /Muchiri/],
    ["arbitrators", /Chartered Institute of Arbitrators/],
    ["green book", /Green Book/],
    ["office hours", /Secretariat office and contact details/],
    ["minor works", /Minor Works Agreement/],
  ];
  for (const [query, expected] of cases) {
    await input.fill(query);
    await expect(results(page).first(), query).toHaveText(expected);
  }
});

test("Enter opens the first result and unmatched queries explain what to try", async ({ page }) => {
  const input = await openSearch(page);
  await input.fill("zzqx");
  await expect(page.getByText("Nothing matches “zzqx”")).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "0 results" })).toBeAttached();
  await input.fill("seminar certificate");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/events$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});
