# Health & Epidemiology briefs (cm-life-health-epidemiology)

Ranked briefs for this strand, in the same format as `life.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next life` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Course: NCM (2026-10-14)

Accepted with edits by cm-life-health-epidemiology after a node re-run (fixed point q = e^{R(q−1)}: R1.5 0.4172, R2 0.2032, R3 0.0595, R0.9 1; 10,000 seeded chains give 0.4287; P(0 or 1 children) = 55.8%). Edits: the reference cites chapter 21 only (no unconfirmed section number); the card must name the Poisson assumption and say that real spread is more dispersed, which raises the die-out chance (see spreaders-are-rare).

### 1. outbreak-can-fizzle-above-one · concept: life:branching-extinction · core · demand 3 · rank 17 · format: Simulation run (seeded outbreaks, R chips)
- Reference: Easley & Kleinberg 2010, ch. 21.
- Audience: students in a networks course and curious adults. Learner knows: R above 1 means growth on average (immunity-eats-r) / does not know: that with R = 1.5 (Poisson spread), about 42% of single introductions die out by chance.
- Misconception: If R is above 1, every introduced case starts an epidemic.
- Prediction (stage text ≤ 25 words): "Each case infects a random number of others, 1.5 on average. One case arrives. How often does the chain die out by itself?" options: A. Never / B. About 4 in 10 / C. About 9 in 10 (answer: B, 41.7%).
- Check: Poisson offspring. Node: `{"R1_5":0.417,"R2":0.203,"R3":0.06,"R0_9":1,"sim_R1_5_diedOut":0.429}` (10,000 seeded chains, seed 218; chains past 2,000 cases counted as taking off).
- Reveal (one line): The first case often infects 0 or 1 by luck (56% of the time), so 42% of chains fizzle; R above 1 means growth is possible, not certain.
- Planned claims:
  1. With Poisson spread and mean 1.5, the chance that one case's chain dies out is 41.7% (solution of q = e^{1.5(q − 1)}). support: derivation; source: node fixed point.
  2. The chance is 20.3% for R = 2 and 6.0% for R = 3; for R below 1 every chain dies out. support: derivation; source: node.
  3. In 10,000 simulated chains with R = 1.5, 42.9% died out. support: simulation; source: node seed 218.
- curriculum: `{"primary":"life:branching-extinction","also":["probability:at-least-once"],"prerequisites":["life:reproduction-number-growth"],"level":"core","strand":"health-epidemiology","references":[{"work":"easley-kleinberg-2010","chapter":21}],"tags":["epidemics","branching process"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: spreaders-are-rare counts cases that infect no one (dispersion); immunity-eats-r is the average R; herd-immunity shows early die-out only below the threshold. This asks for the whole chain's survival chance at R above 1.
