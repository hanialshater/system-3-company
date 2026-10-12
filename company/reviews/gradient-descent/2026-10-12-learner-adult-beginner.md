*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: gradient-descent (adult beginner)

Boundary used: remembers school arithmetic and everyday life; has never studied gradient descent, slopes as derivatives, or machine learning.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots, QA phone screenshots, plus my own Playwright run (chose 0.95, slider to 1.05, Run 10, slider to 1.00, Step x2).

**Where understanding first broke.** The question itself: "Each hop = step size × slope." I have no number for "slope". The picture shows a curve, but nothing on the stage shows a slope value, and nothing tells me where the "bottom" sits in numbers. I can still guess, but I cannot reason, because I can't compute a hop. The hook ("Bigger steps should reach the bottom of the valley sooner") states my intuition for me, so I pick against nothing. On "0.05 / 0.45 / 0.95" I would pick 0.95 or 0.05 on gut feeling.

**Prediction.** It allowed a real guess: three options, and a tempting wrong one (0.95, matching the hook). The hook asserts the belief and then says "Try it", which reads as a setup. Fine for a guess, but I know I'm being tricked, so the prediction is partly a "which one is the trap" game.

**Exploring.** The slider plus Step / Run 10 / Reset is concrete and the live status line ("Close to the bottom in a few hops.", "Bouncing between the same two spots forever.", "flew off") answers "what is this doing" well. Seeing 1.05 fly off the valley (from bottom 10.37) is a strong moment. But:
- The panel tells me which four values to try ("Try 0.05, 0.45, 0.95 and 1.05"). The slider moves in 0.05 steps, so 0.95 is nine nudges from the default with a thumb on a phone. The walkthrough only reached 0.20 and 0.35 and never saw the extremes.
- "FROM BOTTOM" starts at 4.00 but the picture has no scale, so 4.00 means nothing until it goes down.
- My real question after a miss is "so what step size IS best, and why is 0.95 no better than 0.05?". Exploring lets me find that 0.45 is good; it does not let me see that 0.05 and 0.95 tie. I would have to run both and compare 1.39 with 1.39 from memory; there is no side-by-side.

**Reveal: earned or told?** The reveal unlocked after one Step at 0.35 (walkthrough step 6: 1 hop, 1.20 from bottom). So it can be reached having seen almost nothing: no overshoot, no 1.05 blow-up. The headline claims ("both end 1.39, exactly the same", "Past 1, every hop lands farther away") are TOLD unless I happened to run those values. The core payoff, that 0.05 and 0.95 give the identical result, is a surprising fact I'd have to take on trust. The formula "(1 − 2 × step size)" and "fast is where that number is near zero" is told, in algebra, to a learner who never saw "slope" defined. "Near zero" is never tied to a step size I can name (0.5 is the point where it is exactly zero, and that is not said). The closing neural-network paragraph is pure assertion and has no tie to anything on stage.

**Findings (problems):**
1. "Slope" is undefined for this learner, so the rule the whole lesson rests on cannot be applied by them.
2. The reveal can be unlocked after a single hop, so its surprising claims (0.05 and 0.95 tie; above 1 diverges) can arrive without having been seen.
3. The tie between 0.05 and 0.95 (the most counter-intuitive fact) has no side-by-side view; it is a number I must remember across resets.
4. "Multiplies the distance by (1 − 2 × step size)" and "near zero" is dense for a non-algebra learner; the best step (0.5) is never named.
5. On the reveal view the valley picture shrinks (layout jump) compared with the explore view, so the thing I was just looking at changes size under me.
6. Wording at the miss: "Not quite" is fine, but the hook told me bigger = faster, so a learner who picked 0.95 is not told plainly that the hook was the misconception.

No FATAL flaw found. Controls all respond (slider, Step, Run 10, Reset all worked; Run 10 and Step disable after 10 hops, which is clear). Statements I could check against what I saw (1.05 -> 10.37, 1.00 bounces, 1.20 after one hop at 0.35) match.

## 2. After reading the brief

- Intent: dislodge "bigger step = faster", objective is explaining step = size x slope with crawl / zigzag / fly-off. The experience delivers crawl and fly-off visibly; "zigzag" and the 0.05 = 0.95 tie are only seen if the learner chooses and compares those runs, and the reveal does not require it.
- The brief's boundary says the learner already knows "a steeper slope means a bigger change". My boundary is slightly weaker (slope as a number is not familiar), so finding 1 is stronger against my boundary than against the lesson's own. The lesson never shows a slope value, so even the stated boundary is only partly served.
- Brief expects the learner to see "the fastest is in the middle". Nothing on stage marks the middle; the reveal tells it as "(1 - 2 x step) near zero" without naming 0.5.
- Misconception targeted is the one the hook states. Reveal does name it indirectly ("Big steps are not fast steps"), which matches intent.
- Claims are all `unverified`, so the reveal's numbers carry no checked status yet; I could confirm 10.37, 1.20 and the 1.00 bounce by hand, but that is not a fact-check.

Verdict: revise
