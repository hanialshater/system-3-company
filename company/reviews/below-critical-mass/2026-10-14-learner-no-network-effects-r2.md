# Learner review r2: below-critical-mass (revised version)

date: 2026-10-14 · reviewer: Learner Evaluator (borrowed mind) · round 2
borrowed mind: adult who knows what a product launch is, has never heard "network effects" or "critical mass"
method: transcript.md, sheet.png; Demo.tsx reveal branch read. Simulated learner, not evidence of learning.
screenshots seen: yes (sheet.png)

## Part 1: findings from the artifact, before meta.json / earlier review / build.md

**Idea the learner lacks:** a product's value depends on how many already use it, so a launch below a threshold shrinks itself, while one just above grows.

**Answer visible before predicting.** Yes, strongly. Title "Does a good product always find users?" is a rhetorical "no". Hook "Two launches... Where do they end up?" implies different ends. Option 2 is the only option that mentions both launches differently, with numbers copied from the question, and it is the longest. A learner can pick it by test-taking alone. The wrong options are "both same" variants. This is the weakest part of the card.

**Predict question.** About 75 words, with the model (people differ, value rises with share, "values it above $0.16 starts using it") packed into one paragraph. Readable but dense; "$0.16" in a phone-size paragraph. The picked option (stay near start) is a fair naive guess.

**Locked stage** says "The chart appears after you answer" with a dead tiny axis. Fine, honest.

**Where understanding first broke.** Step 1: "Round 2: 18 → 11 → 0% Dies out." The learner sees the staircase hit zero. Why does 18 go to 11? Nothing on stage says. The curve and diagonal are unlabelled: axes "next" and "now", no label for the diagonal, no mark at 20%. A reader who does not know cobweb diagrams sees a staircase but not why it bounces. The reveal says "a round changes nothing there" (the 20% crossing), but the crossing is not marked on the stage, so the learner cannot point at it.

**Told vs shown.** The core causal sentence, "with few users the product is worth less than its price to most people, so even fewer join", is told only. What the stage shows is the result (the curve shape), not the mechanism (people with low want drop out; who they are). Nothing on stage stands for "people differ" or "worth to each person". That is the idea the title promises. Also "why 80% and not 100%" is never explained or shown; step 3 settles at 80 and the learner asks why not everyone.

**Squeeze step.** 19% dies, 21% grows: the learner gets the knife-edge, good, and "Where does the line fall?" prompts looking for the crossing.

**Reveal quotes reached states?** Quotes 19% and 21% and falls back to generic text if the learner did not visit them; otherwise yes. The script visited them. OK.

**Dead steps.** Slider to 27 and Step/To the end give nothing new; the learner is already past the point. Step button gives one round at a time, which is the nicest way to see the mechanism, but the gate does not require it.

**Reveal tone:** "Not quite" then correct; the last sentence "a product that most people would buy if others used it still fails" is the takeaway and is clear.

## Part 2 follows below.

# Part 2: after meta.json, the earlier review, and build.md (read only after Part 1)

meta: doesNotKnow is the outcome (same product and price collapse or take off depending on start). Objective asks the learner to **explain** the tipping point and that a launch below critical mass shrinks. The shrinking cause, "with few users it is worth less than its price to most people, so even fewer join", is the mechanism of the explanation.

## Previous findings checked
1. Model notation (x, (1 - x) times share): **fixed.** The question now says it in plain words (dense, but derivable).
2. Hook gave answer: **partly fixed.** Hook and title no longer state the contrast, but option 2 is still the longest, the only one contrasting the two launches, and reuses the 18/25 numbers. Still a test-taking tell.
3. Locked stage empty / clipped controls: **fixed** ("The chart appears after you answer"; controls visible in 01-predict).
4. Chart not explained: **not fixed.** "next"/"now" axes, an unlabelled dashed diagonal, no mark at 20%. The text row still carries the teaching.
5. Reveal quotes reached states: **fixed and better** (19% and 21%).
6. Tipping point asserted not found: **fixed.** The squeeze (19 vs 21) is required and the learner sees 2 rounds vs 8 rounds.
7. Doubled "Not quite": **fixed.**
8. "Worth buying" never shown: **partly fixed** ("most people would buy if others used it"; 84% claim c7 rests on derivation only) but nothing on stage shows people valuing it at full use, and 80% (not 100%) is unexplained.
9. Mechanism only in tiny chip: **partly fixed**: now in the reveal, in one told sentence.

## Told vs shown (decision 2026-10-14)
The objective asks the learner to explain the shrink. On stage: the curve lies below the diagonal under 20%, so "next" is lower than "now"; that stands for "fewer join". Nothing labels it, and the reveal points at "the line" and "a round changes nothing there" without the crossing being marked. Under the rule the stand-in exists but is not labelled and the reveal does not point at it.

## Verdict for the current version: **revise**
Screenshots seen. Much improved. Not a fatal flaw, but the explanation the objective asks for is a told sentence over an unlabelled chart.
Top remaining finding: label the 20% crossing and the "falls below diagonal" region on the existing chart so the reveal can point at what the learner saw, and make the correct option less conspicuous.
Next move: demo-builder (labels), learning-designer (option shapes).
