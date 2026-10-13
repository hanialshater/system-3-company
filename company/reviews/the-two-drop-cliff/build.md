# Build note: the-two-drop-cliff
- Intent: pH vs volume traces itself; volume counted in 0.05 mL drops (integers) to avoid float error. 'Run to 24.90 mL' then '+4 drops' is the QA path to the key state (one step crossing 25.00 within 4 drops).
- Second milestone 'flat' (passed 20 mL). All reveal numbers computed from pH().
- After screenshots: '50 mL' tick clipped; widened right margin. Caught an arithmetic slip in my own draft (1 in 2,500 → 1 in 250, now computed).
