*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: enemy-of-my-enemy
lesson version: v4
boundary: adult beginner (borrowed mind). Knows: friend and enemy; the saying "the enemy of my enemy is my friend". Does not know: that if every group of three is balanced, the whole group must split into at most two camps. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/enemy-of-my-enemy/sheet.png, recorded 2026-10-15T10:10:40.102Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The "unbalanced" count with the named trios (ADE, BDE, CDE) after building three camps is the key moment: each bad trio has one person from each camp.
2. What the prediction felt like: "At most 2" was my guess from the saying (two sides). The definition in the question is dense (balanced, camp) and took two readings.
3. Whether the reveal answered my question: yes. "Three camps never balance" with the named trios. "It holds for any number of people" is asserted, not shown, but it fits.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- Earlier reviews: r9 under the saying-only boundary. meta.json is v4. The W-844 rewording touched Demo.tsx. On this build the named unbalanced trios and the "0 unbalanced at" log carry the argument, and the reveal quotes my own three-camp run.
- The walkthrough tool tapped many pairs (12 steps). A human will take fewer, but the "3 camps" preset makes the key state reachable in one tap.
