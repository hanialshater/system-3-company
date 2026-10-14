# Build note: sliding-the-cutoff (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "Raise the cutoff. Who slips through?" (slug kept). Terms (flagged, missed, false alarm) defined on stage.
- Controls in DOM order: Raise to 1.5, Lower to 0.5, Better test (toggle), Cutoff slider. Gate: 3 milestones (raised, lowered, better). Readouts show "?" while locked.
- All numbers from errors() in model.ts, the same function that shades the tails. Question numbers (15.9%, 1.5, options 7/16/31) are computed. Recomputed: Phi(-1)=0.1587, Phi(-0.5)=0.3085, 1-Phi(1.5)=0.0668.
- The brief had no "better test" control; added so the reveal's "only a better test shrinks both" is something the learner saw.
- Phone screenshot looked at: fine.

## Revision v2
Learner review (2026-10-13) findings:
- Reveal said the better test "shrinks both at once" but the stage moved only the sick curve, so only one error fell. The better test now moves both curves apart (healthy -0.5, sick 2.5), so both counters fall at the same cutoff, and each readout shows the old test's value beside it. model.ts errors() takes the healthy mean. c5 rewritten to match (unverified).
- No key for the shading: the stage now has a colour legend (red "missed sick", green "false alarm").
