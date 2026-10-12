*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: supply-demand (adult beginner)

Boundary used: remembers school arithmetic, buys groceries, has heard "prices" and "shortage" in the news; has never studied economics or read a supply and demand diagram.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots, QA phone screenshots, plus my own Playwright run (chose "Still 40", then nudged the price once, pressed the cap, dragged the price to both ends with the cap on, pressed "Let price move" twice, then opened the reveal).

**Where understanding first broke.** The chart, before I do anything. Two crossing lines labelled "buyers" and "bakers", axes "$2 ... $10" and "0 ... 80 loaves a day", and a green bar "40 sold". I can read that "at $6, 40 loaves", but nothing says why the "buyers" line slopes downward or what a point on it means ("at this price, this many people want to buy"). The three chips "WANT / BAKED / SOLD" do that job once I move the slider ("WANT 55, BAKED 25, SOLD 25"), and I understood the picture only after reading those. Before that, "loaves a day" on the axis is the only clue what x means.

**Prediction.** A real guess. A town caps the price, so a sensible adult says either "more people can afford it, so more sold" or "bakers lose out so less". All three options are live, and my own pull (More than 40) is the misconception the lesson targets. The hook ("What could go wrong?") nudges toward "fewer", which gives away the direction for anyone who reads it as a warning; a learner may answer "Fewer" because the title, "Cheaper bread, less bread?", says so, not because they reasoned. The title is nearly the answer.

**Exploring.** The key moment works: pressing "Cap at $4" makes a red dashed "40 short" bar appear and SOLD drops to 20, with the sentence "40 loaves short. Buyers go without." Seeing WANT go up (60) while BAKED goes down (20) at the same time is the best thing on the stage. "Let price move" then lifts the price in steps (4.5 gives 25 sold) and I see sales rise as the cap loosens, which answers "what would happen without a cap". Problems:
- The panel says "Drag the price down to $4, then try above $6". My real question after seeing the shortage is "but wouldn't the baker just charge more? who stops them?", and the cap button answers it implicitly only.
- The cap is silently dropped when I drag the slider. With the cap on at $4, dragging to $10 shows "80 loaves go unsold. WANT 0" and the "Cap at $4" button still looks available, so I cannot tell whether the cap is still in force. Dragging to $2 shows "80 short" with BAKED 0, SOLD 0 (nobody sells), which is correct in the model but a startling number nothing explains.
- "Let price move" is ambiguous: "move" where, and by how much? It moves one step, in the direction that closes the gap. The label does not say that.
- Above $6 the lesson shows "unsold" and below $6 "short": two new ideas (surplus and shortage) appear without being named, then the reveal uses "shortage" and "surplus" as if already learned.

**Reveal: earned or told?** The $4 result is earned (I saw 60 want, 20 baked, 20 sold) once I press the cap. But the reveal unlocks very early: in my run it was enabled after one nudge of the slider to $6.50, before the cap was ever pressed. A learner can read "Not quite" and the explanation with only a surplus on screen. What is TOLD: "A lower price pulls buyers in and pushes sellers out" (the lines show it, but not named as the cause), "The most loaves change hands at $6" (visible only if I scan prices myself), and "Without a cap, a shortage pushes the price up and a surplus pushes it down" (only shown by one-step presses of "Let price move"; never reached if I skip them). The honest caveat ("A model: straight lines, made-up numbers... Real caps can also bring queues, black markets and lower quality") is good and prominent.

**Layout.** In both the walkthrough reveal screenshot and the QA phone reveal screenshot, the stage shrinks and the bottom of the "Cap at $4" and "Let price move" buttons is cut off by the card edge. They look half-rendered; a learner who scrolls up to try them again sees clipped buttons.

**Findings (problems):**
1. The title "Cheaper bread, less bread?" and hook ("What could go wrong?") nearly give the answer away, which weakens the prediction as a test of the misconception.
2. The reveal unlocks after one nudge (before the cap is pressed), so the central contrast (40 to 20 sold) can be skipped.
3. The cap is silently dropped when the slider moves, while the "Cap at $4" control keeps looking active.
4. What a point on the "buyers" and "bakers" lines means is never stated; the WANT / BAKED / SOLD chips carry it.
5. "Shortage" and "surplus" are used in the reveal but only appear on stage as "short" and "unsold" bars.
6. "Let price move" does not say what it does.
7. Stage buttons are clipped at the bottom of the card in the reveal state (phone).
8. An adult's likely follow-up ("so is a price cap always bad, and what should the town do instead?") is outside scope; the lesson closes with "real caps can also bring queues, black markets", which risks leaving a learner with "price caps never help", a generalisation from a made-up model.

No FATAL flaw found. Controls respond and the numbers shown agree with the stated model (60 / 20 / 20 at $4; 25 sold at $4.50).

## 2. After reading the brief

- Intent: dislodge "capping the price means more people get the good"; objective is that sales are limited by both sides (the shorter side), so below the crossing price fewer units sell and a shortage appears. The "short" bar and the WANT 60 / BAKED 20 / SOLD 20 chips deliver exactly that; this matches the brief and is the strongest part.
- The brief's boundary says the learner already knows "people buy more when it is cheaper". That is the half of the picture the lesson relies on being intuitive, and the first move is to show the other half (bakers bake less). The lesson does not state the second half in words until the reveal ("pushes sellers out"); on stage it is only the BAKED chip and the bakers line.
- The objective claims the crossing price is where the most units change hands. That is a second objective inside a 75-second lesson; it is only visible if the learner scans prices, and the reveal can open before they do.
- The brief's recall question (taxi cap) is a different surface for the same idea; I did not take it. Noted only because it suggests the intended transfer is to cases the learner has not seen on stage.
- The claim "real caps can also bring queues, black markets and lower quality" is `unverified` along with the other six claims; the model label is on screen, which suits the caveat.

Verdict: revise
