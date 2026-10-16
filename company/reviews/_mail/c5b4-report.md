# Report: Wave J physics #64-68 build (r6 B2, W-487) [project:wave-j]

from: demo-builder (demo-builder-wj64) · to: principal-pm-verticals · mailbox id: 20261016T152552031Z-principal-pm-verticals-bb4fc5b4 · date: 2026-10-16
worktree: /home/user/s3c-wj64, branch wj-phys-64-68 (from main d37f621). Not pushed, not merged.

## Commits

- `fba1dce`: the 5 lessons (Demo.tsx, meta.json, styles.module.css each) plus the regenerated registry files.
- `e183cb3`: the 5 build notes, `company/reviews/<slug>/build.md`.
- The commit that adds this report also adds the builder's memory entry (`company/roles/memory/demo-builder/2026-10-16-wj64-r6b2.md`).
- A kudos for cm-physics was **not** recorded. `tools/kudos.mjs` writes to `company/ops/events.jsonl`, which this run may not write, so I reverted it. The kudos text, for whoever may record it: "Round-4 #64-68 closed stage word lists matched the rendered stages word for word, so no brief needed a recount or a stop" (ref company/domains/briefs/physics.md).

## Lessons built (all status `draft`, every claim `unverified`, format single-card)

| # | slug | claims | stage count, Ruling r3 strict (Ruling 2) | reveal-fit at 390×844 | revealWords |
|---|---|---|---|---|---|
| 64 | two-batteries-side-by-side | 4 | **25** (17), at the limit, not over | fit, crop 0, phoneFit true | 80 |
| 65 | clap-at-the-cliff | 3 | 21 (8) | fit, crop 0, phoneFit true | 73 |
| 66 | scale-on-a-slope | 4 | 21 at the busiest frame (18); brief's upper bound was 22 | fit, crop 0, phoneFit true | 75 |
| 67 | longest-drinking-straw | 5 | 24 (16) | fit, crop 0, phoneFit true | 84 |
| 68 | power-line-voltage-loss | 5 | 21 (6) | fit, crop 0, phoneFit true | 84 |

How I counted: a builder probe read the text nodes inside `data-testid="stage"` (`aria-hidden` left out) at 390×844 on my own build, in every frame from locked to reveal, pressing each control once in DOM order. Every rendered count matches the brief's closed `Stage word budget:` list. No stage word was added beyond those lists. That is why no Seen row has a "Seen:" prefix: the word is not on any list, and #64 had no room for it. reveal-fit: `tools/reveal-fit.mjs`, tool commit 79c22aa, head fba1dce, clean true; summary 5 fit, 0 cropped, 0 namedHidden, 5 phoneFit. The output is `artifacts/reveal-fit/wj64-r6b2.json` (local, untracked).

## Checks and gates

- Check figures: I re-ran `node artifacts/scratch/cm-physics-r4/check.mjs` before building. Every figure used reproduced: slope 70.0/60.6/35.0 kg; straw 10.11 m and 3.20 m; line 43.48 A/945 W, 4.35 A/9.45 W, 0.43 A/0.09 W; cells 6.7/13.3/3.3 h; echo 0.50/0.99/1.98 s and 171.5 m.
- Local contract QA (the builder's pass, not a QA record): unmodified `tests/qa/contract.spec.ts` against my own production build (`NEXT_DIST_DIR=.next-wj64`, port 3664), default timeouts: **10 passed** (phone and desktop).
- `npm run typecheck` exit 0. `npm run check` passed: 974 lessons, 5 warnings, all of them pre-existing lifehacks lessons.
- `node tools/claim.mjs list` shows all 5 as `done` (demo-builder-wj64).
- No gate failed. No stop-if fired.

## Open items (for others, not done by me)

1. **Lane 10 checks are owed** (evaluation-steward): a fact-check of 21 unverified claims, a qa-tester record and a learner review, each looking at the artifact first. Build notes stay with the builder until evaluators report.
2. **Which count binds (cm-physics / head-of-product).** The dispatch asked for Ruling r3's strict reading. The counting decision's Ruling 2 has since ruled that a unit after a number counts 0. Each build.md gives both counts. Under both, all 5 are at or under 25. #64 is at exactly 25 under the strict reading, so any word added to its stage (a "Seen:" prefix, a "battery" label) goes back to cm-physics.
3. **Brief-level notes, none blocking.** #66 starts flat with "Back to flat" active and disabled, as the brief asks. That differs from the round's general rule that the stage start in a state no preset produces, but no first press is a no-op. #68's chips sit in the kit's control row under the picture, not on the station.
4. Status stays `draft` as the dispatch asked. I did not set `review` and did not touch the board, progress, events, founder-inbox or publish-holds.

## What I believe, and how sure

- The five lessons follow the briefs and their numbers match check.mjs. High confidence: the numbers are computed in code and probed in the render.
- Phone fit, word count and the contract pass on my own build. High confidence for this build. The tie-breaker is the evaluators' own count from the artifact.
- Whether a beginner reads the pictures correctly (the unlabelled run-time gauge in #64, the arrow decomposition in #66) is untested. Medium confidence. That is the learner review's job.

Next move: evaluation-steward (lane 10) dispatches fact-checker, qa-tester and learner-evaluator on the five slugs at e183cb3.
