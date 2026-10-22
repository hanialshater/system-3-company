# Fact-check: faster-link-same-wait

Checked against walkthrough/transcript.md, the screenshots (01, 03, 04, 06), code/Demo.tsx and styles.module.css, and claims.json. Arithmetic was re-run in node using the code's own formula, rounds = ceil(10/k) and total = rounds x (k x 1/speed + 50).

## What the learner sees, and how each item was checked
| Item | Check | Result |
|---|---|---|
| Hook: "Double your link speed. Do 10 packets ... arrive in half the time?" | This is a question, not a claim | OK |
| Predict text: 1 ms send, 50 ms round trip, "Total: 510 ms" | node: 10 x (1 + 50) = 510 | OK |
| Options 255 / 505 / 60; answer "About 505 ms" | node: 10 x (0.5 + 50) = 505. The code sets answer index 1 | OK |
| Caption at k=1: "1 ms" / "0.5 ms ... (thin marks) ... 50 ms (grey)" | caption() uses SEND/speed | Numbers OK. For marks, see D3 |
| Caption at k=5/10: "5 packets take 5 ms" / "10 packets take 10 ms ... (dark marks) ... 50 ms for one reply" | k x send | Numbers OK. "dark" is wrong, see D1 |
| Readouts 510 / 505 / 110 / 60 and the trace | node: 510, 505, 110, 60. The screenshots match | OK |
| Ticks 0 to 500 on a 0-520 span | X() mapping. The readout is anchored inside the span | OK |
| Alt text: "10 rounds ... 2 rounds ... 1 round, each sends 10 packets" | roundsOf() | Numbers OK. Wording, see D4 |
| Reveal: "saved only 5 ms, 510 down to 505" | 510 - 505 = 5 | OK |
| Reveal: "each packet spent 1 ms being sent and 50 ms waiting" | Model constants (50/51 = 98% of the time is waiting) | OK |
| Reveal: "took 60 ms on the original link, more than eight times faster" | 510/60 = 8.5. The code uses floor(8.5) = 8, so "more than eight" is true | OK |
| Reveal: "The wait is latency: it depends on distance and signal speed, so a faster link cannot remove it." | Propagation delay = distance / propagation speed. Transmission delay = size / bandwidth (Kurose & Ross §1.4 decomposition). It says "depends on", not "only on" | OK within the model (claim c4) |
| Panel: "You said About 255 ms. Try each button..." | Echoes the learner's choice | OK |

## Claims
- c1: 510 / 505 / 60. Recomputed, and they match the visible text. OK.
- c2: 2 x (5 + 50) = 110. Recomputed, and it matches the readout. OK.
- c3: 1 ms vs 50 ms, and 510/60 = 8.5 > 8. Matches the reveal. OK.
- c4: Correct as a standard decomposition, and it matches the reveal. Minor point: it is labelled "derivation" but rests on a textbook decomposition. Not a defect.
- c5: The claim is cut and the TCP sentence is absent from the reveal, which matches. Not shown, so not scored.
- c6: Arithmetic checks out: 82 vs 81 ms per packet, saving 1 ms, and 100 vs 820 ms for n = 10. Its address, "recall why", is not in the walkthrough or in Demo.tsx, but the claim is still shown on the trust sheet. See D2.
- c7: The caption and alt text numbers match the code and the transcript. The "dark marks" wording does not match the stage (D1).

## Defects
| id | quote | what is wrong | recomputation / source | severity | confidence |
|---|---|---|---|---|---|
| D1 | "(dark marks)" (caption in the Send 5 and Send all 10 states) | The send marks are drawn with fill var(--fg), which is white or near-white in the dark theme the walkthrough uses (screenshots 03 and 04). So the caption names the wrong colour for the marks the learner is told to look at. | styles.module.css `.send { fill: var(--fg); }`; screenshots 03-step-2.png and 04-step-3.png show white marks | S3 | high |
| D2 | Trust-sheet claim c6, "With 2 ms to send and an 80 ms wait per packet..." | The trust sheet shows a claim whose address, "recall why", does not appear anywhere in the lesson the learner sees or in the code, so the address cannot be checked. The arithmetic itself is correct. | node: 2+80 = 82, 1+80 = 81, 10x2+80 = 100 vs 820 | S2 | medium |
| D3 | "each packet takes 0.5 ms to send (thin marks)" | Send marks have a minimum width of 3 viewBox units, about 5.7 ms at this scale. So 1 ms and 0.5 ms marks are drawn the same, and the double-speed timeline looks identical apart from the readout. The stage does not show the halved send time the caption describes. | Demo.tsx `Math.max(3, X(b.x1)-X(b.x0))`; 3 x 520/272 = 5.7 ms | S4 | high |
| D4 | Alt text "Timeline: 1 round, each sends 10 packets in 10 ms..." | "each" is used with a single round. This is a grammar issue, and it only affects screen-reader users. | Demo.tsx aria-label template | S4 | high |

No S1 (false) defects found. Every visible number recomputes correctly from the stated model.

S1: 0 · S2: 1 · S3: 1 · S4: 2
