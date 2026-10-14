# Learner review: two-said-blue (adult beginner)

date: 2026-10-14 · reviewer: learner-evaluator (borrowed mind: knows a 2-in-3 clue beats a coin and that more independent clues help; does not know that copying isn't independent) · version reviewed: walkthrough 2026-10-14, phone, first-option path
Screenshots seen: yes (sheet.png, all 9 frames). Hypotheses only.

**Verdict for this version: revise.**

## 1. Findings from the artifact (written before meta.json and build.md)

- **Where understanding first breaks: the prediction itself.** The question says people "see everyone's earlier picks, and choose a colour" but not how they decide. The rule (copy a lead of 2, else follow your own clue) appears only on the stage, which is greyed "Make a prediction to start" while locked. So the learner predicts about a process whose key mechanism is withheld. The options ("almost never / 1 in 5 / half") then reduce to a guess about vibes; a learner who reasons "each clue is 2/3 right, 100 of them, so almost never" is reasoning correctly about independent clues and is not given the one fact that makes it wrong.
- **Answer visible before predicting?** No. But the correct option is not distinguishable either, apart from being the middle option again (index 1, all five lessons).
- **Explore.** Steps 1 to 3 (60%, 80%, 2 in 3) change a readout and nothing else: the stage stays an empty grey grid until a run. Three taps spent on chips that have no visible effect. Run 1 shows a single crowd that is all blue and right: it confirms "almost never". Run 100 gives 18 wrong (17.8%), Run 10,000 gives 2,009 (19.9%), and the pooled count is 2. The 17.8 to 19.9 contrast with the learner's number is strong and does the job; the pooled "2 (0.02%)" is the surprise and it is shown.
- **Unexplained terms.** "Runs (seeds 1 to n)", "Pool the clues", "lock onto". "Seeds" is jargon in a readout label and again in the reveal ("seeds 1 to 10,101"); 10,101 is the sum of three presses and means nothing to the learner. "Pooled wrong" is encountered before the learner knows what pooling means.
- **Reveal does not close its own loop.** It says "If the first two clues are both wrong (1 in 9), that start sticks." That explains 11%, but the learner just watched 19.9%. Where does the other ~9% come from? Unanswered question the learner will actually have. The headline contrast (crowd 19.9% vs pooled 0.02%) is only implied, in a trailing sentence.
- **Told vs shown.** The cascade moment is shown: stage legend has a "lead of 2 first seen" marker, and the all-red crowd frame (step 6) shows a wrong lock. "One clue can no longer change the next pick" is told; it follows from the rule only if the learner remembers the rule from the stage text.
- **Reveal quotes states reached.** Yes: uses the accuracy with the most runs (here 2 in 3, 10,101 crowds). If a learner ran 10,000 only at 80%, the reveal would quote 80% numbers under a question about 2 in 3; the copy handles it with "clue right 80%" but the exact figure would differ from the question. A human-test case, not seen here.

## 2. Compared with meta.json (read after section 1)

Brief: the learner does not know a copied pick is not independent and that the crowd stops adding information after two matching picks. The "not independent" idea is never said in plain words; "adds no new information" is the nearest. The objective's "wrong about 1 time in 5,000" for the plain vote is shown as 2 in 10,101 but is not phrased that way anywhere the learner sees. Suggest the rule be in the question, since the lesson's whole point is that the rule makes the crowd correlated.

## 3. After build.md (read only after sections 1 and 2)

build.md confirms the "Clues right" readout was added only so chips change something observable before a run, which matches my finding that they are otherwise dead taps. It notes the stage already exceeds the word limit (30 vs 25) and the rule line is a trim candidate: the opposite of my recommendation to move the rule into the question, which needs a design decision. The builder's numbers (exact 1/5; 3 ties not counted in pooled) do not resolve the 1 in 9 vs 19.9% gap in the reveal. Verdict stands: revise.
