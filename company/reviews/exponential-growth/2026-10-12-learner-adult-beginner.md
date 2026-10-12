*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: exponential-growth

Knowledge boundary used: remembers school arithmetic (fractions, halving, percentages roughly), everyday life (ponds, algae, savings accounts); has never studied exponential growth or powers of two. Phone viewport. Method: transcript + screenshots (walkthrough and QA phone), plus my own Playwright run (every day from 30 back to 0, the slider to its minimum, a wrong prediction).

## 1. From the artifact (written before reading the brief)

**Where understanding first broke.** It did not break in the stem; it nearly broke in the choices. The stem is clear: "Algae doubles its area every day. On day 30 it covers the whole pond. How much of the pond did it cover on day 25?" The first snag is the options: "About 83% (25 of 30 days)" is written so that its reasoning is spelled out, so it reads as the trap, not as something I might believe. "About half" is the answer I would lean to if I rush ("day 29 is half, so surely day 25 is... about half?") and "About 3%" looks like the odd one out. I could guess; I could not tell which of three is the "clever" one without doing the halving in my head. The title "The pond that fills overnight" does not match "30 days" and made me expect something sudden happening in a night.

**Did the prediction allow a real guess?** Yes, better than most. The doubling rule is stated, three plausible numbers are offered, and a person can reason backward ("day 29 is half, day 28 is a quarter...") or go with a gut feeling. A learner who works it out already gets 3% before exploring, so for them the lesson confirms rather than teaches; the gut-feel learners are the ones who get corrected. The full green pond at 100% is shown while predicting, which helps rather than gives away.

**Did exploring answer the learner's actual question?** Mostly yes. My question after locking in was "what does it look like on day 25?". The slider and "− 1 day" let me walk back and see the green square halve each time, with the caption giving the fraction ("Day 28: 1/4 covered. 75% is still open water."). Driving it myself, day 25 shows a small corner block at 3.13% and day 20 is a speck captioned "Easy to miss"; day 0 reads "1/1,073,741,824 covered, too small to see. The circle marks it." with a dotted red circle in the corner, which is a good honest move. Problems:
- "Show me why" unlocks after one "− 1 day" (day 29, 50%). A learner who predicted "about half" sees day 29 = half and may feel confirmed (I was tempted) before ever reaching day 25. Nothing makes me land on day 25, the thing the question asked about.
- The walkthrough transcript's own run bounced between day 30 and day 29 six times and reached the reveal having seen only half. The reveal is therefore told, in that run, what 28 and 25 look like.
- Captions switch style: "half the pond is still open water" at day 29, "1/4 covered. 75% is still open water" at 28, then "Easy to miss" from day 23 with no percentage in the caption (the COVERED tile still shows it). The change is jarring, though the tile helps.
- At 30 the stage reads "100%" in a box with no visible grid; the grid only appears as it empties, so the 1/1024 unit squares promised in the locked text ("Each small square is 1/1024 of the pond") are hard to find. I never matched the "tiny square out of 1,024" in the reveal to anything I could count.

**Was the reveal earned by what was SHOWN or only TOLD?** Mostly shown for 29, 28 and 25 if I walked back; told for the rest. These parts are only told: "Most of the pond fills in the last two days, so a pond that looks 97% clear is five days from full" (I saw 96.9% at day 25 only if I stopped there), and "Doubling 30 times multiplies by more than a billion" (visible only if I dragged to day 0; I would not know to). The sentence "Doubling hides at first and then arrives all at once" is the point of the lesson, and it is a sentence; the slider could show it but I was not asked to compare day 25 with day 30 side by side. As a wrong-guesser I read "Not quite: it was 'About 3%'" and the explanation matched what I saw.

**What is missing for a beginner.** I never got "why halving is the right way to run it backward". The step from "doubles each day" to "each day back halves it" is stated in the reveal without being named as a step. Someone who does not see that goes along because the slider agrees.

### Findings (problems)
1. "Show me why" unlocks after one step back (day 29, 50%); the day 25 value the question asked about does not have to be seen, and a "half" guesser is partly confirmed by day 29.
2. The central idea ("hides at first, arrives at the end") is a sentence in the reveal. Nothing contrasts early days with the last days in one view.
3. The first option ("About 83% (25 of 30 days)") names its own flawed reasoning, so it reads as the decoy.
4. Title "fills overnight" clashes with a 30-day story.
5. The unit squares (1/1024) mentioned in the locked caption and in the reveal are hard to see or count at day 20; "Easy to miss" gives up without helping me find it.
6. The "more than a billion" line only appears in the reveal and is shown only if the learner drags to day 0.
No fatal flaw found: no dead controls (slider, both buttons, Show me why all worked), and nothing I read was false on its face.

## 2. After reading the brief

- Intended misconception: growth proportional to elapsed time (25 of 30 days means about 83%). The first option is exactly that belief, so the prediction targets it directly. My finding 3 is a trade-off: stating the reasoning in the option makes the misconception explicit, but also flags it as the decoy.
- Objective: explain why the pond is half full one day before full and about 3% five days before. The slider gives both numbers. But the objective is "explain", and the lesson allows leaving after day 29, so the day-25 half of the objective is optional.
- The hook is the question itself, which suits the intent. The title "overnight" is not explained by the brief either.
- The recall question (a hospital doubling every 3 days) needs the extra step "12 days is 4 doublings"; the lesson never showed a doubling period other than one day. Not seen in the walkthrough, so I cannot judge transfer.
- Claims c1 to c5 are all unverified; c5 (The Limits to Growth) never reaches the learner in the lesson body, only in the trust sheet.

Verdict: revise
