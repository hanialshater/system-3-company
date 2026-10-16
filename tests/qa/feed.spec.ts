// Feed-level QA: the product around the lessons.
import { expect, test } from "@playwright/test";
import { lessons } from "./lessons";

test("home feed opens honestly and starts", async ({ page }) => {
  await page.goto("/");
  const intro = page.locator('[data-testid="intro-card"]');
  await expect(intro).toBeVisible();
  await expect(intro, "cold start does not pretend to personalise").toContainText("not “for you”");
  await page.locator('[data-testid="start"]').click();
  await expect(page.locator('[data-testid="demo-card"]').first()).toBeVisible();
});

test("subject chips filter the feed", async ({ page }) => {
  const first = lessons()[0];
  await page.goto("/");
  await page.locator(`[data-testid="chip-${first.domain}"]`).click();
  const cards = page.locator('[data-testid="demo-card"]');
  const slugs = await cards.evaluateAll((els) => els.map((e) => e.getAttribute("data-slug")));
  const allowed = new Set(lessons().filter((l) => l.domain === first.domain).map((l) => l.slug));
  expect(slugs.length).toBeGreaterThan(0);
  for (const s of slugs) expect(allowed.has(s!)).toBe(true);
});

test("provenance is legible on demand", async ({ page }) => {
  const first = lessons()[0];
  await page.goto(`/d/${first.slug}`);
  await page.locator('[data-testid="trust-button"]').click();
  const sheet = page.locator('[data-testid="trust-sheet"]');
  await expect(sheet).toBeVisible();
  await expect(sheet).toContainText("address:");
});

test("a finished lesson comes back as a spaced revisit", async ({ page }) => {
  // AMD-012 (W-1451): only lessons the feed lists come back as revisits (src/components/Feed.tsx keeps drafts out
  // by design), so pick the first lesson that is published or in review, never a draft.
  const first = lessons().find((l) => l.status === "published" || l.status === "review");
  expect(first, "no published or review lesson in this run's pool (QA_ONLY?)").toBeTruthy();
  if (!first) return;
  await page.goto("/");
  await page.evaluate((slug) => {
    const past = Date.now() - 2 * 86_400_000;
    localStorage.setItem("s3c:progress:v1", JSON.stringify({ [slug]: { completedAt: past, recalls: [] } }));
  }, first.slug);
  await page.reload();
  const revisit = page.locator('[data-testid="revisit-card"]').first();
  await revisit.scrollIntoViewIfNeeded();
  await expect(revisit).toBeVisible();
  await revisit.locator('[data-testid="recall-option"]').first().click();
  await expect(revisit.locator('[data-testid="recall-why"]')).toBeVisible();
});

test("the map shows taught and untaught concepts", async ({ page }) => {
  await page.goto("/catalog");
  await expect(page.locator(".domain-block").first()).toBeVisible();
  await expect(page.locator("text=not yet taught").first()).toBeVisible();
});
