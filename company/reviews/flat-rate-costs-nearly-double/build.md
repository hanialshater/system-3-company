# Build note: flat-rate-costs-nearly-double

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #60

- Intent: one picture: what you still owe month by month (a falling staircase, at the loan's own true rate) with the interest charged each month as thin bars under it. Flat: the bars stay level at $83; True 10%: they shrink with the staircase. Model in Demo.tsx loan(); true rate by bisection (solveRate), APR = 12 × monthly rate.
- Controls (DOM order): [Flat 10%] [True 10%] presets (disabled while shown, class active), then the term slider (1 to 3 years, starts at 2). Readouts: Payment, Interest, True rate. Rule chip: "Flat: interest on the full $10,000, every month."
- Milestones: "flat" (Flat 10% at 2 years: interest $2,000, true rate 18.2%, owed at month 12 $5,449 recorded) and "true" (True 10% at 2 years: payment and interest $1,075 recorded). Once the flat 2-year case is recorded it stays as a dashed ghost (staircase and bar outlines) whenever anything else is shown, with its month-12 dot labelled $5,449 and the label "flat: $83 a month". A record row keeps "Flat, 2 yr: $2,000 interest, true 18.2%" and "True 10%, 2 yr: $1,075 interest".
- Cut from the brief's reveal (its own "cut first"): "Stretching the term barely changes the true rate". The slider still shows it (17.97% / 18.16% / 17.92%), claim c6.
- No Reset control (the brief lists none); presets always rebuild from the stated loan.

## Pre-flight v1

1. **Title and hook.** "Is a '10% flat' loan a 10% loan?" / "A loan is quoted at 10% flat. What yearly rate is that on what you owe?" Questions only; they make a learner doubt 10% but do not choose between 14% and 18%.
2. **Options.** "10%" · "14%" · "18%". All numbered, same precision.
3. **Locked stage.** Chip "Flat: interest on the full $10,000, every month.", readouts Payment / Interest / True rate all "?", empty axes ($10k, $0, months 0/12/24/36, "owed", "interest each month"), presets and slider (2 yr) disabled. No staircase, bars, rate or 18 anywhere.
4. **Reveal values.** "$2,000": (b) milestone flat, record row line 1. "month 12 you owed $5,449": (b) milestone flat, dot label on the flat staircase (solid or ghost). "$83 a month": the flat rule, label "flat: $83 a month" over the bars, drawn once flat is recorded. "18.2%": (b) milestone flat, record row line 1. "$1,075": (b) milestone true, record row line 2.
5. **QA path.** DOM order: Flat 10% (milestone flat), True 10% (milestone true), Term slider two right presses (3 yr, then at max). Both milestones in 2 presses; every quoted value is on the stage at the reveal (record rows, ghost staircase with $5,449, $83 label). Probe (own script, 390×844, same press order, 450 ms waits): every press changed the stage, reveal unlocked.
6. **Reset.** No Reset control in the brief or the lesson; records are set once and never cleared, so every reveal sentence matches. Reveal text from the QA path: "A flat 10% charged $2,000: 10% of the full $10,000, both years. But you repaid as you went: by month 12 you owed $5,449, yet the interest bars stayed at $83 a month, as if you still owed $10,000. On what you actually owed, that is 18.2% a year. / A true 10% loan, charged on what is left, cost $1,075 in interest: about half. A made-up loan with level payments and no fees."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 flat-rate-costs-nearly-double` (shared dev server, 2026-10-14): verdict fit, **stage-top crop 0 px**, hiddenBelow 0, namedHidden 0 (named: interest, owed, 12, month, flat 10%, true 10%), phoneFit true, **78 words** (reveal incl. the kit's verdict line); picture fitted 149/176. Smallest svg label at the reveal 10.2 px or more (own probe: computed font-size × letterbox scale). Note on the run: the dev server was too loaded for the tool's fixed 30 s / 15 s waits, so it was run with a preload (`node --import <scratch>/patient.mjs`) that only raises Playwright's navigation and waitFor timeouts; the measuring code was not changed. A first run gave crop 1-4 px; the stage wrapper's flex gap was cut from 3 px to 1 px (no text or tap target changed).

QA: `QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J economics slugs> QA_OUT=artifacts/qa-wavej-economics npx playwright test tests/qa/contract.spec.ts --workers=1` (2026-10-14): phone and desktop pass (10 of 10 for the batch). A first batch run failed winning-bid-overpays on phone only, with React's dev-mode warning "Can't perform a React state update on a component that hasn't mounted yet" (the same warning shows in the shared dev server's log for other lessons while files change); reruns passed. Status left draft; next build and walkthrough not run (shared machine).

## v2: learner r10 fixes (W-840, demo-builder, 2026-10-14)

Review: company/reviews/flat-rate-costs-nearly-double/2026-10-14-learner-adult-beginner-r10.md. Changed claims are reset to unverified; no claim marked verified by the builder.

- $5,449 removed from the stage and reveal: the dot at half the term now reads 'about half owed', and the reveal says 'by month 12 you owed only about half'. c3 keeps both figures ($5,449 at the true rate, $5,000 counting $417 of each $500 as repayment).
- One colour per loan: flat always red (solid when shown, dashed red ghost when the true loan is shown), true always teal. The ghost follows the term slider, and the term returns to 2 years when the reveal opens.
- c3, c4 rewritten (unverified). Node re-run: 18.16%, $461.45, $1,074.78; half-term balances 52/54/57%.

## Pre-flight v2

1. Unchanged.
2. Options '10%', '14%', '18%'.
3. Locked unchanged.
4. Reveal values: $2,000 and 18.2% (b, flat milestone), $1,075 (b, true milestone); 'about half' (dot label).
5. QA path: Flat 10%, True 10%, Term slider; reveal resets the term to 2 yr.
6. Reset: no Reset (about 70 reveal words).
7. **Phone fit.** reveal-fit verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 81 tool words.

QA: tests/qa/contract.spec.ts against next dev on :3632 (QA_BASE_URL, QA_ONLY = the 18 r10 lessons), phone and desktop both passed (36/36, artifacts/qa-f2/final/qa-report.json, harness stamp clean). Fit: committed tools/reveal-fit.mjs --url http://localhost:3632 --strict, tool stamp clean (artifacts/reveal-fit/f2-final.json; screenshot artifacts/reveal-fit/<slug>.png). The tool's word count includes the verdict line and the trust link (about 6 words).

status draft → review (W-996): launch r11, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
