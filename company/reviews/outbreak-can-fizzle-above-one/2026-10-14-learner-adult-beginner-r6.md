*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): outbreak-can-fizzle-above-one
lesson version: v1
boundary: adult-beginner. Knows R is the average number one case infects and that R above 1 means growth on average; does not know that at R = 1.5 about 42% of single introductions die out by chance (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/outbreak-can-fizzle-above-one/sheet.png, all 8 frames)
Verdict: launch

## 1. From the artifact

- Hook and predict: the title "R is 1.5. Does the outbreak take off?" and the hook line set a real tension, and "Never" is the natural guess for "R above 1 means epidemic". The locked stage shows one green "start" dot and empty tallies, so nothing leaks.
- Explore: "1 outbreak" draws generations as rows of dots. In this run it took off, which fits "Never" for a moment. "+100 outbreaks" then reads DIED OUT 38 (38%) and FIRST CASE INFECTED 0 OR 1 49 (49%), and the last outbreak shown "died out after 1 case", with "0: chain ends". The "dies by luck early" idea is on stage twice: the one-row dead chain and the 0-or-1 readout. The reveal points at both ("a chain that starts that thin is easily cut by luck").
- **Where I wobble: the R buttons reset the tally and the reveal quotes runs I never made.** Tapping R = 0.9, 2 and 3 shows each with 0 outbreaks, and the run never pressed "+100" at them. The reveal then says "At R = 2 about 20% still fizzle, at R = 3 about 6%; below 1 every chain ends." The learner has seen none of these (board pattern W-150). They are context to the main R = 1.5 question, so this is moderate, not blocking. But the stage offers these buttons as if they were part of the lesson, and the reveal frame itself shows R = 3 with 0 outbreaks next to text about R = 1.5.
- Minor: "Poisson spread" in the stage header is jargon for this boundary. "Each case infects a random number, mean 1.5" carries it without the word.
- Minor: the single outbreak drawn first took off, so a learner who taps only "1 outbreak" a couple of times could still believe "Never". The gate requires the +100 run, which saves it.
- 7/7 claims checked.

## 2. Earlier findings

No earlier learner review in company/reviews/outbreak-can-fizzle-above-one/. The boundary is taken from meta.json.

## 3. After reading the brief

- The doesNotKnow item, about 42% dying out by chance, is reached on stage as 38 of 101. The cause the objective asks the learner to explain, that the first cases often infect 0 or 1, has its own readout (49% here, against 56% in the objective's exact figure). The reveal correctly quotes the learner's 49%, not 56%. That meets "Show the why you promised".
- The R = 2 / 3 / 0.9 figures in the reveal are context outside the brief's gap. They are told, which is allowed, but they are attached to buttons the learner pressed and saw empty. That is a moderate W-150 instance for the builder to weigh: run them, or drop the buttons.
- Minors: "Poisson spread" jargon, the reveal frame showing an empty R = 3 stage. No FATAL.
