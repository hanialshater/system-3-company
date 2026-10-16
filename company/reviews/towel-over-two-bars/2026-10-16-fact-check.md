# Fact-check: towel-over-two-bars

Independent claim checks for src/demos/lifehacks/towel-over-two-bars. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). Case 'exposed': open area = 2·W·140/10000 × 0.5 (touching) or × 1 (two bars); cloth unchanged. Model statement, consistent with OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here) (evaporation from surfaces exposed to unsaturated air). |
| c2 | verified | Limit line as rendered; the stage shows areas only, no time. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at W = 70, 2·70·140/10000 = 1.96 m²; one bar 0.98 m² open (0.98 touching), two bars 1.96 m². |
| c4 | verified | Matches the spec: title, hook, question, options 'None: same towel' / '0.98 m² more' / '1.96 m² more', answer 1. Own run at 70: 1.96 − 0.98 = 0.98 m² more. |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. |
| recall | verified | Recall card: exposed fraction 0.5 → 1, a doubling; keyed 'It doubles' is the only right option. Matches the model. |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 70 the reveal's first sentence is exactly the claim text. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall has no fixture numbers (0.5 → 1): matches.

**Result (Pass 52):** 7 verified, 0 disputed, 0 held unverified, 0 withdrawn.
