// LESSON FRAMES PILOT COPY of tests/qa/contract.spec.ts (the original is constitutional and unchanged; this copy is
// measurement, not gate evidence, until the evaluation steward rules on W-087: C7 in
// company/engineering/reviews/2026-10-25-content-hub-production-review.md).
// Differences from the original, and only these:
//   - lessons: the slugs in src/lib/lesson-frames.manifest.json (QA_ONLY filters them), served on /d/<slug> by an app
//     built with NEXT_PUBLIC_LESSON_FRAMES=pilot-50, so each runs in a sandboxed cross-origin iframe;
//   - every lesson locator goes through page.frameLocator(...) (`f.locator` for `page.locator`), including the
//     tap-target check (the SPIKE-001 copy measured it on the host page, where it found nothing);
//   - the overflow check runs in the frame and on the host;
//   - added, marked "pilot:": the frame is sandboxed and its src names the manifest's frameDoc (after goto); the
//     bridge carried progress and events to the host's real storage (C2), and the card's hook hid (C3) (at the end);
//   - screenshots go to artifacts/qa-frames/.
// `diff tests/qa/contract.spec.ts spike/qa/pilot/contract-pilot.spec.ts` shows the whole change.
//
// What it checks, for every lesson, on a phone and a desktop viewport:
//   1. It renders without page errors.
//   2. Predict-before-reveal: stage controls are locked and no reveal exists before a prediction.
//   3. Every stage control does something observable ("the beautiful button that does nothing").
//   4. The reveal unlocks only after interaction, and says something substantial.
//   5. Nothing overflows the screen horizontally; controls are big enough to tap.
// It saves a screenshot per phase to artifacts/qa-frames/ for the evaluators.

import { expect, test, type FrameLocator, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/lib/lesson-frames.manifest.json"), "utf8"));
const lessons = () => {
  const only = process.env.QA_ONLY?.split(",").filter(Boolean);
  return Object.keys(manifest.lessons)
    .filter((s) => !only || only.includes(s))
    .map((slug) => ({ slug }));
};

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
  const dir = path.join("artifacts", "qa-frames", slug);
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

      await page.goto(`/d/${lesson.slug}`);
      // pilot: the frame is the one the manifest serves (AMD-018 (b).1 as the steward's ruling words it): sandboxed,
      // and its src names this slug's frameDoc hash.
      const frameEl = page.locator(`iframe[data-slug="${lesson.slug}"]`);
      await expect(frameEl, "pilot: sandboxed frame").toHaveAttribute("sandbox", "allow-scripts");
      expect(await frameEl.getAttribute("src"), "pilot: frame src names the manifest's frameDoc").toMatch(new RegExp(`/f/${manifest.lessons[lesson.slug].frameDoc}\\.html#`));
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
      const small = await f
        .locator('[data-testid="stage"] [data-qa="control"]')
        .evaluateAll((els) =>
          els
            .filter((e) => (e as HTMLElement).offsetParent !== null)
            .map((e) => e.getBoundingClientRect())
            .filter((r) => r.height < 24 || r.width < 24).length,
        );
      expect(small, "tap targets at least 24px").toBe(0);

      // pilot: C2, the bridge carried the completion and the lesson's events to the host's real storage.
      await expect
        .poll(() => page.evaluate((s) => JSON.parse(localStorage.getItem("s3c:progress:v1") ?? "{}")[s]?.completedAt ?? null, lesson.slug), { message: "pilot: progress reached the host" })
        .not.toBeNull();
      const types = await page.evaluate((s) => (JSON.parse(localStorage.getItem("s3c:events:v1") ?? "[]") as { type: string; slug: string }[]).filter((e) => e.slug === s).map((e) => e.type), lesson.slug);
      for (const t of ["view", "predict", "interact", "reveal", "complete"]) expect(types, `pilot: event ${t} reached the host`).toContain(t);
      // pilot: C3, the hook is hidden once the frame is ready (in-app it hides when the lesson mounts).
      await expect(page.locator(".card-hook"), "pilot: hook hidden").toBeHidden();

      expect(errors, "no page or console errors").toEqual([]);
    });
  });
}
