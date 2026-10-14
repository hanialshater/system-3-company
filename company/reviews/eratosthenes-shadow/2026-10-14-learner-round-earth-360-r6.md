*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: eratosthenes-shadow (r6)
lesson version: v1
boundary: the lesson's own. Knows that the Earth is round and that a full circle is 360 degrees; has never seen how the Earth's size was first measured, or that a shadow angle and one distance are enough.
Screenshots seen: yes (artifacts/walkthroughs/eratosthenes-shadow/sheet.png, 5 frames, walkthrough recorded 2026-10-14 against build 3 on localhost:3470; walk chose option 1 "7 times")

## 1. From the artifact (written before reading any earlier review)

- **No answer before the commit.** Title "Measure the Earth with a shadow" and hook "...sized the whole planet with a stick and a walk. How?" do not point to an option. Options "7 times / 50 times / 360 times" are all whole numbers at the same precision. Locked stage: readouts show "?" for arcs and circumference; the slider sits at 20.00° with 20.0° drawn at the shadow and at the centre. Nothing drawn matches 50. Passes. (The same-angle-at-centre picture is visible while locked; that shows the mechanism, not the answer.)
- **Prediction felt like:** with 360° in my head and 7.2° in the question, I can divide and get 50, so this is an arithmetic question for anyone who trusts the set-up. The guess that matters is "is the shadow angle really the angle at the centre?"; the options do not test that, they test division. "7 times" is the surface trap.
- **Where understanding first broke:** "a well in Syene has no shadow". Nothing says this means the Sun is straight overhead; the vertical dashed line at Syene is the only hint. "Stadia" is an unknown unit (fine to treat as "some unit").
- **Explore:** "The account: 7.2°" fills ARCS 50 and 250,000 stadia; "Modern: 7.11°, 843 km" gives 50.6 and 42,684 km; the slider (7.13°) gives 50.5 and 42,564 km. The picture responds. At 7.1° the angle at the centre is a thin sliver with a tiny pale label; on a phone I cannot see the "same angle" any more, only read the readout.
- **The reveal quotes what you saw: fails on two counts.**
  1. The reveal's first paragraph is built on "7.2° ... 50 × 5,000 = 250,000 stadia". When the reveal opens (frame 05) the stage shows 7.13°, 50.5 arcs, 42,564 km, 843 km. The quoted 50 / 250,000 stadia state is not visible on the stage at reveal time (no trace, row or readout keeps it).
  2. "Modern numbers give 7.11° and 843 km, so about 42,700 km": the stage showed 42,684 km for that state, and shows 42,564 km now. 42,700 is not the stage's rounding. My own current state (7.13°) is never mentioned.
  "40,008 km" and "within 7%" were never on the stage; acceptable as one told comparison, but it is the number the second paragraph rests on.
- **Did the reveal answer my question?** Partly. "Rays arrive parallel, so the shadow's angle is also the angle at the centre" is the answer to the question I actually had, and the dashed parallel lines on the stage stand for it. But the reveal points at numbers that have left the stage instead of at the picture.
- **Reset:** the walkthrough does not press Reset, so I cannot confirm the milestone values survive it.

## 2. After reading the earlier review (2026-10-13-learner-adult-beginner.md)

- The earlier review used a different boundary (adult map user, no geography) and was written without the screenshots being seen by the launch reviewer. Its observations match mine on the traps, the unexplained "no shadow", the tiny angle labels and 40,008 km being told.
- It accepted "42,700" as a rounding of 42,684. Under the new rule "it uses the stage's rounding", that is now a finding, and the 250,000-stadia state is not on the stage at reveal time. Its "launch" predates the "No answer before the commit" and "The reveal quotes what you saw" rules; under them I disagree.

## Findings for the builder's owner (problems, not fixes)

1. Reveal quotes 50 / 250,000 stadia, which are no longer visible on the stage when the reveal opens.
2. Reveal says "about 42,700 km"; the stage showed 42,684 km for that state and shows 42,564 km at reveal time.
3. At the real angle (7.1–7.2°) the angle at the centre is too thin and its label too small to be seen on a phone, so the parallel-rays mechanism is read, not seen.
4. "No shadow at Syene" is never connected to "Sun straight overhead".

Verdict: revise (findings 1 and 2 break "The reveal quotes what you saw"; no fatal flaw: no false claim, no dead control seen)
