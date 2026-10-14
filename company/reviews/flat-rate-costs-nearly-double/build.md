# Build note: flat-rate-costs-nearly-double

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #60

- Intent: one picture: what you still owe month by month (a falling staircase, at the loan's own true rate) with the interest charged each month as thin bars under it. Flat: the bars stay level at $83; True 10%: they shrink with the staircase. Model in Demo.tsx loan(); true rate by bisection (solveRate), APR = 12 × monthly rate.
- Controls (DOM order): [Flat 10%] [True 10%] presets (disabled while shown, class active), then the term slider (1 to 3 years, starts at 2). Readouts: Payment, Interest, True rate. Rule chip: "Flat: interest on the full $10,000, every month."
- Milestones: "flat" (Flat 10% at 2 years: interest $2,000, true rate 18.2%, owed at month 12 $5,449 recorded) and "true" (True 10% at 2 years: payment and interest $1,075 recorded). Once the flat 2-year case is recorded it stays as a dashed ghost (staircase and bar outlines) whenever anything else is shown, with its month-12 dot labelled $5,449 and the label "flat: $83 a month". A record row keeps "Flat, 2 yr: $2,000 interest, true 18.2%" and "True 10%, 2 yr: $1,075 interest".
- Cut from the brief's reveal (its own "cut first"): "Stretching the term barely changes the true rate". The slider still shows it (17.97% / 18.16% / 17.92%), claim c6.
- No Reset control (the brief lists none); presets always rebuild from the stated loan.
