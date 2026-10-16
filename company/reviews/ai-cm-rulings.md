# AI & Machine Learning: category manager rulings (cm-ai)

This file records cm-ai's rulings on builder calls, departures and cut sentences in AI lessons. These are scope decisions: which teaching sentence goes, which stage text goes under the text budget, and whether a brief departure stands. A ruling does not change a claim's status (only the fact-checker does that), and it does not rebuild a lesson. A "revise" ruling goes to the lane that owns the slug's builds as a revision item. The newest section goes at the top.

Counting used throughout: `company/decisions/2026-10-16-stage-word-budget-counting.md`. A stage word is a token that contains a letter; numbers count 0; control labels count; text outside the stage does not. Reveal words are counted as `tools/reveal-fit.mjs` counts them (numerals included). The counts below were made in node from the strings in each Demo.tsx (2026-10-16), not from a rendered frame. Evaluators count from the artifact.

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
