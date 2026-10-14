# Learner review r2: agenda-picks-the-winner (v2) — no voting theory

Simulated learner. This review finds problems; it is not evidence that anyone learned.

Boundary borrowed: knows what a ranking and a majority are; assumes a fair procedure on the same ballots gives the same winner; has never heard of a Condorcet cycle. Screenshots seen: sheet.png (all 5 frames). Demo.tsx not needed for branches: only the three agenda buttons exist, and the reveal is fixed text (it names all three agendas, and the milestone counter "pairs seen" gates the reveal at 3).

## Section 1: from the artifact only

**Idea the learner lacks:** with a cycle of preferences, the voting order, not the voters, decides the winner.

**Before predicting.** Stem: three voters rank A, B, C; first vote A against B, winner faces C. The ballots are on the stage. Options A / B / C. The title "Who sets the order wins" and hook "Same three voters, same rankings. Change only the order of the votes." give the thesis (order matters) but not the answer for this order. The answer for this order needs two pairwise counts; most learners guess. A is the natural guess ("A first, A beats B") and is wrong: C wins.

**Prediction feel.** A real guess, but there is a way to reason it: 2-1 in each pair. The ballots are visible so a motivated learner can count.

**Where understanding first broke.**
1. The step-1 screen shows A beats B 2-1 and then C beats A 2-1, winner C. The learner may ask who voted for what in each pair. The stage shows ballots and a result line, but nothing marks which two voters made each 2-1. The triangle arrows show who beats whom, not why.
2. The triangle fills in a pair at a time ("2 of 3 pairs seen"). Good: after three agendas all three arrows are visible, and the cycle is on the stage.
3. In the reveal frame the headline says "Not quite: it was C" while the stage beside it shows "Winner: B" (the last agenda tried, A vs C then B). The text says "elects C; elects A; elects B" and the stage shows only the last. A learner sees a screen that appears to contradict the headline. The top of the stage is cropped too (the numbered ballots are cut).
4. The last sentence of the reveal ("when every voter backs the option they rank higher") is awkward; a beginner will not know it is a condition about honest voting.
5. The trust sheet reads "0/4 claims checked", which a curious learner sees under the card.

**Reveal answered the learner's question?** The first question ("why not A?") is answered by the three runs. The reveal adds the cycle sentence "A beats B, B beats C, C beats A", which the triangle shows.

**Reveal quotes only reached states?** The explore gate asks for all three agendas, so the text is backed. Pass.

**Told vs shown.** The cause (each option beats one rival and loses to another) is shown in the triangle that fills in. "The option held back to the last vote won every time" is shown by the three runs. Pass.

**Top finding:** the reveal frame shows "Winner: B" next to a headline that says "it was C" (stage not pinned to the predicted agenda), with the ballots cropped.

**Verdict for v2 (before checking earlier findings): launch with minors** (pin the reveal stage to the predicted agenda, tidy the last sentence).

## Section 2: after reading the brief, the earlier learner review and build.md

Note on version: this lesson is still version 1 in meta.json, and the transcript timestamp (08:42Z) is the same as the first review's, so this is a second reading of the same version, not a revision. I did not find a v2 build entry in build.md; the earlier findings 6 and 7 are therefore expected to remain, and they do.

Earlier review (launch) vs now:
- Finding 6 (voters consistent but the group loops, never said): **open.** The reveal says "each option beats one rival and loses to another" but not that each voter's ranking is consistent.
- Finding 7 (strong generalisation, condition as afterthought): **open**, and awkward for a beginner ("when every voter backs the option they rank higher").
- Finding 8 ("B vs A: A 2-1" ordering): **open.** Finding 9 (stage clipped at top in the reveal): **open**.
- New from me: the reveal frame shows "Winner: B" under "Not quite: it was C" because the stage keeps the last agenda tried. Builder's note says the stage and text agree "by computation", but nothing pins the reveal stage to the predicted agenda. The brief's objective is met by the three runs; this is a presentation gap.
- Builder's note says the triangle fills progressively, which is what I saw; it is the strongest part. Trust sheet "0/4 claims checked" means no claim is verified yet (fact-check record is separate; I did not read it).

**Verdict for the current version (v1): launch with notes.** Top remaining finding: the reveal headline says C while the stage beside it says Winner: B; pin the stage to the predicted agenda or say "your agenda" on the stage.
