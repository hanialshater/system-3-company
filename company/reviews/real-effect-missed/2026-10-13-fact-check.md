# Fact-check: real-effect-missed (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node (independent log-factorial binomial): P(Bin(50,.5)>=31)=0.0595 > 5% and >=32 = 0.0325, so 32 is the smallest bar with false alarm <= 5%. |
| c2 | verified | node: P(Bin(50,0.5)>=32) = 0.03245. |
| c3 | verified | node: P(Bin(50,0.6)>=32) = 0.3356. |
| c4 | verified | node: seed 7000 gives 28 of 100 at 50 flips. 400 other seed sets: mean 34.0, SD 4.5, range 22-47 (source: 33.2, 4.7, 20-47). Consistent. |
| c5 | verified | node: bar(200)=113; P(Bin(200,.5)>=113)=0.0384, >=112 = 0.0518; P(Bin(200,.6)>=113)=0.8603. |
| c6 | verified | node: same seeds extended to 200 flips give 80 of 100. 400 other seed sets: mean 86.2, SD 3.3, range 76-95. |
| c7 | verified | Standard power interpretation; consistent with the 34% catch rate in c3. |
