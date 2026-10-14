# Build note: one-dose-of-acid
- Intent: one chart, both liquids, same doses; water's line falls off a cliff on dose one (pH 7 to 3) while the buffer barely tilts. Ten doses = the brief's 0.010 mol.
- Water pH solved with Kw (dose 0 is exactly 7.00); buffer by Henderson-Hasselbalch with acetate converted to acid. Volume of added acid ignored and recorded as a claim.
- After screenshots: the rotated "pH" axis label collided with tick numbers; moved it above the axis. Recall options rebalanced so the right one is not the longest.

## Revision v2
Fixes from the v1 learner review: the reveal quotes all ten doses, so the reveal now unlocks only after the tenth dose (interact() fires on dose 10; 'Start over' no longer counts); removed the conditional 'you added N of 10' wording. The question now defines pH (lower = more acidic, each unit a factor of ten; new claim c7, unverified) and buffer. A 'Buffer: acetate : acetic acid (mol)' readout (0.100 : 0.100 down to 0.090 : 0.110) puts the buffer's stock of base on the stage, and the reveal refers to it. Hook no longer says only one 'barely notices'. c3 reworded (unverified).

## Revision v2
(Added for the QA contract.) An 'Add the rest, dose by dose' button adds one dose every 0.3 s up to ten, so the gate (all ten doses) is reachable in one tap on a phone while every dose still lands visibly.
