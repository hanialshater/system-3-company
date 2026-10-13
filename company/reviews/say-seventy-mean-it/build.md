# Build note: say-seventy-mean-it

- Intent: one row of 20 answers (✓ / ✗), each with a bar = its squared gap at the stated confidence, and a dashed line at the average. Controls in order: Say 90%, Say 70%, Say 50% (start), slider 0–100% step 5. Readout: average squared gap. Bars and readout hidden while locked; the stage caption defines the bar.
- Toy change from the brief: "right 70% of the time" + "20 seeded outcomes" became exactly 14 of 20 right, so the stage average equals 0.7(1 − r)² + 0.3r² with no seed luck; which 6 are wrong is an untuned mulberry32(1) shuffle (layout only).
- Key states (milestones): "ninety" and "seventy" (50% is the start, seen on unlock). QA path: 90 → 70 → 50 → slider.
- Node check: 0.2500 (90%), 0.2100 (70%), 0.2500 (50%), 0.3000 (100%), 0.2200 (60%, 80%).
