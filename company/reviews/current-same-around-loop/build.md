# Build note: current-same-around-loop

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: one loop, a movable ammeter (slider over 4 spots), moving dots for conventional current, 'uses 3.0 V' under each bulb for the energy handed over. Readings hidden nowhere: the locked reading is the question's 0.50 A.
- Earned reveal: unlocks only after the ammeter has been placed between the bulbs.
- After screenshots: the caption claimed 'same reading everywhere' after one spot; it now says so only once all four spots are visited. The reveal quoted 0.50 A at 6 V even if the learner had changed the battery; it now quotes the voltage and current they actually saw between the bulbs.

## v2 (revision 2026-10-13)

Findings from 2026-10-13-learner-adult-beginner.md (revise) and 2026-10-13-fact-check.md (route 1):

- The QA path never put the ammeter between the bulbs (and the gate opened on passing through it): the spot slider is replaced by four spot buttons whose DOM order ends on "between bulbs", so each-button-once leaves the ammeter there. Gate is now <Milestones> 'between' + 'another-spot' (minInteractions 2).
- Reveal quoted 6.0 V while the screen showed 7.5 V: the reveal now quotes the voltage at which the learner looked between the bulbs, and, if they changed the battery afterwards, the current voltage and reading too. The per-bulb drop in the reveal is computed from the current voltage instead of a hard-coded "6 V: 3 V each".
- "Same reading at every spot" pre-empted the discovery: it appears only once all four spots have been visited at the same battery voltage (changing the battery resets the count), and names that voltage.
- Volts, current and energy undefined, with "Bulbs take energy" told by a caption: the predict caption defines A ("charge passing per second") and V ("energy each charge carries"), new claim c7 (unverified). The dots now show the difference: same number and speed everywhere (current), but bright before bulb 1, dimmer between the bulbs, faint after bulb 2 (energy handed over). Bulb labels say "takes 3.0 V". The explicit "Bulbs take energy, not current" caption is gone; the reveal says it after the learner has watched the dots.
- Orange dots unlabelled: the explore caption says "Dots: charge. Bright = full of energy; each bulb drains some." c5 text extended, reset to unverified.
- Fact-check route 1 (3.8 + 3.8 is not 7.5): the battery now steps 2 V from 2 to 12 V, so the drops are whole volts (1-6 V) and always add up. c2 text updated to the new range, reset to unverified.
- "No sense of the loop going round" in stills: not changed; the dots animate continuously in the browser and their fading now marks the direction too.
