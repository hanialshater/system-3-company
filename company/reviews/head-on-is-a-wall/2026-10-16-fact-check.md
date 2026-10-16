# Fact-check: head-on-is-a-wall v2 (2026-10-16, FC pass 65)

order: SO-10-2, trigger (b)/(d) (c1, c4 reset by the v2 build 9e7d37c, rulings R7/R8) · tag [project:catalog]
checker: fact-checker, fresh instance; wrote none of these claims (c1/c4 text is cm-physics R7 wording, set by demo-builder).
server: http://localhost:3591, built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start and end; R3a check.sh exit 0; newest lesson commit 9e7d37c is an ancestor).
method: Demo.tsx v2 and styles.module.css read first; fresh walkthrough `npm run walkthrough -- head-on-is-a-wall --url http://localhost:3591` (recorded 2026-10-16T14:42:50Z; the on-disk transcript from 12:42 was v1 and was not used), cut at the trust-sheet appendix; numbers re-derived in node. Disclosure: a grep for the R7/R8 text surfaced the builder's report in events.jsonl; no verdict rests on it.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | m·v + m·(−v) = 0, so the perfectly inelastic pair ends at rest; identical cars put the contact plane at the centre of mass, which stays fixed. Code draws car B at 2·MID − frontA, so both stop at MID. Stage after "Into a car": a "meeting point" line (`.mid`, stroke-dasharray 3 3, dashed). Reveal on :3591: "The meeting point never moved, so each car stopped from 50 to 0 in its own crumple zone, as against a wall." |
| c4 | verified | 0.5·1500·(50/3.6)² = 144,676 J ("145 kJ"); two cars 289,352 J = 2 × 144,676. Lab frame = CoM frame, so all of it is dissipated, split equally by symmetry: each zone takes 144.7 kJ, its own car's KE. Reveal on :3591: "Two cars at 50 carry twice one car's energy, and each crumple zone takes its own half." |

Not re-checked (status unchanged, verified in FC pass 35 and untouched by v2: Demo.tsx diff touches only the reveal's second paragraph and the speed-chip class): c2, c3, c5. Stage readouts on :3591 still match them (car 50 / wall 50: 145 kJ, wall 100: 579 kJ, "4 times higher", "1,500 kg cars, rigid wall").

No unrecorded learner claim found in the v2 reveal or stage.

**Result:** 2 verified, 0 disputed, 0 held. All 5 claims of the lesson are now verified.
