# Fact-check: one-question-one-card

Independent claim checks for src/demos/lifehacks/one-question-one-card. Newest pass at the bottom.

## Pass 52 (2026-10-16, W-1144)

Checker: fact-checker, a fresh instance. I did not write, build or record any of the claims checked here. Scope: W-1144: the claims demo-builder reset or added in the lh-study merge (e8e116a: templates TP-3/TP-4/TP-5/TP-8, waves W1 and W9). Method: I read the rendering code first (StudyLesson.tsx, RetrievalLesson.tsx, src/lib/lifehacks/studyModels.ts, studyStages.ts, studyRecall.ts and this lesson's studyCatalog.ts spec), then ran copies of the engine in node (scratchpad fc52/scripts/sim.mts, dump.mts) to print the reveal sentence and readouts at the start layout, after Swap first / the stage button, and at the target. Claim texts were compared with that output; I read build.md only after the verdicts were written. No build, server or screenshot.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Matches studyCatalog: hook, question 'Card: 'Capital, currency and language of Peru?' You answer two of three and mark it right. What did the card record?', answer 'A pass that hides a miss'. |
| c3 | verified | Read RetrievalLesson.tsx CompoundStage first: 'Mark as one card' draws one ✓ ('one mark: right'); 'Split into 3 cards' marks capital, currency, language from the stipulated Lima · peso · Spanish. Chips 'One card: right', 'Three cards: 2 right, 1 wrong'. Reveal = compoundObservation plus the principle; no benefit claimed. |
| c4 | verified | Own run matches: given Lima · peso · Spanish; one card records a single right; three cards mark currency wrong ('it is sol'); reveal 'As one card, the record is a single “right”: the missed currency left no trace. As three cards, the currency card is marked wrong (peso, not sol).' |
| c5 | verified | cia.gov is blocked from this host (proxy 403; WebFetch DNS failure), so I opened the World Factbook's Peru entry through the factbook/factbook.json mirror (raw.githubusercontent.com/factbook/factbook.json/master/south-america/pe.json, fetched 2026-10-16, sha256 ff9c33e0fd34…). It reads: Capital 'Lima'; Languages 'Spanish (official) 82.9%, Quechua (official) 13.6%, Aymara (official) 1.6% … (2017 est.)'; Exchange rates 'nuevo sol (PEN) per US dollar'. So Lima, Spanish (official) and Quechua and Aymara (also official) are confirmed, and the currency is the sol/nuevo sol (PEN), not a peso. The Factbook still uses the pre-2015 name 'nuevo sol'. Ley 30381 (El Peruano, 14 Dec 2015) renamed it 'Sol', but I saw that only in search results; the official pages (elperuano.pe, bcrp.gob.pe) are blocked here. The stage's 'sol' is right either way. Caveat: this was a mirror, not cia.gov. Suggest demo-builder add a source that names the 'Sol' (BCRP or Ley 30381). |

**Result (Pass 52):** 4 verified, 0 disputed, 0 held unverified, 0 withdrawn.
