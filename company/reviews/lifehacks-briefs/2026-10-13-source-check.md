# Source check: Life Hacks briefs 1-5 (pre-build)

fact-checker (Ingrid) · 2026-10-13 · input: `company/domains/briefs/lifehacks.md` (cm-lifehacks, written 2026-10-13, sources cited from memory)

**Method and limits.** Web search only. In this session WebFetch and curl could not reach any primary host (arxiv.org, pmc.ncbi.nlm.nih.gov, pnas.org, royalsocietypublishing.org and others returned DNS or proxy 403 errors). So each verdict rests on search-indexed abstracts, publisher and indexing records (PubMed, ScienceDirect, CERN CDS, Semantic Scholar, ADS) and press coverage that quotes the papers. None rests on a full-text reading. "Confirmed" means the bibliographic record and the substance agree across at least two independent records. Every claim that a learner will see still needs a full-text check at claim-verification time (see "Before verification" under each brief). This is a source check of briefs, not a claim verification: no `meta.json` exists yet and no claim status was set.

Verdicts: **confirmed** · **corrected** (the right reference or number is given) · **not found** (no independent support found; drop or re-source) · **unchecked** (a textbook, or not reachable; needs a specific edition and section).

## Summary

| # | Brief | Premise | Safe to build on? |
|---|---|---|---|
| 1 | towel-spread-dries-first | Holds (it is a stated model) | Yes, once the textbook citations name an edition and section |
| 2 | spaced-beats-cram | Holds | Yes, with claim 2 re-sourced to Rawson & Kintsch only |
| 3 | wobbly-table-quarter-turn | Holds **for a square table only** | Yes, after claim 1 is narrowed and the Martin reference corrected |
| 4 | square-bow-stays-tied | Holds: the 2017 paper does compare the two knots | Yes, with the exact wording checked in the full text |
| 5 | long-cord-knots-itself | Holds, but the ~50% plateau depends on the conditions | Yes, if the stage states the conditions |

No brief's premise fails. Briefs 3 and 5 contain claims that would be wrong as written (see below).

## Brief 1 · towel-spread-dries-first

| Claim / citation | Verdict | Evidence / fix |
|---|---|---|
| (1) In the constant-rate drying period the evaporation rate is proportional to the exposed area | **Confirmed (substance)**, citation **unchecked** | Standard constant-rate relation W = k·A·(Ps − Pw); time in the constant-rate period t = (w1 − wc)/(Rc·A). Seen in course notes, e.g. [Buffalo CE427 Drying](https://wwwcourses.sens.buffalo.edu/ce427/Drying.PDF), [RGPV lecture](https://www.rgpv.ac.in/campus/CM/Unit%20III%20(Lecture-2)%20Rate%20of%20Drying%20and%20Time%20for%20Drying.pdf). The brief cites Incropera et al. and Mujumdar without an edition, section or page; I could not reach either text. "Textbook" alone is not a source: the builder must name the edition and section (e.g. Mujumdar, *Handbook of Industrial Drying*, 4th ed., CRC 2014, the chapter on drying fundamentals and the constant-rate period), and the fact-checker will check that page. |
| (2) Areas 1.96 m² vs about 0.52 m² | **Confirmed (arithmetic)** | 0.7 × 1.4 × 2 = 1.96; 0.35 × 0.7 × 2 = 0.49, plus about 0.03 for the edges = 0.52. Ratio 3.77, not 3.8: 3 h × 3.77 = 11.3 h (the brief says 11.4). "About 12 hours" is still a fair rounding. The 0.03 m² edge figure assumes a stack about 1.5 cm thick; state it as illustrative. |
| (3) "About 12 h" comes from the model, not a measurement | **Confirmed as a disclosure** | No measurement of towel drying was found or needed. The stage must say this. Note that the model leaves out the falling-rate period, which makes the folded towel slower still; the brief already says so. |
| (4) Moving air raises the mass-transfer coefficient | **Confirmed (substance)**, citation **unchecked** | Same as (1); the textbook needs an edition and section. |

Premise: holds. A quarter-folded stack exposes about a quarter of the area, and the constant-rate model predicts a drying time about 3.8 times longer.

## Brief 2 · spaced-beats-cram

| Claim / citation | Verdict | Evidence / fix |
|---|---|---|
| (1) Cepeda, Pashler, Vul, Wixted & Rohrer 2006, *Psychological Bulletin* 132(3), 354–380 | **Confirmed** | "Distributed practice in verbal recall tasks: A review and quantitative synthesis." 839 assessments, 317 experiments, 184 articles. [PubMed 16719566](https://pubmed.ncbi.nlm.nih.gov/16719566/), [PDF (Vul lab)](https://www.evullab.org/pdf/CepedaPashlerVulWixtedRohrer-PB-2006.pdf). Scope: *verbal recall* tasks. "Hundreds of experiments" is fair (317). |
| (2) Massed study can match or beat spaced study on an immediate test: Rawson & Kintsch 2005 | **Confirmed** | Rawson & Kintsch (2005), "Rereading effects depend on time of test," *J. Educ. Psychol.* 97(1), 70–80. On an immediate test, massed rereading beat a single reading and distributed rereading did not; on a test 2 days later, distributed rereading came out ahead. Described in [Greving & Richter 2019, Frontiers in Psychology (PMC6333692)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6333692/). Caveat: that classroom replication with seventh-graders found the massed advantage on the short test but **no** delayed benefit for distributed rereading. |
| (2) "...and Cepeda et al. 2006" as support for the massed advantage on an immediate test | **Not found** | The abstract supports spaced > massed and the ISI × retention-interval interaction. It does not state that massed wins on immediate tests. Drop Cepeda 2006 from claim 2, or the fact-checker confirms it from the full text. |
| (3) Dunlosky, Rawson, Marsh, Nathan & Willingham 2013, *PSPI* 14(1), 4–58 | **Confirmed** | Distributed practice and practice testing were the two techniques rated "high utility." DOI 10.1177/1529100612453266. [APS release](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html). |
| (4) The curves are illustrative | **Disclosure** | Nothing to check. |
| (5) Cepeda, Vul, Rohrer, Wixted & Pashler 2008, *Psych. Sci.* 19(11), 1095–1102 | **Confirmed** | "Spacing effects in learning: A temporal ridgeline of optimal retention." More than 1,350 participants. The optimal gap is about 20% of the test delay for delays of a few weeks and about 5% at one year. [PubMed 19076480](https://pubmed.ncbi.nlm.nih.gov/19076480/). |

Premise: holds. Caution for the builder: the claim must not imply that each 1-hour block is a single uninterrupted reread; the cited evidence is mostly verbal recall and rereading.

## Brief 3 · wobbly-table-quarter-turn

| Claim / citation | Verdict | Evidence / fix |
|---|---|---|
| Baritompa, Löwen, Polster & Ross 2007, "Mathematical table turning revisited," *Math. Intelligencer* 29(2), 49–58 | **Confirmed** | arXiv [math/0511490](https://arxiv.org/abs/math/0511490) (Nov 2005); [ADS](https://ui.adsabs.harvard.edu/abs/2005math.....11490B/abstract); [Monash record](https://research.monash.edu/en/publications/mathematical-table-turning-revisited). The paper treats **rectangular** tables with equal legs. |
| Martin 2006, "On the stability of four feet tables," arXiv id to be found | **Corrected** | Title: "On the stability of four-**legged** tables." Author: André Martin (CERN). arXiv **[math-ph/0510065](https://arxiv.org/abs/math-ph/0510065)** (v1 17 Oct 2005, v6 15 Aug 2006; CERN-PH-TH/2006-117). Published in *Physics Letters A* **360**(4–5), 495–500 (8 Jan **2007**), DOI [10.1016/j.physleta.2006.08.053](https://www.sciencedirect.com/science/article/abs/pii/S037596010601303X). [CERN CDS 897121](https://cds.cern.ch/record/897121). Cite it as Martin 2007 (Phys. Lett. A), with the arXiv id. |
| (1) "four equal legs whose feet lie on a circle (a square table is one) ... at most 90°" | **Corrected (overreach)** | Martin proves the **square** case (rotation under 90°) and only **conjectures** the case where the feet lie on a circle (see his abstract). Baritompa et al. cover rectangles, but I found no source giving a bound of at most 90° for a non-square rectangle. The general cyclic-quadrilateral case was listed as open by Meyerson ([Pacific J. Math. 110(1), 1984](https://msp.org/pjm/1984/110-1/p16.xhtml)) and has only later partial treatments (Gournay, [arXiv 2004.09260](https://arxiv.org/abs/2004.09260)). **Fix:** limit claim 1 to "a square table with four equal legs" and drop "whose feet lie on a circle." The stage uses a square table, so the lesson is not affected. |
| (2) The sign flips over a quarter turn, so the gap passes through zero (IVT) | **Confirmed (derivation)** | The standard argument, given in both papers. The calculus text needs to be a specific citation, or the derivation is shown on the stage and checked as a derivation. |
| (3) Balanced does not mean level | **Confirmed** | Both papers, and [Scientific American, "Strange but True: Turning a Wobbly Table Will Make It Steady"](https://www.scientificamerican.com/article/strange-but-true-turning). |
| (4) Steepness limit "about 35° for a square table in Baritompa et al." | **Confirmed, with precision added** | Baritompa et al.: the ground's slope between any two points must not exceed arctan(1/√2) ≈ **35.26°** (a Lipschitz bound), and the legs must be long enough (at least half the diagonal) that the table frame does not hit the ground. Martin's published abstract: a local slope of at most 14.4° at first, later 35°. Nick Higham's [blog](https://nhigham.com/2015/09/17/wobbly-tables/) prints 35.36°, a typo. Say "about 35°" and attribute it to Baritompa et al. 2007. |
| "far steeper than any café floor" | **Unchecked (judgement)** | Reasonable, but the condition is a bound on slope between **any two points**, so a step or lip between paving slabs (a discontinuity) breaks the theorem. "Bumpy paving" in the prediction is risky: the stage floors must be smooth bumps, and the reveal already says "no steps or holes." |
| (5) Bump patterns are illustrative | Disclosure | Nothing to check. |

Premise: holds for the square table the lesson uses. As written, claim 1 states a conjecture as a theorem.

## Brief 4 · square-bow-stays-tied

| Claim / citation | Verdict | Evidence / fix |
|---|---|---|
| Daily-Diamond, Gregg & O'Reilly 2017, *Proc. R. Soc. A* 473: 20160770 | **Confirmed** | "The roles of impact and inertia in the failure of a shoelace knot." [PubMed 28484324](https://pubmed.ncbi.nlm.nih.gov/28484324/), [PMC5415684](https://pmc.ncbi.nlm.nih.gov/articles/PMC5415684), [ResearchGate](https://www.researchgate.net/publication/316101519_The_roles_of_impact_and_inertia_in_the_failure_of_a_shoelace_knot). |
| Does the paper really compare the two bows? | **Yes, confirmed** | It tested a "weak" knot (granny-based) and a "strong" knot (square-based). In pendulum tests at the maximum added weight, the weak knot failed every time; the strong knot came apart in about half of the 15-minute trials. The authors recommend the strong (square) version. A co-author quote: "the weak knot will always fail and the strong knot will fail at a certain time scale." [Science News](https://www.sciencenews.org/?p=21900), [PBS NewsHour](https://www.pbs.org/newshour/science/science-behind-shoelace-knot-doomed-fail), [Discover](https://www.discovermagazine.com/this-is-why-your-shoelaces-are-always-untied-11633). |
| (3) Footstrike impact plus whipping of the free ends; failure within a few strides once loosening starts | **Confirmed** | From the abstract: repeated impact loosens the knot, and the whipping of the free ends from the leg swing drives slip, ending in runaway untangling. The press reports failure "within as few as two strides" once loosening begins, and that swinging the leg without impact did not untie the knot. |
| (4) "The square-based bow outlasted the granny-based bow" | **Confirmed (substance)**, exact wording **pending full text** | Supported, as above. Do not put a multiple on the stage: "lasts at least twice as long" is a co-author's estimate in interviews, not a result in the paper. The strong-knot failures needed weights added to the free ends, so "outlasted" is right and "never fails" would be wrong. |
| (1) Shoelace bow = slipped reef; the granny version comes from the second step's direction | **Confirmed (substance)**, Ashley **unchecked** | [Wikipedia: Shoelace knot](https://en.wikipedia.org/wiki/Shoelace_knot) (secondary), and Fieggen, [Ian's Shoelace Site, Granny Knot](https://www.fieggen.com/shoelace/grannyknot.htm). Ashley 1944: real book, but I did not check entry numbers. The builder must give ABOK entry numbers. Caution: "same direction" is ambiguous for a bow, because the loop-wrap step is not a mirror of the first half-knot. The stage toggle must be drawn from Fieggen's diagrams, not from that wording. |
| (2) The granny bow sits along the shoe; the square bow sits across | **Confirmed (two sources)**, Ashley **not found** | Fieggen (quoted in a [5 Minutes for Mom post](https://www.5minutesformom.com/laces/): bows that "sit vertically instead of across the shoe" mean a granny knot) and Wikipedia, which agree. I found no statement of this in Ashley; cite Fieggen as the primary source. |
| Prediction "Check" sentence ("Daily-Diamond et al. 2017 tested both and found the square-based bow the stronger") | **Confirmed** | As above. |

Premise: holds. The 2017 paper does compare the two bows, and the square-based bow did better.

## Brief 5 · long-cord-knots-itself

| Claim / citation | Verdict | Evidence / fix |
|---|---|---|
| Raymer & Smith 2007, "Spontaneous knotting of an agitated string," *PNAS* 104(42), 16432–16437 | **Confirmed** | DOI 10.1073/pnas.0611320104, [PMC2034230](https://pmc.ncbi.nlm.nih.gov/articles/PMC2034230). 3,415 trials; 120 knot types, with minimum crossing numbers up to 11. |
| (1) Almost never knotted below about 0.46 m | **Confirmed** | The text says P rose sharply as L went from 0.46 to 1.5 m. Press: strings shorter than 0.46 m (1.5 ft) did not form knots ([Live Science](https://livescience.com/1903-science-knots-unraveled.html), [Physics Today](https://physicstoday.aip.org/news/pieces-of-tumbled-string-form-topologically-simple-and-complex-knots)). |
| (1) Levelled off near 50% for long strings | **Confirmed, conditionally** | The text says P "saturated at ≈50%" for L from 1.5 to 6 m, in the standard conditions: a 0.30 m cubic box at 1 rev/s for 10 s, #4 string. The **abstract also says P approaches 100% with long, flexible strings**, and Table 1 shows 3 m strings from 26% to 55% depending on box size, 74% at 30 s, and 65% for a more flexible string. **Fix:** the claim and the reveal must say "in the paper's standard setup (30 cm box, 10 s)". "Long cords knot about half the time" without those conditions would be wrong. |
| Prediction answer B: a 3 m string about half the time | **Confirmed** | Within the plateau, in the standard setup. Box width and time must match the paper (state them). |
| (2) Stiffer strings knotted less; longer tumbling knotted more | **Confirmed** | Tripling the agitation time substantially raised P; a more flexible string raised P (65% vs about 50%); the abstract blames stiffness and jamming for the sub-100% plateau. A faster rotation **reduced** knotting (do not show a speed control as "more = more knots"). |
| (3) A knot forms when a free end passes through a loop (braid-move model) | **Confirmed** | The abstract proposes a random braiding process at the string's end, acting on the coiled string. |
| (4) A closed loop cannot change knot type without passing through itself (Adams, *The Knot Book*, ch. 1) | **Confirmed (mathematics)**, citation **unchecked** | A standard definition (knot type is invariant under ambient isotopy). Adams, *The Knot Book* (W.H. Freeman 1994; AMS reprint 2004), ch. 1, is the right kind of source; the builder must give the page. Note: Raymer & Smith closed the ends *by hand* afterwards to classify knots; they did not tumble strings with clipped ends. The "ends clipped" toggle is a mathematical consequence, not an experimental result, and the stage must say so. |
| (5) Draws from the curve read off the paper's figure | Disclosure | The figure values must be re-read from the full-text Figure 2 at verification. |

Premise: holds. The "about half" plateau is real but depends on the setup, and the lesson must carry those conditions.

## Before verification (all briefs)

- Full-text reads (blocked this session): Daily-Diamond et al. results section (exact wording for claim 4); Raymer & Smith Fig. 2 and Table 1 (curve values, which box size gives which %); Baritompa et al. theorem statement (the 35.26° bound and the leg condition); Cepeda 2006 (only if claim 2 keeps it).
- Textbook citations need an edition and page: Incropera/Mujumdar (brief 1), Ashley ABOK entry numbers (brief 4), Adams ch. 1 page (brief 5), the IVT source (brief 3).
