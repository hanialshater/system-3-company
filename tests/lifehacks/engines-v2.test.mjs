// Life Hacks engines v2 (W-608, company/design/specs/lifehacks-engines-v2.md). Expected numbers below are
// written out by hand from the content patch (company/reviews/lifehacks-200/content-patch-r9-batch-d.md),
// not recomputed with the engine's own formulas.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateExpr, sig3, amountCell, homeColumn, homeRevealLine, homeV2Problems, studyColumn, studyRevealLine, studyV2Problems, scheduleColumn, scheduleRows, calendarClashes, recallColumn, STUDY_V2_FAMILIES } from '../../src/lib/lifehacks/engine-v2.ts';
import { studyCatalog } from '../../src/lib/lifehacks/studyCatalog.ts';

const read = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const homeSource = read('src/lib/lifehacks/home-lessons.ts');
const home = JSON.parse(homeSource.slice(homeSource.indexOf('= [') + 2, homeSource.lastIndexOf(';')));
const getHome = slug => home.find(s => s.slug === slug);
const study = Object.values(studyCatalog);
const BATCH_D_HOME = ['bag-weight-before-volume', 'box-handle-clearance', 'circle-tray-square-corners', 'coiled-cord-bend-radius', 'desk-supply-near-use'];
// Home lessons moved to engine 2 by the r11 fix plan, one list per wave (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md,
// section 5). The inventory stays exact on purpose: adding a wave here is the deliberate acknowledgement that it moved.
// Every slug must also sit in that wave's table in the plan, so a lesson the plan does not name cannot be listed.
const FIX_PLAN = read('company/decisions/2026-10-15-lifehacks-r11-fix-plan.md');
const R11_WAVES_HOME = {
  W2: ['breeze-is-not-extra-surface', 'drying-room-water-load', 'folded-shirt-stack-height', 'garment-overlap-hides-face', 'half-size-two-towels', 'humidity-evaporation-gap', 'square-bow-stays-tied', 'towel-over-two-bars', 'towel-spread-dries-first', 'wet-knit-hang-stretch',
    // B4 (2026-10-16, content-patch-2026-10-16-r2.md 1D): two of the three W2 lines that did not fit, now on engine 2
    'care-label-first-choice', 'towel-thickness-hidden-volume',
    // lhfix-r3 (2026-10-16, content-patch-2026-10-16-r3.md D1): the third, on engine 2 with the rail varied instead of the count
    'laundry-gap-air-path'],
  W3: ['elastic-loop-release', 'fitted-sheet-corners-nest', 'group-cables-with-ends', 'jacket-last-first', 'long-cord-knots-itself', 'shoes-opposite-ends', 'sock-pairing-by-pattern', 'sock-pairs-not-all-combinations', 'socks-use-shoe-space', 'suitcase-layer-access', 'tote-balance-sides'],
};
const V2_HOME = [...BATCH_D_HOME, ...Object.values(R11_WAVES_HOME).flat()].sort();
const planWaveSlugs = wave => {
  const start = FIX_PLAN.indexOf(`### ${wave}: Home lane`);
  assert.ok(start >= 0, `fix plan has a Home-lane section for ${wave}`);
  const end = FIX_PLAN.indexOf('\n### ', start + 1);
  return [...FIX_PLAN.slice(start, end < 0 ? undefined : end).matchAll(/^\| ([a-z0-9-]+) \|/gm)].map(m => m[1]);
};
const BATCH_D_STUDY = ['agenda-needs-an-outcome', 'apply-not-quote', 'buffer-for-a-late-finish', 'calendar-needs-travel', 'check-confidence-with-output', 'count-setup-in-the-block', 'cue-needs-a-boundary', 'deadline-needs-a-reference', 'deleted-is-a-search-state'];
// v2-only Home fields: the hand list, plus every field declared in HomeV2Fields, so a field added to the engine is
// covered without a test edit. The hand list must stay inside the interface (catches a rename or a broken parse).
const V2_KEYS_HOME_LISTED = ['engine', 'modeLabels', 'options', 'amounts', 'resultLabel', 'resultUnit', 'verdict', 'verdictByMode', 'resultText', 'revealLine', 'pictureMark', 'plainNumbers'];
const engineSource = read('src/lib/lifehacks/engine-v2.ts');
const homeV2Body = engineSource.slice(engineSource.indexOf('export interface HomeV2Fields {'), engineSource.indexOf('\n}', engineSource.indexOf('export interface HomeV2Fields {')));
const V2_KEYS_HOME_DECLARED = [...homeV2Body.matchAll(/^  (\w+)\?:/gm)].map(m => m[1]);
const V2_KEYS_HOME = [...new Set([...V2_KEYS_HOME_LISTED, ...V2_KEYS_HOME_DECLARED])];
const V2_KEYS_STUDY = ['engine', 'modeLabels', 'optionToMode', 'amounts', 'consequence', 'exploreHint', 'event', 'candidates', 'rowLabels', 'hideTarget', 'aFields'];

test('expressions take named variables; literal text is not a number', () => {
  assert.equal(evaluateExpr(['+', 'a', ['*', 2, 'b']], { a: 40, b: 3 }), 46);
  assert.equal(evaluateExpr(['floor', ['/', 'p', 'a']], { p: 30, a: 10 }), 3);
  assert.throws(() => evaluateExpr('10 of 20', { p: 1 }));
  assert.equal(amountCell('10 of 20', 'L', { p: 4 }), '10 of 20 L');
  assert.equal(amountCell('not weighed', 'kg', { p: 4 }), 'not weighed');
});
test('R5 number format: three significant figures, 1/20 and 1/22 differ, a real minus sign', () => {
  assert.equal(sig3(1 / 20), '0.050'); assert.equal(sig3(1 / 22), '0.045'); assert.equal(sig3(0.1), '0.100');
  assert.equal(sig3(62.8318), '62.8'); assert.equal(sig3(125.66), '126'); assert.equal(sig3(3.1831), '3.18');
  assert.equal(sig3(48), '48'); assert.equal(sig3(-4), '−4');
});

test('v2 field lists: HomeV2Fields declares every listed Home key', () => {
  assert.deepEqual(V2_KEYS_HOME_LISTED.filter(k => !V2_KEYS_HOME_DECLARED.includes(k)), []);
});

test('each r11 wave lists only lessons that the fix plan puts in that wave', () => {
  for (const [wave, slugs] of Object.entries(R11_WAVES_HOME)) {
    const planned = planWaveSlugs(wave);
    assert.deepEqual(slugs.filter(slug => !planned.includes(slug)), [], `${wave}: not in the fix plan's ${wave} table`);
  }
});

test('exactly batch D and the listed r11 waves are on engine 2; every other lesson carries no v2 field (renders as v1)', () => {
  assert.deepEqual(home.filter(s => s.engine === 2).map(s => s.slug).sort(), V2_HOME);
  assert.deepEqual(study.filter(s => s.engine === 2).map(s => s.slug).sort(), BATCH_D_STUDY);
  for (const s of home) if (s.engine !== 2) assert.deepEqual(V2_KEYS_HOME.filter(k => k in s), [], s.slug);
  for (const s of study) if (s.engine !== 2) {
    assert.deepEqual(V2_KEYS_STUDY.filter(k => k in s), [], s.slug);
    if (s.family === 'schedule') assert.ok(s.rows.every(r => !('parts' in r)) && typeof s.button === 'string', s.slug);
  }
  const resource = JSON.parse(read('src/lib/lifehacks/resource-specs.json'));
  assert.equal(resource.filter(s => s.engine === 2).length, 0, 'Resource v2 is not built yet');
});

test('v2 specs have the section 8 required fields, the answer is one of the options, and no option repeats a button label (R7)', () => {
  for (const s of home.filter(s => s.engine === 2)) {
    assert.deepEqual(homeV2Problems(s), [], s.slug);
    // W-1247 (PE-ops W3 condition 1): the Home twin of the Study check below. Two-option lines arrived in W3.
    assert.ok(Number.isInteger(s.answer) && s.answer >= 0 && s.answer < s.options.length, `${s.slug}: answer ${s.answer} is not one of its ${s.options?.length} options`);
  }
  for (const s of study.filter(s => s.engine === 2)) {
    assert.deepEqual(studyV2Problems(s), [], s.slug);
    assert.ok(STUDY_V2_FAMILIES.includes(s.family), s.slug);
    assert.ok(s.answer >= 0 && s.answer < s.options.length, s.slug);
  }
});

test('Home v2: every amount and result is finite at min, initial and max in both modes, and the reveal resolves', () => {
  for (const s of home.filter(s => s.engine === 2)) for (const p of [s.min, s.initial, s.max]) for (const m of ['a', 'b']) {
    const c = homeColumn(s, p, m);
    assert.equal(c.amounts.length, s.amounts.length);
    for (const cell of [...c.amounts, c.result]) assert.ok(cell && !/NaN|Infinity|undefined/.test(cell), `${s.slug} ${p} ${m}: ${cell}`);
    const line = homeRevealLine(s, p);
    assert.ok(!/[{}]|NaN|undefined/.test(line), line);
  }
});

test('Home v2 batch D numbers match the patch tables', () => {
  const col = (slug, p, m) => homeColumn(getHome(slug), p, m);
  assert.deepEqual(col('box-handle-clearance', 42, 'a'), { amounts: ['40 cm'], result: '+2 cm · fits', spoken: '+2 cm (fits)' });
  assert.equal(col('box-handle-clearance', 42, 'b').amounts[0], '46 cm');
  assert.equal(col('box-handle-clearance', 42, 'b').result, '−4 cm · too wide');
  assert.equal(col('box-handle-clearance', 46, 'b').result, '0 cm · exact fit');
  assert.deepEqual(col('bag-weight-before-volume', 4, 'a'), { amounts: ['10 of 20 L', 'not weighed'], result: 'looks fine (not weighed)', spoken: 'looks fine (not weighed)' });
  assert.deepEqual(col('bag-weight-before-volume', 4, 'b').amounts, ['10 of 20 L', '6 kg']);
  assert.equal(col('bag-weight-before-volume', 4, 'b').result, '1 kg · over');
  assert.equal(col('bag-weight-before-volume', 2, 'b').result, '0 kg · within limit');
  assert.equal(col('circle-tray-square-corners', 28, 'a').result, '4 discs');
  assert.equal(col('circle-tray-square-corners', 28, 'b').result, '4 discs');
  assert.equal(col('circle-tray-square-corners', 30, 'a').result, '9 discs'); // both columns are live: "both 9"
  assert.equal(col('circle-tray-square-corners', 30, 'b').result, '9 discs');
  assert.deepEqual(col('coiled-cord-bend-radius', 10, 'a').amounts, ['62.8 cm', '3.18']);
  assert.deepEqual(col('coiled-cord-bend-radius', 10, 'b').amounts, ['126 cm', '1.59']);
  assert.equal(col('coiled-cord-bend-radius', 10, 'a').result, '0.100 per cm · sharper');
  assert.equal(col('coiled-cord-bend-radius', 10, 'b').result, '0.050 per cm · gentler');
  assert.equal(col('coiled-cord-bend-radius', 20, 'a').result, '0.050 per cm · sharper'); // per-mode word, not a threshold
  assert.deepEqual(col('desk-supply-near-use', 4, 'a'), { amounts: ['8 m'], result: '48 m', spoken: '48 m' });
  assert.equal(col('desk-supply-near-use', 4, 'b').result, '0 m');
  assert.equal(col('desk-supply-near-use', 5, 'a').result, '60 m');
});

test('Study v2: schedule overruns, named clashes and the movable gap', () => {
  const buffer = studyCatalog['buffer-for-a-late-finish'];
  assert.deepEqual(scheduleRows(buffer, [0, 20, 35]).map(r => r.duration), [25, 15, 10]);
  assert.deepEqual(studyColumn(buffer, 'a'), { amounts: [['Gap before call', '0 min']], result: ['Overlap', '5 min (draft × call)'] });
  assert.deepEqual(studyColumn(buffer, 'b'), { amounts: [['Gap before call', '5 min']], result: ['Overlap', '0 min'] });
  const travel = studyCatalog['calendar-needs-travel'];
  assert.deepEqual(studyColumn(travel, 'a').result, ['Overlap', '5 min (travel × meeting)']);
  assert.equal(studyColumn(travel, 'a').amounts[0][1], '5 min short');
  assert.deepEqual(scheduleColumn(travel, [0, 30, 35], null).result, ['Overlap', '10 min (meeting × email)']);
  assert.deepEqual(calendarClashes([{ label: 'x', start: 0, duration: 10 }, { label: 'y', start: 10, duration: 5 }]), []);
  const setup = studyCatalog['count-setup-in-the-block'];
  assert.equal(setup.rows[0].parts.reduce((t, p) => t + p.minutes, 0), setup.rows[0].duration);
  assert.deepEqual(studyColumn(setup, 'a'), { amounts: [['Booked for the task', '10 min']], result: ['Overlap', '5 min (task × call)'] });
  assert.deepEqual(studyColumn(setup, 'b').result, ['Overlap', '0 min']);
});

test('Study v2: files, message and recall columns', () => {
  assert.deepEqual(studyColumn(studyCatalog['deleted-is-a-search-state'], 'a'), { amounts: [['Not in results', '1']], result: ['Matches', '2'] });
  assert.deepEqual(studyColumn(studyCatalog['deleted-is-a-search-state'], 'b'), { amounts: [['Not in results', '0']], result: ['Matches', '3'] });
  const agenda = studyCatalog['agenda-needs-an-outcome'];
  assert.deepEqual(studyColumn(agenda, 'a').result, ['Fields', '1/3']);
  assert.deepEqual(studyColumn(agenda, 'b').amounts, [['The room knows', 'the topic, the choice, who decides (Bo)']]);
  const deadline = studyCatalog['deadline-needs-a-reference'];
  assert.deepEqual(studyColumn(deadline, 'a').result, ['Fields', '2/3']);
  assert.deepEqual(studyColumn(deadline, 'a').amounts, [['Your colleague aims for', '06:00 UTC, 9 h early']]);
  const sure = studyCatalog['check-confidence-with-output'];
  assert.deepEqual(studyColumn(sure, 'a').result, ['Match', 'not checked']);
  assert.deepEqual(studyColumn(sure, 'b').result, ['Match', '0/3']);
  assert.deepEqual(recallColumn(sure, 'yours', [0, 1, 2]).result, ['Match', '3/3']);
  const cue = studyCatalog['cue-needs-a-boundary'];
  assert.equal(cue.family, 'recall', 'W-610 open: the files-family move is not applied');
  assert.deepEqual(studyColumn(cue, 'a').amounts, [['Answers this cue fits', '3']]);
  assert.deepEqual(studyColumn(cue, 'b').amounts, [['Answers this cue fits', '1']]);
  assert.equal(studyCatalog['apply-not-quote'].hideTarget, true);
});

test('Study v2 reveal quotes the predicted column first, and Yours only when it differs from both', () => {
  const buffer = studyCatalog['buffer-for-a-late-finish'];
  assert.match(studyRevealLine(buffer, 2, null), /^5-min gap: .*Touching: /);
  assert.match(studyRevealLine(buffer, 1, null), /^Touching: .*5-min gap: /);
  const same = scheduleColumn(buffer, buffer.target, null);
  assert.doesNotMatch(studyRevealLine(buffer, 2, same), /Yours/);
  assert.match(studyRevealLine(buffer, 2, scheduleColumn(buffer, [0, 27, 45], null)), /Yours: gap before call 7 min; overlap 0 min\.$/);
});

test('the new learner-visible sentences are recorded as claims, versions bumped', () => {
  for (const slug of [...BATCH_D_HOME, ...BATCH_D_STUDY]) {
    const meta = JSON.parse(read(`src/demos/lifehacks/${slug}/meta.json`));
    const seen = meta.claims.find(c => c.id === `lifehacks.${slug}.seen`);
    assert.ok(seen && seen.id && seen.text && seen.support && seen.source, slug);
    const spec = getHome(slug) ?? studyCatalog[slug];
    const line = getHome(slug) ? homeRevealLine(spec, spec.initial) : studyRevealLine(spec, Math.max(0, spec.optionToMode.indexOf('a')), null);
    assert.ok(seen.text.endsWith(line), `${slug}: the seen claim matches the engine's sentence`);
    assert.equal(meta.title, spec.title, slug); assert.equal(meta.hook, spec.hook, slug);
    assert.ok(meta.version >= 2, slug);
  }
});

test('v1 lessons still on default predict options (cm-lifehacks writes them in batches of 20, W-613)', t => {
  const leaking = home.filter(s => s.engine !== 2 && !s.options).map(s => s.slug);
  t.diagnostic(`${leaking.length} Home lessons still build options from button labels: ${leaking.join(', ')}`);
  assert.equal(leaking.length, home.length - V2_HOME.length);
});
