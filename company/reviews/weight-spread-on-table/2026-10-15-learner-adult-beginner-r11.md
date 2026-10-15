*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): weight-spread-on-table
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Average pressure is force divided by contact area. Spreading the same load over more area lowers this calculated average; it does not reduce the total weight carried by the table.)
Screenshots seen: yes (artifacts/walkthroughs/weight-spread-on-table/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Small footprint"; tapped Wide footprint; slid Mass from 2 to 2.2 kg; opened reveal.

1. **The prediction is obvious.** Spreading a load over a bigger area lowers pressure (snowshoes, wide heels). Most adults pick "Wide footprint" without thinking.
2. **Where understanding first broke: I never saw the small-footprint pressure.** The wide footprint gives 6,540 Pa. The small one (three times higher, about 19,600 Pa) stayed "?" because the panel sent me to "the second layout" only. "Lower" has nothing to compare with.
3. **Units past my boundary.** "Pa" and "g=9.81m/s²" are physics notation. A beginner can follow "three times the area, one third the pressure" without either.
4. **The reveal's best point is the one not shown.** "It does not reduce the total weight carried by the table" is the misconception worth correcting (people think spreading makes it lighter), but the stage never shows total weight staying at 2 kg alongside the pressure falling.
5. **The selected button looks reversed.**
6. The safety line is appropriate.

Fixes (for the builder):
- Show both pressures, ideally as "small: 3 times the pressure of wide".
- Show total weight as a second readout that stays the same.
- Plain words for pressure units.

Verdict reason: the small-footprint pressure never appears and the units are past the boundary, so the reveal's comparison and its "same total weight" point are told, not seen.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, plain units, selected-button look); Life Hacks category manager for whether the brief names a real beginner belief.
