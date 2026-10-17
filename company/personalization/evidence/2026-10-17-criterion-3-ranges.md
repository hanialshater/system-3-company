# Criterion 3 evidence: price of a revisit, N7 refresh value, placement

owner: learning-scientist-personalization (Oskar) · run: ls-e3-1017 · date: 2026-10-17
board: W-1564 · brief: company/personalization/batches/2026-10-17-batch-4.md §E3 (anchor `#e3`); mail 20261017T081220705Z-vp-personalization-d2e06513
readers: **personalization-eval** (K3/K4 fill criterion 3's world from the ranges table). Findings also go to vp-personalization and applied-scientist-personalization.
status: **research record, not a learner-facing claim.** I set no world value, no curve and no weight. The ranges are simulator parameter ranges (my scope), written without seeing any criterion 3 text beyond its absence from my reading list, any harness output, or any arm's result. They are not chosen to make any arm win.

**Inputs read:** my E1 ranges (company/personalization/evidence/2026-10-16-criterion-2-ranges.md); my F1 review (…/2026-10-16-criterion-2-fidelity-review.md) rows B6, N7, N9, N13, O1; criterion 2 §I.2, §1.1, §1.2 and the §4 rows for `revisitStopScale` (company/personalization/eval/2026-10-16-criterion-2.md); readout 2 §3 and §7 only (…/2026-10-16-criterion-2-readout.md); src/components/Feed.tsx (`MAX_REVISITS`, the `i % 3 === 1` interleave, the "one quick question" copy); company/product/demo-standard.md line 6 ("one idea in about sixty seconds").
**Not read:** criterion 3's draft (not even its headers; it is on branch perso-c3-k3 and I did not open it), readout 2 §0 and §A, any harness code or output. **No product data of any kind** (privacy ruling A2, company/reviews/_privacy/2026-10-16-personalization-model-inputs.md).

## Marks (same as C0 and E1)

- **[F]** read in the full text of the source (PMC texts have no page numbers: section or paragraph and a verbatim quote).
- **[F-r]** read in the full text of a peer-reviewed paper that reports the primary's finding; primary not reached.
- **[A]** checked against the abstract or the Crossref record (for most rows below, the Crossref record only confirms title, journal, volume and pages; no abstract was deposited). **[S]** secondary (search summary), primary not seen. **[R]** recalled, not re-checked.
- "derived" = my arithmetic on the marked inputs, shown in the row. "product" = a fact about our own shipped code or standard (not learner data).
- Confidence: *high* / *medium* / *low*, as in the B2 memo.

**Access this run.** Only `pmc.ncbi.nlm.nih.gov` OAI-PMH and ID converter, and `api.crossref.org`. `eutils.ncbi.nlm.nih.gov`, `www.ebi.ac.uk` (Europe PMC) and `www.pnas.org` were refused at the proxy. Szpunar, Khan & Schacter 2013 (PNAS, PMC3631699) is in PMC but its OAI record is "unsupported for the given prefix" (not in the open subset), so it is [F-r] through Yang et al. 2018. One new full text read: **Yang, Potts & Shanks 2018**, *npj Science of Learning* 3:8, doi 10.1038/s41539-018-0024-y, PMC6220253 (review of the forward testing effect).

**Which parts are learning science and which are product analytics.** Learning science can bound (a) how long one retrieval item with feedback takes relative to a study episode, (b) the direction of learners' preference between retrieval and restudy, (c) how old knowledge decays, (d) what retrieving it is worth, and (e) whether retrieval placed among new material helps or hurts the new material. It **cannot** give the stop hazard after a card in our feed, session length, or return patterns: those are behaviour in a product, i.e. **analytics-steward's** questions (F1 B6, N9, N13), answerable only from aggregate product data after a privacy read, which this record may not use (A2). Rows 1b and 1c below are therefore marked as analytics questions with only [S] public anchors, and §4 says to sweep them wide.

---

## 1. Price of a revisit

### 1a. Time of a revisit card relative to a lesson card (learning science plus product facts)

| Source | Value | Mark |
|---|---|---|
| company/product/demo-standard.md line 6 | "A lesson is one idea in about sixty seconds." | product |
| src/components/Feed.tsx (copy near line 237; `RevisitCard`, line 251) | "Lessons come back days later as one quick question"; a 3-option item, then the answer and a "why" line (E1 header: 948 of 974 lessons have 3 options) | product |
| McGillivray et al. 2015 (PMC4679590), Fazio & Marsh 2009 (PMC4036076), Fastrich et al. 2018 (PMC6133257) | Lab trivia trials: answer shown for 6 s, 5 s and 2 s after a self-paced guess (E1 §4 table) | [F] (E1) |
| Bar-Ilan thesis (Elias), via search | Learners "spontaneously spent more time on retrieval" than on restudy of the same items | [S] |

**Answer.** A lab test-plus-feedback trial on a short fact lasts roughly 8–20 s (guess, then a 2–6 s answer; my estimate from the E1 rows, [F] for the answer windows, the guess time is not reported). Our revisit adds two lure options to read and a "why" line. Against a 60 s lesson that is a time ratio of about **0.15 to 0.5**, base about **0.3** (derived, low confidence: no study times a 3-option item plus a one-line explanation). Criterion 2's 1 minute vs 2 minutes is 0.5, the high edge. Learners may spend longer on retrieval than on restudy ([S]), which argues against going below 0.15.

### 1b. Chance of stopping after a retrieval item versus after new material (mostly analytics)

| Source | Value | Mark |
|---|---|---|
| Kirk-Johnson, Galla & Fraundorf 2019, *Cognitive Psychology* 115, 101237 | Learners experience retrieval as more effortful, read effort as poor learning, and choose it less ("misinterpreted-effort hypothesis", from the title) | citation [A]; content [S] |
| Karpicke, Butler & Roediger 2009, *Memory* 17(4) | Few students choose self-testing as a study strategy; rereading dominates | [R] |
| Iaconelli & Toppino 2017 (APS poster) | Testing preferred at short lags, restudy at long lags | [S] |
| Fan et al. 2024 (BNU host) | Retrieval chosen less for hard items | [S] |
| Lomas, Patel, Forlizzi & Koedinger 2013, CHI (10K and 70K players, online math game) | Easier versions drew more play in nearly all conditions; the most engaging conditions were the slowest for learning | [S] |

**Answer.** The evidence gives a **direction, not a size**: retrieval is felt as harder than new material, and failure or difficulty shortens voluntary play (Lomas [S]). A revisit that the learner misses is therefore more likely to precede a stop than one they get right, and probably more likely than a new lesson. Against this, a revisit is shorter (1a), so per minute it may cost less. As a per-card multiplier on the stop hazard after a revisit relative to after a lesson: **low 0.5, base 1.0, high 2.0**, with the note that a miss-dependent form (higher after a miss than after a hit) has [S] support for its direction and none for its size. Per minute, multiply by 1/(time ratio from 1a). Confidence: low. **This is an analytics-steward question** and should be replaced by aggregate stop rates per card type once such data exist under a privacy read.

### 1c. Session length in self-paced microlearning or flashcard-style feeds (analytics)

| Source | Value | Mark |
|---|---|---|
| Duolingo blog, "Time spent learning well" | Session length varies widely; the company moved to a target of at least 15 minutes a day ("5 easier sessions or 3 harder ones") | [S] (company blog; self-report) |
| Survey of 75 Indonesian Duolingo users (2025, *IJLHE*) | Modal answer 15–30 min per session (44.4%) | [S] (small, self-report) |
| Criterion 2 §1.1 | 12 card positions, unsourced (readout 2 §3) | (world, not evidence) |

**Answer.** No peer-reviewed source reached gives a session length for a 60-second-card feed. If a session were 5–15 minutes and a lesson 1 minute, that is roughly 5–15 cards, which brackets criterion 2's 12. I give **low 4, base 8, high 15 card positions** as a sweep range only, with confidence **none to low**; it is a product analytics question (analytics-steward), not learning science.

---

## 2. N7, the refresh value of long-held prior knowledge

### 2a. How fast long-held prior knowledge decays

| Source | Value | Mark |
|---|---|---|
| E1 power fits (McGillivray, Murre & Dros, Fazio) | `kept(t) = (1 + t)^(−d)`, d 0.25 / 0.27 / 0.65 (E1 table) | [F] (E1) |
| Jost's second law | Of two traces of equal strength, the older decays more slowly | [R] |
| Bahrick 1984, *J. Exp. Psych.: General* 113(1), 1–29, doi 10.1037/0096-3445.113.1.1 | Spanish learned in school: steep loss over the first ~3–6 years, then stable ("permastore") for 25 to 50 years | [S] |
| Conway, Cohen & Stanhope 1991, *J. Exp. Psych.: General* 120(4) | Cognitive psychology course knowledge over 12 years broadly replicates Bahrick; concepts kept better than names | [S] |
| Custers 2010, *Adv. Health Sci. Educ.* 15, 109–128, doi 10.1007/s10459-008-9101-y | Review: about two-thirds to three-quarters of basic science knowledge kept after one year, just under half after two | citation [A]; values [S] |
| Custers' follow-up cross-sectional study (via a summary page) | "Little knowledge was lost in the first 1.5–2 years after last use", then a logarithmic decline | [S] |

**Derivation (power law, E1 exponents, read 14 days after the episode start, trace age A days at the start):** kept over the 14 days = ((1 + A)/(15 + A))^d.

| trace age A | d = 0.27 (E1 base) | d = 0.65 (E1 high) |
|---|---|---|
| 0 (a fresh trace; what criterion 2's L4 gives a prior-known concept) | 0.48 | 0.17 |
| 30 days | 0.90 | 0.79 |
| 90 days | 0.96 | 0.91 |
| 365 days | 0.99 | 0.98 |

Custers' one-year figure (≈ 0.70 kept after a year, [S]) implies an average rate of about 0.001 per day, i.e. ≈ 0.99 kept over 14 days. Bahrick's permastore ([S]) is consistent with the high end.

**Note on the world's form, not a value.** Criterion 2's L8 makes the rate after day 7 constant (k × shape), so a trace of any age past 7 days still loses about 26% in 14 days at E1 base (exp(−0.08 × 0.27 × 14) = 0.74). That is below every long-held row above. Jost's law ([R]) and the power fits ([F]) say an old trace's rate keeps falling with age. Ageing the prior trace under L8 alone therefore cannot reach these numbers; it would need a separate rate for prior traces. How to do that is the eval's choice.

### 2b. What a retrieval or restudy of a known concept is worth

| Source | Value | Mark |
|---|---|---|
| Cantor, Eslick, Marsh, Bjork & Butler 2015, *Memory & Cognition* 43, 193–205, doi 10.3758/s13421-014-0462-6 | Multiple-choice tests "stabilize access to marginal knowledge" (title): general knowledge that is held but not reliably retrieved is retrieved more reliably later after an MC test | citation [A]; content [S] |
| Berger, Hall & Bahrick 1999, *J. Exp. Psych.: Applied* 5(4), 438–447, doi 10.1037/1076-898x.5.4.438 | Tests stabilize access to marginal and submarginal knowledge (title) | citation [A]; content [S] |
| Butler, Karpicke & Roediger 2008, *JEP: LMC* | Feedback mainly helps low-confidence correct answers; high-confidence correct ones gain little | [R] |
| Butler & Roediger 2007 | Feedback did not change one-month retention when initial performance was high | [S] |
| Metcalfe et al. 2012 (PMC3970786) | Describing Butterfield & Mangels (2003), the P3 amplitude "was also greater to the feedback to low confidence correct responses than to medium confidence correct responses than to high confidence correct responses" (Introduction) | [F] for the sentence; Butterfield & Mangels [F-r]; it is an attention (ERP) measure, not retention |

**Answer.** Refreshing a well-held concept can at most restore what it would have lost before the read, so its gain is bounded by 1 − kept(2a). The gain from first learning a new concept is learnRate × kept of a fresh trace. **Ratio of the refresh gain to the new-learning gain** at a 14-day read, with E1's effective learnRate 0.66 and the same d for both (derived, an upper bound on the refresh side):

- d = 0.27: A = 30: 0.10 / 0.32 = 0.30; A = 90: 0.04 / 0.32 = **0.12**; A = 365: 0.01 / 0.32 = 0.03
- d = 0.65: A = 90: 0.09 / 0.11 = 0.78; A = 30: 0.21 / 0.11 = 1.9 (but d = 0.65 is a fresh-trace exponent from untested reading of lab material, and Custers/Bahrick argue against using it for knowledge held for months)

Range for the refresh-to-new ratio: **low 0.03, base 0.12, high 0.8.** For the decay of a prior-known concept over the 14-day episode, absent any revisit, as kept share of the above-floor increment: **low 0.78, base 0.96, high 0.99**. If the eval writes it as a multiplier m on the learner's k for prior traces (exp(−0.08 × m × 14) = kept): **m ≈ 0.22 / 0.036 / 0.009** (derived; the multiplier, not the kept share, is what a world would set, and setting it is the eval's choice). Retrieval vs restudy of a known concept: the testing effect favours retrieval, and the marginal-knowledge papers ([A]/[S]) say the gain sits with concepts held but not reliably retrieved, not with secure ones. Since the revisit shows the answer and the "why" after any pick, a known concept gets both. Confidence: medium that the ratio is well below 1 for knowledge held for months; low for every number.

**What this says about F1 N7.** In criterion 2's world the ratio was about 1.0 (0.37 vs 0.38, F1 N7). That is above this range's high. It is an observation for F3 to review, not a request.

---

## 3. Placement: retrieval among new material versus retrieval first

| Source | Value | Mark |
|---|---|---|
| Yang, Potts & Shanks 2018 (PMC6220253), "Learning of complex materials" | Szpunar et al. 2013: a statistics video in four ~5 min segments; "the Interim Test group significantly outperformed the other two groups" on segment 4, "wrote down more notes and reported less mind-wandering" | [F] review; Szpunar 2013 [F-r] |
| same, word lists | Interim tests after each list: about "twice as many List 5 words" as interim restudy or distractor | [F-r] |
| same, "Practical implications" | "Instructors can safely administer interim tests during lectures to enhance learning of new information even when different topics are covered and different types of tests are administered" | [F] |
| same, the "borrowed time" section | "The finding that impairment of new learning is greatest in situations characterized by frequent task switching suggests that it may not pose a serious problem in classroom situations … but not enough is yet known about the boundary conditions" (citing Davis, Chan & Wilford 2017, "The dark side of interpolated testing: frequent switching between retrieval and encoding impairs new learning") | [F]; Davis 2017 [F-r] |
| Chan, Meissner & Davis 2018, *Psych. Bulletin* 144, 1111–1146, doi 10.1037/bul0000166 | Meta-analysis of the forward testing effect, overall g ≈ 0.44 (as quoted by Boustani & Shanks) | [S] |
| Boustani & Shanks 2022 (reanalysis) | Standard designs give weak evidence after heterogeneity and publication-bias corrections; **interleaving designs give weak evidence of a negative effect** | [S] |

**Answer.** Retrieval of earlier material placed between blocks of new material helps the new material in lab and lecture studies, mostly through attention and release from interference (Yang 2018 [F]). Two limits apply. (i) **Switching often between retrieval and new encoding can hurt the new learning** (Davis 2017 [F-r]; Boustani & Shanks [S] on interleaved designs). (ii) Every block in these studies lasts minutes, and the retrieval is of material learned minutes earlier. Our feed switches after every 60-second card, and a revisit retrieves a lesson from days ago. No source reached compares "revisits first, then new" with "one revisit per three new" at card scale. Range for an effect of placement on encoding of the next new card, as a multiplier on its learnRate after a revisit relative to after a lesson: **low 0.9, base 1.0, high 1.1**, centred on no effect, low confidence, direction unresolved. The larger, better-supported placement effect is through stopping (1b, 1c): with revisits first, an early stop leaves the session with only revisits; with the Feed.tsx interleave, new lessons come first (F1 B6). That is a product-structure effect, not a learning one.

---

## Ranges table (for criterion 3's world)

Units per row. "Base" is a centre for reporting, not a value to tune to. Rows not listed are unchanged from E1.

| parameter | unit / meaning | low | base | high | source (mark) | confidence | science or analytics |
|---|---|---|---|---|---|---|---|
| revisit time ratio | time of a revisit card ÷ time of a lesson card | 0.15 | 0.3 | 0.5 | product (60 s lesson; "one quick question"); lab trial windows E1 [F]; derived | low | science + product |
| revisit stop multiplier, per card | stop hazard after a revisit ÷ after a lesson | 0.5 | 1.0 | 2.0 | Kirk-Johnson 2019 [A]/[S]; Lomas 2013 [S]; Karpicke 2009 [R] (direction only) | low | **analytics** (direction from science) |
| miss vs hit after a revisit | whether the stop multiplier is higher after a missed revisit | no | yes, unsized | — | Lomas 2013 [S]; Fan 2024 [S] | low (direction) | **analytics** |
| session length | card positions per session | 4 | 8 | 15 | Duolingo blog [S]; survey [S]; derived at 1 min per card | none-low | **analytics** |
| prior-known 14-day kept | kept share of the increment over the episode, no revisit | 0.78 | 0.96 | 0.99 | power fits E1 [F], derived for A = 30/90/365 d; Custers [A]/[S]; Bahrick [S]; Jost [R] | low (medium for "well above 0.5") | science |
| or, prior-trace k multiplier m | on the learner's k, prior-known traces only | 0.22 | 0.036 | 0.009 | derived from the row above at k = 0.08 | low | science |
| refresh-to-new gain ratio | gain at a 14-day read from serving a prior-known concept ÷ from first learning a new one | 0.03 | 0.12 | 0.8 | derived (upper bound) from the rows above and E1 learnRate | low (medium for "well below 1") | science |
| placement effect on encoding | learnRate multiplier for a new card right after a revisit, relative to after a lesson | 0.9 | 1.0 | 1.1 | Yang 2018 [F]; Szpunar 2013 [F-r]; Davis 2017 [F-r]; Boustani & Shanks [S] | low; direction unresolved | science |

---

## 4. What the evidence cannot reach (sweep these wide)

1. **Stop hazard after a revisit, and session length.** No study reached measures stopping per card type in a voluntary short-card feed. Learning science gives the direction only: retrieval feels harder, failure ends play sooner. The size, and whether it is per card or per minute, belongs to product analytics (analytics-steward) and needs aggregate data under a privacy read (A2 forbids it here). Sweep the multiplier at least 0.5 to 2 and session length 4 to 15. Report results per cell, not pooled.
2. **Return patterns** (F1 N13). Nothing here. Daily returns remain a world assumption. An irregular-return cell would test it, but I give no distribution.
3. **The age of a prior-known concept.** The 2a/2b ranges depend almost entirely on how long ago the learner learned it (30 days vs a year spans 0.30 to 0.03 in the ratio at d = 0.27). Our lessons target misconceptions, so a learner who knows the concept may have known it for years or may have just read about it. The evidence cannot pick an age. Sweep the full range, and keep criterion 2's fresh-trace rule (ratio ≈ 1) as an outer cell so the O1 split can show how much of the oracle's gain depends on it.
4. **Marginal vs secure prior knowledge.** The refresh gain depends on that split (Cantor 2015, Berger 1999, both [S] for content), and nothing reached gives a share for misconception items.
5. **Card-scale placement.** Every placement study reached uses blocks of minutes and retrieval of material learned minutes earlier. Revisit-first versus 1-in-3 at 60-second cards, with retrieval of lessons from days ago, is untested. Centre the encoding effect on 0, and attribute any difference between the interleave and revisits-first cells to stopping and slot structure.
6. **Unreached texts:** Szpunar 2013 (in PMC but not in the open subset), Davis 2017, Chan 2018, Boustani & Shanks 2022, Kirk-Johnson 2019, Cantor 2015, Berger 1999, Bahrick 1984, Custers 2010, Lomas 2013 (a CMU-hosted PDF exists). Lomas and Boustani & Shanks (UCL Discovery) are the two most worth a session with author-host access: they would size row 1b and the sign of row 3.

## Sources read in full this run (PMC OAI-PMH)

PMC6220253 (Yang, Potts & Shanks 2018). Re-opened for checks: PMC4679660, PMC3970786, PMC4036076, PMC4492928 (E1's full texts; only the Metcalfe 2012 sentence in 2b is newly quoted). Citations were checked against Crossref by DOI where a DOI is given.
