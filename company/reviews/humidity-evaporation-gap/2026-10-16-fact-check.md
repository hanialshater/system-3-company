# Fact-check: humidity-evaporation-gap

Independent claim checks for src/demos/lifehacks/humidity-evaporation-gap. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here): 'Relative humidity is related to the partial pressure of water vapor in the air. At 100% humidity, the partial pressure is equal to the vapor pressure, and no more water can enter the vapor phase. If the partial pressure is less than the vapor pressure, then evaporation will take place'; 'At its maximum, denoted as saturation, the relative humidity is 100%, and evaporation is inhibited.' At one temperature, RH is the share of the saturation amount, so 80% air is close to full and the gap to full (the card's 'push') is smaller. Matches the claim. |
| c2 | verified | Limit line as rendered. Note for demo-builder: this claim's source field still quotes the old model ('Normalised gap … RH=max(0,input−30)'); the stage now uses 'Drying push = 100 − humidity' with the drier room 40 points lower. The claim text is unaffected. |
| c3 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): case 'humidity': humid RH = p, drier RH = max(0, p − 40); push = 100 − RH. At p = 80: 20 and 60. |
| c4 | verified | Matches the spec: title, hook, question, options 'No weaker: same warmth' / 'A bit weaker' / 'A lot weaker', answer 2. Own run at 80: push 20 against 60, one third, which fits 'a lot weaker'. |
| c5 | verified | Transfer prompt (spec.recall). Still not rendered: HomeLesson.tsx never reads spec.recall, and the Feed recall card uses meta.recall. Its presupposition matches the model. High humidity hindering evaporation is stated in OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here). |
| recall | verified | Recall card: 1 − 0.4 = 0.6, 1 − 0.8 = 0.2, three times; keyed option 2 is the only right one. 'Less drive for evaporation' follows from OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here). Same 40/80 numbers as the stage. |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 80 the reveal's first sentence is exactly the claim text ('… 80 % … push 20 of 100 … 40 %, push 60 … 3 times as hard'). |

**Trust-sheet check (W-1078 pattern, for this wave):** recall uses the stage's own 40% / 80%: matches.

**Result (Pass 52):** 7 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 61 (fact-checker, SO-10-2, 2026-10-16; shared review server 5b2fee7, R3a pass)

- lifehacks.humidity-evaporation-gap.c4: verified
- lifehacks.humidity-evaporation-gap.recall: verified

Reasons and fixes: each claim's source in src/demos/lifehacks/humidity-evaporation-gap/meta.json, and company/reviews/lifehacks-200/2026-10-16-fact-check-pass61.md.
