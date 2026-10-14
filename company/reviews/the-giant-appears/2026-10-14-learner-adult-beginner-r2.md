# Learner review r2: the-giant-appears (first learner review)

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round 1 for this lesson
borrowed mind: adult who can read percentages, has never thought about networks or random graphs
method: transcript.md, sheet.png, 04-step-3.png; Demo.tsx reveal branch read. Simulated learner, not evidence of learning.
screenshots seen: yes

## Part 1: findings from the artifact, before meta.json / build.md

**Idea the learner lacks:** in a random network, the biggest connected group does not grow in proportion to links; near one link per person it jumps from small to most of the crowd.

**Answer visible before predicting.** Moderate. The hook "Does the biggest group double too?" is a leading question: the answer is no, which removes "about 36%" (the doubling option) as soon as the learner reads it. Remaining 55 vs 75 has no tell, and the learner has no basis, which is honest. The wrong guess I made (36%) was the exact naive guess, so the lesson sets a good trap.

**Locked stage.** Shows the real 1.0 network with 36 filled dots, and the "1.0" chip. Good: the baseline is on the stage before predicting.

**Where understanding first broke.** Step 1 (0.5): 9 of 200. Step 2 (1.0): 36. Step 3 (1.5): 110 (55%). The jump is in the numbers and the dots. But the picture at 1.5 and beyond is a hairball (04-step-3.png): 300 lines across a wide rectangle, nodes in rows, edges mostly long horizontals. The learner cannot see "a group" at all; filled dots are scattered across the whole picture, so "connected" must be taken on trust from the counter. The 1.0 picture also scatters the filled dots; you cannot trace the chain. At 3.0 the picture is almost fully filled and the hairball hides everything.

**Told vs shown.** The reveal's cause: "Early on a new link joins two small groups. Once groups are big, a new link between any two of them merges both, so one giant group swallows most of the crowd." Nothing on stage moves: you press 0.5, 1.0, ... and the whole picture is redrawn (empty area above the graph, graph centred lower in the stage). You never watch a link join two groups, nor see the groups' sizes (only the biggest is coloured). It is a told sentence; the picture stands for the result, not the merging. Also "the jump comes near one friend each" is told, and the five steps (0.5, 1, 1.5, 2, 3) skip the region 1.0 to 1.5 where the jump actually is; the learner cannot see that it is a sudden transition rather than steady growth (5, 18, 55, 74, 92 looks like a smooth S).

**Is the doubling surprise lived?** Yes: 36 → 148 on the stage, and the reveal says "100 more links" gives 18 → 74%. Good.

**Reveal quotes reached states?** It lists every count "you saw", built from the `seen` record; with the scripted run all five were visited. A learner who skips 3.0 would get a shorter list, presumably.

**Smaller:** "seed 1" is jargon; the stage grows a large empty band; "friends each" vs "random friendships" (100 friendships = 1.0 friend each) is a unit shift the learner must do alone: 100 links among 200 people is 1 each only because each link gives two people a friend.

## Part 2 follows below.

# Part 2: after meta.json and build.md (no earlier learner review exists)

meta: knows people can be linked and "connected means a chain of links"; doesNotKnow "random links make one huge group appear suddenly, not gradually". Objective asks the learner to **explain** that "past about one friend each, small groups join into one giant group". The cause (groups merging) is therefore in the objective's explain verb.

Build note: chips add links to one seeded sequence, "links are only ever added, never redrawn", dot positions fixed; the learner reads the readout, not the drawing ("no names, no taps, edges 1 px"). So the builder chose the readout as the carrier and the picture as texture. My finding that the hairball is unreadable is therefore a known property; I stand by it: the learner can see the numbers jump, but nothing stands on stage for a link joining two groups.

## Findings checked against intent
- Initial state at 1.0 matches the question: **works** (baseline on stage before predicting).
- Reveal lists pressed chips: **works.**
- Told vs shown: **fails the 2026-10-14 decision.** The cause in the objective ("small groups join into one giant group") is one told sentence; the picture shows end states only. The stage could stand for it by colouring the second-largest group or by marking the links added between 1.0 and 1.5 that merged groups. It must stay on the one picture.
- "Suddenly, not gradually" (doesNotKnow): the five steps 0.5/1/1.5/2/3 give 5, 18, 55, 74, 92%, which reads as a smooth S. The jump region 1.0 to 1.5 is not subdivided; "the jump comes near one friend each" is told.
- Hook "Does the biggest group double too?" leaks that the answer is not "doubles", removing option 1.

## Verdict for the current version: **revise**
Screenshots seen. The prediction trap and the numbers work; the lesson shows that the giant appears but not why, and the brief's "explain" verb is not supported. Not a fatal flaw.
Top remaining finding: nothing on the stage stands for groups merging, so the reveal's causal sentence is told only; add a stand-in on the existing picture (for example, the second-largest group in another tint at 1.0 and the links that join them at 1.5), and a finer step near 1.0 to 1.5.
Next move: demo-builder after learning-designer ruling on the stand-in.
