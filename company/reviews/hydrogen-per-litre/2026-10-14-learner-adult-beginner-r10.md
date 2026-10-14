*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): hydrogen-per-litre
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows that burning a fuel releases energy and that a gas takes far more room than a liquid; does not know that energy per kilogram and energy per litre can rank fuels in opposite orders, or that hydrogen wins one and loses the other by a factor of thousands)
Screenshots seen: yes (artifacts/walkthroughs/hydrogen-per-litre/sheet.png, recorded 2026-10-14T18:56)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "about 3 times more"; tapped Per kilogram, Per litre (gas, 1 atm), Liquefy hydrogen; opened reveal.

1. **The prediction is genuine.** The hook says hydrogen wins per kilogram, so "3 times more" per litre is the trap; the four options span the full range.
2. **The readouts tell the story:** "PER KG: 142 MJ · 48 MJ", then "PER LITRE: PETROL AHEAD gas ×2,900 · liquid ×3.4". Those two tiles are the lesson and they are clear.
3. **The bars say something different from the numbers.** The axis is logarithmic (1 kJ, 100 kJ, 10 MJ, 1 GJ in equal steps), so the hydrogen-gas bar at 12 kJ/L is about a quarter the length of petrol's 34 MJ/L bar. Read as a beginner reads bars, that is "petrol about 4 times ahead", not 2,900. The picture contradicts the "factor of thousands" idea that is the whole point. Per kilogram, the 142 vs 48 bars look nearly equal, so the "hydrogen wins 3×" half is also flattened.
4. **Where my boundary strains: kJ vs MJ.** "12 kJ/L" and "34 MJ/L" need me to know that an MJ is a thousand kJ. The ×2,900 tile saves me, but the bar labels do not.
5. "octane for petrol · water formed as liquid" is a footnote for experts; to me it is noise under the axis.
6. The reveal fits and its explanation ("a litre of hydrogen gas weighs only 0.08 g") is the right one, linking to what I know about gases. "Short of mass or short of space" is a good closing idea. Trust link "6/6 claims checked".

Fixes (for the builder):
- Make the bars honest for a beginner: a linear comparison (e.g. 2,900 hydrogen-gas litres to match one petrol litre) or explicit "each gridline is 100× more" labels with the gap marked "×2,900".
- Write the hydrogen figure in the same unit as petrol (0.012 MJ/L) at least once.

Verdict reason: the central quantity (thousands of times less) is right in the numbers but the main picture shows a gap of about four times, which a beginner will believe over the label.

## After reading the brief (meta.json)

- doesNotKnow item 2 ("by a factor of thousands") is exactly what the log bars hide (finding 3). Item 1 (opposite rankings) is delivered by the tiles.
- Fix route: demo-builder (stage scale).
