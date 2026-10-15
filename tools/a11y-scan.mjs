#!/usr/bin/env node
// Automated accessibility scan for published lessons (owner: accessibility-reviewer).
//
//   node tools/a11y-scan.mjs                       all published lessons
//   node tools/a11y-scan.mjs add-a-zero other-slug specific lessons
//   options: --base=http://localhost:<your port> (required)  --out=artifacts/a11y/scan.json  --workers=4
//            --shots=<dir>  save phone screenshots (also colour-blind simulations) per lesson
//
// Per lesson (/d/<slug>, 390x844):
//   keyboard   every enabled interactive control is reached by Tab; the whole predict -> explore ->
//              reveal path completes with the keyboard alone; focus is visible; focus is not dropped
//              to <body> when a phase changes; controls without a native role but with a pointer
//              cursor (mouse-only candidates).
//   names      every interactive control has an accessible name; stage <svg> has role=img + label.
//   contrast   WCAG AA (4.5, or 3 for large text) from computed styles, HTML and SVG text, in dark
//              AND light, at predict / explore / reveal. Background is composited from what is
//              actually painted under the text (elementsFromPoint). Gradients/images are "unsure".
//   targets    tap targets >= 44x44 (fix) and >= 24x24 (WCAG 2.5.8 / QA contract floor, fail).
//   motion     with prefers-reduced-motion: reduce, running CSS/Web animations, SMIL, and
//              autonomous DOM changes (JS-driven motion) are listed. Short (<= 500 ms) finite
//              animations are tolerated.
//   colour     semantic colours (good/bad/warn) used with no text, label, or dash pattern nearby
//              are flagged "manual" - the script cannot judge meaning, only absence of a cue.
//
// Severity: fail (locks a learner out or illegible), fix (should change), manual (a human decides).
// Origin: kit (comes from src/kit or src/app, fix once), lesson (the lesson's own stage), app.
// It reads nothing but the running app and meta.json statuses. It edits nothing.

import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || "").split("=").slice(1).join("=") || d;
// No default (W-851): a fixed default port reached whichever builder's server held it. Pass your own.
const BASE = opt("base", process.env.A11Y_BASE_URL);
if (!BASE) {
  console.error("a11y-scan: --base=http://localhost:<your port> is required (or A11Y_BASE_URL); there is no default port (W-851)");
  process.exit(2);
}
const OUT = opt("out", "artifacts/a11y/scan.json");
const WORKERS = Number(opt("workers", "4"));
const SHOTS = opt("shots", "");
const CHROME = process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

function publishedSlugs() {
  const out = [];
  for (const dom of fs.readdirSync(path.join(ROOT, "src/demos"))) {
    const d = path.join(ROOT, "src/demos", dom);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const s of fs.readdirSync(d)) {
      const m = path.join(d, s, "meta.json");
      if (!fs.existsSync(m)) continue;
      try {
        if (JSON.parse(fs.readFileSync(m, "utf8")).status === "published") out.push(s);
      } catch {}
    }
  }
  return out.sort();
}

// ---------------------------------------------------------------------------------------------
// In-page helpers, injected once per page as window.__a11y
// ---------------------------------------------------------------------------------------------
const PAGE_HELPERS = `(() => {
  const INTERACTIVE = 'button, a[href], input, select, textarea, summary, [role=button], [role=slider], [role=switch], [role=checkbox], [role=radio], [role=tab], [role=link], [role=menuitem], [tabindex]';
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  function parse(c) {
    if (!c || c === 'none' || c === 'transparent') return [0, 0, 0, 0];
    let m = c.match(/^rgba?\\(([^)]+)\\)$/);
    if (m) { const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  }
  function over(top, bot) { // composite top (with alpha) over bot
    const a = top[3] + bot[3] * (1 - top[3]);
    if (a === 0) return [0, 0, 0, 0];
    return [0, 1, 2].map((i) => (top[i] * top[3] + bot[i] * bot[3] * (1 - top[3])) / a).concat([a]);
  }
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  function opacityChain(el) { let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity || '1'); return o; }
  function visible(el) {
    const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return false; if (e.getAttribute('aria-hidden') === 'true') return false; }
    return true;
  }
  function sel(el) {
    if (!el || el.nodeType !== 1) return '';
    let s = el.tagName.toLowerCase();
    const tid = el.getAttribute('data-testid'); if (tid) return s + '[data-testid=' + tid + ']';
    const cls = (typeof el.className === 'string' ? el.className : el.className && el.className.baseVal || '').trim().split(/\\s+/).filter(Boolean).slice(0, 2).join('.');
    if (cls) s += '.' + cls;
    const p = el.parentElement; if (p) { const sib = Array.from(p.children).filter((c) => c.tagName === el.tagName); if (sib.length > 1) s += ':nth-of-type(' + (sib.indexOf(el) + 1) + ')'; }
    return s;
  }
  function origin(el) {
    if (!el.closest('[data-testid=lesson]')) return 'app';
    if (el.closest('.panel') || el.matches('.control, .primary, .option, [data-qa=control], [data-testid=predict-option], [data-testid=reveal-button], [data-testid=commit-prediction]') || el.closest('[data-qa=readout], .row, .readout')) return 'kit';
    return 'lesson';
  }
  function nameOf(el) {
    const lb = el.getAttribute('aria-labelledby');
    if (lb) { const t = lb.split(/\\s+/).map((i) => (document.getElementById(i) || {}).textContent || '').join(' ').trim(); if (t) return t; }
    const al = el.getAttribute('aria-label'); if (al && al.trim()) return al.trim();
    if (el.labels && el.labels.length) { const t = Array.from(el.labels).map((l) => l.textContent).join(' ').trim(); if (t) return t; }
    if (el.id) { const l = document.querySelector('label[for="' + el.id + '"]'); if (l && l.textContent.trim()) return l.textContent.trim(); }
    const wrap = el.closest('label'); if (wrap && wrap.textContent.trim()) return wrap.textContent.trim();
    let t = '';
    (function walk(n) {
      for (const c of n.childNodes) {
        if (c.nodeType === 3) t += c.textContent;
        else if (c.nodeType === 1 && c.getAttribute('aria-hidden') !== 'true') {
          if (c.tagName === 'IMG' && c.alt) t += c.alt;
          else if (c.tagName.toLowerCase() === 'title') t += c.textContent;
          else if (c.getAttribute('aria-label')) t += c.getAttribute('aria-label');
          else walk(c);
        }
      }
    })(el);
    t = t.replace(/\\s+/g, ' ').trim(); if (t) return t;
    const ti = el.getAttribute('title'); if (ti && ti.trim()) return ti.trim();
    return '';
  }
  const isDisabled = (el) => el.disabled === true || el.getAttribute('aria-disabled') === 'true' || !!el.closest('fieldset:disabled');
  function interactiveList() {
    const all = new Set(Array.from(document.querySelectorAll(INTERACTIVE)));
    // mouse-only candidates: pointer cursor on something that is not natively interactive
    const mouseOnly = [];
    const scope = document.querySelector('[data-testid=lesson]') || document.body;
    for (const el of scope.querySelectorAll('*')) {
      if (all.has(el)) continue;
      if (el.closest(INTERACTIVE)) continue;
      if (getComputedStyle(el).cursor === 'pointer' && visible(el)) {
        // report the outermost element with pointer cursor
        if (el.parentElement && getComputedStyle(el.parentElement).cursor === 'pointer' && !el.parentElement.closest(INTERACTIVE)) continue;
        mouseOnly.push(el);
      }
    }
    const items = [];
    let n = 0;
    for (const el of all) {
      if (el.tagName === 'INPUT' && el.type === 'hidden') continue;
      if (el.getAttribute('tabindex') === '-1' && !el.matches('button, a, input, select, textarea, [role]')) continue;
      if (!visible(el)) continue;
      el.setAttribute('data-a11y-id', String(n));
      const r = el.getBoundingClientRect();
      items.push({ id: n, sel: sel(el), tag: el.tagName.toLowerCase(), role: el.getAttribute('role') || '', type: el.type || '', origin: origin(el), name: nameOf(el), disabled: isDisabled(el), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, tabindex: el.getAttribute('tabindex'), inLesson: !!el.closest('[data-testid=lesson]') });
      n++;
    }
    return { items, mouseOnly: mouseOnly.map((e) => { const r = e.getBoundingClientRect(); return { sel: sel(e), origin: origin(e), tag: e.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), text: (e.textContent || '').trim().slice(0, 30) }; }) };
  }
  function bgAt(textEl, x, y) {
    const stack = document.elementsFromPoint(x, y);
    let idx = -1;
    for (let i = 0; i < stack.length; i++) if (stack[i] === textEl || textEl.contains(stack[i])) idx = i;
    if (idx === -1) return { obscured: true };
    let acc = [255, 255, 255, 0], unsure = false;
    const start = stack[idx] === textEl && textEl.namespaceURI !== 'http://www.w3.org/2000/svg' ? idx : idx + 1; // an HTML element's own background sits under its own text
    for (let i = stack.length - 1; i >= start; i--) {
      const e = stack[i], s = getComputedStyle(e);
      if (e.namespaceURI === 'http://www.w3.org/2000/svg') {
        if (/^(text|tspan)$/i.test(e.tagName)) continue;
        if (!/^(rect|circle|ellipse|path|polygon|polyline|use)$/i.test(e.tagName)) continue;
        if (s.fill && s.fill.startsWith('url(')) { unsure = true; continue; }
        const f = parse(s.fill); f[3] *= parseFloat(s.fillOpacity || '1') * opacityChain(e);
        // shapes that merely contain the point in their bbox are included by elementsFromPoint only if hit, so fill counts
        if (f[3] > 0) acc = over(f, acc);
      } else {
        const b = parse(s.backgroundColor); b[3] *= opacityChain(e);
        if (s.backgroundImage && s.backgroundImage !== 'none') unsure = true;
        if (b[3] > 0) acc = over(b, acc);
      }
    }
    if (acc[3] < 0.99) acc = over(acc, parse(getComputedStyle(document.documentElement).backgroundColor).map((v, i) => (i === 3 ? 1 : v)));
    return { bg: acc, unsure };
  }
  function contrastScan() {
    const out = [];
    const style = document.createElement('style'); style.textContent = '* { pointer-events: auto !important; }'; document.head.appendChild(style);
    const seen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const txt = node.textContent.replace(/\\s+/g, ' ').trim(); if (!txt) continue;
      let el = node.parentElement; if (!el || /^(script|style|noscript|title)$/i.test(el.tagName)) continue;
      const isSvg = el.namespaceURI === 'http://www.w3.org/2000/svg';
      const owner = isSvg ? (el.closest('text') || el) : el;
      if (!visible(owner)) continue;
      if (owner.closest('button:disabled, input:disabled, [aria-disabled=true] button')) continue; // inactive components are exempt (WCAG 1.4.3)
      const range = document.createRange(); range.selectNodeContents(node); const rr = range.getBoundingClientRect();
      if (rr.width === 0 || rr.height === 0) continue;
      const cs = getComputedStyle(owner);
      let fg;
      if (isSvg) { fg = parse(cs.fill); fg[3] *= parseFloat(cs.fillOpacity || '1'); }
      else fg = parse(cs.color);
      fg[3] *= opacityChain(owner);
      let size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10) || 400, scale = 1;
      if (isSvg) { const svg = owner.ownerSVGElement; const m = svg && svg.getScreenCTM(); scale = m ? Math.hypot(m.a, m.b) : 1; size *= scale; }
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const px = Math.min(Math.max(rr.left + rr.width / 2, 1), innerWidth - 1), py = Math.min(Math.max(rr.top + rr.height / 2, 1), innerHeight - 1);
      // text scrolled off-screen: scroll into view first so elementsFromPoint is valid
      let r2 = rr;
      if (rr.bottom < 0 || rr.top > innerHeight) { (owner.scrollIntoView && owner.scrollIntoView({ block: 'center' })); const r3 = range.getBoundingClientRect(); r2 = r3; }
      const cx2 = Math.min(Math.max(r2.left + r2.width / 2, 1), innerWidth - 1), cy2 = Math.min(Math.max(r2.top + r2.height / 2, 1), innerHeight - 1);
      const b = bgAt(owner, cx2, cy2);
      if (b.obscured) continue;
      const bg = b.bg; const comp = over(fg, bg.map((v, i) => (i === 3 ? 1 : v)));
      const cr = ratio(comp, bg);
      const need = large ? 3 : 4.5;
      const key = sel(owner) + '|' + txt.slice(0, 20);
      if (seen.has(key)) continue; seen.add(key);
      if (b.unsure && cr < 1.2) continue; // gradient-clipped text (brand mark): cannot be computed, skip
      out.push({ locked: !!owner.closest('[data-testid=stage][aria-disabled=true]'), text: txt.slice(0, 40), sel: sel(owner), origin: origin(owner), ratio: Math.round(cr * 100) / 100, need, large, fg: hex(comp), bg: hex(bg), unsure: !!b.unsure, size: Math.round(size * 10) / 10, svg: isSvg });
    }
    style.remove();
    window.scrollTo(0, 0);
    return out;
  }
  function stageInfo() {
    const lesson = document.querySelector('[data-testid=lesson]');
    const stage = document.querySelector('[data-testid=stage]');
    const svgs = stage ? Array.from(stage.querySelectorAll('svg')).filter(visible) : [];
    const svgInfo = svgs.map((s) => ({ sel: sel(s), role: s.getAttribute('role') || '', label: s.getAttribute('aria-label') || (s.querySelector('title') || {}).textContent || '', hidden: s.getAttribute('aria-hidden') === 'true', w: Math.round(s.getBoundingClientRect().width), h: Math.round(s.getBoundingClientRect().height) }));
    return { phase: lesson && lesson.getAttribute('data-phase'), svgInfo, liveRegions: document.querySelectorAll('[aria-live], [role=status], [role=alert]').length };
  }
  function colourCues() {
    const stage = document.querySelector('[data-testid=stage]'); if (!stage) return { used: [], lacking: 0, examples: [] };
    const rs = getComputedStyle(document.documentElement);
    const tokens = {}; for (const t of ['good', 'bad', 'warn']) { const probe = document.createElement('span'); probe.style.color = 'var(--' + t + ')'; document.body.appendChild(probe); tokens[t] = hex(parse(getComputedStyle(probe).color)); probe.remove(); }
    const used = new Set(); let lacking = 0; const examples = [];
    for (const el of stage.querySelectorAll('*')) {
      if (!visible(el)) continue;
      const s = getComputedStyle(el);
      const isSvg = el.namespaceURI === 'http://www.w3.org/2000/svg';
      const cands = isSvg ? [s.fill, s.stroke] : [s.backgroundColor, s.borderTopColor, s.color];
      let hit = null;
      for (const c of cands) { if (!c || c === 'none') continue; const p = parse(c); if (p[3] < 0.5) continue; const h = hex(p); for (const t in tokens) if (tokens[t] === h) hit = t; }
      if (!hit) continue;
      if (isSvg && /^(text|tspan)$/i.test(el.tagName)) continue; // text carries its own meaning
      if (!isSvg && !Array.from(el.childNodes).every((n) => n.nodeType !== 3 || !n.textContent.trim()) ) { used.add(hit); continue; } // has own text -> cue exists
      used.add(hit);
      const group = el.closest('g') || el.parentElement;
      const hasText = (group && group.querySelector('text, tspan')) || el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || (isSvg && s.strokeDasharray && s.strokeDasharray !== 'none') || el.closest('[aria-label]:not(svg):not([data-testid=demo-card])');
      if (!hasText) { lacking++; if (examples.length < 3) examples.push(sel(el) + ' (' + hit + ')'); }
    }
    return { used: Array.from(used), lacking, examples };
  }
  function focusRing(el) {
    const s = getComputedStyle(el);
    const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
    const shadow = s.boxShadow && s.boxShadow !== 'none';
    return outline || shadow;
  }
  window.__a11y = { interactiveList, contrastScan, stageInfo, colourCues, focusRing, sel };
})()`;

// ---------------------------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PHONE = { width: 390, height: 844 };

async function open(browser, slug, { colorScheme, reducedMotion }) {
  const ctx = await browser.newContext({ viewport: PHONE, colorScheme, reducedMotion, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto(`${BASE}/d/${slug}`, { waitUntil: "load" });
  await page.waitForSelector('[data-testid="lesson"]', { timeout: 15000 });
  await page.evaluate(PAGE_HELPERS);
  await sleep(300);
  return { ctx, page, errors };
}

async function focusDesc(page) {
  return page.evaluate(() => {
    const e = document.activeElement;
    if (!e || e === document.body) return { body: true };
    return { id: e.getAttribute("data-a11y-id"), sel: window.__a11y.sel(e), ring: window.__a11y.focusRing(e), testid: e.getAttribute("data-testid") || "", tag: e.tagName.toLowerCase(), type: e.type || "" };
  });
}

// Tab until predicate(focus) is true; return {found, seen: Set of ids, ringless: [...]}.
async function tabUntil(page, pred, max, seen, ringless) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    const f = await focusDesc(page);
    if (f.id != null) {
      seen.add(f.id);
      if (!f.ring && !ringless.has(f.sel)) ringless.add(f.sel);
    }
    if (pred(f)) return { found: true, f };
  }
  return { found: false };
}


// QA-style pressing: DOM order, once each, only when enabled at press time; the list is re-read each
// time because stages re-render; later passes pick up controls that were disabled or did not exist.
async function pressAll(page, waitMs = 250, afterEach, keyboard = false) {
  const sel = '[data-testid="stage"] [data-qa="control"], [data-testid="stage"] input[type=range]';
  const done = new Set();
  let pressedCount = 0;
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < Math.min(await page.locator(sel).count(), 16); i++) {
      const el = page.locator(sel).nth(i);
      const key = "i" + i;
      if (done.has(key)) continue;
      if (!(await el.isEnabled().catch(() => false)) || !(await el.isVisible().catch(() => false))) continue;
      done.add(key);
      pressedCount++;
      try {
        if ((await el.getAttribute("type")) === "range") {
          await el.focus();
          const k = await el.evaluate((e) => (e.value === e.max ? "ArrowLeft" : "ArrowRight"));
          await page.keyboard.press(k); await page.keyboard.press(k);
        } else if (keyboard) { await el.focus(); await page.keyboard.press("Enter"); }
        else await el.click({ timeout: 1500 });
      } catch {}
      await sleep(waitMs);
      if (afterEach) await afterEach(i);
    }
  }
  return pressedCount;
}

async function keyboardRun(page, findings, add) {
  const listing = async () => page.evaluate(() => window.__a11y.interactiveList());
  let l0 = await listing();
  const seen = new Set();
  const ringless = new Set();
  const info = { phases: {} };

  // Reading order: where does the question sit relative to the stage in the DOM?
  info.order = await page.evaluate(() => {
    const st = document.querySelector('[data-testid=stage]'), pn = document.querySelector('.panel');
    if (!st || !pn) return null;
    return st.compareDocumentPosition(pn) & Node.DOCUMENT_POSITION_FOLLOWING ? "stage-before-question" : "question-before-stage";
  });

  // PREDICT: choose an option with the keyboard, commit with the keyboard.
  await page.evaluate(() => (document.activeElement && document.activeElement.blur && document.activeElement.blur()));
  await page.mouse.move(0, 0);
  let r = await tabUntil(page, (f) => f.testid === "predict-option", 40, seen, ringless);
  if (!r.found) { add("fail", "kit", "keyboard", "Could not reach a prediction option with Tab."); return info; }
  await page.keyboard.press("Space");
  await sleep(100);
  r = await tabUntil(page, (f) => f.testid === "commit-prediction", 12, seen, ringless);
  if (!r.found) { add("fail", "kit", "keyboard", "Could not reach 'Lock it in' with Tab after choosing an option."); return info; }
  await page.keyboard.press("Enter");
  await sleep(500);
  const afterCommit = await focusDesc(page);
  info.focusAfterCommit = afterCommit.body ? "body" : afterCommit.sel;

  // EXPLORE: list controls now (they are enabled), Tab through everything.
  const l1 = await listing();
  info.controls = l1.items.length;
  const enabled = l1.items.filter((i) => !i.disabled && i.inLesson);
  // restart tabbing from the top of the document
  await page.evaluate(() => { if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); window.scrollTo(0, 0); });
  await page.evaluate(() => { const a = document.createElement("a"); a.id = "__a11y_start"; a.tabIndex = -1; document.body.prepend(a); a.focus(); a.remove(); });
  const seenExplore = new Set();
  let trap = false, lastSel = "", same = 0;
  for (let i = 0; i < Math.max(30, l1.items.length * 2 + 6); i++) {
    await page.keyboard.press("Tab");
    const f = await focusDesc(page);
    if (f.body) { if (i > 3) break; continue; }
    if (f.id != null) { seenExplore.add(f.id); if (!f.ring) ringless.add(f.sel); }
    const ident = f.id != null ? "id" + f.id : f.sel; // identity, not selector: sibling chips can share a selector
    if (ident === lastSel) { same++; if (same > 3) { trap = true; break; } } else same = 0;
    lastSel = ident;
  }
  const unreachable = enabled.filter((i) => !seenExplore.has(String(i.id)) && i.tabindex !== "-1");
  for (const u of unreachable) add("fail", u.origin, "keyboard", `Enabled control not reached by Tab: ${u.sel} "${u.name}"`);
  if (trap) add("fail", "kit", "keyboard", "Keyboard trap: focus stopped moving during Tab.");
  for (const s of ringless) add("fix", /control|primary|option/.test(s) ? "kit" : "lesson", "focus-visible", `No visible focus indicator on ${s}.`);

  const ids = [];
  const nPressed = await pressAll(page, 300, null, true);
  info.pressed = nPressed;
  for (let w = 0; w < 16; w++) { if (await page.evaluate(() => { const b = document.querySelector('[data-testid=reveal-button]'); return !b || !b.disabled; })) break; await sleep(250); }

  // REVEAL via keyboard
  const rv = await page.evaluate(() => { const b = document.querySelector('[data-testid=reveal-button]'); return b ? { disabled: b.disabled, text: b.textContent } : null; });
  info.revealButton = rv;
  if (!rv) {
    add("fail", "lesson", "keyboard", "No reveal button after the keyboard walk-through.");
  } else if (rv.disabled) {
    add("fail", "lesson", "keyboard", `Reveal stays locked ("${rv.text}") after activating ${nPressed} controls with the keyboard (Enter / ArrowRight). A keyboard-only learner may be locked out; check whether the gesture needs a pointer.`);
  } else {
    await page.evaluate(() => document.querySelector('[data-testid=reveal-button]').focus());
    await page.keyboard.press("Enter");
    await sleep(600);
    const shown = await page.evaluate(() => !!document.querySelector('[data-testid=reveal]'));
    if (!shown) add("fail", "kit", "keyboard", "Reveal did not appear after pressing Enter on 'Show me why'.");
    const afterReveal = await focusDesc(page);
    info.focusAfterReveal = afterReveal.body ? "body" : afterReveal.sel;
    info.revealReached = shown;
  }
  return info;
}

async function scanLesson(browser, slug) {
  const result = { slug, findings: [], meta: {} };
  const seenF = new Set();
  const add = (severity, origin, check, message, extra) => {
    const k = severity + origin + check + message;
    if (seenF.has(k)) return;
    seenF.add(k);
    result.findings.push({ severity, origin, check, message, ...(extra || {}) });
  };

  // ---- Context A: dark, normal motion. Keyboard run, names, targets, contrast (3 phases), colour.
  const A = await open(browser, slug, { colorScheme: "dark", reducedMotion: "no-preference" });
  try {
    const pg = A.page;
    result.meta.url = `${BASE}/d/${slug}`;
    const l0 = await pg.evaluate(() => window.__a11y.interactiveList());
    result.meta.interactive_predict = l0.items.length;
    const contrast = { dark: {}, light: {} };
    contrast.dark.predict = await pg.evaluate(() => window.__a11y.contrastScan());
    if (SHOTS) { fs.mkdirSync(path.join(SHOTS, slug), { recursive: true }); await pg.screenshot({ path: path.join(SHOTS, slug, "1-predict.png") }); }
    const stagePredict = await pg.evaluate(() => window.__a11y.stageInfo());

    const kb = await keyboardRun(pg, result.findings.length, add);
    result.meta.keyboard = kb;
    const stageAfter = await pg.evaluate(() => window.__a11y.stageInfo());

    // After keyboard run we are in explore (or reveal). Targets + names measured with everything enabled.
    // Go back to explore for measurement if needed: re-open a fresh page and click through quickly.
    const B0 = await open(browser, slug, { colorScheme: "dark", reducedMotion: "no-preference" });
    try {
      const p = B0.page;
      await p.locator('[data-testid="predict-option"]').first().click();
      await p.locator('[data-testid="commit-prediction"]').click();
      await sleep(500);
      const lx = await p.evaluate(() => window.__a11y.interactiveList());
      result.meta.interactive = lx.items.length;
      for (const it of lx.items) {
        if (!it.name) add("fail", it.origin, "name", `Interactive ${it.tag}${it.role ? "[role=" + it.role + "]" : ""} has no accessible name: ${it.sel}`);
        if (it.disabled) continue;
        const min = Math.min(it.w, it.h);
        if (min < 24) add("fail", it.origin, "target-size", `Tap target ${it.w}x${it.h}px (< 24px floor): ${it.sel} "${it.name.slice(0, 20)}"`);
        else if (min < 44) add("fix", it.origin, "target-size", `Tap target ${it.w}x${it.h}px (< 44px): ${it.sel} "${it.name.slice(0, 20)}"`);
      }
      for (const m of lx.mouseOnly) add("fail", m.origin, "keyboard", `Pointer-only element (cursor:pointer, no button/tabindex/role): ${m.sel} ${m.w}x${m.h} "${m.text}"`);
      contrast.dark.explore = await p.evaluate(() => window.__a11y.contrastScan());
      const cc = await p.evaluate(() => window.__a11y.colourCues());
      // exercise controls by mouse to move the stage, then re-measure colours
      await pressAll(p, 250);
      const cc2 = await p.evaluate(() => window.__a11y.colourCues());
      const used = Array.from(new Set([...cc.used, ...cc2.used]));
      const lacking = Math.max(cc.lacking, cc2.lacking);
      result.meta.colour = { used, lacking, examples: cc2.examples.length ? cc2.examples : cc.examples };
      if (lacking > 0 && used.length >= 1) {
        add("manual", "lesson", "colour-alone", `Stage uses semantic colour (${used.join("/")}) on ${lacking} element(s) with no text, label, or dash pattern in their group: ${result.meta.colour.examples.join(", ")}. Check a non-colour cue exists.`);
      }
      if (SHOTS) {
        await p.screenshot({ path: path.join(SHOTS, slug, "2-explore.png") });
        // colour-blind simulations (deuteranopia, protanopia) applied as an SVG filter
        for (const [name, m] of Object.entries({
          deuteranopia: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",
          protanopia: "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0",
        })) {
          await p.evaluate(([n, mx]) => { document.getElementById("__cb")?.remove(); const d = document.createElement("div"); d.id = "__cb"; d.innerHTML = `<svg width="0" height="0" style="position:absolute"><filter id="cbf_${n}"><feColorMatrix type="matrix" values="${mx}"/></filter></svg>`; document.body.appendChild(d); document.documentElement.style.filter = `url(#cbf_${n})`; }, [name, m]);
          await p.screenshot({ path: path.join(SHOTS, slug, `3-explore-${name}.png`) });
        }
        await p.evaluate(() => { document.documentElement.style.filter = ""; });
      }
      // reveal
      const rb = p.locator('[data-testid="reveal-button"]');
      await rb.waitFor({ state: "visible", timeout: 2000 }).catch(() => {});
      for (let w = 0; w < 16 && !(await rb.isEnabled().catch(() => false)); w++) await sleep(250);
      if (await rb.isEnabled().catch(() => false)) {
        await rb.click(); await sleep(500);
        contrast.dark.reveal = await p.evaluate(() => window.__a11y.contrastScan());
        if (SHOTS) await p.screenshot({ path: path.join(SHOTS, slug, "4-reveal.png"), fullPage: false });
        const sr = await p.evaluate(() => window.__a11y.stageInfo());
        result.meta.stageReveal = sr;
      }
      result.meta.svg = (await p.evaluate(() => window.__a11y.stageInfo()));
      result.meta.liveRegions = result.meta.svg.liveRegions;
    } finally { await B0.ctx.close(); }

    // SVG naming (use predict-phase info; svgs present from the start)
    for (const s of stagePredict.svgInfo) {
      if (s.hidden) continue;
      if (s.w < 30 && s.h < 30) continue; // icon-sized, decorative
      if (s.role !== "img" || !s.label.trim()) add("fix", "lesson", "svg-label", `Stage <svg> without role="img" and an aria-label: ${s.sel} (${s.w}x${s.h})`);
    }
    const labelsAfter = new Set((result.meta.svg?.svgInfo || []).map((s) => s.label));
    const labelsBefore = new Set(stagePredict.svgInfo.map((s) => s.label));
    if (stagePredict.svgInfo.length && [...labelsAfter].every((l) => labelsBefore.has(l)) && labelsAfter.size === labelsBefore.size) {
      add("manual", "lesson", "svg-label", `SVG aria-label did not change between predict and reveal ("${[...labelsAfter][0]?.slice(0, 50)}"). The QA standard asks for a label describing what it shows now; check the live caption/readout covers it.`);
    }
    if (kb.focusAfterCommit === "body") add("fix", "kit", "focus-management", "Keyboard focus falls to <body> when 'Lock it in' removes the predict panel; keyboard and screen-reader users lose their place.");
    if (kb.focusAfterReveal === "body") add("fix", "kit", "focus-management", "Keyboard focus falls to <body> when the reveal replaces 'Show me why'; the reveal is not announced or focused.");
    if (kb.order === "stage-before-question") add("fix", "kit", "reading-order", "DOM order puts the stage before the prediction question and options; a screen-reader user meets disabled controls before the question they depend on.");
    if (!result.meta.liveRegions) add("fix", "kit", "live-region", "No aria-live/role=status region anywhere on the page: phase changes and the reveal verdict are silent to screen readers.");
    A.errors.forEach((e) => add("manual", "lesson", "console", e));

    // ---- Context B: light theme contrast (same three phases)
    const Bc = await open(browser, slug, { colorScheme: "light", reducedMotion: "no-preference" });
    try {
      const p = Bc.page;
      contrast.light.predict = await p.evaluate(() => window.__a11y.contrastScan());
      await p.locator('[data-testid="predict-option"]').first().click();
      await p.locator('[data-testid="commit-prediction"]').click();
      await sleep(500);
      contrast.light.explore = await p.evaluate(() => window.__a11y.contrastScan());
      await pressAll(p, 250);
      const rb = p.locator('[data-testid="reveal-button"]');
      for (let w = 0; w < 16 && !(await rb.isEnabled().catch(() => false)); w++) await sleep(250);
      if (await rb.isEnabled().catch(() => false)) { await rb.click(); await sleep(500); contrast.light.reveal = await p.evaluate(() => window.__a11y.contrastScan()); }
      if (SHOTS) await p.screenshot({ path: path.join(SHOTS, slug, "5-reveal-light.png") });
    } finally { await Bc.ctx.close(); }

    // Contrast findings
    const sum = { dark: 0, light: 0, min: 99 };
    for (const theme of ["dark", "light"]) {
      for (const [phase, list] of Object.entries(contrast[theme])) {
        for (const c of list) {
          if (c.size < 9 && c.text.length > 1) add("fix", c.origin, "text-size", `Text rendered at ${c.size}px (< 9px) in ${theme}/${phase}: "${c.text}" ${c.sel}`);
          sum.min = Math.min(sum.min, c.ratio);
          if (c.ratio >= c.need) continue;
          if (c.locked) { sum.locked = (sum.locked || 0) + 1; continue; } // dimmed on purpose while the stage is locked (one aggregate finding below)
          sum[theme]++;
          const sev = c.unsure ? "manual" : c.ratio < 3 && !c.large ? "fail" : "fix";
          add(sev, c.origin, "contrast", `${c.ratio}:1 (needs ${c.need}) ${theme}/${phase}: "${c.text}" ${c.fg} on ${c.bg} ${c.sel}${c.svg ? " [svg]" : ""}${c.unsure ? " [background is image/gradient, unsure]" : ""}`);
        }
      }
    }
    result.meta.contrast = sum;
    if (sum.locked) add("fix", "kit", "contrast-locked-stage", `While the stage is locked (predict phase) its text is dimmed below AA (${sum.locked} text items in dark+light). Learners must read the stage to predict; WCAG exempts inactive controls but not the figure's text.`);
  } finally { await A.ctx.close(); }

  // ---- Context C: reduced motion.
  const C = await open(browser, slug, { colorScheme: "dark", reducedMotion: "reduce" });
  try {
    const p = C.page;
    await p.evaluate(() => {
      window.__mut = 0;
      new MutationObserver((m) => { window.__mut += m.length; }).observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
    });
    const matches = await p.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
    const probe = async (label) => p.evaluate((label) => {
      const anims = document.getAnimations().map((a) => {
        const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
        return { name: a.animationName || a.transitionProperty || "web-animation", kind: a.constructor.name, state: a.playState, dur: t.duration, iter: t.iterations, delay: t.delay, target: a.effect && a.effect.target ? window.__a11y.sel(a.effect.target) : "" };
      }).filter((a) => a.state === "running");
      const smil = Array.from(document.querySelectorAll("animate, animateTransform, animateMotion, set")).filter((e) => e.getAttribute("dur") && e.getAttribute("dur") !== "0s").map((e) => ({ tag: e.tagName, dur: e.getAttribute("dur"), repeat: e.getAttribute("repeatCount") || "" }));
      return { label, anims, smil };
    }, label);
    const probes = [await probe("predict")];
    await p.locator('[data-testid="predict-option"]').first().click();
    await p.locator('[data-testid="commit-prediction"]').click();
    await sleep(400);
    await pressAll(p, 150, async (i) => { probes.push(await probe("explore-" + i)); });
    // idle: does the stage keep changing by itself?
    await sleep(800);
    await p.evaluate(() => { window.__mut = 0; });
    await sleep(2000);
    const idleMut = await p.evaluate(() => window.__mut);
    probes.push(await probe("idle"));
    const bad = new Map();
    for (const pr of probes) {
      for (const a of pr.anims) {
        const total = (a.dur === "auto" ? 0 : Number(a.dur) || 0) * (a.iter === Infinity ? Infinity : a.iter || 1);
        if (total <= 500 && a.iter !== Infinity) continue;
        bad.set(`${a.kind}:${a.name}:${a.target}`, `${a.kind} ${a.name} on ${a.target} (${a.iter === Infinity ? "infinite" : total + "ms"}) at ${pr.label}`);
      }
      for (const s of pr.smil) bad.set(`smil:${s.tag}:${s.dur}`, `SMIL <${s.tag} dur=${s.dur} ${s.repeat}> at ${pr.label}`);
    }
    result.meta.motion = { reducedMotionApplied: matches, idleMutationsIn2s: idleMut, running: Array.from(bad.values()) };
    for (const b of bad.values()) add("fail", "lesson", "reduced-motion", `Animation still running under prefers-reduced-motion: ${b}`);
    if (idleMut > 8) add("manual", "lesson", "reduced-motion", `Stage changed ${idleMut} times in 2 s with no input under prefers-reduced-motion (JS-driven animation or timer?). Check it stops, or is user-paced.`);
    if (!matches) add("manual", "kit", "reduced-motion", "Chromium did not report prefers-reduced-motion; motion check is unreliable.");
    // Tell apart: does the same lesson animate WITHOUT the preference? (informational)
    C.errors.forEach((e) => add("manual", "lesson", "console", e));
  } finally { await C.ctx.close(); }

  const sev = { fail: 0, fix: 0, manual: 0 };
  for (const f of result.findings) sev[f.severity]++;
  const lessonOnly = (s) => result.findings.filter((f) => f.severity === s && f.origin !== "kit" && f.origin !== "app").length;
  result.counts = { ...sev, lessonFail: lessonOnly("fail"), lessonFix: lessonOnly("fix") };
  const lf = result.findings.filter((f) => f.origin === "lesson");
  // Verdict is about the lesson's own stage. Kit/app findings are reported once, in the summary, and apply to every lesson.
  result.verdictAuto = lf.some((f) => f.severity === "fail") ? "fail" : lf.some((f) => f.severity === "fix") ? "pass with fixes" : "pass";
  result.verdictWithKit = sev.fail ? "fail" : sev.fix ? "pass with fixes" : "pass";
  return result;
}

async function main() {
  const named = args.filter((a) => !a.startsWith("--"));
  const slugs = named.length ? named : publishedSlugs();
  const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
  const results = [];
  let next = 0;
  async function worker() {
    while (next < slugs.length) {
      const slug = slugs[next++];
      let r;
      try { r = await scanLesson(browser, slug); }
      catch (e) { r = { slug, error: String(e && e.message || e), findings: [{ severity: "fail", origin: "lesson", check: "scan", message: "Scan crashed: " + String(e && e.message || e).split("\n")[0] }], counts: { fail: 1, fix: 0, manual: 0 }, verdictAuto: "fail", meta: {} }; }
      results.push(r);
      const c = r.counts;
      console.log(`${slug.padEnd(40)} ${r.verdictAuto.padEnd(16)} fail=${c.fail} fix=${c.fix} manual=${c.manual}  (lesson-only fail=${c.lessonFail ?? "-"} fix=${c.lessonFix ?? "-"})`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(WORKERS, slugs.length) }, worker));
  await browser.close();
  results.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ date: new Date().toISOString(), base: BASE, viewport: PHONE, count: results.length, results }, null, 2));
  const tally = results.reduce((t, r) => ((t[r.verdictAuto] = (t[r.verdictAuto] || 0) + 1), t), {});
  console.log(`\n${results.length} lessons: ${JSON.stringify(tally)} -> ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
