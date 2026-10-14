*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): born-in-january-picked-first
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows older children in a class are a bit bigger; does not know that picking the "best" from a one-year age band with a fixed cutoff selects for birth month, because children born just after the cutoff are up to a year older)
Screenshots seen: yes (artifacts/walkthroughs/born-in-january-picked-first/sheet.png, recorded 2026-10-14T18:51)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About 25%"; tapped top 10%, top 50%, cutoffs 1 Apr, 1 Jul, 1 Oct; opened reveal.

1. **The prediction is genuine.** "They are all nine" makes 25% the honest guess; 45% and 75% let me commit to "some" or "a lot" of effect.
2. **The payoff is on the stage.** Top 10% with a 1 Jan cutoff tilts the bars down from J to D and reads "44% born Jan–Mar" against a dashed equal-share line. Moving the cutoff drags the shaded peak to Apr–Jun, Jul–Sep, Oct–Dec. That cutoff sweep is the convincing move: it rules out "January babies are just better".
3. **Where an idea I lack first appears: "top 50%: 33%".** Why does picking more children weaken the tilt? The reveal says "picking the top half shrank that to 33%" but not why (a stricter cut lets a small age edge matter more). Nothing breaks without it, but it is the question I would ask next.
4. After the cutoff moves, the axis still runs J to D, so with a 1 Oct cutoff the high bars are at the right end and Jan–Feb are also raised. I had to work out that Jan is "the next oldest" now. Ordering the axis from the cutoff month would remove the puzzle.
5. "±5.5 cm spread" reads to a beginner as "range". Harmless here.
6. The reveal opens on the 1 Oct / top 50% picture but the readout "1 Jan, top 10%: 44%" is still on stage, so the 44% it quotes is visible. *Outliers* and "best-replicated" give the book and the verdict. Fits.
7. Trust link "0/6 claims checked" (fact-checker's lane).

Fixes (optional): one clause for why the top 50% tilt is weaker; consider starting the month axis at the cutoff.

Verdict reason: the tilt, its size and its dependence on the cutoff are all shown by controls I used, and the reveal quotes them.

## After reading the brief (meta.json)

- doesNotKnow (cutoff selects for birth month; just-after-cutoff children are up to a year older) is delivered by the cutoff sweep. "Up to a year older" itself is never said in words; the model line "+0.5 cm per month" carries it implicitly. Not blocking.
