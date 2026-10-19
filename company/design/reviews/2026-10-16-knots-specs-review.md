# Design review: unknot-game and left-or-right specs (W-1568), plus the tricolour arc-set decision (W-1583)

design-lead (Ines) · 2026-10-16 · worktree branch `worktree-agent-a3cea43283ee13865` (from `ccr-4c6c7654-ew9ko1` at f60cf0f9)

**What is reviewed:**
- `company/design/specs/unknot-game.md` and `unknot-game.svg`;
- `company/design/specs/left-or-right.md` and `left-or-right.svg` (version B2 is the build: cm-math-discrete, W-1581, `company/domains/briefs/math.discrete.md` "Spec rulings (W-1581)").

Both are the interaction designer's (Rafael). I did not write either, so this is not a self-review.

**Measured against:** my contact-sheet ruling `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S4, C1 to C6, the tint condition).

**Read alongside:**
- the principal engineer's card ruling, `company/engineering/reviews/2026-10-16-knots-left-or-right-card.md`;
- the visual designer's colour ruling W-1580, `company/design/reviews/2026-10-16-knots-colour-ruling.md`;
- `tests/qa/contract.spec.ts` (how the QA path presses controls and what counts as "did something").

**Out of scope:** what to teach, the words, and A or B (cm-math-discrete, W-1581, already ruled). Colour values (visual designer, W-1580).

**Order:** artifacts first. I rendered both mockup SVGs at 1 CSS px per px in scratch (Chromium) and looked at every row before reading the specs' prose. I then reran `node company/design/specs/knots-batch1-mockups.mjs` (it reproduces the spec's numbers, including the 7.0) and wrote my own probe, `2026-10-16-knots-specs-review/badge-probe.mjs` (kit only; rerun from the repo root).

## Verdict

| Spec | Verdict |
|---|---|
| unknot-game | **Approved with changes:** U-1 and U-2 below. Both are small, and neither changes the control set, the tint or the QA path. |
| left-or-right (B2) | **Approved with changes:** L-1 to L-6 below. L-1 (badge ring radius) and L-2 (Mirror is a dip, not a cross-fade) change what the builder makes. |

The briefs are already marked ready to build (W-1581).
- **A builder must apply the changes below even before the spec text is updated.** They bind as conditions of block (b)'s lift, per the contact-sheet record's S4.
- The interaction designer folds them into the specs (board).

## unknot-game

**Accepted as specified:**
- **Tint.** It goes on one strand only: the R2 edge that is over at both ends.
  - The width is 3 units against 2.
  - The caption swatch is in the same colour, and the tint never uses `--good-fill`.
  - This meets my tint condition exactly. In the mockup's strip of all 7 single switches, the tinted strand runs into the ringed crossing every time, and the other strand of the lens is visibly cut at both ends.
  - The visual designer confirmed the colour (W-1580): `--domain` in dark, the 70 % mix in light (4.30:1, and dE 27 or more against `--fg` in every simulated vision type).
- **The DOM order** crossings, then Reset, then Trefoil, then Figure-eight. I checked it against `tests/qa/contract.spec.ts`:
  - The contract counts the controls once after predict (6 on 3₁).
  - It re-queries `nth(i)` each time and skips disabled controls (line 75).
  - So the path is: crossing 1, crossing 2, crossing 3 (`allThree`), Reset (enabled, because crossing 3 is switched), Trefoil (disabled, skipped), Figure-eight. Every press changes the stage fingerprint: the SVG path attributes, or the readout and tally text.
  - Putting the chips last is what makes the trefoil row reach 3 of 3. The order is right.
- **The disabled-chip rule.** The current chip is `disabled` with `aria-pressed="true"`.
  - Without it, pressing the current chip changes nothing and fails "every control does something".
  - Reset disabled when nothing is switched follows the same logic. Accepted.
- **Two always-shown tally rows** (cm-math-discrete accepted them for content). As a picture they read at 290 px. The busiest frame is 22 words.

**Changes:**
- **U-1. A selected chip must look selected, not disabled.**
  - `disabled` is a QA and keyboard fact, not a look. Style the current chip with the kit's selected or on style (the filled chip in the mockup), never the greyed disabled style. Otherwise the learner sees two dead buttons at predict end and cannot tell which knot is showing.
  - Reset, when disabled, does use the greyed style.
  - Applies to left-or-right's chips too.
- **U-2. Crossing buttons: `pointer-events` only on the 44 px circle, and never a visible fill.**
  - The faint `--line` ring is fine. A filled disc would cover the gap the learner is meant to watch move.
  - On 4₁'s right-hand crossing (the beak, contact-sheet finding 3), the tint after switching crossing 1 is a short strand inside the tightest lens. That is accepted as drawn. I check it on the built sheet (S4) and do not rule on it now.

## left-or-right (B2)

**Accepted as specified:**
- **Structure:**
  - a mirror wrapper around a two-sided card;
  - the back face pre-rotated, with content authored already reflected;
  - `backface-visibility: hidden` with the `-webkit-` prefix.
  - This meets C1 and C2, and PE-C1. The spec's four-state table is the measurement PE-C4 asked for, and K21 confirms the screen signs.
- **Marks outside every transformed element (C4).** Both the readout and the badges.
- **Hiding marks during the flip: accepted.**
  - Mid-flip, the badges would sit at positions that belong to neither face, and the C4 rule ("at the crossings of the face on show") has no answer there.
  - Fading them out at the press and back in at rest is the honest choice. See L-3 for the exact timing.
- **Mirror as `scaleX(-1)`: accepted, and not animated as a scale.**
  - The spec is right that an animated scaleX through zero width looks exactly like turning a card over, and would teach the misconception.
  - But "cross-fade" is the wrong word for this transition. See L-2.
- **Dropping Reset: accepted.** `company/design/formats.md` line 24 says "No reset that empties it". Every control toggles back, and a chip returns to rest. cm-math-discrete accepted it for content (W-1581).
  - One consequence for crit: demo-standard Pre-flight 6 ("press Reset last") has nothing to press here. The design review of the build records it as not applicable, not as a miss.
- **DOM order and chips last.** The QA path is Turn over, Mirror, Trefoil (skipped), Figure-eight.
  - Turn over changes the seen line on its first press.
  - Mirror changes the readout.
  - The chip changes the knot.
  - All three are visible to the fingerprint.
- **The mid-flip on 4₁: accepted. I do not ask for a faster flip or a different easing.** My numbers (`badge-probe.mjs`):
  - With CSS `ease-in-out` over 300 ms, the card spends **53 ms** between 63° and 117°, the band where 4₁'s closest strands touch. That is about 3 frames at 60 Hz.
  - Linear would spend 90 ms there, and a steeper in-out cubic 33 ms.
  - In that band the face is under 45 % of its width (under 130 px at 290). It reads as a card mid-turn, not as a diagram. Nothing is labelled, and the marks are hidden.
  - Nobody is asked to read crossings there. What the learner must read are the two rest frames, which are the cleared pictures.
  - A steeper curve would make the turn feel like a snap and hide the motion that carries the idea (the card going over). So I keep `ease-in-out`, 300 ms.
  - I confirm on the built sheet (S4) and on a real phone recording if one exists. If the learner review reports a flicker read as a knot change, this comes back to me.

**Changes:**
- **L-1. Badge ring radius 13 units, not 10, and a tested floor.**
  - The spec's 7.0 units (centre of badge to centre of strand) is right, but it means very little room:
    - 7.0 − 4.6 (badge) − 0.25 (badge ring) − 1 (half the stroke) = **1.15 units** of background between the badge and the strand;
    - that is **2.9 px at 290 and 2.6 px at 260**, less than one stroke width (5 px).
  - In the render, that badge touches the knot.
  - **Correction to the spec text.** The tight one is **4₁'s crossing 0, the right-hand beak** (x 96.4 on the front, 3.6 turned), which is contact-sheet finding 3. It is not "the centre crossing / the right lens": the centre crossing's badge has 1.83 units.
  - Results by ring radius (all four rest states, both knots):

    | Ring radius | Smallest gap | At 290 px | At 260 px |
    |---|---|---|---|
    | 12 | 1.79 units | 4.5 px | |
    | **13** | **2.43 units** | **6.1 px** | **5.5 px** |
    | 14 | 3.26 units | 8.1 px | |

  - At 13, every badge is still at least 36.4 units from any other crossing (2.8 times its own 13), and at least 49.1 from any other badge. So no badge can be read as belonging to the wrong crossing.
  - **Change:**
    - Ring radius **13 units**, the same for every badge (one rule, one look). Keep the rest of the rule: 32 angles, centre inside −3 to 103, the angle farthest from every strand, ties to the lowest angle.
    - The builder's test asserts, on every rest state of both knots, that the badge edge to the strand edge is **at least 2.0 units** (5 px at 290).
    - The badges are `aria-hidden` and `pointer-events: none`.
    - Rerun: `node company/design/reviews/2026-10-16-knots-specs-review/badge-probe.mjs 10,13`.
- **L-2. Mirror (B2) is an opacity dip, never a cross-fade of two copies.**
  - A true cross-fade superimposes the unreflected and the reflected outline. Mid-fade, that is one picture with up to twice the crossings: a frame of false crossings, which S1 and finding 1 exist to prevent.
  - **Exact behaviour:**
    1. Fade the mirror wrapper's opacity to 0 over 100 ms.
    2. At 0, set or remove `scaleX(-1)` with **no transition on `transform`** (`transition-property: opacity` only on the wrapper).
    3. Fade back to 1 over 100 ms.
  - Total 200 ms, within the 450 ms QA wait. Reduced motion: instant, no fade.
  - The marks hide with the dip and reappear at rest at the new positions (as L-3).
  - The B1 fallback, if it is ever built, keeps the same outline, so a true cross-fade is allowed there. It is not the build.
- **L-3. Marks timing, exactly.**
  - On Turn over or Mirror: marks opacity → 0 in ≤ 100 ms, starting at the press.
  - Recompute the positions for the target rest state. Fade in over ≤ 150 ms after `transitionend` of the card or wrapper, with a timer fallback at the duration plus 50 ms, so a missed `transitionend` never leaves the marks hidden.
  - A press during a flip retargets. The marks stay hidden until the final rest.
- **L-4. The readout and the seen line never blank.**
  - The mockup's mid-flip frames drop "Sum" and the name. The built stage must not: blanking moves text and makes a flicker.
  - The readout keeps its last rest value during a transition and updates at rest. For Turn over, the value does not change anyway (K4).
  - The seen line uses cm-math-discrete's W-1581 wording ("Trefoil: turned over −3 · mirror +3").
- **L-5. Perspective and overflow.**
  - Set `perspective` on the card's parent at **≥ 1200 px**. At a 320 px card, the near edge then grows at most about 15 % mid-flip.
  - The stage must not clip the card mid-turn: `overflow: visible` on the stage elements between the card and `.card-shell`.
  - The flip frames in the mockup are orthographic. The built sheet (S4) is the check.
- **L-6. Turn over carries `aria-pressed`** (true while turned), like Mirror and the chips, so the toggle state is announced.
  - The spec already gives the picture an `aria-label` per rest state. Keep it.

## W-1583: tricolour-check arc sets and the second cue (visual designer's W-1580 finding)

**Decision: take the visual designer's recommended sets, and the letter cue.** Both are required, not either one.

| Letter (ring) | Dark | Light |
|---|---|---|
| **A** (the starting colour) | `#56B4E9` | `#0072B2` |
| **B** | `#D55E00` | `#C24E00` |
| **C** | `#F0E442` | `#6B6B6B` |

**Why:**
- The lesson's rule is same-versus-different colour. Under simulated protanopia and tritanopia, my sets fall to dE 8 to 10 between pairs at nearly equal lightness. So my T3 note ("labels carry arc identity, not the hues") protected the wrong thing: the learner has to know the colour, not the arc.
- The new sets have a worst pair of dE 21 or more in every simulated vision type, and contrast of 3.13:1 or better on `--bg-3`.
- The letters name each colour without hue, and they match the learning designer's (B,A,A) QA notation.

**Conditions:**
- **T3 is replaced by T3-letters.** Each arc's label ring is stroked in the arc's colour, and its text is that colour's **letter** (A, B or C) in `var(--fg)` on `var(--bg-3)`, not the arc number.
  - T3a stands: the label centre is at least 12 units from every crossing centre, on the arc's longest stretch between gaps.
  - The letter changes with the colour on every tap.
  - The arc's `aria-label` says both: for example "Arc 2, colour B".
- **The letters count as stage words** (one each; demo-standard text budget). That is 3 on 3₁ and 4 on 4₁: within 25 by the learning designer's count of 14.
- **Light theme C is grey.**
  - The visual designer explains why: a yellow that clears 3:1 there is brown, and it merges with B. I accept it.
  - The risk is that a grey arc reads as "not coloured yet". Every arc starts as A (blue), so grey is never a default state, and the letter C names it.
  - I check this on the built sheet (S4). If the learner review reports grey read as uncoloured, it comes back to me. I will not swap it now on a guess.
- These are lesson-local arrays, not tokens: nothing in `globals.css` changes.
- **The builder already building tricolour-check follows this table and T3-letters.** If arcs are already numbered, switch to letters.

## Objections, and what happened to each

- **The spec's "7.0 units, no badge sits on a strand".**
  - True of the centre-to-centre distance. Not enough as a gap at phone size: 2.9 px.
  - Answered by L-1, a 13-unit ring and a tested 2.0-unit floor. The spec's text location is corrected (the beak, not the right lens).
- **The spec's "cross-fade 200 ms" for Mirror.**
  - I agree with its aim (never a squeeze).
  - Changed to an opacity dip (L-2), because a true cross-fade of a reflected outline makes a frame with false crossings.
- **The mid-flip touch band on 4₁** (the principal engineer's §3; the spec deferred it to me).
  - Accepted at 300 ms `ease-in-out` (53 ms in the band, marks hidden), with reasons above.
  - Rechecked at S4 and reopened if a learner review finds it.
- **My own earlier T3 wording** ("labels carry arc identity, not the hues"). The visual designer's W-1580 objection is right. Answered by W-1583 above: letters replace numbers.

## What I believe, and how sure

- **The unknot-game spec is buildable and meets the tint condition, and its control order passes the QA contract: sure.** I read it against the contract code, and the mockup shows all 7 states.
- **A 13-unit badge ring gives at least 6.1 px of clear space at 290 on every rest state: sure.** It is computed on the kit's drawings and reruns. That 6.1 px reads as separate at phone size: fairly sure (mockup scale, not a device).
- **The 53 ms touch band is not a readability problem: fairly sure.** It is reasoned from timing and the mockup frames. I have not seen it in motion on a phone.
- **Switching to the recommended arc sets with letters is the right call: fairly sure.** It rests on the visual designer's simulation, and the grey C is untested with learners.

## Next moves

| Move | Owner |
|---|---|
| Fold U-1, U-2 and L-1 to L-6 into the specs. Rerun the mockups with ring radius 13. Fix the "right lens" wording | interaction-designer |
| Build unknot-game and left-or-right with these changes (badge floor test, the dip, the marks timing) | demo-builder |
| Build tricolour-check with the W-1583 table and T3-letters | demo-builder |
| Design review of each built walkthrough sheet: S4, 4₁ mid-flip in motion, the badge at the beak, the grey C in light | design-lead |
