# Fact-check: garment-overlap-hides-face

Independent claim checks for src/demos/lifehacks/garment-overlap-hides-face. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). Case 'overlap': open = 4·100·60 − 2·overlap·60 cm²; apart, 0 hidden; cloth unchanged. Model statement, consistent with OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here). |
| c2 | verified | Limit line as rendered; no time is computed. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): 4·100·60 = 24,000 cm² both faces of both sheets; at overlap 30 cm, hidden = 2·30·60 = 3,600, open 20,400; apart 24,000. |
| c4 | verified | Matches the spec: title, hook (= question), options 'None: both are out' / '1,800 cm²' / '3,600 cm²', answer 2. Own run: overlap 30 × 60 = 1,800 cm² hides one patch on each shirt, 3,600 cm². |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. |
| recall | verified | Recall card: 2 × 20 × 60 = 2,400 cm²; keyed option 0 is the only right one. Matches the model. Trust-sheet note (W-1078 pattern): worked example at 20 cm overlap, the stage starts at 30 (20 is reachable on the slider). |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 30 the reveal's first sentence is exactly the claim text. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall works a 20 cm overlap; the stage starts at 30 cm (20 is on the slider).

**Result (Pass 52):** 7 verified, 0 disputed, 0 held unverified, 0 withdrawn.
