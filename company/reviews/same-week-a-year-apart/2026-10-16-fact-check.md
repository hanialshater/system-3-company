# Fact-check: same-week-a-year-apart (2026-10-16)

## FC pass 54b (2026-10-16)

Checker: fact-checker (Ingrid). Batch: company/ops/dispatch-requests/2026-10-16-r2-quality.md item B5 (board W-975, W-1059). Rules applied: my W-975 step-9 statement as written (company/domains/behavioral.md, "Fact-checker's step-9 statement": (a)-(c) can verify; (d) held by default).

Order (artifact first): production build of the main checkout (NEXT_DIST_DIR=.next-befc, `next start -p 3951`), then `npm run walkthrough -- same-week-a-year-apart --url http://localhost:3951` with --choose 0, 1, 2, transcript cut at the appendix (R1: `sed '/^## Appendix: trust sheet/,$d'`). The walkthrough drives one branch only, so I drove every combination the controls allow with my own Playwright script against the same server and read each rendered reveal. Then the meta.json claims, then my own node re-derivation (seeded LCG, no network, 200,000 random increasing utility functions for the risk claims; sweeps over d and rho for the time claims), then a re-run of cm-behavioral's check script (`node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs`: "all checks pass"). Sources opened through PMC OAI-PMH (`pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:<id>&metadataPrefix=pmc`, HTTP 200). I did not read build.md or design.md. No claim in this lesson was written by me: the git history shows cm-behavioral's and the builder's commits only, and the source fields say "Builder statement".

Result: 11 of 12 verified, 1 held (type (d)), 0 disputed. Statuses and per-claim notes are in src/demos/behavioral/same-week-a-year-apart/meta.json (each note starts 'FC pass 54b').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Ratio 110·d^(t+1)/(100·d^t) = 1.1·d at t = 52, 13, 0 (max deviation 4.4e-16, d in [0.5, 1.2]); wait iff d > 0.9091. Predict answer and 'Not quite' feedback seen; reveal sentence in all 4 branches. |
| c2 | verified | 1.1·e^(-rho) at every t for rho = 0.01, 0.1, 0.5 (1.0891, 0.9953, 0.6672 at all three stops). Not on screen. |
| c3 | verified | beta-delta b = 0.9, d = 1: 1.10 at t = 52, 0.99 at t = 0; hyperbolic k = 0.2 also switches (1.081, 0.917). 'Only' holds by definition (the near week is discounted more steeply). Wording note below. |
| c4 | verified | All four far/near combinations driven on the stage; each reveal reads as claimed; follows from c1. The near choice is disabled until the pair reaches today. |
| c5 | verified | Ruggeri et al. 2022, PMC9584811: 'common difference (we refer to this as present bias, which is the more common term)'. Cohen et al. 2020, PMC10489299, uses the same term. |
| c6 | **held** (unverified) | Type (d). W-975 has no (d) statement yet; second-hand under W-1059. Opened Cohen et al. 2020 (PMC10489299): Augenblick et al. 2015 'found much weaker (but still statistically significant) evidence of dynamic inconsistency' for financial flows than for effort. That supports 'clearer for effort than for money'. **'With real payments' is not in the opened passage**, so it is unchecked. The line is rendered in all 4 branches of the current build (HELD_LINE on). |
| c7 | verified | On the stage: hypothetical amounts; one choice per date (the near choice is locked until today); the far choice ('✓ $110 week 52') and the model strip stay in view during the near choice. |
| c8 | verified | Caption on every frame; glosses steady discounting (same factor per week). A model name, not a claim about people. |
| c9 | verified | Strip seen at week 52, week 13 and today: 'Steady model: wait' or 'take $100', fixed by the far choice and unchanged at every stop; absent before the far choice. |
| c10 | verified | Seen: '1 week, +$10', the four choice labels, slider stops week 52 / week 13 / today. |
| c11 | verified | Hook seen; matches the set-up (c10). |
| c12 | verified | 60·d^20/(50·d^10) = 60·d^110/(50·d^100) = 1.2·d^10 (d = 0.95, 0.98, 0.99); the recall answer and its 'why' match. |

## Findings for the builder and cm-behavioral (not disputes)

1. **c6 is on screen now.** The held line renders in every branch of the build I tested. With c6 unverified, `company publish` blocks the lesson. Either a (d) statement plus a W-1059 ruling verifies it (and 'with real payments' then needs the primary paper or a source that says so), or the builder sets the fallback (HELD_LINE = false). The fallback text is already in the check script (75-78 words) and teaches without the line.
2. **c3, take/take branch:** 'Switching to the $100 today would fit only ...' is shown to a learner who took the $100 both times, so for them it describes a switch they did not make. It is true as a conditional. Whether to reword it is the designer's call, not mine.
3. **Alt text** on the timeline at the today stop reads 'The pair: $100 at today'. That is a grammar slip, not a claim.

## Unrecorded claims

None. I compared every sentence in the transcript (hook, predict, options, panel, stage text, alt text, four reveals and feedback) with c1-c12. The predict distractors ('Take the $100, since today weighs more', 'Either, depending on their discount rate') are not asserted by the lesson.

## What would change a verdict

- c6 → verified: a dated W-975 (d) statement that covers this line, a W-1059 ruling that accepts this second-hand route, and the gap named in the c6 row closed by an opened source.
- Any verified claim → disputed: a change to Demo.tsx reveal text, cards or stage labels after 2026-10-16. Re-check on any version bump.


## FC pass 63 (SO-10-2, trigger b: text changed by behavioral r4 B2, 267277a)

fact-checker · 2026-10-16 · target: http://localhost:3591 · mode: external (shared review server) · built from: 6838dbac0613a3d1f2f5353e83b27d5c0dbf4f2c (read at start and end) · R3a scope check: pass · [project:behavioral-econ]

Method: walkthrough on :3591 written to my scratchpad (not artifacts/), read cut at the appendix before any note; then every reveal branch driven with Playwright (Pixel 7) and the visible page text searched for the held strings before the trust sheet; then the check script run; then my own node re-derivation with no repo imports; then sources opened via PMC OAI-PMH where the claim is a term. Verdicts are in each claim's `note` (prefix "FC pass 63").

Result: **1 verified, 0 disputed, 0 held** (scope: c3 only).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | All four branches driven; wait/take and matched sentences exact. Own node: beta-delta (0.9, 1) ratio 1.100 at week 52, 0.990 today; exponential ratio 1.1 d at every stop. The new 'Waiting, then taking...' wording clears 54b's take/take note. |

Observation (not a c3 issue, for the builder): the check script still prints L ('With real payments, reversals are clearer for effort than for money.') inside each of the four reveal branches and words them at 87-90, while the page (HELD_LINE = false) omits L. The script'"'"'s fallback lines cover the shipped text by word count only; the shipped strings themselves are not printed.
