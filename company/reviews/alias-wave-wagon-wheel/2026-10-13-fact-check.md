# Fact-check: alias-wave-wagon-wheel (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: max /cos(2pi4n/5) - cos(2pi n/5)/ over n=0..5 = 9e-16; 4 Hz vs 2 Hz differ by 1.12 and vs 0.5 Hz by 2 at some n. Matches stage dots (FS = 5). |
| c2 | verified | node over every slider value 0.5..4: alias(f) = f for f <= 2.5 and 2, 1.5, 1 Hz for f = 3, 3.5, 4, each passing through the same 6 dots (< 1e-9). Nyquist-Shannon: Shannon (1949), Proc. IRE 37(1): 10-21. |
| c3 | verified | Sampling theorem (Shannon 1949): sample rate must exceed twice the highest frequency; e.g. CD audio 44.1 kHz for a 20 kHz band. |
| c4 | verified | Demo.tsx: FS = 5, Slider min 0.5 max 4 step 0.5, curves from Math.cos (idealised). |
