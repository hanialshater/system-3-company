# Build notes: parallel-of-most-land

## v1 (2026-10-13, wave 4)
- Brief #32. `gen.mjs` (committed) writes `parallels.json`: every whole-degree parallel from 80°S to 80°N, 3,600 samples at 0.1° against the kit land polygon. It runs in about 90 s and is deterministic. Results: equator 21.4%, 40°N 45.3%, 65°N 77.4%, 60°S 0%, 40°S 3.7% (these match the brief).
- Brief wrong in passing: 65°N is not the most land-covered parallel on this data. 66°N has 79.6%, and 79°S (Antarctica) has 79.9%. The reveal therefore says "of the three, 65°N" and makes no claim about a global maximum. Antarctic figures (70 to 80°S) appear only as slider readouts.
- One map, not the brief's orthographic globe: an equirectangular map, where a parallel is a straight horizontal line and its land runs can be read whole. Labelled on the stage.
- Key state: 65°N visited and a parallel from 40°S to 60°S visited (milestones `far-north`, `south`). The preset buttons Equator, 40°N, 65°N and 60°S come first, so QA reaches both milestones and sees every value the reveal quotes. The reveal lists only the values the learner reached. It names at most two southern parallels.
- Phone iteration 1: the reveal listed every slider stop. Capped at two. The far-north gate was tightened from 60 to 70°N to exactly 65°N, so the 77% it quotes is always a number the learner saw.
- c5 (most land is in the north) is from memory; the stage shows it only parallel by parallel.
