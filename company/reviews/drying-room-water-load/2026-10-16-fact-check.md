# Fact-check: drying-room-water-load

Independent claim checks for src/demos/lifehacks/drying-room-water-load. Newest pass at the bottom.

## Pass 52 (2026-10-16, Home W2)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: Home wave W2 (r11 fix plan): the claims demo-builder reset when the lesson moved to engine 2. Method: I read the rendering code first (HomeLesson.tsx StageV2 / BowStage, src/lib/lifehacks/engine-v2.ts, home-models.ts and this lesson's home-lessons.ts spec), then ran copies in node (scratchpad fc52/scripts/home.mts) to print both Seen columns and the reveal's first sentence at the slider's start and both ends, and read meta.recall as the Feed renders it. Sources opened this pass: OpenStax College Physics 2e §13.6 and §14.6 (CNXML from the publisher's GitHub repository) and Daily-Diamond et al. 2017 (PMC OAI API). I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts). Case 'water-load': water = 250 g × count. Mass balance: the water that leaves the shirts as vapour is in the room air (OpenStax College Physics 2e §13.6, opened 2026-10-16 as the book's CNXML source (github.com/openstax/osbooks-college-physics-bundle, modules/m42219/index.cnxml via raw.githubusercontent.com, sha256 4d622c5f94e2…; openstax.org itself is blocked here): evaporation is water entering the vapour phase of the surrounding air). It does not compute humidity. |
| c2 | verified | Limit line as rendered. |
| c3 | disputed | The arithmetic holds (250 g for one, 12 × 250 = 3,000 g at the start), but the claim also says '30m³ room shown only as context', and the v2 stage shows no room volume: StageV2 renders the Seen table (Shirts counted, Water into the air), the shirt picture and the slider. result.inputs, the only place '30m³room' appears, is printed only by the v1 Stage. The trust sheet shows this claim text to the learner, so it names something that is not on the stage (W-1078 pattern). Fix (demo-builder): drop '30m³ room shown only as context' from the claim text (and spec.formula), or show the room on the stage. Re-check after the change. |
| c4 | verified | Matches the spec: title, hook, question 'Each wet shirt holds about 250 g of water. Twelve dry indoors…', options 'A few grams' / '250 g' / '3,000 g', answer 2. Own run: 12 × 250 = 3,000 g. |
| recall | verified | Recall card: 6 × 300 g = 1,800 g = 1.8 kg; keyed option 0 is the only right one. Trust-sheet note (W-1078 pattern): worked example 6 × 300 g; the stage uses 250 g per shirt. |
| seen | verified | Read HomeLesson.tsx StageV2 and src/lib/lifehacks/engine-v2.ts (homeColumn, homeRevealLine) first; own run of evaluateHome/homeColumn/homeRevealLine on the home-lessons.ts spec (scratchpad fc52/home.mts): at p = 12 the reveal's first sentence is exactly the claim text. Note for demo-builder: at 1 shirt the same line reads 'Whole load: 1 shirts'. |
| c6 | held unverified | HELD UNVERIFIED (as in LH-2, pass 35 and pass 38). The warning still renders in the reveal (spec.warning). The physical clause (dried water goes into the room air) is a mass balance and true. The damp-and-mould advice needs a housing or public-health body; none could be opened from this host (only raw.githubusercontent.com and the PMC OAI API are reachable). Not verified from memory or search snippets. |

**Trust-sheet check (W-1078 pattern, for this wave):** recall works 6 towels × 300 g; the stage uses 250 g per shirt. c3 also names a 30 m³ room that the stage does not show (disputed above).

**Result (Pass 52):** 5 verified, 1 disputed, 1 held unverified, 0 withdrawn.
