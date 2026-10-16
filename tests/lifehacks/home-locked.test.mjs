// Home engine, locked stage (W-1258) and cord press order (W-1241). The stage components are rendered for real with
// react-dom/server (render-loader.mjs), so these tests read the markup a learner gets, not a copy of its strings.
//
// The rule (principal-engineer ruling, company/ops/dispatch-requests/2026-10-16-r3-engineering.md, and
// company/design/specs/lifehacks-engines-v2.md R2, "Predict (locked)" row): while no mode is in effect (locked, or
// before the first press), the picture keeps A's arrangement, but no text in it states a count, amount or result for
// either mode. A given that the question states may stay; each allowed one is listed in GIVENS and in the readiness
// addendum (company/engineering/readiness/2026-10-16-lh-home-locked-stage-addendum.md).
import { register } from 'node:module';
import test from 'node:test';
import assert from 'node:assert/strict';

register('./render-loader.mjs', import.meta.url);
const { createElement: h } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
const { Controls, useHomeLesson } = await import('../../src/components/lifehacks/HomeLesson.tsx');
const { homeLessons } = await import('../../src/lib/lifehacks/home-lessons.ts');
const { homeColumn, homeModeLabels } = await import('../../src/lib/lifehacks/engine-v2.ts');

const V2 = homeLessons.filter((s) => s.engine === 2);
// The special stages (bow, cord) have no modes: their rule is "while locked". The mode-null rule is the v2 stage's.
const SPECIAL = ['wobble', 'bow', 'cord'];
const V2_STAGE = V2.filter((s) => !SPECIAL.includes(s.model));
const bySlug = (slug) => { const s = homeLessons.find((l) => l.slug === slug); assert.ok(s, slug); return s; };

/**
 * Givens: picture texts allowed while locked even though they equal an A or B cell, because the question states them.
 * At most 3 (dispatch B1 stop-if: more than 3 means the picture design is the problem, not the list).
 */
const GIVENS = {
  'tote-balance-sides': ['3 kg', '1 kg'], // "3 kg on the left, 1 kg on the right."
};

const stage = (spec, { locked = true, mode = null, runs = 0, p = spec.initial, setRuns = () => {} } = {}) =>
  renderToStaticMarkup(h(Controls, { spec, p, setP() {}, after: mode === 'b', setAfter() {}, runs, setRuns, mode, setMode() {},
    seen: { a: false, b: false }, setSeen() {}, locked, interact() {} }));
const decode = (x) => x.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
/** The stage picture (its first svg): every <text>, and the svg's aria-label without the lesson title. */
const picture = (spec, html) => {
  const svg = html.match(/<svg[\s\S]*?<\/svg>/)?.[0];
  assert.ok(svg, `${spec.slug}: the stage draws a picture`);
  const texts = [...svg.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim()).filter(Boolean);
  const label = decode(svg.match(/aria-label="([^"]*)"/)?.[1] ?? '').replace(`${spec.title}: `, '');
  return { svg, texts, label };
};
const numbers = (text) => [...String(text).matchAll(/\d+(?:,\d{3})*(?:\.\d+)?/g)].map((m) => Number(m[0].replace(/,/g, '')));
const cells = (spec) => ['a', 'b'].flatMap((m) => { const c = homeColumn(spec, spec.initial, m); return [...c.amounts, c.result]; });

test('GIVENS lists at most 3 texts, each stated in its question and drawn in its locked picture', () => {
  const all = Object.entries(GIVENS).flatMap(([slug, texts]) => texts.map((t) => [slug, t]));
  assert.ok(all.length <= 3, `${all.length} givens: more than 3 means the picture design is the problem`);
  for (const [slug, t] of all) {
    const spec = bySlug(slug);
    assert.ok(spec.question.includes(t), `${slug}: the question states "${t}"`);
    assert.ok(picture(spec, stage(spec)).texts.includes(t), `${slug}: the locked picture draws "${t}" (else drop it from GIVENS)`);
  }
});

for (const [state, locked, specs] of [['locked', true, V2], ['unlocked before the first press', false, V2_STAGE]]) {
  test(`${state}: no engine-2 Home picture text states an A or B amount or result at initial, except the listed givens`, () => {
    for (const spec of specs) {
      const { texts, label } = picture(spec, stage(spec, { locked }));
      const forbidden = new Set(cells(spec).flatMap(numbers));
      const words = cells(spec).filter((c) => !/\d/.test(c));
      for (const t of [...texts, label]) {
        if ((GIVENS[spec.slug] ?? []).includes(t)) continue;
        const hit = numbers(t).filter((n) => forbidden.has(n));
        assert.deepEqual(hit, [], `${spec.slug}: "${t}" states a cell value (${cells(spec).join(' | ')})`);
        for (const w of words) assert.ok(!t.includes(w), `${spec.slug}: "${t}" states the cell "${w}"`);
      }
    }
  });

  test(`${state}: every number in an engine-2 Home picture is one the question or a mode label already states`, () => {
    for (const spec of specs) {
      const { texts, label } = picture(spec, stage(spec, { locked }));
      const stated = new Set([spec.question, ...homeModeLabels(spec)].flatMap(numbers));
      for (const t of [...texts, label]) {
        assert.deepEqual(numbers(t).filter((n) => !stated.has(n)), [], `${spec.slug}: "${t}" draws a number the learner was not given`);
      }
    }
  });
}

test('the locked-picture check is not vacuous: after a press, the same pictures do state their numbers', () => {
  const after = (slug, mode) => picture(bySlug(slug), stage(bySlug(slug), { locked: false, mode, runs: 2 })).texts;
  assert.ok(after('group-cables-with-ends', 'a').includes('6 loose ends'));
  assert.ok(after('shoes-opposite-ends', 'a').includes('24 cm'));
  assert.ok(after('fitted-sheet-corners-nest', 'a').includes('32 cm'));
  assert.ok(after('socks-use-shoe-space', 'b').includes('600 cm³ empty'));
  assert.ok(after('coiled-cord-bend-radius', 'a').some((t) => t.startsWith('3.18 turns')));
});

test('W-1299 jacket-last-first, locked: an empty bag, the items beside it in use order, no arrows, no highlight', () => {
  const spec = bySlug('jacket-last-first');
  for (const p of [spec.min, spec.initial, spec.max]) {
    const { svg, texts } = picture(spec, stage(spec, { p }));
    assert.equal(texts[0], 'Jacket'); assert.equal(texts[1], 'Sweater'); assert.equal(texts.at(-1), 'Shoes');
    assert.equal(texts.length, Math.max(2, Math.round(p)), `p=${p}: every item is drawn`);
    assert.doesNotMatch(svg, /class="air"/, `p=${p}: no arrows`);
    assert.doesNotMatch(svg, /class="target"/, `p=${p}: no item is marked`);
    // Every item lies left of the bag's wall (x = 206), so the bag is empty.
    for (const m of svg.matchAll(/<rect x="([\d.]+)"[^>]*width="([\d.]+)"/g)) assert.ok(Number(m[1]) + Number(m[2]) <= 206, `p=${p}: an item is in the bag`);
  }
  // A and B after a press are the stacks, as before.
  assert.match(picture(spec, stage(spec, { locked: false, mode: 'a' })).svg, /class="air"/);
});

test('W-1299 group-cables-with-ends, locked: the loose ends are not drawn as highlighted targets', () => {
  const spec = bySlug('group-cables-with-ends');
  assert.doesNotMatch(picture(spec, stage(spec)).svg, /class="target"/);
  assert.match(picture(spec, stage(spec, { locked: false, mode: 'a' })).svg, /class="target"/, 'mode A still marks the ends');
});

/* ------------------------------------------------------------------ E1: tote lever arm */

test('E1 tote-balance-sides: the rotated balance-point dot hangs on the dashed vertical under the pivot (±1 unit)', () => {
  // Dispatch 2026-10-16-r5-lifehacks.md D4 row E1 (FC54 note): the bag turns about (150, 20) until the dot is under it.
  const spec = bySlug('tote-balance-sides');
  for (const p of [3, 5]) for (const [locked, mode] of [[false, 'a'], [true, null]]) {
    const { svg } = picture(spec, stage(spec, { locked, mode, p }));
    const [, deg, px, py] = svg.match(/<g transform="rotate\(([-\d.e]+),([\d.]+),([\d.]+)\)">/).map(Number);
    const dot = svg.match(/<circle cx="([-\d.e]+)" cy="([-\d.e]+)" r="6" class="target"/);
    assert.ok(dot, `p=${p}: the balance-point dot is drawn`);
    const [dx, dy] = [Number(dot[1]) - px, Number(dot[2]) - py], t = deg * Math.PI / 180;
    const x = px + dx * Math.cos(t) - dy * Math.sin(t);
    assert.ok(Math.abs(x - px) <= 1, `p=${p} ${mode ?? 'locked'}: rotated dot at x=${x.toFixed(2)}, pivot at ${px}`);
    assert.ok(Math.abs(deg) > 1, `p=${p}: the bag is drawn tilted (${deg.toFixed(2)} degrees), so the check is not vacuous`);
  }
});

/* ------------------------------------------------------------------ W-1241: cord press order */

const cord = bySlug('long-cord-knots-itself');
/** Press the cord stage's buttons in order, re-rendering with the new state each time, as React would. */
const pressInOrder = (order) => {
  globalThis.__lhReached = new Set();
  let runs = 0;
  for (const name of order) {
    globalThis.__lhControls = [];
    stage(cord, { locked: false, runs, setRuns: (n) => { runs = n; } });
    const button = globalThis.__lhControls.find((c) => c.text === name);
    assert.ok(button, `the cord stage has a "${name}" button`);
    button.onClick?.({}); // StageControl's handler: it ignores a press while the button is inactive (shown pressed)
  }
  return [...globalThis.__lhReached].sort();
};
const cordMinInteractions = () => { let props; function Probe() { props = useHomeLesson(cord.slug).lessonProps; return null; } renderToStaticMarkup(h(Probe)); return props.minInteractions; };

test('W-1241 long-cord-knots-itself: the reveal unlocks after either press order', () => {
  const need = cordMinInteractions();
  assert.equal(need, 2);
  for (const order of [['Tumble 0.3 m', 'Tumble 3 m'], ['Tumble 3 m', 'Tumble 0.3 m'], ['Tumble 3 m']]) {
    const reached = pressInOrder(order);
    assert.deepEqual(reached, ['long', 'short'], `${order.join(' then ')}: both milestones`);
    assert.ok(reached.length >= need, `${order.join(' then ')}: the reveal unlocks`);
  }
});
