import type Anthropic from "@anthropic-ai/sdk";
import { expect, test, type Page } from "@playwright/test";
import { buildSourceBlocks, parseAnswer } from "../../src/lib/ask/answer";
import { findRelevantSources, knowledgeSources } from "../../src/lib/ask/knowledge";

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => { try { window.localStorage.setItem("jbcc-cookie-notice", "dismissed"); } catch { /* ignore */ } });
});

async function openAsk(page: Page, path = "/ask") {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
}

test.describe("answer grounding", () => {
  test("every knowledge source is sent as a citable search result with a site link", () => {
    const blocks = buildSourceBlocks();
    expect(blocks).toHaveLength(knowledgeSources.length);
    for (const block of blocks) {
      expect(block.citations).toEqual({ enabled: true });
      expect(block.source.startsWith("/")).toBe(true);
    }
    expect(blocks.at(-1)?.cache_control).toEqual({ type: "ephemeral" });
  });

  test("citations become numbered site links and unknown links are dropped", () => {
    const resources = knowledgeSources.find((source) => source.url === "/resources");
    expect(resources).toBeDefined();
    const content = [
      { type: "text", text: "The newest index is from June 2022 and is **historical**.", citations: [
        { type: "search_result_location", source: resources!.url, title: resources!.title, cited_text: "June 2022", search_result_index: 3, start_block_index: 0, end_block_index: 0 },
        { type: "search_result_location", source: "https://example.com/phish", title: "Not ours", cited_text: "x", search_result_index: 0, start_block_index: 0, end_block_index: 0 },
      ] },
      { type: "text", text: " Confirm prices with the Secretariat.", citations: [
        { type: "search_result_location", source: resources!.url, title: resources!.title, cited_text: "Confirm", search_result_index: 3, start_block_index: 0, end_block_index: 0 },
      ] },
    ] as unknown as Anthropic.Beta.BetaContentBlock[];
    const { segments, sources } = parseAnswer(content);
    expect(sources).toEqual([{ url: "/resources", title: resources!.title, kind: "Page", quote: "June 2022" }]);
    expect(segments).toEqual([
      { text: "The newest index is from June 2022 and is historical.", sources: [0] },
      { text: " Confirm prices with the Secretariat.", sources: [0] },
    ]);
  });

  test("keyword fallback finds the pages a question is about", () => {
    expect(findRelevantSources("seminar registration certificate")[0]?.url).toBe("/events");
    expect(findRelevantSources("Where is the Secretariat office?").map((source) => source.url)).toContain("/contact");
    expect(findRelevantSources("")).toEqual([]);
  });
});

test("without an AI Gateway the page explains and links to related pages", async ({ page }) => {
  await openAsk(page);
  await page.getByLabel("Your question").fill("How do I register for a seminar?");
  await page.getByRole("button", { name: "Ask", exact: true }).click();
  await expect(page.getByRole("heading", { name: "We couldn’t answer that here" })).toBeFocused();
  await expect(page.getByText("AI answers are not switched on")).toBeVisible();
  await expect(page.getByRole("region", { name: "Related pages" }).getByRole("link").first()).toHaveAttribute("href", "/events");
});

test("an empty question is caught before anything is sent", async ({ page }) => {
  let sent = false;
  page.on("request", (request) => { if (request.method() === "POST" && request.url().includes("_serverFn")) sent = true; });
  await openAsk(page);
  await page.getByRole("button", { name: "Ask", exact: true }).click();
  await expect(page.getByLabel("Your question")).toBeFocused();
  await expect(page.getByLabel("Your question")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Type a question of at least 3 characters.")).toBeVisible();
  expect(sent).toBe(false);
});

test("site search hands a typed query to Ask JBCC", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAsk(page, "/");
  await page.getByRole("button", { name: /Search/ }).first().click();
  await page.getByLabel("Search pages and documents").fill("seminar dates");
  await page.getByRole("link", { name: /Ask JBCC: “seminar dates”/ }).click();
  await expect(page).toHaveURL(/\/ask\?q=seminar(\+|%20)dates/);
  await expect(page.getByLabel("Your question")).toHaveValue("seminar dates");
});
