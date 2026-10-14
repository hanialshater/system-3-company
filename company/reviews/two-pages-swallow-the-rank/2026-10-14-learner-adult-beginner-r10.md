*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): two-pages-swallow-the-rank
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows PageRank passes a page's score along its links; does not know that without random jumps a group of pages that links only to itself soaks up every page's score)
Screenshots seen: yes (artifacts/walkthroughs/two-pages-swallow-the-rank/sheet.png, recorded 2026-10-14T18:55)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 33%"; tapped "5 rounds", "50 rounds", "Add 15% random jumps", "No jumps"; opened reveal.

1. **The prediction is genuine.** E + F start at 33.3% (2 of 6 pages) and "they just pass to each other" suggests nothing changes. 67% and 100% are both reachable guesses. Good.
2. **The payoff is on the stage.** E + F climbs 33.3 → 79.2% at 5 rounds → 100.0% at 50. The dashed "E + F" outline with arrows going in (D → E) and none going out makes the cause visible in the graph itself. Jumps: 69.9%, and the "At 50" line keeps both.
3. **The per-page bars are too small to read at phone size.** A to D show as short dashes at round 50 whether they hold 0% or a little; the jump case looks almost the same as no jumps for A to D. The E + F readout does the work.
4. **Where the idea I lack first appears: "Scaled PageRank" (reveal).** I do not know what "scaled" means here, and the stage calls the fix "random jumps". The sentence reads like a term I am supposed to know already. "Real PageRank adds these jumps" would be enough.
5. Reveal fits with its picture (06-reveal: graph, outline, readouts). "That is a rank sink." names the idea after showing it. Good order.
6. Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the sink draining every score, and jumps undoing it, are both seen on one graph.

Fixes (hypotheses for the builder, not tested):
- Label each page's share as a number (or widen the bars) at round 50 so "A to D with 0.0%" and "every page kept some" are visible.
- Replace "Scaled PageRank" with plain words or define it.

## After reading build.md (Pre-flight v1)

- "Scaled PageRank" is the brief's term (Easley and Kleinberg's name, per claim c5, unconfirmed). From my seat it is still unexplained jargon at the end of the reveal (finding 4). Bars are 70 px per whole score, so 1/6 is about 12 px and small shares under jumps are a few px: finding 3 stands.
- Fix route: none required for launch; c4/c5 are the fact-checker's.
