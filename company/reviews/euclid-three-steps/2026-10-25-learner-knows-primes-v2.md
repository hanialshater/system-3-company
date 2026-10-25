*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: euclid-three-steps
lesson version: v2
boundary: an adult who knows what a prime is and can multiply and divide with a remainder; has never met Euclid's argument that no finite list holds every prime (meta.json learner field, read for the boundary only before walking)
Screenshots seen: yes (artifacts/walkthroughs/euclid-three-steps/sheet.png, recorded 2026-10-25T18:27:59Z, built from 347059b15 into .next-le-euclid; plus a 412-wide Pixel 7 probe on :3957 of three off-QA paths, screenshots in the session scratchpad, not committed)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Paths walked: the QA path (option 1, the four lists in order, then Add 1, Divide by each, Find its primes); and three probes: option 1 with list "2, 3" taken through all three cards; option 2 ("A number one of them divides") and option 3 ("Nothing: the list could be complete") on the 2 to 13 list, to read their reveals.

1. **Where understanding first broke: the jump from "remainder 1" to "so there is a missing prime".** Up to Divide by each I follow everything with what I already have: the block 30030 is a multiple of every listed prime, the +1 is not, so each division leaves remainder 1. Then "Find its primes" hands me 30031 = 59 × 509. For *this* list the button did the work. The reveal then says "Any finite list gets the same three steps, so no finite list holds every prime." The question I actually have at that moment is: for a list I cannot compute, how do I know step 3 finds anything? Why must product + 1 have a prime factor at all? Nothing I saw says "every whole number above 1 is either prime or breaks into primes". It is in the trust sheet (c4), which I only see if I tap "Why trust this?", not in the lesson's flow or its reveal. This is the one idea the general conclusion rests on, and it is the first place the lesson needs something my boundary does not supply on its own. Knowing what a prime is gives me the definition, not the fact that factoring always ends in primes. A one-clause statement in the reveal or on the Divide card would close it; how is the builder's call.

2. **What the prediction felt like.** Fair and live. The three options are the three real reactions (a new prime / a hidden divisor / nothing). Option 2 is a good trap for someone who half-remembers "multiply and add 1", and the remainder-1 column answers it directly. One small mismatch: the stage under the question shows "2, 3, 5" and "2 × 3 × 5 = 30" while the question is about 2 to 13. I read it as a preview, but for a second I wondered which list the question meant.

3. **Whether the reveal answered the question I had.** Partly. It answers "is 30031 a new prime?" well: v2 lets the 2 to 13 list factor (59 × 509), so I do not leave believing "product + 1 is always prime". The small lists' "7 is prime" path in the probe and the big list's composite answer together show the honest version. It does not answer the general question in finding 1. The two wrong-option reveals ("Not quite: it was ...") use the same text; for option 2 the remainder sentence is a direct answer, and for option 3 the general sentence is, so neither predictor is left without an answer, apart from the same gap.

4. **Dead end off the QA path (probe).** With option 1 and list "2, 3", I can press Next: Add 1, Add 1, Next: Divide, Divide by each and Find its primes. Cards 2 and 3 get ticks and the stage says "7 is prime: not on the list", but card 1 has no tick and the reveal button stays "Try it first". The panel's instruction, "Work through the three cards: multiply, add 1, divide", is what I did. The only hint that I needed the 2 to 13 list ("Pick a list. Try 2 to 13.") was on card 1, which is off screen by then. A learner who stops here is stuck with no named reason. Not the blocking finding, but it should be fixed with it.

5. **Smaller notes, not blocking.**
   - Card 2 says "Every listed prime divides the block. Not the +1." "The block" is not named anywhere else. I took it to mean the 30030 box, which works on screen, but the word is new.
   - On the short-list path, "Its primes are not on your list." under "7 is prime" reads oddly: 7 is the prime.
   - The tap order on the QA path is tidy and each tap changes something I can see. The six division rows with "r 1" lined up are the strongest frame in the lesson.

Verdict reason: the reveal's general claim ("any finite list ... no finite list holds every prime") rests on product + 1 always having a prime factor, which the lesson never states where the learner reads. The button computes it for one list, and the learner's boundary does not supply it. Second, list "2, 3" through all three cards is a dead end that the panel instruction does not explain.

## After reading build.md / meta.json

(Written after the section above was finished.)

- **What v2 changed.** `git show be3a6d58b`: one word in the reveal ("no list" became "no finite list") and the c5 text to match. Nothing on the stage changed. So findings 1 and 4 were also in v1.
- **Intent against experience.** The objective is "say Euclid's three steps and why they end at a prime the list missed: every listed prime leaves remainder 1". The QA path delivers that sentence: the remainder-1 rows are the clearest frame. But remainder 1 only shows the new number's primes are *off the list*. It does not show the new number *has* a prime. That is c4 ("Product + 1 is above 1, so it has a prime factor"), whose source says "Shown on the stage by 'Find its primes'". On the stage, the button computes it for one number; it does not say it holds for every number. doesNotKnow is "Euclid's argument", and c6's own note on Heath IX.20 says the proof "shows that the result is prime or has a prime factor G". The lesson leaves out the step that proof spells out.
- **Disagreement with the earlier review, recorded rather than smoothed over.** The v1 review (2026-10-14-learner-adult-beginner-r10.md, finding 4) found the same gap independently, called it "a clause", and gave launch. I reached it from the artifact before reading that review. Two independent walks stalled at the same question, so I treat it as a real stall point, not a quibble. I give revise because the general sentence in the reveal is the lesson's payoff and rests on it. The steward may rule it non-blocking as r10 did. If so, finding 4 (the dead end at list "2, 3", which r10 did not probe) is still a separate fix for the lesson owner.
- **Misconception field.** "Product + 1 must itself divide by one of the listed primes" is answered well by the r 1 rows. "A long enough list could be complete" is answered only through the general sentence, so it is exposed to the same gap.
- **Not mine to judge:** claims are all verified (fact-check 2026-10-25-fact-check.md); fixing the wording or the unlock rule belongs to the builder (design-engineer).
