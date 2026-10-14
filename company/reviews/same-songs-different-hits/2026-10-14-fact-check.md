# Fact-check: same-songs-different-hits (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) first, then re-ran the lesson's own code in node 22: the scripts extract the constants and the model function verbatim from Demo.tsx (and mulberry32 from src/kit/random.ts) rather than re-typing them (scratchpad `fc2/`). No walkthrough transcript exists for this slug (artifacts/walkthroughs/ has none), so the stage was read from code. Web: the egress proxy DNS-fails or 403s uvm.edu, toronto.edu, pubmed, europepmc, crossref, cambridge.org and library catalogues; sources were checked through web-search results (quoted abstracts, reference lists, publisher records), as each row says. Easley and Kleinberg: chapter titles from search-quoted catalogue/course pages; no section number confirmed from the book, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-run of simulate() from Demo.tsx: on 3,1,7,1,4,1,1,3; off 2,1,2,1,2,1,2,1; world 3 picks 33,40,7,38,214,158,482,28; no ties with the best song. Robustness (500 blocks, seeds 1000+8b+j): on lowest >=5th 70.2%, >=7th 36.8%; off <=4th 98.2%. Predict answer (7th) agrees. Seed choice (first eight) is disclosed in the source. |
| c2 | verified | Top shares on 34.9-48.2% (prints 35-48%); off 14.7-17.6% (prints 15-18%; "no song above 18%" holds since max is 17.6%). |
| c3 | verified | APPEAL and the weight rule match. **Advisory:** stage rule line "Pick chance = appeal x (1 + earlier picks)" states a weight as a chance (exceeds 1). Suggest "Pick chance ∝ ..." or "Pick weight = ...". Not blocking. |
| c4 | verified | One r() per listener in both modes, before the branch; same seeds. |
| c5 | verified | World 3 best song 7th at every checkpoint 100..1,000; best wins worlds 2,4,6,7. Best wins 42.9% of copying worlds (seeds 1-2,000) vs 12.5% for an equal song, so "quality tilts the odds" holds. Source's "about 45%" (from the brief) is ~43% in my runs; not learner-facing. |
| c6 | verified | Reveal caveat matches; MusicLab is not cited to learners. |
| c7 | verified | Not in learner text. Salganik, Dodds & Watts (2006), Science 311(5762): 854-856, doi 10.1126/science.1121066 (search-quoted abstract): 14,341 participants; social influence increased inequality and unpredictability; best songs rarely did poorly, worst rarely did well. Claim matches the abstract. Medium (primary PDF unreachable). |
| c8 | verified | Not learner-facing. Ch. 18 "Power laws and rich-get-richer phenomena"; search-quoted section list puts rich-get-richer models 3rd and unpredictability 4th, consistent with 18.3-18.4. Sections stay `section_unconfirmed`. |

**Result:** 8 verified, 0 disputed, 0 withdrawn. One advisory (c3 stage rule wording) for demo-builder.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Demo.tsx APPEAL = 1.0..1.7 (1.7/1.0 = 70% more); w = a x (1 + p[i]) with copying on, a with copying off; pick by cumulative interval of u x sum(w), i.e. chance proportional to the weight. Stage rule line now 'Pick weight = appeal x (1 + earlier picks)' / 'Pick weight = appeal only'. NCM-1 advisory resolved. |
| c9 | verified | Ran Demo.tsx stats() at 1,000: on finishes 3,1,7,1,4,1,1,3 (1st in 4, range 1st-7th, lowest world 3); off 2,1,2,1,2,1,2,1 (1st in 4, range 1st-2nd). Both states milestone-gated (copy-1000, nocopy-1000). |

**Reveal check:** Reveal numbers come from stats() at 1,000 listeners in both modes (both milestones).

**Advisory (builder):** 'copying did not hide quality' sits beside a world where the best song finished 7th; it is backed by c9 (1st in 4 of 8 both ways), but 'copying did not stop the best song winning as often' would say exactly what c9 shows.

**Result:** 2 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

| Claim | Check | Result |
|---|---|---|
| c9 | Independent re-implementation (own cumulative-interval draw, kit mulberry32, seeds 1-8): on 3,1,7,1,4,1,1,3 (1st in 4 of 8, range 1st-7th, lowest world 3); off 2,1,2,1,2,1,2,1 (1st in 4, range 1st-2nd). New wording "copying did not stop the best song winning as often" matches 4 = 4. | verified |

**Reveal check:** top shares 34.9-48.2% on vs max 17.6% (shown 18%) off (c2); both states milestone-gated (copy-1000, nocopy-1000). Paragraph 2 = c5; footer c6.

**Result:** 1 verified, 0 disputed. Lesson now: 9 verified.
