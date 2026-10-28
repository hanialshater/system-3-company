// Design review probe (design-lead, W-2037): flatten-the-cube-to-a-dot at 390x844 and 1280x800, both OS schemes.
//   node probe.mjs <base-url> <out-dir>
// 1. settled-back: walk the QA path with a 3 s settle after every press, fingerprint each card when leaving it,
//    tap back through the trail (3 s settle), compare. Tells "state not kept" from "sampled mid-motion".
// 2. skip: commit, press Next twice without Slice/Take the top off; record card 3's text and whether reveal unlocks.
// 3. scheme: screenshot predict + reveal under colorScheme light and dark; read the stage's computed --bg/--fg.
// 4. early-reveal: Remove an edge, Remove the rest, press reveal at once (mid playback); record the stage at reveal.
// 5. fit: at reveal, stage top and reveal bottom vs viewport.
import { chromium } from "@playwright/test";
const [base, out] = process.argv.slice(2);
const url = `${base}/d/flatten-the-cube-to-a-dot`;
const VPS = { phone: { width: 390, height: 844 }, desktop: { width: 1280, height: 800 } };
const res = {};
const b = await chromium.launch();
const fp = (p) => p.evaluate(() => {
  const sc = [...document.querySelectorAll('[data-subcard-index]')].find((e) => !e.hidden);
  const svg = sc?.querySelector('svg[role=img]');
  return { idx: sc?.getAttribute('data-subcard-index'), text: sc?.innerText.replace(/\s+/g, ' '), svg: svg ? svg.innerHTML.length + ':' + svg.getAttribute('aria-label') : '' };
});
const ctl = (p, name) => p.locator('[data-testid=stage] [data-qa=control]', { hasText: name }).first();
async function start(vp, scheme = 'dark', reduced = 'no-preference') {
  const ctx = await b.newContext({ viewport: VPS[vp], colorScheme: scheme, reducedMotion: reduced, hasTouch: vp === 'phone', isMobile: vp === 'phone' });
  const p = await ctx.newPage();
  await p.goto(url); await p.waitForSelector('[data-testid=predict-option]');
  return p;
}
async function commit(p, i = 0) { await p.locator('[data-testid=predict-option]').nth(i).click(); await p.locator('[data-testid=commit-prediction]').click(); await p.waitForTimeout(400); }
for (const vp of Object.keys(VPS)) {
  const r = (res[vp] = {});
  // 1 settled back
  let p = await start(vp); await commit(p);
  const left = {};
  for (const name of ['Slice a corner', 'Next: Flatten', 'Take the top off', 'Next: Shrink', 'Remove an edge', 'Remove the rest']) {
    const before = await fp(p);
    await ctl(p, name).click(); await p.waitForTimeout(3000);
    const after = await fp(p);
    if (before.idx !== after.idx) left[before.idx] = before; // fingerprint taken settled, just before leaving
  }
  const lastCard = await fp(p); left[lastCard.idx] = lastCard;
  const back = [];
  for (const i of [1, 0]) {
    await p.locator('[data-testid=stage] [data-qa=control]').nth(i).click(); await p.waitForTimeout(3000);
    const m = await fp(p); back.push({ card: i, same: m.text === left[String(i)]?.text && m.svg === left[String(i)]?.svg });
  }
  await p.locator('[data-testid=stage] [data-qa=control]').nth(2).click(); await p.waitForTimeout(3000);
  const m3 = await fp(p); back.push({ card: 2, same: m3.text === lastCard.text && m3.svg === lastCard.svg });
  r.settledBack = back;
  await p.screenshot({ path: `${out}/${vp}-dark-card3-end.png` });
  await p.locator('[data-testid=reveal-button]').click(); await p.waitForTimeout(1500);
  r.fit = await p.evaluate(() => {
    const st = document.querySelector('[data-testid=stage]').getBoundingClientRect();
    const rv = document.querySelector('[data-testid=reveal]').getBoundingClientRect();
    const svg = document.querySelector('[data-testid=stage] [data-subcard-index]:not([hidden]) svg[role=img]').getBoundingClientRect();
    return { stageTop: Math.round(st.top), revealBottom: Math.round(rv.bottom), vh: innerHeight, picH: Math.round(svg.height), picW: Math.round(svg.width), words: document.querySelector('[data-testid=reveal]').innerText.split(/\s+/).length };
  });
  await p.screenshot({ path: `${out}/${vp}-dark-reveal.png` });
  await p.context().close();
  // 2 skip
  p = await start(vp); await commit(p);
  await ctl(p, 'Next: Flatten').click(); await p.waitForTimeout(500);
  await ctl(p, 'Next: Shrink').click(); await p.waitForTimeout(500);
  r.skip = { card3: (await fp(p)).text, revealEnabled: await p.locator('[data-testid=reveal-button]').isEnabled() };
  await ctl(p, 'Remove an edge').click(); await p.waitForTimeout(700);
  await ctl(p, 'Remove the rest').click(); await p.waitForTimeout(3500);
  r.skip.afterShrink = { card3: (await fp(p)).text, revealEnabled: await p.locator('[data-testid=reveal-button]').isEnabled(), btn: await p.locator('[data-testid=reveal-button]').innerText() };
  await p.screenshot({ path: `${out}/${vp}-skip-flatten.png` });
  await p.context().close();
  // 3 schemes
  for (const scheme of ['light', 'dark']) {
    p = await start(vp, scheme); 
    r['vars_' + scheme] = await p.evaluate(() => { const s = getComputedStyle(document.querySelector('[data-testid=stage]')); return ['--bg', '--bg-2', '--fg', '--warn', '--domain'].map((k) => k + '=' + s.getPropertyValue(k).trim()).join(' '); });
    await p.screenshot({ path: `${out}/${vp}-${scheme}-predict.png` });
    await p.context().close();
  }
  // 4 early reveal
  p = await start(vp); await commit(p);
  for (const name of ['Slice a corner', 'Next: Flatten', 'Take the top off', 'Next: Shrink', 'Remove an edge']) { await ctl(p, name).click(); await p.waitForTimeout(800); }
  await ctl(p, 'Remove the rest').click(); await p.waitForTimeout(100);
  r.early = { enabledMidPlayback: await p.locator('[data-testid=reveal-button]').isEnabled() };
  await p.locator('[data-testid=reveal-button]').click(); await p.waitForTimeout(300);
  r.early.stageAtReveal = (await fp(p)).text;
  await p.context().close();
}
// 5 light-token check: force light token values onto .single to see the lesson's own drawing in light ink
let p = await start('phone'); await commit(p);
await p.addStyleTag({ content: '.single{--bg:#f6f7fb;--bg-2:#fff;--bg-3:#eceff6;--fg:#141824;--muted:#5d6578;--line:#d9dde8;--good:#09704d;--bad:#b8222a;--warn:#7d5200;color-scheme:light} .single .card-shell{background:#fff}' });
for (const name of ['Slice a corner', 'Next: Flatten', 'Take the top off']) { await ctl(p, name).click(); await p.waitForTimeout(1000); }
await p.screenshot({ path: `${out}/phone-lighttokens-card2.png` });
for (const name of ['Next: Shrink', 'Remove an edge']) { await ctl(p, name).click(); await p.waitForTimeout(1000); }
await p.screenshot({ path: `${out}/phone-lighttokens-card3.png` });
await b.close();
console.log(JSON.stringify(res, null, 1));
