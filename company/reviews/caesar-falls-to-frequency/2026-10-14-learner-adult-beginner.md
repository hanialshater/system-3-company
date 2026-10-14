*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: caesar-falls-to-frequency
lesson version: v1
boundary: an adult with school-level maths, new to cryptography (has heard of "secret codes", does not know letter frequency is a tool).
Screenshots seen: yes (sheet.png, 6 frames, phone viewport)

## 1. From the artifact

- Prediction: "most common cipher letter is X; what is the shift?" Options 3 / 19 / 23. A good set: 3 is the "Caesar used 3" folk answer, 23 is X's own position (the trap I would fall into if I counted A=0 to X). I chose 3. It felt like a real guess, not a giveaway.
- Explore: the bar chart is the right picture. The yellow bar (X) towers over the rest and the green-outlined E slot sits empty; "shift back until the tallest bar sits on E" is a clear instruction. Step-by-step −1/+1 and the slider show the bars sliding and the text staying gibberish.
- "Tallest bar to E" does the job for me in one tap (shift 19, plain text appears in green). It is the moment of the lesson and it lands: the message reads instantly. Mild worry: the button is visible and highlighted before I predict, so a learner who taps it first is handed the method rather than finding it; acceptable for 60 seconds.
- Reveal: "You tried 5 shifts" matches what I did (0, 25, 19, 20, 21 via the slider). It quotes shift 19, which I visited. The values quoted are all ones I saw. Not the "unvisited value" pattern.
- Small mismatch: when the reveal opens, the stage still shows shift 21 (tallest bar C, gibberish) while the text says "At shift 19 the tallest bar landed on E". A beginner reads the reveal against a stage that contradicts it. Not blocking, since I saw 19 a step earlier.
- Phone clipping: the reveal text is fully visible, including the Al-Kindi line and the trust link. No clipping.
- Where understanding first broke: nowhere material. "Shift back" vs "the shift" (forward 19 to encrypt, back 19 to decrypt) could confuse someone, but the slider label and the answer agree.
- Reveal earned: yes for "the tallest bar points at the key"; "shifting keeps how often each letter appears" is told but the sliding bars show it.

Fixes (owner: builder): optionally jump the stage to shift 19 when the reveal opens, so text and picture agree.

## 2. After reading the brief

- Objective: shift keeps counts, so lining the most common cipher letter up with E finds the shift (X, 19) without trying all 25. The artifact shows exactly this path; the misconception ("unreadable without the key") is directly contradicted by the green plain text appearing.
- Recall question (H, so shift 3) is a fair near-transfer.
- Claims are recorded with sources/derivations and fact-checked; I cannot vouch for them myself.

Verdict: launch
