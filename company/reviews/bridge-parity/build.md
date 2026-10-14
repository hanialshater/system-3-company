# Build note: bridge-parity (demo-builder, 2026-10-13)

- Intent: a simplified Königsberg diagram with 4 land areas and 7 bridges, using Euler's connections (not to scale). The 7 bridges are round buttons laid over the map. From where you stand you can cross any unused bridge that touches your place (outlined); the others are disabled. A dashed trail shows the walk.
- "Count bridges" puts a badge on each place (odd = yellow, even = green), with the caption "passing through uses two". "Close bridge 7" switches to a 6-bridge map with only two odd places, where a full walk exists. "New start" cycles the starting place; "Restart" clears the walk.
- Key states (two milestones): stuck on the 7-bridge map with bridges left; the counts shown. The bridge DOM order is chosen so that QA's single in-order pass from the North bank walks N-I-N-E-I-S-I and gets stuck on the Island with bridge 7 left. The Count toggle comes next.
- The reveal quotes where the learner got stuck and how many bridges were left. It adds the 6-bridge success only if the learner achieved it. The counts (5, 3, 3, 3) come from degree().
- Locked: no walker or trail is drawn, and the readout shows "?".
- Deviation from brief: "attempted routes" is one stuck route (one milestone). Every route gets stuck, and the parity count carries the proof.
- After screenshots: the walker dot sat on the "North" label, so the walker, label and badge now have separate positions. The reveal lists the counts largest first. Control labels were shortened to keep the stage text near 25 words.
- All claims unverified, for the fact-checker.

## Revision v2

From the adult-beginner learner review. Count tags now sit on the place names (pill beside the name, not a circle like a bridge). Rings on the learner's own walk show each pass-through using 2 bridges (in and out), with a caption. Closed-bridge-7 state now has a caption saying why (only 2 odd places, try all 6). Reveal says 'on the full seven-bridge map the counts are 5, 3, 3, 3', so it no longer clashes with the 3, 5, 2, 2 on the stage. Claims c4 edited, c5 and c6 added.
All new or edited claims are unverified, for the fact-checker.
