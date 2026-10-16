*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: second-speaker-decibels
lesson version: v2
boundary: adult beginner who knows decibels measure loudness and more speakers are louder; does not know that decibels count multiplications of sound power, so doubling the power adds only 3 dB and ten times the power adds 10 dB (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/second-speaker-decibels/sheet.png, recorded 2026-10-16T14:42:43Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("63 dB", the correct one).

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Nowhere that blocks. The stage pairs two readouts: a bar "sound power reaching you, µW/m²" (linear, 0 to 10) and a meter in dB. Pressing 2, 4, 10 speakers fills the bar 2, 4, 10 while the meter goes 63, 66, 70. The bar doing the "adding" and the meter not keeping up is exactly the contrast a beginner needs, and it is visible without reading. The only word that may stop this mind is "µW/m²": it is a unit a beginner has never seen. It does no harm, because the bar's length carries the meaning.
2. **What the prediction felt like.** Mixed. 90 dB and 120 dB are tempting for the "add them" mind (120 = 60 + 60), so the trap is real. But 63 dB is the oddly specific number among round ones, and a test-wise learner may pick it because it looks like the trick answer, not because they reasoned it. This walk picked 63; the reveal ("Your prediction held") then confirms rather than surprises. That is acceptable: the explore still shows why.
3. **Whether the reveal answered the question the learner actually had.** Mostly. "Decibels count multiplications, not amounts: every doubling adds 3 dB and every tenfold adds 10" is the rule, and the stage numbers (×2 → 63, ×4 → 66, ×10 → 70) let the learner check it. "120 dB ... is a million times one speaker's power" closes the "60 + 60" trap. The question this mind may still have is "but does it *sound* twice as loud?". The lesson is about the meter, not perception, and says so throughout ("What does the meter say?"), so it is not a gap in what it promises.

Notes (not blocking):
- "a million times" needs the learner to do 60 dB more = six tenfolds. The reveal gives "every tenfold adds 10", so it is derivable, but it is the one number not seen on stage.
- No dead end under R4: all three controls change the stage; "Show me why" unlocked after "10 speakers".

Verdict reason: launch. No finding blocks a first-time learner; the linear power bar against the slow meter carries the idea without the unit.

## After reading build.md / meta.json

(Written after the findings above were committed in 5246021. build.md not read. meta.json read at HEAD 74a730e, committed content only.)
- **Intent vs experience.** Objective and misconception ("Two 60 dB speakers together make 120 dB") match the walk; the reveal's last sentence aims straight at it.
- c5 records that the stage assumes uncorrelated sound (in-phase identical tones could add up to 6 dB) and that this is "not on the stage". The caption says only "Identical speakers, same distance, no echoes." A learner who knows a little about interference could read "identical" as "same signal". Not blocking for this boundary; the CM may want "playing different music" or similar in the caption. That is a note for the CM and fact-checker, not a dispute of the claim.
