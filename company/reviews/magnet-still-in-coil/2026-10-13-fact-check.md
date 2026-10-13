# Fact-check: magnet-still-in-coil (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Faraday's law emf = -N dPhi/dt. |
| c2 | verified | Stationary flux gives dPhi/dt = 0 so emf = 0. |
| c3 | verified | Lenz's law; node: push gives -123.4 mV, pull gives +123.4 mV. |
| c4 | verified | node: re-ran emfAt from the Demo.tsx model: peak 0.12336 V at 0.2257 s; 10 ms-sampled peak 0.1233 V; integral 9.857 mV s = N*dPhi. |
| c5 | verified | Muted line: 'The coil, magnet and meter values are illustrative; the zero while still is not.' |
