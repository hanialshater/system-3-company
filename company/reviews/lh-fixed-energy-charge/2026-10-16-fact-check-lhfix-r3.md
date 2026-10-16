# Fact-check: lh-fixed-energy-charge (lhfix-r3 reset, W-1477)

Date: 2026-10-16 · Checker: fact-checker, a fresh instance. I did not write, build or record any of these claims. · Brief: company/ops/mailboxes/dispatcher/20261016T154559826Z-evaluation-steward-697388f0.md (F-42 lane 10) · Checkout: main at bf6fde8, which contains the lhfix-r3 merge 8ea7077.

Method: I read the shared Life Hacks rendering code first (HomeLesson.tsx StageV2/caption/w3Picture, engine-v2.ts, home-models.ts, StudyLesson.tsx, studyStages.ts, RetrievalLesson.tsx, ResourceLesson.tsx, as the lesson uses them), then this lesson's spec and meta.json. I re-ran the engine on main in node (tsx; scratchpad fc/88f0/home.ts, cmp.ts, study.ts) to print both Seen columns and the reveal at the start and across the slider, and I compared every claim text with the fields that render it. I ran no server or walkthrough, and I did not read build.md or the lhfix-r3 readiness record.

| Claim | Verdict | Evidence |
|---|---|---|
| c3 | verified | VERIFIED. resource-specs.json principle = claim. formulaA = 0.2x + 10, formulaB = 0.3x (node): A(40) = 18, A(20) = 14 (energy part 8 → 4, fee 10 stays), not 9; B(40) = 12; 0.2x + 10 = 0.3x at x = 100 (€30 each). 'Real tariffs can include other terms' is a scope hedge, not a figure. |

## Not in the brief's list

c6 ('Tariffs and appliance ratings vary: check your own.') is also not verified. It was not reset by lhfix-r3: pass 61 held it (energy-regulator hosts blocked; the safety-hedge ruling is still open), and the same sentence is c6 in five sibling Resource lessons outside this brief. Left unverified, unchanged, so the identical claims stay consistent; it goes back to whoever owns that ruling.
