# Build note: accurate-bettor-takes-the-pot

- Builder: ncm-e03 (demo-builder), 2026-10-14, v1 draft. Brief: company/domains/briefs/economics.markets.md, Course NCM #21.
- Intent (Simulation run): one chart of the 60% bettor's share of all money over 500 races, all five seeded runs drawn thin, the selected run bold. "+50 races" steps, "Run to 500" jumps (no animation, so QA's 450 ms wait is enough). Run 1–5 select the seed. Stage line: "Win: money ratio ×1.2. Loss: ×0.8." (the cause); readout "Pool's win odds" shows the price drifting toward 60%.
- Model: pari-mutuel pool, no fees, each bettor stakes all money split by belief (60/40, 50/50), winners split the whole pool by stake. One rng() per race, win if < 0.6. Seeds 2211 to 2215 come from the brief (consecutive, not picked); the reveal quotes run 2 (seed 2212) because it shows the long lucky lead, disclosed in c2.
- Re-run with the lesson's exact draw order: shares at 50/100/200/500 match the brief for all five seeds (2212: .265 .397 .114 .988). Final shares 0.999905, 0.987766, 0.999678, 1.000000 (rounded), 0.991811; shown as "over 99.9%" above 0.9995 so nothing reads as exactly 100%.
- Milestones: full-run (race 500) and luck-run (a selected run where the 50% bettor held over half after race 50, up to the current race: runs 2 and 5). QA order (+50, Run to 500, Run 2…) reaches both.
- c5 (Blume and Easley 2006, the general result) is context only; the reveal speaks about this model.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
