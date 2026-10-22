# Walkthrough: Double the link speed, halve the wait?

viewport: phone · choice: option 1 · recorded 2026-10-22T19:48:21.740Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** 10 packets, each waiting for a reply. What does a link twice as fast save?

## 1. Predict

**Question:** You send a friend 10 packets. Each takes 1 ms to send, then you wait for a reply (a 50 ms round trip) before the next. Total: 510 ms. You double the link speed. Now the total is:

1. About 255 ms
2. About 505 ms
3. About 60 ms

**Stage while locked:**

```
TOTAL
510 ms
0
100
200
300
400
500 ms
sending
waiting

Model: send a batch, then wait 50 ms for the reply.

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
510
[picture: Timeline: 10 packets, 1 per round, 510 ms in all]
```

![predict](01-predict.png)

Learner chose **About 255 ms**.

## 2. Explore

**Panel:** You said About 255 ms. Double the speed, then send 5, then all 10 before waiting. Watch the grey gaps.

### Step 1: tapped "Double speed"

```
TOTAL
505 ms
0
100
200
300
400
500 ms
sending
waiting

Model: send a batch, then wait 50 ms for the reply.

Double speed
✓ 505
Send 5 before waiting
Send all 10 before waiting
Reset
510
[picture: Timeline: 10 packets, 1 per round, 505 ms in all]
```

![step 1](02-step-1.png)

### Step 2: tapped "Send 5 before waiting"

```
TOTAL
110 ms
0
100
200
300
400
500 ms
sending
waiting

Model: send a batch, then wait 50 ms for the reply.

Double speed
✓ 505
Send 5 before waiting
✓ 110
Send all 10 before waiting
Reset
510
[picture: Timeline: 10 packets, 5 per round, 110 ms in all]
```

![step 2](03-step-2.png)

### Step 3: tapped "Send all 10 before waiting"

```
TOTAL
60 ms
0
100
200
300
400
500 ms
sending
waiting

Model: send a batch, then wait 50 ms for the reply.

Double speed
✓ 505
Send 5 before waiting
✓ 110
Send all 10 before waiting
✓ 60
Reset
510
[picture: Timeline: 10 packets, 10 per round, 60 ms in all]
```

![step 3](04-step-3.png)

### Step 4: tapped "Reset
510"

```
TOTAL
510 ms
0
100
200
300
400
500 ms
sending
waiting

Model: send a batch, then wait 50 ms for the reply.

Double speed
✓ 505
Send 5 before waiting
✓ 110
Send all 10 before waiting
✓ 60
Reset
510
[picture: Timeline: 10 packets, 1 per round, 510 ms in all]
```

![step 4](05-step-4.png)

## 3. Reveal

> Not quite: it was “About 505 ms”.
> Doubling the speed saved only 5 ms, 510 down to 505, because each packet spent 1 ms being sent and 50 ms waiting for its reply. The grey gaps were the cost.
> Sending all 10 before waiting took 60 ms on the original link (5 at a time: 110 ms), 8.5 times faster. That wait, latency, is set by distance and signal speed, so a faster link cannot shorten it. TCP keeps many packets in flight for this reason.

![reveal](06-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

In the stage's model (10 packets; each round sends a batch at 1 ms per packet, then waits one 50 ms round trip) one at a time takes 10 × (1 + 50) = 510 ms; a link twice as fast takes 10 × (0.5 + 50) = 505 ms, saving 5 ms; 5 per round takes 2 × (5 + 50) = 110 ms; all 10 then one wait takes 10 + 50 = 60 ms, 510 / 60 = 8.5 times faster. Each packet spends 1 ms being sent and 50 ms waiting.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c1

The wait for a reply (latency, the round-trip time) is set by the distance the signal travels and its speed, so a faster link (more bandwidth) cannot shorten it; bandwidth changes only the time to put the packets on the link.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c2

TCP lets a sender keep many packets (unacknowledged bytes, up to a window) in flight before it waits for replies, to avoid paying one round trip per packet.

CHECKED rests on a published source

address: cs.faster-link-same-wait.c3

The stage is a toy model with fixed 1 ms send times and a fixed 50 ms round trip, not a measurement of a real network (caption: "Model: send a batch, then wait 50 ms for the reply.").

CHECKED rests on a definition or convention

address: cs.faster-link-same-wait.c4

Recall: when an app fetches 20 small files one at a time, waiting for each reply, most of the time is waiting; a link twice as fast or slightly smaller files barely shorten it, while asking for all 20 before waiting pays the round trip about once instead of 20 times.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c5

Teaching evidence: 0 human-learner studies, 1 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

