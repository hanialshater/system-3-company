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

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED (convention). Text equals studyCatalog; hook = patch r2 1B row. Fixture: card 'Capital, currency and language of Peru?', given Lima / peso / Spanish against Lima / sol / Spanish: 2 of 3, and one-card marking records a single right. Key 'A pass that hides a miss' holds (walk reveal: 'the missed currency left no trace'). |
