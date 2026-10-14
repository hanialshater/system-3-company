# Engineering Review: 2026-10-14: EDD-004, promote the knots library (gen2-force-smooth) to `src/kit/knots`

owner: principal-engineer (Kenji) · tier: **2** (new kit library, build config: `verify` script) · attendees: principal-engineer (reviewer); rnd-lead (author, by the EDD); design-lead owns the bigon block (not ruled here) · board: W-162, W-145

- EDD: [EDD-004](../../engineering/edd/EDD-004-knots-kit.md) · ADR: none. The move is reversible by deleting one folder and one script line, and no lesson imports it. · Amendment: none needed. Nothing in `company/constitution/protected-paths.txt` was touched: `src/kit/Lesson.tsx`, `tools/company.mjs`, `tests/qa/**` and `ci.yml` are unchanged.
- Inputs read: the EDD; `company/rnd/evolution/knots-gen2.md` ("VP ruling", "Promotion re-score"); `src/lab/knots/provenance/README.md`; `company/rnd/README.md`.
- **Verdict: approve with conditions.** I did the move myself (see "What I did"). Four conditions must be met before the first lesson imports `@/kit/knots`. Nothing blocks the move itself.

Checklist
- [x] **The problem is real and measured.** The champion layout draws the wrong picture after the first `crossingChange`. The crossing-change test shows it: gen1-force fails on 3_1 on all 3 re-score seeds.
- [x] **At least two options were considered, including doing nothing.** There were five (A–E).
- [x] **Blast radius.** No lesson, page or role changes today. No `src/demos` or `src/app` file imports `@/kit/knots`, so the library is not in any bundle. The two global changes are the `verify` script, which gains about 2.5 s, and one new `.d.ts` file in typecheck scope.
- [x] **Rollback is one revert:** `rm -r src/kit/knots` plus the `test:kit` script line.
- [~] **`npm run verify` on the integrated tree: not completed** (condition C3). This is what did pass:
  - `npm run check`: passed, 655 lessons, 1 warning that predates this change.
  - `npm run typecheck`: passed, `tsc` exit 0.
  - `npm run test:kit`: 97/97.
  - In a scratch worktree, a full `next build` with the kit and two scratch pages finished bundling ("Compiled successfully"). It was then OOM-killed in the TypeScript step.
  - A second full build was OOM-killed while bundling. The machine was at load 30–41 with 6 parallel `tsc` processes on 16 GB.
  - A minimal Next 16.4 app with the same kit compiled with Turbopack under both `package.json` variants.
- [x] **Measurements committed before implementation, and checked after:**
  - The table diff is clean.
  - `grep U10` finds only the comment line.
  - Kit tests: the EDD's target of 102 was a miscount, see finding F6. The actual result is 96/96, plus 1 test I added.
  - random-knot size: 11,323 B per the EDD. That is the closure measure; real bundle numbers are under item 6.
- [x] **Security, privacy and licences.** No dependencies and no events. The data licences are ruled under item 1 below.

## Rulings on the items the EDD lists for me

### 1. The 10_8 data source: **(b), switch to Conway 5 1 4.** The general W-145 question: **yes, with a rule.**

- **I checked the claim independently in scratch:**
  - `derive({ conway: [5,1,4], w: -2, rev: [0] })` gives **the same diagram (relabelled)** as the lab table's 10_8, and the same diagram as the DT-derived entry.
  - Jones and Alexander are equal.
  - Writhe is −2, with 10 crossings.
  - `identify` returns `[{10_8, mirror: false}]`.
  - The PD text differs from the kit's current line, because the labels differ.
- **Why (b) and not (a).**
  - Under the general rule below, (a) is not a licence breach. One 10-number DT code is a fact, and reading one value is not copying the GPL work.
  - But (b) costs one line. It makes 10_8's provenance the same as 7_5's: typed from a published notation (Conway 1970; Rolfsen App. C), not read from a GPL-labelled file.
  - It also removes the only entry whose disclosure has to say "read from the snapshot".
- **Why not (c).** Dropping 10_8 throws away a verified entry that exists for a teachable fact (u = 2) to avoid a cost that (b) already removes.
- **Who does it, and when.** The rnd-lead edits `sources.mjs`, runs `derive.mjs --write`, updates the provenance README row, and re-copies `table.mjs` into the kit with the documented `sed`.
  - This is a tier-1 data refresh under this review. It needs no new review.
  - It is **condition C1**, because the kit currently ships the DT-derived 10_8 line.
  - That interim state is legal under the rule below, and no lesson draws 10_8.
- **The general question (W-145): are short cited notations of individual knots facts we may re-derive from? Yes.**
  - I wrote it down as best practice 11 in [`company/engineering/best-practices.md`](../../engineering/best-practices.md):
    - type the notation by hand and cite it;
    - derive anything bigger with our own code, and prove it is the same object (`iso`);
    - disclose any value that was read from, or checked against, an uncleared source;
    - never copy files or program output in bulk.
  - Using GPL programs as **oracles** is consistent with this rule, as long as nothing is copied. That covers Regina's Jones values in `test/published.mjs` and the KnotInfo snapshot as a cross-check.
  - I chose no decision record or ADR, because a best-practice line is cheap to reverse. **Anything beyond individual facts** needs a decision record before it lands in the kit. Examples: importing a table file, or a bulk extract for identification beyond 7 crossings. This is not legal advice.

### 2. `.mjs` + `index.d.ts` in a TypeScript kit with `allowJs: false`: **accepted, index-only imports.** I tested it before ruling.

- **Scratch import.** I added `zz-scratch-typecheck.ts` with `import { knot, layout, draw, crossingChange, simplify, randomKnot, KNOTS, type PD } from '@/kit/knots'`, used them with real types, and added an `@ts-expect-error` on `draw('not a pd')`.
  - `tsc --noEmit` exit 0.
  - The expect-error was honoured, which proves `index.d.ts` is what TypeScript resolves.
  - The file is deleted. It was swept into WIP commit 3e4ac7c5 by another session and removed again; it is not in HEAD.
- **Deep imports fail typecheck.** `import { draw } from '@/kit/knots/draw.mjs'` gives `TS7016: Could not find a declaration file`.
  - That is the enforcement I want: `npm run typecheck` mechanically limits lessons to `@/kit/knots`.
- **The bundler loads `index.mjs`.** Turbopack resolved `@/kit/knots` to `index.mjs` in both scratch builds. The pages rendered the knot code into client chunks.
- **TypeScript and the bundler can drift apart.** TypeScript sees `index.d.ts`, the bundler sees `index.mjs`, and nothing checked that they agree.
  - I added `src/kit/knots/test/types.test.mjs`. It asserts that the exports declared in `index.d.ts` equal the runtime exports of `index.mjs`. Both have 57 today.
- **Alternatives rejected.**
  - Converting to `.ts` loses `node --test` without a loader and makes the lab and kit diverge.
  - `allowJs: true` widens typecheck to every `.js` in the repo, to solve a problem one `.d.ts` already solves.

### 3. Location, and whether kit tests join `verify`: **`src/kit/knots/`. Yes, they join `verify`.**

- **Location.** `src/kit/knots/` sits beside `src/kit/geo/`, as proposed.
  - `provenance/` (`sources.mjs`, `derive.mjs`, its test) **stays in the lab** as the record. Lessons never need it, and the kit does not regenerate itself.
  - The kit README documents the one-line re-copy.
  - `bench`, `size`, `evolve.json`, `candidates`, `benchdata`/`benchgen` (with U10 and other GPL-sourced bench data), `PRIOR-ART.md` and `NOTES.md` stay lab-only.
- **Tests.** I added `"test:kit": "node --test src/kit/knots/test/*.test.mjs"` to `package.json` and ran it in `verify` after `test:deploy`.
  - **Measured: about 2.4 s at load about 4, and 6.7–9.9 s at load 22–41.** That is not the EDD's "about 20 s".
  - At that cost it is clearly worth it.
- **CI gap.** CI does not run `verify`. It runs check, typecheck, build and qa, so neither `test:deploy` (a gap that predates this change) nor `test:kit` runs in CI.
  - `ci.yml` is protected, so I did not touch it.
  - Follow-up F-CI for the evaluation steward: an amendment that adds both scripts to CI.

### 4. Draw time on a phone: **acceptable for table-knot lessons, given the rules below. Not accepted without a measurement for diagrams over 12 crossings.**

- **The per-tap path is cheap.** I measured in this checkout (Node 22, load about 22, so these figures are pessimistic):
  - `draw(pd, { layout: L })` with a stored layout: median **0.07–0.16 ms** on 3_1, 5_2, 7_7 and `randomKnot(3)`, including after `crossingChange`.
  - `layout()` alone: 1.1–1.8 ms on table knots and 3.9 ms on `randomKnot(3)`.
  - So the one-off cost is `layout`, and taps are about 20× cheaper.
- **Phone estimate (not measured).** At 3–5× slower:
  - `layout` once per card: about 5–30 ms;
  - a cold first call: about 50–90 ms;
  - taps: under 1 ms.
  - Everything stays under a 100 ms response, and a single hitch on mount is acceptable.
- **Rules, written into the kit README.**
  1. Compute `layout` once, on mount or when the seed changes, never per frame or per tap. Draw taps with the stored layout.
  2. Diagrams over 12 crossings need a measured phone-class timing before they ship. The messy bench set reaches a 64 ms maximum on desktop.
- **Condition C4.** The first lesson that ships using `layout` records one measured number at phone-class CPU (Playwright CPU throttling 4×, or a device) in its build notes. That is best practice 1. Owner: the platform engineer, with the builder.

### 5. The import blocks (random-knot, tricolour-check, unknot-game): **enforced by review, not mechanically.**

- **The blocks depend on what is drawn, not on what is imported.** Which knot, and whether the diagram has been through moves. An import scan cannot tell 5_2 (allowed) from 3_1 (blocked), or a raw diagram from a scrambled one.
- A mechanical check would also live in `tools/company.mjs`, which is protected. That means an amendment for a rule meant to be temporary, with no lesson yet in a position to break it. That is ceremony.
- **What enforces the blocks instead:**
  - Typecheck forces every use through `@/kit/knots`, so `grep "@/kit/knots" src/demos` finds every user.
  - The kit README states the blocks where a builder reads.
  - Proposed board item F-GATE (evaluation steward): add one line to the launch-review checklist: "imports `@/kit/knots` and calls `draw`/`layout`: check README blocks (a)–(c)".
  - **Revisit trigger:** if a second knot lesson enters the build queue while a block is active, I will reconsider a mechanical check.
- **Narrowing the random-knot block** (EDD open question 3): **not narrowed.** The VP ruled the block, and 0/10,000 on raw `randomKnot` is strong evidence. But the game the lesson will want draws after moves (2.5 %).
  - The cleaner lift is the exported planarity check (`extraCrossings(drawing)`). The counter already exists.
  - It is a separate export, so only the random-knot lesson pays its size, and that now costs real bytes only to that lesson (see 6a).
  - I wrote the block in the kit README to also cover `apply`, which is the same move operation as `randomMove`.

### 6. Anything else

- **a. Bundle budget: a real defect, found and fixed.** The EDD's sizes are closure estimates. In a real Next 16.4 Turbopack build, **the barrel was not tree-shaken.**
  - A page importing only `{ knot, draw }` shipped `codes`, `moves`, `random`, `identify` and the rest: **10,310 B gzip**. A page using everything was 10,730 B.
  - Every knot lesson would have paid the whole library, about 10 KB, against the R&D guideline of ≤ 10 KB for what a lesson imports.
  - **Fix applied:** `src/kit/knots/package.json` with `{"sideEffects": false}`. After the fix, the same page measured **5,194 B** and the everything-page 10,717 B.
  - I checked that no module has an import-time side effect outside itself. `table.mjs` fills only its own `T`.
  - TypeScript still resolves `@/kit/knots` to `index.d.ts` with that `package.json` present (scratch `tsc`). The README now forbids import-time side effects.
- **b. API stability.** From now on this is kit code:
  - **Tier 1:** additive exports (with `index.d.ts`), result-preserving fixes, and table refreshes through the derive route.
  - **Tier 2 (EDD and review):** removed or renamed exports, and changed results, including the `layout` data shape and table drawings.
  - This is written in the kit README.
  - The force-smooth `layout` format is incompatible with gen 0/1's, which is acceptable because nothing has stored one.
- **c. Licence headers: none required.**
  - The repo has no LICENSE file and no header convention (`private: true`), and no other kit file carries a header.
  - `PRIOR-ART.md` states that no code was copied, and the kit README points to it.
  - The U10 / Regina PD code is not in the kit.
- **d. Header comments.** I updated the comments in `index.mjs` and `index.d.ts` (they said "lab"), and removed U10 from `KNOTS`'s doc comment. These are comments only; the other 9 library modules are byte-identical to the lab (`cmp`).
  - Some dead `'U10'` guards remain in `identify.mjs` and two tests. They are harmless and I left them to keep the modules byte-identical.

## Findings (problems, not fixes)

- **F1 (fixed).** The barrel is not tree-shaken without `sideEffects: false` (6a). The EDD's size table would have been wrong in production by about 5 KB per lesson.
- **F2 (fixed).** Nothing checked that `index.d.ts` matches `index.mjs` (item 2). `types.test.mjs` now does.
- **F3 (open, C3).** `npm run verify` was not completed on the integrated tree, because builds were OOM-killed under shared load.
  - The risk to existing lessons is near zero: nothing imports the kit.
  - The risk is the new `.d.ts` in typecheck (which passed) and the `verify` script line.
- **F4 (open, F-CI).** CI runs neither `test:kit` nor `test:deploy`.
- **F5 (open, C1).** The kit's 10_8 line is still the DT-derived one until the rnd-lead regenerates it.
- **F6 (record).** The EDD's "kit: 102 tests" counted the swap test with `MONSTER` substituted. With the specified U10 removals, the kit has 96 lab tests, plus `types.test.mjs`, so 97.
  - That is 99 lab tests in those five files, minus the U10 per-entry move test and the 2 U10 `REF` rows. The 2 removed assertions sat inside tests that remain.
- **F7 (process, not the author's).** Another session's WIP commits swept this review's in-progress files into history, including the scratch typecheck file:
  - 3e4ac7c5: the first kit copy and the scratch file;
  - 95324818;
  - 12fa1ce6: best-practices and README;
  - later merges.
  - I did not commit. HEAD now matches the intended state, and the scratch file is removed.
  - Practice 7 (own scratch space) does not cover a sweeper committing other agents' half-done work. Flagged to the caller.

## Decision

**Approve with conditions.** The move is done, as specified in the EDD:
- force-smooth's `draw.mjs` and `index.d.ts`;
- the derived table as `table.mjs`, with U10 lab-only;
- the lab tests minus U10;
- the kit README with the import blocks;
- plus the `sideEffects` and types-sync fixes above.

Conditions before the first lesson imports `@/kit/knots` (no further engineering review is needed for any of them):

| # | Condition | Owner |
|---|---|---|
| C1 | 10_8 → `conway: [5, 1, 4]` in `sources.mjs`; run `derive.mjs --write`; update the provenance README row; re-copy `table.mjs` into the kit (README `sed`); run `npm run test:kit` and the provenance tests | rnd-lead |
| C2 | Pointer in `src/lab/knots/README.md`: the kit is the shipped copy, and the lab is the evaluator (EDD rollout step 4) | rnd-lead |
| C3 | `npm run verify` green on the integrated tree, run when the machine is not saturated | platform-engineer |
| C4 | The first lesson using `layout` records a measured phone-class draw time | platform-engineer + that lesson's builder |

Follow-ups, not conditions:
- **F-CI:** amendment adding `test:deploy` and `test:kit` to `ci.yml` (evaluation-steward).
- **F-GATE:** one launch-review checklist line for the knots import blocks (evaluation-steward).
- Bigon acceptance (block b) and a glance at the kit's 5_2 picture (design-lead, with cm-math-discrete).
- Follow-up EDD for extra crossings (block a). I recommend the exported planarity check route (rnd-lead).

Objections that travel with it:
- **ortho-force draws better small table knots and a readable Hopf link** (EDD open question 4; gen-2 record). This was answered by the VP's ruling §1, and I do not reopen it. A promotion review cannot overrule a selection on looks when the score is a tie and the alternative fails a briefed API requirement. ortho-force stays the parent for any future layout project.
- **"0/10,000 justifies narrowing the random-knot block"** (EDD, defect a). Not adopted (item 5). The answer is the exported check, not a narrower rule.
- **"(a) is fine, the DT code is a fact"** (option a for 10_8). I agree it is lawful under rule 11. (b) is chosen on cost and uniformity, not because (a) is forbidden.

## What I did (files)

- New: `src/kit/knots/` (11 modules plus `index.d.ts`, `package.json`, `README.md`, and `test/` with 6 test files, `published.mjs` and `lessons/`).
- `package.json`: the `test:kit` script, run in `verify`.
- `company/engineering/best-practices.md`: practice 11 (data provenance).
- `company/engineering/README.md`: EDD-004 in the index.
- EDD-004: status line.
- Scratch only, all removed: the typecheck import, the deep-import probe, a git worktree `pe-edd004-scratch` (full build), and `pe-mini` (two Turbopack builds).

## Kudos (optional)

- @rnd-engineer (W-145 provenance): re-deriving the table and proving each entry with `iso` turned a licence worry into a test. The disclosure of the one snapshot-read code made the 10_8 ruling a five-minute check.
- @rnd-lead (Bram): EDD-004 put measured numbers on every defect, with what a learner would see, and left the right calls open for the right roles. The 0/10,000 extra-crossing run and the stored-layout timing made item 4 decidable.

(Not harvested into events: this session was asked not to write `events.jsonl`.)
