# Fact-check: half-size-two-towels

Independent claim checks for src/demos/lifehacks/half-size-two-towels. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). Case 'split-area': value = 2·W·120/10000 in both modes; only the piece count changes (1 → 2). Geometry: two W × 60 halves have the same total face area as one W × 120 sheet. |
| c2 | verified | Limit line as rendered; the model has no edge or thickness term. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at W = 80, 2·80·120/10000 = 1.92 m² both columns (Pieces 1 / 2). |
| c4 | verified | Matches the spec: title, hook, question, options Double / The same / Half, answer 1. Own run: 1.92 m² both ways. |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. |
| recall | verified | Recall card: 2 × 0.8 × 1.2 = 1.92 m² either way; keyed 'It stays the same' is the only right option. Same numbers as the stage's start (80 × 120). |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 80 the reveal's first sentence is exactly the claim text. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall uses the stage's 80 × 120: matches.

**Result (Pass 52):** 7 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.half-size-two-towels.c4: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/half-size-two-towels/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
