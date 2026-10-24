// Frozen preselected real-demo browser smoke; failed selections are never replaced.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from '@playwright/test';

const ROOT = path.resolve(new URL('../../../', import.meta.url).pathname);
const BASE = path.resolve(process.argv[2] ?? path.join(ROOT, 'artifacts/content-hub-catalogue'));
const builds = JSON.parse(fs.readFileSync(path.join(BASE, 'builds.json'), 'utf8'));
const { sample } = JSON.parse(fs.readFileSync(path.join(BASE, 'sample-selection.json'), 'utf8'));
const listen = server => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`)));
let hostOrigin;
const assets = http.createServer((req, res) => {
  const requestPath = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  const candidates = [path.resolve(BASE, 'dist', '.' + requestPath), path.resolve(BASE, 'state/public', '.' + requestPath)];
  const file = candidates.find(f => (f.startsWith(path.join(BASE, 'dist') + path.sep) || f.startsWith(path.join(BASE, 'state/public') + path.sep)) && fs.existsSync(f) && fs.statSync(f).isFile());
  if (!file) return res.writeHead(404).end('not found');
  const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };
  const headers = { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public,max-age=31536000,immutable', 'X-Content-Type-Options': 'nosniff' };
  if (file.endsWith('.html')) headers['Content-Security-Policy'] = `frame-ancestors ${hostOrigin}`;
  res.writeHead(200, headers).end(fs.readFileSync(file));
});
const assetOrigin = await listen(assets);
const host = http.createServer((req, res) => {
  const id = new URL(req.url, 'http://local').searchParams.get('id'), build = builds.find(b => b.id === id && b.ok);
  if (!build) return res.writeHead(404).end('No successful build');
  const src = assetOrigin + build.frame + '#host=' + encodeURIComponent(hostOrigin);
  res.writeHead(200, { 'Content-Type': 'text/html' }).end(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Catalogue artifact smoke</title><style>body{margin:0}iframe{border:0;width:100%;height:100dvh}</style><iframe title="Demo artifact" sandbox="allow-scripts" src="${src}"></iframe><script>window.events=[];addEventListener('message',e=>{if(e.source===document.querySelector('iframe').contentWindow&&e.data?.s3c===1)events.push(e.data)})</script>`);
});
hostOrigin = await listen(host);
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const results = [];
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
    const context = await browser.newContext({ viewport });
    for (const id of sample) {
      const errors = [], consoleErrors = [], page = await context.newPage(), started = performance.now();
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', e => { if (e.type() === 'error') consoleErrors.push(e.text().slice(0, 500)); });
      const record = { id, viewport, ok: false, errors, consoleErrors };
      try {
        if (!builds.find(b => b.id === id && b.ok)) throw new Error('Preselected demo did not compile');
        await page.goto(hostOrigin + '/?id=' + encodeURIComponent(id));
        await page.waitForFunction(() => window.events.some(e => e.type === 'ready' || e.type === 'error'), null, { timeout: 8000 });
        const bridgeErrors = await page.evaluate(() => events.filter(e => e.type === 'error').map(e => e.message));
        if (bridgeErrors.length || errors.length) throw new Error([...bridgeErrors, ...errors].join('; '));
        const frame = page.frameLocator('iframe');
        const lesson = frame.locator('[data-testid="lesson"]');
        await lesson.waitFor({ state: 'visible', timeout: 4000 });
        record.initialPhase = await lesson.getAttribute('data-phase');
        const options = frame.locator('[data-testid="predict-option"]');
        if (await options.count()) {
          await options.first().click();
          const commit = frame.locator('[data-testid="commit-prediction"]');
          if (await commit.count()) await commit.click();
          await page.waitForTimeout(50);
          record.afterPredictionPhase = await lesson.getAttribute('data-phase');
          if (record.afterPredictionPhase !== 'explore') throw new Error('Prediction did not enter explore phase');
        } else throw new Error('No prediction controls found');
        record.horizontalOverflow = await frame.locator('html').evaluate(el => el.scrollWidth > innerWidth);
        record.ok = errors.length === 0 && !record.horizontalOverflow;
        if (!record.ok) record.failure = errors.length ? errors.join('; ') : 'Horizontal overflow';
        if (['ai', 'geography', 'history'].includes(id.split('/')[0])) {
          const file = `browser-${viewport.width}-${id.replaceAll('/', '--')}.png`;
          await page.screenshot({ path: path.join(BASE, file), fullPage: true });
        }
      } catch (error) { record.failure = error.message; }
      record.ms = performance.now() - started; results.push(record); await page.close();
      console.log(`${record.ok ? 'PASS' : 'FAIL'} ${viewport.width} ${id}${record.failure ? ': ' + record.failure : ''}`);
    }
    await context.close();
  }
  const report = { preselectedRealDemos: sample.length, checks: results.length, passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok).length, results, caveat: 'Domain-stratified render and prediction-to-explore smoke, not complete editorial/QA certification or all-catalogue browser coverage.' };
  fs.writeFileSync(path.join(BASE, 'browser.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: report.checks, passed: report.passed, failed: report.failed }));
} finally { await browser.close(); await Promise.all([new Promise(r => host.close(r)), new Promise(r => assets.close(r))]); }
