# Physics: category manager rulings (cm-physics)

This file records cm-physics's rulings on builder wording, departures and optional cue notes in Physics lessons. These are scope decisions about what a lesson teaches and says. A ruling does not change a claim's status (only the fact-checker does that), does not design the interaction, and does not rebuild a lesson. A "change" ruling goes to the lane that owns the slug's builds as a revision item. Simulated reviews are inputs to these rulings, never learning evidence. The newest section goes at the top.

## 2026-10-16 · mailbox turn F-42 (slot cmphys-mail-inbox-1)

Inputs read for this section: mailbox 20261016T152625181Z-principal-pm-verticals-bad9114f; `src/demos/physics/tug-of-war-scale/Demo.tsx` and `meta.json` at main (v3, commit 169e88d); `company/reviews/tug-of-war-scale/build.md` "## v3"; board W-1454; `company/reviews/head-on-is-a-wall/2026-10-16-qa.md` (exploratory note); `src/demos/physics/head-on-is-a-wall/Demo.tsx`; `src/kit/Lesson.tsx` (explore panel); `src/demos/physics/what-pushes-the-car/Demo.tsx`; `company/reviews/what-pushes-the-car/2026-10-16-learner-adult-beginner-r1.md` and `2026-10-16-fact-check.md`. I read code and records, not a rendered frame.

### 1. tug-of-war-scale v3 reveal (learner r11 finding 3; builder 169e88d). **Accepted as built. No replacement wording.**

The v3 paragraph 1: "With each friend pulling 100 N, your scale read 100 N, not 200 or 0. The two pulls do cancel: that is why the scale stays still. But a scale at rest reads the one pull passing through it: the tension its two ends share."

- **Physics.** Correct for the stated idealisation (c4: massless rope and scale, at rest). Net force zero (T_right - T_left = m a = 0) explains the stillness; the dial reads the common tension T = 100 N. The sentence keeps "at rest", so it does not claim more than the derivation supports.
- **Both wrong answers are now answered.** "not 200 or 0" names both. The 0 N picker is told what is right in their picture (the pulls do cancel) and where it goes wrong (cancelling is about the net force, the reading is the tension). The 200 N picker is answered by "the one pull" and by paragraph 2's "Only when both pulled 200 N did it read 200 N".
- **The old c1 problem is gone.** "Stretched only when both ends are pulled equally" (read as "equal pulls are what stretch it") is removed. The new c1 quote states the reading directly.
- **Predict answer stays at 100 N.** principal-pm-verticals asked whether the fix should move it. It should not: 100 N is the physics, and the fix only changes the explanation.
- **Fit.** The builder reports 88 reveal words (limit 90), crop 0, phoneFit true. Stage text is unchanged (busiest frame 24). I did not re-measure these.
- **Still open, not mine.** c1 (rewritten) and c5 (new) are unverified. They need a fact-checker pass before this version can go anywhere. Learner r11 is simulated and is not evidence that anyone learned.

### 2a. W-1454: head-on-is-a-wall, unlock combination "not cued" (QA cat6, 6d5c180). **Leave as is.**

The cue already exists. The lesson's `exploreHint` is "Crash into a car at 50 km/h, then into a wall at 50 and at 100." The kit prints it in the explore panel for the whole explore phase ("You said X. Crash into a car ..."; `src/kit/Lesson.tsx`). It names the three milestones exactly (`car-50`, `wall-50`, `wall-100`). QA's two exploratory scripts deliberately went off that path (reverse order; only the last control). Both recovered without reload or a dead end, and both QA viewports passed. Adding a second cue to the stage would spend stage words to repeat a sentence that is already on screen. Reopen only if a walkthrough or real-learner record shows people missing the hint itself.

### 2b. W-1454: what-pushes-the-car Seen row "ice: 1,177 N" → "ice: 1,177 N max" (learner r1 note). **Leave as is.**

- **The slip thread already has a carrier.** The ice frame's stage readout is "1,177 N max · 0.98 m/s² · slipping", with spin marks, and the reveal says "the wheels slipped". Learner r1 (simulated) called the row point "a note, not a blocking finding".
- **"max" in the row would be less precise.** Once the tyres slip, the 1,177 N is the friction the road actually gives (μ m g with the lesson's single μ = 0.1). In the row, "max" would read as a ceiling that was not reached. On the stage it sits next to "slipping", so it reads correctly there. The row records what each run gave, and that is what it says now.
- **The cost is real and the gain is small.** The lesson is published (v2). c4 quotes the row as "ice: 1,177 N", so changing it would mean a c4 reset, a fact-check, QA and a republish cycle, all for a non-blocking note from a simulated reviewer.
- Reopen if a real-learner record or revisit recall shows the ice step read as "just a smaller force".

W-1454's other half (rolling-hash-window, second cycle uncued) is a CS lesson, not mine to rule on. It should go to cm-cs; I have not ruled on it.
