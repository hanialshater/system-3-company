# Design note: friends-of-friends-overlap (math:friends-of-friends-overlap)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md` #10 (NCM wave J; cm-math, strand cm-math-discrete) · numbers: `node company/domains/briefs/checks/math-ncm-wave-j-check.mjs` (N10)

## The payoff
Friends who know each other share friends, so most of a friend's friends are people you already have. The learner should see the village light up only 10 new people per step (not 90, not 810) and see why: one friend's 10 links mostly land back on you and your own friends. The "no shared friends" world then shows where 10 × 9 comes from.

## Knowledge boundary (meta.json `learner`)
- knows: everyone has about the same number of friends; multiplying 10 × 9.
- doesNotKnow: that friends of friends are mostly your own friends when friends know each other, so the count two steps out is a small fraction of 10 × 9.

## Misconception
If everyone has 10 friends, about 90 people are two steps away from you.

## Objective
The learner can say that in the ring village only 10 people are two steps away, not 90, because most of a friend's friends are you or your own friends; 10 × 9 holds only when no two friends know each other.

## Prediction
Brief's kit text as a second-person scene, with "two steps" spelled out (copy-style: no hidden condition): "You sit in a ring of 1,000 villagers. Each knows the 5 nearest people on each side: 10 friends. How many people, other than you, are friends of your friends but not your own friends?" Options 90 / 45 / 10 (answer 10), bare numbers.

## Interaction
- One picture at a time (340 × 210 viewBox), switched by the world chips:
  - Village: the stretch of the 1,000-ring around you (35 people drawn, ends fading: texture, nothing tappable), you large at the top of the arc. People are coloured by their breadth-first distance from you (computed over all 1,000), up to the shown step; layer numerals 1, 2, 3 under each side's group, so colour is not the only carrier. From step 2, one friend (3 places right) is ringed and its 10 links drawn as arcs: 7 land on you or your blue friends, 3 on green new people.
  - No shared friends: a tree around you: 10 friends, 90 at step 2, 810 at step 3 (texture). From step 2 the same friend position is ringed with its links: all new.
- Table under the picture (rows step 1, 2, 3, within 3; columns village, no shared): a cell fills once that world has been shown at that step, so it keeps what the reveal quotes; the shown world's cells are bold.
- Chips in brief DOM order: [2 steps] [3 steps] [No shared friends] [Village]; the active step chip and the active world chip are disabled. Start: village, step 1.
- Milestones: `village2` (village at step ≥ 2, the question's case) and `tree3` (tree at step 3). minInteractions 2. QA path hits them on presses 1 and 3.
- In the reveal the picture is pinned to the village at the highest step seen (2 or 3), with the ringed friend; chips disabled.

## Reveal
"In the village, step 2 added only 10 new people[ and step 3 another 10: 31 within 3 steps, counting you]. The ringed friend's 10 links: 7 land on you or your own friends, only 3 are new. / With no shared friends every link is new: 90 at step 2, 810 at step 3. Multiplying 10 × 9 assumes none of your friends know each other. In the village they do, so the count stays small."
The bracket shows only if the village was seen at step 3 (on the QA path). Every number is in the table.

## Told vs shown
The cause (friends of friends are mostly your own friends) is shown by the ringed friend's links landing on blue dots and you; the reveal points at it. The 10 × 9 assumption is shown by the tree world. The closing sentence is told once (claim c4).

## Recall
"In a club everyone has 20 friends, and most of your friends know each other. Roughly how many people are friends of your friends but not your friends?" About 380 (20 × 19) / Far fewer than 20 × 19 / About 400 (20 × 20) (answer: far fewer; claim c4).
