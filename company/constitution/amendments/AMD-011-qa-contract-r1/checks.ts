// AMD-011 proposed check code (parts 1 and 2), v3, shared by the fixture spec and the measurement probe.
// v1 skipped [aria-pressed="true"] (W-1128's wording) and asserted "unlocks within N presses": measured wrong on
// main (word-in-pieces: pressed pieces are real toggles; whose-cutoff-wins: the reveal asks for values, not counts).
import type { Page } from "@playwright/test";

export const CONTROLS = '[data-testid="stage"] [data-qa="control"]';

export async function stageFingerprint(page: Page) {
  return page.locator('[data-testid="stage"]').evaluate((el) => {
    const svgState = Array.from(el.querySelectorAll("svg *")).slice(0, 400)
      .map((n) => Array.from((n as Element).attributes).map((a) => a.value).join(",")).join("|");
    const inputs = Array.from(el.querySelectorAll("input")).map((i) => (i as HTMLInputElement).value).join(",");
    return `${(el as HTMLElement).innerText}§${inputs}§${svgState}§${el.querySelectorAll("*").length}`;
  });
}

/** What rule 3 skips today (unchanged by AMD-011): missing, hidden or disabled (native or aria-disabled). */
export async function skip(page: Page, i: number) {
  const c = page.locator(CONTROLS).nth(i);
  return (await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled());
}

/** The contract's way of operating one control (rule 3, unchanged). */
export async function operate(page: Page, i: number) {
  const c = page.locator(CONTROLS).nth(i);
  const tag = await c.evaluate((el) => `${el.tagName}:${(el as HTMLInputElement).type ?? ""}`);
  if (tag === "INPUT:range") {
    await c.focus();
    const max = await c.evaluate((el) => (el as HTMLInputElement).max);
    const val = await c.evaluate((el) => (el as HTMLInputElement).value);
    await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
    await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
  } else {
    await c.click();
  }
}

/** Rule 3 (DOM order, first 16). Part 1 (v3): a control that was aria-pressed="true" and changed nothing is not dead. */
export async function rule3(page: Page, opts: { part1: boolean; settleMs?: number }) {
  const dead: string[] = [];
  let pressedNoops = 0;
  const total = await page.locator(CONTROLS).count();
  for (let i = 0; i < Math.min(total, 16); i++) {
    if (await skip(page, i)) continue;
    const c = page.locator(CONTROLS).nth(i);
    const label = ((await c.getAttribute("aria-label")) ?? (await c.innerText().catch(() => "")) ?? `#${i}`).trim().slice(0, 40);
    const wasPressed = (await c.getAttribute("aria-pressed")) === "true";
    const before = await stageFingerprint(page);
    await operate(page, i);
    await page.waitForTimeout(opts.settleMs ?? 450);
    if (before === (await stageFingerprint(page))) {
      if (wasPressed) pressedNoops++;
      if (!(opts.part1 && wasPressed)) dead.push(label || `#${i}`);
    }
  }
  return { dead, pressedNoops };
}

/**
 * Part 2 (v3): from a fresh explore phase, press the controls last-first for up to 2 sweeps (first 16 from the end),
 * stopping when the reveal unlocks. If it is still locked, look for a way out: any visible, enabled control whose press
 * changes the stage or unlocks the reveal. None = dead end = fail. Still locked with a way out = pass (the lesson asks
 * for values, not a count).
 */
export const SWEEPS = 2;
export const QUIET_MS = 8_000;
export async function orderCheck(page: Page, opts: { settleMs?: number } = {}) {
  const reveal = page.locator('[data-testid="reveal-button"]');
  const settle = opts.settleMs ?? 450;
  let presses = 0, pressedNoops = 0;
  for (let sweep = 0; sweep < SWEEPS && !(await reveal.isEnabled()); sweep++) {
    const total = await page.locator(CONTROLS).count();
    for (let i = total - 1; i >= Math.max(0, total - 16) && !(await reveal.isEnabled()); i--) {
      if (await skip(page, i)) continue;
      const pressed = (await page.locator(CONTROLS).nth(i).getAttribute("aria-pressed")) === "true";
      const before = pressed ? await stageFingerprint(page) : "";
      await operate(page, i); presses++;
      await page.waitForTimeout(settle);
      if (pressed && before === (await stageFingerprint(page))) pressedNoops++;
    }
  }
  if (await reveal.isEnabled()) return { unlocked: true, deadEnd: false, presses, pressedNoops };
  // v3.1: an animation may hold every control disabled for a while (atoms-across-a-hair's auto-zoom, ~1.5 s).
  // Wait up to QUIET_MS for the reveal to unlock or for some control to become usable before judging.
  const deadline = Date.now() + QUIET_MS;
  while (Date.now() < deadline) {
    if (await reveal.isEnabled()) return { unlocked: true, deadEnd: false, presses, pressedNoops, waited: true };
    const n = await page.locator(CONTROLS).count();
    let any = false;
    for (let i = 0; i < n && !any; i++) any = !(await skip(page, i));
    if (any) break;
    await page.waitForTimeout(250);
  }
  const total = await page.locator(CONTROLS).count();
  for (let i = 0; i < total; i++) {
    if (await skip(page, i)) continue;
    const before = await stageFingerprint(page);
    await operate(page, i);
    await page.waitForTimeout(settle);
    if ((await reveal.isEnabled()) || before !== (await stageFingerprint(page))) return { unlocked: false, deadEnd: false, presses, pressedNoops, wayOut: i };
  }
  return { unlocked: false, deadEnd: true, presses, pressedNoops };
}
