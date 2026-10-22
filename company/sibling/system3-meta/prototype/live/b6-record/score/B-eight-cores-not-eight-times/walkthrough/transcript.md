# Walkthrough: Eight cores, not eight times

viewport: phone · choice: option 1 · recorded 2026-10-22T19:48:44.460Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** A 60-minute job meets 8 cores. Does it really finish 8 times faster? Split it and see.

## 1. Predict

**Question:** A 60-minute job: 45 minutes can be split across cores, 15 minutes cannot. With 8 cores, how long does it take?

1. 7.5 min
2. About 21 min
3. 30 min

**Stage while locked:**

```
CORES
—
TIME
—
SPEED-UP
—
2
4
8
∞
Reset

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: One job bar on 1 core]
```

![predict](01-predict.png)

Learner chose **7.5 min**.

## 2. Explore

**Panel:** You said 7.5 min. Give the job more cores. Try 8, then unlimited.

### Step 1: tapped "2 cores"

```
15 min
45 ÷ 2
0
15
30
45
60
37.5 min
CORES
2
TIME
37.5 min
SPEED-UP
1.6x
2
4
8
∞
Reset

2 → 37.5 min, 1.6x

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: Job bar on 2 cores: 37.5 minutes]
```

![step 1](02-step-1.png)

### Step 2: tapped "4 cores"

```
15 min
45 ÷ 4
0
15
30
45
60
26.25 min
CORES
4
TIME
26.25 min
SPEED-UP
2.29x
2
4
8
∞
Reset

2 → 37.5 min, 1.6x · 4 → 26.25 min, 2.29x

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: Job bar on 4 cores: 26.25 minutes]
```

![step 2](03-step-2.png)

### Step 3: tapped "8 cores"

```
15 min
45 ÷ 8
0
15
30
45
60
20.6 min
CORES
8
TIME
20.6 min
SPEED-UP
2.91x
2
4
8
∞
Reset

2 → 37.5 min, 1.6x · 4 → 26.25 min, 2.29x · 8 → 20.6 min, 2.91x

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: Job bar on 8 cores: 20.6 minutes]
```

![step 3](04-step-3.png)

### Step 4: tapped "Unlimited cores"

```
15 min
45 ÷ ∞ → 0
0
15
30
45
60
15 min
CORES
∞
TIME
15 min
SPEED-UP
4x
2
4
8
∞
Reset

2 → 37.5 min, 1.6x · 4 → 26.25 min, 2.29x · 8 → 20.6 min, 2.91x · ∞ → 15 min, 4x

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: Job bar on unlimited cores: 15 minutes]
```

![step 4](05-step-4.png)

### Step 5: tapped "Reset"

```
15 min
45 ÷ 1
0
15
30
45
60
60 min
CORES
1
TIME
60 min
SPEED-UP
1x
2
4
8
∞
Reset

2 → 37.5 min, 1.6x · 4 → 26.25 min, 2.29x · 8 → 20.6 min, 2.91x · ∞ → 15 min, 4x

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.
[picture: Job bar on 1 cores: 60 minutes]
```

![step 5](06-step-5.png)

## 3. Reveal

> Not quite: it was “About 21 min”.
> With 8 cores the 45 splittable minutes shrank to under 6, but the grey 15 that cannot be split stayed 15: 20.6 minutes, 2.91 times faster, not 8. Unlimited cores still left the 15 minutes, so this job can never run more than 4 times faster.
> This is Amdahl's law: speed-up = 1 / (serial share + parallel share / cores). The part that must run on one core sets the limit; more cores help only the part that splits.

![reveal](07-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

With 8 cores the 45 splittable minutes shrink to 45/8 = 5.6 minutes (under 6), the 15 that cannot split stay 15, so the job takes 15 + 45/8 = 20.6 minutes, a speed-up of 60/20.6 = 2.9 (2.91x), not 8.

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c1

On the way, 2 cores take 15 + 45/2 = 37.5 minutes (1.6x) and 4 cores take 15 + 45/4 = 26.25 minutes (2.29x).

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c2

With unlimited cores the splittable part shrinks toward 0, so the time approaches 15 minutes and the job can never run more than 60/15 = 4 times faster.

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c3

This is Amdahl's law: speed-up = 1 / (serial share + parallel share / cores), so the part that must run on one core sets the limit and more cores help only the part that splits.

CHECKED rests on a published source

address: cs.eight-cores-not-eight-times.c4

The 20 minutes that cannot split still take 20 minutes, so a 60-minute job can never take less than 20: at most 3 times faster, however many cores.

CHECKED rests on a derivation (worked out step by step)

address: cs.eight-cores-not-eight-times.c5

Toy model: the splittable part divides perfectly across cores, and the cost of splitting and coordinating the work is ignored.

CHECKED rests on a definition or convention

address: cs.eight-cores-not-eight-times.c6

Teaching evidence: 0 human-learner studies, 1 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

