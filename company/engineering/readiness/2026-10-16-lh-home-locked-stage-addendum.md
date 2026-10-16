# Operational readiness: lh-home-locked-stage-addendum

change: Home engine: while no mode is in effect, the stage picture states no count, amount or result (W-1258); jacket-last-first and group-cables-with-ends neutral pictures (W-1299); "Tumble 3 m" reaches both cord milestones (W-1241); unreachable v1 cord and bow reveal sentences removed; Home answer-range test and W3 every-step ratchet (W-1247); a rendered-markup locked-stage test
change-tier: 2
paths: src/components/lifehacks/HomeLesson.tsx, tests/lifehacks/home-locked.test.mjs, tests/lifehacks/render-loader.mjs, tests/lifehacks/render-spies.mjs, tests/lifehacks/engines-v2.test.mjs, tests/lifehacks/home-v2.test.mjs, company/ops/changelog.md
author: platform-engineer
board: W-1258, W-1241, W-1247, W-1299
risks: none proposed (see 7)
links: addendum to company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md, 2026-10-15-lh-home-w2-addendum.md and 2026-10-16-lh-home-w3-addendum.md (approval 2026-10-16-lh-home-w3-addendum-approval.md, conditions 1 and 4). Brief: company/ops/dispatch-requests/2026-10-16-r3-engineering.md B1, and its "since last round" rulings on W-1258, W-1241, W-1247. W-1299 rows: company/reviews/lifehacks-200/content-patch-2026-10-16-r3.md (d16eecc), "jacket-last-first" and "Arrangement re-check". Branch lh-engine-locked: a2f14c3 (engine), 1b5fa53 (group-cables dots, alone), 110ac21 (tests), and the commit that adds this file. Review the tip.

Tier 2 because HomeLesson.tsx renders 69 Home lessons (an engine used by more than 10 lessons). **The author does not approve it. principal-engineer-ops does.** Do not merge before that approval. It covers code and tests, not publishing. No claim or lesson text changes here.

## What changed in shared code

| Change | Who else it touches | Why |
|---|---|---|
| `SceneV2Props.neutral` (v2 only), set by `StageV2` to `locked \|\| !mode`. In `Scene`, while neutral, `end-paths` draws no "N loose ends" text, and `coil-radius` draws no "r=…cm" and no "… turns of …cm" | Only v2 stages pass it, and v1 never does. Two lessons draw these: group-cables-with-ends (W3) and coiled-cord-bend-radius (batch D) | W-1258 ruling, spec R2 "Predict (locked)": "nothing that implies the outcome" |
| `w3Picture`: `nest`, `pairpack`, `hollow` draw their size text only once a mode is in effect | fitted-sheet-corners-nest ("32 cm"), shoes-opposite-ends ("24 cm"), socks-use-shoe-space ("600 cm³ empty"). One lesson per model | Same ruling. The dimension line and the dashed hollow stay, because they are A's arrangement |
| `w3Picture` `reverse-order` at `mode` null: an empty bag (right), with the items beside it in two columns in use order (reading order). No arrows, no highlight | jacket-last-first only | W-1299, the content patch r3 builder row. **This is not A's arrangement.** See objections |
| `end-paths` end dots: `object` class, not `target`, while neutral (its own commit, 1b5fa53) | group-cables-with-ends only | W-1299, content patch r3 "Arrangement re-check" |
| `CordStage` "Tumble 3 m": `reach('short')` and `reach('long')` | long-cord-knots-itself only | W-1241. It draws both lengths and leaves "Tumble 0.3 m" pressed (inactive), so pressing 3 m first could never reach `short` |
| `useHomeLesson`: the cord reveal branch applies for any engine. The generic v1 branch loses its `cord` and `bow` sentences and its `special` flag | Nobody: cord and bow return before the generic branch for every engine, and no v1 lesson uses model `cord` | r2 ruling (b). Bow was dead for the same reason, so I removed it with cord |

**v1 lessons are unchanged, and I checked this on the artifact.** I SSR-rendered all 69 Home lessons in 5 states each: locked, unlocked with no mode, A, B, and the reveal. That is 345 snapshots, taken before (acb4025) and after (a2f14c3 + 1b5fa53) with the same scratch script. **12 differ.** All 12 are the locked and no-mode states of the 6 lessons above. **0 of 41 v1 lessons differ**, no A or B state differs, and no reveal differs.

## The rule and its test

`tests/lifehacks/home-locked.test.mjs` renders the real `Controls` with react-dom/server. The test-only loader `render-loader.mjs` adds .tsx, the `@/` alias, a CSS-module proxy, and spies for `useMilestones` and `Control`. The test reads the stage svg's `<text>` and its aria-label (title removed). For every engine-2 Home spec while locked, and for every v2-stage spec unlocked before the first press:

- (i) No number in the picture equals a number in that spec's A or B amount or result cells at `initial`, and no word cell appears. The only exceptions are the GIVENS.
- (ii) Every number in the picture is one that the question or a mode label already states.

**GIVENS (allow-listed under (i)): 2 texts, 1 lesson.** tote-balance-sides "3 kg" and "1 kg". The question says "3 kg on the left, 1 kg on the right." A test asserts that there are at most 3 givens, that each one is in its question, and that each one is drawn.

**Numbers still drawn while locked that are not cells, and so not allow-listed** (they pass (i) and (ii)). PE-ops should rule on whether these count as givens. If they do, the count is 6 and the stop-if fires:
- box-handle-clearance "42 cm opening": the question says "the 42 cm opening".
- desk-supply-near-use "4m one-way": the question says "4 m from your desk".
- long-cord-knots-itself "0.3 m strings" and "3 m strings": these are the group labels, the same as the mode buttons "Tumble 0.3 m" and "Tumble 3 m".

Also: a non-vacuity test (after a press, the same pictures draw "6 loose ends", "24 cm", "32 cm", "600 cm³ empty" and "3.18 turns…"), a jacket-last-first test at min, initial and max, a group-cables no-target test, and the cord press-order test. The press-order test presses through the real `StageControl` handler, re-rendering with the new `runs` each time. The orders are 0.3 then 3, 3 then 0.3, and 3 alone. Each order must reach both milestones, which is ≥ `minInteractions` (2).

W-1247: engines-v2 "v2 specs have the section 8 required fields, the answer is one of the options, …" now asserts `Number.isInteger(answer) && 0 <= answer < options.length` for every engine-2 Home spec. home-v2 has a W3 sweep over every slider step for the 10 W3 v2-stage slugs. It fails on a raw token, NaN, Infinity, undefined or a bare "−0" in the reveal or any cell. It checks `{ratio}` and `{diff}` like W2, and it pins long-cord-knots-itself to its own stage. W3 also joined the plain-numbers trailing-zero test. I did not assert "slider stays" for W3: elastic-loop-release and fitted-sheet-corners-nest hide theirs by design (W3 addendum 1(d)).

## Mutations (each run on a clean tree, then reverted; `npm run test:lifehacks`)

| Mutation | Result | Failing test(s) |
|---|---|---|
| M1: tote-balance-sides `answer` set to 2 (home-lessons.ts) | 129 pass, 1 fail, exit 1 | "v2 specs have the section 8 required fields, the answer is one of the options, and no option repeats a button label (R7)" |
| M2: `${c.ends.length} loose ends` restored while locked (the `!neutral&&` guard removed) | 126 pass, 4 fail, exit 1 | "locked: no engine-2 Home picture text states an A or B amount or result at initial, except the listed givens"; "locked: every number in an engine-2 Home picture is one the question or a mode label already states"; the same two for "unlocked before the first press" |
| M3: "Tumble 3 m" back to `setRuns(2);reach('long');` | 129 pass, 1 fail, exit 1 | "W-1241 long-cord-knots-itself: the reveal unlocks after either press order" |

Against the old engine as a whole (HomeLesson.tsx from acb4025, new tests), home-locked fails 7 of 9.

## The check

1. **What can fail.**
   (a) A v1 lesson renders differently. This was checked as 0 of 41 by the snapshot diff above.
   (b) The jacket neutral picture overflows on a phone or breaks the reveal fit. It stays inside the same 300×266 viewBox: 4 rows × 44 at most (n = 7), with tiles 86 wide at the stage's 20 px text. QA passed on phone and desktop. A learner-facing look at it is lane 10's re-run.
   (c) The render test becomes brittle. It reads `<text>` and aria-label only. A new picture text with a number fails it on purpose, and the message names the slug and the text.
   (d) Worst case: a picture leaks an answer through its drawing rather than its text. The test does not catch that, and it is not meant to. Arrangement findings are lane 1's (content patch r3 re-check table).
2. **How we would know.** `npm run test:lifehacks` gives **130/130** at 110ac21 (it was 120 before). `npx tsc --noEmit` exits 0. `npm run check` passes: 969 lessons, 5295 claims, 3 warnings (disputed claims in cue-needs-a-boundary, elastic-loop-release and sock-pairing-by-pattern; content, not code). Production build: `NEXT_DIST_DIR=.next-eng1 NODE_OPTIONS=--max-old-space-size=3072 npx next build` exits 0 in 4m41s at load ≈ 13 on 4 cores, with 969 of 969 lesson pages. tools/serve.sh on main has no `build` subcommand. The build rewrote tsconfig.json, and I reverted it. QA contract: `QA_PORT=4091 QA_ONLY=<11 W3 + towel-spread-dries-first, care-label-first-choice, towel-thickness-hidden-volume> npx playwright test tests/qa/contract.spec.ts --workers=2` gives **28/28**, harness stamp `clean: true`, contract commit 3b97991, head 110ac21. Extra controls: coiled-cord-bend-radius (changed, batch D) and packing-cube-walls (v1) give **4/4**, stamp clean.
3. **How to roll back.** One revert. Merge lh-engine-locked with `--no-ff`, then `git revert -m 1 <merge>`. That takes minutes, loses no data, and does not need the founder. Before merge, do not merge the branch. Engine and tests must revert together, because the new tests fail on the old engine, so revert the merge rather than single commits. One exception: 1b5fa53 (group-cables dots) reverts alone if the W-1094 safety re-look wants the highlight back. After that revert only "W-1299 group-cables-with-ends…" fails, so revert that test's lines with it. After a deploy, the fix is a new founder-approved deploy or a Vercel rollback (runbook-deploy.md).
4. **Capacity.** Client rendering only, with fewer svg nodes while locked. Test cost: home-locked renders each engine-2 stage a few times and runs in about 2.5 s to `test:lifehacks`. One build dir, `.next-eng1` (469 MB), is **left in /home/user/s3c-eng1 for lane 10**, as the brief asks. Whoever finishes with it deletes it. QA reports are in test-results-eng1/ and test-results-eng1-extra/ (gitignored).
5. **Security.** No new routes, parameters, scripts, dependencies or secrets. The loader and spies are test-only and never imported by src.
6. **Data.** Writes nothing. No learner data.
7. **Risks.** No register change proposed.

## Not in this change

- **No lesson text or claims.** `home-lessons.ts` and every meta.json are untouched. Content patch r3 (lane 1, applied by B3 on lhfix-r3) also edits `tests/lifehacks/home-v2.test.mjs` (laundry-gap-air-path joins the W2 list) and the `V2_HOME` lists. Expect a small textual conflict next to my W3 lines. The tests hold for r3's numbers by reading: laundry-gap's `gaps` picture draws no text, and tote's question is unchanged.
- The orphaned engine rows in content patch r3 ("Not in this patch": tote lever arm, laundry-sort-before-walk to engine 2, socks hollow label after filling) are not mine here.
- Study engine, Resource engine, and the special wobble and bow stages: not changed.

## Objections raised, and what happened to each

- **Mine: the jacket-last-first neutral picture is not "A's arrangement" (spec R2).** The content owner asked for it (patch r3, W-1299), and the chooser put it in this branch. R2 says the locked stage draws A, so the spec and this picture now disagree for one lesson. The aria label still reads "shared setup, drawn as In use order; no result shown". I left it, because the items are drawn in use order. Ask to lane 6 (interaction-designer): amend R2 ("A's arrangement, unless that arrangement is the answer to the question asked") or object, in which case the `reverse-order` hunk of a2f14c3 is reverted.
- **Mine: group-cables dots before the W-1094 safety re-look.** Content patch r3 says the cord picture "goes through the W-1094 safety re-look … and nobody changes it first". The dispatching chief of staff asked for it in this branch (W-1299). The change only drops a highlight while locked. It removes no text or warning and adds none. It is a separate commit (1b5fa53), so the safety re-look can keep it or revert it alone. Ask to the safety reviewer: look at it as part of W-1094.
- **Mine: does a given include non-cell numbers?** See "Numbers still drawn while locked …" above. I read the brief's "givens" as exceptions to the cell rule. That gives 2, so the stop-if did not fire. If PE-ops reads it as every number the question states, it is 6, and the B1 stop-if says the picture design is the problem (lane 6 and lane 1).
- No other objections are on record.

## Approval (written by principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
