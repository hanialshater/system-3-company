# Learner review: one-good-link-beats-many (adult beginner)

date: 2026-10-14 · reviewer: learner-evaluator (borrowed mind: knows pages and links, not that a link is worth what its source is worth) · version reviewed: walkthrough 2026-10-14, phone, first-option path (Step, Settle, Reset)
Screenshots seen: yes (sheet.png, all 5 frames). Hypotheses only, not evidence of learning.

**Verdict for this version: revise.**

## 1. Findings from the artifact (written before meta.json and build.md)

- **Where understanding first breaks: the question, before any prediction.** "Which page ranks higher after the scores settle" uses "score", "settle" and "ranks" with no definition. The stage caption "Each page splits 85% of its score among its links; all get 1.5% free" then hands the learner the mechanism (and the answer's key idea) only after they have locked in, in a line that uses an unexplained "free". A beginner cannot tell what the 1.5% is for. The 85% sentence is the whole lesson and it is a footnote.
- **Answer visible before predicting?** The locked stage shows the dense graph; H is drawn larger than its neighbours already, which hints that H matters. Not conclusive from the sheet (round 0 scores are all equal, 0.100), so this is a hypothesis for a human to check. "Y: its one link comes from a page many pages link to" is written into the option itself: the correct option states the reason, the other two do not. A learner can pick it by being the only option that sounds like it has an argument.
- **Misleading intermediate state.** After Step 1 the readout says X 0.270 vs Y 0.100: the learner's "X: three links" is confirmed. The flip comes at round 2 or on Settle. The hint says "press Step twice", but minInteractions is 1, and in the artifact a single Settle (round 51) enabled "Show me why". A learner who presses Step once and stops has watched their wrong answer win.
- **Reveal vs the stage.** The reveal text quotes round 51 (Y 0.374, X 0.053) but the stage in the reveal frame shows round 0 (0.100 / 0.100) because the script pressed Reset. A real learner can do this too. The reveal sentence is about states the learner reached, which is right; the picture beside it contradicts it.
- **Told vs shown.** Told: "X's three links come from pages nobody links to"; "H, which five pages link to". The learner is never asked to find P, Q, R as unlinked or count H's in-links. Y also links back to H (two arrows), which a beginner will read as noise or as Y linking to something important. Why Y's link out matters is not explained.
- **Reveal jargon.** "PageRank" arrives in the last paragraph as a name, fine, but "weighted by how important those linkers are" is circular for someone who has not seen the iteration.
- Positional tell: the correct answer is again the middle option (index 1), in all five lessons in this batch.

## 2. Compared with meta.json (read after section 1)

Brief: the learner does not know that a link counts as much as the page it comes from. The artifact shows the numbers flip but never visibly shows the passing-on: nothing animates a share moving from H to Y. The objective sentence "a link passes on a share of the linking page's own score" is told in the reveal, and the stage evidence (two numbers) fits it but does not isolate it. Claim for human test: a learner could end with "Y wins because Y is linked from the big one H" (the intended idea) or "Y wins because the numbers say so".

## 3. After build.md (read only after sections 1 and 2)

build.md confirms the QA/walkthrough path is Step, Settle, Reset and that the reveal then quotes round 51 beside a round-0 stage; the builder treats it as a path detail, I treat it as a real learner state (Reset is a live button). It also confirms minInteractions gate allows Settle alone, so the round-1 "X leads" moment can be the only step seen. Builder removed the "remove the 4 pages that link to H" step, which would have been the isolating test of the idea; its absence is why the passing-on is not shown. Verdict stands: revise.

Cross-lesson note (all five): `answer: 1` in every Demo.tsx in this batch, so the correct option is always the middle one. Route to demo-builder / category managers to vary it; a learner who notices the pattern can pass the predict step without the idea.
