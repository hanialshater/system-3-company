*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (round 2): binary-fingers
lesson version: v1
boundary: an adult beginner who counts on fingers to ten; has heard "computers use 1s and 0s" but cannot say what that means.
Screenshots seen: yes (sheet.png, 13 frames, phone viewport). Re-review after the kit fix for clipped reveals (W-135); written fresh from this walkthrough.

## 1. From the artifact

- Prediction: each of 10 fingers up or down; how many different numbers (0 included)? 10 / 100 / 1024. A good misconception test on its own.
- Leak: the locked stage already shows the ten fingers labelled 512, 256, 128, 64, 32, 16, 8, 4, 2, 1 (faint but legible). One finger alone is worth 512, so 10 and 100 are ruled out at a glance, and 1024 is the only option left. The hook ("Unless each finger means something different") plus the labels give the answer before I think.
- Explore: raising fingers from 512 down with the running sum ("896 = 512 + 256 + 128", then "8 fingers up: 1020") is satisfying; 10 fingers up: 1023. "All down": 0. Clear and tactile.
- Reveal: 1023 and 0 were seen; "1023 + 1 = 1024" is the right small step and I can check it. "You made 10 different numbers on the way" matches my taps. No unvisited values.
- The doubling argument ("it can be down (all the old numbers) or up (all of them again, plus its value)") is told; the left-to-right path of the QA order never shows "adding a finger doubles the count". Fine for 60 s.
- Phone clipping (the reason for round 2): fixed. Full reveal and trust link visible. The reveal frame stage still shows all fingers down (after "All down"), which matches "0" and is fine.
- Where understanding first broke: nowhere; the problem is that the prediction was answerable from the labels.
- Reveal earned: yes for 1024; the doubling reason told.

Fixes (owner: builder): hide the finger values until the prediction is locked (show plain fingers), then reveal the 512 … 1 labels as the first explore moment ("each finger now means something different").

## 2. After reading the brief

- Objective (each finger doubles the patterns; 0 to 1023, 1024 numbers) is delivered for the count; the doubling reason is told. The misconception ("only ten, or at most a hundred") is exactly options 1 and 2, which the visible 512 label rules out before commit.
- 4 claims verified by others; I cannot vouch for them. Round-1 clipping resolved on this build.

Verdict: revise
