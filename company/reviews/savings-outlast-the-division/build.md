# Build note: savings-outlast-the-division

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #63

- Intent: the balance over 0 to 40 years ($0 to $600k axis, ticks $0 / $250k / $500k; the $20k line climbs past $600k after year 14 and is clipped at the top), with a red dot where it hits zero. Readouts: Withdraw, Lasts ("N years" to one decimal, or "never runs out"). Rule chip: "Grows {g}% a year, then you withdraw." (it follows the 0% preset).
- Controls (DOM order): [$40k a year] [$25k a year] [0% growth] presets, then the withdrawal slider ($20k to $60k, steps of $5k, keeps the current growth rate). Stage starts empty after the commit (slider at $30k) so the first preset press changes the picture.
- Milestones: "forty" ($40k at 5%: 20.1 years), "interest" ($25k at 5%: never), "zero" ($40k at 0%: 12.5 years). Deviation: the brief marks the 0% milestone optional; it is required because the reveal names 12.5 ("not 12.5") and must quote what the learner saw. Each recorded case stays as a dashed trace with its label ("$40k: 20.1 yr", "$25k: never", "0%: 12.5 yr"; labels have a stage-coloured halo so they stay legible where the current line crosses them).
- Year-1 interest $25,000 and "shrank by only $15,000" are told in one claimed sentence (c2); the $25k trace labelled "never" is the stage's stand-in for "the interest pays the withdrawal".
- Cut from the brief's reveal: "order matters (see order-of-the-bad-year)". No "4% rule".

## Pre-flight v1

1. **Title and hook.** "How long does $500,000 last?" / "You take $40,000 a year from savings that keep earning. When does the money run out?" Questions; "keep earning" is in the question itself, no number of years.
2. **Options.** "12 years" · "20 years" · "never". Two numbered at the same precision; "never" is a wrong option, so the right one is not singled out by precision.
3. **Locked stage.** Chip "Grows 5% a year, then you withdraw.", readouts "?", empty axes ($0 / $250k / $500k, years 0-40), presets and slider ($30k) disabled. No line, dot or year count.
4. **Reveal values.** "lasted 20.1 years": (b) milestone forty; trace label "$40k: 20.1 yr". "not 12.5": (b) milestone zero; trace label "0%: 12.5 yr". "$25,000 ... $15,000" in year 1: told in one claimed sentence (c2), the arithmetic of the stated case. "Taking $25,000 ... it never shrank": (b) milestone interest; flat dashed trace labelled "$25k: never".
5. **QA path.** DOM order: $40k a year (forty), $25k a year (interest), 0% growth (zero), Withdraw slider two right presses ($40k → $50k at 0%: 10.0 years). All three milestones in 3 presses; the three traces and labels are on the stage at the reveal. Probe confirmed each press changed the stage.
6. **Reset.** No Reset control; traces persist. Reveal text from the QA path: "Taking $40,000 a year, the money lasted 20.1 years, not 12.5: in year 1 the pot earned $25,000, so it shrank by only $15,000. Each year it earns a little less, so the end speeds up. / Taking $25,000, exactly the interest, it never shrank. Division is only right when the money earns nothing. A steady 5% is a made-up rate; real returns vary."
