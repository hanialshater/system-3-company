*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): ten-thousand-replies-still-wrong
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows bigger random samples give smaller margins, and sample size need not grow with the population; does not know that when who answers depends on the answer, a bigger sample does not shrink the error)
Screenshots seen: yes (artifacts/walkthroughs/ten-thousand-replies-still-wrong/sheet.png, recorded 2026-10-14T18:54)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 50%"; tapped "1,000 web replies", "100,000 web replies", "1,000 random calls", "10,000 web replies"; opened reveal.

1. **The prediction is genuine for my boundary.** "Big samples are accurate" makes "About 50%" the natural pick, even though the question states the 2:1 reply rate. 40% is a good half-way distractor.
2. **The payoff is on one chart.** Four bars against the dashed "town 50%" line: web polls sit at 35.3, 32.3, 33.1% no matter the size, their whiskers shrinking; 1,000 random calls reach 48.7% with a wide whisker that crosses 50%. "Precise and wrong" vs "rough and right" is visible at a glance.
3. **Where the idea I lack first appears: "watch the bar and its whisker".** My boundary knows margins, but "whisker" is not named as the margin of error anywhere on the stage. I inferred it. A one-word label would close it.
4. The preset order (1,000 web, 100,000 web, 1,000 calls, 10,000 web) is shuffled against the chart's row order; I hunted for the button matching each row. Small.
5. The reveal answers my real question ("why doesn't more data fix it?") with "every batch of replies holds two opponents per backer, however many arrive". It fits with its picture (06-reveal).
6. Trust link reads "4/5 claims checked".

Verdict reason: size-does-not-fix-bias is seen across three sizes against a random-sample control, and the reveal names the cause.

Fixes (hypotheses for the builder, not tested):
- Label the whisker ("margin") once.

## After reading build.md (Pre-flight v2)

- Rows per poll, each kept, is a deliberate departure that makes the three quoted values and the shrinking whiskers visible at once; it works from my seat. The whisker is a 95% interval; the stage never says so (finding 3).
- Fix route: none required for launch.
