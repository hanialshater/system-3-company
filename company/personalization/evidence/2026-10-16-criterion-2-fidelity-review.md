# Fidelity review: criterion 2's learner and world against the E1 ranges

owner: learning-scientist-personalization (Oskar) · run: ls-f1-1016 · date: 2026-10-16
board: W-1548 · brief: mailbox request 20261016T234803236Z-vp-personalization-64b1c832 (F1, lane 14 batch 3 wave 3)
reader: **personalization-eval** (K2, W-1549: answer every **blocking** row in writing, fixed or refused with a reason, before the freeze). Findings also go to vp-personalization and applied-scientist-personalization.
status: **research record, not a learner-facing claim.** Fidelity only. I give no verdict on any policy, choose no range value for the eval and set no curve value. The fixes below are suggestions; the learner and harness code belong to personalization-eval. Every number in this file is either from E1 (cited by row) or my arithmetic on the code, shown.

## What I read, what I ran, and what I did not

**Artifact first:** company/personalization/eval/harness/c2/learner2.mjs, world2.mjs, harness2.mjs, scorer2.mjs (head), README.md; the pre-history generator `seedHistory` in ../harness.mjs and the persona latents in ../personas.copy.mjs (stopHazard, forgetRate only); then company/personalization/eval/2026-10-16-criterion-2.md, all of it. **Yardstick:** my E1 (company/personalization/evidence/2026-10-16-criterion-2-ranges.md, including "Disagreements recorded") and, for continuity, my C2 review (company/personalization/evidence/2026-10-16-simulator-fidelity-review.md). **Product:** src/kit/progress.ts (`REVISIT_SCHEDULE_DAYS`, `revisitDue`), src/components/Feed.tsx (lines 23–106: `MAX_REVISITS`, the interleave), company/constitution/amendments/AMD-008-first-light-surface-value.md (status line, F2).

**Ran:** `node --test company/personalization/eval/harness/c2/tests2.test.mjs` (22 of 22 pass) and one scratch script of pure arithmetic (it imports nothing from the harness: exponential vs power kept shares, L2 multipliers at the fixed schedule's lags, guess shares). **Not run or read:** any arm, the reference arm included; `seeds`, `episode`, `world`, `run2.mjs`; harness/records/; any readout; model/review-timing-curves.ts, model/sim/review-timing.ts and their reports. The criterion text itself states some reference-arm and fixture figures (§1.3 point 5, §3 "65–83%"); I quote the 65–83% revisit share once below because the brief asks about the revisit share, and use no other figure from it.

**Rows I could not judge** without running an arm are marked *not judged* (stop-if rule). Rows E1 has no source for are marked **unsourced**; I do not guess a value for them.

## Marks

- **blocking**: criterion 2's readout would mislead about learning unless this is fixed or the readout says it plainly. K2 must answer it in writing before the freeze.
- **note**: a departure, or a choice with no source, that does not change what the readout can honestly claim. "State in readout" means the readout's model description should carry it.

## Summary

| # | Mechanism or parameter | Mark | One line |
|---|---|---|---|
| B1 | Forgetting form over 1–30 days; the H = 1/7/30 reads (E1 disagreement 2) | **blocking** | Single exponential. The primary read sits 7–20 days after each episode lesson, where it keeps 0.20 against the power form's 0.44 at E1 base (2.2×); at H = 30, 4–11× |
| B2 | L2 lag form of `revisitStrengthen` (E1 disagreement 3) | **blocking** | Gives ≈1.0 at high recall, against E1's [F] anchor ≈0.6 there; filling S from E1's row makes the fixed schedule's revisits 2–6× weaker than E1's range |
| B3 | Learner × lesson spread of k | **blocking** | Absent. E1 names it as the parameter that creates review-timing headroom, to be swept 0.2 / 0.4 / 0.7 |
| B4 | `learnRate` units and the 1.10 boost (E1 disagreement 5) | **blocking** (closes on one line) | The code always multiplies by 1.10; §4 does not say which E1 row fills it |
| B5 | Pre-history knowledge law (C2 F23 second bullet, now with L3 and `relearn`) | **blocking** | Pre-history makes "predicted right" and "recalled right" mean known with certainty and a miss mean unknown with certainty; the episode does not. A review rule may read both signals |
| B6 | Session structure: revisits first in 12 positions | **blocking** (closes on a scope line) | Shipped Feed.tsx interleaves at most one revisit per three lessons; AMD-008 is proposed, not ratified; the 12-card session is unsourced |
| N1 | `relearn` after a failed revisit | note | Mechanism matches E1. Fill 0.60 / 0.70 / 0.88. Two cells put relearn below first learning (savings) |
| N2 | k after a relearned miss | note (no departure) | `mult` kept = E1 base 1.0 |
| N3 | A miss without relearn deletes the trace | note | Binary artifact; revisits still never lower expected K |
| N4 | L3: lucky guess on an unknown concept | note (no departure) | Matches E1 (feedback after every pick) |
| N5 | Guessed success on a known, faded concept gets the largest strengthening | note | Inconsistent with L3's reasoning; at kept 0.05, 79% of successes are guesses |
| N6 | Prior knowledge: the sweep | note | Fill high 0.45. Between-learner SD not swept; between-lesson SD absent |
| N7 | L4: prior-known clock at the episode start | note, **unsourced**, state in readout | No source for how old prior knowledge decays. Under L4, refreshing a prior-known concept is worth about as much as learning a new one (0.37 vs 0.38 at base) |
| N8 | L1 revisits beyond the first | note (no departure) | |
| N9 | L5 `revisitStopScale` and the minute costs | note, **unsourced** | Only a low cell exists |
| N10 | L6 no novelty, no hypercorrection | note (no departure) | `relearn`'s anchors already average over confident and unconfident errors |
| N11 | `guessRecall` 0.2 | note, state in readout | The cited basis (Fazio) is the one E1 withdrew; the format basis gives 0.08 / 0.22 / 0.35 |
| N12 | Forgetting cells × persona spread | note (C2 F8, kept) | Fastest persona at the high cell runs at k ≈ 0.27, above E1's high 0.19. Spread not swept |
| N13 | Daily returns for 14 days | note, state in readout | The 21-day step is exercised only by pre-history; irregular returns, where per-lesson timing matters most, are not in the world |
| N14 | Recall-based k read on a 3-option revisit | note (E1 caveat) | Rates measured on recall are an upper bound for recognition |
| O1 | `oracle-order` | note, state in readout | What NO-HEADROOM can and cannot show, below |
| O2 | `oracle-review` | note, state in readout | Its NO-HEADROOM is uninformative about E1's headroom source until B3 is answered |
| — | Net direction of B1 and B2 on the candidate-vs-fixed pair | *not judged* | They push opposite ways; the net needs an arm run |

**Verdict on fidelity, not on any policy: not ready to freeze as built.** B1–B3 change the world in which review timing is judged, in the mechanisms E1 credits for the effect. B4–B6 each close with one line of code or one readout sentence. The eval may refuse any of them with a reason.

---

## B1 · Forgetting form over 1–30 days, and the H reads · blocking

**What the code does.** learner2.mjs `keptOf`: kept = exp(−forgetK × mult × days since the clock), the C4 form, for every horizon. world2.mjs has no shape row.

**What E1 says.** Ranges table, rows "forgetting shape beyond 7 days" (ratio 0.2 / 0.27 / 1.0) and "power exponent d" (0.25 / 0.27 / 0.65); §1 "Consequence for 21–30 days"; Disagreement 2. Sources: Murre & Dros 2015 [F] (Table 2), McGillivray 2015 and Fazio 2010 power fits [F, derived], Rubin & Wenzel 1996 [A].

**Why it is blocking for the primary, not only for H = 30.** Criterion §1.3 point 4 says the H = 7 read "does not lean on extrapolating the exponential form beyond the 1-to-7-day window". That is not so. T₇ is day 20; an episode lesson completed on day d with no revisit is read 20 − d days later, so **7 to 20 days**, and pre-history lessons 20 to 40 days. At E1 base (k = 0.08, d = 0.27), arithmetic:

| days since the clock | 7 | 14 | 20 | 30 | 43 |
|---|---|---|---|---|---|
| exponential kept | 0.571 | 0.326 | 0.202 | 0.091 | 0.032 |
| power kept | 0.570 | 0.481 | 0.440 | 0.396 | 0.360 |
| power ÷ exponential | 1.00 | 1.48 | 2.18 | 4.36 | 11.2 |

The two forms agree at 7 days by construction and part from there. So most of R₇'s mass, and all of R₃₀'s, sits where the code's form departs from E1's sourced shape by 1.5× to 11×. E1 §5 states the consequence: an exponential overstates loss after a week, which makes reviewing more often look better than the evidence supports. That bears on the review pair directly.

**Answers I would accept** (E1 Disagreement 2, unchanged): (a) a power form, e.g. kept = (1 + mult·t)^(−d) with d from E1's row (mult as a time scale keeps L2's parameter meaning); (b) the exponential with k multiplied by E1's shape ratio after day 7 of a trace's age; (c) a refusal, with the readout stating that R₇ and R₃₀ read the exponential beyond its sourced window and in which direction that biases review. In any case, correct §1.3 point 4's sentence, and H = 30 need no longer be labelled "extrapolated" under (a) or (b): E1 sources the shape to 31 days (low confidence).

## B2 · L2, the lag form of strengthening · blocking

**What the code does.** After a successful revisit of a known concept: clock reset, `mult ×= S^(1 − r)`, r = kept at the revisit (learner2.mjs `revisit`). world2.mjs defines S as the factor "made when the increment had fully decayed".

**What E1 says.** Table rows `revisitStrengthen` (0.35 / 0.50 / 0.60, a multiplier per correct revisit) and "lag dependence": from **≈0.6 at very high recall** (Fazio 2010 Schedule A [F]: one immediate retrieval took k from 0.17–0.19 to 0.10) to **≈0.35 near the optimum**; the shape between has no source.

**The departure, in two parts.**
1. *At high recall L2 gives no strengthening; E1's only [F] anchor gives about 0.6.* Fazio's immediate test is the r ≈ 1 case, and it roughly halved k. L2 gives 1.0 there.
2. *Units.* If K2 fills S from E1's `revisitStrengthen` row, S becomes the full-decay endpoint, not the per-revisit multiplier E1 measured. At E1 base k = 0.08 the product's lags give (arithmetic):

| S | multiplier at 1 / 3 / 7 / 21 days | cumulative after 1–4 successes (L2) | E1 constant reading, S^n |
|---|---|---|---|
| 0.35 | 0.92 / 0.80 / 0.64 / 0.43 | 0.92 / 0.75 / 0.52 / 0.28 | 0.35 / 0.12 / 0.04 / 0.02 |
| 0.50 | 0.95 / 0.86 / 0.74 / 0.57 | 0.95 / 0.82 / 0.64 / 0.40 | 0.50 / 0.25 / 0.13 / 0.06 |
| 0.60 | 0.96 / 0.90 / 0.80 / 0.66 | 0.96 / 0.87 / 0.71 / 0.50 | 0.60 / 0.36 / 0.22 / 0.13 |

After the three revisits an episode lesson can get under the fixed schedule (1, 3, 7 days), L2 leaves k at 0.52–0.71 of its start; E1's range, read at any lag, leaves 0.04–0.22. Every L2 value at the 1- and 3-day revisits is above E1's high (0.60), i.e. weaker than any sourced value.

**Why it matters.** L2 was built for the right reason (criterion §1.2: constant halving would make early, frequent revisits free). But it overshoots: it makes the product's early revisits near-worthless for durability, which favours rules that revisit later than the fixed schedule. Those are the ones V4 says cannot ship without an AMD-008 F2 amendment. The world should not decide that question by an unsourced endpoint.

**Answers I would accept:** (a) a lag or recall form anchored at both of E1's ends: ≈ E1's high (0.6) as r → 1 and E1's low (0.35) at low r, with the interpolation stated as the eval's unsourced choice; (b) keep L2, but sweep its endpoint so that at the fixed schedule's 3–7-day lags the per-revisit multiplier spans E1's 0.35–0.60, and say in §4 that S is not E1's row; (c) a refusal plus a readout line: "the world's revisits at high recall strengthen nothing, against the one full-text anchor; review rules that wait longer than the fixed schedule are favoured by construction". N5 belongs with whichever answer is chosen.

## B3 · Learner × lesson spread of k · blocking

**What the code does.** world2.mjs `personaWorld2`: forgetK is per persona only. Every lesson of one learner forgets at the same rate; lesson-level variation comes only from encoding (binary) and revisit history.

**What E1 says.** Table row "learner × lesson spread of k (new)": SD of log k 0.2 / 0.4 / 0.7 (Fastrich 2018 [F] item SD 0.19, participant SD 0.17, derived upper bound; Mettler 2016 Exp. 2 [F]; Sense 2016 [A]). E1 §2: "the parameter that creates review-timing headroom … should therefore be swept, not set at one value, and it must not be raised above its evidence". Memo item 5: headroom "will be set mostly by the learner × lesson spread of k".

**Why it is blocking.** Criterion 2 judges review timing and reads `oracle-review`'s headroom (§2.4). In Mettler Exp. 2 [F], schedules copied per item from other learners lost most of the adaptive gain; that is the effect this term carries. Without it, a NO-HEADROOM reading says little about review timing in the sense the studies measured, and a candidate's PASS or FAIL is judged in a world that lacks the mechanism.

**Answers I would accept:** (a) add a per-(learner, lesson) log-normal factor on k, keyed by seed so arms share it, with its SD a swept row filled from E1 (0.2 / 0.4 / 0.7), and include it in the corners; (b) a refusal plus a readout line that the world has no learner × lesson variation in forgetting, the source E1 names for adaptive gains, so neither oracle's reading nor the candidate's result speaks to it.

## B4 · `learnRate` units and the prediction boost · blocking (closes on one line)

**What the code does.** learner2.mjs `pEncode` = learnRate × (1 + predictionFeedback) × prerequisite factor, on every new card. world2.mjs labels learnRate "before the prediction-feedback boost". §4's row says only "E1 item 4".

**What E1 says.** Two rows: everything included 0.35 / 0.65 / 0.88, and **pre-boost 0.35 / 0.60 / 0.80**, "if × 1.10 is applied separately". Disagreement 5: use the pre-boost row. The guess-first anchors (Fazio & Marsh 2009, Metcalfe 2012/2015, McGillivray, Fastrich) already include the prediction.

**Why blocking.** Filled from the wrong row, the base becomes 0.715 and the high 0.968 (arithmetic), the latter above every anchor. Readout 1 already showed ΔR scales with learnRate (C2 F2).

**Answer:** cite the pre-boost row in §4 and world2.mjs. It also creates a learnRate-high cell (0.80), so §4's count becomes 15 one-at-a-time cells, not 14. Minor, same row: `seedKnowledge` encodes pre-history at learnRate without the boost, though pre-history lessons carry predictions. With the pre-boost row that understates pre-history encoding by 1.10×; note only.

## B5 · Pre-history follows a different knowledge law from the episode · blocking

**What the code does.** learner2.mjs `seedKnowledge` (phase A rule, unchanged): a pre-history recall that was correct ⇒ known, clock at the recall, with certainty; a recall that was wrong ⇒ unknown, with certainty (no `relearn`); no recall ⇒ known if `predictedCorrectly`, else known with P learnRate. Pre-history spans 20 days, with a recall taken on 70% of lessons (harness.mjs `seedHistory`).

**The departure.** In the episode, the same events mean something else. A correct revisit on an unknown concept is a lucky guess and does not make it known (L3); a miss re-encodes with P `relearn` (0.70 at E1 base); a right prediction by an unknown learner happens with P 1 − pull (about 0.45 at pull 0.55) and says nothing about later encoding. Arithmetic at prior 0.2, pull 0.55, encode 0.66: in the episode P(known | predicted right) ≈ 0.77 and P(known | predicted wrong) ≈ 0.68; in pre-history the same signal gives 1.0 and 0.70.

**Why it is blocking now (it was a note in C2 F23).** Criterion 2's candidate reads `predictedCorrectly` and `recalls` (§I.3), and pre-history lessons are the day-0 backlog of every review rule. Criterion §1.2 L3 was introduced because "Phase A made a guess at P 0.2 count as knowing, which review timing would exploit". Pre-history still does that, and adds a perfectly informative prediction signal the episode does not have. A candidate that leans on either signal would be credited for an artifact of the generator, not for anything a learner does.

**Answers I would accept:** (a) seed pre-history through the episode's own law (prior draw, prediction from the knowledge state, encode with pEncode, a recall through `revisit` with L3 and `relearn`), keyed as now so arms share it; (b) a refusal plus a readout line naming the asymmetry and saying the candidate's use of `predictedCorrectly` and pre-history recalls is uninterpretable.

## B6 · Session structure and the revisit share · blocking (closes on a scope line)

**What the world does.** EPISODE2: one session a day, 12 card positions, every revisit the rule returns first, then new cards; stop hazard per card, × `revisitStopScale` after a revisit. The criterion reports the reference arm's revisit share at 65–83% of cards (§3).

**What the product does.** src/components/Feed.tsx: up to `MAX_REVISITS` = 12 due revisits are fetched per visit (a fetch cap, not a session length) and placed **one after every third new lesson** (`i % 3 === 1`); the rest are appended only when the list ends (`list.next === null`). So while the catalog lasts the shipped feed serves at most about one revisit per three lessons, about 25% of cards. AMD-008 F2 ("due revisits come before new lessons") has status **proposed (draft, not applied)**. The criterion knows this (§1.1 note) and follows F2 on purpose.

**Why it is blocking, narrowly.** Learning evidence is not at issue here; what is at issue is what the review pair measures. With per-card stop hazards of 0.04–0.12 × (1.5 − interest) (personas.copy.mjs) the 12-card cap binds for several personas, so each revisit displaces a new card one for one, and a learner who stops early sees only revisits. That prices a revisit very differently from the shipped feed, where a stop after three cards still includes two new lessons. The 12-card session has no source (E1 has none; I give none).

**Answer I would accept:** one readout sentence: the result holds for a revisits-first feed of 12 cards (AMD-008 F2 as drafted), not for the shipped Feed.tsx interleave, and the session length is unsourced. A reported-only cell with the product's interleave would be better, but I do not require it.

---

## Notes

**N1 · `relearn` (P re-encode after a failed revisit) · note.** Mechanism (clock reset, known again with P relearn) matches E1 §2 and the table row (0.60 / 0.70 / 0.88: Metcalfe 2015 [F], Metcalfe 2012 [F], Fazio & Marsh 2009 [F], McGillivray [F]). Placeholders 0.25 / 0.5 / 0.75 must go. One consistency point, partly my own: E1 says relearning should not be worse than first learning (savings, Murre & Dros [F]) and set relearn's low "= learnRate base". That base is the pre-boost 0.60; the world's effective first learning is 0.60 × 1.10 = 0.66. So the relearn-low cell (0.60) sits 0.06 under first learning, and in the learnRate-high cell (0.88 effective) base relearn 0.70 sits well under it. State it; no change asked.

**N2 · k after a relearned miss · note, no departure.** The code keeps `mult` (earlier strengthening survives, no penalty). That is E1's base 1.0 ("the clock restarts at the learner's own k"). E1 gives no value above 1 and the code uses none.

**N3 · A miss without relearn deletes the trace · note.** With P (1 − relearn) a known concept that missed becomes unknown and leaves K entirely, though it had kept r > 0. A binary-model artifact. I checked that it cannot make revisiting look harmful: expected kept after a revisit is at least p = g + (1 − g)·r ≥ r, so a revisit never lowers expected K.

**N4 · L3 · note, no departure.** Every revisit shows the answer and a "why" (E1 header, Feed.tsx `RevisitCard`), so a lucky guess followed by feedback is a learning event with P `relearn` (Kornell et al. 2015 [A]). Correct.

**N5 · Guessed successes strengthen most · note (goes with B2).** The code strengthens on any correct answer when the concept is known, including a correct answer that came from the guess floor. The share of successes that are guesses is g(1 − r)/p: 0.02 at kept 0.9, 0.17 at 0.5, 0.44 at 0.2, 0.79 at 0.05 (arithmetic, g = 0.2). L2 gives those the largest multiplier. Pyc & Rawson [A] credit harder *successful retrievals*, not guesses, and L3 already refuses to count a guess as knowing. Suggestion: draw retrieval (P r) and guess separately and strengthen on retrieval only.

**N6 · Prior knowledge sweep · note.** Fill the mean from E1: 0.05 / 0.20 / **0.45** (placeholder high 0.50; E1 moved it to the [F] edge). The between-learner SD is used at base 0.15 and not swept, though E1 gives 0.05 / 0.25. E1's new between-lesson SD (0.10 / 0.20 / 0.30) is absent: within a domain every concept has the same P(known). That matters mainly for `oracle-order`, which sees which concepts are known; a policy under test cannot see it. State in readout.

**N7 · L4, prior-known clock at the episode start · note, unsourced, state in readout.** E1 has no source for how fast long-held prior knowledge decays, and I give no value. Two observations from arithmetic, not evidence. (1) L4 gives a prior-known concept the decay of a trace made at day 0 with `mult` 1: at E1 base k it keeps 0.20 at the H = 7 read. (2) Refreshing it on day 13 then raises its kept share to 0.57, a gain of 0.37, against 0.38 for learning a new concept on day 13 (0.66 × 0.57). So in this world, serving something a learner already knew is worth about as much as teaching something new. Phase A's rule (30 days back at the floor) was the other extreme. Under a power form (B1(a)) the age given to a prior trace sets its decay, so whichever answer B1 gets, §1.2 should say how prior traces age. The readout should report `oracle-order`'s picks split by prior-known vs not (see O1).

**N8 · L1 · note, no departure.** Revisits beyond the first are what review timing needs; it also makes C2 F21 live, as asked.

**N9 · L5, `revisitStopScale`, and the 1-minute / 2-minute costs · note, unsourced.** E1 has no source for the stop hazard after a revisit or for card durations; I give none. A revisit could plausibly be more or less aversive per card than a lesson; the world offers only a low cell (0.5). State in readout that the price of a revisit in stops is a guess in both directions.

**N10 · L6 · note, no departure.** Novelty and hypercorrection are off in the product. `relearn`'s anchors (Metcalfe 2012/2015 are hypercorrection paradigms) already average over confident and unconfident errors, so dropping a separate hypercorrection term does not remove that evidence from the world.

**N11 · `guessRecall` 0.2 · note, state in readout.** world2.mjs and criterion §7 still cite Fazio's not-read baseline. E1 §3 withdrew that basis (it is prior knowledge plus inference on open recall). The basis is the revisit's format: 3 options with a lure taking share `pull` of unknown learners, P(correct | unknown) ≈ (1 − pull)/2 = 0.08 / 0.22 / 0.35. The number 0.2 stands; the citation should change. The floor is not swept; it sets the lucky-guess rate (L3, N5), the miss rate and `oracle-review`'s θ scale. Optional: tie it per lesson to the hidden pull.

**N12 · Forgetting cells and persona spread · note (C2 F8, kept).** From E1, the cell rule gives scale 0.5 / 2.375 (0.04 / 0.19 at the median persona). The persona factor spans 0.71×–1.41× (spread 2), so the fastest persona at the high cell runs at k ≈ 0.27, above E1's high 0.19, and the slowest at the low cell at ≈ 0.028. The between-learner spread (E1 1.5 / 2 / 3) is fixed at 2. It is the second source of review headroom after B3; a reported cell would show its weight.

**N13 · Daily returns, 14 days · note, state in readout.** The learner returns every day. The fixed schedule's waits are therefore met on time, and its 21-day step is reached only by pre-history lessons. Irregular returns, where a per-lesson rule could differ most from a day-count schedule, are not in the world. E1 has no source on return patterns; this is an observation, not a range.

**N14 · Recall-based k on a recognition revisit · note.** Every [F] anchor for k is cued recall; the revisit is 3-option recognition, which usually decays more slowly (E1 §1 format caveat, [R], no number). The world's k is an upper bound for the revisit read and for K. State in readout.

## The two oracles

**O1 · `oracle-order` · note, state in readout.** *Access:* the full hidden state through `learner.oracle.gainIfStudied` (which concepts are known, prior or learned; each one's clock and `mult`; whether prerequisites are known) and the primary read time T₇. It ignores stops, the order of later cards, and slots. *Mechanisms it can exploit in this world:* the prerequisite penalty (0–0.40), skipping or choosing prior-known concepts (N6, N7), and refresh of known concepts. Pull does not enter learning (C2 F10), and novelty and hypercorrection are off (L6). *A NO-HEADROOM reading could show:* in this world, with these mechanisms, a one-step full-knowledge ordering does not move R₇ by 1 point in 4 of 6 personas. *It could not show:* that no ordering helps learners. The world contains no ordering mechanism beyond those listed, and a greedy oracle is a lower bound (criterion §2.3 says so). *A HEADROOM reading could be inflated* by N7: part of it may be refresh of prior knowledge valued as new learning. The readout should split the oracle's gain into new-concept and prior-known picks.

**O2 · `oracle-review` · note, state in readout.** *Access:* each history lesson's hidden recall probability now (known or not, kept, floor). Not k, `mult`, the expected strengthening of a revisit, slot cost, or the read time (θ is tuned on R₇ on separate seeds, so the read time enters through tuning only). It is a threshold rule: every lesson below θ, lowest first, up to 12. Because unknown concepts sit at the floor (0.2) below every θ in the grid, it always serves every unencoded or lost lesson first. That is a sensible use of `relearn`, and the world rewards it heavily (expected kept after a revisit at r = 0.05 is about 0.77 at relearn 0.70). *A NO-HEADROOM reading could show:* threshold rules that know recall exactly do not beat the fixed schedule by 1 point in this world. *It could not show,* until B3 is answered, anything about the headroom E1 and Mettler Exp. 2 attribute to per-item fitting, because the world has no per-item forgetting variation. Under B2 as built, it also inherits L2's weak short-lag strengthening, and under B1 the exponential's overstated loss. *Not judged:* which way B1 and B2 net out for either oracle or the candidate. They push in opposite directions (B1 rewards reviewing more, B2 rewards reviewing later), and only a run can tell.

## §4 placeholder table against E1, row by row

| §4 row | Placeholder | E1 row (fill) | Mark |
|---|---|---|---|
| forgetting rate k | 0.04 / 0.10 / 0.20 | `forgetRate` 0.04 / **0.08** / **0.19** (McGillivray, Fastrich, Fazio [F]); cell scales 0.5 / 2.375 | fill; shape: **B1** |
| persona spread | 2 | 1.5 / 2 / 3 | note N12 (not swept) |
| `revisitStrengthen` S | 0.25 / 0.5 / 0.75 (guess) | 0.35 / 0.50 / 0.60, per correct revisit, plus the lag anchors | **B2**: E1's row is not L2's S |
| `relearn` | 0.25 / 0.5 / 0.75 (guess) | 0.60 / 0.70 / 0.88 | fill; N1 |
| prior mean | 0.05 / 0.20 / 0.50 | 0.05 / 0.20 / **0.45** | fill; N6 |
| prior spread (between learners) | 0.15 | 0.05 / 0.15 / 0.25 | fill base; not swept (N6) |
| learn rate | 0.35 / 0.70 / 0.70 | **pre-boost** 0.35 / 0.60 / 0.80 | **B4** (adds a high cell) |
| prerequisite penalty | 0 / 0.15 / 0.40 | not E1's (B2 unchanged) | no comment |
| pull scale | 0.5 / 1 / 1.5 | not E1's (B2 / C2 F9) | no comment |
| `revisitStopScale` | 0.5 / 1 | none | **unsourced** (N9) |
| slip 0.1 | | none | unsourced (C2 F18, note) |
| guess floor 0.2 | | `guessRecall` 0.08 / 0.22 / 0.35 (format) | N11: citation wrong, value inside |
| stop-before-reveal 0.5 | | none | unsourced (C2 F22, note) |
| prediction feedback 0.10 | | B2 | no comment; see B4 |
| *missing* forgetting shape | — | ratio 0.2 / 0.27 / 1.0, or d 0.25 / 0.27 / 0.65 | **B1** |
| *missing* learner × lesson spread of k | — | SD log k 0.2 / 0.4 / 0.7 | **B3** |
| *missing* lag dependence | — | ≈0.6 at high recall → ≈0.35 near the optimum; shape unsourced | **B2** |
| *missing* k multiplier after a relearned miss | — | = S / 1.0 / 1.0 | code uses 1.0: no departure (N2) |
| *missing* prior between-lesson SD | — | 0.10 / 0.20 / 0.30 | note N6 |

## §7: C2 notes I now judge blocking

| C2 | Criterion 2's choice | F1 |
|---|---|---|
| F7 (read at ~1 day) | Addressed by the final test | The fix moves the read into the range where B1 bites: **blocking via B1** |
| F19 (guess floor) | "kept at 0.2 (Fazio [F])" | note N11: keep the value, change the basis |
| F20, F21 | Addressed: live, swept | `relearn` fine (N1); `revisitStrengthen` **blocking via B2** |
| F23 second bullet (pre-history "predicted right ⇒ known") | note, kept | **blocking as B5**: criterion 2's candidate reads that signal |
| F4, F5, F8, F9, F11, F18, F22 | notes, kept | stay notes. F11 (P(right \| unknown) overstated) now also touches the candidate's `predictedCorrectly` input; it is small next to B5 |
| F16 | Addressed | fine; N6 |
| F17 | moot (ρ inert) | agree |
| L3, L5 (new) | | L3 no departure (N4); L5 unsourced (N9) |

Disagreement 4 (the product's schedule after a miss) is not criterion 2's and is left alone, as the brief says.

## What would close the open rows with evidence rather than choices

- B1, N7, N14: first-revisit and later recall by gap on our own lessons (W-706 aggregates after the privacy read).
- B2: a source giving the lag-dependence shape in usable form; ACT-R spacing (Pavlik & Anderson 2005/2008) is the next place to look ([R], not reached).
- B3: per-item forgetting variance on our lessons once W-706 exists; until then E1's derived upper bound.
- B6, N9, N13: session length, stop after a revisit, and return patterns are product analytics questions (analytics-steward), not learning-science ones.
