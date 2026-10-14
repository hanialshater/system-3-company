# Build note: enemies-allow-three-camps

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 7 (as edited at acceptance)

- Intent: six people A-F on a hexagon, all 15 links drawn: friends thick green solid, enemies thin red dashed (dash carries the meaning without colour). Pairs AB, CD, EF are the three camps of the question. Fixed rule line under the picture: "Banned: two friendly links, one hostile."
- Controls in DOM order: Next triangle (highlights the next of the 20 triangles and names its type), Check all 20, then Camps 2 / 3 / 6 (3 is the question's split, active-disabled at start). Readouts: Checked k/20, Banned, All enemies. Milestones: checked-all, other-split (minInteractions 2). QA path reaches both.
- Show the why: doesNotKnow is "allow all-enemy triangles and any number of camps works". On the stage the camps chips change the number of camps while Banned stays 0 and All enemies goes 0 / 8 / 20; the reveal says why (two friends of yours share your camp, so they are friends) and names the all-enemy triangle as what the strict rule forbids.
- Re-run (own code, node 2026-10-14, then the Demo's own tally()): 3 camps: 20 triangles, 0 banned, 12 one-friendly, 8 all-enemy. 2 camps (3+3): 0 banned, 0 all-enemy, 18 one-friendly, 2 all-friend. 6 camps: 0 banned, 20 all-enemy. 5 people: 52 of 1,024 sign patterns weakly balanced, 16 strongly balanced (matches the brief; not used on the stage or in the reveal, so not claimed).
- Prediction text used verbatim from the edited brief (25 words); I kept "Six people in three pairs" because the stage shows the pairs only after unlocking colour-free (dashes vs solid), and the question must stand alone.
- Brief dependency: "build after enemy-of-my-enemy" (batch 1). That lesson is not on this branch, so learner.knows (the strict rule, at most two camps) is not yet taught in the feed; the reveal restates the strict rule in one claimed sentence (c5).
- Not run: build, typecheck, QA, walkthrough. Draft.

## Revision v3 (wave E r6, 2026-10-14)

r6 (knows balance rule, revise): in three pairs nobody has two friends, so "0 banned" was true for a trivial reason; the "because" (two friends of yours share your camp) never appeared on stage; the hook asked about camps while the question asked about banned triangles; a banned triangle was never seen. Fixes:
- The question's split is now uneven, 3 + 2 + 1 (A B C | D E | F). A, B and C each have two friends, so the rule has something to test. Counts: 0 banned, 13 one friendly pair, 6 all enemies, 1 all friends. Options "0", "6", "13" (6 = the all-enemy count, for a learner who thinks those are banned).
- "Next triangle" starts at A, B, C, and its caption is the because: "B and C are both A's friends, so same camp, so friends. Allowed." Any triangle with two friendly links names the person in the middle.
- New last control "B–D friends" (a chip with a fixed label, aria-pressed). It adds one friend link across camps, and the banned triangles appear in red: 4 in 3 + 3, 3 in 3 + 2 + 1, 0 in six camps. The reveal quotes the first banned count recorded.
- Camp chips run 6 / 3 / 2, so pressing each once from 3 visits all three splits. A line under the readouts records the splits checked with 0 banned ("0 banned in: 3 camps · 6 camps · 2 camps"). The reveal's c6 sentence lists only those; the unguaranteed "and the rest give 0 too" clause is gone.
- checked-all now needs all 20 checked in the question's split (3 + 2 + 1).
- Hook: "The enemy of my enemy need not be my friend. Then which triangles break the rule?" (now matches the question).
- c2, c4, c6 reworded and reopened; c7 added. Not run: build, QA, walkthrough, tsc.

## Pre-flight v3

1. Title and hook: "Can a feud have three sides?" / "The enemy of my enemy need not be my friend. Then which triangles break the rule?" The title asks a yes/no question about camps; it does not give a count. A reviewer may read "three sides" as hinting that three camps are stable, which is near the answer. Flagged rather than changed: the title is the lesson's tension.
2. Options: "0", "6", "13". All bare numbers.
3. Locked stage: the hexagon with green links inside A B C and D E and red dashes across, "Banned: two friendly links, one hostile.", "Make a prediction to start.", and "?" readouts. No triangle is highlighted and no count is shown.
4. Reveal values: 0 banned and 6 all-enemy in 3 + 2 + 1: (b) milestone checked-all (the question's split, all 20); the A, B, C instance: the split's fixed green triangle, always on stage, and the caption of the first Next press; "4 triangles turned banned, such as A, B, D": recorded when B–D is first turned on with banned > 0 (optional, printed only if recorded); "you saw 2, 3 and 6 camps": (a) the recorded seen list, on stage.
5. QA path: Next triangle (A, B, C caption), Check all 20 (checked-all), 6 (other-split), 3, 2, B–D friends (4 banned in 3 + 3). Both milestones reached, the question's own case first. At the reveal the four red triangles, "Banned 4" and the seen line are on stage.
6. Reset: no Reset; the seen list and the banned record never clear. Reveal on the QA path: "Of the 20 triangles in camps of 3 + 2 + 1, 0 are banned and 6 are all enemies, one person from each camp. A banned triangle needs someone with two friends who are enemies. But friends share a camp: in A, B, C, B and C are both A's friends, so they share A's camp and are friends too. When you made B and D friends across camps, 4 triangles turned banned, such as A, B, D. / The all-enemy triangle is what the strict rule (the enemy of my enemy is my friend) forbids, and it is what forces two sides. Allow it, and any number of camps is stable: you saw 2, 3 and 6 camps, each with 0 banned triangles."
