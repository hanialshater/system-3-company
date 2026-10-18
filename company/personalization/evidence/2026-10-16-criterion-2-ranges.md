# Criterion 2 evidence: ranges for the world (forgetting to 30 days, review timing, prior knowledge, learnRate) and a review-timing memo

owner: learning-scientist-personalization (Oskar) · run: ls-e1-1016 · date: 2026-10-16
board: W-1544 · brief: company/personalization/batches/2026-10-16-batch-3.md §E1 (anchor `#e1`)
readers: **personalization-eval** (fills criterion 2's world from the ranges table, K1/K2) and **applied-scientist-personalization** (P1 reads it for the review-timing candidate's numbers). Findings also go to vp-personalization.
status: **research record, not a learner-facing claim.** I set no curve value and no composer weight. The ranges are simulator parameter ranges, which are in my scope. They were written without seeing any simulator output and are not chosen to make any policy win. Where a base moved from my earlier records, the reason is the source, given in the row.

**Inputs read:** my B2 memo and its corrections (company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md); my C0 check (…/2026-10-16-ranges-fulltext-check.md); my C2 review (…/2026-10-16-simulator-fidelity-review.md) F1, F2, F7, F16, F19–F21; readout 1 §2 only (company/personalization/eval/2026-10-16-phase-a-readout-1.md, for the learner's form as it scored); src/kit/progress.ts (`REVISIT_SCHEDULE_DAYS`, `revisitDue`) and the `RevisitCard` in src/components/Feed.tsx (the revisit's question format); a count of `recall.options` over src/demos/*/*/meta.json.
**Not read:** readout 1 §0, §3, §6 tables; any harness output or records; harness code (`learner.mjs`, `world-inputs.mjs`); the HQ lab. Criterion 2's draft did not exist on the K1 branch when I looked (no file at /home/user/s3c-k1/company/personalization/eval/2026-10-16-criterion-2.md), so I read none of it, not even the headers.

## Marks (same as C0)

- **[F]** read in the full text of the source in the row (table or section named; PMC full texts carry no page numbers, so I give the section and a verbatim quote).
- **[F-r]** read in the full text of a peer-reviewed paper that reports the primary's number; primary not reached.
- **[A]** checked against the abstract or the Crossref record. **[S]** secondary (search snippet, web summary), primary not seen. **[R]** recalled, not re-checked.
- "derived" means my arithmetic on [F] numbers, shown in the row.
- Confidence: *high* / *medium* / *low*, as defined in the B2 memo.

**Access this run.** Same as C0: only `pmc.ncbi.nlm.nih.gov` (OAI-PMH full text, the ID converter at `/tools/idconv/api/v1/articles/`, and the search page with **short** queries; long queries return no hits) and `api.crossref.org` worked. Author hosts (home.cs.colorado.edu, gwern.net, bjorklab.psych.ucla.edu, ifp.nyu.edu, aclanthology.org) failed DNS or returned no connection. Fifteen PMC full texts were read; the list is in "Sources" at the end.

## The learner's form this file targets (from readout 1 §2 and my C2 review)

A lesson encodes an unknown concept with probability `learnRate` (× the prediction-feedback boost 1.10 in the C4 learner). The kept increment above the guess floor decays as `e^(−k·t)` (C4 answer to C2 F1). A revisit is a **3-option multiple-choice question** in 948 of 974 lessons (4 options in 25, 2 in 1). After any pick the correct answer and a "why" line are shown, so **every revisit is a retrieval followed by feedback**. The product's fixed schedule waits 1, 3, 7, then 21 days **from the last revisit**, advances only on a correct answer, and **repeats the same wait after a miss** (src/kit/progress.ts `revisitDue`).

---

## 1. Forgetting from 1 to 30 days

### Sources

| Source | What it gives (verbatim where [F]) | Mark |
|---|---|---|
| McGillivray, S., Murayama, K., & Castel, A. D. (2015). Thirst for knowledge: The effects of curiosity and interest on memory in younger and older adults. *Psychology and Aging*, 30(4), 835–841. PMC4679590 | Obscure trivia. Guess, then "shown the question with the correct answer for 6 seconds"; already-known items excluded. Each half of the items was tested once. Results: "short-delay test (M = 86.6%, SD = 7.7% and M = 89.1%, SD = 11.9%, respectively) and long-delay tests (M = 51.8%, SD = 12.8% and M = 50.1%, SD = 11.8%, respectively)" (younger, older). Short delay ≈ "60 minutes (SD = 12.5)"; long ≈ "one week later by phone". n = 24 + 24. | [F] (Method; Results) |
| Fastrich, G. M., Kerr, T., Castel, A. D., & Murayama, K. (2018). The role of interest in memory for trivia questions: An investigation with a large-scale database. *Motivation Science*, 4(3), 227–250. PMC6133257 | Online (MTurk, mean age 37). Guess, then "shown the correct answer for 2 seconds"; **no test until session 2**: "M = 8.34 days, SD = 2.19, range: 7 – 37". Table 1, Memory accuracy (initially unknown items only): mean **0.36**, N = 1,498, SD between participants **0.17** (range 0–0.97), SD between items **0.19** (range 0.02–0.92). | [F] (Method; Table 1) |
| Fazio, L. K., Agarwal, P. K., Marsh, E. J., & Roediger, H. L. (2010). *Memory & Cognition*, 38(4), 407–418. PMC4094137 | Table 2, Zero (not tested) column. One ~90 s read, untested: .48 immediate → .30/.31 at one week; not read .21 → .23. Same reading **with one immediate cued-recall test** (Schedule A, no feedback): .48 → **.37** (not read .24). Tests carried no feedback (Method; feedback is discussed only as future advice). | [F] (Table 2) |
| Murre, J. M. J., & Dros, J. (2015). Replication and analysis of Ebbinghaus' forgetting curve. *PLOS ONE*, 10(7), e0120644. PMC4492928 | One subject, nonsense syllables, savings Q. Table 2 averages: 20 min .421, 1 h .335, 9 h .271, 1 day .315, 2 days .239, 6 days (S1 1883 s, S2 1536 s → Q = **.184**, my arithmetic; the printed Q cell is truncated in the PMC record), 31 days **.090**. | [F] (Table 2) |
| Rubin, D. C., & Wenzel, A. E. (1996). *Psychological Review*, 103(4), 734–760. | A single-rate exponential is not among the best-fitting forms; log, power and √t forms are. | [A] (B2) |
| Roediger, H. L., & Karpicke, J. D. (2006). *Psychological Science*, 17(3), 249–255. | Tested prose loses less over a week than restudied prose; values not reached. | direction [A]; values [R] (C0 row 1) |
| Sense, F., Behrens, F., Meijer, R. R., & van Rijn, H. (2016). An individual's rate of forgetting is stable over time but differs across materials. *Topics in Cognitive Science*, 8(1), 305–321. | Per-person forgetting rates are stable over time but differ across materials. | [A] |

### Derivations (increment form, `kept(t) = e^(−k·t)`)

- **Guess → answer, one exposure, no test in between (closest to a lesson then a revisit).** McGillivray: kept from ~1 h to ~7 days = .518/.866 (younger), .501/.891 (older). k = ln(1.672)/6.96 = **0.074** and ln(1.778)/6.96 = **0.083** per day. Open cued recall of unknown items has almost no guessing floor, so no baseline is subtracted. Fastrich agrees: 0.36 at 8.3 days with k = 0.078 implies an encoded share of 0.36/e^(−0.65) ≈ 0.69 for a 2 s answer online, the same range as the learnRate anchors in §4.
- **One reading, no prediction, no test:** Fazio untested, k = 0.17–0.19 (C0 row 2).
- **The same reading plus one immediate retrieval (no feedback):** Fazio Schedule A, increment .27 → .13, k = ln(.27/.13)/7 = **0.104**. This is the [F] basis for `revisitStrengthen` in §2.
- **Shape beyond a week.** Murre & Dros, effective rate days 1→6 = ln(.315/.184)/5 = **0.108**; days 6→31 = ln(.184/.090)/25 = **0.029**. The later rate is about **0.27×** the first-week rate. A power form `kept(t) = (1 + t)^(−d)`, with t in days, fits both intervals with d ≈ 0.43–0.45. On the trivia data the same form gives d = 0.25 (McGillivray younger), 0.28 (older), and 0.58–0.65 for Fazio's untested passage.
- **Consequence for 21–30 days.** At the base values below, an exponential and a power form agree at 7 days (k = 0.08 and d = 0.27 both keep 0.57) but differ about 4× at 30 days (0.09 vs 0.40). A single exponential fitted to the first week will therefore **overstate loss at 21–30 days.** The direction is supported by three sources (Rubin & Wenzel [A], Murre & Dros [F], the trivia vs passage contrast); the size rests on one savings data set and is low confidence.
- **Format caveat.** Every [F] anchor is cued (open) recall. The revisit is 3-option recognition with partial-knowledge credit, which usually decays more slowly than recall. Rates measured on recall are therefore an upper bound for the revisit read. I have no number for the gap ([R], low).

---

## 2. Spacing and review timing

### Sources

| Source | What it gives | Mark |
|---|---|---|
| Mettler, E., Massey, C. M., & Kellman, P. J. (2016). A comparison of adaptive and fixed schedules of practice. *JEP: General*, 145(7), 897–917. PMC6028005 | Exp. 1: 24 map items, 4 presentations each within one session, test after one week (n = 72). "At delayed posttest, accuracies were highest in the adaptive condition (M = 0.42, SD = 0.20), and lower for the two fixed conditions: fixed-expanding (M = 0.31, SD = 0.19) and fixed-equal (M = 0.30, SD = 0.24)"; adaptive vs each fixed d = 0.56 / 0.57; "fixed-expanding and fixed-equal spacing means were not significantly different". Exp. 2 (n = 48), schedules yoked to earlier adaptive learners: delayed "adaptive condition (M = 0.42, SD = 0.22), lower for the yoked-item condition (M = 0.326, SD = 0.144) and lowest for the yoked-random condition (M = 0.26, SD = 0.22)". Authors: "knowledge of item difficulty is not the primary driver of gains in adaptive scheduling". Adaptive re-presents a missed item after 1 trial ("enforced delay"). | [F] (Results, Exp. 1 and 2; Discussion) |
| Eglington, L. G., & Pavlik, P. I., Jr. (2020). Optimizing practice scheduling requires quantitative tracking of individual item performance. *npj Science of Learning*, 5, 15. PMC7567101 | 30 Japanese–English pairs, one 22-min session, test 3 days later, MTurk, n = 50–59 per condition. Model-chosen practice at a target recall (OET) of .86–.94 beat a fixed spacing (S15): "The OET 94 condition led to approximately 40% higher memory retention than conventional scheduling (S15)"; OET 86 and 94 means .48 and .47; "Cohen's d = 0.64". An inverted U: OET .98 and .40 were worse. Authors: "a high OET may not always be preferable … Situations in which failures provide more learning gains or are faster will result in lower recommended OETs." | [F] (Results; Discussion; Methods) |
| Tabibian, B., Upadhyay, U., De, A., Zarezade, A., Schölkopf, B., & Gomez-Rodriguez, M. (2019). Enhancing human learning via spaced repetition optimization. *PNAS*, 116(10), 3988–3993. PMC6410796 | Duolingo, ~12 million sessions over 2 weeks. A **natural experiment**, not randomized: sequences whose timing resembled the adaptive rule had lower empirical forgetting rates. Sizes appear only in figures. Memory model: "a successful recall … changes the forgetting rate by (1−αi) … while an unsuccessful recall changes the forgetting rate by (1+βi)"; α, β are fitted in the SI, not read. Authors: "The dataset we used spans only 2 wk". | [F] (Model; Results; Discussion) |
| Lindsey, R. V., Shroyer, J. D., Pashler, H., & Mozer, M. C. (2014). Improving students' long-term knowledge retention through personalized review. *Psychological Science*, 25(3), 639–647. | Semester-long middle-school foreign-language course; cumulative exam after the semester; time-matched. "personalized review yielded a 16.5% boost in course retention over current educational practice (massed study) and a 10.0% improvement over a one-size-fits-all strategy for spaced study." Whether these are absolute or relative points is not in the abstract. | [A] (Crossref abstract) |
| Latimier, A., Peyre, H., & Ramus, F. (2021). A meta-analytic review of the benefit of spacing out retrieval practice episodes on retention. *Educational Psychology Review*, 33(3), 959–987. | Spaced vs massed retrieval: "an average effect size of Hedges' g = 0.74" (reported by Yan, Sana & Carvalho 2023, *Policy Insights from the BBS* 11(1), 59–66, PMC10950551). Expanding vs uniform: g = 0.034, not significant; more retrieval sessions favour expanding. | g = 0.74 [F-r]; g = 0.034 and moderator [S] |
| Kang, S. H. K., Lindsey, R. V., Mozer, M. C., & Pashler, H. (2014). Retrieval practice over the long term: Should spacing be expanding or equal-interval? *Psychonomic Bulletin & Review*, 21(6), 1544–1550. | Foreign vocabulary over 4 weeks of training: expanding ≈ equal on a test 8 weeks later, but expanding gave higher average recall **during** training. | citation [A]; finding [S] |
| Karpicke, J. D., & Roediger, H. L. (2007). *JEP: LMC*, 33(4), 704–719. Karpicke, J. D., & Bauernschmidt, A. (2011). *JEP: LMC*, 37(5), 1250–1257. | Expanding helps at 10 min, equal is better at 2 days (2007). The absolute spacing of retrievals matters, not whether intervals expand (2011, title). | citations [A]; findings [S] |
| Maddox, G. B., Balota, D. A., Coane, J. H., & Duchek, J. M. (2011). *Psychology and Aging*, 26(3), 661–670. PMC3168729 | "Of the experiments that failed to produce an expanded retrieval benefit … a vast majority have only included 3 retrieval events (79%, 26 of 33 experiments)." Expanding helps when early retrievals succeed. | [F] (Introduction; Discussion) |
| Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). *Psychological Science*, 19(11), 1095–1102. Cepeda, N. J., Coburn, N., Rohrer, D., Wixted, J. T., Mozer, M. C., & Pashler, H. (2009). *Experimental Psychology*, 56(4), 236–246. | 2008: "the optimal gap declined from about 20 to 40% of a 1-week test delay to about 5 to 10% of a 1-year test delay". 2009: "An optimal gap improved final recall by up to 150%"; gap effects are non-monotonic. | [A] (abstracts) |
| Kornell, N., Klein, P. J., & Rawson, K. A. (2015). Retrieval attempts enhance learning, but retrieval success (versus failure) does not matter. *JEP: LMC*, 41(1), 283–294. | Title-level claim: with feedback, a failed retrieval attempt helps as much as a successful one. | [A] (title, Crossref); body not reached |
| Pyc, M. A., & Rawson, K. A. (2009). Testing the retrieval effort hypothesis. *JML*, 60(4), 437–447. | Title-level: harder successful retrievals give more memory benefit. | [A] (title) |
| Settles, B., & Meeder, B. (2016). *Proceedings of ACL 2016 (Vol. 1)*, 1848–1858. | Half-life grows with each successful review. | [A] (pages now confirmed, were [R]) |

### What this means for the eval's parameters

- **`revisitStrengthen` (multiplier on k after a successful revisit).** The only [F] number is Fazio Schedule A: one **massed** retrieval with no feedback took k from 0.17–0.19 to 0.10, a multiplier of **0.53–0.61**. Spaced retrievals are more potent than massed ones (Latimier g = 0.74 [F-r]; Cepeda [A]), so a revisit days later should multiply by less than this. Practical schedulers multiply the interval by about 2–2.5 per success (Leitner doubling, SM-2 default ease 2.5 [R]). Those are designs tuned on users, not experiments, but they imply multipliers of 0.4–0.5. Range: **low 0.35, base 0.50, high 0.60.**
- **Lag dependence (a mechanism, not a number).** In the literature the benefit of a successful retrieval **grows with the lag**, up to the point where retrieval starts to fail (Cepeda 2008/2009 [A]; Pyc & Rawson [A]; the inverted U over target recall in Eglington & Pavlik [F]). With a constant multiplier the world has no spacing effect: an early review strengthens as much as a well-timed one. Review timing then has only one lever, reviewing before an item is forgotten. A world built that way would judge the review-timing candidate on a mechanism other than the one the studies credit for the effect. If the eval models it, the anchors are a multiplier of about 0.6 for a review at very high recall (massed, Fazio [F]) and the low end, about 0.35, near the optimal lag. The shape between them has no source I reached. **The eval decides whether to model it** (see Disagreements).
- **`relearn` (P(re-encode) after a failed revisit; the answer and "why" are shown).** Same-session error correction after feedback: 0.66 younger / 0.73 older at ~10 min (Metcalfe et al. 2015 [F]); 0.69 (Metcalfe et al. 2012 [F]); 0.65 of the unknown share (Fazio & Marsh 2009 [F]); 0.87–0.89 at ~1 h when attention is high (McGillivray [F]). Savings persist even at 31 days (Murre & Dros [F]), so relearning should not be **worse** than first learning. Range: **low 0.60 (= learnRate base, no savings), base 0.70, high 0.88.**
- **Forgetting after a relearned miss.** The sources conflict. Kornell et al. 2015 [A] says success and failure count the same once feedback follows, which puts the multiplier at `revisitStrengthen`. The Duolingo model (Tabibian [F]) raises k after a failure by (1 + β), but that partly stands in for item difficulty, and the world should carry item difficulty as item heterogeneity instead (next bullet). Range for the multiplier on k after relearn: **low = `revisitStrengthen` (Kornell), base 1.0 (the clock restarts at the learner's own k), high 1.0.** I give no value above 1.
- **Learner × lesson heterogeneity in forgetting: the parameter that creates review-timing headroom.** In Mettler Exp. 2, schedules copied per item from other learners lost most of the adaptive gain [F]. Rates differ across materials within a person (Sense et al. 2016 [A]). Fastrich [F]: 8-day recall varies between participants (SD 0.17; about 0.15 after removing binomial noise over ~41 items) and between items (SD 0.19). If all of that variance came from k, the SD of log k would be about 0.6–0.8. It cannot all come from k, because encoding also varies, so that is an **upper bound**. Range for the SD of log k across (learner, lesson) pairs, on top of the persona spread: **low 0.2, base 0.4, high 0.7** (derived, low confidence). An oracle's headroom over the fixed schedule should scale with this number. It should therefore be swept, not set at one value, and it must not be raised above its evidence to make the oracle's question answerable.

---

## 3. Population prior knowledge

| Source | Value | Mark |
|---|---|---|
| McGillivray et al. 2015 | Already known out of 60 obscure trivia: 3.6 (6%) younger, 6.5 (11%) older | [F] (Results) |
| Mettler et al. 2016 | Map pretest: M = 0.056, SD = 0.072 across participants (chance .026) | [F] (Results, Exp. 1) |
| Fastrich et al. 2018 | 15% of trials answered correctly before the answer was shown, after removing the 12% of items above 50% | [F] (Method) |
| Fazio et al. 2010 | Not-read baseline .21–.23 on cued recall of passage facts (prior knowledge plus inference) | [F] (Table 2) |
| Manrai et al. 2014; Casscells et al. 1978 | 23% and 18% correct on the base-rate item (clinicians and students) | [F] / [F-r] (C0 row 4) |
| Fazio & Marsh 2009, quoting Nelson & Narens (1980) norms | "on average, 40% of participants in the norming study answered these items correctly (ranging across items from 0% to 92% correct)"; Duke undergraduates 43% | [F]; norms [F-r] |
| Lyew, T., Ikhlas, A., Sayed, F., Vincent, A., & Lydon-Staley, D. M. (2023). *Journal of Health Communication*, 28(7), 446–457. PMC10330854 | Adolescents aged 14–16, online, guess then answer for 5 s; one-week recall (model intercept, Table 2) −0.67 logit ≈ **0.34** for general trivia and −1.37 ≈ **0.20** for tobacco trivia. The guess accuracy is not reported, so the prior share cannot be separated. | [F] (Table 2; Method) |

**Answer.** Across item sets, the known share runs from about 0.05 (obscure trivia, map items) to about 0.43 (general-knowledge norms). Lessons built around a misconception sit at the low-to-middle part of that span. The spread **between items** is large (0–92% within one norm set); the spread **between learners** on a fixed item set is smaller (Mettler SD 0.072 at mean 0.056). Range for the population mean: **low 0.05, base 0.20, high 0.45** (high was 0.50 in B2; 0.43 is the [F] edge). The between-learner SD stays at B2's 0.05 / 0.15 / 0.25 (low confidence; no [F] value at mean 0.2). New row, between-lesson SD: **0.10 / 0.20 / 0.30**. Confidence: low-medium for the mean range, low for both spreads. A2 still applies: replace all of this with aggregate first-prediction-correct rates once W-706 data exist.

**Guess floor (C2 F19, corrected).** In C2 I cited Fazio's not-read baseline (.21–.23) as support for `guessRecall` 0.2. That was a conflation: the baseline is prior knowledge plus inference on open recall, and the world already models prior knowledge separately. The right basis is the revisit's format. With 3 options and a misconception lure taking a share `pull` of unknown learners (B2 pull row 0.30 / 0.55 / 0.85), P(correct | unknown) ≈ (1 − pull)/2 = **0.35 / 0.22 / 0.08**. Base 0.22 sits close to 0.2. The number barely moves; the reason does. If the eval wants the floor to vary per lesson, it can tie it to that lesson's hidden pull.

---

## 4. learnRate base

| Source | P(encode \| unknown), measured at a short delay | Prediction step? | Mark |
|---|---|---|---|
| Fazio et al. 2010 | (.48 − .21)/(1 − .21) = **0.34** (one ~90 s read of a passage, per fact) | no | [F] (C0) |
| Fazio & Marsh 2009, *Psychonomic Bulletin & Review*, 16(1), 88–92, PMC4036076 | "participants answering 80% of the questions correctly on the second test as compared to 43% on the initial test" → (.80 − .43)/(1 − .43) = **0.65** (answer shown 5 s; a 4-min filler after the whole test) | yes | [F] (Exp. 2 Results; citation now [A], volume and pages were [R]) |
| Metcalfe, Casal-Roscum, Radin & Friedman 2015, *Psychological Science*, 26(12), 1833–1842, PMC4679660 | Errors corrected ~10 min later: **0.66** younger, **0.73** older | yes | [F] (Results) |
| Metcalfe, Butterfield, Habeck & Stern 2012, *J. Cognitive Neuroscience*, 24(7), 1571–1583, PMC3970786 | "average retest accuracy was 69%" on errors, same session | yes | [F] |
| McGillivray et al. 2015 | **0.87–0.89** at ~1 h (6 s answer, plus interest and judgement-of-learning ratings) | yes | [F] |
| Fastrich et al. 2018 | ≈ **0.69** implied (0.36 at 8.3 days ÷ e^(−0.078·8.3)), online, 2 s answer | yes | derived from [F] |

**Answer.** Every [F] anchor with a guess before the answer, which is our format, gives **0.65–0.89**. The only anchor without one (reading) gives 0.34. A lesson's concept is harder to hold than a one- or two-word trivia answer, and attention in a feed is lower than in a lab. That points to the lower part of the guess-first span, which the online data (Fastrich, ≈ 0.69) also occupy. Range, **everything included** (measured after a guess and an answer): **low 0.35, base 0.65, high 0.88.** If the eval multiplies by its prediction-feedback boost (1.10) separately, divide by it to avoid counting the prediction twice: **0.35 / 0.60 / 0.80** in pre-boost units (the low anchor had no prediction, so it stays). Confidence: medium that the base is between 0.5 and 0.7 for single facts; low for the transfer to 60-second concept lessons.

---

## Ranges table (for criterion 2's world)

Units per row. "Base" is a centre for reporting, not a value to tune to. **Status of each row's source is in the mark.** Rows not listed (pull, prerequisite penalty, prediction benefit, hypercorrection, novelty) are unchanged from B2 as corrected by C0 and C2.

| parameter | unit / meaning | low | base | high | source (mark) | confidence |
|---|---|---|---|---|---|---|
| `forgetRate` k, first interval | per day, on the increment above the floor, effective over 1–7 days, lesson never retrieved since | 0.04 | **0.08** | **0.19** | low: Roediger & Karpicke 2006 [R]; base: McGillivray 2015 [F] (0.074–0.083), Fastrich 2018 [F] consistent; high: Fazio 2010 [F] (untested reading 0.17–0.19) | low-medium |
| forgetting shape beyond 7 days | ratio of the effective rate over days 7–30 to the rate over days 1–7 (1.0 = a single exponential) | 0.2 | 0.27 | 1.0 | Murre & Dros 2015 [F] (0.27; d = 0.27 gives 0.25); power fits of McGillivray / Fazio [F, derived]; Rubin & Wenzel 1996 [A]. High 1.0 = exponential kept, stated as a departure | low |
| or, equivalently, power exponent d | `kept(t) = (1 + t)^(−d)`, t in days | 0.25 | 0.27 | 0.65 | McGillivray [F] (0.25–0.28); Murre & Dros [F] (0.43–0.45); Fazio untested [F] (0.58–0.65) | low |
| between-learner spread of k | fastest ÷ slowest persona rate | 1.5× | 2× | 3× | B2 unchanged; Fastrich [F] between-participant SD 0.17 is consistent; Sense 2016 [A] | low |
| learner × lesson spread of k (**new**) | SD of log k across (learner, lesson) pairs, on top of the persona spread | 0.2 | 0.4 | 0.7 | Fastrich [F] item SD 0.19 and participant SD 0.17 (upper bound, derived); Mettler 2016 Exp. 2 [F]; Sense 2016 [A] | low |
| `revisitStrengthen` | multiplier on k after a correct revisit (smaller = stronger) | 0.35 | 0.50 | 0.60 | high: Fazio 2010 Schedule A [F] (0.53–0.61, massed, no feedback); spaced > massed: Latimier [F-r], Cepeda [A]; low: scheduler interval multipliers [R] | low-medium |
| lag dependence of `revisitStrengthen` | whether the multiplier falls (stronger) with lag or with lower recall at the revisit, given success | none | yes, from ≈0.6 at very high recall to ≈0.35 near the optimum | — | Cepeda 2008/2009 [A]; Pyc & Rawson 2009 [A]; Eglington & Pavlik 2020 [F] | medium for direction, none for shape |
| `relearn` | P(re-encode \| failed revisit; answer and "why" shown) | 0.60 | 0.70 | 0.88 | Metcalfe 2015 [F] 0.66/0.73; Metcalfe 2012 [F] 0.69; Fazio & Marsh 2009 [F] 0.65; McGillivray [F] 0.87–0.89; savings Murre & Dros [F] | medium |
| k multiplier after a relearned miss | multiplier on the learner's own k | = `revisitStrengthen` | 1.0 | 1.0 | Kornell et al. 2015 [A]; Tabibian 2019 [F] (failure raises k, read as item difficulty) | low |
| `learnRate` (everything included) | P(encode \| unknown) after one lesson, before forgetting | 0.35 | **0.65** | 0.88 | §4 table: Fazio 2010 [F]; Fazio & Marsh 2009 [F]; Metcalfe 2012/2015 [F]; McGillivray [F]; Fastrich [F, derived] | low-medium |
| `learnRate` pre-boost (if × 1.10 is applied separately) | same, divided by the prediction-feedback boost | 0.35 | 0.60 | 0.80 | as above | low-medium |
| `priorKnowledge` mean | P(knows a lesson's concept), population | 0.05 | 0.20 | 0.45 | §3 table [F] / [F-r] | low-medium |
| `priorKnowledge` between-learner SD | SD of the per-learner mean | 0.05 | 0.15 | 0.25 | B2 unchanged; Mettler [F] SD 0.072 at mean 0.056 | low |
| `priorKnowledge` between-lesson SD (new) | SD across lessons | 0.10 | 0.20 | 0.30 | Nelson & Narens norms via Fazio & Marsh [F-r] (0–92%); Fastrich [F] | low |
| `guessRecall` | P(correct \| not known) on the 3-option revisit | 0.08 | 0.22 | 0.35 | product format (Feed.tsx, 948 of 974 lessons with 3 options) × B2 pull row; replaces my C2 F19 basis | low-medium |

---

## Review timing: what the evidence supports (memo)

**Question (founder Q4, V1–V3).** Does a rule that chooses *when* to bring back a completed lesson, per lesson and per learner, beat a fixed expanding schedule (1, 3, 7, 21 days, advancing on success)?

**1. How much adaptive beats fixed, in the studies there are.** Three randomized studies and one natural experiment favour adaptive over fixed.
- Mettler et al. 2016 [F]: +0.11 absolute at one week (0.42 vs 0.31 / 0.30, d ≈ 0.56). Against schedules copied from adaptive learners, +0.09 (item-yoked, not significant at the delay) and +0.16 (random-yoked).
- Eglington & Pavlik 2020 [F]: about +0.13 absolute (derived: S15's mean is not printed; 0.47 ÷ 1.4 ≈ 0.34), about 40% relative, at 3 days (d = 0.64), and only for a well-chosen target recall. Targets that were too easy or too hard did not beat fixed.
- Lindsey et al. 2014 [A]: +10.0% over a generic spaced strategy on a cumulative exam after a semester.
- Tabibian et al. 2019 [F]: the same direction in observational Duolingo data over two weeks.
- The first two schedule items **within one session** (trial lags, 4 or more exposures each). Only Lindsey works across weeks, in a classroom.
- **One line: adaptive beats fixed by about +0.10 to +0.13 absolute recall at 3 to 7 days, in lab sessions with many exposures per item, and by about 10% at about a month in one classroom study. Confidence: medium that it holds in those settings; low that the size carries over to us.**

**2. Which fixed schedule.** Expanding vs equal fixed schedules make no reliable difference to retention: Mettler [F] found none; Latimier g = 0.034 [S]; Kang et al. 2014 [S] found none at 8 weeks. Expanding helps only when early retrievals succeed and there are more than three of them (Maddox [F]; Latimier's moderator [S]). The absolute spacing of retrievals matters more than their pattern (Karpicke & Bauernschmidt [A]). The optimal gap grows with the retention interval, from about 20–40% of a one-week interval to 5–10% of a one-year interval (Cepeda 2008 [A]). **One line: a fixed schedule's shape is not where the gain is. The gain comes from fitting each item to each learner (Mettler Exp. 2). Confidence: medium.**

**3. On what retention interval.** The adaptive studies tested at 3 days, 1 week and about 1 month. I found nothing randomized past about two months for adaptive scheduling. **What is measured changes the answer.** In Kang et al. [S], expanding raised average recall *during* training but not on the final test. A criterion that reads R at the next revisit (as in phase A, C2 F7) measures something different from one that reads it at a fixed delay after the last review. That choice is the eval's (V1). **One line: the evidence covers 3 to 30 days; the primary delay should be stated before scoring, because a candidate can win on one and not the other. Confidence: medium.**

**4. What a 60-second feed can and cannot borrow.**
- **Can borrow:**
  - a per-lesson, per-learner state updated by each revisit's outcome (correct → wait longer, miss → come back sooner and relearn);
  - targeting a predicted recall at the revisit rather than a fixed day count (Eglington & Pavlik [F]; Tabibian [F]);
  - success-contingent expansion, which the fixed schedule already does.
- **Cannot borrow:**
  - **minute-scale re-presentation after a miss.** Mettler's adaptive arm re-showed a missed item after 1 trial; the feed's shortest return is the next session.
  - **many exposures per item.** The studies used 4 or more in one session; a lesson gets at most 4 revisits over a month.
  - **item parameters fitted from earlier learners on the same material.** Eglington & Pavlik and Lindsey had them; we have none until W-706 data exist and the A2 read is done.
  - **response-time signals.** ARTS uses response time; any such input is subject to `INPUT_PRIVACY`.
  - **lengthening beyond the fixed due date.** The fixed schedule already moves a lesson on after a correct answer. What adaptivity could add is pushing a review *later* for a strong lesson, which is where spacing pays for long intervals (Cepeda [A]). AMD-008 F2 forbids that live without an amendment (V4).
- **One line: the feed can borrow "come back sooner after a miss, later after an easy success, aimed at a target recall", but it cannot borrow the within-session drill that produced most of the measured gains. The realistic gain is below the lab's +0.10 to +0.13. Confidence: medium on the list, low on any size.**

**5. What this means for the simulated test (for the eval; I set nothing).**
- **Headroom depends on the world, so the world's settings must come from evidence.** Adaptive gains in the studies come from learner × item variation in forgetting (Mettler Exp. 2 [F]). In the simulator, an oracle scheduler's headroom over the fixed schedule will therefore be set mostly by the learner × lesson spread of k (table, new row) and by whether revisit strengthening depends on lag. Both should be swept or stated, not tuned.
- **Model the long-delay shape.** A single exponential overstates loss at 21–30 days (§1). That would make a schedule that reviews more often look better than the evidence supports.
- **Make a miss followed by feedback a learning event** (`relearn` 0.60–0.88), because every revisit shows the answer.
- **Applies to P1 too:** the candidate's numbers may draw on this file, but nothing in it was fitted to our learners.

## Disagreements recorded (with sources)

1. **With my own earlier rows.**
   - `forgetRate` base: 0.10 → **0.08**. B2's 0.10 rested on Roediger & Karpicke values I never reached ([R]). McGillivray [F] is the closest paradigm.
   - `learnRate`: in C2 F2 I wrote that "nothing I have read supports 0.7". The guess-first anchors here (0.65–0.89 [F]) do support a value near it. Phase A's 0.70 sits inside the new range and above its base of 0.65. That changes how readout 1's learnRate condition should be read. It does not reopen readout 1 (pre-commitment 1).
   - `guessRecall`: C2 F19's basis was wrong (§3). The new basis gives a similar number.
   - `priorKnowledge` high: 0.50 → 0.45, to the [F] edge.
2. **With the C4 learner's forgetting form** (one exponential), if criterion 2 reads R beyond 7 days: about 4× too much loss at 30 days relative to the power-shaped evidence (§1). Answers I would accept: a power form with d from the table; k reduced by the shape ratio after day 7; or refusing with the reason stated in the readout. The decision is the eval's, at F1.
3. **With a lag-independent `revisitStrengthen`** (C2 F21 described it as constant): it removes the spacing effect from the judge's world (§2). Answers I would accept: lag- or recall-dependent strengthening anchored as in the table; or a stated refusal plus a readout line saying the world has no spacing effect.
4. **With the product's fixed schedule (for the record, not a criterion change):** a miss repeats the same wait. The evidence favours coming back sooner after a miss (Mettler's enforced short delay [F]; the failure term in Tabibian [F]). V1 fixes the baseline as is; this belongs to vp-personalization and the product owner, and changes nothing in criterion 2.
5. **Double counting.** If the world's `learnRate` base is taken from the guess-first studies, the C4 prediction-feedback boost must not be applied on top. Use the pre-boost row.

## What is unknown, and what would close it

- **First-revisit recall by gap for our lessons:** W-706 aggregates after the privacy read. This would replace k, its shape, `learnRate` and `guessRecall` all at once.
- **Unreached values:** Kang 2014, Karpicke & Roediger 2007, Karpicke & Bauernschmidt 2011, and Latimier's expanding-vs-uniform g stay [S]. Lindsey's 16.5% / 10.0% (absolute or relative) stays [A]. Kornell 2015 and Pyc & Rawson 2009 are title-level [A]. Tabibian's fitted α, β are in its SI, not read. Closing these needs a session with publisher or author-host access; Kang and Lindsey are on Mozer's reprint page.
- **The lag-dependence shape of `revisitStrengthen`:** no source reached gives it in a form the learner can use. The ACT-R spacing model (Pavlik & Anderson 2005/2008) would be the next place to look ([R]).
- **Recognition (3-option) vs recall forgetting rates:** no number reached.

## Sources read in full this run (PMC OAI-PMH)

PMC4679590 (McGillivray 2015), PMC6133257 (Fastrich 2018), PMC4094137 (Fazio 2010), PMC4492928 (Murre & Dros 2015), PMC6028005 (Mettler 2016), PMC7567101 (Eglington & Pavlik 2020), PMC6410796 (Tabibian 2019), PMC3168729 (Maddox 2011), PMC4036076 (Fazio & Marsh 2009), PMC4679660 (Metcalfe 2015), PMC3970786 (Metcalfe 2012), PMC10330854 (Lyew 2023), PMC10950551 (Yan, Sana & Carvalho 2023, for Latimier), PMC5126970 (Smolen 2016, opened, not used), PMC12292081 (Mera et al., opened, not used). URL pattern: `https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:<id>&metadataPrefix=pmc`. Citations were checked against Crossref by DOI.
