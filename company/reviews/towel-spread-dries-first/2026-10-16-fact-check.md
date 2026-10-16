# Fact-check: towel-spread-dries-first

Independent claim checks for src/demos/lifehacks/towel-spread-dries-first. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). In this model the folded towel shows 2·W·1.4/4 m² and the spread towel 2·W·1.4 m², and time = 0.6/(area × 0.102) at a constant flux per m², so time falls as open face grows (12 h → 3 h at W = 70). The physical part ('water leaves through the face open to the air') is consistent with OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here): evaporation happens at the liquid surface while the air is below saturation. |
| c2 | verified | Limit line as rendered in the reveal (spec.limit). Consistent with the model's stated constant flux and the 12 h hook. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): case 'dry': area = 2·p·140/10000/layers, layers 4 (A) or 1 (B); time = 0.6/(area·0.1020408163). At p = 70: 0.49 m² → 12 h, 1.96 m² → 3 h. |
| c4 | verified | Matches the spec: title, hook (= question), options '3 h' / '6 h' / '12 h: same water', answer 0. Own run at the start input 70: spread flat 3 h. |
| recall | verified | Recall card (meta.recall): A 1 m², B 2 m², same water and flux; time ∝ 1/area, so B takes half as long; keyed option 2 is the only right one. Matches the model. Trust-sheet note (W-1078 pattern): the worked example uses 1 and 2 m², not the stage's 0.49 and 1.96 m². |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 70 the reveal's first sentence is exactly the claim text ('… 0.49 m² … 12 h … 1.96 m² … 3 h … 4 times the face, so it dries 4 times faster'). Ratio is 4 at every slider value. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall works 1 m² vs 2 m²; the stage starts at 0.49 vs 1.96 m².

**Result (Pass 52):** 6 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED. Text equals the spec title, hook, question, options, answer 0; hook = patch r2 1D row. homeColumn at p = 70: folded 0.49 m², 12 h; spread 1.96 m², 3 h (0.6 / (1.96 × 0.1020408163) = 3.00). Key '3 h' holds; the new hook is a question and states no number. |
| recall | verified | VERIFIED (derivation). recall question and why = patch r2 1D rows, no 'flux'. Same water W and same per-area speed k: t = W/(A k), so A = 2 m² gives half the time of A = 1 m²; keyed option 2 'B takes half as long' is the only right one, and it matches the engine's constant-rate formula. The why's limit sentence is kept. |
