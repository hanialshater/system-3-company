# Walkthrough: 8 cores: how much faster?

viewport: phone · choice: option 1 · recorded 2026-10-22T19:48:08.297Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** Give a job 8 cores instead of 1. How much sooner does it finish?

## 1. Predict

**Question:** You run a 60-minute job on your computer. 45 of those minutes can be split across cores; the other 15 cannot be split. With 8 cores, how long does it take?

1. 7.5 min
2. About 21 min
3. 30 min

**Stage while locked:**

```
TIME
60.0 min
SPEED-UP
1×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
4 cores
8 cores
Unlimited cores
Reset
[picture: Job bar: 15 minutes that cannot split, then 1 lane for the 45 that split; 60.0 minutes in all]
```

![predict](01-predict.png)

Learner chose **7.5 min**.

## 2. Explore

**Panel:** You said 7.5 min. Try 2, 4 and 8 cores, then unlimited. Watch the grey block.

### Step 1: tapped "2 cores"

```
TIME
37.5 min
SPEED-UP
1.6×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
✓ 37.5
4 cores
8 cores
Unlimited cores
Reset
[picture: Job bar: 15 minutes that cannot split, then 2 lanes for the 45 that split; 37.5 minutes in all]
```

![step 1](02-step-1.png)

### Step 2: tapped "4 cores"

```
TIME
26.3 min
SPEED-UP
2.3×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
✓ 37.5
4 cores
✓ 26.3
8 cores
Unlimited cores
Reset
[picture: Job bar: 15 minutes that cannot split, then 4 lanes for the 45 that split; 26.3 minutes in all]
```

![step 2](03-step-2.png)

### Step 3: tapped "8 cores"

```
TIME
20.6 min
SPEED-UP
2.9×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
✓ 37.5
4 cores
✓ 26.3
8 cores
✓ 20.6
Unlimited cores
Reset
[picture: Job bar: 15 minutes that cannot split, then 8 lanes for the 45 that split; 20.6 minutes in all]
```

![step 3](04-step-3.png)

### Step 4: tapped "Unlimited cores"

```
TIME
15.0 min
SPEED-UP
4×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
✓ 37.5
4 cores
✓ 26.3
8 cores
✓ 20.6
Unlimited cores
✓ 15.0
Reset
[picture: Job bar: 15 minutes that cannot split, then unlimited lanes for the 45 that split; 15.0 minutes in all]
```

![step 4](05-step-4.png)

### Step 5: tapped "Reset"

```
TIME
60.0 min
SPEED-UP
1×
can't split
splits across cores
0
30
60 min

Model: the split part divides perfectly; no overhead.

2 cores
✓ 37.5
4 cores
✓ 26.3
8 cores
✓ 20.6
Unlimited cores
✓ 15.0
Reset
[picture: Job bar: 15 minutes that cannot split, then 1 lane for the 45 that split; 60.0 minutes in all]
```

![step 5](06-step-5.png)

## 3. Reveal

> Not quite: it was “About 21 min”.
> With 8 cores the 45 splittable minutes shrank to 5.6 on each core, but the grey 15 that cannot be split stayed 15: 20.6 minutes, 2.9 times faster, not 8.
> Unlimited cores still left the grey 15, so the job took 15.0 minutes and can never run more than 4 times faster. The part that must run on one core sets the limit. Computer scientists call this Amdahl's law.

![reveal](07-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

In the stage's model (a 60-minute job: 15 minutes cannot be split, 45 can) 8 cores take 15 + 45 / 8 = 20.6 minutes (5.6 minutes of split work on each core), a speed-up of 60 / 20.625 = 2.9 times, not 8. On the way, 2 cores take 37.5 min (1.6×) and 4 cores 26.3 min (2.3×).

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c1

With unlimited cores the split part's time goes to 0 and the job still takes the 15 minutes that cannot be split, so it can never run more than 60 / 15 = 4 times faster.

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c2

This limit is known as Amdahl's law: if a share s of a job must run on one core, the speed-up on n cores is 1 / (s + (1 − s) / n), never more than 1 / s (here s = 1/4: 2.9 on 8 cores, at most 4).

CHECKED rests on a published source

address: cs.eight-cores-not-eight-times.c3

The stage is a toy model: the split part divides perfectly among cores and splitting and coordinating the work cost nothing (caption: "Model: the split part divides perfectly; no overhead.").

CHECKED rests on a definition or convention

address: cs.eight-cores-not-eight-times.c4

Teaching evidence: 0 human-learner studies, 1 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

