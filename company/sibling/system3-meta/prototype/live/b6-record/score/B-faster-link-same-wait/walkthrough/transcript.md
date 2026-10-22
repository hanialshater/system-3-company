# Walkthrough: Does a faster link halve the wait?

viewport: phone · choice: option 1 · recorded 2026-10-22T19:48:58.747Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** Double your link speed. Do 10 packets that each wait for a reply arrive in half the time?

## 1. Predict

**Question:** You send 10 packets to a distant server. Each takes 1 ms to send, then waits for a reply (50 ms round trip). Total: 510 ms. You double the link speed. Total now?

1. About 255 ms
2. About 505 ms
3. About 60 ms

**Stage while locked:**

```
Model: each packet takes 1 ms to send (thin marks), then waits 50 ms for a reply (grey).

510 ms
0
100
200
300
400
500

Totals: 510

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
[picture: Timeline: 10 rounds, each sends 1 packet in 1 ms then waits 50 ms. Total 510 ms.]
```

![predict](01-predict.png)

Learner chose **About 255 ms**.

## 2. Explore

**Panel:** You said About 255 ms. Try each button and watch the grey waits and your totals.

### Step 1: tapped "Double speed"

```
Model: each packet takes 0.5 ms to send (thin marks), then waits 50 ms for a reply (grey).

505 ms
0
100
200
300
400
500

Totals: 510 · 505

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
[picture: Timeline: 10 rounds, each sends 1 packet in 0.5 ms then waits 50 ms. Total 505 ms.]
```

![step 1](02-step-1.png)

### Step 2: tapped "Send 5 before waiting"

```
Model: 5 packets take 5 ms to send (dark marks), then wait 50 ms for one reply (grey).

110 ms
0
100
200
300
400
500

Totals: 510 · 505 · 110

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
[picture: Timeline: 2 rounds, each sends 5 packets in 5 ms then waits 50 ms. Total 110 ms.]
```

![step 2](03-step-2.png)

### Step 3: tapped "Send all 10 before waiting"

```
Model: 10 packets take 10 ms to send (dark marks), then wait 50 ms for one reply (grey).

60 ms
0
100
200
300
400
500

Totals: 510 · 505 · 110 · 60

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
[picture: Timeline: 1 round, each sends 10 packets in 10 ms then waits 50 ms. Total 60 ms.]
```

![step 3](04-step-3.png)

### Step 4: tapped "Reset"

```
Model: each packet takes 1 ms to send (thin marks), then waits 50 ms for a reply (grey).

510 ms
0
100
200
300
400
500

Totals: 510 · 505 · 110 · 60

Double speed
Send 5 before waiting
Send all 10 before waiting
Reset
[picture: Timeline: 10 rounds, each sends 1 packet in 1 ms then waits 50 ms. Total 510 ms.]
```

![step 4](05-step-4.png)

## 3. Reveal

> Not quite: it was “About 505 ms”.
> Doubling the speed saved only 5 ms, 510 down to 505, because each packet spent 1 ms being sent and 50 ms waiting for its reply. Waiting, not sending, was the cost.
> Sending all 10 before waiting took 60 ms on the original link, more than eight times faster. The wait is latency: it depends on distance and signal speed, so a faster link cannot remove it.

![reveal](06-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

In the toy model (each round sends k packets, k × send time, then waits one 50 ms round trip; 1 ms to send each packet), 10 packets one at a time take 10 × (1 + 50) = 510 ms; at double speed 10 × (0.5 + 50) = 505 ms; all 10 then one wait 10 + 50 = 60 ms.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c1

In the same model, sending 5 packets per round takes 2 × (5 + 50) = 110 ms.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c2

Each packet spent 1 ms being sent and 50 ms waiting for its reply, so waiting, not sending, was the cost; 60 ms is more than eight times faster than 510 ms.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c3

The wait is latency: round-trip time depends on distance and signal speed (time = distance / propagation speed), so a faster link (more bandwidth) cannot remove it; bandwidth changes only the send time.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c4

With 2 ms to send and an 80 ms wait per packet, doubling the speed saves only 1 ms per packet, while sending many before one wait removes most of the 80 ms waits.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c6

The stage caption follows the state of c1's model: one at a time, each packet takes 1 ms to send (0.5 ms at double speed), then waits 50 ms for a reply; in a batch, 5 packets take 5 ms (10 packets take 10 ms) to send, then wait 50 ms for one reply. The timeline's alt text names the same rounds: 10 rounds of 1 packet, 2 rounds of 5, or 1 round of 10.

CHECKED rests on a derivation (worked out step by step)

address: cs.faster-link-same-wait.c7

Teaching evidence: 0 human-learner studies, 2 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

