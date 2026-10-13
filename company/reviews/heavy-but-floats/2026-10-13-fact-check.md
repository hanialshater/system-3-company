# Fact-check: heavy-but-floats (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: water 0.99997 g/cm3 at 4 C, 0.9982 at 20 C (CRC). |
| c2 | Verified: 500/800 = 0.625 g/cm3. |
| c3 | Verified: Archimedes: sinks if denser, floats if less dense, hovers if equal. |
| c4 | Verified: 500 g / 1.0 g/cm3 = 500 cm3. |
| c5 | DISPUTED. The physics is right (floating: submerged volume fraction = rho_obj / rho_water = 0.625 = five eighths), and the reveal text states it correctly. But the stage picture does not show it. Demo.tsx places a floating ball at cy = SURF + r - capDepth(f) * r, where capDepth returns the cap depth h/r. A cap of depth h r has its centre at SURF + (h/r - 1) r, i.e. the sign is mirrored. Re-running the stage's own functions: at 800 cm3 (density 0.625) the ball is drawn with 37.5% of its volume under water, not 62.5%; at 600 cm3 (0.833) it is drawn 16.7% under, at 550 cm3 (0.909) 9.1% under. Only 1000 cm3 (exactly half) is right, which is the one frame in the transcript screenshot, so the QA walkthrough did not expose it. The reveal says 'You saw the same ball rise and float ... five eighths (62.5%) of itself under the surface' for 800 cm3, which the learner sees contradicted by the drawing (the more dense a floater, the higher it rides, the reverse of reality). Fix for demo-builder: cy = SURF + (capDepth(rho / RHO_W) - 1) * r. Then re-run QA and re-check at 550, 600, 800. |
| c6 | Verified: a hull's enclosed volume (mostly air) makes its average density below water's. |

Recall (200 g in 250 cm3 = 0.8 g/cm3, floats) is correct. Deterministic. No unrecorded claims.

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 A floating object has the same fraction of its volume under water as i... | verified | Fraction submerged = rho/rho_w = 0.625 (Archimedes). Checked the stage fix: cap volume fraction x^2(3-x)/4 with x = h/r; ball bottom at SURF + x r so centre y = SURF + (x-1) r, as in Demo.tsx. At 0.625, x is about 1.17, so about 62.5% of the ball is under the surface. Not rendered by me, but the geometry in code is right. |

Result: 1 verified, 0 disputed, 0 added unverified.
