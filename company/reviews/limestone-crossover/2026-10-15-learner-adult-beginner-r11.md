*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: limestone-crossover
lesson version: v3
boundary: adult beginner (borrowed mind). Knows: that some changes absorb heat (cold-pack-takes-heat); that spreading out raises entropy (why-gas-spreads). Does not know: that a change goes by itself when ΔH − TΔS is negative; that a heat-absorbing change that makes gas therefore switches on above a definite temperature. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/limestone-crossover/sheet.png, recorded 2026-10-15T10:09:08.300Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: at the prediction, not after it. Before locking, the TdS bar is empty, so for this mind (I know some changes absorb heat and that spreading out raises entropy, but have no numbers) the four temperatures are a pure guess. After that, the bars make sense: 48, 124, 188 kJ against a fixed 179.
2. What the prediction felt like: a guess. The real surprise the lesson can give is "it goes at all", and that comes through. "Find the switch" only marks 845 deg C on the 900 deg C bars; I never saw the bars equal.
3. Whether the reveal answered my question: yes. "Absorbing heat does not forbid a change; it sets the temperature where it starts" is what the hook asked.

Verdict reason: nothing blocks; the prediction is a guess for this boundary.

## After reading build.md / meta.json

- r10 said revise: the rule was never stated, and T was in kelvin without saying so. The stage now heads with "dG = dH - TdS. Negative dG: it goes by itself" and "TdS = T in kelvin x entropy gain", and the readouts give kelvin (298 K, 773 K, 1,173 K). Addressed. meta.json version is v3. The prediction being a guess for this boundary (finding 2) is a design note for the builder, not a block.
