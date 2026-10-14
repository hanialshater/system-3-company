# Learner review r2: bid-what-its-worth (revised version)

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round 2
borrowed mind: someone who knows what an auction is, assumes you pay what you bid, never met "the winner pays the runner-up"
method: transcript.md, sheet.png, 01-predict.png seen; Demo.tsx reveal branch read. Simulated learner: a source of criticisms, not evidence of learning.
screenshots seen: yes (sheet.png, 01-predict.png)

## Part 1: findings written from the artifact, before meta.json / earlier review / build.md

**Idea the learner lacks:** that in this format your bid only decides whether you win, and the price is someone else's bid, so shading your bid gains nothing.

**Answer visible before predicting.** Title "What should you bid for a $70 painting?" plus option "$70" is a strong tell: an adult guesses "bid what it is worth" by common sense (and also "bid below to profit"). The hook says "winner pays runner-up's bid" so the rule is given. Not a hard giveaway, but the correct option is the one number equal to the title's number. Mild.

**Locked stage.** At predict the stage is a tiny faint chart with "?" marks and the label "Pick a rival bid" overprinting "$50" and "$70" (01-predict.png). It looks broken, not inviting. The slider "Your bid $30" sits there while the learner is about to choose among $50/$90/$70: two different "your bid" notions at once (slider vs prediction).

**Where understanding first broke.** Step 1, Rival $40: bars show $30 loses; $50, $70, $90 all win and all +$30. The learner who said $50 sees "$50 does as well as $70" and feels vindicated. That is correct and a good moment. Step 2 (rival $60) shows $50 loses, $70 +$10: this is the real surprise and it works. Step 3 (rival $75) shows $90 -$5 in a red bar: works. Step 4 (rival $90) shows everything $0 with "$90 loses, pays $0": the tie rule appears here only as an unexplained fact; the chip says "Ties go to the rival" but a learner reading bars does not connect them.

**Told vs shown.** "Whatever the others bid" is the claim. The stage shows four rival bids by taps, and a lower line chart "Profit against every rival bid, $0 to $120" that is the only picture of "whatever". It has no axis labels, the dashed vs solid key is 8 px text, and it reads only if the learner moves the slider. The explore gate (two milestones: rival $60 and rival $75) is satisfied by taps alone, so a learner can reach the reveal without ever looking at the lower chart or moving the slider. In the script run the slider was moved to $40 only, which shows nothing new (all four bars $0 at rival $90). The reveal's causal sentence, "your bid only decides whether you win; the price is the rival's bid", is told; what stands for it is bars labelled "pays $40/$40/$40" in step 1 (three different bids all paying $40). That is a decent shown stand-in: the "pays" line is constant across bids. But the reveal does not point at it.

**Reveal quotes reached states?** $60 and $75 are the gated milestones, so yes. In the reveal frame the stage is scrolled so the bars are cut off at the top; the learner reads "$50 lost... $70 kept $10" without the bars in view (07-reveal). Minor.

**Wrong-branch reveal:** reveal text is one block regardless of choice ("Not quite: it was $70"). A learner who picked $90 or who picked $50 gets the same explanation; both are addressed by the two quoted rivals. Fine.

**Other confusions.** The learner picked $50 and the stage never shows $50 as "my bid": my bid is the slider ($30) and $50 is just a fixed column. "Why did my pick not appear?" Unclear. Does $70 beat $50 at every rival? Only rivals $60 shown to differ; the lower chart needed.

## Part 2 follows below (comparison with earlier review and build notes).

# Part 2: after meta.json, the earlier review, and build.md (read only after Part 1)

meta: doesNotKnow = "shading never helps" and "inflating only adds wins that lose money"; objective asks the learner to *show*, against a low and a high rival, the two halves. Both halves are on stage (rival $60 bar, rival $75 red bar). The brief's causes are shown, not only told, so the told-vs-shown rule is met.

## Previous findings (2026-10-14 first review) checked
1. Title/option giveaway: **mostly fixed.** Title is now "What should you bid for a $70 painting?", hook no longer says "shade", correct option moved last. The $70 option still equals the title number; residual, mild.
2. Hook disagreeing in tone: **fixed.**
3. Single rival = second-highest: **fixed** by the rule chip plus "pays $X" on every bar.
4. "You pay" shown only for slider bid: **fixed** (step 1 shows $50, $70, $90 all "pays $40").
5. Reveal quotes reached states: **still fine** ($60 and $75 are the gate).
6. "Never worse" told from four rivals: **partly fixed.** The sweep chart exists and is the only picture of "whatever the rival bids", but the gate is satisfied by tapping rivals alone, the chart has no axis labels and 8 px key text, the dashed line only moves with the slider, and the reveal does not point at it. In the scripted run the slider went to $40 and showed nothing. A learner who ignores the slider still has only four rivals.
7-8. Reveal wording: unchanged, "It is why this format invites honest bids" still has an ambiguous "It".
9. Tie rule: still seen only by accident at Rival $90 (frame 05, $90 loses); the chip says it. Residual.
10. Rival chip wrap: unchanged; slider range still lets one bid above the largest option.

## New in this version
- Locked stage (01-predict.png): the "Pick a rival bid" label overprints the "$50" and "$70" column labels, and the whole chart is tiny. Reads as a rendering fault.
- The learner's own pick ($50) is never "my bid" on stage; the slider is a separate $30.
- Build note says the sweep is hidden while locked, which is right (it does not leak).

## Verdict for the current version: **launch**
Screenshots seen. Causes are on stage; the first-review giveaway and the "pays" hiding are fixed. Remaining are polish items (not blockers).
Top remaining finding: the sweep chart that carries "whatever the others bid" is ungated, unlabelled and not pointed at by the reveal, so "never worse" can still be taken on trust from four rivals.
Hypothesis for human test: a learner who says "$70 is never worse" can also say why $90 is not better.
