# Build note: loophole-lap-farming

- Intent: one 100-step timeline: blue segment = looping (a dot per buoy collected), orange = sailing 20 steps to the finish, green flag if the finish is reached by step 100, otherwise "time up". Presets Finish now / Leave at 40 / Leave at 80 / Never leave, then a slider (step 4) for the leave step. Score under the timeline; best-so-far and buoy readouts.
- Brief asked for a draggable marker only; presets added so the QA path (one press each, slider two arrow presses) reaches the key state.
- Milestones: "saw-best" (score 300) and "saw-loop-only" (never finishing, with buoys), both reached by the presets in DOM order. Score hidden while locked.
- Node check of best(): leave at 80 → 300; finish now 100; never leave 250; leave at 84 → 210. Options are computed from score().
