*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): divide-six-by-zero
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows 6 ÷ 2 = 3 and that division asks "how many of these make that"; does not know why 6 ÷ 0 has no answer, rather than being 0 or "infinity")
Screenshots seen: yes (artifacts/walkthroughs/divide-six-by-zero/sheet.png, recorded 2026-10-14T18:53)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "It is 0"; tapped Scoop 3, 1, 0.1, 0, "Check: ? × 0", Reset; opened reveal. I also walked it mentally as an "infinity" chooser.

1. **For the "0" chooser the lesson works.** The jug fills with 2 scoops, then 6, then 60 thin stripes; scoop 0 leaves "0 of 6 after 1,000". The ×0 check (6 × 0, 1,000 × 0, 1,000,000 × 0 all = 0) shows that 0 cannot be the answer, nor any number. Clean.
2. **For the "infinity" chooser the explore argues the other side.** 2 → 6 → 60 with "smaller scoops, more of them, with no ceiling" is exactly the reasoning that leads to "infinity". The rebuttal is "no huge number works either" and 1,000,000 × 0 = 0. But an infinity chooser already agrees no huge number works; they think infinity is not a huge number, it is the end of the climb. Nothing on the stage or in the reveal addresses that. So one of the three options is never actually answered, and the explore reinforces it.
3. **Where an idea I lack first appears:** "It is left undefined". It is the right word, but it arrives as a label at the very end. A beginner may hear "mathematicians just refuse", not "no number can satisfy the check".
4. The model switch (hook: "three 2s make 6"; stage: "6 ÷ scoop = scoops") is consistent; I followed it.
5. Fit: the reveal opens after Reset with an empty jug, but the trace on the right keeps every line the reveal quotes. Fine.
6. Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Give the infinity chooser a direct line: e.g. "infinity is not a number you can multiply; 'infinity scoops of nothing' still holds nothing" or show that the count keeps growing without ever reaching a value (the "no ceiling" is the reason it is not an answer, not evidence for one).
- Tie "undefined" to the check: "no number passes the check, so there is no answer to give".

Verdict reason: the lesson handles "0" well but its own explore builds the "infinity" intuition and the reveal does not answer it, while the brief names infinity as a target.

## After reading the brief (meta.json)

- doesNotKnow names both "rather than being 0 or 'infinity'". Finding 2 is the gap: the 0 half is delivered, the infinity half is asserted against an argument the stage itself made.
- Fix route: demo-builder (reveal wording, perhaps one stage line).
