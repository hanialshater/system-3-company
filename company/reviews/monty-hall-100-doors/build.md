# Build note: monty-hall-100-doors (demo-builder, 2026-10-12)
- Intent: 100 tappable doors. Pick one, the knowing host opens 98, then tap yours (stay) or the door marked "other" (switch). "Play 100 rounds" plays seeded rounds both ways so 99/100 shows up as a tally. The 10- and 3-door options let the learner compare the gap. The seeded logic lives in model.ts so claim c5 can be re-run.
- The reveal unlocks after 2 meaningful events: a finished round or a 100-round batch. Changing the door count does not count. Known gap: a learner can meet the gate entirely at 3 doors. When that happens, the reveal names the door count behind their tally.
- After screenshots: the 100-door grid was clipped at the bottom on a phone. I merged the control rows, dropped "Next round" (tapping any door starts the next round) and shrank the doors to 24px. I also fixed "1 empty doors" and labelled the offered door "other".

## v2 (revision 2026-10-13)

Source: 2026-10-13 learner-adult-beginner review and fact-check. Finding -> change:

- 99% not visited by default; reveal quoted 3-door tallies -> tallies kept per door count; gate = 'Play 100 rounds' at 100 doors (that button now first in DOM so QA reaches it at 100 doors). Reveal quotes the learner's tallies for every size played.
- Host-knowledge point told -> new 'Guessing host: 1,000 rounds' button: host opens doors at random, rounds where he hit the car are thrown away; readout shows kept rounds and stay/switch wins (close to even). Not gated. Claim c5 rewritten, unverified.
- Empty stage layout -> not changed beyond reordering controls; grid of 100 doors appears once a round starts (see phone-2 screenshot at 3 doors). Hook left (neutral question).

## Revision v3 (batch 02, 2026-10-14)

Hook no longer leans. Stay/switch tallies moved above the doors so they are not clipped on the phone; the guessing-host readout is labelled "Rounds kept (he missed the car)".
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
