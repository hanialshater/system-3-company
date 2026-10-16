# Fact-check: sure-million-or-long-shot (2026-10-16)

## FC pass 54b (2026-10-16)

Checker: fact-checker (Ingrid). Batch: company/ops/dispatch-requests/2026-10-16-r2-quality.md item B5 (board W-975, W-1059). Rules applied: my W-975 step-9 statement as written (company/domains/behavioral.md, "Fact-checker's step-9 statement": (a)-(c) can verify; (d) held by default).

Order (artifact first): production build of the main checkout (NEXT_DIST_DIR=.next-befc, `next start -p 3951`), then `npm run walkthrough -- sure-million-or-long-shot --url http://localhost:3951` with --choose 0, 1, 2, transcript cut at the appendix (R1: `sed '/^## Appendix: trust sheet/,$d'`). The walkthrough drives one branch only, so I drove every combination the controls allow with my own Playwright script against the same server and read each rendered reveal. Then the meta.json claims, then my own node re-derivation (seeded LCG, no network, 200,000 random increasing utility functions for the risk claims; sweeps over d and rho for the time claims), then a re-run of cm-behavioral's check script (`node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs`: "all checks pass"). Sources opened through PMC OAI-PMH (`pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:<id>&metadataPrefix=pmc`, HTTP 200). I did not read build.md or design.md. No claim in this lesson was written by me: the git history shows cm-behavioral's and the builder's commits only, and the source fields say "Builder statement".

Result: 10 of 11 verified, 1 held (type (d)), 0 disputed. Statuses and per-claim notes are in src/demos/behavioral/sure-million-or-long-shot/meta.json (each note starts 'FC pass 54b').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | EU(1A)-EU(1B) = EU(2A)-EU(2B) = 0.11u(1M) - 0.10u(5M) - 0.01u(0); 200,000 random increasing u: 0 mixed, 9,956 1A+2A, 190,044 1B+2B. Predict answer and feedback seen; mixed-branch sentence seen. Edge case: an exactly indifferent chooser may take either card. That set has measure zero, and 'takes' is read as strict preference, so it is not a dispute. |
| c2 | verified | Removing the shared 89% leaves 11% $1M against 10% $5M + 1% $0 in both pairs; the toggle was seen splitting the 89 block out of every card; the sentence appears in all 4 branches. |
| c3 | verified | With u(0) = 0: 1A iff u(1M) > 0.909·u(5M); 1B iff u(5M) > 1.1·u(1M). Witnesses: 1 - e^(-3x) 0.950; sqrt 2.236. 'Worth' is felt value measured from $0, the derivation's normalisation. |
| c4 | verified | All four card combinations driven on the stage; each reveal reads as claimed; follows from c1 and c3. Same indifference edge case as c1. |
| c5 | verified | Brandstaetter, Gigerenzer & Hertwig 2006, PMC2891015: the certainty effect is a 'preference for security in the neighborhood of certainty' (Allais 1979), shown with a sure first choice and the long shot in the second pair, which is the 1A+2B pattern. Cicerale et al. 2022, PMC9337702, gives the same sense. One opened source (PMC4643135) labels the patterns differently (AD 'PT compatible'). 'Not a slip' is the charter's wording, checked as wording only. |
| c6 | **held** (unverified) | Type (d). W-975 has no (d) statement yet; second-hand under W-1059 (Ruggeri 2020 is not in PMC, and the publisher is blocked). **Scope gap:** Cicerale et al. 2022 (PMC9337702) says Ruggeri et al. 'substantially confirmed the original findings, albeit with attenuated effects, in a study enrolling 4098 participants from 19 countries'. That is prospect theory's problem set as a whole. The passage does not name the certainty effect or the Allais pair, so 'it held up, weaker than first reported' is narrower than the source. 4,098 and 19 match. The line is rendered in both mixed branches of the current build. |
| c7 | verified | Cards seen: 1A 100% $1M; 1B 10/89/1; 2A 11/89; 2B 10/90; each sums to 100. |
| c8 | verified | Gloss on every frame; it states expected utility with an increasing u accurately. |
| c9 | verified | Both pairs on screen together; the predict states the pair 1 to pair 2 link before any choice; the reveal stays locked until a card in each pair is chosen and the toggle is pressed. |
| c10 | verified | Hook seen; pair 2 has no sure option (c7). |
| c11 | verified | EU(X1)-EU(X2) = EU(Y1)-EU(Y2) = 0.25u(2k) - 0.20u(3k) - 0.05u(0): 0 failures in 200,000 random u; gambles sum to 100%; the recall answer and its 'why' match. |

## Findings for the builder and cm-behavioral (not disputes)

1. **c6 is on screen now** in both mixed branches. It blocks publishing while unverified. Verifying it needs more than the W-1059 ruling. It also needs a reachable source for the **certainty-effect item** of Ruggeri et al. 2020 (for example the item-level result in a PMC or raw.githubusercontent.com copy), because the opened secondary source speaks only of 'the original findings' overall. If no such source turns up, use the fallback (HELD_LINE = false). Its text is in the check script (75 and 80 words).
2. **Indifference (c1, c4):** 'no utility function fits your two choices' is false only for an exactly indifferent chooser. I am not asking for a change. If the designer ever wants it airtight, 'no utility function that prefers one card' would do it.
3. **Toggle before cards:** pressing 'Take away the shared 89%' first relabels the cards, and the reveal stays locked until a card in each pair is chosen. The claims are unaffected. I am noting it only because the QA tester may want to walk that path.

## Unrecorded claims

None. I compared every sentence in the transcript (hook, predict, options, panel, card labels, toggle states, four reveals and feedback) with c1-c11.

## What would change a verdict

- c6 → verified: a dated W-975 (d) statement that covers this line, a W-1059 ruling that accepts this second-hand route, and the gap named in the c6 row closed by an opened source.
- Any verified claim → disputed: a change to Demo.tsx reveal text, cards or stage labels after 2026-10-16. Re-check on any version bump.
