# Learner review r2: one-good-link-beats-many (v2) — adult beginner

Simulated learner. This review finds problems; it is not evidence that anyone learned.

Boundary borrowed: has used search engines; knows a page can have links pointing at it; has never heard of PageRank or damping. Screenshots seen: sheet.png (all 4 frames). The script ran Step then Run and the sheet shows the reveal at round 2 (the Run button first shows round 2 for 1.5 s before jumping to 51; the script reached the reveal in that window). Demo.tsx branches read: reveal adds a round-51 sentence only when the learner reached round 51.

## Section 1: from the artifact only

**Idea the learner lacks:** a link is worth a share of the linking page's own score, so one link from an important page can beat three from unimportant ones.

**Before predicting.** Stem: X has 3 links, Y has 1 link "from page H". Options "X, with 3 links in", "They tie", "Y, with 1 link in". The option wording hands me the contrast, and the title "What is one link worth?" nudges toward the surprising answer. The locked stage shows H with four arrows into it, which a careful learner can read as the answer. I would pick Y as the "trick" answer without understanding it. Mild answer leak through title and the "from page H" phrasing.

**Prediction feel.** I picked X (the learner the script picks) and step 1 rewarded me: X 0.270 vs Y 0.100, "X leads so far. Step again." That is a designed trap and it works as a prediction check, since it makes the next step meaningful.

**Where understanding first broke.**
1. "every page gets a free 1.5%" is unexplained. It is a constant on the stage rule line and a beginner will wonder who gives it and why.
2. Round 2 flips the result. On the stage I can see 0.013 on each arrow into X and 0.374 on H to Y. That is the answer to "why", and it is shown by the numbers. Good.
3. The reveal frame shows round 2 only. "X never moved again" is told: nothing on the frame, and a learner who stops at round 2 has not seen later rounds. This is the same pattern as W-150 (a reveal quoting a state not visited). The conditional round-51 sentence is handled; this one is not.
4. "H, which five pages link to" includes Y, which links to H. A careful learner will count the arrows into H: A, B, C, D and Y. Fine, but one of the five is Y itself, so the story "H is important because other pages vote for it" is partly circular.
5. Arrow labels 0.013 collide with arrow strokes next to P/Q/R in the reveal frame.

**Reveal answered the learner's question?** Yes, in numbers: Y's one link carries 0.374, X's three carry 0.013 each.

**Told vs shown.** The cause (a link passes a share of the linker's score) is shown in the arrow numbers and thickness. The reveal then says it and points at those numbers. Pass. "PageRank" is a told label, fine as context.

**Top finding:** "X never moved again" is a claim about rounds the learner may not have visited; the reveal shows round 2.

**Minor:** unexplained "free 1.5%"; title and option wording lean toward Y.

**Verdict for v2 (before checking earlier findings): revise (small), one sentence plus a note on the free share. Not a hard block.**

## Section 2: after reading the brief, the earlier learner review and build.md

Earlier review (revise) vs v2:
- Undefined "score/settle/ranks": **mostly fixed** ("score: how important it is", "rounds of updating"); "free 1.5%" still unexplained.
- Correct option carried its reason: **fixed** (parallel options, answer now last).
- Round-1 trap leaving X winning: **fixed** (hint "Step again", reveal gated at round 2).
- Reveal beside a round-0 stage after Reset: **fixed** (Reset removed).
- Passing-on never shown: **fixed** by arrow thickness and the numbers 0.085, 0.013 and 0.374.
- Told H's five in-links and that Y links back to H: **not fixed**; Y linking to H is still unexplained noise, and "weighted by how important those linkers are" is still circular.
- Builder says the reveal quotes only displayed rounds. True for round 51 (conditional) but the unconditional "X never moved again" sits outside that rule; the builder's own node check says X is constant from round 2, so the sentence is true, only unseen.

**Verdict for the current version (v2): revise, small** (it is close to launch). Make "X never moved again" conditional on round 51 or drop it, and say what the free 1.5% is. The earlier real problems are gone.
