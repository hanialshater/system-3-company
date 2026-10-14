*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): turns-beat-first-come-first
lesson version: v1
boundary: knows that the order of jobs changes the average wait (shortest-job-first-wait); does not know that time slices help short jobs when lengths are unknown; suspects fairness costs average wait. (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/turns-beat-first-come-first/sheet.png)
Verdict: launch

## 1. From the artifact
- Predict: the hook is neutral and real ("Does giving everyone a turn make the average wait longer?"). "7, the same" is a genuine pull. The locked stage shows two empty timelines and a "First come ? · turns of 5: ? · 2: ? · 1: ?" strip. Nothing leaks.
- Explore: "Run to the end" fills both timelines on one shared 0–12 axis. First come: AAAAAAAAAA B C, with finish badges 0/10/11 → average 7. Turns of 1: A B C A…A, with B and C done at 2 and 3 and A done at 12 → waits 2 · 1 · 2, average 1.67. The picture is the argument: the two short blocks jump from the far right to the far left, and A's end moves by only 2. Turn length 5 / 2 / 1 fill the strip with 4.33 / 2.33 / 1.67, so "longer turns drift back toward 7" is seen, not told.
- Reveal: it quotes only what was on stage (B at 2, C at 3, A 2 later, 2.33, 4.33) and ends on the idea. "Real systems pay a little for each switch" is claimed context, one sentence.
- Minor: "without knowing anyone's length" is the brief's key contrast with shortest-job-first, but on stage the job lengths are printed on the caption. A learner can see the turns row just cycles A, B, C without looking at lengths. A tiny label on the turns row ("doesn't look at lengths") would make the contrast explicit. It is not a blocker, because the rule visibly ignores length.
- Minor: on the phone frame the wait badges and the "Waits: 2 · 1 · 2 · average 1.67" lines are very small, and the hatched/dotted B and C blocks are hard to tell apart at that size.
- Minor: the stem is ~50 words and does the first-come arithmetic for me. Trimming it would sharpen the commit.
- Minor: trust link reads 0/6 claims checked (fact-checker lane).
- No FATAL.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
Objective: 7 → 1.67 (shown), "longer turns drift back toward 7" (shown by the 5/2/1 sweep), "short jobs finish early" (shown by B and C moving). doesNotKnow "time slices help short jobs when job lengths are unknown": the help is shown, and "unknown" stands on stage only in that the turns rule visibly cycles regardless of length (see minor). Show-the-why is met.
