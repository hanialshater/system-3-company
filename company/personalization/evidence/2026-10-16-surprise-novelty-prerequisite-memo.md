# Evidence memo: surprise, novelty, prerequisite order, and ranges for the simulated learner

owner: learning-scientist-personalization (Oskar) · run: ls-b2-1016 · date: 2026-10-16
board: W-1497 (questions 1 and 3), W-1517 (question 2) · brief: company/personalization/batches/2026-10-16-batch-1.md §B2
readers: **personalization-eval** (ranges → the sweep in C1), applied-scientist-personalization and vp-personalization (findings)
status: **research memo, not a learner-facing claim.** No sentence here may reach a learner until it passes the claims rule (CLAUDE.md; a claim in a lesson's meta.json with address, support, source, verified by someone other than me). I set no curve values and no composer weights.

Inputs read: company/personalization/2026-10-16-brief-response.md §2.4, §2.5 and O8; `latent` fields in company/personalization/model/personas.ts (to learn which parameters exist; their values were not used to set any range); the privacy ruling company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §1 A2. **Not read:** sim/README.md results, sim/out/, the HQ lab policy table, the decision record's finding sections, the eval's criterion. Every range below comes from published literature, never from our learners' data (A2).

## How to read the marks

- **Confidence:** *high* = several independent studies or a meta-analysis agree, in conditions close to ours; *medium* = robust in the lab but at least one big step from our setting (60-second lesson, general audience 13+, first spaced revisit days later); *low* = indirect evidence, an extrapolation, or a conflict among sources.
- **Verification of each source, this run:** **[A]** citation and the stated finding checked against the abstract, the publisher record or an index entry; **[S]** a number taken from a secondary source (slides, review, press) and not seen in the primary text; **[R]** recalled from the literature, not re-checked this run. Full texts were mostly unreachable (the proxy failed DNS for pmc/ncbi, springer, nsf, gwern and university hosts), so **no effect size here was read off a primary table.** Before any number becomes a claim, someone must check it against the paper.

## Our setting, and why it matters

A lesson is predict → explore → reveal in about 60 seconds. The predict step is a retrieval attempt or a guess. The reveal is immediate corrective feedback. "Recall" in the objective (brief-response §2.5) means the first spaced-revisit recall, days later. Most of the literature below uses general-knowledge questions, word lists or prose, with adults and tests minutes to a week later. Every finding transfers to us only through that gap.

---

## Q1. Does prediction error or surprise (hypercorrection included) improve later recall? Does novelty?

### 1a. Predicting before the answer (prediction or pretest, then feedback)

| Source | Finding (direction, size where reported) | Mark |
|---|---|---|
| Kornell, N., Hays, M. J., & Bjork, R. A. (2009). Unsuccessful retrieval attempts enhance subsequent learning. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 35(4), 989–998. | A retrieval attempt that fails, followed by the answer, beats studying the answer for the same time. | [A] |
| Richland, L. E., Kornell, N., & Kao, L. S. (2009). The pretesting effect: Do unsuccessful retrieval attempts enhance learning? *Journal of Experimental Psychology: Applied*, 15(3), 243–257. | Pretest questions before reading a science essay improved later test scores on the pretested content, even when pretest answers were wrong; the benefit held when attention to the concepts was equated. | [A] |
| Hays, M. J., Kornell, N., & Bjork, R. A. (2013). When and why a failed test potentiates the effectiveness of subsequent study. *JEP: LMC*, 39(1), 290–296. | Failed tests help when feedback follows **immediately**; delayed feedback removed the benefit. Our reveal is immediate, so this condition holds. | [A] (via index summary; year from memory [R]) |
| St. Hilaire, K. J., Chan, J. C. K., & Ahn, D. Guessing as a learning intervention: A meta-analytic review of the prequestion effect. *Psychonomic Bulletin & Review* (2024). | Prequestions help memory for **the asked content**, g = 0.54 (k = 97); for content not asked, g = 0.04 (k = 91), about zero. | title, authors, journal [A]; year and g values [S] |
| Pan, S. C., & Carpenter, S. K. (2024). Prequestioning and pretesting effects: A review of empirical research, theoretical perspectives, and implications for educational practice. *Psychonomic Bulletin & Review*, 31, 411–441. | Narrative review. The pretesting benefit depends on learners then studying the correct answers. | [S] |
| Crouch, C. H., Fagen, A. P., Callan, J. P., & Mazur, E. (2004). Classroom demonstrations: Learning tools or entertainment? *American Journal of Physics*, 72(6), 835–838. | Students who only watched a demonstration did no better than students who did not see it; students who **predicted the outcome first** understood it better. Correct-outcome rates: no demo 61%, observe 70%, predict 77%, predict + discuss 82%. | finding [A]; percentages from the authors' 2006 slides [S] |
| Brod, G., Hasselhorn, M., & Bunge, S. A. (2018). When generating a prediction boosts learning: The element of surprise. *Learning and Instruction*, 55, 22–31. | Predicting beat post-hoc evaluation for learning geography facts. A pupil surprise response appeared only after a prediction, and its size tracked learning. Memory gains were specific to **unexpected** outcomes. | [A] |
| Brod, G. (2021). Predicting as a learning strategy. *Psychonomic Bulletin & Review*, 28(6), 1839–1847. | Review; no pooled size. Predicting works through retrieval and elaboration (shared with pretesting) and through surprise. Predicting assumes some familiarity: on unfamiliar material, a guess carries little confidence, so surprise is unlikely. | [A] |

**Answer 1a:** asking a learner to commit to a prediction before an immediate reveal improves later memory for that item, compared with seeing the answer without predicting. **Confidence: medium-high.** There is a meta-analysis, several paradigms and a classroom field study (Crouch et al.). The benefit is item-specific (g ≈ 0.04 for content not asked). It is the format's benefit, so **every lesson in the feed gets it**. It does not distinguish one lesson from another.

### 1b. Hypercorrection: confident errors are corrected more often

| Source | Finding | Mark |
|---|---|---|
| Butterfield, B., & Metcalfe, J. (2001). Errors committed with high confidence are hypercorrected. *JEP: LMC*, 27(6), 1491–1494. | After feedback, errors made with high confidence were corrected on a retest (minutes later) more often than low-confidence errors. | [A] |
| Butler, A. C., Fazio, L. K., & Marsh, E. J. (2011). The hypercorrection effect persists over a week, but high-confidence errors return. *Psychonomic Bulletin & Review*, 18(6), 1238–1244. | Hypercorrection appeared on both the immediate test and the 1-week test, but correction fell at the delay. When a correction was forgotten, **high-confidence errors were more likely to come back** than low-confidence ones. | [A]; one secondary account gives ~56% of errors corrected at 1 week [S] |
| Metcalfe, J., & Finn, B. (2011). People's hypercorrection of high-confidence errors: Did they know it all along? *JEP: LMC*, 37(2), 437–448. | Learners with high-confidence errors more often chose the right answer as a second guess, and benefited more from partial cues. Part of the effect is **prior knowledge**: the right answer was already close. | [A] |
| Fazio, L. K., & Marsh, E. J. (2009). Surprising feedback improves later memory. *Psychonomic Bulletin & Review*, 16(1), 88–92. | Feedback after high-confidence errors was remembered better, even incidental surface features of it: an attention account. | [A] via Brod (2021); volume and pages [R] |
| Metcalfe, J. (2017). Learning from errors. *Annual Review of Psychology*, 68, 465–489. | Review: errorful learning with corrective feedback helps. Hypercorrection appears in children, young adults and, more weakly, older adults, on immediate and delayed tests. | [A] |
| Griffiths, L., & Higham, P. A. (2018). Beyond hypercorrection: Remembering corrective feedback for low-confidence errors. *Memory*, 26(2), 201–218. | With trick questions, low-confidence errors were corrected as often as high-confidence ones. Memory for the feedback predicted correction better than confidence or surprise did. | [A] (journal and pages [R]) |
| Brod, G., Breitwieser, J., Hasselhorn, M., & Bunge, S. A. (2020). Being proven wrong elicits learning in children – but only in those with higher executive function skills. *Developmental Science*, 23(3), e12916. | Children aged 9–12 (n = 51): wrong predictions produced a surprise response, but **only children with stronger inhibitory control** learned from them. | [A] |

**Answer 1b:** the hypercorrection effect is real and replicated in adults, on immediate tests and at one week. **Confidence that it exists: high.** Whether it improves recall at our first spaced revisit, for our audience: **medium.** It weakens over a week. Confident errors can return. In children the benefit depends on executive function, and our audience starts at 13. Part of the effect is prior knowledge, not surprise itself (Metcalfe & Finn 2011; Griffiths & Higham 2018).

### 1c. The question the composer actually asks: does serving a higher-surprise lesson raise recall?

The `wS · surprise` term (brief-response §2.5) prefers lessons with a stronger misconception. The evidence above compares **errors with errors** (high-confidence versus low-confidence) or **predicting with not predicting** on the same item. I found no study that compares recall for items chosen for a strong pull to the wrong answer with recall for items with a weak pull, both under predict-then-feedback. Three things in the literature point in different directions:

- for: a confident wrong prediction earns extra attention to the feedback (Butterfield & Metcalfe 2001; Fazio & Marsh 2009; Brod et al. 2018);
- against: errors corrected at study come back at a delay, and confident ones come back more often (Butler et al. 2011). A lesson with a strong misconception produces more errors to correct;
- conditional: the benefit needs familiarity, prior knowledge or executive control (Metcalfe & Finn 2011; Brod 2021; Brod et al. 2020).

**Answer 1c:** the net effect on mean spaced recall of preferring high-surprise lessons is **unknown. Confidence: low.** The direction is plausible only for learners with enough related knowledge, which supports multiplying surprise by readiness (O8). The literature gives no value for readiness = .5.

**For C3's condition** (batch §C3: "B2 rates the effect of surprise or hypercorrection on recall at medium confidence or better"). The *effect of hypercorrection on recall* clears medium (1b). *Selecting lessons for surprise raises recall* does not (1c). Which one C3 means is vp-personalization's call. I am stating the split so it is not decided by wording.

### 1d. Novelty

| Source | Finding | Mark |
|---|---|---|
| Fenker, D. B., Frey, J. U., Schuetze, H., Heipertz, D., Heinze, H.-J., & Duzel, E. (2008). Novel scenes improve recollection and recall of words. *Journal of Cognitive Neuroscience*, 20(7), 1250–1265. | Seeing novel scenes **before** a word list improved recall of the unrelated words, compared with familiar scenes. | finding via Schomaker et al. 2014 [A]; author list and pages [R] |
| Schomaker, J., van Bronkhorst, M. L. V., & Meeter, M. (2014). Exploring a novel environment improves motivation and promotes recall of words. *Frontiers in Psychology*, 5, 918. | Exploring a novel virtual environment improved later free recall of unrelated words, not recognition. A later immersive-VR replication found no boost (Leiden project summary). The authors suggest active navigation matters. | [A] |
| van Kesteren, M. T. R., Ruiter, D. J., Fernández, G., & Henson, R. N. (2012). How schema and novelty augment memory formation. *Trends in Neurosciences*, 35(4), 211–219. | Material that fits existing knowledge (a schema) is usually remembered better. Highly novel material can also be, through a different route. The relation is U-shaped, not "more novel, better". | [A] |
| Greve, A., Cooper, E., Kaula, A., Anderson, M. C., & Henson, R. (2017). Does prediction error drive one-shot declarative learning? *Journal of Memory and Language*, 94, 149–165. | Five experiments. Per the highlights, prediction error, varied in several ways, gave better memory. These are lab pairings, not lessons. | [A] (highlights only; I could not check per-experiment results) |
| Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning and its moderators. *Psychological Bulletin*, 145(11), 1029–1052. | Interleaving beats blocking, g = 0.42 overall, but only for discriminating **similar** categories. Mathematics g = 0.34; expository text ambiguous and not significant; words −0.39 (blocking better). | [A] (abstract) |

**Answer 1d:** the novelty effects in the literature are of two kinds. (i) Novel *contexts* (scenes, environments) give a short-lived boost to encoding of unrelated material. The effect is small and has a replication failure. It is not "a concept or domain the learner has not seen." (ii) Switching between categories helps only when the categories are similar enough to confuse. Schema fit, meanwhile, favors **familiar** context. **No source shows that serving a learner a concept or domain they have not seen raises their recall of it. Confidence that novelty, as `novelty(lesson, learner)` defines it (§2.4), improves recall: low; best estimate about zero, with a possible small cost from poor schema fit.** Novelty may still matter for breadth or engagement. Those are guardrails, not recall (§2.5).

---

## Q2 (W-1517). Does meeting a concept before its prerequisites lower recall, and by how much?

| Source | Finding | Mark |
|---|---|---|
| Bransford, J. D., & Johnson, M. K. (1972). Contextual prerequisites for understanding: Some investigations of comprehension and recall. *Journal of Verbal Learning and Verbal Behavior*, 11(6), 717–726. | Four studies. Context given **before** a passage raised comprehension and recall. Context given **after** did not help: recall stayed at the no-context level. In the best-known passages, recall with context first was roughly double (e.g. about 5.8 vs 2.7 idea units of 18). | finding [A]; numbers [R] |
| Mayer, R. E. (2009). Pre-training principle. In *Multimedia Learning* (2nd ed., pp. 189–199). Cambridge University Press. Primary: Mayer, R. E., Mathias, A., & Wetzell, K. (2002). Fostering understanding of multimedia messages through pre-training. *JEP: Applied*, 8(3), 147–154. | Pre-training on the names and behavior of a system's components first improved problem-solving transfer in 5 of 5 tests, median d = 0.85. Measures transfer, not recall. Short lessons, adults. | [A] for the chapter's d; 2002 primary [R] |
| Gagné, R. M., & Paradise, N. E. (1961). Abilities and learning sets in knowledge acquisition. *Psychological Monographs*, 75(14). White, R. T. (1973). Research into learning hierarchies. *Review of Educational Research*, 43(3), 361–375. | In learning hierarchies (linear equations), transfer to a higher task was high when the subordinate skills were present and very low when they were absent. Procedural mathematics with hard dependencies. | [S] for the finding; citations [A] |
| Simonsmeier, B. A., Flaig, M., Deiglmayr, A., Schalk, L., & Schneider, M. (2022). Domain-specific prior knowledge and learning: A meta-analysis. *Educational Psychologist*, 57(1), 31–54. | 8,776 effect sizes. Prior knowledge strongly predicts **outcomes** (pretest–posttest r ≈ .53) but on average does **not** predict **gains**. | [A] |
| Sinha, T., & Kapur, M. (2021). When problem solving followed by instruction works: Evidence for productive failure. *Review of Educational Research*, 91(5), 761–798. | 53 studies, 166 comparisons. Problem solving **before** instruction beat instruction-first for conceptual knowledge, most strongly when the design follows productive-failure principles. Evidence that meeting hard material early, **then** getting instruction, can help. | [A] for scope; size [S] (press only) |
| Prerequisite-discovery work in tutoring systems, e.g. arXiv 2402.01672 (2024). | Tutors that always present prerequisites first cannot observe the out-of-order case. Observational tutor data therefore rarely identifies this effect. | [A] |

**Answer 2:**
- **Direction:** when a lesson cannot be understood without its prerequisite, meeting it first lowers what is retained, and learning the prerequisite afterwards does not repair the loss (Bransford & Johnson 1972, context-after; Gagné hierarchies). **Confidence: medium.**
- **Size for our lessons:** **unknown. Confidence: low.** The strong results come from material made incomprehensible on purpose (Bransford & Johnson) or from hard procedural dependencies (Gagné). They are upper bounds. Our lessons are built to stand alone in 60 seconds, and many curriculum `prerequisites` edges are authored "builds on" links, never tested as true dependencies.
- **Counter-evidence:** productive failure and pretesting show that meeting a challenge before instruction can help. In that case the early encounter improves learning of the **later** instruction, which is a different quantity from recall of the early lesson. The penalty sweep must therefore include zero.
- I found **no study measuring recall cost when a self-contained short lesson comes before its authored prerequisite.** Any single number for the penalty is a choice, not a finding. That is why the table gives a range and asks for a sweep.

**On O8 (surprise × readiness):** the evidence supports the *form*, meaning surprise is worth less without the knowledge to use it (Metcalfe & Finn 2011; Brod 2021; Brod et al. 2020). It gives no value for readiness = .5. **Confidence in the direction: medium; in the value: none.**

---

## Q3. Parameter ranges for a simulated learner

### Forgetting

| Source | What it gives | Mark |
|---|---|---|
| Rubin, D. C., & Wenzel, A. E. (1996). One hundred years of forgetting: A quantitative description of retention. *Psychological Review*, 103(4), 734–760. | 210 data sets. Best fits: logarithmic, power, exponential in √t, hyperbola in √t. **A plain exponential with one constant rate is not among the best.** | [A] |
| Murre, J. M. J., & Dros, J. (2015). Replication and analysis of Ebbinghaus' forgetting curve. *PLoS ONE*, 10(7), e0120644. | Ebbinghaus's curve replicated (savings, nonsense syllables); a possible bump at 24 h (sleep). | [A]; savings values conflict across secondary sources [S] |
| Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science*, 17(3), 249–255. | Prose. At 5 min, restudy beat testing. At 2 days and 1 week, testing beat restudy. Recall in the tested group fell far less over the week. | direction [A]; recalled values (1 week: about 56% tested vs 42% restudied, from about 75–81% at 5 min) [R] |
| Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. *Psychological Science*, 19(11), 1095–1102. | More than 1,350 learners, obscure facts, tests up to a year. The best review gap is about 20–40% of a 1-week retention interval. Retention keeps falling over weeks to months. | [A] |
| Slamecka, N. J., & McElree, B. (1983). Normal forgetting of verbal lists as a function of their degree of learning. *JEP: LMC*, 9(3), 384–397. | Stronger learning raised the starting level, but the forgetting **rate** stayed parallel. This is disputed under other scalings (Loftus 1985). | [A] |
| Zerr, C. L., Berg, J. J., Nelson, S. M., Fishell, A. K., Savalia, N. K., & McDermott, K. B. (2018). Learning efficiency: Identifying individual differences in learning rate and retention in healthy adults. *Psychological Science*, 29(9), 1436–1450. | Faster learners also retained more, over minutes to days. Individual differences are stable. | [A] (volume and pages [R]) |
| Settles, B., & Meeder, B. (2016). A trainable spaced repetition model for language learning. *Proceedings of ACL 2016*, 1848–1858. | Recall modeled as p = 2^(−Δ/h) with a half-life h per learner and item, h growing with each successful review. | [A] (pages [R]) |

**Implications for the simulated learner (fidelity, not code):**
1. A constant per-day exponential overstates early stability and late loss. If the eval keeps `forgetRate` as a per-day exponential, it should be read as the **effective rate over the window of the first spaced revisit (about 1 to 7 days)**, and the sweep should cover the range below. A power or √t form would be more faithful; that is personalization-eval's decision.
2. Differences between learners belong mostly in **initial encoding** (the intercept: prior knowledge, attention), with a **modest** spread in rate. On rate, Slamecka & McElree and Zerr et al. disagree, so allow about a 2–3× spread between learners, not an order of magnitude.
3. A retrieval attempt with feedback (the predict → reveal format) slows forgetting compared with reading (Roediger & Karpicke 2006). Our learners are closer to the *tested* curve.

Derivation of the forgetting row (per-day rate k, with R(t) = R₀·e^(−kt) fitted over 1–7 days): tested prose falling from about 75% to about 56% in 7 days gives k ≈ 0.04. Restudied prose falling from about 81% to about 42% gives k ≈ 0.09. Single exposures of unrelated facts lose more, down to roughly a third of the starting level in a week, which gives k ≈ 0.15–0.2. **These inputs are [R], so the row is low-medium confidence.** Half-life is ln 2 / k: k = 0.04 → about 17 days; 0.10 → about 7 days; 0.20 → about 3.5 days.

### Misconception pull (P(predicts the misconception | concept unknown))

| Source | What it gives | Mark |
|---|---|---|
| Casscells, W., Schoenberger, A., & Graboys, T. B. (1978). Interpretation by physicians of clinical laboratory results. *New England Journal of Medicine*, 299(18), 999–1001. | Base-rate problem: 27 of 60 (45%) of Harvard physicians and students gave the modal wrong answer (95%); 11 of 60 (18%) answered correctly (about 2%). | numbers [A] via secondary (consistent across several); journal issue [R] |
| Tversky, A., & Kahneman, D. (1983). Extensional versus intuitive reasoning: The conjunction fallacy in probability judgment. *Psychological Review*, 90(4), 293–315. | The "Linda" problem: a large majority (about 85% in the classic version) ranked the conjunction as more probable. | [R] |
| Ma, L., Ferguson, J., Roper, M., & Wood, M. (2007). Investigating the viability of mental models held by novice programmers. *SIGCSE '07*, 499–503. | After instruction, about 1/3 of students held non-viable models of value assignment; only 17% held a viable model of reference assignment. | [A] (pages [R]) |

**Implications:** pull is mainly a property of the **item** (how the hook is built), not of the learner, which matches W-1516c (a hidden per-lesson pull). The classic probability items, built to mislead, pull 45–85% of naive adults. Programming misconceptions pull about 33–83% of novices even after instruction. Our lessons are built around a misconception, so their pull should sit above a random item's. Learner differences should modulate the item's value modestly, through prior knowledge. Pull also falls with expertise (the Casscells sample was physicians).

### Prerequisite penalty

Relative reduction in encoding (and so in first-revisit recall) when the lesson is met with at least one prerequisite unseen. Sources: Q2 above. Low = 0, because pretesting and productive-failure evidence means no cost is possible for self-contained lessons. Base 0.15: a small-to-moderate cost, consistent with d ≈ 0.85 for pre-training on transfer, shrunk because our lessons stand alone and many edges are soft. High 0.40: just under the Bransford & Johnson halving, which came from a passage made incomprehensible on purpose. Optional **stress value 0.5** for edges a category manager marks as hard dependencies. No recovery when the prerequisite is met later (context-after did not help). **Confidence: low.** This is the parameter on which W-1517 says the phase A edge rests, so the eval should report results across the whole range, not only at base.

### Prior-knowledge spread (P(already knows the concept))

There is no general-population source for our concepts. Anchors: 18% correct on the base-rate item among physicians (Casscells et al. 1978); about 2/3 viable value-assignment models **after** a programming course (Ma et al. 2007). Pretesting studies pick material learners mostly do not know (Richland et al. 2009). Prior knowledge predicts outcomes strongly, with pretest–posttest r ≈ .53 (Simonsmeier et al. 2022), so it should carry real weight in simulated recall, while learning **gains** should not depend on it. **Confidence: low.** Under A2 this should be replaced by the aggregate first-prediction-correct rate per lesson once W-706 data exist and privacy-reviewer has read the calibration.

### The ranges table (for the C1 sweep)

Units are stated per row. "Base" is a centre for reporting, not a recommendation to tune to. Ranges are deliberately not chosen to make any policy win: they were written without seeing any simulator output.

| parameter | unit / meaning | low | base | high | source | confidence |
|---|---|---|---|---|---|---|
| `forgetRate` | per-day exponential rate k, effective over the 1–7 day first-revisit window (half-life 17 / 7 / 3.5 days) | 0.04 | 0.10 | 0.20 | Roediger & Karpicke 2006; Rubin & Wenzel 1996; Cepeda et al. 2008; Settles & Meeder 2016 | low-medium |
| between-learner spread of `forgetRate` | ratio of the fastest to the slowest persona's rate | 1.5× | 2× | 3× | Slamecka & McElree 1983; Zerr et al. 2018 | low |
| `misconceptionPull` (per lesson, hidden; W-1516c) | P(predicts the misconception \| concept unknown) | 0.30 | 0.55 | 0.85 | Casscells et al. 1978; Tversky & Kahneman 1983; Ma et al. 2007 | low-medium |
| learner modifier on pull | additive shift to the lesson's pull from learner expertise | −0.15 | 0 | +0.10 | Casscells et al. 1978 (experts still pulled); Metcalfe & Finn 2011 | low |
| `prereqPenalty` | relative cut in encoding when ≥1 prerequisite unseen; no recovery when it is later seen | 0.00 | 0.15 | 0.40 (stress 0.50 for hard edges) | Bransford & Johnson 1972; Mayer 2009; Gagné & Paradise 1961; Sinha & Kapur 2021 | low |
| `priorKnowledge` mean | P(knows a pilot concept), general audience 13+ | 0.05 | 0.20 | 0.50 | Casscells et al. 1978; Ma et al. 2007; Richland et al. 2009 | low |
| `priorKnowledge` spread between learners | SD of the per-learner mean (e.g. a Beta) | 0.05 | 0.15 | 0.25 | Simonsmeier et al. 2022 (prior knowledge varies and predicts outcomes) | low |
| prediction-then-feedback benefit (if the judge models it) | relative boost to encoding of the item, applied to **every** lesson | 0.00 | 0.10 | 0.25 | St. Hilaire et al. (g = 0.54); Crouch et al. 2004 (77 vs 70%); Kornell et al. 2009 | medium |
| extra benefit of a wrong prediction (hypercorrection) at first revisit | relative boost to correction when the prediction was a confident error, **minus** reversion | 0.00 | 0.05 | 0.15 | Butterfield & Metcalfe 2001; Butler et al. 2011 | low-medium |
| novelty benefit (concept/domain unseen) | relative boost to encoding | −0.05 | 0.00 | +0.05 | Schomaker et al. 2014 (with failed replication); van Kesteren et al. 2012 | low |

The last three rows are provided only in case the eval's learner models these effects. If it does, the judge should take them from this table and not from the composer's `wS` or `wN`, so the judge does not share the policy's assumptions (O2).

## What is unknown, and how it would become known

1. Whether lessons chosen for a strong misconception raise mean spaced recall (1c). This can be measured only in phase B, with aggregate counters per lesson: first-revisit recall by the lesson's first-prediction-wrong rate. That needs the A2 read.
2. The size of the prerequisite penalty for our self-contained lessons. A small within-subject experiment (order A→B vs B→A on pilot pairs, aggregate recall) would identify it. Observational data cannot, because the default order rarely breaks edges.
3. The forgetting form and rate for 60-second predict-reveal lessons at 1–7 days. First-revisit recall by gap, from W-706 aggregates, after the privacy read.
4. Whether hypercorrection holds for 13- to 15-year-olds in a feed (the executive-function moderation in Brod et al. 2020 is for 9- to 12-year-olds).
5. Every [R] and [S] number above, checked against its primary paper by someone with full-text access (research-lead or a web-capable session).

## Disagreements recorded (authority: "disagree with a curve or a simulator setting, in writing, with sources")

- `surprise = misconceptionStrength × readiness` with readiness .5 (brief-response §2.4): the multiplicative form is supported in direction (Q2, O8). The .5 has no source. Owner of the value: applied-scientist-personalization. I set nothing.
- The `wN · novelty` term is kept "only because, and only while, [it serves] recall" (§2.5). I found no evidence that it serves recall (1d). The term's fate is for the experiment and the VP. The simulator should not give novelty a recall benefit above the table's range.
