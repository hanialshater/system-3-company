*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: pennies-dont-add-up
lesson version: VERSION_TBD
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- (The transcript's only "404" hit is the digits in 0.30000000000000004; no page error. Lesson loaded fine.)
- Prediction: the hook ("It says no. Who is wrong?") already tells me the computer says 0.1 + 0.2 is not 0.3, so "They are equal" is a pick I would only make if I ignored the hook; the real choice is "more" or "less", which is a coin flip with no way to reason (a beginner cannot know which direction). The question is very plain English, which is good, but "A program" and "equals" are fine. The locked stage shows 12 switches worth 1/2, 1/4 ... 1/4096 and "Target 0.1": I did not know what they were for.
- What was SHOWN: tapping switches adds up a number and says "Over by 0.4" / "Over by 0.65" etc. This is intelligible, but 1/2 is a huge first step for a target of 0.1 and the instructions ("Try 1/16 first", "Try 3 switches first") only appear as grey hints; in the transcript path I switched on 1/2, 1/4, 1/8 ... in order and got further and further over (0.9997), which teaches nothing about 0.1. Then "How does a computer store 0.1?" jumped to 0.10009765625 "Closest 12 switches can get: still over" and a box: "0.1 -> 0.1000000000000000055... high; 0.2 -> ... high; 0.1 + 0.2 -> 0.30000000000000004 over 0.3". The numbers appear; I did not build them.
- Where understanding first broke: the idea that fractions of 1/2, 1/4, 1/8 are "how a computer stores" a number was never stated before the switches; "binary" is introduced only in the reveal. Why being unable to reach 0.1 exactly with a few switches implies the computer's 53 switches also cannot (and in which direction they err) is a jump: the panel asserts "high" for 0.1 and 0.2 with no way to verify.
- Reveal vs stage: "Your closest try was 0.5" is a strange line: the stage's closest value (0.10009765625) was the app's, not mine, and my own closest was 0.5, a poor try it highlights. The reveal's "0.000110011001100... with 0011 repeating forever, the way 1/3 is 0.333..." is told, not shown (the stage's switch pattern for 0.10009765625 is 1/16, 1/32, 1/256, 1/512, 1/2048 which does not look like a repeating pattern). The reveal is clipped at the card bottom. "That is why money is often counted in whole cents" is an aside, told.
- Reveal earned: partly. "No set of switches makes exactly 0.1" is demonstrated well enough. "So the sum is over" is only asserted, though the box shows it.
- Problems: (1) hook leaks that the computer says no; (2) switches' purpose and binary not set up; (3) default tap path moves away from 0.1; (4) why "high" is asserted; (5) reveal's "closest try 0.5" mismatches stage; (6) reveal clipped.
- No FATAL; the displayed numbers are true.
