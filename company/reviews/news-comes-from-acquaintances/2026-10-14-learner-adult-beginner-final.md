# Learner review (final): news-comes-from-acquaintances (adult beginner)

date: 2026-10-14 - reviewer: learner-evaluator (borrowed mind: knows people have friends and what a tie between people is; has heard "weak ties are good for jobs" as a slogan, not the rule) - version: walkthrough regenerated at c9e4df0d, phone, option 0 ("an acquaintance", the correct answer).
Screenshots seen: yes (sheet.png, all 6 frames). Simulated learner: criticisms and hypotheses, not evidence that anyone learned.

**Verdict for the current version: launch with notes.**

## 1. Findings from the artifact (before meta.json, earlier reviews, build.md)

**Idea the learner lacks:** if A is close to B and to C, the rule forces a B-C tie, so a close A-B would need ties that do not exist.

- **Answer visible before predicting?** Partly. Title "The one tie between two groups" and hook "News from another friend group has one way in. What kind of tie is it?" make "acquaintance" the slogan answer for anyone who has heard "weak ties". The stem does give the rule, so the answer is derivable, but a slogan-knower can pick option 0 with no derivation, and the middle option "either could be" reads as the hedge. The locked stage is clean ("Predict first.") and leaks nothing.
- **What the prediction felt like.** Like a logic puzzle in prose, but fair: "Every tie is close or an acquaintance" now names both kinds, and "have a tie" (any tie) is no longer ambiguous the way "linked" was.
- **Where understanding first broke.** Not in the explore. The first check (C-E) shows a green tick and a red cross at once: "C-E tie ok, but no B-C tie x". A beginner has to work out that the red x is on the missing B-C line and that it comes from A-B being close, not from the check they tapped. The caption says it, the picture (dotted red line, red x between C and B) supports it. Adequate, a little busy.
- **Told vs shown.** Shown: the break for C (one red x, step 1) and the repair when A-B becomes an acquaintance; news crossing. Told: "The same break hits D and E, and on B's side F, G and H". One example is on stage, five are claimed. This is a generalisation, not the brief's gap (the gap is the single C case), so I read it as acceptable under the 2026-10-14 told-vs-shown decision.
- **Did the reveal answer the learner's question?** The hook's question ("what kind of tie") yes. The title/hook nudges toward "acquaintances bring news", but the reveal's last paragraph only says outside news comes in over that tie. That is true by construction (it is the only link between the groups) and the lesson no longer claims acquaintances carry more. A learner who arrives with the slogan "weak ties bring news" may still leave believing the stage showed why; it showed only that the bridge cannot be close in this model. Mild.
- **Reveal quotes only reached states.** Yes: "the triangles you checked held" is conditional on having checked; the broken close state is forced (A-B starts close after the prediction, step 1 frame shows it).
- **Other reveal branches (Demo.tsx).** Same body text for every pick; header differs. A learner who picked "close" is told the rule broke when A-B was close, which they saw; "either could be" is answered by "must be". No branch quotes an unvisited state.
- **Phone.** Frame quality fine. Stage in the reveal is shrunk (known kit issue, noted only). Caption at step 3 wraps to two lines; the Send news button shifts down by one line between steps (frames 3 to 5). Cosmetic.

**Top remaining finding:** the title/hook let a slogan-knower pick the answer with no derivation, and the reveal's "comes in over that tie" is trivially true in a graph with one bridge, so the news half of the story is told, not earned.

## 2. Compared with meta.json (after section 1)

The brief's doesNotKnow (a close A-B forces a missing B-C) is on the stage in step 1, and the objective's "news from outside crosses it" is in the reveal as a one-sentence consequence. The misconception ("closer tie brings more") is never confronted on the stage; the lesson avoids claiming the opposite, which is honest but means the misconception is only sidestepped.

## 3. Earlier findings (previous review, then build.md)

- Ambiguous "linked": **fixed** ("have a tie", both kinds named).
- Hook overpromised acquaintances bring more news: **fixed** (hook now "one way in").
- Broken state never photographed / learner starting in the right state never sees a break: **fixed**; A-B starts close, step 1 shows the break to every path (seen in 02-step-1.png).
- Told general rule ("could only be close if no other close friends"): **partly fixed**; reworded to "while A or B has a close friend in their own group", still told beyond C.
- News trivial by construction: **not fixed**, now stated modestly.
