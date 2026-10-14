*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): one-bit-avalanche
lesson version: v2
boundary: adult-beginner. Knows that a hash maps data to a fixed-size output and that letters are stored as 8 bits; does not know the avalanche effect (meta.json learner field). The v1 review used a stricter never-programmed boundary on purpose; this one uses the lesson's own.
Screenshots seen: yes (artifacts/walkthroughs/one-bit-avalanche/sheet.png, all 18 frames)
Verdict: launch

## 1. From the artifact

- Hook and predict: "Change a message by a single bit. How much of its SHA-256 hash moves?" is clear. The stem glosses "hash" in one sentence. The options are About 1 / 10 / 128. The locked stage shows "cat" as 24 bits and a 16 × 16 grid of output bits with nothing marked changed, so nothing leaks.
- Explore: each tap on a message bit marks the changed output cells in green, prints "· 129 changed" and adds the count to a running list ("Changed per tap: 129, 112, 129, …"). One tap already refutes "About 1" with a picture of about half the grid going green. Repeated taps show the count hovering near 128 and never near 1 or 10. The stage carries the idea fully.
- The why ("each output bit flips with a chance of about a half, like a coin toss"): the stage stands for it as a fresh, scattered half of the grid turning green on every tap, with no pattern. The reveal points at it ("Each of your taps re-rolled about half the picture").
- Reveal: it quotes the learner's own counts and the average of about 127. The "cannot tweak a message to fix just a few bits" consequence is one told sentence.
- Minor: after the first tap "c" becomes "·" and soon all letters are "·". The 15-word stage caption ("· stands for a byte with no printable character, or a space") explains this, but it is the longest text on stage, and a beginner loses the "this is still the word cat" anchor. Flips accumulate, so by tap 16 the message is far from "cat", although each count is still against the last tap.
- Minor: 16 required-or-allowed taps make the run long. The reveal unlocked after 3 taps, which is fine.
- Minor: at the reveal the stage is scrolled and the message rows are cropped.

## 2. Earlier findings (v1 review, 2026-10-13)

1. "Hash" and SHA-256 were never introduced: **fixed**. The stem now says "A hash is a fixed-size fingerprint of a message, used to check it was not altered."
2. Why it matters was told only ("nudging toward a chosen hash" never set up): **partly fixed**. The reveal now ties the consequence to the stage ("Each of your taps re-rolled about half the picture, which is why you cannot tweak a message to fix just a few bits"). Nothing on stage tries to hit a target, so the consequence is still told, pointing at what was seen. Minor.
3. Too many taps before the reveal: **fixed**. "Show me why" unlocks after 3 taps (frame 04). The walkthrough's 16 taps are optional.
4. The "·" glyph was unexplained: **fixed** (stage caption), though the caption is long (minor, above).

## 3. After reading the brief

- The doesNotKnow item (the output looks unrelated after a tiny change) is the whole stage: a scattered half of the grid re-rolls on each tap. That meets "Show the why you promised".
- The objective's "cannot be nudged toward a target hash" is a consequence, not the cause. It is told in one sentence that points at the re-rolled picture. I accept that as context. A "try to change only one output bit" moment would make it shown, but it is not needed for launch.
- Minors: long "·" caption, accumulated flips drift away from "cat", reveal-frame crop. No FATAL.
