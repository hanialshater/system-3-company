# Build note: five-day-generations (demo-builder, 2026-10-13)

- Design: one dot field (40 x 32 = 1,280, the R 2 maximum); each lit dot is one new case in the generation shown, lit from the centre out. A muted line under the message lists the generation counts so far (20 → 30 → 45 ...), which keeps the compounding visible without a second picture.
- Brief answer checked: 20 x 1.5^6 = 227.8; the option "About 230" and the reveal's 228 come from the same `cases()` function the stage draws.
- Reveal gate: milestones "past-100" (generation 4 or later at R 1.5, 101 cases) and "shrinks" (R below 1 at generation 1 or later). Control order: Next generation, Gen 6, R chips (0.8 first), Restart, so QA reaches both.
- R is chips (0.8, 1.2, 1.5, 2), not a slider: the QA path presses a slider only two steps, and the R < 1 state must be one press away.
- The reveal quotes the highest generation the learner reached at R 1.5 and the R < 1 state they saw.
- Model label on the stage before the prediction: "Toy: R fixed, generations 5 days apart". All claims unverified.
