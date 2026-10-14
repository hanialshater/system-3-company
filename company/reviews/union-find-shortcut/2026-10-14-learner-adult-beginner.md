*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: union-find-shortcut
lesson version: v1
boundary: an adult beginner who understands "groups with a leader" from clubs or teams; has no idea of trees or union-find.
Screenshots seen: yes (sheet.png, 13 frames, phone viewport)

## 1. From the artifact

- Prediction: "8 people merge ... always hanging the smaller group under the bigger group's leader. Worst case, how many hops?" 7 / 3 / 1. I chose 7 (a chain). A real guess.
- Leak: the locked stage already shows the tree area with row labels "leader, 1 hop, 2 hops, 3 hops" and nothing below. The picture has room for exactly 3 hops. A beginner who glances at the right edge can read the answer off the empty canvas. Faint grey, but on screen.
- Explore: tapping two people merges them and draws B under A: clear. Pairing A-B, C-D, E-F, G-H by hand only gives 1-hop trees, and nothing invites me to merge pairs into pairs to try for a tall tree, which is what the panel asks ("try to build the tallest tree you can"). Merging a pair with a pair needs me to know to tap a leader, which is not said.
- "Merge the rest, tallest way" then does it for me: 3 hops (A at the bottom). Then "tallest you built 3". I did not build it; the button did. The reveal says "Your tallest tree had 3 hops", crediting me with a tree I never made. Close to the "reveal quotes what the learner never did" pattern.
- "1,000 random orders: the worst tree was 3 hops tall" is a good check, though random trials cannot show "nobody gets past 3"; the doubling argument in the reveal does that, told.
- Grammar: "Tallest: 1 hops."
- Phone: reveal text fully visible; on the reveal frame the leader node at the top of the tree is scrolled off. Badge 70S.
- Where understanding first broke: trying to build a tall tree by hand; I could not see how to merge groups.
- Reveal earned: the 3 yes (seen in the button result and 1,000 runs); the doubling reason told.

Fixes (owner: builder):
1. Do not draw the "3 hops" row (or any row labels) before the prediction; grow rows as trees grow.
2. After the first merge, say "tap two leaders to merge their groups" so a learner can attempt a tall tree.
3. Count "tallest you built" only for hand merges, and word the reveal from what the learner did ("The tallest-way merge reached 3 hops").
4. "1 hop" singular.

## 2. After reading the brief

- Objective: 3 hops for 8 people because one gets a hop further only when the group at least doubles. The 3 is shown; the "because" is told. The recall (1,024 → 10) depends on the doubling reason, the told part.
- Misconception ("trace through everyone") is not directly confronted: the stage never shows the cost of answering "are A and H connected?" (the hook's question).
- 3 claims verified by others; I cannot vouch for them.

Verdict: revise
