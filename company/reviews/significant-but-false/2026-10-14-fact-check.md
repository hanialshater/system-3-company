# Fact-check: significant-but-false (2026-10-14)

Board: W-655. Lesson: src/demos/probability/significant-but-false/ (status draft, version 1).

Checker: fact-checker (I did not write these claims). Method: I read Demo.tsx (and model.ts where there is one) on every reachable path, including the dynamic strings, locked state, toggles and the order of presses, before reading the claims. Then I re-ran every number in node from my own copies of the lesson logic. The scripts are kept in artifacts/fact-check-wave-j/ (prob.mjs). Web: only PyPI, npm and raw.githubusercontent.com were reachable, so no web page, paper or book could be opened. The sources I did open: the CRC 'Standard Thermodynamic Properties of Chemical Substances' table, JANAF 1998, ATcT 1.112 and the Perry/DIPPR-105 density fits, all as transcribed in the PyPI package chemicals 1.5.2; and the NASA TM-4513 polynomials (McBride, Gordon & Reno 1993) from Cantera's data/nasa_gas.yaml and nasa_condensed.yaml. Where a verdict rests on a derivation instead of a source, the claim's note says so. No verdict rests on a source I could not open. The brief check script company/domains/briefs/checks/probability-round4-check.mjs was also re-run (brief 56 lines agree). No sources were needed except for c5.

Unrecorded claims: I compared every learner-visible sentence (hook, question, options, stage labels, reveal, recall) with the claims list and found none unrecorded.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation re-run in node (own copy of counts()): 1,000 x 0.10 x 0.8 = 80 real, round(900 x 0.05) = 45 flukes, 45/125 = 36.0%; marked() draws exactly 80 rings and 45 crosses. Brief check script agrees. No source needed. |
| c2 | verified | Derivation re-run: 1%: 8 real, 49.5 drawn as 50 (Math.round), 50/58 = 86.2% (unrounded 86.1%), both 86%; 50%: 400 and 25, 5.88% -> 6%. Grid draws exactly those counts. |
| c3 | verified | Derivation (Bayes' rule): P(dud / pass) = 0.05 P(dud) / P(pass) depends on the prior share; c1 and c2 are instances. Recall check: 1 in 50 true gives 75% of passes as flukes, so 'could easily be a fluke' holds. |
| c4 | verified | Convention, consistent: the caption 'Tests catch 80%; 5% of duds pass.' is on the stage and the code uses CATCH 0.8, FLUKE 0.05. |
| c5 | unverified | Held: the Ioannidis (2005) paper could not be opened (web blocked) and the claim cannot be derived. It is a citation, not in the lesson text, but it shows in the ledger. Withdraw it, or keep it held until someone opens the paper. |

**Result:** no disputes. Held unverified: c5, because the source could not be opened (see the notes); publishing waits until these are withdrawn or sourced. Everything else is verified.

## Pass 37 (2026-10-14, W-732)

Checker: fact-checker, a fresh instance. I did not write, build or record these claims. Scope: confirm that c5, withdrawn in v2 (W-676), is never shown to learners. Method: I grepped Demo.tsx and the title, hook and recall in meta.json for the citation, and traced every route by which claims reach the client: src/lib/feed-index.ts, src/app/api/meta/[slug]/route.ts and src/components/DemoCard.tsx.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | withdrawn (kept) | NOT CONFIRMED as 'never shown'. The lesson itself is clean: the citation (Ioannidis 2005, PLoS Medicine) is not in Demo.tsx, the title, the hook or the recall. But the learner-facing 'Why trust this?' sheet (src/components/DemoCard.tsx lines 103-113) lists every claim in meta.json with no status filter. It loads them from /api/meta/<slug> (the full meta) or from the full prop on /d/<slug>. So a learner who opens the sheet sees this claim's text, which begins '(Not shown to the learner.)', with a 'withdrawn' pill and its source. The footer count (src/lib/feed-index.ts line 16) also counts withdrawn claims in the total, so the lesson can never show 5/5: it shows 4/5. This is platform-wide, not specific to this lesson: 36 lesson meta.json files hold a withdrawn claim. company/knowledge/README.md line 18 says 'A withdrawn claim must also leave the lesson's text'. Whether the trust sheet counts as lesson text is a product/platform call. I route it to platform-engineer (filter withdrawn claims out of the sheet and the count, or label them as removed) and do not block on it here. |

**Result:** c5 stays withdrawn, and no claim status changed. c1-c4 are verified and were not reopened. Open item: the trust-sheet display of withdrawn claims (platform-engineer).
