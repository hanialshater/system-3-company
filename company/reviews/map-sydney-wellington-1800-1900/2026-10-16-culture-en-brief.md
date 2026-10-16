# Stage A sensitive review: Sydney / Wellington (map-sydney-wellington-1800-1900)

slug: map-sydney-wellington-1800-1900
stage: brief
classes: borders and territory, colonialism and empire, war and violence (occupation, partition or conquest between the frames)
reviewer: cultural-reviewer (W-1558 instance, 2026-10-16)
brief: src/demos/history/map-sydney-wellington-1800-1900/meta.json (misconception, objective, careLine, claims) and map.json (question, options, reveal)
research note: company/research/notes/2026-10-16-provenance-history-maps-100.md
Verdict: go with changes

Set-wide rulings: company/reviews/history-maps-100/2026-10-16-culture-en-brief.md (rulings 1 to 8). Every verdict in this file is read with them. Independence: I did not draft this brief, build the lesson, or write the research note. This is a brief review; there is no walkthrough yet (Stage B follows).

Research tier: A (A likely refuse-list, B fix items, C set-wide only). Reader taken (P3): an Aboriginal reader in Sydney (Eora country) and a Māori reader in Wellington.

Question and answer as drafted: "Do the dots share a map label in both snapshots?" Answer: "Different labels in both". Frames: 1800: Eora | Māori; 1900: New South Wales (UK) | Māori.

## Findings

| Item | Mark | Sentence or element |
|---|---|---|
| F1 | PASS | The question asks what the source labels at two fixed points, not who held the place. |
| F2, F3, F4 | PASS | No moral or political conclusion, counterfactual or single actor in the question, options or misconception. |
| N1 to N3 | n/a | No number about people is shown. |
| N4 | FIX | Modern place names orient the dots; the legend must say so, and give the anchor offset where it is 10 km or more (ruling 5); this lesson has an offset of 0, 17.8 km. |
| N5 | PASS | The prediction is about the shape of the labels, not a count. |
| F5, P1 | FIX | The reveal ends with "missing coverage" and does not say that a label can be wrong for its year or whose drawing it is (research note section 1). Ruling 1. |
| I3, I4 | FIX | The stage caption does not mark lines disputed today, and the first dot polygon is filled in the "good" green (ruling 4). |
| I1, I2, I5 | PASS | No image of people, no score, no celebration effect. |
| L1, L6 | FIX | Source labels are shown verbatim; see lesson-specific lines and ruling 4. |
| P1 | FIX | 1800 names Sydney "Eora", Wellington "Māori" and several hundred Aboriginal nations in view; 1900 names Sydney "New South Wales (UK)" (the trace shows "United Kingdom") and no Aboriginal nation. That is a difference in the two files' coding schemes, and also a coloniser's record. Without a sentence saying so, the lesson shows the colonisation as a label swap. |
| P3 | FIX | Wellington in 1900 is outside any named polygon in the raw test; the generator's anchor picks "Māori" (research note 4.10). A Māori reader may read that as recognition or as erasure; the research lead could not tell, and neither can I. |
| I3 | FIX | The crop crosses 180 degrees (extent 143.5 to 182.7). Polygons from elsewhere ("Rajputs", "Sikhs", "Hong Kong", "Italy", "Montenegro") have paths inside the viewBox. The stage shows false labels. Engineering defect with a cultural effect. |
| L1 | FIX | "Australian aboriginal hunter-gatherers" is source wording with a lower-case "aboriginal"; it is a way of life, not a people. |
| L2 | FIX | Recall 9 on the colonisation of Australia reads as minimisation. |
| L2, P5 (ruling 2) | FIX | Trace shows 1900: "United Kingdom" for "New South Wales (UK)". |
| Recall | FIX | Recall 9 sits on this lesson by rotation, not by fit. Recall 1 fits (ruling 3). |

## Changes required (exact)

1. Ruling 1: end the reveal and the `limits` claim with the added limit sentence, and reword the unlabelled-dot sentence (both in the batch record).
2. Ruling 4: extend the stage caption; replace the "good" green on the first dot's polygon with a neutral hue.
3. Ruling 5: point legend shows "(today's name)" and the anchor offset.
4. Ruling 2: full NAME in the trace and key for: "United Kingdom" -> "New South Wales (UK)".
5. Ruling 3: recall 9 -> recall 1.
6. Ruling 6: add the transition sentence to the reveal and the `limits` claim.
7. principal-engineer (W-1556): fix the antimeridian crop so that no shape from outside the view is drawn. The Stage B walkthrough will check it.
8. cm-history: re-anchor Wellington so that both dots lie inside a named polygon in both years, with the anchor chosen without reference to the answer; if none exists, replace the second point.
9. Add to the reveal: "The 1800 file names Aboriginal nations such as the Eora; the 1900 file names colonies and no Aboriginal nation. That is a difference in what each file records, not evidence about the people." (fact-checker to confirm both statements against the pinned files).
10. Show source wording in quotation marks (ruling 4).

Each new sentence is a claim in meta.json (address, support, source), `unverified` until the fact-checker confirms it. The builder does not mark it verified.

## Verdict and next

Verdict: go with changes. Next (owner): cm-history edits the brief and answers each FIX above in the brief (W-1551, W-1561); the generator owner re-runs the generator after cm-history rules; I confirm in a dated addendum to this file; then the brief-skips line (if any) is removed by cm-history, citing this record and the research note. No publish hold is lifted by this record; Stage B on the walkthrough comes later.

## Addenda

(none yet)
