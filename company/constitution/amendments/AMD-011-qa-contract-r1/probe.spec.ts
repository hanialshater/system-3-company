// AMD-011 measurement probe v3: one page load per lesson; part 2 (orderCheck) plus a census for part 1.
import { test } from "@playwright/test";
import fs from "node:fs";
import { lessons } from "./lessons";
import { CONTROLS, orderCheck } from "./checks";

const OUT = process.env.PROBE_OUT!;
for (const lesson of lessons()) {
  test(lesson.slug, async ({ page }) => {
    const row: Record<string, unknown> = { slug: lesson.slug, domain: lesson.domain, status: lesson.status };
    try {
      await page.goto(`/d/${lesson.slug}`);
      await page.locator('[data-testid="lesson"]').waitFor({ state: "visible", timeout: 20_000 });
      await page.locator('[data-testid="predict-option"]').last().click();
      await page.locator('[data-testid="commit-prediction"]').click();
      await page.waitForFunction(() => document.querySelector('[data-testid="lesson"]')?.getAttribute("data-phase") === "explore", null, { timeout: 10_000 });
      row.controls = await page.locator(CONTROLS).count();
      row.r = await orderCheck(page, { settleMs: Number(process.env.SETTLE_MS ?? 250) });
    } catch (e) { row.error = String(e).slice(0, 200); }
    fs.appendFileSync(OUT, JSON.stringify(row) + "\n");
  });
}
