# Fact-check: mild-preferences-sharp-divides, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write these claims). Method: read Demo.tsx, abm.ts and the walkthrough transcript (artifacts/walkthroughs/mild-preferences-sharp-divides/transcript.md) first, then re-ran the lesson's own engine (`abm.ts` copied unchanged into a scratch dir, run under node 22.22) over seeds 1-500, plus an independent identity-tracking re-implementation of `tick()` whose final grids match the engine exactly for seeds 1-5.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 30%: ~50% -> ~75%, every run settles | verified | Seeds 1-5: start 49.6/50.1/49.6/51.8/50.7%, end 75.5/77.3/75.9/75.0/74.2%, settle at ticks 15/13/18/13/11. Seeds 1-100: end 71.8-79.0%, mean 75.7%, ticks 8-18, 100/100 settled. Extended to seeds 1-500: all settle (max 24 ticks), end 71.8-80.2%. Start range 48.3-51.8%. Transcript run (seed 2) shows 50% -> 77% at tick 13, matching. Stage quotes the learner's own run. |
| c2 10%: stays ~50-52%, settles in a few ticks | verified | Seeds 1-100 end 49.6-53.8% (mean 51.2), settle in 1-4 ticks; seeds 1-500 end 49.4-54.0%, max 4 ticks. "About 50% to 52%" is the typical range; a few seeds reach 53-54%, within "about". Transcript seed 2: 52% at tick 2. |
| c3 50% ~87-88% settles; 70% usually not settled at 60, ~98%, few % unhappy | verified | 50%: seeds 1-100 end 85.8-90.5% (mean 87.7), all settle in 12-36 ticks. 70%: seeds 1-5 end 98.0-99.3% at tick 60, 0.4-1.7% unhappy; seeds 1-100 mean 98.1%, 5/100 settle, 0-5.7% still unhappy. Stage reports "not settled" with the unhappy share (transcript: "Tick 60 · Like 98% · 2% still unhappy"). |
| c4 30% household is content as a minority | verified | `unhappy` is `like*100 < pct*occ`, so a household is content whenever like share >= 30%, i.e. other group up to 70%. Empty cells are not counted, consistent with "neighbours". |
| c5 moves unsettle happy households; grid sorts into blocks | verified | Own identity tracking at 30%: seeds 1-5 had 247/251/250/239/263 unhappy at tick 0; 137/143/142/100/95 households happy at tick 0 later became unhappy and moved; 339-394 distinct movers, 550-664 moves. Matches the builder's ranges. Blocks: like share ~75% (c1) and visible in walkthrough frames. |
| c6 Schelling 1971 citation | verified | See source note below. |
| c7 toy model, disclosed parameters | verified | Stage shows "Toy model.", "40×40 · 8 nearby cells · 10% empty · seed N"; reveal caveat present. Constants SIZE 40, EMPTY 0.1 in abm.ts. No real city named. |
| c8 content-as-minority households can still sort sharply | verified | Restates c1, c4, c5 for the model; recall "why" says the same and stays inside the model ("In Schelling's model"). |

**Schelling citation (c6).** Direct fetches of doi.org, tandfonline.com and api.crossref.org were blocked from this session (proxy 403 / DNS), so I could not open the publisher record. What I could confirm through web search indexes:
- Journal of Mathematical Sociology, vol. 1, 1971, pp. 143-186: consistent across a University of Zurich scan whose header reads "1971, Vol. 1, pp 143-186", a BibSonomy BibTeX record (volume 1, number 2, pages 143-186, Taylor & Francis), and Hegselmann's JASSS 20(3) 15 history, which says the paper appeared in the journal's second issue.
- DOI 10.1080/0022250X.1971.9989794: an exact-string search returns citing works (e.g. Schiff 2014, WIREs Computational Statistics; Aging effects in Schelling segregation model, PubMed 36371496) that give this DOI for this paper.
Verdict: the citation as written (JMS 1(2): 143-186, 1971, doi:10.1080/0022250X.1971.9989794) is correct. Confidence high on journal/volume/pages/year, moderately high on issue and DOI (secondary records only; publisher page not opened). A human opening https://doi.org/10.1080/0022250X.1971.9989794 once would close it fully. Non-blocking suggestion for the builder: the meta source says the stage rule is a simplified variant; c6's text could say "a simplified version of Thomas Schelling's model" so the trust sheet matches.

**E&K reference (ch. 4, section_unconfirmed 4.5).** The Cornell PDF and Cambridge pages could not be fetched. A search-index read of the Cambridge front matter / TOC PDF (assets.cambridge.org/97805211/95331) reports "4.5 A Spatial Model of Segregation", p. 96, in chapter 4 (p. 77). Strong corroboration, but from a search summary, not a page I opened, so I leave `section_unconfirmed` as is; the CM or builder can promote it once someone reads the TOC directly.

Unrecorded claims: none found. Every sentence in the hook, predict, stage and reveal maps to c1-c8.

Result: 8 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Citation re-confirmed by search (bibliographic record and UZH full-text PDF listing): Schelling, 'Dynamic Models of Segregation', J. Math. Sociol. 1(2): 143-186 (1971), Taylor & Francis; the paper's simulation has two groups sorting into neighbourhoods. 'A simplified version' matches the stage rule (move to a random empty cell) and the reveal caveat. Primary PDF not opened through the proxy. |
| c9 | verified | Ran the lesson's abm.ts run() for seeds 1-100: unhappy at tick 0 at 30% is 15.7-20.1% (mean 17.8%, about 1 in 6); all-like share at tick 0 0.5-2.4% (mean 1.2%); at the end, 10%: mean 2.2%; 30%: mean 30.6% (23.6-38.8); 50%: mean 58.4%. Seed 1: 247 of 1,440 unhappy, 1.4% -> 31.7%; seed 2: 0.6% -> 35.4%. All 100 runs settle at 10/30/50%. Matches. |

**Reveal check:** Reveal quotes only the learner's own finished runs (pinRun, others, cascade count from that run); the 30% run and another threshold are milestone-gated. No unbacked sentence.

**Result:** 2 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. v3 changed only the replay timing (8 frames, 45 ms), the stage-fit floor and a chip aria-label ("Moves if under p% like neighbours", matches the rule in the predict and c1). No model or reveal text changed. Re-read predict and reveal against the verified claims; no new learner-visible claim found.

**Result:** 0 status changes.
