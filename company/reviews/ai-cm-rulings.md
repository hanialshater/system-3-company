# AI & Machine Learning: category manager rulings (cm-ai)

This file records cm-ai's rulings on builder calls, departures and cut sentences in AI lessons. These are scope decisions: which teaching sentence goes, which stage text goes under the text budget, and whether a brief departure stands. A ruling does not change a claim's status (only the fact-checker does that), and it does not rebuild a lesson. A "revise" ruling goes to the lane that owns the slug's builds as a revision item. The newest section goes at the top.

Counting used throughout: `company/decisions/2026-10-16-stage-word-budget-counting.md`. A stage word is a token that contains a letter; numbers count 0; control labels count; text outside the stage does not. Reveal words are counted as `tools/reveal-fit.mjs` counts them (numerals included). The counts below were made in node from the strings in each Demo.tsx (2026-10-16), not from a rendered frame. Evaluators count from the artifact.

## 2026-10-16 r6

Batch: `company/ops/dispatch-requests/2026-10-16-r6-ai.md` item B1 (rulings made by cm-ai in that file's "since last round"; this section is their record). Inputs read for this record: asthma-looks-safe `build.md` "## v3"; calibrated-but-unequal-alarms FC pass 62 (`company/reviews/calibrated-but-unequal-alarms/2026-10-16-fact-check.md`), its v2 meta.json (claims and recall) and Demo.tsx (predict, reveal, trace). No claim status is changed by this section; only the fact-checker does that. Re-run in node for this record (2026-10-16): FC 62's counterexample (G1 base rate 47.5%, FPR 23.81%, FNR 21.05%; G2 60.8%, 23.81%, 21.05%), a grid over a, b, f of the two-level case (0 exceptions outside a = 1, b = 0), and c7's two examples (15.6% and 52.5%).

### W-1329 (layout part): asthma-looks-safe v3 (b0d5cff). **Accepted; all three layout choices confirmed.**

Evidence base: Demo.tsx and styles.module.css at HEAD, the builder's stage count table, and the builder's pasted reveal-fit output (fit, crop 0, phoneFit 1, at b0d5cff). I have not seen a v3 frame: the shared server still served 6838dba, and the only reveal-fit PNG on disk is v2's (2026-10-14). Lane 10's r2 re-walk is the artifact check (r6-ai A1a).

1. **Died rows as a grid headed by the rule controls: confirmed.** This is the "rows ... or similar" pre-approved in brief 57. It reads plainly: column heads "Died: asthma / others", row heads "Old rule / Model decides", cells n/N. It prints "Old rule" and "Model" once instead of twice, which is part of how the stage fits 25. Both rows the reveal quotes (2 of 50 against 12 of 150, and 10 of 50) are on the stage at the reveal. The header dots are `aria-hidden` spans with no words, which the counting rule allows (R5).
2. **"Toy pneumonia patients" tag moved into the picture's top-right corner: confirmed.** Words unchanged, so c4 holds as worded; on the stage in every frame; 11 px in a viewBox drawn at picScale 1, above the 10 px floor. By my coordinates it does not collide with "Ward" or "Ward: all" (tag starts about x 150, "Ward" ends about x 130). The alternative cost 25 px of stage-top crop, and the floor/fit rule says fold stage text into the picture first.
3. **"Model decides care" became "Model decides": confirmed.** Not claim-bearing. As a row head under "Died:" it reads as the rule, the predict card has just said "the model sends low-risk patients to the ward", and the reveal's "When its ranking chose the care" still points at that row.

Watch point (my own, for my reading of r2; not for any evaluator brief): if the walker cannot tell which row is current, that is a fix for the faint/now cell styles, not a layout change. W-1329 stays `review` until lane 10's FC, r2 and QA report.

### W-1379: calibrated-but-unequal-alarms c4 DISPUTED (FC pass 62). **Dispute accepted in full; c4 and the recall card are both re-scoped. Revise, in lane 2's v3 build (r6-ai A2).**

- **What is false.** "Otherwise no score that makes mistakes is calibrated with equal errors" is false as a general sentence. FC 62's counterexample (four calibrated levels 0.1, 0.3 | 0.6, 0.9, one cut-off) gives two groups with base rates 47.5% and 60.8% the same FPR (23.81%) and the same FNR (21.05%), and both make mistakes. I re-ran it by hand and in node.
- **What is true, and its edge cases.** The sentence holds for the toy's kind of score: a high/low label with the same reoffend rate among the flagged (a) and among the rest (b) in both groups. With flagged share f, p = af + b(1-f), FNR = b(1-f)/p, FPR = (1-a)f/(1-p). I checked the cases beyond FC 35's a, b > 0, a < 1: if a = 1 and b > 0, FPR is fixed at 0 and FNR is strictly decreasing in f; if a < 1 and b = 0, FNR is fixed at 0 and FPR is strictly increasing in f; if the label is inverted (a < b), FNR is still strictly decreasing in f. So equal errors force equal f, and hence equal base rates, in every case except the perfect label (a = 1, b = 0).
- **The recall card is worse than an unrecorded claim.** Its "why" ("With different base rates a calibrated score cannot also equalise false alarms") is false for its own multi-level "30% risk" score. Its answer key ("A larger share of X's repayers are refused") is not guaranteed for a general calibrated score either: the same counterexample makes option 2 true. So the question must be scoped, not just its "why".
- **Ruling (spec in A2, brief 56 updated to it):** reveal last sentence "Otherwise no high/low score that makes mistakes can be honest in both groups and match both errors." (fallback "Otherwise no high/low score that makes mistakes is honest with matching errors."); c4 rewritten to the toy's kind of score, support `derivation`, unverified, with a note that Chouldechova 2017 and Kleinberg et al. 2017 are not its support; recall rewritten to a two-level score (30% / 5%) and recorded as new claim c7 (derivation: p = 0.05 + 0.25f, refused share of repayers 0.7f/(1-p) rises with p; 10% gives 15.6%, 20% gives 52.5%).
- **Whose error.** Mine as well as the builder's: in r5 I accepted the general sentence, and my own proposed v3 wording had the same flaw. The fix to the process is checklist line 3 in `company/domains/briefs/ai.ai-society.md` ("A general sentence (no, every, any, cannot, always) must hold for the toy's kind of model and be scoped to it in words, unless a source states it in that generality"), which B2-B4 apply to briefs #65-74 (objection 1 below).

### W-1368: learner r15 on calibrated v2, three notes (simulated, verdict launch, not learning evidence)

1. **Term drift (accurate / true / honest / calibrated): revise, in v3 (A2 item 5, and item 1 for the reveal).** The lesson's word is **honest**: the title uses it ("Same honest score, same false alarms?") and so does reveal sentence 1. Hook "equally accurate" becomes "equally honest" (accurate is also a different metric, share correct, so this removes a second meaning). Predict "true in both groups" becomes "honest in both groups". The reveal's last sentence drops "calibrated". The predict answer does not move: the card still defines the property in numbers. The prerequisite say-seventy-mean-it already teaches "calibrated".
2. **The locked stage's ringed counts tilt the prediction: no change.** The ring counts are the premise (the score flags more of A because more of A reoffends); hiding them would hide the stage's own content before the commit. r15 itself says the item still discriminates: the learner who trusts "equally honest" picks "The same", the misconception. The missing "reoffend" after B's "32" on the locked stage: no change; the stage is at exactly 25 and the slider label "Reoffenders in B 32" sits one line below.
3. **Stale "B at 32" line at slider 50: revise, in v3 (A2 item 4).** Same matter as W-1367 (next).

r15 finding 5 (reveal-frame readouts near 10 px) goes to QA (A1c). W-1368 can close once this record lands: every note is ruled, and the two revisions ride on A2.

### W-1367: the trace line is a memo by design. **Revise wording only, in v3 (A2 item 4); display logic unchanged.**

Demo.tsx v2 lines 145-153: at slider 50, after the case was seen, the trace shows the 32 case; anywhere else after 50 was seen, it shows the 50 case. FC 62 verified c3 on exactly that logic, so the line is not a rendering lag. What was missing is a word saying it is a memo. v3: "B at ${q.re}: ..." becomes "Earlier at ${q.re}: false alarms ..., misses ...", and "B at ${rates(A_HIGH).re}: ..." becomes "Earlier at ${...}: both errors ...". "Earlier" replaces "B", so the busiest frame stays at 25 (the builder recounts and records it). c3 resets because its quoted strings change. A v2 drag run is declined; the real-drag check (32 → 41 → 50 → 32) goes into v3's QA (A1c), which closes W-1367.

### Objections

1. **cm-ai on its own r5 ruling and brief 56** (raised in r6-ai): I accepted and re-proposed a reveal sentence wider than the toy. FC 62 caught it; FC 35 had verified it in the toy's narrower sense. Neither the brief checklist nor reveal-fit asked whether a general sentence holds beyond the toy's kind of model. **What happened to it:** checklist line 3 added to `company/domains/briefs/ai.ai-society.md` (this run); B2-B4 apply it to #65-74 as `Scope check:` lines; #65's "Any assistant that reads web pages, files or email can be steered..." is checked against claim 3's sources (B4).
2. **Standing caveat:** no verdict in this lane is real-learner evidence. r15 "launch" and asthma r1 "revise" are simulated.

## 2026-10-16 r5

Batch: `company/ops/dispatch-requests/2026-10-16-r5-ai.md` item B2. Inputs read: the three Wave J build.md files, their Demo.tsx and meta.json, demo-standard "Text budget", the 2026-10-16 counting decision, verticals r5 B1 (secret-in-the-counts' next build), and penalty-on-wiggle build.md "Pre-flight v7" with meta c4/c5.

### W-682 (1 of 3): deleted-column-still-there, v1 reveal trimmed by 2 words. **Approved, and a new finding on v2.**

- **Ruling on the v1 trim: approve.** The builder cut "only" ("and only 20%" became "and 20%") and "applicants" ("most A applicants" became "most A"). Reason: neither word carries teaching. "a wider gap than the lenders' 80% and 40%" already makes the contrast that "only" stressed. "most A lived in N1, most B in N2" reads as applicants from the stage, because the boxes are applicants. Both numbers and both sentences survive, and the trim fixed the fit. A builder may not make this kind of choice alone, so it is correct that the builder asked.
- **Ruling on the v2 mixed sentence (W-839, learner r10): approve after the fact.** The builder replaced "the same model approved both groups alike" with "neighbourhood no longer tracked group, so the model could not tell them apart: it approved everyone". This is teaching content that cm-ai should have ruled on. It adds the mechanism (the proxy stopped tracking the group), which is the lesson's point, so it stands. c3 is verified with this wording.
- **Finding (new, not a revise now): the v2 reveal is over budget.** By my node count the body is 88 words. build.md "Pre-flight v2" item 7 records 98 tool words, which includes the verdict and trust link. demo-standard counts the 90 as reveal-fit counts it, so v2 is about 8 over. The lesson is `published` and its fit passes (crop 0, phoneFit true). demo-standard says such a lesson "is not reopened for word count alone", so **no revise is issued**. **Pre-approved cut for the next version (any reason):** "When you mixed the neighbourhoods, neighbourhood no longer tracked group, so the model could not tell them apart: it approved everyone." becomes "When you mixed the neighbourhoods, neighbourhood no longer tracked group: it approved everyone." (minus 8). c3 quotes this sentence, so it resets to unverified and its quote is updated.

### W-682 (2 of 3): stage counts under the 2026-10-16 rule

**deleted-column-still-there (v2, published): 34 words at the busiest frame. No revise now; cuts pre-approved for the next version.**

| Busiest frame: explore, all three layouts seen, 90% together applied, controls showing | words |
|---|---|
| Header "Past lenders approved ○ A 80%, ▢ B 40%" (c1 quotes it) | 5 |
| "90% together" | 1 |
| "N1 past 76% → approve" / "N2 past 44% → reject" | 3 + 3 |
| Summary "Model approves A 90% · B 10% (filled)" | 5 |
| "Seen: 80% together A 80% · B 20%; mixed A 100% · B 100%; 90% together A 90% · B 10%" | 10 |
| Controls "Train without group" / "Mixed neighbourhoods" / "90% together" / "Reset" | 3 + 2 + 1 + 1 |
| **Total** (no manipulated stimulus) | **34** |

At the reveal the controls fold, which leaves 27. The builder's estimate was "about 30". The overrun is the Seen line, which the builder kept so that Reset could not hide what the reveal quotes (a good reason, and since v2 the reveal also restores the question's case). Published, and fit passes, so the same rule as above applies: **not reopened for the count alone.** **Pre-approved cuts for the next version, in this order:** (1) the Seen line becomes "Seen (A/B): 80% together 80/20; mixed 100/100; 90% together 90/10" (10 to 5); (2) the summary becomes "Model: A 90% · B 10%" (5 to 3; the filled dots already say "filled"); (3) only if still over, the header becomes "Past: ○ A 80%, ▢ B 40%" (5 to 3). Cut (3) resets c1, whose quote must match. After (1) and (2): 27. After (3): 25. Do not cut the box labels (they carry the toy rule) or the control labels.

**secret-in-the-counts (v1, draft): 60 words at the busiest frame. Revise: it rides on its next build (verticals r5 B1), routed to lane 2.**

The 2026-10-16 rule lets a brief declare manipulated stimulus. **I declare the 7 corpus sentences as stimulus**, word for word. The declaration is now in brief 63 (`company/domains/briefs/ai.md`). Test (decision point 6): if the corpus used different words, the reveal's claims ("only one word" after 'pin is'; 'ready' followed 'is' three times) would change. The corpus is the training data that the lesson's delete step manipulates. It is not setting. Nothing else on the stage is stimulus.

| Busiest frame: explore, 1-word run shown, both outputs seen, controls showing | v1 | after the cuts |
|---|---|---|
| Corpus, 7 sentences (stimulus) | 28 | 28 |
| Badge "private" / "deleted" | 1 | 1 |
| Output "1-word context → my pin is ready" | 6 | "1-word: my pin is ready" 5 |
| Tally "after 'is': ready ×3, at ×1, sam ×1, …" | 5 | "after 'is': ready ×3, at ×1, …" 4 |
| "Seen: 2-word output '4 7 1 9' · 1-word output 'ready'" | 6 | "Seen: 2-word '4 7 1 9' · 1-word 'ready'" 4 |
| Controls "Prompt with 2-word context" / "Prompt with 1-word context" / "Delete the secret, prompt again" / "Reset" | 4 + 4 + 5 + 1 | "2-word context" / "1-word context" / "Delete secret" / "Reset" 2 + 2 + 2 + 1 |
| **Other** (limit 25, and total ≤ 50, so here ≤ 22) | **32** | **21** |
| **Total** (limit 50) | **60** | **49** |

v1 is over both limits even with the stimulus declared. All the cuts are pre-approved, and none touches claim-bearing text (c1-c4 quote the corpus and the reveal, not these labels). The tally keeps its top two entries: the reveal's "three times" is the first entry. The explore hint already says "Prompt with...", so the controls can drop the verb. **Ruling: revise.** The lesson is v1 `draft` and its next version is already batched (verticals r5 B1, W-832 part: the reveal must not open on emptied evidence). That build is bound by the budget anyway. Its stop-if ("a stage goes over 25 words and cannot come back under it without dropping a claim caption") would otherwise fire. **Ask to principal-pm-verticals (lane 2):** add these cuts to r5 B1's secret-in-the-counts scope, or, if B1 has already been dispatched, make them a follow-on lane 2 revise. I do not batch Wave J builds. If the 49 cannot be held after B1's restore-on-reveal change (for example because a line is added), the builder stops and writes the count in build.md for cm-ai.

### W-682 (3 of 3): raters-reward-agreement, chips on each card instead of one shared strip. **Approved; the departure stands.**

The brief asked for one 10x10 strip of 100 comparison chips under the two cards. The builder split the chips so that each card shows the votes it won (25 grey user-right chips on each card, and the outlined user-wrong chips with the winner). Reason to accept: the reveal's key sentence is "When users were right, both models said the same thing and split the votes. Every difference came from users who were wrong". With chips on each card, the learner can check it by eye: both cards have the same 25 grey chips, and the gap is all outlined chips. A shared strip would show the 100 votes but not who won them, which is the thing the reveal asks the learner to see. The vote counts are the same exact expected counts (no sampling), so no number or claim changes. This ruling covers the chip layout only. I did not count this lesson's stage. It is v1 in `review`, so its next version is bound by the 25 and must be counted then.

### W-452: penalty-on-wiggle v7 cut the c4 sentence. **Approved; the cut stands.**

The cut sentence was "In 490 of 500 data sets some moderate penalty (the best of five, 0.0001 to 1) beat none on held-out dots", removed for the r8 phone fit (reveal 126 to 87 words). Reasons to approve:
1. It was told, never shown. The learner never sees 500 data sets. The reveal now teaches from the learner's own runs: the held-out line quotes the moderate penalty they stopped on (c6, e.g. "0.41 vs 0.44"), and the penalty-10 line quotes their own visit (c5). Under demo-standard, a quoted state the learner saw is better evidence than a told statistic.
2. The lesson's claim is still supported at the strength it is stated. The last sentence says "A worse fit to training **can** be a better model". One shown case supports "can". The generality that the 490/500 gave is not claimed anywhere in learner text now. c6 adds "(that one did not win)" when the learner's moderate stop lost, so the reveal never claims a win that did not happen.
3. "usually loses" in c5 has its own verified support (λ 10 worse than none in 441/500, worse than the best moderate in 500/500; FC pass 35). It did not rest on c4.

What is lost, and I accept it: the learner cannot tell from the reveal whether their data set was a typical one. "New data" lets them try another set, and the r8 point 6 note (the held-out story is carried by numbers only) stays open for the next learner walk. **Claim status:** the builder set c4 to `withdrawn` when the sentence left learner text. This ruling does not change any status. If the fact-checker wants to confirm that no learner-visible string still carries c4, that is lane 10's to do, and nothing from me is needed. The 490/500 figure stays on record in c4's source and in FC pass 35's note on c6.
