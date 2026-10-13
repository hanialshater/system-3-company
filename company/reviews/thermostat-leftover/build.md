# Build note: thermostat-leftover (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Where does the incubator settle?" (the slug says "leftover").
- Design: temperature trace (Euler, dt 0.02, 250 steps) against a dashed target line; buttons Gain 4, 9, 19, 0 then a 0-20 slider. Start is room temperature (32) with the heater off (gain 0). Steady value is the closed form; node check agrees with the Euler end value (32.000, 36.000, 36.500, 36.750).
- Model stated on the locked stage; heat leak rate 1 is part of the model sentence in the reveal ("gap is 5 / (1 + gain)").
- Gate: two milestones, "gain-4" (the question's gain) and "higher-gain" (any gain above 4). Trace and settled value hidden while locked. Reveal quotes the gains the learner opened.
- Claims all unverified.
