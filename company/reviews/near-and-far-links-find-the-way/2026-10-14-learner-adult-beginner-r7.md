*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): near-and-far-links-find-the-way
lesson version: v2
boundary: adult-beginner (same tag as r6). Knows small worlds have short paths. Has never met greedy routing or link-length distributions.
Screenshots seen: yes (artifacts/walkthroughs/near-and-far-links-find-the-way/sheet.png, 6 frames, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as an adult who has heard of "six degrees of separation" and has never met greedy routing or Kleinberg's small-world model.

1. **Predict is mostly clean.** The locked stage is an empty ring with "?" and a "RING ONLY 500" baseline. The options are three link rules worded at the same precision. One mild tell: the hook "Random long links reach farthest. Do they help a message find its way?" is phrased so the expected answer is "not as much as you think". That nudges against "Uniformly random", which is the misconception option. It is milder than a statement, and the 1/d² lure remains, but a test-wise reader will hear it.
2. **The numbers land.** Each rule button runs 1,000 messages and fills a mean: 38.3 / 28.5 / 212.6, against a ring-only 500. 1/d² being far worse is a real surprise, and it is on the stage.
3. **The why is a text tally, not a picture.** The cause the reveal gives ("1/d links came at every scale, so wherever the message is, some contact cuts the remaining distance") rests on the coloured tally "near 41% · middle 30% · far 29%" beside "near 1% · middle 10% · far 89%" and "near 95% · middle 5% · far 1%". That is a stand-in, and the reveal points at it ("Look at your link tallies"). But the ring drawing itself does not show the mechanism. Nothing shows where a uniform message spends its steps (the reveal says "the last stretch crawls along the ring"), and under 1/d² the near links are too short to see. I believe "every scale" because of the tally. I did not watch it work.
4. **The ring is clipped.** In the explore frames the top of the ring runs off the top of the stage, and the start and target dots sit near the edge. The single-message path (yellow) is thin and partly hidden by the 50 red chords in the uniform frame. "Next message" shows a new step count (97), but I could not follow the path in the picture.
5. **Stage text is over budget.** The legend, three tally lines, four readouts and a caption are on screen together, roughly 45 words.
6. **The reveal quotes what I saw.** Every mean and tally it names is still on the stage when it opens. The Kleinberg sentence is one told context line.

What the prediction felt like: "Uniformly random" felt right ("farthest is best"), and 38.3 vs 28.5 corrected me only modestly. The 212.6 for 1/d² was the stronger surprise.

Verdict reasoning: a first-time learner gets "1/d wins, and a mix of lengths is why" from the readouts and tallies on the stage. The picture adds little, but the stand-in is there and the reveal points at it.

## Earlier findings (r6), checked after the findings above were written

1. Revise: the most prominent number was the single message (29 vs 30), which contradicted the answer: **fixed.** The ring's centre now shows the 1,000-message mean (38.3 / 28.5 / 212.6), and the single-message count moved to the caption.
2. Revise: no stand-in for "links at every scale": **fixed with a text stand-in.** A "Links by length" tally (near / middle / far) now appears per rule, and the reveal points at it. The ring itself still does not show where a uniform path wastes its steps near the target (finding 3 above). That part is not fixed.
3. "∝" undefined: **fixed.** The options now read "Chance falls with distance" / "…distance squared".
- Note: r6 called the hook neutral. I read a mild nudge against the uniform option (finding 1). Minor.

## Verdict

Launch. The means and the length tallies carry the idea on the stage, and the reveal quotes them. Polish, not blockers: un-clip the ring, cut the stage text, and consider drawing where the uniform message crawls.
