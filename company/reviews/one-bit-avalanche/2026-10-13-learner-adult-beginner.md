*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: one-bit-avalanche
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: SHA-256, "hash" and "256 bits" are unexplained jargon; the hook assumes I know a hash. The stage shows three letters (c, a, t) as 24 bits and a 16 x 16 grid of squares, which is a good picture. About 1 / 128 / 10 is a real guess for a layperson (and "about 1" is the natural intuition that a tiny change gives a tiny difference), so the prediction is meaningful. Unprompted, I do not know what a hash is for.
- What was SHOWN: striking. Each tap flips a message bit and about half the grid turns green ("129 changed", "112 changed", ...). The legend "changed by your last tap" is clear and the count in the caption makes it concrete. After a few taps the pattern is obvious: always roughly half. The first letter turns into "·" (a non-printing symbol) after a flip, which is a bit confusing but demonstrates that it is no longer "c".
- Where understanding first broke: not on the experiment, which is easy to follow, but on its purpose: nothing says why anyone would want this ("so what?"). The reveal's second paragraph ("each output bit flips with a chance of about one half, like a coin toss... you cannot nudge a message toward a chosen hash bit by bit") is conceptual, told, and talks about "nudging toward a chosen hash", which was never set up on the stage. Also, the transcript path made 16 taps, which is tedious: after 3 or 4 the point was made; the "Try it first" gate asks for more than I needed (the reveal button stayed locked through the early taps in the screenshot, so I do not know how many were required).
- Reveal: "129, 112, 129, 131, 137, 122, ... about 127 on average" matches the counts shown in the transcript exactly (I checked the first six against the stage numbers). "Never a handful" is fine.
- Reveal earned: the 128 fact yes; the security consequence no (told, not shown).
- Problems: (1) SHA-256 and "hash" never introduced or motivated; (2) why it matters is told only; (3) many taps for one lesson; (4) "·" glyph unexplained.
- No FATAL.

## 2. After reading the brief

- The brief's learner already knows that a hash maps data to a fixed-size output and letters are 8 bits; my boundary does not, so SHA-256 and 'hash' were jargon. The objective (flip one input bit and about half of the 256 output bits change) is shown vividly and the reveal's numbers match the counts. The second half of the objective (a message cannot be nudged toward a target hash) is told only. The misconception (similar inputs give similar hashes) is hit directly by the prediction option About 1.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
