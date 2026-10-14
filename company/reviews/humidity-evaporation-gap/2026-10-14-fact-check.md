# Fact-check: humidity-evaporation-gap (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson's Demo.tsx (a thin wrapper), the shared engine first (src/components/lifehacks/HomeLesson.tsx: Stage, the two layout buttons, slider, readout, reveal; src/lib/lifehacks/home-models.ts case 'humidity'; the spec in src/lib/lifehacks/home-lessons.ts), then meta.json claims, recall card (rendered by src/components/Feed.tsx) and source fields. No Reset control or animation in this engine path. Source opened: OpenStax College Physics 2e §13.6 'Humidity, Evaporation, and Boiling', the book's own CNXML source, module m42219 from github.com/openstax/osbooks-college-physics-bundle (main, fetched 2026-10-14 via raw.githubusercontent.com; collection lists m42219 as the 6th section of chapter 13; sha256 4d622c5f…4e7). The openstax.org page itself is unreachable here.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Opened OpenStax §13.6 (m42219): 'Relative humidity is related to the partial pressure of water vapor in the air. At 100% humidity, the partial pressure is equal to the vapor pressure ... If the partial pressure is less than the vapor pressure, then evaporation will take place'; 'evaporation is inhibited by high humidity'. At fixed temperature the saturation vapour pressure is fixed and partial pressure = RH x saturation pressure, so the gap is p_sat(1 - RH) and shrinks as RH rises. 'Shows the gap, not a drying clock': engine case 'humidity' computes only value = 1 - RH/100, labelled 'Normalised gap', with no time output. |
| c5 | verified | Convention: a transfer question (spec.recall), not a factual sentence; it is not rendered by HomeLesson or Feed (the recall card uses meta.recall instead). Its presupposition, that high humidity can hinder evaporation at equal temperature, is stated in the opened OpenStax §13.6 ('evaporation is inhibited by high humidity'). |
| recall | verified | Own node: 1 - 0.40 = 0.6, 1 - 0.80 = 0.2, ratio 3.0; the keyed option (index 2, 'Three times as large in the 40% room') is the only one that fits. Formula matches the engine (value = 1 - other/100). 'A smaller gap means less drive for evaporation' follows from the opened §13.6 text (evaporation proceeds when partial pressure is below vapour pressure and stops at 100%). 'Not a drying clock' matches the engine. |

**Result:** all three open claims verified, two on an opened source (OpenStax source on GitHub). No disputes.
