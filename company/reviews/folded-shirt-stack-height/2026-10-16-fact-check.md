# Fact-check: folded-shirt-stack-height

Independent claim checks for src/demos/lifehacks/folded-shirt-stack-height. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). Case 'layers': height = N × 0.4 × layers, layers 2 → 4; the w2 picture halves the stack's width. Same sheets, half the footprint, twice the height: volume conserved. |
| c2 | verified | Limit line as rendered. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at N = 5: 5 × 0.4 × 2 = 4 cm, 5 × 0.4 × 4 = 8 cm. |
| c4 | verified | Matches the spec: title, hook, question, options '8 cm' / '4 cm' / '2 cm: smaller shirts', answer 0. Own run: 8 cm. |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. |
| recall | verified | Recall card: 5 × 0.4 × 4 = 8 cm; keyed option 2 is the only right one. Same numbers as the stage's start. |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 5 the reveal's first sentence is exactly the claim text. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall uses the stage's 5 shirts, 4 → 8 cm: matches.

**Result (Pass 52):** 7 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.folded-shirt-stack-height.c4: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/folded-shirt-stack-height/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
