// QA R4 pass for left-or-right (qa-tester, independent of the builder's c1-check.mjs).
// BASE=http://localhost:3817 OUT=artifacts/explore/lor node artifacts/explore/lor/r4.mjs
import { createRequire } from "module";
import fs from "fs";
import path from "path";
const require = createRequire(path.resolve("node_modules") + "/");
const pw = require("@playwright/test");
const K = await import(path.resolve("src/kit/knots/index.mjs"));

const BASE = process.env.BASE || "http://localhost:3817";
const OUT = process.env.OUT || "artifacts/explore/lor";
fs.mkdirSync(OUT, { recursive: true });
const res = { at: new Date().toISOString(), base: BASE, runs: [], failures: [] };
let tag = "";
const ok = (c, m) => {
  console.log((c ? "ok   " : "FAIL ") + tag + " " + m);
  if (!c) res.failures.push(tag + " " + m);
  return c;
};

// ---- ground-truth drawings (same construction as the lesson) ----
const DRAW = {};
for (const id of ["3_1", "4_1"]) {
  const pd = K.knot(id).pd;
  const L = K.layout(pd);
  const f = K.draw(pd, { layout: L, gap: 0.5 });
  const b = K.draw(K.mirror(pd), { layout: L, gap: 0.5 });
  const strip = (D) => ({ crossings: D.crossings.map((c) => ({ i: c.i, x: c.x, y: c.y, sign: c.sign })), edges: D.edges.map((e) => ({ from: e.from, to: e.to, d: e.d })) });
  DRAW[id] = { front: strip(f), back: strip(b) };
}

const browser = await pw.chromium.launch();
const btn = (page, name) => page.locator(`[data-testid=stage] button[data-qa=control]`, { hasText: name });

async function open({ w, h, scheme, reduce = false }) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, colorScheme: scheme, reducedMotion: reduce ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.addInitScript(() => {
    // Whole-session recorder: the readout must never be blank once it exists.
    window.__blank = 0;
    window.__frames = 0;
    const tick = () => {
      const rd = document.querySelector("[data-testid=stage] [role=status]");
      if (rd) {
        window.__frames++;
        const t = rd.textContent.trim();
        if (!/^Sum\s*[+−0]/.test(t)) window.__blank++;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await page.goto(`${BASE}/d/left-or-right`, { waitUntil: "networkidle" });
  return { ctx, page, errors };
}
async function predict(page, colour) {
  if (colour) await page.addStyleTag({ content: `[data-face=front] path{stroke:rgb(255,0,0)!important}[data-face=back] path{stroke:rgb(0,0,255)!important}` });
  await page.getByTestId("predict-option").nth(1).click();
  await page.getByTestId("commit-prediction").click();
  await page.waitForTimeout(300);
}

async function paint(page) {
  const box = await page.locator("[data-testid=marks]").boundingBox();
  const png = await page.screenshot({ clip: { x: box.x - 4, y: box.y - 4, width: box.width + 8, height: box.height + 8 } });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let red = 0, blue = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 180 && d[i + 1] < 90 && d[i + 2] < 90) red++;
      if (d[i + 2] > 180 && d[i] < 90 && d[i + 1] < 90) blue++;
    }
    return { red, blue };
  }, png.toString("base64"));
}

// Screen positions (px, via getBoundingClientRect, which composes every CSS transform) of probes that
// this script injects into the face on show: each crossing centre and the last two control points
// of both edges that arrive there.
async function screenGeometry(page, chip, face) {
  return page.evaluate(
    ({ D, face }) => {
      const svg = document.querySelector(`[data-face=${face}]`);
      const base = face === "back" ? svg.querySelector("g") : svg;
      const ns = "http://www.w3.org/2000/svg";
      const add = (x, y) => {
        const c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        c.setAttribute("r", 0.05);
        base.appendChild(c);
        return c;
      };
      const mid = (c) => {
        const b = c.getBoundingClientRect();
        return [b.left + b.width / 2, b.top + b.height / 2];
      };
      const nums = (d) => (d.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
      const made = [];
      const out = D.crossings.map((cr) => {
        const C = add(cr.x, cr.y);
        made.push(C);
        const inc = D.edges
          .filter((e) => e.to === cr.i)
          .map((e) => {
            const n = nums(e.d);
            const a = add(n[4], n[5]), b = add(n[6], n[7]);
            made.push(a, b);
            return { p2: mid(a), p3: mid(b) };
          });
        return { i: cr.i, c: mid(C), inc };
      });
      made.forEach((m) => m.remove());
      const mk = document.querySelector("[data-testid=marks]").getBoundingClientRect();
      const badges = [...document.querySelectorAll("[data-testid=marks] g")].map((g) => {
        const c = g.querySelector("circle").getBoundingClientRect();
        return { c: [c.left + c.width / 2, c.top + c.height / 2], t: g.querySelector("text").textContent };
      });
      return { out, mk: { left: mk.left, top: mk.top, width: mk.width, height: mk.height }, badges };
    },
    { D: DRAW[chip][face], face },
  );
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
// Screen-space sign of crossing: cross of (under direction, over direction), y down.
function screenSigns(g) {
  return g.out.map((c) => {
    const inc = [...c.inc].sort((a, b) => dist(a.p3, c.c) - dist(b.p3, c.c));
    const [o, u] = inc;
    const dv = (e) => [e.p3[0] - e.p2[0], e.p3[1] - e.p2[1]];
    const ov = dv(o), uv = dv(u);
    return Math.sign(uv[0] * ov[1] - uv[1] * ov[0]);
  });
}

const EXPECT_SUM = { "3_1": { front: -3, turned: -3, mirrored: 3, mirroredTurned: 3 }, "4_1": { front: 0, turned: 0, mirrored: 0, mirroredTurned: 0 } };
const STATE_REFL = { front: false, turned: true, mirrored: true, mirroredTurned: false };
const STATE_FACE = { front: "front", turned: "back", mirrored: "front", mirroredTurned: "back" };

async function restPass({ w, h, scheme }) {
  const { ctx, page, errors } = await open({ w, h, scheme });
  await predict(page, true);
  const rows = [];
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    // The 4 rest states, each reached by real presses; then a second lap in the other order.
    const laps = [
      [["front", null], ["turned", "Turn over"], ["mirroredTurned", "Mirror"], ["mirrored", "Turn over"], ["front", "Mirror"]],
      [["mirrored", "Mirror"], ["mirroredTurned", "Turn over"], ["turned", "Mirror"], ["front", "Turn over"]],
    ];
    let k = null; // calibration of screen sign -> kit sign, from the first front state
    let frontX = null;
    for (const lap of laps) {
      for (const [state, press] of lap) {
        if (press) {
          await btn(page, press).click();
          await page.waitForTimeout(750);
        }
        const p = await paint(page);
        const wantFace = STATE_FACE[state];
        const shows = wantFace === "front" ? p.red > 50 && p.blue === 0 : p.blue > 50 && p.red === 0;
        const g = await screenGeometry(page, chip, wantFace);
        const W = g.mk.width;
        const ss = screenSigns(g);
        if (k === null) {
          const ks = ss.map((s, i) => s * DRAW[chip].front.crossings[i].sign);
          k = ks.every((x) => x === ks[0]) ? ks[0] : NaN;
          frontX = g.out.map((c) => c.c[0] - g.mk.left);
        }
        const kitSigns = ss.map((s) => s * k);
        const badgeSigns = g.badges.map((b) => (b.t === "+" ? 1 : -1));
        const readout = await page.locator("[data-testid=stage] [role=status]").textContent();
        const sumShown = Number(readout.match(/Sum\s*([+−]?\d+)/)[1].replace("−", "-"));
        const sumBadges = badgeSigns.reduce((a, b) => a + b, 0);
        const xs = g.out.map((c) => c.c[0] - g.mk.left);
        const xWant = frontX.map((fx) => (STATE_REFL[state] ? W - fx : fx));
        const xOk = xs.every((x, i) => Math.abs(x - xWant[i]) < 1.5);
        const offCentre = frontX.some((fx) => Math.abs(fx - W / 2) > 0.2 * W);
        // badge sits on a ring ~13 view-box units (px/ (W/116)) from its own crossing
        const unit = W / 116;
        const ringOk = g.badges.every((b, i) => Math.abs(dist(b.c, g.out[i].c) / unit - 13) < 0.7);
        const hidden = await page.evaluate(() => getComputedStyle(document.querySelector("[data-testid=marks]")).opacity);
        const row = { chip, state, press, paint: p, k, screenSigns: ss, kitSigns, badgeSigns, readout: readout.trim(), sumShown, xs: xs.map((x) => +x.toFixed(1)), xWant: xWant.map((x) => +x.toFixed(1)), W: +W.toFixed(1), marksOpacity: hidden };
        rows.push(row);
        ok(shows, `${chip} ${state}: only ${wantFace} face paints (red ${p.red} blue ${p.blue})`);
        ok(xOk && offCentre, `${chip} ${state}: crossings' screen x ${row.xs.join("/")} = ${STATE_REFL[state] ? "width - front x" : "front x"} (${row.xWant.join("/")}) off-centre=${offCentre}`);
        ok(Number.isFinite(k), `${chip} ${state}: one sign convention constant k=${k}`);
        ok(JSON.stringify(badgeSigns) === JSON.stringify(kitSigns), `${chip} ${state}: badge signs ${badgeSigns.join(",")} = signs read from the drawn crossings ${kitSigns.join(",")}`);
        ok(sumShown === sumBadges && sumShown === EXPECT_SUM[chip][state], `${chip} ${state}: readout '${readout.trim()}' = badge sum ${sumBadges} = expected ${EXPECT_SUM[chip][state]}`);
        ok(ringOk, `${chip} ${state}: each badge ~13 units from its own drawn crossing`);
        ok(hidden === "1", `${chip} ${state}: marks visible at rest`);
        if (state === "turned" && chip === "3_1") await page.screenshot({ path: path.join(OUT, `${tag.replace(/\W+/g, "_")}-3_1-turned.png`) });
      }
    }
  }
  const blank = await page.evaluate(() => ({ blank: window.__blank, frames: window.__frames }));
  ok(blank.blank === 0 && blank.frames > 100, `rest pass: readout never blank over ${blank.frames} frames`);
  ok(errors.length === 0, `rest pass: no page/console errors ${errors.join("|")}`);
  await ctx.close();
  return rows;
}

async function motionPass({ w, h, scheme }) {
  const { ctx, page, errors } = await open({ w, h, scheme });
  await predict(page, false);
  const out = {};
  const record = (ms) =>
    page.evaluate((ms) => {
      const wrap = document.querySelector("[data-testid=mirror-wrap]");
      const card = document.querySelector("[data-testid=card]");
      const mk = document.querySelector("[data-testid=marks]");
      const rd = document.querySelector("[data-testid=stage] [role=status]");
      const faces = [...card.querySelectorAll("svg")];
      const rec = (window.__rec = []);
      const t0 = performance.now();
      window.__c = null;
      document.addEventListener("click", () => (window.__c = performance.now() - t0), { capture: true, once: true });
      const tick = () => {
        const m = new DOMMatrix(getComputedStyle(card).transform);
        rec.push({
          t: performance.now() - t0,
          wo: +getComputedStyle(wrap).opacity,
          wt: getComputedStyle(wrap).transform,
          ang: (Math.atan2(Math.abs(m.m13), m.m11) * 180) / Math.PI,
          mk: +getComputedStyle(mk).opacity,
          rd: rd.textContent,
          fw: Math.max(...faces.map((f) => f.getBoundingClientRect().width)),
        });
        if (performance.now() - t0 < ms) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, ms);
  for (const chip of ["3_1", "4_1"]) {
    if (chip === "4_1") {
      await btn(page, "Figure-eight").click();
      await page.waitForTimeout(500);
    }
    // --- Mirror: no squeeze ---
    await record(900);
    await btn(page, "Mirror").click();
    await page.waitForTimeout(1000);
    let rec = await page.evaluate(() => window.__rec);
    const tfs = [...new Set(rec.map((r) => r.wt))];
    const okTf = tfs.every((t) => t === "none" || /^matrix\(-1, 0, 0, 1, 0, 0\)$/.test(t));
    const angs = Math.max(...rec.map((r) => r.ang));
    const fwSpread = Math.max(...rec.map((r) => r.fw)) - Math.min(...rec.map((r) => r.fw));
    let changesVisible = 0;
    for (let i = 1; i < rec.length; i++) if (rec[i].wt !== rec[i - 1].wt && rec[i].wo > 0.1 && rec[i - 1].wo > 0.1) changesVisible++;
    const c0 = await page.evaluate(() => window.__c);
    const dip = rec.filter((r) => r.t > c0 + 110 && r.wo < 0.999 && r.t < c0 + 300);
    const marksGone = dip.length > 3 && dip.every((r) => r.mk < 0.05);
    out[`mirror-${chip}`] = { frames: rec.length, transforms: tfs, maxCardAngle: angs, faceWidthSpread: +fwSpread.toFixed(2), minWrapOpacity: Math.min(...rec.map((r) => r.wo)), changesVisible };
    ok(okTf && fwSpread < 0.5, `${chip} Mirror: wrapper transform only ever none or matrix(-1,..) (${tfs.join(" | ")}), face width spread ${fwSpread.toFixed(2)} px over ${rec.length} frames (no squeeze)`);
    ok(changesVisible === 0 && Math.min(...rec.map((r) => r.wo)) < 0.05, `${chip} Mirror: transform swaps only while opacity ~0 (min ${Math.min(...rec.map((r) => r.wo)).toFixed(2)})`);
    ok(angs < 0.5, `${chip} Mirror: card does not rotate (max angle ${angs.toFixed(2)})`);
    ok(marksGone, `${chip} Mirror: marks stay hidden (opacity<0.05) for the ${dip.length} frames of the dip after 110 ms`);
    await btn(page, "Mirror").click();
    await page.waitForTimeout(700);
    // --- Turn over: marks hide mid-flip ---
    await record(900);
    await btn(page, "Turn over").click();
    await page.waitForTimeout(1000);
    rec = await page.evaluate(() => window.__rec);
    const c1 = await page.evaluate(() => window.__c);
    const mid = rec.filter((r) => r.ang > 45 && r.ang < 179.5 && r.t > c1);
    const early = rec.filter((r) => r.t > c1 + 110 && r.ang < 179.5 && r.mk > 0.05);
    const sawMid = rec.some((r) => r.ang > 80 && r.ang < 100);
    const bad = mid.filter((r) => r.mk > 0.05);
    const reads = [...new Set(rec.map((r) => r.rd.trim()))];
    out[`turn-${chip}`] = { frames: rec.length, midFrames: mid.length, sawMid, marksVisibleMid: bad.length, readouts: reads };
    ok(sawMid && mid.length > 3 && bad.length === 0 && early.length === 0, `${chip} Turn over: card really turns (saw 80-100deg: ${sawMid}); marks fully hidden on all ${mid.length} frames from 45 to 179.5 deg and from 110 ms after the press until rest`);
    ok(reads.length === 1 && /^Sum/.test(reads[0]), `${chip} Turn over: readout steady through flip ('${reads.join("' / '")}')`);
    await btn(page, "Turn over").click();
    await page.waitForTimeout(700);
  }
  // --- wrong order & stress ---
  await btn(page, "Trefoil").click();
  await page.waitForTimeout(400);
  await btn(page, "Turn over").click();
  await btn(page, "Turn over").click(); // double tap
  await page.waitForTimeout(800);
  let st = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, pressed: [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => b.textContent + "=" + b.getAttribute("aria-pressed")), label: document.querySelector("[data-testid=stage] [role=img]").getAttribute("aria-label") }));
  ok(st.marks === "front" && st.pressed.includes("Turn over=false"), `double-tap Turn over ends in front (${st.marks}; ${st.label})`);
  await btn(page, "Turn over").click();
  await page.waitForTimeout(120);
  await btn(page, "Mirror").click(); // mirror mid-flip
  await page.waitForTimeout(1000);
  st = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, op: getComputedStyle(document.querySelector("[data-testid=marks]")).opacity, ro: document.querySelector("[data-testid=stage] [role=status]").textContent }));
  ok(st.marks === "mirroredTurned" && st.op === "1" && /Sum \+3/.test(st.ro), `Mirror pressed mid-flip settles on mirroredTurned (${st.marks}, '${st.ro.trim()}')`);
  await btn(page, "Figure-eight").click(); // chip switch from non-front state
  await page.waitForTimeout(500);
  st = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, ro: document.querySelector("[data-testid=stage] [role=status]").textContent }));
  ok(st.marks === "front" && /Sum 0/.test(st.ro), `chip switch from mirroredTurned resets to front (${st.marks}, '${st.ro.trim()}')`);
  await btn(page, "Turn over").click();
  await page.waitForTimeout(80);
  await btn(page, "Trefoil").click(); // chip switch mid-flip
  await page.waitForTimeout(800);
  st = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, ro: document.querySelector("[data-testid=stage] [role=status]").textContent, op: getComputedStyle(document.querySelector("[data-testid=marks]")).opacity, ang: getComputedStyle(document.querySelector("[data-testid=card]")).transform }));
  ok(st.marks === "front" && /Sum −3/.test(st.ro) && st.op === "1", `chip switch mid-flip: front trefoil, marks back (${st.marks}, '${st.ro.trim()}', card ${st.ang})`);
  const b = await page.evaluate(() => ({ blank: window.__blank, frames: window.__frames }));
  ok(b.blank === 0, `motion pass: readout never blank over ${b.frames} frames`);
  ok(errors.length === 0, `motion pass: no errors ${errors.join("|")}`);
  await ctx.close();
  res.motion = res.motion || {};
  return out;
}

async function layoutPass({ w, h, scheme }) {
  const { ctx, page, errors } = await open({ w, h, scheme });
  const out = {};
  const probe = () =>
    page.evaluate(() => {
      const vw = innerWidth, vh = innerHeight;
      const pic = document.querySelector("[data-testid=marks]")?.getBoundingClientRect();
      const ctrls = [...document.querySelectorAll("[data-testid=stage] button[data-qa=control]")].map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom) }; });
      let minFont = 99;
      document.querySelectorAll("[data-testid=lesson] *").forEach((e) => { if ([...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) ) minFont = Math.min(minFont, parseFloat(getComputedStyle(e).fontSize)); });
      return { vw, vh, scrollW: document.documentElement.scrollWidth, pic: pic && { l: Math.round(pic.left), r: Math.round(pic.right), t: Math.round(pic.top), b: Math.round(pic.bottom) }, ctrls, minFont, bg: getComputedStyle(document.body).backgroundColor, scheme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" };
    });
  await predict(page, false);
  out.explore = await probe();
  ok(out.explore.scrollW <= out.explore.vw, `explore: no horizontal overflow (scrollWidth ${out.explore.scrollW} <= ${out.explore.vw}); scheme ${out.explore.scheme}, bg ${out.explore.bg}`);
  ok(out.explore.ctrls.every((c) => c.w >= 44 && c.h >= 44), `explore: controls >= 44px (${out.explore.ctrls.map((c) => `${c.t} ${c.w}x${c.h}`).join(", ")})`);
  ok(out.explore.pic.l >= 0 && out.explore.pic.r <= out.explore.vw, `explore: picture inside width (${out.explore.pic.l}..${out.explore.pic.r} of ${out.explore.vw}); picture bottom ${out.explore.pic.b}, last control bottom ${Math.max(...out.explore.ctrls.map((c) => c.bottom))} of viewport ${out.explore.vh}`);
  await page.screenshot({ path: path.join(OUT, `${tag.replace(/\W+/g, "_")}-explore.png`) });
  // reveal locked after only one milestone
  const rb = page.getByTestId("reveal-button");
  await btn(page, "Turn over").click();
  await page.waitForTimeout(600);
  out.afterTurnOnlyDisabled = await rb.isDisabled();
  await btn(page, "Mirror").click();
  await page.waitForTimeout(600);
  out.afterBothDisabled = await rb.isDisabled();
  await page.screenshot({ path: path.join(OUT, `${tag.replace(/\W+/g, "_")}-both.png`) });
  const seen = await page.getByTestId("seen-line").textContent();
  out.seen = seen.trim();
  ok(/turned over −3/.test(seen) && /mirror \+3/.test(seen), `seen line after both: '${seen.trim()}'`);
  ok(out.afterBothDisabled === false, `reveal unlocked after Turn over + Mirror (after Turn over only: disabled=${out.afterTurnOnlyDisabled})`);
  await rb.click();
  await page.waitForTimeout(900);
  out.reveal = await probe();
  const rtext = await page.getByTestId("reveal").textContent();
  out.revealText = rtext.trim().slice(0, 400);
  ok(out.reveal.scrollW <= out.reveal.vw, `reveal: no horizontal overflow (${out.reveal.scrollW}/${out.reveal.vw})`);
  ok(out.reveal.pic.l >= 0 && out.reveal.pic.r <= out.reveal.vw, `reveal: picture inside width`);
  const revTop = await page.evaluate(() => { const s = document.querySelector("[data-testid=stage]").getBoundingClientRect(); const m = document.querySelector("[data-testid=marks]").getBoundingClientRect(); return { stageTop: Math.round(s.top), picTop: Math.round(m.top), picBottom: Math.round(m.bottom), vh: innerHeight }; });
  out.revealGeom = revTop;
  ok(revTop.picTop >= 0, `reveal: picture top on screen without scrolling (picTop ${revTop.picTop}, stageTop ${revTop.stageTop})`);
  await page.screenshot({ path: path.join(OUT, `${tag.replace(/\W+/g, "_")}-reveal.png`) });
  const dumpTop = await page.evaluate(() => scrollY);
  out.scrollYAtReveal = dumpTop;
  // reload mid-lesson
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  out.afterReload = await page.getByTestId("predict-option").count();
  ok(errors.length === 0, `layout pass: no errors ${errors.join("|")}`);
  await ctx.close();
  return out;
}

async function extraPass({ w, h, scheme }) {
  // reduced motion + keyboard
  const { ctx, page, errors } = await open({ w, h, scheme, reduce: true });
  await predict(page, false);
  const out = {};
  await btn(page, "Turn over").click();
  await page.waitForTimeout(150);
  const lab = await page.locator("text=Turned over").count();
  const st = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, op: getComputedStyle(document.querySelector("[data-testid=marks]")).opacity, ro: document.querySelector("[data-testid=stage] [role=status]").textContent, tf: getComputedStyle(document.querySelector("[data-testid=card]")).transitionDuration }));
  out.reduced = { label: lab, ...st };
  ok(st.marks === "turned" && st.op !== undefined && /Sum −3/.test(st.ro), `reduced motion: Turn over lands on turned at once ('Turned over' label count ${lab}; card transition ${st.tf}; marks opacity ${st.op})`);
  await btn(page, "Mirror").click();
  await page.waitForTimeout(200);
  const st2 = await page.evaluate(() => ({ marks: document.querySelector("[data-testid=marks]").dataset.state, tf: getComputedStyle(document.querySelector("[data-testid=mirror-wrap]")).transform, ro: document.querySelector("[data-testid=stage] [role=status]").textContent }));
  ok(st2.marks === "mirroredTurned" && /Sum \+3/.test(st2.ro), `reduced motion: Mirror lands at once (${st2.marks}, wrapper ${st2.tf})`);
  await ctx.close();
  // keyboard
  const k = await open({ w, h, scheme });
  const p = k.page;
  await p.keyboard.press("Tab");
  await p.getByTestId("predict-option").nth(1).focus();
  await p.keyboard.press("Space");
  await p.getByTestId("commit-prediction").focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(300);
  await btn(p, "Turn over").focus();
  await p.keyboard.press("Space");
  await p.waitForTimeout(700);
  await p.keyboard.press("Tab");
  const foc = await p.evaluate(() => document.activeElement.textContent);
  await p.keyboard.press("Enter");
  await p.waitForTimeout(700);
  const ks = await p.evaluate(() => document.querySelector("[data-testid=marks]").dataset.state);
  out.keyboard = { focusAfterTab: foc, state: ks };
  ok(foc === "Mirror" && ks === "mirroredTurned", `keyboard: Space on Turn over, Tab to '${foc}', Enter -> ${ks}`);
  await k.ctx.close();
  return out;
}

const RUNS = [
  [390, 844, "light"],
  [390, 844, "dark"],
  [360, 640, "light"],
  [360, 640, "dark"],
];
for (const [w, h, scheme] of RUNS) {
  tag = `[${w}x${h} ${scheme}]`;
  const run = { w, h, scheme };
  run.rest = await restPass({ w, h, scheme });
  run.motion = await motionPass({ w, h, scheme });
  run.layout = await layoutPass({ w, h, scheme });
  run.extra = await extraPass({ w, h, scheme });
  res.runs.push(run);
}
await browser.close();
fs.writeFileSync(path.join(OUT, "r4-results.json"), JSON.stringify(res, null, 1));
console.log(`\n${res.failures.length} failure(s)`);
res.failures.forEach((f) => console.log("  " + f));
