# Learner review (final): one-good-link-beats-many (adult beginner)

date: 2026-10-14 - reviewer: learner-evaluator (borrowed mind: has used search engines; knows a page can have links pointing at it; no PageRank, no damping) - version: walkthrough at c9e4df0d, phone, option 0 ("X, with 3 links in", wrong). Current reveal text read from Demo.tsx.
Screenshots seen: yes (sheet.png all 4 frames). Hypotheses only.

**Verdict for the current version: launch with notes.**

## 1. Findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** a link passes on a share of the linking page's own score, so one link from a well-linked page can outweigh three from unlinked pages.

- **Answer visible before predicting?** Mildly. The question names "Page Y has 1 link, from page H" and the options give "Y, with 1 link in" as a plain contrast; the locked stage shows H with four arrows into it. A careful learner reads Y's link as special. The trap-answer is the natural first pick and the stem says "After many rounds of updating", a hint that the first numbers lie.
- **What the prediction felt like.** Easy to guess, hard to reason about. I picked X, and step 1 rewarded me (X 0.270 vs Y 0.100, "X leads so far. Step again."), which is the designed trap and it works.
- **Where understanding first broke.** Step 2. I pressed "Run to round 51" and the stage showed round 2, not 51 (X 0.053, Y 0.389). The button label promises many rounds, the first press delivers one more, and the reveal unlocks at that point. So the question I answered ("after many rounds") is settled on the stage only at round 2. The reveal text on this path says "By round 2, Y had 0.389 and X 0.053" and nothing about later rounds; the title of the answer ("Y, with 1 link in") is asserted as the answer to "after many rounds" without the learner having seen the settled state. The code only adds a round-51 sentence if round 51 was reached.
- **Why, on the stage.** Arrow labels into X (0.013 each) and the thick arrow H to Y (0.374) are the cause, shown, and the reveal points at those numbers. Good. The parenthetical "Y links back to it too" is unexplained and makes H's importance partly circular; a beginner may not see why that matters.
- **Free 1.5%.** Now explained on the stage ("every page also gets 1.5% free, links or not"). It does not say why. Fine for a toy.
- **Told vs shown.** The cause is shown (numbers, arrow thickness). "A link passes on a share of the linking page's own score" is a told sentence, but it points at the numbers the learner saw; "PageRank ranks a page by who links to it, weighted by how important those linkers are" is told context and is circular as a definition. Pass under the 2026-10-14 decision.
- **Reveal quotes only reached states.** Rounds 1 and 2 are visited; the round-51 sentence is conditional. Pass.
- **Other branches.** Picking Y (correct) or "They tie" get the same body; "Not quite" header differs. Fine.
- **Phone.** Arrow labels 0.013 sit on top of arrow strokes next to P, Q, R in the reveal frame; readable but cramped. Stage scales cleanly.

**Top remaining finding:** the lesson says "after many rounds" but the default path ends at round 2; the button labelled "Run to round 51" does not run to 51 on its first press, so the settled answer is never on the stage unless the learner presses Run a second time.

## 2. Compared with meta.json (after section 1)

doesNotKnow ("a link counts for as much as the page it comes from") is on the stage as arrow numbers; the objective's "share of the linking page's own score" is told but pointed at the numbers. The misconception (most links wins) is confronted by the round 1 to round 2 flip. The objective's "ends up worth far more" assumes the learner saw the settled state; on the default path they saw round 2.

## 3. Earlier findings (previous review, then build.md)

- "X never moved again" told beyond rounds seen: **fixed** (conditional on round 51).
- Passing-on never shown: **fixed** (arrow numbers).
- Reveal beside a round-0 stage after Reset: **fixed** (Reset removed).
- Correct option carried its reason / positional tell: **fixed** (answer last).
- "Free 1.5%" unexplained: **partly fixed** (named, no reason).
- Y links back to H unexplained: **not fixed**.
- Circular "weighted by importance" definition: **not fixed**.
