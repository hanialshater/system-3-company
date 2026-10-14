// Sequence probe (EDD-006 review C1, W-604): behaviour and layout checks for lessons that use the
// multi-card sequence kit (src/kit/sequence.tsx). Closes the gap the contract leaves open (review O4): QA
// and reveal-fit measure overflow and tap size only at the reveal, so sub-cards 1 to n-1 are never measured.
//
//   node tools/sequence-probe.mjs --url http://localhost:<port> [<slug> ...] [--timeout 120000] [--only phone|desktop] [--shots]
//
// With no slug it probes every lesson whose Demo.tsx imports "@/kit/sequence". Works against `next dev` or
// `next start`; the kit's dev warnings (C2) are only printed by a dev server, so the warnings check is
// skipped (n/a) against a production build. For each lesson, at 390x844 (mobile, touch) and 1280x800:
//
//   walk         commit the last prediction option (as QA does), then follow the QA path: the first 16
//                enabled, visible stage controls once each in DOM order, re-queried after each press,
//                sliders two arrow steps. Every sub-card must be shown on the way, and the reveal must unlock.
//   overflow     after every press, with that sub-card showing: page horizontal overflow <= 1 px; the
//                shown sub-card's scrollWidth <= clientWidth + 1.
//   crop         after every press: no visible element of the shown sub-card (text, svg, control) extends
//                past the stage's left or right edge, and no svg <text> is cut by its own svg box.
//   tap          after every press: every visible stage control (trail, sub-card controls, Next) is at
//                least 24x24 px (contract floor); the kit's own trail and Next are also held to 44 px tall.
//   back         each earlier trail step is enabled after the walk; pressing it shows that sub-card with
//                the same picture and text it had when the walk left it (state kept); then the probe
//                returns to the last card through the trail.
//   revealCard   the learner taps back to sub-card 1, then presses the reveal: the reveal card (the
//                lesson's revealCard, default the last) is the one showing in the same commit that adds the
//                reveal (MutationObserver) and in the first animation frame (before first paint).
//   errors       no page errors and no console errors during the run.
//   warnings     no CardSequence dev warnings (C2: bad sub-card count, ids, revealCard, dropped children,
//                sub-cards with no milestones, over 16 controls). Dev server only.
//   four-cards   390 px only, after everything else: the trail is padded in place with copies of its
//                widest step (with tick and trace) to 4 steps, and the probe measures step height and
//                overflow. PASS = every step stays at 44 px tall and nothing overflows. A FAIL here means
//                the titles wrap at 4 steps; whether the wrap is acceptable is the interaction designer's call
//                (W-601). The kit's behaviour does not depend on n (every index is computed from the
//                children), so the 4-card layout is the only n-specific risk; see W-604 in the EDD.
//
// A cold `next dev` can take minutes to compile a lesson under load: raise --timeout (ms, per wait) and use
// --only to run one viewport at a time. Errors are printed with the step they happened in, so a Fast Refresh
// remount caused by someone else's edit can be told apart from a defect.
// Prints PASS or FAIL per check and viewport; exit code 1 on any FAIL. --shots saves each sub-card at each
// viewport to artifacts/sequence-probe/<slug>/. No dependencies beyond @playwright/test (QA already uses it).

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const valued = new Set(["url", "timeout", "only"].map((k) => `--${k}`));
const base = opt("url", process.env.SEQUENCE_PROBE_URL);
if (!base) {
  console.log("usage: node tools/sequence-probe.mjs --url http://localhost:<port> [<slug> ...] [--timeout 120000] [--shots]");
  process.exit(2);
}
const timeout = Number(opt("timeout", 120000));
const shots = args.includes("--shots");
const only = opt("only", null);

function sequenceLessons() {
  const root = "src/demos";
  const out = [];
  for (const domain of fs.readdirSync(root)) {
    const d = path.join(root, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const slug of fs.readdirSync(d)) {
      const demo = path.join(d, slug, "Demo.tsx");
      if (fs.existsSync(demo) && /["']@\/kit\/sequence["']/.test(fs.readFileSync(demo, "utf8"))) out.push(slug);
    }
  }
  return out.sort();
}
const named = args.filter((a, i) => !a.startsWith("--") && !valued.has(args[i - 1]));
const slugs = named.length ? named : sequenceLessons();
if (!slugs.length) {
  console.log("no CardSequence lessons found");
  process.exit(0);
}

const VIEWPORTS = [
  { name: "phone 390x844", short: "phone", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "desktop 1280x800", short: "desktop", viewport: { width: 1280, height: 800 } },
];

// ---- in-page helpers (serialised into the page) ----

function pageState() {
  const stage = document.querySelector('[data-testid="stage"]');
  const seq = stage?.querySelector('[aria-roledescription="card sequence"]');
  if (!stage || !seq) return { error: "no CardSequence in the stage" };
  const cards = [...seq.querySelectorAll("[data-subcard-index]")];
  const shown = cards.find((c) => !c.hidden);
  const steps = [...seq.querySelectorAll("ol > li > [data-qa='control']")];
  return {
    n: cards.length,
    ids: cards.map((c) => c.getAttribute("data-subcard")),
    active: shown ? Number(shown.getAttribute("data-subcard-index")) : -1,
    shownCount: cards.filter((c) => !c.hidden).length,
    steps: steps.map((s) => ({ disabled: s.disabled, current: s.getAttribute("aria-current") === "step" })),
  };
}

function measureShown() {
  const vis = (el) => {
    if (!(el instanceof Element)) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0;
  };
  const stage = document.querySelector('[data-testid="stage"]');
  const seq = stage.querySelector('[aria-roledescription="card sequence"]');
  const card = [...seq.querySelectorAll("[data-subcard-index]")].find((c) => !c.hidden);
  const out = { active: card ? Number(card.getAttribute("data-subcard-index")) : -1, problems: [] };
  const pageOverflow = document.documentElement.scrollWidth - window.innerWidth;
  if (pageOverflow > 1) out.problems.push({ check: "overflow", what: `page scrolls sideways by ${pageOverflow}px` });
  if (!card) return out;
  if (card.scrollWidth > card.clientWidth + 1)
    out.problems.push({ check: "overflow", what: `sub-card ${out.active + 1} content is ${card.scrollWidth - card.clientWidth}px wider than the card` });

  const sr = stage.getBoundingClientRect();
  const label = (el) =>
    `${el.tagName.toLowerCase()}${el.getAttribute("aria-label") ? ` "${el.getAttribute("aria-label").slice(0, 30)}"` : el.textContent ? ` "${el.textContent.trim().slice(0, 30)}"` : ""}`;
  // Leaf-ish elements: text-bearing elements, svgs and controls of the shown sub-card.
  const els = [...card.querySelectorAll("*")].filter(
    (el) =>
      vis(el) &&
      (el.matches("svg, button, input, select, [data-qa='control'], img") ||
        (el.closest("svg") === null && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))),
  );
  for (const el of els) {
    const r = el.getBoundingClientRect();
    const left = sr.left - r.left;
    const right = r.right - sr.right;
    if (left > 1 || right > 1)
      out.problems.push({ check: "crop", what: `${label(el)} sticks out of the stage by ${Math.round(Math.max(left, right))}px` });
  }
  for (const t of card.querySelectorAll("svg text")) {
    if (!vis(t) || !t.textContent.trim()) continue;
    const svg = t.closest("svg");
    const box = svg.getBoundingClientRect();
    const r = t.getBoundingClientRect();
    const over = Math.max(box.left - r.left, r.right - box.right, box.top - r.top, r.bottom - box.bottom);
    if (over > 1 && getComputedStyle(svg).overflow !== "visible")
      out.problems.push({ check: "crop", what: `svg text "${t.textContent.trim().slice(0, 30)}" is cut ${Math.round(over)}px by its svg` });
  }

  // Tap targets: every visible stage control (trail and Next included).
  const min = { w: Infinity, h: Infinity };
  for (const c of stage.querySelectorAll("[data-qa='control']")) {
    if (c.offsetParent === null) continue;
    const r = c.getBoundingClientRect();
    min.w = Math.min(min.w, r.width);
    min.h = Math.min(min.h, r.height);
    if (r.width < 24 || r.height < 24)
      out.problems.push({ check: "tap", what: `${label(c)} is ${Math.round(r.width)}x${Math.round(r.height)}px (< 24)` });
    const kit = c.closest("ol") !== null && c.closest("ol").parentElement === seq;
    const isNext = c.parentElement?.parentElement === card && /^Next:/.test(c.textContent.trim());
    if ((kit || isNext) && r.height < 43.5)
      out.problems.push({ check: "tap", what: `kit ${kit ? "trail step" : "Next"} ${label(c)} is ${Math.round(r.height)}px tall (kit uses 44)` });
  }
  out.minTap = { w: Math.round(min.w), h: Math.round(min.h) };
  out.fingerprint = cardFingerprint(card);
  return out;

  function cardFingerprint(el) {
    const svg = [...el.querySelectorAll("svg *")].slice(0, 400).map((n) => [...n.attributes].map((a) => a.value).join(",")).join("|");
    const inputs = [...el.querySelectorAll("input")].map((i) => i.value).join(",");
    const ctl = [...el.querySelectorAll("[data-qa='control']")].map((c) => `${c.disabled ? 1 : 0}${c.className}`).join(",");
    return `${el.innerText}§${inputs}§${ctl}§${svg}`;
  }
}

// ---- driver ----

const results = [];
const record = (slug, vp, check, ok, detail = "") => {
  results.push({ slug, vp, check, ok });
  const tag = ok === null ? "n/a " : ok ? "PASS" : "FAIL";
  console.log(`${tag}  ${slug}  ${vp}  ${check}${detail ? `: ${detail}` : ""}`);
};

async function probe(browser, slug, vpDef) {
  const vp = vpDef.short;
  const { name: _n, short: _s, ...ctxOpts } = vpDef;
  const context = await browser.newContext(ctxOpts);
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);
  const errors = [];
  const warnings = [];
  let devServer = false;
  let stepName = "load";
  let refreshes = 0;
  page.on("pageerror", (e) => errors.push(`[${stepName}] pageerror: ${e.message}`));
  page.on("console", (m) => {
    const text = m.text();
    if (/\[HMR\]|\[Fast Refresh\]|Download the React DevTools/.test(text)) devServer = true;
    if (/\[Fast Refresh\] rebuilding/.test(text)) refreshes++;
    if (m.type() === "error" && !/favicon|Failed to load resource/.test(text))
      errors.push(`[${stepName}${refreshes ? `, after ${refreshes} Fast Refresh rebuild(s)` : ""}] console: ${text.replace(/\s+/g, " ").slice(0, 400)}`);
    if (m.type() === "warning" && text.includes("CardSequence")) warnings.push(text.slice(0, 240));
  });
  const shotDir = path.join("artifacts", "sequence-probe", slug);
  const shot = async (name) => {
    if (!shots) return;
    fs.mkdirSync(shotDir, { recursive: true });
    await page.screenshot({ path: path.join(shotDir, `${vp}-${name}.png`) });
  };

  try {
    const t0 = Date.now();
    await page.goto(`${base}/d/${slug}`, { timeout, waitUntil: "domcontentloaded" });
    const lessonEl = page.locator('[data-testid="lesson"]');
    // Fail fast when the dev server cannot compile (every lesson shares one bundle, so another builder's
    // half-written Demo.tsx blocks this one too, EDD-006 review S1).
    let buildError = null;
    const onBuildError = (text) => {
      const m = /(\.\/src\/[^\s:]+:\d+:\d+)[\s\S]*?(Error: [^\n]+|Parsing [^\n]+|Module not found[^\n]*)/.exec(text);
      if (m && !buildError) buildError = `${m[1]} ${m[2].slice(0, 120)}`;
    };
    page.on("pageerror", (e) => onBuildError(e.message));
    page.on("console", (m) => m.type() === "error" && onBuildError(m.text()));
    let settled = false;
    const loaded = lessonEl.waitFor({ state: "visible", timeout }).finally(() => (settled = true));
    const broken = (async () => {
      while (!buildError && !settled) await new Promise((r) => setTimeout(r, 1000));
      if (settled) return;
      // Give a fix in progress a moment (Fast Refresh) before giving up.
      await page.waitForTimeout(20000);
      if ((await lessonEl.count()) === 0) throw new Error(`dev server build error, not this lesson: ${buildError}`);
    })();
    broken.catch(() => {});
    loaded.catch(() => {});
    await Promise.race([loaded, broken.then(() => loaded)]);
    devServer ||= await page.evaluate(() => !!document.querySelector("nextjs-portal"));
    const st0 = await page.evaluate(pageState);
    if (st0.error) {
      record(slug, vp, "walk", false, st0.error);
      return;
    }
    const n = st0.n;
    const seen = new Map(); // card index -> last measurement while it was showing
    const problems = { overflow: [], crop: [], tap: [] };
    const minTap = { w: Infinity, h: Infinity };
    const measure = async () => {
      const m = await page.evaluate(measureShown);
      for (const p of m.problems) if (!problems[p.check].some((q) => q.what === p.what)) problems[p.check].push(p);
      if (m.minTap) (minTap.w = Math.min(minTap.w, m.minTap.w)), (minTap.h = Math.min(minTap.h, m.minTap.h));
      const firstTime = !seen.has(m.active);
      seen.set(m.active, m);
      if (firstTime) await shot(`card${m.active + 1}`);
      return m;
    };

    stepName = "predict";
    // Predict (the last option, as QA does), then measure card 1 as unlocked.
    await page.locator('[data-testid="predict-option"]').last().click();
    await page.locator('[data-testid="commit-prediction"]').click();
    await page.locator('[data-testid="lesson"][data-phase="explore"]').waitFor({ timeout });
    await measure();

    // Walk the QA path; keep each card's fingerprint as the walk leaves it.
    const left = new Map();
    const controls = page.locator('[data-testid="stage"] [data-qa="control"]');
    const total = await controls.count();
    let pressed = 0;
    for (let i = 0; i < Math.min(total, 16); i++) {
      const c = page.locator('[data-testid="stage"] [data-qa="control"]').nth(i);
      if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
      const before = (await page.evaluate(pageState)).active;
      const pre = await page.evaluate(measureShown);
      const tag = await c.evaluate((el) => `${el.tagName}:${el.type ?? ""}`);
      stepName = `walk press ${pressed + 1} on card ${before + 1}`;
      if (tag === "INPUT:range") {
        await c.focus();
        const [max, val] = await c.evaluate((el) => [el.max, el.value]);
        await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
        await page.keyboard.press(val === max ? "ArrowLeft" : "ArrowRight");
      } else await c.click();
      pressed++;
      await page.waitForTimeout(300);
      const after = (await page.evaluate(pageState)).active;
      if (after !== before) left.set(before, pre.fingerprint);
      await measure();
    }
    const last = await page.evaluate(pageState);
    left.set(last.active, (await page.evaluate(measureShown)).fingerprint);
    const revealEnabled = await page.locator('[data-testid="reveal-button"]').isEnabled().catch(() => false);
    const missed = [...Array(n).keys()].filter((i) => !seen.has(i));
    record(
      slug,
      vp,
      "walk",
      missed.length === 0 && revealEnabled && last.shownCount === 1,
      `${n} sub-cards, ${pressed} presses, ${missed.length ? `never shown: ${missed.map((i) => i + 1).join(", ")}; ` : "every sub-card shown; "}reveal ${revealEnabled ? "unlocked" : "still locked"} (${Math.round((Date.now() - t0) / 1000)}s)`,
    );
    for (const k of ["overflow", "crop", "tap"])
      record(slug, vp, k, problems[k].length === 0, problems[k].length ? problems[k].map((p) => p.what).slice(0, 6).join("; ") : `${seen.size}/${n} sub-cards measured${k === "tap" ? `, narrowest visible control ${minTap.w}px, shortest ${minTap.h}px` : ""}`);

    // Back through the trail: every earlier card, state kept; then forward to where the walk ended.
    const steps = page.locator('[data-testid="stage"] [aria-roledescription="card sequence"] ol > li > [data-qa="control"]');
    const backProblems = [];
    stepName = "back";
    for (let i = last.active - 1; i >= 0; i--) {
      if (await steps.nth(i).isDisabled()) {
        backProblems.push(`trail step ${i + 1} disabled after the walk`);
        continue;
      }
      await steps.nth(i).click();
      await page.waitForTimeout(300);
      const m = await measure();
      if (m.active !== i) backProblems.push(`trail step ${i + 1} showed card ${m.active + 1}`);
      else if (left.has(i) && left.get(i) !== m.fingerprint) backProblems.push(`card ${i + 1} changed after leaving it (state not kept)`);
    }
    if (last.active > 0) {
      await steps.nth(last.active).click();
      await page.waitForTimeout(300);
      const back = await page.evaluate(pageState);
      if (back.active !== last.active) backProblems.push(`trail step ${last.active + 1} did not return to card ${last.active + 1}`);
      else if ((await page.evaluate(measureShown)).fingerprint !== left.get(last.active)) backProblems.push(`card ${last.active + 1} changed after going back and forth`);
    }
    record(slug, vp, "back", last.active > 0 && backProblems.length === 0, backProblems.length ? backProblems.join("; ") : last.active > 0 ? `trail back to cards ${last.active} to 1 and forward again, state kept` : "walk never left card 1");

    // revealCard: go back to card 1, then press the reveal; check the shown card before first paint.
    const expected = await page.evaluate(() => {
      const seq = document.querySelector('[data-testid="stage"] [aria-roledescription="card sequence"]');
      return seq ? seq.querySelectorAll("[data-subcard-index]").length - 1 : -1;
    });
    const revealId = await revealCardId(slug);
    const target = revealId ? last.ids.indexOf(revealId) : expected;
    if (revealEnabled && n > 1) {
      const from = target === 0 ? 1 : 0;
      if (!(await steps.nth(from).isDisabled())) await steps.nth(from).click();
      await page.waitForTimeout(300);
      const startOn = (await page.evaluate(pageState)).active;
      await page.evaluate(() => {
        const shownIdx = () => {
          const c = [...document.querySelectorAll('[data-testid="stage"] [data-subcard-index]')].find((x) => !x.hidden);
          return c ? Number(c.getAttribute("data-subcard-index")) : -1;
        };
        window.__seqProbe = { commit: null, frame: null };
        const mo = new MutationObserver(() => {
          if (window.__seqProbe.commit === null && document.querySelector('[data-testid="reveal"]')) {
            window.__seqProbe.commit = shownIdx();
            requestAnimationFrame(() => (window.__seqProbe.frame = shownIdx()));
            mo.disconnect();
          }
        });
        mo.observe(document.body, { childList: true, subtree: true, attributes: true });
      });
      const errsBefore = errors.length;
      stepName = "revealCard";
      await page.locator('[data-testid="reveal-button"]').click();
      await page.locator('[data-testid="reveal"]').waitFor({ state: "visible", timeout });
      await page.waitForFunction(() => window.__seqProbe.frame !== null, null, { timeout: 10000 }).catch(() => {});
      const seen2 = await page.evaluate(() => window.__seqProbe);
      await page.waitForTimeout(300);
      await shot("reveal");
      const ok = startOn !== target && seen2.commit === target && seen2.frame === target && errors.length === errsBefore;
      record(
        slug,
        vp,
        "revealCard",
        target >= 0 ? ok : false,
        target < 0
          ? `revealCard "${revealId}" is not a sub-card id`
          : `on card ${startOn + 1} at the reveal; card shown at reveal commit ${seen2.commit + 1}, first frame ${seen2.frame === null ? "?" : seen2.frame + 1}, expected ${target + 1}${revealId ? ` ("${revealId}")` : " (default: last)"}${errors.length > errsBefore ? "; console errors during the switch" : ""}`,
      );
      // The reveal card is measured too (the contract also does this, at the reveal only).
      const m = await page.evaluate(measureShown);
      if (m.problems.length) record(slug, vp, "reveal layout", false, m.problems.map((p) => p.what).join("; "));
    } else record(slug, vp, "revealCard", false, "reveal never unlocked, so the switch was not exercised");

    // Four cards (phone only): pad the trail in place to 4 steps and measure.
    if (vp === "phone") {
      stepName = "four-cards";
      const four = await page.evaluate(() => {
        const seq = document.querySelector('[data-testid="stage"] [aria-roledescription="card sequence"]');
        const ol = seq.querySelector("ol");
        const lis = [...ol.children];
        const baseH = Math.max(...lis.map((li) => li.querySelector("[data-qa='control']").getBoundingClientRect().height));
        const baseW = Math.round(lis[0].getBoundingClientRect().width);
        const widest = lis.reduce((a, b) => (b.textContent.length > a.textContent.length ? b : a));
        const added = [];
        while (ol.children.length < 4) {
          const li = widest.cloneNode(true);
          li.setAttribute("data-probe-clone", "");
          ol.appendChild(li);
          added.push(li);
        }
        ol.style.gridTemplateColumns = `repeat(${ol.children.length}, minmax(0, 1fr))`;
        const hs = [...ol.querySelectorAll("li > [data-qa='control']")].map((b) => b.getBoundingClientRect());
        const res = {
          real: lis.length,
          base: `${baseW}px wide, ${Math.round(baseH)}px tall`,
          widest: widest.textContent.trim(),
          heights: hs.map((r) => Math.round(r.height)),
          widths: hs.map((r) => Math.round(r.width)),
          pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
          olOverflow: ol.scrollWidth - ol.clientWidth,
        };
        for (const li of added) li.remove();
        ol.style.gridTemplateColumns = `repeat(${lis.length}, minmax(0, 1fr))`;
        return res;
      });
      const maxH = Math.max(...four.heights);
      record(
        slug,
        vp,
        "four-cards",
        maxH <= 44.5 && four.pageOverflow <= 1 && four.olOverflow <= 1,
        `${four.real} real steps ${four.base}; padded with ${4 - four.real} copies of "${four.widest}": steps ${four.widths[0]}px wide, ${four.heights.join("/")}px tall${maxH > 44.5 ? " (wraps; W-601 decides if accepted)" : ""}, overflow page ${four.pageOverflow}px / trail ${four.olOverflow}px`,
      );
    }

    record(slug, vp, "errors", errors.length === 0, errors.length ? errors.slice(0, 4).join(" | ") : "none");
    if (!devServer && warnings.length === 0) record(slug, vp, "warnings", null, "not a dev server (or none printed); dev warnings only show under next dev");
    else record(slug, vp, "warnings", warnings.length === 0, warnings.length ? [...new Set(warnings)].join(" | ") : "none");
  } catch (e) {
    record(slug, vp, "run", false, String(e.message ?? e).split("\n")[0]);
  } finally {
    await context.close();
  }
}

async function revealCardId(slug) {
  for (const domain of fs.readdirSync("src/demos")) {
    const f = path.join("src/demos", domain, slug, "Demo.tsx");
    if (fs.existsSync(f)) return fs.readFileSync(f, "utf8").match(/revealCard=["']([^"']+)["']/)?.[1] ?? null;
  }
  return null;
}

const browser = await chromium.launch();
try {
  for (const slug of slugs) for (const vp of VIEWPORTS.filter((v) => !only || v.short === only)) await probe(browser, slug, vp);
} finally {
  await browser.close();
}
const fails = results.filter((r) => r.ok === false);
console.log(`\n${results.filter((r) => r.ok).length} PASS, ${fails.length} FAIL, ${results.filter((r) => r.ok === null).length} n/a  (${slugs.length} lesson${slugs.length === 1 ? "" : "s"}, ${only ? only : `${VIEWPORTS.length} viewports`})`);
process.exit(fails.length ? 1 : 0);
