// Scratch (not part of the contract): review 2026-10-14 finding 1. Blocks /api/feed and shows that
// a failed page fetch does not loop and that a real tap-to-retry button appears.
import { expect, test, type Page } from "@playwright/test";

async function block(page: Page, mode: "abort" | "404") {
  const hits: string[] = [];
  await page.route("**/api/feed/**", (route) => {
    hits.push(route.request().url());
    return mode === "abort" ? route.abort("internetdisconnected") : route.fulfill({ status: 404, body: "" });
  });
  return hits;
}

for (const mode of ["abort", "404"] as const) {
  test(`all: page fetch ${mode} stops, retry button appears, retry works`, async ({ page }) => {
    const hits = await block(page, mode);
    await page.goto("/");
    const feed = page.locator('[data-testid="feed"]');
    await expect(page.locator('[data-testid="intro-card"]')).toBeVisible();
    const before = await page.locator('[data-testid="demo-card"]').count();
    // Reach the end of what is loaded: prefetch fires once and fails.
    expect(hits.length, "nothing fetched before the learner nears the end").toBe(0);
    await feed.locator("[data-index]").last().scrollIntoViewIfNeeded();
    const retry = page.locator('[data-testid="feed-retry"]');
    await expect(retry).toBeVisible();
    await page.waitForTimeout(3000);
    console.log(`[${mode}] requests after failure + 3 s idle: ${hits.length}`);
    expect(hits.length, "no retry loop").toBe(1);
    const box = await retry.boundingBox();
    console.log(`[${mode}] retry button ${box?.width}x${box?.height}, tag ${await retry.evaluate((e) => e.tagName)}`);
    expect(box!.height).toBeGreaterThanOrEqual(24);
    expect(box!.width).toBeGreaterThanOrEqual(24);
    await expect(page.locator('[data-testid="feed-load-error"]')).toContainText("Couldn");
    // A tap while still blocked: exactly one more request, then quiet again.
    await retry.click();
    await expect(retry).toBeVisible();
    await page.waitForTimeout(2000);
    expect(hits.length).toBe(2);
    // Network back: retry loads the next page.
    await page.unroute("**/api/feed/**");
    await retry.click();
    await expect.poll(() => page.locator('[data-testid="demo-card"]').count()).toBeGreaterThan(before);
    await expect(retry).toHaveCount(0);
  });
}

test("chip: subject page 0 fails, no loop, retry replaces the seed", async ({ page }) => {
  const hits = await block(page, "abort");
  await page.goto("/");
  const chip = page.locator('[role="tablist"] [data-testid^="chip-"]').nth(1);
  const id = (await chip.getAttribute("data-testid"))!.slice(5);
  await chip.click();
  const retry = page.locator('[data-testid="feed-retry"]');
  await expect(retry).toBeVisible();
  await expect(page.locator("text=Loading more lessons…")).toHaveCount(0);
  await page.waitForTimeout(3000);
  console.log(`[chip ${id}] requests after failure + 3 s idle: ${hits.length}`);
  expect(hits.length).toBe(1);
  await page.unroute("**/api/feed/**");
  await retry.click();
  await expect.poll(() => page.locator('[data-testid="demo-card"]').count()).toBeGreaterThan(0);
  await expect(retry).toHaveCount(0);
});
