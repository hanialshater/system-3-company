# Build note: hidden-third-cause (demo-builder, 2026-10-12)
- Intent: 365 seeded days plotted as sales against sunburns, coloured grey (cool) to red (hot). "Same temperature only" fades every day outside a 3-degree band, and the fit line and correlation update. The band slider sweeps from cool to hot, and the cloud stays flat in every band.
- I did not tune seed 2024: overall r is 0.83, and band r runs from -0.19 to 0.30 with mean 0.05 (theory: 0.05). The reveal says the bands wobble by chance.
- Gate: 2 interactions (the toggle, then band moves). The slider stays disabled until the band view is on.
- After screenshots: I merged two readouts into one ("0.18: almost none") and shortened the colour key.

## v2 (revision 2026-10-13)

Source: 2026-10-13 learner-adult-beginner review and fact-check. Finding -> change:

- Correlation undefined -> stage key 'Correlation: +1 rise together, 0 no link' (new claim c5, unverified).
- All-days value never shown / only one band seen -> all-days correlation is on the readout from unlock; gate = same-temperature view plus three different bands visited (state lifted so the reveal quotes the learner's own bands).
- 28-band statistic told -> computed from the model (mean, min, max) and set beside the learner's bands.
- Title/hook gave answer away -> title 'Ice cream and sunburns climb together', hook 'Is one feeding the other?'.
