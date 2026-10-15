// Unit tests for the Study TP-3/TP-4/TP-5 engine functions (W-1137): the condition-1 tests of
// company/engineering/readiness/2026-10-15-lifehacks-study-tp3-tp4-tp5.md.
// Expected values are worked out by hand from the fixtures, not recomputed with the engine's own formulas.
import test from 'node:test';
import assert from 'node:assert/strict';
import { EMPTY, nextChoice, scoreRow, markAttempt, retrievalProblems } from '../../src/lib/lifehacks/studyRecall.ts';
import { calendarResult, freeGaps, scheduleLayout } from '../../src/lib/lifehacks/studyModels.ts';
import { scheduleObservation, queueObservation, dueRowOf } from '../../src/lib/lifehacks/studyStages.ts';
import { studyCatalog } from '../../src/lib/lifehacks/studyCatalog.ts';

const specs = Object.values(studyCatalog);
const v1 = (family) => specs.filter((s) => s.family === family && s.engine !== 2);
const clone = (x) => JSON.parse(JSON.stringify(x));
const at = (slug) => studyCatalog[slug];

// ---------- (a) retrievalProblems ----------

const RETRIEVAL_SLUGS = ['cover-before-recall', 'explain-the-link', 'keep-the-error-feedback', 'note-gap-check', 'one-question-one-card', 'reverse-the-flashcard', 'separate-confusable-pairs'];

test('retrieval: the seven opted-in recall fixtures are exactly the expected set, and rebuild-the-procedure is not one', () => {
  const withRetrieval = v1('recall').filter((s) => s.retrieval).map((s) => s.slug).sort();
  assert.deepEqual(withRetrieval, RETRIEVAL_SLUGS);
  assert.equal(at('rebuild-the-procedure').retrieval, undefined);
});

test('retrieval: every recall spec with a retrieval fixture has no problems', () => {
  for (const s of specs.filter((x) => x.family === 'recall' && x.retrieval)) {
    assert.deepEqual(retrievalProblems(s.retrieval), [], s.slug);
  }
});

const rowsFixture = () => clone(at('cover-before-recall').retrieval);

test('retrieval: an answer missing from its choices is a problem', () => {
  const r = rowsFixture();
  r.rows[0].prompts[0].choices = ['dock', 'plum', 'lane'];
  assert.deepEqual(retrievalProblems(r), ['leaf: answer not among choices']);
});

test('retrieval: a box with no distractor is a problem', () => {
  const r = rowsFixture();
  r.rows[0].prompts[1].choices = ['lake'];
  assert.deepEqual(retrievalProblems(r), ['bell: no distractor']);
});

test('retrieval: a repeated choice is a problem', () => {
  const r = rowsFixture();
  r.rows[0].prompts[2].choices = ['plum', 'pear', 'plum'];
  assert.deepEqual(retrievalProblems(r), ['kite: repeated choice']);
});

test('retrieval: study and covered cards of different length is a problem', () => {
  const r = rowsFixture();
  r.covered.pop();
  assert.deepEqual(retrievalProblems(r), ['study and covered differ in length']);
});

test('retrieval: problems in a second row are found too, and several problems are all listed', () => {
  const r = clone(at('note-gap-check').retrieval);
  assert.ok(r.rows.length >= 1);
  const last = r.rows[r.rows.length - 1].prompts[0];
  last.choices = [last.answer];
  r.covered = [];
  const out = retrievalProblems(r);
  assert.ok(out.includes('study and covered differ in length'), out.join('; '));
  assert.ok(out.includes(`${last.cue}: no distractor`), out.join('; '));
});

test('retrieval: a feedback attempt with no error is a problem, and a code digit missing from its choices is one', () => {
  const r = clone(at('keep-the-error-feedback').retrieval);
  r.attempt = [0, 1, 0]; // 4, 9, 2: the code itself
  assert.deepEqual(retrievalProblems(r), ['the stipulated attempt has no error']);
  const s = clone(at('keep-the-error-feedback').retrieval);
  s.choices[1] = ['7', '1', '3'];
  assert.deepEqual(retrievalProblems(s), ['item 2: code not among choices']);
});

test('retrieval: a compound attempt with no miss is a problem', () => {
  const r = clone(at('one-question-one-card').retrieval);
  r.parts = r.parts.map((p) => ({ ...p, given: p.answer }));
  assert.deepEqual(retrievalProblems(r), ['the stipulated attempt has no miss']);
});

// ---------- (b) nextChoice, scoreRow, markAttempt ----------

test('nextChoice: an empty box shows the first choice, a tap moves on, the last wraps to the first', () => {
  const choices = ['a', 'b', 'c'];
  assert.equal(EMPTY, -1);
  assert.equal(nextChoice(choices, EMPTY), 0);
  assert.equal(nextChoice(choices, 0), 1);
  assert.equal(nextChoice(choices, 1), 2);
  assert.equal(nextChoice(choices, 2), 0);
  assert.equal(nextChoice(['only'], 0), 0);
});

test('nextChoice: from empty, every answer of every fixture box is reachable within its number of choices', () => {
  for (const slug of RETRIEVAL_SLUGS) {
    const r = at(slug).retrieval;
    if (r.kind !== 'rows') continue;
    for (const row of r.rows) for (const p of row.prompts) {
      let i = EMPTY; const seen = new Set();
      for (let tap = 0; tap < p.choices.length; tap++) { i = nextChoice(p.choices, i); seen.add(p.choices[i]); }
      assert.equal(seen.size, p.choices.length, `${slug} ${p.cue}`);
      assert.ok(seen.has(p.answer), `${slug} ${p.cue}`);
    }
  }
});

const row = () => at('cover-before-recall').retrieval.rows[0]; // leaf→door [door,dock,plum]; bell→lake [lane,lake,door]; kite→plum [plum,pear,lake]

test('scoreRow: an untouched row is incomplete, scores 0 and every miss chose "nothing"', () => {
  const v = scoreRow(row(), [EMPTY, EMPTY, EMPTY]);
  assert.deepEqual(v.marks, [false, false, false]);
  assert.equal(v.right, 0); assert.equal(v.total, 3); assert.equal(v.complete, false);
  assert.deepEqual(v.misses.map((m) => m.chose), ['nothing', 'nothing', 'nothing']);
});

test('scoreRow: one empty box among right answers is a miss and keeps the row incomplete', () => {
  const v = scoreRow(row(), [0, EMPTY, 0]);
  assert.deepEqual(v.marks, [true, false, true]);
  assert.equal(v.right, 2); assert.equal(v.complete, false);
  assert.deepEqual(v.misses, [{ cue: 'bell', answer: 'lake', chose: 'nothing' }]);
});

test('scoreRow: a full right row', () => {
  const v = scoreRow(row(), [0, 1, 0]);
  assert.deepEqual(v.marks, [true, true, true]);
  assert.equal(v.right, 3); assert.equal(v.complete, true); assert.deepEqual(v.misses, []);
});

test('scoreRow: a full partial row names each wrong choice', () => {
  const v = scoreRow(row(), [1, 0, 2]);
  assert.deepEqual(v.marks, [false, false, false]);
  assert.equal(v.complete, true);
  assert.deepEqual(v.misses, [
    { cue: 'leaf', answer: 'door', chose: 'dock' },
    { cue: 'bell', answer: 'lake', chose: 'lane' },
    { cue: 'kite', answer: 'plum', chose: 'lake' },
  ]);
  const w = scoreRow(row(), [0, 2, 0]);
  assert.equal(w.right, 2); assert.deepEqual(w.misses, [{ cue: 'bell', answer: 'lake', chose: 'door' }]);
});

test('scoreRow: fewer picks than boxes is incomplete; the answer word as text never counts, only the chosen index', () => {
  const v = scoreRow(row(), [0, 1]);
  assert.equal(v.complete, false); assert.equal(v.right, 2); assert.equal(v.misses[0].chose, 'nothing');
});

test('markAttempt: the stipulated bike-lock attempt marks the middle digit wrong; the code itself marks all right', () => {
  const r = at('keep-the-error-feedback').retrieval; // code 4 9 2; attempt 4 7 2
  assert.deepEqual(markAttempt(r, r.attempt), [true, false, true]);
  assert.deepEqual(markAttempt(r, [0, 1, 0]), [true, true, true]);
  assert.deepEqual(markAttempt(r, [1, 2, 1]), [false, false, false]);
  assert.equal(r.tries, 3);
});

// ---------- (e) scheduleLayout and freeGaps ----------

test('scheduleLayout: without chain or longer the rows sit at the given starts and the spec is not mutated', () => {
  const s = at('handoff-after-finish'), before = clone(s.rows);
  const rows = scheduleLayout(s, [0, 25, 40]);
  assert.deepEqual(rows.map((r) => [r.start, r.duration]), [[0, 25], [25, 15], [40, 5]]);
  assert.deepEqual(s.rows, before);
});

test('scheduleLayout: a chain runs back to back after its first row, whatever the other starts say', () => {
  const s = at('work-back-from-a-deadline'); // outline 10, draft 15, edit 20
  assert.deepEqual(scheduleLayout(s, [15, 99, 0]).map((r) => r.start), [15, 25, 40]);
  assert.deepEqual(scheduleLayout(s, [0, 0, 0]).map((r) => r.start), [0, 10, 25]);
  assert.deepEqual(scheduleLayout(s, [50, 60, 75]).map((r) => r.start + r.duration), [60, 75, 95]);
});

test('scheduleLayout: long adds the overrun to its row only, and only when long is set', () => {
  const s = at('estimate-a-range'); // task 15 (+10 when long), call 10
  assert.deepEqual(scheduleLayout(s, [0, 20]).map((r) => r.duration), [15, 10]);
  assert.deepEqual(scheduleLayout(s, [0, 20], true).map((r) => r.duration), [25, 10]);
  const noLonger = at('handoff-after-finish');
  assert.deepEqual(scheduleLayout(noLonger, [0, 25, 40], true).map((r) => r.duration), [25, 15, 5]);
});

test('scheduleLayout: in a chain, a long overrun pushes the following rows later', () => {
  const s = { ...clone(at('work-back-from-a-deadline')), longer: { row: 1, minutes: 5 } };
  assert.deepEqual(scheduleLayout(s, [15, 0, 0], true).map((r) => [r.start, r.duration]), [[15, 10], [25, 20], [45, 20]]);
});

test('freeGaps: fragmented-time-does-not-fit has 30 free minutes before 40 but no gap longer than 10', () => {
  const s = at('fragmented-time-does-not-fit'); // call 10-15, chat 25-30, window 40, the job is skipped
  const g = freeGaps(scheduleLayout(s, s.rows.map((r) => r.start)), s.window, s.movable);
  assert.deepEqual(g.gaps, [{ start: 0, end: 10 }, { start: 15, end: 25 }, { start: 30, end: 40 }]);
  assert.equal(g.total, 30); assert.equal(g.longest, 10);
  assert.ok(g.longest < s.rows[s.movable].duration, 'the 30-minute job fits in no gap');
  assert.ok(g.total >= s.rows[s.movable].duration, 'though the total would cover it');
});

test('freeGaps: fit-before-fixed-slot has a gap long enough for the task', () => {
  const s = at('fit-before-fixed-slot'); // call 20-30, window 60, task 25 skipped
  const g = freeGaps(s.rows, s.window, s.movable);
  assert.deepEqual(g.gaps, [{ start: 0, end: 20 }, { start: 30, end: 60 }]);
  assert.equal(g.total, 50); assert.equal(g.longest, 30);
});

test('freeGaps: edges (empty, touching, overlapping, unsorted, past the window, nothing free)', () => {
  const r = (start, duration) => ({ label: `r${start}`, start, duration });
  assert.deepEqual(freeGaps([], 40), { gaps: [{ start: 0, end: 40 }], total: 40, longest: 40 });
  assert.deepEqual(freeGaps([r(0, 10), r(10, 10)], 30).gaps, [{ start: 20, end: 30 }]);
  assert.deepEqual(freeGaps([r(5, 20), r(10, 5)], 40).gaps, [{ start: 0, end: 5 }, { start: 25, end: 40 }]);
  assert.deepEqual(freeGaps([r(30, 5), r(5, 5)], 40).gaps, [{ start: 0, end: 5 }, { start: 10, end: 30 }, { start: 35, end: 40 }]);
  assert.deepEqual(freeGaps([r(50, 10)], 40).gaps, [{ start: 0, end: 40 }]);
  assert.deepEqual(freeGaps([r(30, 20)], 40).gaps, [{ start: 0, end: 30 }]);
  assert.deepEqual(freeGaps([r(0, 50)], 40), { gaps: [], total: 0, longest: 0 });
  assert.deepEqual(freeGaps([r(0, 50)], 40, 0).gaps, [{ start: 0, end: 40 }]);
});

test('freeGaps invariant: gaps are ordered, disjoint, non-empty, inside the window and miss every busy row', () => {
  for (const s of v1('schedule').filter((x) => x.window !== undefined)) {
    for (let start = 0; start <= 70; start++) {
      const starts = s.rows.map((r, i) => (i === s.movable ? start : r.start));
      const rows = scheduleLayout(s, starts);
      const g = freeGaps(rows, s.window, s.movable);
      let prev = 0;
      for (const gap of g.gaps) {
        assert.ok(gap.start >= prev && gap.end > gap.start && gap.end <= s.window, `${s.slug} at ${start}`);
        for (const [i, b] of rows.entries()) if (i !== s.movable) assert.ok(gap.end <= b.start || gap.start >= b.start + b.duration, `${s.slug} gap overlaps ${b.label}`);
        prev = gap.end;
      }
      assert.equal(g.total, g.gaps.reduce((t, x) => t + x.end - x.start, 0));
    }
  }
});

// ---------- (c) scheduleObservation ----------

const initial = (s) => s.rows.map((r) => r.start);

test('scheduleObservation: an overlapping layout has no valid finish and names the minutes and clashes', () => {
  assert.equal(scheduleObservation(at('one-person-two-jobs'), [0, 0]),
    'Your final layout overlaps for 30 minutes (job A with job B). One person cannot do both at once, so this plan has no valid finish.');
  const frag = at('fragmented-time-does-not-fit');
  assert.equal(scheduleObservation(frag, initial(frag)),
    'Before minute 40 there are 30 free minutes in 3 gaps, and the longest gap is 10 minutes. Your final layout overlaps for 10 minutes (job with call, job with chat). One person cannot do both at once, so this plan has no valid finish.');
});

test('scheduleObservation: a clean layout reports its finish', () => {
  assert.equal(scheduleObservation(at('one-person-two-jobs'), [0, 30]), 'Your final layout has no overlap, and everything is done by minute 60.');
  assert.equal(scheduleObservation(at('handoff-after-finish'), [0, 25, 40]), 'Your final layout has no overlap, and everything is done by minute 45.');
});

test('scheduleObservation: a due-row lesson, late and on time', () => {
  const s = at('meeting-and-preparation'); // prep 20 is due at 30
  assert.equal(scheduleObservation(s, [45, 30]), 'Your final layout has no overlap. prep finishes at minute 65 and is due at minute 30, so it is 35 minutes late.');
  assert.equal(scheduleObservation(s, [10, 30]), 'Your final layout has no overlap. prep finishes at minute 30 and is due at minute 30, so it is on time.');
  assert.match(scheduleObservation(s, [11, 31]), /finishes at minute 31 and is due at minute 30, so it is 1 minutes late\.$/);
});

test('scheduleObservation: the due row is the travel row for arrival-is-not-departure, not the whole trip', () => {
  const s = at('arrival-is-not-departure');
  assert.equal(dueRowOf(s), 0);
  assert.equal(scheduleObservation(s, [20, 40, 55]), 'Your final layout has no overlap. travel finishes at minute 40 and is due at minute 40, so it is on time.');
  assert.equal(dueRowOf(at('handoff-after-finish')), -1);
});

test('scheduleObservation: chain reports the start of the first row and the due row\'s finish', () => {
  const s = at('work-back-from-a-deadline');
  assert.equal(scheduleObservation(s, [50, 60, 75]), 'Starting outline at minute 50, edit finishes at minute 95; it is due at minute 60, so it is 35 minutes late.');
  assert.equal(scheduleObservation(s, [15, 25, 40]), 'Starting outline at minute 15, edit finishes at minute 60; it is due at minute 60, so it is on time.');
});

test('scheduleObservation: longer names the long end and then the clash it causes', () => {
  const s = at('estimate-a-range');
  assert.equal(scheduleObservation(s, [0, 20]), 'Your final layout has no overlap, and everything is done by minute 30.');
  assert.equal(scheduleObservation(s, [0, 20], true),
    'Task is drawn at its long end, 25 minutes. Your final layout overlaps for 5 minutes (task with call). One person cannot do both at once, so this plan has no valid finish.');
});

test('scheduleObservation: claimed compares the plan with the layout, and is silent when the layout overlaps', () => {
  const s = at('include-the-wrap-up');
  assert.equal(scheduleObservation(s, [0, 30]), 'Your final layout has no overlap, and everything is done by minute 40. The call-only plan said minute 30: 10 minutes too early.');
  assert.doesNotMatch(scheduleObservation(s, [0, 20]), /too early|said minute/);
});

test('scheduleObservation invariant: claimed never reads zero or negative minutes on any slider value', () => {
  const s = at('include-the-wrap-up');
  const max = Math.min(70, 100 - s.rows[s.movable].duration);
  for (let start = 0; start <= max; start++) {
    const m = scheduleObservation(s, [0, start]).match(/: (-?\d+) minutes too early/);
    if (m) assert.ok(Number(m[1]) > 0, `notes at ${start}: ${m[1]}`);
  }
});

test('scheduleObservation invariant: every v1 schedule lesson at every slider value says "no valid finish" exactly when the layout overlaps', () => {
  for (const s of v1('schedule')) {
    const total = s.chain ? s.rows.reduce((t, r) => t + r.duration, 0) : s.rows[s.movable].duration;
    const max = Math.min(70, 100 - total);
    for (const long of s.longer ? [false, true] : [false]) for (let start = 0; start <= max; start++) {
      const starts = initial(s).map((v, i) => (i === s.movable ? start : v));
      const text = scheduleObservation(s, starts, long);
      const overlap = calendarResult(scheduleLayout(s, starts, long), s.deadline, dueRowOf(s)).conflict > 0;
      assert.equal(/no valid finish/.test(text), overlap, `${s.slug} at ${start}${long ? ' long' : ''}: ${text}`);
      assert.equal(/everything is done by|finishes at minute/.test(text), !overlap, `${s.slug} at ${start}`);
      assert.doesNotMatch(text, /NaN|undefined|Infinity|-\d/, `${s.slug} at ${start}`);
    }
  }
});

// ---------- (d) queueObservation ----------

test('queueObservation: plain waiting lesson, no goal sentence at the target (it waits less)', () => {
  const s = at('short-jobs-clear-a-queue');
  assert.equal(queueObservation(s, [0, 1, 2]), 'Your order long → quick → small: total waiting 65 minutes, 0 late jobs.');
  assert.equal(queueObservation(s, [1, 2, 0]), 'Your order quick → small → long: total waiting 20 minutes, 0 late jobs.');
});

test('queueObservation: metric late, more waiting at the target, says the goal is no late jobs', () => {
  const s = at('earliest-deadline-first');
  assert.equal(queueObservation(s, [0, 1]), 'Your order short → urgent: total waiting 5 minutes, 1 late job.');
  assert.equal(queueObservation(s, [1, 0]), 'Your order urgent → short: total waiting 10 minutes, 0 late jobs. That is 5 more minutes of waiting than short → urgent, but the goal here is no late jobs, not the least waiting.');
});

test('queueObservation: metric dependency, says the goal is running each job after the job it needs', () => {
  const s = at('dependency-before-priority');
  assert.equal(queueObservation(s, [0, 1, 2]), 'Your order review → draft → send: total waiting 40 minutes, 0 late jobs, 1 job run before the job it needs.');
  assert.equal(queueObservation(s, [1, 0, 2]), 'Your order draft → review → send: total waiting 50 minutes, 0 late jobs, 0 jobs run before the job they need. That is 10 more minutes of waiting than review → draft → send, but the goal here is running each job after the job it needs, not the least waiting.');
});

test('queueObservation: metric release with watch, says when the watched job is done in both orders', () => {
  const s = at('unlock-the-following-work'); // polish 10, input 2, build 30 (needs input); watch build
  assert.equal(queueObservation(s, [0, 1, 2]), 'Your order polish → input → build: total waiting 22 minutes, 0 late jobs, 0 jobs run before the job they need; build done at minute 42.');
  assert.equal(queueObservation(s, [1, 2, 0]), 'Your order input → build → polish: total waiting 34 minutes, 0 late jobs, 0 jobs run before the job they need; build done at minute 32. That is 12 more minutes of waiting than polish → input → build, but the goal here is build done sooner (minute 32, not 42), not the least waiting.');
  assert.match(queueObservation(s, [2, 0, 1]), /1 job run before the job it needs; build done at minute 30\.$/);
});

test('queueObservation: metric switches counts switches with their cost; the goal sentence appears only when the target waits more', () => {
  const s = at('batch-by-setup'); // A1, B1, A2 at 5 each, switch 2
  assert.equal(queueObservation(s, [0, 1, 2]), 'Your order A1 → B1 → A2: total waiting 21 minutes, 0 late jobs, 2 switches (2 minutes each).');
  assert.equal(queueObservation(s, [0, 2, 1]), 'Your order A1 → A2 → B1: total waiting 17 minutes, 0 late jobs, 1 switch (2 minutes each).');
  // Planted fixture: B1 is long, so the target order that batches B1 with A2 waits more.
  const t = { ...clone(s), durations: [5, 20, 5], initial: [0, 1, 2], target: [1, 0, 2], tags: ['A', 'B', 'B'] };
  // initial A1(A) B1(B) A2(B): starts 0, 7, 27 -> 34, 1 switch. target B1 A1 A2: starts 0, 22, 29 -> 51, 2 switches.
  assert.equal(queueObservation(t, [1, 0, 2]), 'Your order B1 → A1 → A2: total waiting 51 minutes, 0 late jobs, 2 switches (2 minutes each). That is 17 more minutes of waiting than A1 → B1 → A2, but the goal here is fewer switches, not the least waiting.');
});

test('queueObservation: no goal sentence when the target waits less, when the order is not the target, or for metric waiting', () => {
  const sep = at('separate-ready-from-blocked');
  assert.doesNotMatch(queueObservation(sep, sep.target), /the goal here/);
  const edf = at('earliest-deadline-first');
  assert.doesNotMatch(queueObservation(edf, edf.initial), /the goal here/);
  const waiting = { ...clone(edf), metric: 'waiting' };
  assert.doesNotMatch(queueObservation(waiting, waiting.target), /the goal here/);
  const equal = { ...clone(edf), durations: [10, 10] }; // same waiting either way round: not "more"
  assert.doesNotMatch(queueObservation(equal, equal.target), /the goal here/);
});

test('queueObservation: release without watch falls back to the late-jobs wording and shows no watch readout', () => {
  const s = { ...clone(at('unlock-the-following-work')) };
  delete s.watch;
  const text = queueObservation(s, s.target);
  assert.doesNotMatch(text, /done at minute/);
  assert.match(text, /but the goal here is no late jobs, not the least waiting\.$/);
});

test('queueObservation invariant: every v1 queue lesson, every order, says "more minutes" only with a positive number', () => {
  const perms = (n) => n === 1 ? [[0]] : perms(n - 1).flatMap((p) => Array.from({ length: n }, (_, i) => [...p.slice(0, i), n - 1, ...p.slice(i)]));
  for (const s of v1('order').filter((x) => x.slug !== 'work-in-process-limit')) {
    for (const o of perms(s.labels.length)) {
      const text = queueObservation(s, o);
      assert.ok(text.startsWith(`Your order ${o.map((i) => s.labels[i]).join(' → ')}: total waiting `), s.slug);
      assert.doesNotMatch(text, /NaN|undefined|-\d/, `${s.slug} ${o}`);
      const m = text.match(/That is (\d+) more minutes/);
      if (m) assert.ok(Number(m[1]) > 0 && o.join() === s.target.join(), `${s.slug} ${o}`);
    }
  }
});
