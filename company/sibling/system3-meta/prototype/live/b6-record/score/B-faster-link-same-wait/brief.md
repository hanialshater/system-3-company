LESSON faster-link-same-wait · domain cs (strand systems) · brief company/domains/briefs/cs.systems.md:133-149 (#5)
Concept: latency-vs-bandwidth · level core · demand 3 · format: Single card · Needs interaction-designer spec: not stated
Planned claims: 3 (1: derivation, 2: derivation, 3: source) · orderer cm-cs (strand manager cm-cs-systems)
Lessons follow company/product/demo-standard.md; every learner-visible factual sentence is a claim in meta.json (CLAUDE.md).

Shared rules from the group "Wave J (cm-cs, 2026-10-14): five new concepts, demand 3 first" (company/domains/briefs/cs.systems.md:95):
Written by cm-cs for Wave J. Every concept below is new to `content/curriculum/cs.json` (`subarea: systems`) and has no lesson. Same rules as the Wave J section of `cs.algorithms.md`: stage text <= 25 words, reveal <= 90 words (count given), labels >= 10 px, preset buttons in DOM order reaching every milestone with Reset last, every answer re-run in node on 2026-10-14 and checkable by derivation or simulation. Each lesson's numbers come from a stated toy model; the stage caption names the model so no claim pretends to be a hardware measurement. No simulated review counts as learning evidence.

Brief (verbatim):
### 5. faster-link-same-wait · concept: latency-vs-bandwidth · core · demand 3
- Format: Single card
- Audience and knowledge boundary: learner knows: data travels as packets / does not know: that when each packet waits for a reply, the round-trip time, not the link speed, decides the transfer time, and that sending several before waiting removes most of the wait.
- Misconception: Doubling the link speed halves the transfer time.
- Prediction (stage text, 24 words): "10 packets. Each takes 1 ms to send, then waits for a reply (50 ms round trip). Total: 510 ms. Double the link speed:" options: A) About 255 ms / B) About 505 ms / C) About 60 ms (answer: B). The locked stage shows the 510 ms timeline.
- Check (derivation, node, 2026-10-14): model: each round sends k packets (k × send time) then waits one round trip. One at a time: 10 × (1 + 50) = 510 ms. Double speed: 10 × (0.5 + 50) = 505 ms. 5 per round: 2 × (5 + 50) = 110 ms. All 10 per round: 10 + 50 = 60 ms.
- What the stage shows: one timeline 0-520 ms (tick labels >= 10 px): sending as dark ticks, waiting as grey gaps; total readout. Controls in DOM order: Double speed (505), Send 5 before waiting (110), Send all 10 before waiting (60), Reset (4). A trace keeps each total.
- Key state (milestones): doubled (505 recorded), window-all (60 recorded). The 110 state is on the QA path and quoted only if visited. Reveal unlocks after both.
- Reveal payoff (draft, 79 words): "Doubling the speed saved only 5 ms, 510 down to 505, because each packet spent 1 ms being sent and 50 ms waiting for its reply. Waiting, not sending, was the cost. Sending all 10 before waiting took 60 ms on the original link, more than eight times faster. The wait is latency: it depends on distance and signal speed, so a faster link cannot remove it. Protocols such as TCP keep many packets in flight for this reason."
- Phone fit (390x844): the reveal points at the grey gaps and the trace. One timeline and one trace; stage-top crop 0 px.
- Planned claims:
  1. One at a time: 510 ms; double speed: 505 ms; all 10 then one wait: 60 ms. support: derivation (model above, stated in the caption).
  2. Round-trip time is set by distance and propagation speed, not by link bandwidth. support: derivation (time = distance / signal speed; bandwidth changes only the send time).
  3. TCP lets a sender have many unacknowledged bytes in flight (a sliding window). support: citation; source: RFC 9293 (2022), Transmission Control Protocol, section 3.8 (window management). Attribution: fact-checker confirms the section; if not checkable, cut the last reveal sentence.
- Curriculum (new concept): `{"id":"latency-vs-bandwidth","name":"Latency vs bandwidth: waiting for replies, not link speed, sets the time","level":"core","demand":3,"prerequisites":[],"subarea":"systems"}`; also none; references none; tags networks, latency, bandwidth, TCP.
- Differs from nearest: no lesson covers latency. turns-beat-first-come-first (round-robin-scheduling) is about waiting in a queue for a processor, not waiting for a reply.
