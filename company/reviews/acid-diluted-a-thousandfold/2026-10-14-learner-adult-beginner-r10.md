*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): acid-diluted-a-thousandfold
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows each pH unit is a factor of 10 in H+, and that dilution lowers concentration; does not know that water makes its own H+ and OH- (about 10^-7 mol/L each at 25 °C), or that diluting an acid therefore stalls near pH 7)
Screenshots seen: yes (artifacts/walkthroughs/acid-diluted-a-thousandfold/sheet.png, recorded 2026-10-14T18:50)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "about 5"; tapped ×10, ×100, ×1,000, ×10,000; opened reveal.

1. **The prediction is real.** The hook hands me "tenfold raises pH by one", so "about 8" is the trap and the four options are evenly spaced. Choosing "about 5" was the walkthrough's pick, and ×10 (pH 6.00) corrects that within one tap.
2. **The payoff is on the stage.** ×1,000 reads 6.98 and ×10,000 reads 7.00, with the total bar parked on the "pH 7 neutral" line. That is the surprise, and I can see it.
3. **Where I first needed an idea I lack: the "from water" bar starts at 1.0×10⁻⁹ and grows.** My boundary does not know water makes H+ at all. The reveal then tells me "neutral water holds 10⁻⁷ mol/L of each". So why did water give only 10⁻⁹ in the pH 5 acid, and 9.9×10⁻⁹ after ×10? The bar contradicts the one number I am told. The fact that makes it consistent (in acid, [OH⁻] is pushed down because the product stays 10⁻¹⁴, and water's H+ comes paired with that OH⁻) is not said. "As the acid's share shrank, water's grew" describes the bar; it does not explain it. A learner leaves thinking water's contribution is a mysterious variable.
4. **The reveal answers the "8" chooser, not me.** "Stopped at 6.98, not 8" is the right line for the hook's trap, but I picked 5. One clause for the "dilution does nothing to pH" belief (my ×10 tap went straight to 6.00) would close my loop.
5. "Never past it" is asserted from the product rule but the step from "[H⁺]×[OH⁻] = 10⁻¹⁴" to "water adds equal H+ and OH−, so it cannot make the solution basic" is left to me. With the boundary's knowledge I can accept it, not derive it.
6. Bar labels are readable at phone size; the dashed neutral line appears only from ×1,000, which helps.
7. Trust link reads "0/7 claims checked" (fact-checker's lane).

Fixes (for the builder; not done here):
- In the reveal, one clause tying the small early water bar to the product rule: "in strong acid, OH⁻ is squeezed to 10⁻⁹, and water's H⁺ comes paired with it" (swap words to stay in budget).
- Make the reveal's first line speak to the chosen option (5: "dilution does change pH: ×10 gave 6.00").

Verdict reason: the stage shows the stall, but the one mechanism I am told (10⁻⁷ each) contradicts the first three water bars I saw, and nothing reconciles them.

## After reading the brief (meta.json)

- Objective: "explain that ... ends near pH 6.98, not 8, because water's own ions take over ... and that adding water cannot make an acid basic". The 6.98 and "cannot make basic" halves are delivered. "Water's own ions take over" is exactly where finding 3 bites: the stage shows water's share growing, and the brief's claim c7 knows why (common-ion suppression, "not named on stage"). That un-named step is the gap for this boundary.
- Misconception targeted is the pH 8 answer; the reveal is written for it. Finding 4 is minor.
- Fix route: demo-builder (reveal wording), then re-walk.
