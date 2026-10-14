*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6 wave; first learner review of this lesson): ring-buffer-wraps-around
lesson version: v2
boundary: learner who knows a queue releases items in arrival order and that an array has numbered slots; does not know that a wrapping index keeps the newest N with no copying, or that the write position is count mod capacity (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/ring-buffer-wraps-around/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- Predict: four empty slots in a ring with an arrow at slot 0. The options are 1,2,3,4 / 7,8,9,10 / 9,10,7,8. "7, 8, 9, 10" is the strong pull for someone who thinks the newest four get lined up from slot 0, and "1, 2, 3, 4" catches anyone who ignores overwriting. Nothing leaks.
- Explore: "Write 1" fills slot 0 and swings the arrow to slot 1, with "NEXT SLOT = 1 MOD 4 / 1". "Write up to 10" lands on 9 / 10 / 7 / 8, and each slot shows its overwritten history struck through (slot 0: 1 5, slot 1: 2 6, slot 2: 3, slot 3: 4). Slot 2 is tagged "oldest" and the counter reads "10 MOD 4 / 2". That is where my "1, 2, 3, 4" broke: the struck-through numbers show the overwrites happening in place.
- Both gap items are on stage. Nothing moves between slots, only the values in them change (no copying), and the "count MOD 4" readout changes with every write. The reveal points at both ("5 and 9 landed on slot 0", "10 mod 4 = 2").
- Reveal: every number was seen. The "logs, audio streams and keyboard queues" sentence is claimed context.
- Minor: "Write up to 10" jumps from 1 to 10 in one tap, so on this path the pointer's wraps are seen only as history, not as motion. The single-step "Write n" button exists, and the panel says "one at a time", which is good. A tap-by-tap learner sees the wrap itself.
- Minor: the struck-through history digits are small and grey, and "2 6" reads almost as "26".
- Minor: on this path "Start over" was pressed before the reveal, so the reveal sits over an empty ring while describing 9, 10, 7, 8. The text still matches what I saw a moment earlier.
- Minor: the misconception (a queue must shift items) is never contrasted on stage. Nothing here shows the shifting alternative. "Nothing shifts" in the hook and reveal carries it, which is acceptable because the brief's gap items are both shown.

## 2. Earlier findings

- No earlier learner review exists for this lesson.

## 3. New findings

- See minors. No FATAL.
