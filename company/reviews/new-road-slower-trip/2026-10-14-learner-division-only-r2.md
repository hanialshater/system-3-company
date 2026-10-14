# Learner review r2: new-road-slower-trip (v2) — division-only learner

Simulated learner. This review finds problems; it is not evidence that anyone learned.

Boundary borrowed: can divide and add; has never heard of Braess's paradox or equilibrium; believes more road means faster trips. Screenshots seen: sheet.png (all 5 frames) and 05-reveal.png in full. Demo.tsx grep: reveal adds an "At 2,000 it was still faster" sentence only if 2,000 was seen; the reveal quotes the furthest state reached.

## Section 1: from the artifact only

**Idea the learner lacks:** when every driver picks the fastest route for themselves, they can all end up slower than before (a selfish equilibrium).

**Before predicting.** The stem gives all the numbers: 65 minutes today, a free link opens, and options "about 40", "65 unchanged", "75", "80". The title "One free link, two busy routes" and the hook "How long is a trip?" do not give the answer. The options include 40 (my naive guess: 20 + 0 + 20) which is the trap. A learner who computes 20 + 0 + 20 sees the reasoning on the locked stage (20, 0, 20). Nothing gives away 80.

**Prediction feel.** Picking 40 felt like arithmetic, not a guess. Step 1 (After) confirmed it: new route 40 with the faster marker. Step 2 (1,000 switched) 50, still faster. Step 3 Run: 80. The reversal came from my own press of Run, and the busy roads' cars-count labels (4,000, 40, 40) say why. That is a good sequence.

**Where understanding first broke.**
1. The Run button jumps from 1,000 to 4,000 with no intermediate frame. The learner does not see drivers deciding one at a time, only the end state, so "everyone made a sensible choice" is told, though "Switch back 85" in the readout stands for it (nobody gains by leaving).
2. The "Switch back" label is unexplained. At 0 on the new route it reads 65, which for a learner means "what I would get if I returned" but nobody is on the road.
3. The ▲ marker beside "80" has the aria label "faster" (visible in the transcript on all three steps, including 80). At 80 the learner reads ▲ as "went up". At 40 it means faster. The same glyph carries two readings. In the reveal frame 80 ▲ sits beside "Switch back 85": likely meaning "faster than switching back", which is never said.
4. The reveal frame is cropped: node A and the top of the busy road S to A are cut off, while the text says "S to A and B to E". The other end (B to E) is visible.
5. The number 65 (before) is not on the reveal frame; the learner must remember it. "Before" is a button, so the comparison can be tried, but the reveal does not show 65 beside 80.

**Reveal quotes only reached states?** The text quotes 40 against 65 (visited in step 1) and 4,000 (reached). Good. The 2,000 sentence is conditional. Pass.

**Told vs shown.** The cause (two busy roads each carry everyone, so each costs 40, and the link adds 0) is shown by the 4,000 cars labels and the 40 chips. "Every one of them lost 15 minutes" is a subtraction the reveal does for the learner; the 65 is not on the frame. Pass with that gap.

**Did it answer the real question** ("how can a free road make it worse")? Yes in terms of arithmetic; the "why nobody leaves" step is shown by Switch back 85.

**Top finding:** the ▲ marker and "Switch back" label are never explained and ▲ reads two ways; the reveal frame hides 65 and node A.

**Verdict for v2 (before checking earlier findings): launch with minors (marker meaning, 65 beside 80, crop).** The central surprise is earned by the learner's own presses.

## Section 2: after reading the brief, the earlier learner review and build.md

Earlier review (revise) vs v2:
- Title and hook gave away "worse": **fixed** (neutral title and hook, options 40/65/75/80).
- Reveal named the paradox without the why: **fixed** (cars labels on the stage; reveal says both busy roads carry 4,000, each 40, 40 + 0 + 40).
- "Old route 85" read as a route someone is on: **renamed "Switch back"** and the reveal says "switching back would take 85", but the label itself is still not defined on the stage (see finding 2). Partly fixed.
- "Switch 1,000" vague: **fixed** in the explore hint ("onto the new route").
- 65 only in the reveal text: **not fixed**.
- Tiny pills at predict / clipped control row: builder reports fixed; the predict frame shows the whole control row but the graph and pills are small (about 9 px by the builder's own count).
- New from me: the ▲ marker (aria "faster") sits beside 80 as well as 40; it means "faster than switching back", never said. Builder's note does not mention the marker's meaning.

**Verdict for the current version (v2): launch with notes.** Top remaining finding: the ▲ and "Switch back" are unexplained and the 65 comparison is not on the reveal frame. The earlier blockers are fixed. The title/hook now do not give the answer away.
