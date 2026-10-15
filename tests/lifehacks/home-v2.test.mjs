// Home engine v2 (TP-2, merge 9302c25): unit tests for homeDifference, plainNumbers (homeNumber and the cells
// that use it) and homeSliderMatters. Condition 2 of the PE-ops approval in
// company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md (W-1112): these functions had no tests,
// and wave W2 (b5ee4ca) is their first user.
import test from 'node:test';
import assert from 'node:assert/strict';
import { homeDifference, homeNumber, homeColumn, homeRevealLine, homeSliderMatters, sig3 } from '../../src/lib/lifehacks/engine-v2.ts';
import { homeLessons } from '../../src/lib/lifehacks/home-lessons.ts';
import { evaluateHome } from '../../src/lib/lifehacks/home-models.ts';

/** A minimal Home spec. 'fit' gives A = p - a and B = p - b (cm), so the two results and their signs are set by hand. */
const spec = (over = {}) => ({
  slug: 'synthetic', title: 'Synthetic', hook: '', concept: '', model: 'fit', view: 'fit',
  initial: 10, min: 0, max: 20, step: 1, values: [4, 2],
  choices: ['A choice', 'B choice'], question: '', idea: '', limit: '', formula: '', recall: '', source: null,
  answer: 0, unit: 'cm', inputLabel: 'Input', engine: 2, ...over,
});

/* ---------------------------------------------------------------- homeDifference */

test('homeDifference: diff is the size of the gap B - A with its unit, whichever result is larger', () => {
  // A = 10 - 4 = 6, B = 10 - 2 = 8
  assert.deepEqual(homeDifference(spec(), 10), { diff: '2 cm', ratio: '1.33' });
  // swapped: A = 8, B = 6. Same gap, same ratio (larger over smaller), never a minus sign
  assert.deepEqual(homeDifference(spec({ values: [2, 4] }), 10), { diff: '2 cm', ratio: '1.33' });
});

test('homeDifference: opposite signs give the full distance, and the ratio of the sizes', () => {
  // A = 10 - 12 = -2, B = 10 - 5 = 5: the gap is 7, not 5 - 2 = 3; the ratio compares |5| with |-2|
  assert.deepEqual(homeDifference(spec({ values: [12, 5] }), 10), { diff: '7 cm', ratio: '2.5' });
  // both negative: A = -6, B = -2
  assert.deepEqual(homeDifference(spec({ values: [16, 12] }), 10), { diff: '4 cm', ratio: '3' });
});

test('homeDifference: a zero smaller result leaves the ratio empty; equal results give a zero gap', () => {
  // A = 10 - 10 = 0, B = 8
  assert.deepEqual(homeDifference(spec({ values: [10, 2] }), 10), { diff: '8 cm', ratio: '' });
  // both zero
  assert.deepEqual(homeDifference(spec({ values: [10, 10] }), 10), { diff: '0 cm', ratio: '' });
  // equal and non-zero: ratio 1
  assert.deepEqual(homeDifference(spec({ values: [3, 3] }), 10), { diff: '0 cm', ratio: '1' });
  // a floating-point near-zero (below 1e-9) counts as zero
  assert.equal(homeDifference(spec({ values: [0.1 * 3, 2], initial: 0.3 }), 0.3).ratio, '');
});

test('homeDifference: diff follows the spec number format, ratio is always plain; resultUnit replaces the unit', () => {
  // A = 10 - 7.5 = 2.5, B = 10 - 1.25 = 8.75 -> gap 6.25, ratio 3.5
  assert.deepEqual(homeDifference(spec({ values: [7.5, 1.25] }), 10), { diff: '6.25 cm', ratio: '3.5' });
  // R5 three significant figures for diff, but the ratio stays plain (3.5, not 3.50)
  assert.equal(sig3(3.5), '3.50');
  // A = 2.25, B = 8.75 -> gap 6.5, ratio 3.888...
  assert.deepEqual(homeDifference(spec({ values: [7.75, 1.25] }), 10), { diff: '6.50 cm', ratio: '3.89' });
  assert.deepEqual(homeDifference(spec({ values: [7.75, 1.25], plainNumbers: true }), 10), { diff: '6.5 cm', ratio: '3.89' });
  assert.equal(homeDifference(spec({ resultUnit: 'per cm' }), 10).diff, '2 per cm');
  assert.equal(homeDifference(spec({ unit: '' }), 10).diff, '2 cm', 'the unit comes from the model result, not spec.unit');
});

test('homeDifference feeds {diff} and {ratio} in revealLine; an empty ratio is an empty string, not a raw token', () => {
  const s = spec({ revealLine: '{A} {resultA}, {B} {resultB}: {diff} apart, {ratio} times.' });
  assert.equal(homeRevealLine(s, 10), 'A choice 6 cm, B choice 8 cm: 2 cm apart, 1.33 times.');
  assert.equal(homeRevealLine({ ...s, values: [10, 2] }, 10), 'A choice 0 cm, B choice 8 cm: 8 cm apart,  times.');
});

/* ---------------------------------------------------------------- plainNumbers */

test('plainNumbers: up to two decimals, trailing zeros dropped, thousands separator, real minus sign', () => {
  const plain = spec({ plainNumbers: true });
  const cases = [[0.3, '0.3'], [4, '4'], [2.5, '2.5'], [1.96, '1.96'], [0.125, '0.13'], [1234.5, '1,234.5'], [-0.3, '−0.3'], [-1234, '−1,234'], [0, '0']];
  for (const [x, want] of cases) assert.equal(homeNumber(plain, x), want, `plain ${x}`);
  // float noise is snapped before formatting
  assert.equal(homeNumber(plain, 0.1 * 3), '0.3');
  assert.equal(homeNumber(plain, 2.9999999999999996), '3');
  // Known edge, pinned as it is today: a negative smaller than 0.005 prints "−0" (the sign is taken before rounding).
  // No W2 cell or reveal reaches it (see the W2 tests below); changing it is an engine change with its own readiness.
  assert.equal(homeNumber(plain, -0.001), '−0');
});

test('without plainNumbers the R5 format is unchanged (three significant figures)', () => {
  const r5 = spec();
  const cases = [[0.3, '0.300'], [4, '4'], [2.5, '2.50'], [1234.5, '1,230'], [0.05, '0.050'], [-0.3, '−0.300']];
  for (const [x, want] of cases) {
    assert.equal(homeNumber(r5, x), want, `R5 ${x}`);
    assert.equal(homeNumber(r5, x), sig3(x));
  }
});

test('plainNumbers reaches amount cells and the result cell; literal and empty cells are untouched', () => {
  const amounts = [
    { label: 'Weight', unit: 'kg', a: ['/', 'p', 2], b: ['/', 'p', 6] },
    { label: 'Note', unit: 'kg', a: 'flat', b: null },
    { label: 'Size', unit: 'kg', a: 'about 2', b: 'about 2' },
  ];
  const plain = spec({ plainNumbers: true, amounts, values: [7.5, 1.25] });
  const r5 = { ...plain, plainNumbers: false };
  assert.deepEqual(homeColumn(plain, 0.6, 'a').amounts, ['0.3 kg', 'flat', 'about 2 kg']);
  assert.deepEqual(homeColumn(plain, 0.6, 'b').amounts, ['0.1 kg', '–', 'about 2 kg']);
  assert.deepEqual(homeColumn(r5, 0.6, 'a').amounts, ['0.300 kg', 'flat', 'about 2 kg']);
  // result: 10 - 7.5 = 2.5
  assert.equal(homeColumn(plain, 10, 'a').result, '2.5 cm');
  assert.equal(homeColumn(r5, 10, 'a').result, '2.50 cm');
  // a signed verdict keeps its plus sign under plainNumbers
  const signed = { ...plain, verdict: { below: 'short', above: 'fits', zero: 'exact' } };
  assert.equal(homeColumn(signed, 10, 'a').result, '+2.5 cm · fits');
  assert.equal(homeColumn(signed, 5, 'a').result, '−2.5 cm · short');
});

/* ---------------------------------------------------------------- homeSliderMatters */

test('homeSliderMatters: true when the result moves with the slider, false when no cell in either column does', () => {
  assert.equal(homeSliderMatters(spec()), true);
  const fixed = spec({ resultText: { a: 'open', b: 'shut' }, amounts: [{ label: 'Count', unit: '', a: 3, b: ['*', 'a', 2] }] });
  assert.equal(homeSliderMatters(fixed), false);
  // a change in one column only still counts
  assert.equal(homeSliderMatters({ ...fixed, amounts: [{ label: 'Count', unit: '', a: 3, b: 'p' }] }), true);
});

test('homeSliderMatters samples the whole range, including the last step', () => {
  // floor(p / 10) changes only at p = 10
  const edge = (max) => spec({ resultText: { a: 'x', b: 'y' }, initial: 0, min: 0, max, step: 1,
    amounts: [{ label: 'Tens', unit: '', a: ['floor', ['/', 'p', 10]], b: 1 }] });
  assert.equal(homeSliderMatters(edge(10)), true, 'the change at max is seen');
  assert.equal(homeSliderMatters(edge(9)), false, 'no change in 0..9');
  // fractional steps: 0.3..0.9 by 0.1 reaches 0.9 despite float accumulation
  const frac = spec({ resultText: { a: 'x', b: 'y' }, initial: 0.3, min: 0.3, max: 0.9, step: 0.1,
    amounts: [{ label: 'Over', unit: '', a: ['floor', ['/', 'p', 0.9]], b: 1 }] });
  assert.equal(homeSliderMatters(frac), true);
  // a change that the cell format hides (below R5's three significant figures: 1,000.5 to 1,000.7 all read "1,000") is not a change
  const hidden = spec({ resultText: { a: 'x', b: 'y' }, initial: 0, min: 0, max: 2, step: 1,
    amounts: [{ label: 'Big', unit: '', a: ['+', 1000.5, ['*', 'p', 0.1]], b: 1 }] });
  assert.equal(homeSliderMatters(hidden), false);
  assert.equal(homeSliderMatters({ ...hidden, plainNumbers: true }), true, 'plain numbers show the change');
});

/* ---------------------------------------------------------------- wave W2 ratchet */

const W2 = ['towel-spread-dries-first', 'towel-over-two-bars', 'garment-overlap-hides-face', 'half-size-two-towels', 'humidity-evaporation-gap',
  'breeze-is-not-extra-surface', 'folded-shirt-stack-height', 'wet-knit-hang-stretch', 'drying-room-water-load'];
const steps = (s) => Array.from({ length: Math.round((s.max - s.min) / s.step) + 1 }, (_, i) => s.min + i * s.step);

test('wave W2 (v2 stage): every slider step resolves every reveal token, a used {ratio} is never empty, sliders stay', () => {
  for (const slug of W2) {
    const s = homeLessons.find((l) => l.slug === slug);
    assert.ok(s, slug);
    assert.equal(s.engine, 2, `${slug} is on engine 2`);
    assert.equal(homeSliderMatters(s), true, `${slug} keeps its slider`);
    for (const p of steps(s)) {
      const line = homeRevealLine(s, p);
      assert.doesNotMatch(line, /\{\w+\}/, `${slug} at ${p}: no raw token`);
      assert.doesNotMatch(line, /NaN|Infinity|undefined/, `${slug} at ${p}`);
      const d = homeDifference(s, p);
      if (s.revealLine?.includes('{ratio}')) {
        assert.notEqual(d.ratio, '', `${slug} at ${p}: {ratio} is used, so the smaller result must not be zero`);
        // {ratio} compares sizes; across a sign change "n times" would mislead, so both results keep one sign
        const ra = evaluateHome(s, p, false).value, rb = evaluateHome(s, p, true).value;
        assert.ok(ra * rb > 0, `${slug} at ${p}: results ${ra} and ${rb} share a sign`);
      }
      if (s.revealLine?.includes('{diff}')) assert.doesNotMatch(d.diff, /^−/, `${slug} at ${p}`);
    }
  }
});

test('wave W2: the plain-number lessons show no R5 trailing zeros in any cell or reveal', () => {
  for (const slug of W2) {
    const s = homeLessons.find((l) => l.slug === slug);
    if (!s.plainNumbers) continue;
    for (const p of steps(s)) {
      const cells = ['a', 'b'].flatMap((m) => { const c = homeColumn(s, p, m); return [...c.amounts, c.result]; });
      for (const cell of [...cells, homeRevealLine(s, p)]) assert.doesNotMatch(cell, /\d\.\d*0(?!\d)/, `${slug} at ${p}: "${cell}"`);
    }
  }
});
