import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateResource, resourcePair, resourceAmount, resourceGraphicScale, resourceAxisEnd, resourceCylinderDimensions } from '../../src/lib/lifehacks/resource-model.ts';
const specs = JSON.parse(readFileSync(new URL('../../src/lib/lifehacks/resource-specs.json', import.meta.url), 'utf8'));
const get = slug => {
  const spec = specs.find(item => item.slug === slug);
  assert.ok(spec, slug);
  return spec;
};
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test('sixty distinct objectives cover seven visible interaction families', () => {
  assert.equal(specs.length, 60);
  assert.equal(new Set(specs.map(s => s.slug)).size, 60);
  assert.equal(new Set(specs.map(s => s.objective)).size, 60);
  assert.equal(new Set(specs.map(s => s.family)).size, 7);
  for (const spec of specs) {
    assert.ok(spec.title.length <= 40);
    assert.ok(spec.hook.length <= 90);
    assert.ok(spec.variable.start + spec.variable.step * 2 <= spec.variable.max);
    for (let x = spec.variable.min; x <= spec.variable.max; x += spec.variable.step) {
      assert.ok(resourcePair(spec, x).every(Number.isFinite), `${spec.slug} at ${x}`);
    }
  }
});

test('same units expose the big pack and 100g-label traps', () => {
  const [small, large] = resourcePair(get('lh-big-pack-price'), 6);
  near(small, 6); near(large, 20 / 3);
  const [per100g, perKg] = resourcePair(get('lh-align-price-units'), 7);
  assert.deepEqual([per100g, perKg], [8, 7]);
  near(resourcePair(get('lh-count-sheets-not-rolls'), 240)[0], 1 / 120);
  near(resourcePair(get('lh-count-sheets-not-rolls'), 240)[1], 1 / 192);
});

test('checkout thresholds and bundle remainders use their declared boundaries', () => {
  assert.deepEqual(resourcePair(get('lh-voucher-minimum'), 29), [29, 29]);
  assert.deepEqual(resourcePair(get('lh-voucher-minimum'), 30), [30, 25]);
  assert.deepEqual(resourcePair(get('lh-free-shipping-gap'), 42), [46, 50]);
  assert.deepEqual(resourcePair(get('lh-free-shipping-gap'), 49), [53, 50]);
  assert.deepEqual(resourcePair(get('lh-free-shipping-gap'), 50), [50, 50]);
  assert.deepEqual(resourcePair(get('lh-free-shipping-gap'), 54), [54, 54]);
  assert.deepEqual(resourcePair(get('lh-ticket-bundle-unused'), 6), [12, 16]);
  assert.deepEqual(resourcePair(get('lh-two-for-one-boundary'), 3), [9, 8]);
});

test('sequential percentages preserve the changing base', () => {
  near(resourcePair(get('lh-sequential-discounts'), 100)[0], 72);
  near(resourcePair(get('lh-sequential-discounts'), 100)[1], 70);
  near(resourcePair(get('lh-discount-round-trip'), 100)[1], 96);
  assert.deepEqual(resourcePair(get('lh-fixed-coupon-percent'), 25), [20, 20]);
});

test('allocation keeps discrete leftovers and repeat allowances', () => {
  assert.deepEqual(resourcePair(get('lh-scale-recipe-portions'), 6), [450, 300]);
  assert.deepEqual(resourcePair(get('lh-round-snack-packs'), 7), [30, 21]);
  assert.deepEqual(resourcePair(get('lh-indivisible-shares'), 10), [9, 10]);
  assert.deepEqual(resourcePair(get('lh-percentage-overage'), 40), [44, 50]);
  near(resourcePair(get('lh-each-cut-allowance'), 6)[0], 7.5);
  near(resourcePair(get('lh-each-cut-allowance'), 6)[1], 7.25);
});

test('inventory subtracts usable and committed counts, then rounds purchases', () => {
  assert.deepEqual(resourcePair(get('lh-buy-only-stock-gap'), 4), [0, 4]);
  assert.deepEqual(resourcePair(get('lh-committed-stock'), 10), [4, 10]);
  assert.deepEqual(resourcePair(get('lh-round-replenishment'), 12), [12, 9]);
  assert.deepEqual(resourcePair(get('lh-round-replenishment'), 3), [0, 0]);
  assert.deepEqual(resourcePair(get('lh-pool-spare-stock'), 10), [8, 3]);
  assert.deepEqual(resourcePair(get('lh-merge-overlapping-lists'), 8), [14, 11]);
  assert.deepEqual(resourcePair(get('lh-use-deadline-tickets'), 4), [2, 6]);
  assert.deepEqual(resourcePair(get('lh-count-before-dispatch'), 10), [5, 7]);
});

test('constant-load energy scenarios use watts, hours, duty and explicit charges', () => {
  assert.deepEqual(resourcePair(get('lh-watts-hours-trade'), 1), [0.1, 0.1]);
  assert.deepEqual(resourcePair(get('lh-idle-versus-active'), 5), [0.6, 0.33]);
  assert.deepEqual(resourcePair(get('lh-standby-days-add-up'), 365), [17.52, 0.73]);
  assert.deepEqual(resourcePair(get('lh-duty-cycle-energy'), 8), [0.2, 0.8]);
  assert.deepEqual(resourcePair(get('lh-fixed-energy-charge'), 100), [30, 30]);
  assert.deepEqual(resourcePair(get('lh-purchase-plus-running'), 2), [152, 176]);
  assert.deepEqual(resourcePair(get('lh-purchase-plus-running'), 4), [224, 212]);
});

test('fixed-duration flow and fixed-volume filling are different quantities', () => {
  assert.deepEqual(resourcePair(get('lh-flow-times-minutes'), 4), [24, 12]);
  assert.deepEqual(resourcePair(get('lh-flow-duration-offset'), 2), [24, 24]);
  assert.deepEqual(resourcePair(get('lh-fixed-volume-fill'), 10), [2, 4]);
  assert.deepEqual(resourcePair(get('lh-small-leak-large-duration'), 5), [7.2, 0.3]);
  assert.deepEqual(resourcePair(get('lh-water-meter-units'), 1500), [1.5, 1500]);
});

test('geometry uses internal dimensions, squared radii, openings and paths', () => {
  assert.deepEqual(resourcePair(get('lh-turn-container-volume'), 15), [3, 3]);
  const [small, large] = resourcePair(get('lh-double-container-radius'), 10);
  near(small, Math.PI * 0.09); near(large, Math.PI * 0.36); near(large / small, 4);
  assert.deepEqual(resourcePair(get('lh-area-scales-square'), 2), [4, 16]);
  assert.deepEqual(resourcePair(get('lh-subtract-openings-area'), 4), [10, 12]);
  assert.deepEqual(resourcePair(get('lh-overlap-material-area'), 30), [640, 600]);
  assert.deepEqual(resourcePair(get('lh-around-versus-across'), 4), [14, 5]);
});

test('reuse boundaries include odd sheets, separate offcuts and declared material limits', () => {
  assert.deepEqual(resourcePair(get('lh-duplex-sheet-rounding'), 7), [7, 4]);
  assert.deepEqual(resourcePair(get('lh-offcuts-not-one-piece'), 60), [60, 120]);
  assert.deepEqual(resourcePair(get('lh-material-reuse-account'), 10), [220, 200]);
  assert.deepEqual(resourcePair(get('lh-reuse-cost-per-use'), 60), [0.2, 0.2]);
});

test('fixed picture scales preserve growth and actual energy-axis durations', () => {
  const flow = get('lh-flow-times-minutes');
  assert.equal(resourceGraphicScale(flow), 72);
  assert.equal(resourcePair(flow, 4)[0] / resourceGraphicScale(flow), 1 / 3);
  assert.equal(resourcePair(flow, 6)[0] / resourceGraphicScale(flow), 1 / 2);
  assert.equal(resourceGraphicScale(get('lh-lead-time-stock')), 48);
  assert.equal(resourceAxisEnd(get('lh-watts-hours-trade'), 0, 3), '0→3h');
  assert.equal(resourceAxisEnd(get('lh-watts-hours-trade'), 1, 3), '0→15h');
  assert.equal(resourceAxisEnd(get('lh-annual-label-cost'), 0, 2), '0→2years');
});

test('cylinder projected bases preserve fourfold area at doubled radius', () => {
  const a = resourceCylinderDimensions(0, 12);
  const b = resourceCylinderDimensions(1, 12);
  assert.deepEqual(a, { rx: 21, ry: 9, height: 48 });
  assert.deepEqual(b, { rx: 42, ry: 18, height: 48 });
  assert.equal(b.rx * b.ry / (a.rx * a.ry), 4);
});

test('revised transfer recalls require scaling, an equality and stock-at-ordering meaning', () => {
  assert.equal(get('lh-scale-recipe-portions').recall.options[0], '750g');
  assert.equal(get('lh-lead-time-stock').recall.options[0], '32 units');
  assert.equal(get('lh-reuse-cost-per-use').recall.options[0], '90 uses');
  assert.equal(get('lh-reuse-cost-per-use').variable.start, 50);
  near(resourcePair(get('lh-reuse-cost-per-use'), 50)[0], 0.24);
  assert.deepEqual(resourcePair(get('lh-reuse-cost-per-use'), 60), [0.2, 0.2]);
  assert.match(get('lh-lead-time-stock').question, /on hand when ordering/);
  assert.doesNotMatch(get('lh-lead-time-stock').question, /reorder trigger/);
});

test('decimal rounding follows the declared half-up toy convention', () => {
  assert.deepEqual(resourcePair(get('lh-round-lines-versus-total'), 3), [1.02, 1.01]);
  assert.deepEqual(resourcePair(get('lh-billing-rounds-hours'), 3.5), [16, 20]);
  assert.deepEqual(resourcePair(get('lh-cents-euros-conversion'), 125), [1.25, 12.5]);
  assert.equal(resourceAmount(28.000000000000004, '%'), '28%');
  assert.equal(evaluateResource(['max', 0, ['-', 'x', 7]], 4), 0);
});

test('builder leaves every lesson in review with independent gates outstanding', () => {
  for (const spec of specs) {
    const meta = JSON.parse(readFileSync(new URL(`../../src/demos/lifehacks/${spec.slug}/meta.json`, import.meta.url), 'utf8'));
    assert.equal(meta.status, 'review');
    assert.equal(meta.confidence, '');
    assert.equal(meta.owner.builder, 'demo-builder');
    assert.ok(meta.claims.length >= 4);
    assert.ok(meta.claims.every(claim => claim.status === 'unverified' && claim.id.startsWith(`lifehacks.${spec.slug}.`)));
    assert.ok(Object.values(meta.evidence).every(records => records.length === 0));
    assert.equal(meta.safety.reviewRequired, true);
    // Printed stage labels, two formulas, controls and model assumptions stay compact.
    const stageWords = `A: ${spec.aLabel} ? formula B: ${spec.bLabel} ? formula ${spec.assumptions} Test A Test B ${spec.variable.label} 1${spec.variable.unit}`.split(/\s+/).length + (spec.family === 'energy' ? 4 : 0);
    assert.ok(stageWords <= 25, `${spec.slug}: ${stageWords} stage words`);
    const revealWords = `At the prediction’s 1${spec.variable.unit}, A gives 1${spec.unit} and B gives 1${spec.unit}. Your stage now uses 1${spec.variable.unit}: A 1${spec.unit}, B 1${spec.unit}. ${spec.principle}`.split(/\s+/).length;
    assert.ok(revealWords <= 90, `${spec.slug}: ${revealWords} reveal words`);
  }
});
