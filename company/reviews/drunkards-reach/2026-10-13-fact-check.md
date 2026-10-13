# Fact-check: drunkards-reach (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: for independent unit steps in uniformly random directions E[|r|^2] = N, so RMS = sqrt(N) (Berg ch. 1). |
| c2 | Verified: sqrt(100)/sqrt(25) = 10/5 = 2. |
| c3 | Verified, and it generalises. Re-ran the lesson's own mulberry32 walk: seed 1 gives rms(25)=4.93, rms(100)=9.54, ratio 1.93 (matches the stage and transcript). Seed 1 is stated as untuned and nothing contradicts that. Over seeds 1..500 (40 walkers each) the ratio has median 2.01, 5th-95th percentile 1.70-2.36, 91% within 1.7-2.4, and 49% fall below 2. The seed is typical, not flattering, and the reveal discloses it ('One seeded cloud of 40; other clouds land a little above or below 2'). |
| c4 | Verified: distance proportional to sqrt(Dt) means 2x distance takes 4x time (Atkins, Berg). Recall (3 m takes 9 min) is consistent. |
| c5 | Verified (convention): Demo.tsx rms(n) is the root-mean-square over the 40 walkers; steps are unit length at a uniform random angle. |

Deterministic given the seed. No unrecorded claims.
