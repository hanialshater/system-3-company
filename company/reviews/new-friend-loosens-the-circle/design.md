# Design note: new-friend-loosens-the-circle (math:clustering-coefficient)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md` #11 (NCM J2, accepted by cm-math-discrete) · numbers: node check J2 in `company/courses/ncm/briefs.md`

## The payoff
Clustering is a share: linked pairs of friends over all pairs of friends. A new friend adds a pair with every old friend to the bottom, but only one linked pair to the top for each old friend she knows. So a newcomer who knows one of Ana's 4 friends lowers Ana's clustering (0.5 → 0.4), and must know half of them just to hold it. The learner should count the pairs on the picture: every pair of Ana's friends is drawn, solid if they are friends, dashed if not.

## Knowledge boundary (meta.json `learner`)
- knows: friend pairs; counting pairs (handshake-counting).
- doesNotKnow: that clustering is the share of a person's friend pairs who are friends, and that a new friend adds new pairs to the bottom of that share.

## Misconception
A new friend who knows some of your friends makes your circle tighter.

## Objective
The learner can say that when Fay, knowing 1 of Ana's 4 friends, joins, Ana's clustering falls from 0.5 to 0.4, because Fay adds 4 pairs to the bottom and 1 to the top, and that she must know 2 of the 4 just to keep 0.5.

## Prediction
The brief's kit text as a second-person scene, with the term defined in words before it is used (copy-style: no jargon the learner lacks): "In your class, Ana has 4 friends. Of the 6 pairs among them, 3 are friends with each other: a share of 0.5, called Ana's clustering. She makes a new friend, Fay, who knows one of the 4. Ana's clustering is now…" (40 words). Options "Higher than 0.5" / "Still 0.5" / "Lower than 0.5" (answer C), worded alike.

## Interaction
- One picture (viewBox 340 × 210): Ana (filled) low in the centre, B, C, D, E on an arc above her, Fay at the arc's right end when present. Ana's friendships are grey spokes. Every pair of Ana's friends is drawn: a thick line in the domain colour if the two are friends (B–C, C–D, D–E), a faint dashed line if not; Fay's links are green. Readout at the top: "linked pairs 3 of 6 = 0.5", computed from the drawn pairs.
- Controls (DOM order, brief): "Fay knows 1" (Fay knows E: 4 of 10 = 0.4), "Fay knows 2" (D, E: 5 of 10 = 0.5), "Fay knows 3" (C, D, E: 6 of 10 = 0.6), "No Fay" (back to 3 of 6 = 0.5; it is the start state, so it starts active and disabled). No Reset: "No Fay" is the reset.
- Fay knows her arc neighbours first (E, then D, then C), so her links stay short and readable.
- Trace: each tried chip keeps "✓ 0.4", "✓ 0.5", "✓ 0.6", so "No Fay" cannot erase what the reveal quotes.
- Milestones: `knows1` (0.4, the question's case), `knows2` (0.5, break-even). minInteractions 2. QA path: chips 1 to 4.

## Reveal (brief draft, extended to point at the stage)
"Fay made 4 new pairs, her with each of Ana's old friends, so Ana's pairs went from 6 to 10. Knowing 1 of them gave 4 linked pairs of 10: 0.4, lower than before. | She had to know 2 of the 4, half of them, just to hold 0.5[; knowing 3 lifted it to 0.6]. Clustering is linked pairs over all pairs: Fay added 4 pairs to the bottom but only one to the top for each friend she knew."
The bracketed clause appears only if the learner pressed "Fay knows 3" (on the QA path).

## Told vs shown
The cause (new pairs go to the bottom of the share) is shown: Fay brings 4 new dashed or solid lines, and the readout's "of 6" becomes "of 10". The definition is told once, in the question and in the reveal (claim c3).

## Recall
"Raj has 4 friends, and 3 of their 6 pairs know each other. A new friend joins who knows none of the 4. What happens to the share of Raj's friend pairs who are friends?" It goes up / It stays the same / It goes down (answer: down, 3 of 6 → 3 of 10; claim c2).
