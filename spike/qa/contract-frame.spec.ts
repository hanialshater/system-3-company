// SPIKE-001 COPY of tests/qa/contract.spec.ts (the original is constitutional and unchanged).
// Differences, and only these: the lesson runs inside a sandboxed cross-origin iframe on /spike,
// so every lesson locator goes through page.frameLocator(...) (`f.locator` for `page.locator`),
// the overflow check runs in the frame and on the host, screenshots go to artifacts/qa-spike/, and
// the lesson list is the spike's three. `diff tests/qa/contract.spec.ts spike/qa/contract-frame.spec.ts`
// shows the whole change. Original header follows.
//
// What it checks, for every lesson, on a phone and a desktop viewport:
//   1. It renders without page errors.
//   2. Predict-before-reveal: stage controls are locked and no reveal exists before a prediction.
//   3. Every stage control does something observable ("the beautiful button that does nothing").
//   4. The reveal unlocks only after interaction, and says something substantial.
//   5. Nothing overflows the screen horizontally; controls are big enough to tap.
// It saves a screenshot per phase to artifacts/qa/ for the evaluators.

import { expect, test, type FrameLocator, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SPIKE = ["why-seven-wins", "throw-it-fast-enough", "bearing-spiral-to-the-pole"];
const lessons = () => (process.env.QA_ONLY?.split(",").filter(Boolean) ?? SPIKE).map((slug) => ({ slug }));

async function stageFingerprint(f: FrameLocator) {
  return f.locator('[data-testid="stage"]').evaluate((el) => {
    const svgState = Array.from(el.querySelectorAll("svg *"))
      .slice(0, 400)
      .map((n) => Array.from((n as Element).attributes).map((a) => a.value).join(","))
      .join("|");
    const inputs = Array.from(el.querySelectorAll("input")).map((i) => (i as HTMLInputElement).value).join(",");
    return `${(el as HTMLElement).innerText}§${inputs}§${svgState}§${el.querySelectorAll("*").length}`;
  });
}

async function shot(page: Page, slug: string, project: string, phase: string) {
  const dir = path.join("artifacts", "qa-spike", slug);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${project}-${phase}.png`) });
}

for (const lesson of lessons()) {
  test.describe(`${lesson.slug}`, () => {
    test("follows the lesson contract", async ({ page }, info) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (m) => {
        if (m.type() === "error" && !/favicon|Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`);
      });

      await page.goto(`/spike?only=${lesson.slug}&mode=single`);
      const f = page.frameLocator(`iframe[data-slug="${lesson.slug}"]`);
      const lessonEl = f.locator('[data-testid="lesson"]');
      await expect(lessonEl, "lesson renders").toBeVisible({ timeout: 15_000 });
      await expect(lessonEl).toHaveAttribute("data-phase", "predict");
      await shot(page, lesson.slug, info.project.name, "1-predict");

      // 2. Predict before reveal.
      await expect(f.locator('[data-testid="reveal-button"]'), "no reveal before a prediction").toHaveCount(0);
      await expect(f.locator('[data-testid="reveal"]')).toHaveCount(0);
      const controls = f.locator('[data-testid="stage"] [data-qa="control"]');
      const n = await controls.count();
      expect(n, "stage has at least one control").toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        await expect(controls.nth(i), `control ${i} is locked before the prediction`).toBeDisabled();
      }
      const options = f.locator('[data-testid="predict-option"]');
      expect(await options.count(), "at least two prediction options").toBeGreaterThanOrEqual(2);
      await expect(f.locator('[data-testid="commit-prediction"]')).toBeDisabled();

      // Commit a prediction (the last option, so the right answer is not always picked).
      await options.last().click();
      await f.locator('[data-testid="commit-prediction"]').click();
      await expect(lessonEl).toHaveAttribute("data-phase", "explore");
      await expect(f.locator('[data-testid="reveal-button"]'), "reveal waits for interaction").toBeDisabled();

      // 3. Every control does something. Re-query each time: the stage re-renders.
      const dead: string[] = [];
      const total = await controls.count();
      for (let i = 0; i < Math.min(total, 16); i++) {
        const c = f.locator('[data-testid="stage"] [data-qa="control"]').nth(i);
        if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
        const label = ((await c.getAttribute("aria-label")) ?? (await c.innerText().catch(() => "")) ?? `#${i}`).trim().slice(0, 40);
        const before = await stageFingerprint(f);
        const tag = await c.evaluate((el) => `${el.tagName}:${(el as HTMLInputElement).type ?? ""}`);
        if (tag === "INPUT:range") {
          await c.focus();
          const max = await c.evaluate((el) => (el as HTMLInputElement).max);
          const val = await c.evaluate((el) => (el as HTMLInputElement).value);
          await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
          await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
        } else if (tag.startsWith("INPUT")) {
          await c.click();
        } else {
          await c.click();
        }
        await page.waitForTimeout(450); // let animations settle
        const after = await stageFingerprint(f);
        if (before === after) dead.push(label || `#${i}`);
      }
      expect(dead, `controls that changed nothing observable: ${dead.join(", ")}`).toEqual([]);
      await shot(page, lesson.slug, info.project.name, "2-explore");

      // 4. Reveal.
      const revealBtn = f.locator('[data-testid="reveal-button"]');
      await expect(revealBtn, "reveal unlocks after interaction").toBeEnabled();
      await revealBtn.click();
      const reveal = f.locator('[data-testid="reveal"]');
      await expect(reveal).toBeVisible();
      const text = (await reveal.innerText()).trim();
      expect(text.length, "the reveal explains why, not just whether").toBeGreaterThan(120);
      await shot(page, lesson.slug, info.project.name, "3-reveal");

      // 5. Layout.
      const overflow = await f.locator(":root").evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "no horizontal overflow").toBeLessThanOrEqual(1);
      const hostOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(hostOverflow, "no horizontal overflow on the host").toBeLessThanOrEqual(1);
      const small = await page
        .locator('[data-testid="stage"] [data-qa="control"]')
        .evaluateAll((els) =>
          els
            .filter((e) => (e as HTMLElement).offsetParent !== null)
            .map((e) => e.getBoundingClientRect())
            .filter((r) => r.height < 24 || r.width < 24).length,
        );
      expect(small, "tap targets at least 24px").toBe(0);

      expect(errors, "no page or console errors").toEqual([]);
    });
  });
}
