import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const base = process.env.PHYSICS_QA_URL;
if (!base) throw new Error("PHYSICS_QA_URL must point to the running physics build");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

async function start(slug) {
  await page.goto(`${base}/d/${slug}`);
  await page.locator('[data-testid="predict-option"]').first().click();
  await page.locator('[data-testid="commit-prediction"]').click();
}
async function press(slider, key, times) {
  await slider.focus();
  for (let i = 0; i < times; i++) await page.keyboard.press(key);
}

try {
  await start("scale-box-energy-quantum-number");
  let slider = page.locator('[data-testid="stage"] input[type="range"]');
  assert.equal(await slider.getAttribute("step"), "1");
  assert.ok((await slider.boundingBox()).height >= 44);
  await press(slider, "ArrowRight", 2);
  assert.equal(await slider.inputValue(), "3");
  let description = await page.locator('[data-testid="stage"] svg').getAttribute("aria-label");
  assert.match(description, /double input: 4 units/);
  assert.match(description, /current input: 3 times; current output: 9 units/i);
  await press(slider, "ArrowLeft", 2);
  assert.equal(await slider.inputValue(), "1");
  description = await page.locator('[data-testid="stage"] svg').getAttribute("aria-label");
  assert.match(description, /double input: 4 units/);
  assert.match(description, /current input: 1 times; current output: 1 units/i);
  assert.equal(await page.locator('[data-testid="reveal-button"]').isEnabled(), true);

  await start("scale-orbit-speed-radius");
  slider = page.locator('[data-testid="stage"] input[type="range"]');
  assert.equal(await slider.getAttribute("step"), "0.5");
  await press(slider, "ArrowRight", 4);
  description = await page.locator('[data-testid="stage"] svg').getAttribute("aria-label");
  assert.match(description, /double input: 1\/√2 units/);
  assert.match(description, /current input: 3 times; current output: 0\.577 units/i);

  await start("inclined-orbit-projection");
  slider = page.locator('[data-testid="stage"] input[type="range"]');
  assert.ok((await slider.boundingBox()).height >= 44);
  await press(slider, "ArrowRight", 2);
  description = await page.locator('[data-testid="stage"] svg').getAttribute("aria-label");
  assert.match(description, /tilted 60 degrees/);
  assert.match(description, /50 percent/);

  await start("sag-and-rope-tension");
  const button = page.locator('[data-testid="stage"] button');
  assert.ok((await button.boundingBox()).height >= 44);
  console.log("PASS: dynamic scaling, retained double witness, discrete steps, 3D projection and 44px targets");
} finally {
  await browser.close();
}
