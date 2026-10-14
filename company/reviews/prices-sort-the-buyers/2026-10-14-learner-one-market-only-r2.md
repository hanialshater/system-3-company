# Learner review r2: prices-sort-the-buyers (revised version)

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round 2
borrowed mind: adult who knows what a price and a house are; no economics beyond supply and demand
method: transcript.md, sheet.png; Demo.tsx reveal branch read. Simulated learner, not evidence of learning.
screenshots seen: yes (sheet.png)

## Part 1: findings from the artifact, before meta.json / earlier review / build.md

**Idea the learner lacks:** that prices rising only where too many want the same thing steer people to the allocation with the highest total value, with no one planning it.

**Answer visible before predicting.** Mild to strong. The correct option comes first and is the "good" one; title "Prices sort the buyers" and hook "What do rising prices do?" signal a benign result. A learner picks "highest" by tone. The wrong options (middling, lowest) are filler.

**Predict question.** "Among the six possible matches, that one has" is a sentence fragment that needs the previous sentences held in mind: "that one" is the match that results when no house is over-wanted. Three rules in one paragraph (start $0, raise $1 on over-wanted, take houses you want). "Total value" is never defined at predict; the stage shows nine numbers but no totals until Compare. A beginner has to work out that value is a number the buyer puts on a house.

**Locked stage.** A 3x3 grid with "12 − 0 / 12" in each cell. Readable if you know it is value minus price; the first-time reader sees nine numbers and a dashed box, with no legend. The chip with the rule only appears after unlock.

**Where understanding first broke.** Step 1 (Raise): a goes $1, group dashed again. "Raised a; 3 buyers wanted only a." Fine. Step 2 (Run): jumps to Round 3, a $3, b $1; the learner has not seen round 2 in the transcript. If Run animates it is fine; the recorded state shows round 1 then round 3 only. The reveal says "you saw three raises: a $1, $2, $3", which for a script that pressed Raise once then Run is true only if the animation was watched; reduced-motion users get the final state. Flag as risk.

The odd moment is "on the last raise b went to $1 too, because a and b together were wanted by too many" — the group rule ("the smallest group too many want") is hard: a *set* of houses wanted by more buyers than there are houses. The stage shows it as a dashed box around two columns; the learner sees the box but "together" is a told sentence.

**Told vs shown.** (1) "Lowest prices that clear the market": the stage never shows a price being too high or the stopping point being the lowest; told. (2) "For any values, such prices exist and their match has the highest total": claimed for all values, shown for one table; told. (3) The thing the learner asked, why does the price process find the best match, is only answered by coincidence in one example: 23 is the max in the Compare list. Nothing shows that prices push z away from a. The line "z ends on b although it values a at 7" is a good, visible fact (the 12/8/7 column a has three suitors; z loses out). It points to the stage.

**Reveal quotes reached states?** Yes for rounds 1, 3; round 2 is quoted ("a went $2") and may not have been visited in a recorded run; the code branches on `seen`. In the recorded run it printed the full path, so round 2 counted as seen via Run. Unclear if the learner saw it.

**Prediction held** gives a lucky guess a pat on the back; no check that the learner knew why.

## Part 2 follows below.

# Part 2: after meta.json, the earlier review, and build.md (read only after Part 1)

meta: doesNotKnow = prices raised only on over-wanted houses stop where every buyer can take a house they like best; the resulting assignment has the highest total of all. Objective asks the learner to explain that, "without anyone assigning houses". Both are on stage: dashed group, captions, wants/gets marks, the six totals with 23 highlighted, and "z ends on b although it values a at 7". The "why lowest prices" and "for any values" sentences are context beyond the gap.

## Previous findings checked
1. "Want only from" parse: **fixed** (rule moved to stage, question simplified).
2. Predict not the lesson: **fixed.** The prediction is now highest/middling/lowest total.
3. Answer visible: **partly.** The new correct option is first and "good-sounding"; title and hook are benign. A learner can pick it by tone, and "Your prediction held" then rewards a guess.
4. Run skips the {a,b} step: **fixed** in the code (350 ms steps, captions), and the recorded frame 03 shows the caption "Raised a and b together". The script frame shows only Round 3, so I cannot see the animation; reduced-motion users still jump (the caption survives). The reveal states "you saw three raises" if all rounds are in `seen`.
5. Told: "lowest prices that clear" and "for any values": **unchanged.** The builder's check (284 clearing vectors) backs it but the stage cannot show it. Context outside the gap, claimed; allowed by the decision.
6. Legibility: **fixed** (grid larger, hides the rule line at predict). Frame 01 reads.
7-9: unchanged, fine.

## New
- Predict sentence "Among the six possible matches, that one has" refers to a match defined three clauses earlier; "total value" is undefined until Compare. Acceptable but heavy.
- The reveal does not explain why a high-total match comes out of price rises. It is shown for one table only; a learner will leave with "it worked here". The brief admits "for any values" by claim.

## Verdict for the current version: **launch**
Screenshots seen. Stage holds what the brief names. The remaining weaknesses are told context and a tonal giveaway.
Top remaining finding: the correct option is first and matches the benign hook, so "prediction held" can be earned without understanding; consider a prediction that cannot be answered by tone (for example, will the winning match change if a's price starts at $5).
