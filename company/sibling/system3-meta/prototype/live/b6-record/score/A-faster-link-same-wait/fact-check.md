# Fact-check: faster-link-same-wait

## 1. Learner-visible text and numbers, and how each was checked

| Item | Check | Result |
|---|---|---|
| Title "Double the link speed, halve the wait?" / hook "10 packets, each waiting for a reply. What does a link twice as fast save?" | Questions, no factual content | OK |
| Predict: 10 packets, 1 ms each, 50 ms round trip, "Total: 510 ms" | node: 10 x (1+50) = 510; code `timeline("base")` gives 510 | OK |
| Options 255 / 505 / 60, answer 505 | node: 10 x (0.5+50) = 505; `answer: 1` = "About 505 ms" | OK |
| Readout TOTAL 510 / 505 / 110 / 60 ms (screens 01-05) | node sim of the same loop as `timeline()`: 510, 505, 110, 60 | OK |
| Button traces "✓ 505", "✓ 110", "✓ 60", "Reset 510" | `seen[m] = totalOf(m)`; Reset label `totalOf("base")` | OK |
| Axis ticks 0-500 ms, scale 0-520 | `px()` maps 0..520 to 10..328; end marker at total | OK |
| Legend "sending" / "waiting"; timeline shapes | 10 send ticks + 10 grey gaps (base/double), 2 batches (five), 1 batch (all) visible in screenshots | OK (see D4) |
| Caption "Model: send a batch, then wait 50 ms for the reply." | Matches `RTT = 50` and loop | OK |
| Reveal: "saved only 5 ms, 510 down to 505" | node 510-505 = 5 | OK |
| Reveal: "each packet spent 1 ms being sent and 50 ms waiting" | SETUP base send 1, RTT 50 | OK |
| Reveal: "all 10 ... 60 ms on the original link (5 at a time: 110 ms), 8.5 times faster" | node 510/60 = 8.5; 2 x (5+50) = 110 | OK |
| Reveal: "That wait, latency, is set by distance and signal speed, so a faster link cannot shorten it" | Propagation delay = distance/speed (standard; Kurose & Ross ch.1 delay decomposition). But RTT also includes queueing, processing and the reply's own transmission time | Oversimplified (D3) |
| Reveal: "TCP keeps many packets in flight for this reason" | RFC 9293 sliding window (sender may have up to SND.WND unacknowledged); network fetch of RFC 9293 was blocked here (DNS/proxy), checked from knowledge: s.3.8 is "Data Communication", s.3.8.6 "Managing the Window" | OK, section citation consistent |
| Trust sheet: five claim texts + "CHECKED" badges | See D1, D2 | defects |

## 2. claims.json

- c1: all numbers recomputed in node (510, 505, 5, 110, 60, 8.5). Matches stage and reveal.
- c2: physics correct for propagation delay; reveal states the stronger "set by distance and signal speed" without the queueing/processing caveat that the claim's own source note adds. Partial match (D3).
- c3: RFC 9293 s.3.8 Data Communication / window management: section correct to my knowledge; could not fetch online in this environment. Reveal sentence matches the claim.
- c4: the caption does name the model. Matches.
- c5: arithmetic holds (20x51 = 1020; doubled 20x50.5 = 1010; batched 20+50 = 70). But no recall item appears anywhere in the walkthrough, and the source note says "Flagged as unrecorded" (D2).

## 3. Defects

| id | quote | what is wrong | recomputation / source | severity | confidence |
|---|---|---|---|---|---|
| D1 | "CHECKED rests on a published source" (c3) / "CHECKED rests on a derivation" (c5) | Trust sheet shows every claim as CHECKED, yet c3's own source says attribution waits for the fact-checker ("if not checkable, the reveal's last sentence is cut") and c5 is "Flagged as unrecorded". The badge asserts verification that has not happened. | claims.json source fields for c3, c5 | S2 | high |
| D2 | "Recall: when an app fetches 20 small files one at a time..." | Claim shown to the learner in the trust sheet about a recall item that the lesson never shows (absent from transcript and code); not tied to any visible text. | transcript.md, Demo.tsx (no recall item) | S3 | medium |
| D3 | "That wait, latency, is set by distance and signal speed, so a faster link cannot shorten it." | Overstated: round-trip time also includes queueing, processing and the reply's transmission time (a faster link can shrink queueing and transmission parts). The claim's source admits this but the learner-facing sentence does not; Kurose & Ross cited as "any edition, ch. 1" with no section. | Kurose & Ross ch.1 nodal delay = processing + queueing + transmission + propagation | S2 | medium |
| D4 | (stage, Double speed) send ticks | Send ticks are drawn with min width 1.6 px; 1 ms = 0.61 px and 0.5 ms = 0.31 px, so the doubled link looks identical to the original. The stage never shows sending got faster. | W=340, px/ms = 318/520 = 0.6115 | S4 | high |
| D5 | "...8.5 times faster. That wait, latency, ..." | "That wait" has no referent in the paragraph (previous sentence is about the 60 ms batch case). | reading | S4 | low |

S1: 0
S2: 2
S3: 1
S4: 2
