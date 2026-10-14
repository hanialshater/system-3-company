*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): bank-lends-it-again
lesson version: v4
boundary: an adult beginner with a bank account who knows banks lend deposits; thinks a $1,000 deposit is $1,000 in banks, maybe a bit more (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/bank-lends-it-again/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the loop is spelled out in plain words, and the options are $1,100 / $2,000 / $10,000. "$1,100" is the natural belief. The locked stage (one $1,000 slab, total "?", "Textbook model" badge) leaks nothing.
- Explore: "Next round" gives $1,900, captioned "round 2 adds $900 = 90% of round 1's $1,000". "+10" gives $7,176, "round 12 adds $314 = 90% of round 11's $349". The shrinking ratio is now on stage. "+50" gives $9,985 under a dashed "limit $10,000 = $1,000 ÷ 10%". The column stops growing and "round 62 adds $2" sits cleanly below the limit label. 20% and 50% give $5,000 and $2,000, each with its own limit line.
- That is where "$1,100" broke for me: slab after slab, each 90% of the last, piling to ten times the deposit. The gap item (lending and redepositing make deposits a multiple) is carried by the stack and the caption, and the reveal points at "the round caption".
- Reveal: every number was seen. The real-banks caveat is honest, claimed context.
- Minor: at 20% and 50% the "round 62 adds under $1" caption floats high above a short column, far from the slab it describes.
- Minor: the 10% kept back never appears as a slab or tint. The limit formula carries "÷ share kept", which is enough for this objective.

## 2. Earlier findings (r5, v2)

1. Limit label collided with the round caption on the 10% / 62-round frame: **fixed** (the limit label is above the column top, the caption below it, both readable).
2. "Every round adds 90% of the one before" was told: **fixed** (the caption shows "= 90% of round N's $X" on stage).
3. No FATAL then or now.

## 3. New findings

- Only the minors above. No FATAL.
