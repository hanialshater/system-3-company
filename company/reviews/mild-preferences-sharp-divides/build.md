# Build note: mild-preferences-sharp-divides (v1)

builder: demo-builder · 2026-10-14 · session 2, branch worktree-agent-ad47b509c14998a55 · status set to `review`
inputs: brief `company/domains/briefs/economics.markets.md` #1; spec + wireframe `company/design/specs/mild-preferences-sharp-divides.{md,svg}`; design-lead decisions 2026-10-13 §1 (ABM format rules) and §3.2.
*Kept from evaluators until they report (evaluators see the artifact first).*

## What was built
- `src/demos/economics/mild-preferences-sharp-divides/abm.ts`: the engine. Pure TypeScript with no imports and no React, so it can be lifted to `src/kit/abm` after the second lesson (rule of two). It has its own `mulberry32`, plus `place`, `neighbours`, `unhappy`, `likeShare`, `tick` and `run(seed, pct)`. `run` returns every frame, the like-share series, the unhappy count per tick and `settled`. It runs in plain node: `node abm.ts` imports work on Node 22.18+.
- `Demo.tsx` + `styles.module.css`: the stage. It draws the grid as one SVG with 4 paths (A filled, A hollow, B filled, B hollow; group A = `--domain` squares, group B = `--warn` circles), not 1,600 nodes. Below the grid is a chart header ("Like neighbours" plus the readout), then the metric chart with a right-hand gutter for end labels. Controls in DOM order: New mix · Step · Run · 10% · 30% · 50% · 70%.
- Each (seed, threshold) run is computed once in full and cached. Step, Run and the chips all show frames of the same deterministic run. Run records the result on press, so milestones fire on press. It then replays in at most 15 frames of 25 ms each (instant under `prefers-reduced-motion`).
- After a finished run, a chip shows the same mix's settled end at the new threshold and adds that run's line to the chart. Before a run, a chip sets the threshold at tick 0.
- Milestones (`minInteractions=2`): `settled-30` and `other-threshold`.
- Reveal: the stage pins to the learner's latest settled 30% run, so the seed, the 30% chip (active) and the end tick all match. The readout becomes "Your 30% run · tick 13 · Like 77%". The reveal quotes only runs the learner finished, preferring the pinned mix and naming the seed if a run came from another mix.
- Size: the minified lesson JS, engine included, is 8.6 KB, plus 1.5 KB of CSS (esbuild, kit and React external). Source is about 20 KB with comments. No new dependencies.

## Rule re-run (the numbers in meta.json c1–c5)
Exact rule, `abm.ts run(seed, pct)`, seeds 1–5 (and 1–100 for spread):
| threshold | start | end (seeds 1–5) | ticks | settled | seeds 1–100 |
|---|---|---|---|---|---|
| 10% | 49.6–51.8% | 50.7–53.8% | 1–2 | 5/5 | end 49.6–53.8, mean 51.2, all settle |
| 30% | 49.6–51.8% | 74.2–77.3% | 11–18 | 5/5 | end 71.8–79.0, mean 75.7, all settle in 8–18 |
| 50% | 49.6–51.8% | 86.9–88.3% | 13–24 | 5/5 | end 85.8–90.5, mean 87.7, all settle |
| 70% | 49.6–51.8% | 98.0–99.3% at tick 60 | cap | 0/5 (0.4–1.7% unhappy) | end 94.8–99.8, mean 98.1, 5/100 settle |

These match the brief and the designer's check. Seed 1 is the first seed (not chosen). The QA path's New mix lands on seed 2 (30%: 50% → 77% at tick 13). Cascade check (c5), with agent ids tracked over the same RNG sequence: at 30%, 239–263 of 1,440 households start unhappy, and 95–143 households that were happy at tick 0 later become unhappy and move. Scripts were scratch only; to rerun, import `run` from `abm.ts` and loop over seeds. A fact-checker should write their own.

All 8 claims are `unverified`. c6 (Schelling 1971) says the DOI is from memory and needs confirming by the fact-checker, as do volume, issue and pages. It also says the stage rule is a common simplified variant, not Schelling's exact procedure.

## Judgement calls (spec deviations, with reasons)
1. **Grid size adapts: 288 px down to 240 px.** At 390×844 the explore stage is 483 px tall. A fixed 288 px grid overflowed it by about 105 px, so the chips sat below the fold inside a scrolling stage. The grid is now 288 px (7.2 px cells) when there is room. On shorter stages it shrinks to fit, never below 240 px (6 px cells, the format floor in §1.1). Measured: 251 px (6.3 px cells) at 390×844 and 282 px at 412×839. **This weakens the shape and hollow cues compared with the 7.2 px that §3.2.4 asks the accessibility reviewer to check.** The alternative was a scrolling stage that hides the controls. The reviewer should judge it at 6.3 px. If shape does not read, the fix needs layout room (for example a smaller world such as 36×36), not more colour.
2. **One control row** (Step · Run · 10% · 30% · 50% · 70%) instead of two, to fit the stage. Chips are about 45 px wide, not about 70. Every control is 44 px tall via the shared `.tap` module class (§2b).
3. **Rule line wording:** "Toy model. Hollow households have under 30% like neighbours; they move to a random empty home." It names the active value (§3.2.1) and also explains what hollow means, so no legend is needed. "Of 8" moved to the seed line as "8 nearby cells", because the rule is a share of *occupied* neighbours and "(of 8)" reads as "of 8 cells".
4. **Stage words:** rule line 15, seed line 4 ("nearby cells", "empty", "seed"), axis labels 3 ("Like neighbours", "Ticks"), for 22 in all, not counting numeric readouts or button labels. **"mixed start" was dropped** (§3.2.5). The dashed 50% line is labelled by the y-axis tick.
5. **Chart end labels** sit in a 60 px right gutter, nudged at least 11 px apart (§3.2.2). I tried dotted leaders from line ends to labels, but they cluttered the chart (the 10% leader lies on the 50% ghost line), so I removed them.
6. **Readout:** in predict it reads "Tick 0 · Happy ? · Like 50%". The grid's aria-label also omits the unhappy share while locked. A run that does not settle reads "Tick 60 · Like 98% · 2% still unhappy" (§1.5).
7. **Reveal is 90 words** on the full QA path (all three other runs quoted). That is the maximum case; with one other run it is about 77.
8. **Unhappy at the start is about 17%** at 30%, not "about 1 in 10" as the spec's predict state said. This is the real number for this rule.

## QA
- Contract (`npx playwright test contract`, `QA_ONLY=mild-preferences-sharp-divides`, own `NEXT_DIST_DIR=.next-mpsd`, `QA_PORT=3471`, `QA_OUT=test-results-mpsd`): phone and desktop both pass. The run was repeated 3 more times on an earlier build with no flakes. Recorded: `company/reviews/mild-preferences-sharp-divides/2026-10-14-qa.md`.
- Walkthrough: `artifacts/walkthroughs/mild-preferences-sharp-divides/` (not committed). I looked at all 9 phone frames and the sheet, and measured 390×844 light and 412×839 dark with my own script. Explore fits with no stage scroll at both sizes, and the header does not overflow. In predict the stage is 229 px tall, so the bottom of the grid scrolls (the kit layout, the same as the wireframe's "stage scrolls" note).
- `npm run check` passes and `tsc --noEmit` is clean. I did not run `npm run verify` as a whole; I ran its parts for this lesson (check, typecheck, build, QA).

## Open issues
- **Accessibility reviewer:** check the shape and hollow cues at the real cell size (6.3 px at 390 wide, 7.0 px at 412), not the 7.2 px of §3.2.4. The light theme's `--warn` is dark brown (#7d5200), so the hue contrast with teal is good. The hollow squares are the weakest cue.
- **Design review (visual designer chairs, §1):** first ABM reference lesson. The deviations above should become format defaults or be reversed: adaptive grid, one control row, rule line with "Hollow", no "mixed start".
- **Fact-checker:** c1–c8, especially the c6 DOI.
- The format id in meta is `agent-based-simulation`. There is no `company/design/concepts/agent-based-simulation.md` yet (interaction designer / design lead).
- Engine lift to `src/kit/abm` after schelling-on-new-york (platform engineer, tier 2 review).

## Revision v2 (2026-10-14, session 2, branch ccr-rnd-ncm worktree)

Inputs: `2026-10-14-learner-no-schelling.md` (verdict revise), fact-check Pass NCM-1 (8/8 verified, one advisory on c6).

| Finding | Change |
|---|---|
| 5. Mechanism told, not shown | `abm.ts` now tracks agent ids, which move with their agents. The RNG is untouched, and frames are identical to v1 for seeds 1-100 at all four thresholds. `run()` returns `unsettled[t]`: agents that are unhappy after tick t and did not move in it. Every unhappy agent moves each tick, so these agents were content before the tick and someone else's move unsettled them. The stage draws each one with a **red ring** and counts them ("54 unsettled by a move" at tick 1, seed 2). New milestone `saw-unsettled`: a frame with rings is shown in explore. The QA path's first Step reaches it. Run now replays at most 20 frames, 120 ms apart (was 15 x 25 ms), so the rings can be seen; milestones still fire on press. The reveal quotes the learner's own run: "143 households content at the start were unsettled and moved too" (`run().cascade`, counting distinct agents; it matches the fact-checker's 137/143/142/100/95 for seeds 1-5). |
| 6. "Sharp" not visible at 30% | Households whose occupied neighbours are all their own group get a cell-sized **tint** (group colour, 30% opacity), so block interiors read as solid regions. A count "N% all neighbours like" goes with it. At 30% the count goes from 1% to about 30% (seed 2: 0.6% -> 35.4%); at 10% it stays about 2%, and at 50% it reaches about 58%. The reveal quotes the learner's run. New claim c9. Frame 04 (tick 12 at 30%) now shows clear blocks. |
| 1. "Hollow" before defined | The rule line uses glyphs instead of the word: "Toy model: [hollow square, hollow circle] under 30% like neighbours, moves to a random empty home." The ring and tint glyphs are on the second line. |
| 4. "Happy 83%" at tick 0 | "Happy %" is gone. The readout is "Tick 0 · [hollow glyphs] 251", the count of hollow households, using the same glyph the rule line defines. It is visible in predict too, so the learner sees before committing that some households start unhappy by chance. c9 records "about 1 in 6". A run at the cap reads "Tick 60 limit · [glyphs] 25". |
| 10. "city" | The question now says "A grid of homes". The hook is unchanged; see open issues. |
| Fact-check advisory (c6) | c6 text: "The stage runs a simplified version of Thomas Schelling's model: ...". Reveal caveat: "A simplified version of Schelling's 1971 model: it shows what can happen, not what causes any real city's pattern." Recall why: "In a simplified version of Schelling's model, ...". |

Not changed: finding 9 (after a finished run, chips jump to the end at the new threshold). Keeping it preserves the `other-threshold` milestone on the QA path; the learner can still Step or Run any threshold from a New mix.

**Claims now unverified:** c6 (text changed) and c9 (new). c5 keeps its text; its source now names the engine bookkeeping that the rings draw. c1-c4, c7 and c8 are unchanged.

**Numbers re-run in node** (a scratch script importing the lesson's `abm.ts` and the v1 engine from git; seeds 1-100): frames are identical to v1 at 10/30/50/70. Unhappy at tick 0 at 30%: 15.7-20.1%. All-like share at the start: 0.5-2.4%. All-like share at the end: 10%: 1.2-3.8 (mean 2.2); 30%: 23.6-38.8 (mean 30.6); 50%: 52.0-67.8 (mean 58.4); 70% at tick 60: 83.0-99.2 (mean 93.1). Cascade at 30%: 86-164. Unsettled at tick 1 at 30%: 44-78.

**Stage words** (worst moment, 70% at the cap): rule line 12 (counting "30%"), legend 7 ("unsettled by a move", "all neighbours like"), seed line 4 and "Like neighbours" 2, for 25 in all, plus "Tick"/"limit" in the readout. I dropped the x-axis word "Ticks"; 0 and 60 remain. The reveal on the full QA path is about 111 words.

**Size:** 10.3 KB of minified JS (engine included) + 1.7 KB of CSS.

**QA:** the contract passes on phone and desktop (`NEXT_DIST_DIR=.next-mpsd2`, `QA_PORT=3613`, `QA_OUT=test-results-mpsd2`), recorded with `company qa-record`. Walkthrough via my own server on port 3614; I looked at all 9 phone frames and the sheet. The extra legend line costs grid height: on a 390x844 phone the grid shrinks further, though it stays above the 240 px floor. In the reveal frame the stage is scrolled, so the top of the pinned grid is cut (kit stage scroll, as in v1).

**Open issues**
- Accessibility reviewer: check the red ring (`--bad`) over a hollow shape at about 6 px cells, and the 30% tint on teal (weaker than on brown), in both themes.
- The hook still says "city" (learner finding 10). The hook is the CM's or learning designer's call; suggested: "Nobody wants a majority. What does the grid do?"
- Design lead: the Run replay is now about 2.4 s, not the spec's ≤ 400 ms, so the learner can watch the cascade. Either make this the ABM format default or reverse it.
- Fact-checker: c6, c9.
