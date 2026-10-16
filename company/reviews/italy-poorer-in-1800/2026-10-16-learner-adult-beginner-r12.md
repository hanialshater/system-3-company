*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: italy-poorer-in-1800
lesson version: v2
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that income per person rises over time. Does not know that on the best reconstruction, north and central Italy were poorer per person in 1800 than in 1450. Would honestly pick "About 150".
Screenshots seen: yes (artifacts/walkthroughs/italy-poorer-in-1800/sheet.png, recorded 2026-10-16T09:28:35.407Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: nowhere that blocks.** Both r1 breaks are fixed:
   - The title "North and central Italy, 1450 to 1800" and the hook "Before industry, did income per person rise, hold or fall?" name all three directions, with no "at least". The locked stage shows 1310 to 1450 climbing to 100, which, if anything, invites "rise". Good for the misconception.
   - The peak-against-trough doubt is now met on the stage. "25-year averages" draws a smoothed line and the readout "1438–1462: 101 → 1788–1812: 79", and the reveal says it in words ("Not just a high year against a low one"). The panel says "then compare 25-year averages", and the step-5 frame is where "Show me why" lit, so the robustness view is on the path.
   - The limit sentence is now in learner words ("one reconstruction, of the north and centre only, shown as an index").
2. **What the prediction felt like.** Fair: three options at the same precision, and an open hook.
3. **Did the reveal answer the question I actually had?** Yes, for "is 1800 really below 1450?". A smaller question remains (note, not blocking): the smoothed line shows a drop just after 1450, then a fairly flat run at about 80-85 to 1800. Step 4's dashed line and "−0.08% a year: 100 → 75" suggest a steady slow decline over 350 years, which is not the shape I see. "Income per person can shrink for centuries" is true on the endpoints, but a beginner may come away picturing a slow, steady slide rather than "fell, then stayed lower". The picture is honest; the per-year framing smooths it over.
4. **Small:** in the step-3 readout "1310: 89 · 1450: 100 · 1800: 75 · 1871: 87" the line wraps, leaving "87" alone. It is legible.
5. **Trust sheet** reads 8/8 checked on the served build.
6. **Framing.** It is an economic series for a region, and it does not characterise any people. No cultural-route flag from this walk. "Poorer in 1800" in the slug is not shown to the learner.

Verdict reason: the r1 findings (a hook that cued the answer, an undefended peak-to-trough comparison, in-house limit wording) are fixed on the served build, and the stage now shows the fall survives 25-year averaging, so no finding blocks a first-time learner.

## After reading meta.json (build.md not read)

- The objective now includes the 25-year averages (101 to 79), which answers r1's finding 2 the way r1 suggested. The walk delivers every part of it.
- Finding 3's note (steady decline against "fell, then stayed lower") bears on the objective's last clause, "can shrink for centuries". That clause holds on the endpoints. Whether to say the shape (for example "most of the fall came soon after 1450") is cm-history's call, and any new sentence needs a claim. It does not hold this verdict.
