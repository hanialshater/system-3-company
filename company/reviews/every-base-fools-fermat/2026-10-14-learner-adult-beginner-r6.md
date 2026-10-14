*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6 wave; first learner review of this lesson): every-base-fools-fermat
lesson version: v2
boundary: learner who knows fast powers mod n by repeated squaring and what coprime means; does not know that a composite can pass Fermat's test for every coprime base, or that checking square roots of 1 catches it (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/every-base-fools-fermat/sheet.png, 8 frames)
Verdict: revise

## 1. From the artifact

- **Leak (main finding 1):** the hook reads "A quick test says 561 is prime, whatever base you try. It isn't." The question then asks for how many of the 320 coprime bases a^560 mod 561 = 1, with "All 320" as an option. "Whatever base you try" is the answer to that question. A careful reader is handed it; a careless one (like this path, which chose "None") ignores it. Either way the prediction can't catch the misconception. Suggest a hook that keeps the tension without the count, e.g. "561 is not prime. Can a quick test tell?"
- Explore: tapping a = 2, 5, 7, 10, 13 gives "looks prime" each time, and "BASES TRIED 5 / GAVE 1 5" climbs together. That counter is a good stand-in for "every base". "All 320" is told in the reveal, which is fine because big numbers go in the reveal and it is claimed.
- The stronger test on 13 shows 208 → 67 → 1 → 1 → 1, with 67 tinted red and "67 squared is 1, but 67 is not 1 or 560: composite." That is the second gap item on stage, and it lands.
- **Reveal quotes a chain I never saw (main finding 2):** "For base 2 that went 263, 166, 67, 1." The stronger-test button follows the last base tapped, so on this path I ran it on 13 (208, 67, 1, 1, 1), not on 2. The reveal should quote the chain the learner actually ran (earn-the-reveal; board pattern W-150). It does happen to share the 67, so it is not wrong, just not what I saw, and I have to trust a sequence I never looked at.
- "Modulo a prime, only 1 and n − 1 square to 1" is told. The stage pointer (red 67, "not 1 or 560") stands for the cause, so I count it as shown.
- "A few bases still slip past (10 of 320 here), but never more than a quarter" is told context. Nothing on stage lets me find one of the 10 liars. Fine as one claimed sentence.
- Minor: on the stronger test, the "squared" step from a^35 to a^70 is implicit: the arrows carry no "²" label. The boundary knows repeated squaring, so this is a minor point.
- Minor: a large empty band sits above the status line on every explore frame. The stage could be shorter.

## 2. Earlier findings

- No earlier learner review exists for this lesson.

## 3. New findings

- See the two main findings above. No FATAL.
