*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-parcel-fee-repeats
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Separate per-parcel overhead from per-item charges when aggregating shipments.)
Screenshots seen: yes (artifacts/walkthroughs/lh-parcel-fee-repeats/sheet.png, recorded 2026-10-15T21:35, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Separate parcels"; tapped Test A, Test B; slid Items 4 to 6; opened reveal.

1. **Where understanding first broke: there is no wrong answer to be tempted by.** Four separate parcels at €3.50 each against one parcel at €3 + 4×€0.50: everyone knows one parcel is cheaper. €14 against €5 is not close. I picked "Separate parcels" only because the walk forced option 1.
2. **The mistake the title points at is never asked.** "One parcel fee, many item charges" suggests the trap is thinking the €0.50 per item disappears when you combine, or that combining saves €3.50 per item. A question like "how much does combining four items save?" (€14, €10.50, €9) would test that.
3. **The stage is clear.** (3.5×4) and (3+(0.5×4)) are readable; the slider shows the gap growing by €3 per item. The receipts are decorative.
4. **Does the reveal answer my question?** It says the per-item charge repeats either way and the parcel fee repeats only with separate parcels. That is right. "Labeling a cost as fixed requires naming the thing it is fixed per" is a good closing idea, but nothing in the prediction made me need it.

Fixes (for the builder):
- Ask for the saving (or the combined price) as a number, with "€3.50 × 4 saved" as the trap.

Verdict reason: the prediction compares €14 with €5, which no beginner gets wrong, so the per-parcel versus per-item distinction is never at stake.

## After reading the brief (meta.json)

- Objective: separate per-parcel overhead from per-item charges. The stage separates them; the prediction (€14 against €5) does not make the learner do it (finding 1).
- Fix route: demo-builder (numeric question).
