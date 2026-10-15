*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: checking-is-not-finding
lesson version: v3
boundary: adult beginner (borrowed mind). Knows: the number of choices multiplies fast (route-explosion). Does not know: that checking a proposed answer can take one step while finding one, or proving none exists, can mean trying every group, and that this gap is the P versus NP question. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/checking-is-not-finding/sheet.png, recorded 2026-10-15T10:07:37.057Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. 64 squares, filled one by one, and "Nothing makes 13 - all 64 tried" is a clear picture. Doubling to 128 with one more number is the line that stuck.
2. What the prediction felt like: 6 felt natural (one try per number). 64 is reachable if you think "each number in or out". Fair.
3. Whether the reveal answered my question: mostly. My question was "couldn't a clever person see 13 is impossible without trying all 64?", and "a shortcut can help on one list, but ... nobody knows a method that finds one quickly in every case" answers it. "NP problems" and "P versus NP" are new words dropped in the last two sentences. They are labels, not needed to follow.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- r10 said revise: 64 was never derived, and the example invited the objection "proving none means trying all". The stage now shows "GROUPS: EACH NUMBER IN OR OUT, 2^6 = 64", and the reveal says "A shortcut can help on one list". Both look addressed. My own objection (a clever person can rule out 13) is answered by that sentence.
