*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): the-loser-flips-the-winner
lesson version: v2
boundary: ranking-and-points. Knows ranking options and adding up points; does not know that removing an option nobody ranks first can change who wins a points-based vote (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/the-loser-flips-the-winner/sheet.png, 5 frames, recorded 2026-10-14T11:21Z, build 5 walkthrough; 05-reveal.png opened at full size)
Verdict: launch with notes

## 1. From the artifact (written before reading build.md)

- **No answer before the commit: pass (r7 top finding fixed).** Title "Who wins once C is gone?" and hook "C came last. Take C off the ballot and recount the same five voters." no longer hint that the winner changes. "B again" stays a live belief. I picked it. Options are words, none numbered. The locked stage shows the ballots and "?" bars, with no counts.
- Explore: "Count points" gives A 6, B 7 wins, "With C: B wins 7–6 (C 2)". "Remove C" (now an action label) dashes C and gives A 3 wins, B 2. "A vs B on each ballot" adds +1 A ×3 and +1 B "was +2" ×2, plus the new row "Lead sums with C: B 2 + 2 = 4, A 1 + 1 + 1 = 3. Without C: A 1 + 1 + 1 = 3, B 1 + 1 = 2." The cause (C sitting between B and A doubles B's lead) is drawn, and the 4-vs-3 sum is now a reading, not a sum. Show the why: pass.
- Reveal quotes what you saw: pass. "2-point lead", "1 each", "4 beats 3", "B won 7–6", "A wins 3–2" are all on the stage at the reveal (chips, log lines, lead-sums row).
- **The reveal fits with its picture: pass.** About 79 words (84 with the verdict line). The stage top is on screen.
- **Kit finding (W-287), not a lesson revise:** at the reveal the kit shrinks the ballot picture. The ballot letters, the "+1 A / +1 B" chips and "was +2" are about 5–7 px on the phone. The reveal names "ballots 4 and 5", and they are on screen but hard to read. The text rows under the picture carry the same numbers at full size, so the reveal still lands.
- Minor: after it is pressed, "A vs B on each ballot" looks disabled (greyed). That is fine as a one-shot, but it looks like it never worked.

## 2. Earlier findings (r7, v1)

1. Title and hook pointed to the winner changing: **fixed**.
2. C toggle read as a state: **fixed** ("Remove C" / "Put C back").
3. 4-vs-3 lead sum told, not drawn: **fixed** (lead-sums row).

## 3. New findings

1. **Kit (W-287):** ballot labels and chips about 5–7 px at the reveal after the kit shrink.
2. Minor: the greyed "A vs B" button after use.
- No FATAL. No revise.

## 4. After reading build.md

Pre-flight v2 matches what I saw (items 1–6). It says "Not seen in a browser" and has no item 7. The build 5 walkthrough now shows the fit holds. Findings unchanged. c6 (lead-sums row) was unverified at build time; the trust sheet in the walkthrough reads 6/6 checked.
