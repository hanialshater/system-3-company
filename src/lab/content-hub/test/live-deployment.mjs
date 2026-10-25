// Live HTTP/browser verification for the isolated pilot; performs no publishing.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const revision = process.argv[2], stage = process.argv[3] ?? revision;
if (!['A', 'B'].includes(revision) || !/^[A-Za-z0-9-]+$/.test(stage)) throw new Error('Expected A/B and safe stage');
const host = 'https://system3-content-hub-demo.vercel.app';
const slug = 'sum-seven-ignores-first-die';
const full = process.argv.includes('--full');
const output = path.resolve('artifacts/content-hub-deployment-final');
fs.mkdirSync(output, { recursive: true });
// Keep TLS verification enabled. Provision the environment CA in the browser's trust store
// outside this script when a managed proxy is present; never ignore certificate errors.
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox'],
  ...(process.env.CONTENT_HUB_BROWSER_DATA ? { env: { ...process.env, XDG_DATA_HOME: process.env.CONTENT_HUB_BROWSER_DATA } } : {}),
  ...(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {}),
});
const results = [];
try {
  for (const viewport of full ? [{ width: 1280, height: 1000 }, { width: 390, height: 844 }] : [{ width: 1280, height: 1000 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(host + '/d/' + slug);
    assert.equal(response.status(), 200);
    const published = await page.evaluate(async slug => {
      const response = await fetch('/api/publication/' + slug, { cache: 'no-store' });
      if (!response.ok) throw new Error('Publication API ' + response.status);
      return response.json();
    }, slug);
    assert.equal(published.revision, revision);
    const frame = page.frameLocator('iframe');
    await frame.locator('html[data-delivery-revision="' + revision + '"]').waitFor({ timeout: 20000 });
    await frame.locator('[data-testid="lesson"]').waitFor();
    assert.equal(await page.locator('iframe').evaluate(el => el.contentDocument === null), true);
    assert.equal(new URL(published.frameUrl).origin, 'https://system3-content-hub-artifacts.vercel.app');
    if (full) {
      await frame.locator('[data-testid="predict-option"]').nth(1).click();
      await frame.locator('[data-testid="commit-prediction"]').click();
      await frame.getByRole('button', { name: 'First die is 3', exact: true }).click();
      await frame.getByRole('button', { name: 'Total 8', exact: true }).click();
      await frame.getByRole('button', { name: 'First die is 1', exact: true }).click();
      await frame.locator('[data-testid="reveal-button"]').click();
      const reveal = frame.locator('[data-testid="reveal"]');
      await reveal.waitFor({ state: 'visible' });
      assert.match(await reveal.innerText(), /independent/);
    }
    assert.equal(await frame.locator('html').evaluate(el => el.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    const unknown = await page.evaluate(async () => (await fetch('/api/publication/unknown-demo', { cache: 'no-store' })).status);
    assert.equal(unknown, 404);
    await page.screenshot({ path: path.join(output, 'live-' + stage + '-' + viewport.width + '.png'), fullPage: true });
    results.push({ revision, stage, viewport, fullFlow: full, publication: published, opaqueOrigin: true, unknown404: true, errors, pass: true });
    await context.close();
  }
  fs.writeFileSync(path.join(output, 'live-' + stage + '.json'), JSON.stringify({ host, results, liveDeployment: true }, null, 2));
  console.log(JSON.stringify({ stage, revision, checks: results.length, passed: true }));
} finally {
  await browser.close();
}
