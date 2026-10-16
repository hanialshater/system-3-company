// Content patch r3 (cm-lifehacks, 2026-10-16): the spec fields this patch changes, run through the engine's own
// evaluateHome / homeColumn / homeRevealLine, plus the W2-style every-step ratchet. Read-only: it edits nothing.
// Run from the repo root:
//   node --import ./tests/lifehacks/register.mjs company/reviews/lifehacks-200/content-patch-2026-10-16-r3.run.mjs [git-ref]
// git-ref (default HEAD) is where home-lessons.ts is read from; the engine is the working tree's.
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const ref = process.argv[2] ?? 'HEAD';
const lib = (f) => pathToFileURL(path.join(root, 'src/lib/lifehacks', f)).href;
const { homeColumn, homeRevealLine, homeSliderMatters, homeV2Problems, homeResultLabel } = await import(lib('engine-v2.ts'));
const { evaluateHome } = await import(lib('home-models.ts'));
const text = execFileSync('git', ['show', `${ref}:src/lib/lifehacks/home-lessons.ts`], { cwd: root, encoding: 'utf8' });
const specs = JSON.parse(text.slice(text.indexOf('= [') + 2, text.lastIndexOf('];') + 1));

const AB = ['-', 'p', ['*', 'a', 'b']];
/** Spec fields set by this patch (H rows). Meta-only rows are in the .md, not here. */
export const PATCH = {
  'laundry-gap-air-path': { ps: [48, 60, 45, 80], set: {
    engine: 2, initial: 48, inputLabel: 'Rail width', plainNumbers: true,
    title: 'Room between the shirts',
    hook: 'Same five shirts, shorter rail. What happens to the space between them?',
    question: 'Five shirts on a 60 cm rail have 5 cm between neighbours. Move them to a 48 cm rail: how much gap is left?',
    modeLabels: ['Pushed together', 'Spread evenly'],
    options: ['None: they touch', '2 cm', '5 cm: same five shirts'], answer: 1,
    amounts: [{ label: 'Rail width', unit: 'cm', a: 'p', b: 'p' }, { label: 'Rail left after the shirts', unit: 'cm', a: AB, b: AB }],
    resultLabel: 'Gap between neighbours',
    revealLine: '{B}: five 8 cm shirts use 40 cm of the {amountB0} rail. The {amountB1} left is shared by 4 gaps: {resultB} each. {A}: {resultA} between neighbours, so no gap is open.',
    idea: 'Five shirts always take 40 cm of rail. Only the rail left over is shared out as gaps, so a shorter rail shrinks every gap, even with the same five shirts. At 0 cm, neighbours touch and no open path is left between them.',
    formula: 'Gap=(rail width−5×8)/4 cm; shirts 8 cm wide. Channels count only when the gap is above 0.',
  } },
  'towel-thickness-hidden-volume': { ps: [2, 1], set: {
    idea: 'Twice as thick at the same width and length means twice the cloth, but the open face is still the same two sides. So each cm³ of cloth gets half as much open face.',
    limit: 'Open face per cm³ of cloth does not, on its own, set a towel’s drying time.',
    formula: 'Open face=2×50×100 cm²; cloth=50×100×thickness/10 cm³, doubled when twice as thick. Open face per cm³=open face÷cloth.',
    recall: 'Same size cloth, twice as thick: what happens to the open face each cm³ of cloth gets?',
  } },
  'tote-balance-sides': { ps: [3, 5, 1], set: {
    idea: 'The heavier side pulls the balance point towards it, and the bag tilts until that point is under the handle. Even the sides out, half the total on each, and the balance point is already under the handle: 3 kg and 1 kg become 2 kg each, 5 kg and 1 kg become 3 kg each. The bag hangs straight, and it weighs the same.',
  } },
  'elastic-loop-release': { ps: [20], set: {
    resultLabel: 'Hair ties on the cord',
    revealLine: '{A}: there is no knot to undo, so the hair tie stays {amountA0}. Hair ties on the cord: {resultA}. {B}: it slides {amountB0}, and nothing is cut. Hair ties on the cord: {resultB}.',
    formula: 'Hair ties on the cord=1 while the tie is round the cord, 0 once it has slid off the free end; nothing is cut and the elastic is not stretched.',
  } },
  'sock-pairs-not-all-combinations': { ps: [6, 10, 4, 8], set: {
    title: 'Ten socks: how many pairings?',
    hook: 'More socks in the pile. How fast do the possible two-sock pairings grow?',
    question: 'Six black socks from three people look alike, but only the true pairs match. They make 15 possible two-sock pairings. Ten socks from five people: how many?',
    options: ['25: in step with the socks', '45', '90'], answer: 1,
    resultLabel: 'Possible pairings',
    revealLine: '{A}: {amountA0} socks make {resultA} possible two-sock pairings. {B}: {resultB}, one per pair.',
    idea: 'Each sock can go with any of the others, so six socks make 15 pairings (5 + 4 + 3 + 2 + 1) and ten make 45 (9 + 8 + … + 1). You never test them all, because a sock leaves the pile once it is matched, but each extra sock adds a pairing with every sock already there, so the pairings grow faster than the socks. A mark on each pair leaves one pairing per pair.',
    limit: 'This counts possible pairings, not the tries it takes you: a matched sock leaves the pile. Socks that really are identical pair up any way.',
    formula: 'Possible pairings=N(N−1)/2 unmarked versus N/2 marked pairs; N is an even sock count, 4 to 10.',
  } },
};

const steps = (s) => Array.from({ length: Math.round((s.max - s.min) / s.step) + 1 }, (_, i) => s.min + i * s.step);
let failed = 0;
for (const [slug, { ps, set }] of Object.entries(PATCH)) {
  const base = specs.find((s) => s.slug === slug);
  if (!base) { console.log(`${slug}: not in ${ref}`); failed++; continue; }
  const spec = { ...base, ...set };
  console.log(`\n### ${slug} @ ${ref}  problems=${JSON.stringify(homeV2Problems(spec))} sliderMatters=${homeSliderMatters(spec)} key="${spec.options?.[spec.answer]}" (answer ${spec.answer} of ${spec.options?.length}) title=${spec.title.length}ch hook=${spec.hook.length}ch`);
  for (const p of ps) {
    const a = homeColumn(spec, p, 'a'), b = homeColumn(spec, p, 'b');
    console.log(`p=${p}  evaluateHome A=${evaluateHome(spec, p, false).value} B=${evaluateHome(spec, p, true).value} | ${homeResultLabel(spec, p)} | A ${JSON.stringify(a.amounts)} ${a.result} | B ${JSON.stringify(b.amounts)} ${b.result}`);
    console.log(`   homeRevealLine: ${homeRevealLine(spec, p)}`);
  }
  const bad = [];
  for (const p of steps(spec)) {
    const line = homeRevealLine(spec, p);
    if (/\{\w+\}|NaN|Infinity|undefined/.test(line)) bad.push(`${p}: ${line}`);
    if (spec.plainNumbers) for (const c of [...['a', 'b'].flatMap((m) => { const c = homeColumn(spec, p, m); return [...c.amounts, c.result]; }), line]) if (/\d\.\d*0(?!\d)/.test(c)) bad.push(`${p}: "${c}"`);
  }
  if (spec.title.length > 40 || spec.hook.length > 90) bad.push('title > 40 or hook > 90');
  if (spec.options && !(spec.answer >= 0 && spec.answer < spec.options.length)) bad.push('answer out of range');
  console.log(`   ratchet (${steps(spec).length} slider steps): ${bad.length ? 'FAIL ' + bad.join(' | ') : 'ok'}`);
  failed += bad.length;
}
process.exitCode = failed ? 1 : 0;
