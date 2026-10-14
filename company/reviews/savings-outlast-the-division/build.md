# Build note: savings-outlast-the-division

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #63

- Intent: the balance over 0 to 40 years ($0 to $1M axis; the $20k line climbs past $1M by year 40 and is clipped at the top), with a red dot where it hits zero. Readouts: Withdraw, Lasts ("N years" to one decimal, or "never runs out"). Rule chip: "Grows {g}% a year, then you withdraw." (it follows the 0% preset).
- Controls (DOM order): [$40k a year] [$25k a year] [0% growth] presets, then the withdrawal slider ($20k to $60k, steps of $5k, keeps the current growth rate). Stage starts empty after the commit (slider at $30k) so the first preset press changes the picture.
- Milestones: "forty" ($40k at 5%: 20.1 years), "interest" ($25k at 5%: never), "zero" ($40k at 0%: 12.5 years). Deviation: the brief marks the 0% milestone optional; it is required because the reveal names 12.5 ("not 12.5") and must quote what the learner saw. Each recorded case stays as a dashed trace with its label ("$40k: 20.1 yr", "$25k: never", "0%: 12.5 yr").
- Year-1 interest $25,000 and "shrank by only $15,000" are told in one claimed sentence (c2); the $25k trace labelled "never" is the stage's stand-in for "the interest pays the withdrawal".
- Cut from the brief's reveal: "order matters (see order-of-the-bad-year)". No "4% rule".
