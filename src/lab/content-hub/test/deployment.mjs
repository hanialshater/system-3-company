// End-to-end local production build of the isolated Next host and real hub artifacts.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { ContentHub } from '../hub.mjs';

const ROOT = path.resolve(new URL('../../../../', import.meta.url).pathname);
const base = path.resolve(process.argv[2] ?? path.join(ROOT, 'artifacts/content-hub-deployment-final'));
const rows = JSON.parse(fs.readFileSync(path.join(base, 'publications.json'), 'utf8'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const compiler = new URL('../react-compiler.mjs', import.meta.url).pathname;
const extra = ['package-lock.json','spike/build.mjs','spike/tooling/ts-loader.cjs','spike/tooling/css-module-loader.cjs'].map(f => sha(fs.readFileSync(path.join(ROOT, f)))).join(':');
const hub = new ContentHub(path.join(base, 'hub'), { compiler, sdk: 'content-hub-react-v1', compilerIdentityExtra: extra });
let current = rows[0], hostOrigin;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://local');
  if (url.pathname === '/publication') return res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }).end(JSON.stringify({ ...current, status: 'published', frameUrl: assetOrigin + current.framePath }));
  const file = path.resolve(base, 'artifact-site', '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(path.join(base, 'artifact-site') + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.writeHead(404).end();
  const headers = { 'Content-Type': file.endsWith('.html') ? 'text/html' : file.endsWith('.css') ? 'text/css' : 'text/javascript', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public,max-age=31536000,immutable', 'X-Content-Type-Options': 'nosniff' };
  const bytes = fs.readFileSync(file);
  if (file.endsWith('.html')) headers['Content-Security-Policy'] = bytes.toString().match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1] + `; frame-ancestors ${hostOrigin}; sandbox allow-scripts`;
  res.writeHead(200, headers).end(bytes);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const assetOrigin = 'http://127.0.0.1:' + server.address().port;
const portProbe = http.createServer(); await new Promise(r => portProbe.listen(0, '127.0.0.1', r)); const port = portProbe.address().port; await new Promise(r => portProbe.close(r));
hostOrigin = 'http://127.0.0.1:' + port;
const log = fs.openSync(path.join(base, 'host-runtime.log'), 'w');
const next = spawn(process.execPath, [path.join(ROOT, 'node_modules/next/dist/bin/next'), 'start', '-p', String(port), '-H', '127.0.0.1'], {
  cwd: path.join(ROOT, 'src/lab/content-hub/deploy-host'),
  env: { PATH: process.env.PATH, NODE_ENV: 'production', CONTENT_HUB_PUBLICATION_URL: assetOrigin + '/publication', CONTENT_HUB_ARTIFACT_ORIGIN: assetOrigin }, stdio: ['ignore', log, log],
});
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const checks = [], errors = [], sequence = [];
const publish = revision => {
  const row = rows.find(r => r.revision === revision), generation = hub.publication('pilot', row.slug).generation;
  const p = hub.publish('pilot', row.slug, row.buildId, { expectedGeneration: generation, rollback: revision === 'A' });
  current = row; sequence.push({ revision, generation: p.generation, hostProcess: next.pid });
};
try {
  for (let i=0;i<60;i++) { try { if ((await fetch(hostOrigin)).ok) break; } catch {} await new Promise(r=>setTimeout(r,250)); }
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } }); page.on('pageerror', e=>errors.push(e.message));
  async function load(revision, full) {
    await page.goto(hostOrigin + '/d/' + current.slug);
    const frame = page.frameLocator('iframe');
    await frame.locator(`html[data-delivery-revision="${revision}"]`).waitFor();
    await frame.locator('[data-testid="lesson"]').waitFor();
    assert.equal(await page.locator('iframe').evaluate(el=>el.contentDocument===null),true);
    if (full) {
      await frame.locator('[data-testid="predict-option"]').nth(1).click();
      await frame.locator('[data-testid="commit-prediction"]').click();
      await frame.getByRole('button',{name:'First die is 3',exact:true}).click();
      await frame.getByRole('button',{name:'Total 8',exact:true}).click();
      await frame.getByRole('button',{name:'First die is 1',exact:true}).click();
      await frame.locator('[data-testid="reveal-button"]').click();
      const reveal=frame.locator('[data-testid="reveal"]'); await reveal.waitFor({state:'visible'});
      assert.match(await reveal.innerText(),/independent/);
      assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
    }
    checks.push({ revision, fullFlow:full, viewport:page.viewportSize(), pass:true });
  }
  publish('A'); await load('A',true);
  publish('B'); await load('B',false);
  publish('A'); await load('A',false);
  publish('B'); await page.setViewportSize({width:390,height:844}); await load('B',true);
  await page.screenshot({path:path.join(base,'phone.png'),fullPage:true});
  const api=await fetch(hostOrigin+'/api/publication/'+current.slug);assert.equal(api.status,200);assert.equal((await api.json()).revision,'B');
  assert.equal((await fetch(hostOrigin+'/d/unknown-demo')).status,404);
  const p=hub.publication('pilot',current.slug), beforeJobs=hub.jobs('pilot').length;
  for(const row of rows)hub.artifact('pilot',row.artifact);
  assert.equal(hub.jobs('pilot').length,beforeJobs);
  const file=`demos/${current.slug}/Demo.tsx`, original=hub.snapshot('pilot',hub.head('pilot')).get(file);
  hub.write('pilot',{expectedHead:hub.head('pilot'),scope:`demos/${current.slug}`,files:{[file]:'export default function {'}});
  const [failed]=hub.work();assert.equal(failed.status,'failed');assert.deepEqual(hub.publication('pilot',current.slug),p);
  hub.write('pilot',{expectedHead:hub.head('pilot'),scope:`demos/${current.slug}`,files:{[file]:original}});
  const [restored]=hub.work();assert.equal(restored.status,'cached');assert.equal(restored.artifact,current.artifact);
  checks.push({check:'failed React build preserves publication; restored inputs reuse artifact',pass:true});
  assert.deepEqual(errors,[]);
  const result={status:'passed',checks,sequence,errors,hostBuild:'Next.js production build',artifactOriginSeparate:true,liveDeployment:false};
  fs.writeFileSync(path.join(base,'local-verification.json'),JSON.stringify(result,null,2)); console.log(JSON.stringify(result,null,2));
} finally { await browser.close();next.kill('SIGTERM');await new Promise(r=>next.once('exit',r));fs.closeSync(log);await new Promise(r=>server.close(r));hub.close(); }
