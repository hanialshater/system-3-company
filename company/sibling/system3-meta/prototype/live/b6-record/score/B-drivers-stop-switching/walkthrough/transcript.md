# Walkthrough: Do selfish drivers ever settle?

viewport: phone · choice: option 1 · recorded 2026-10-22T19:49:10.362Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** Drivers keep switching to the faster road. Does the switching ever stop?

## 1. Predict

**Question:** Six drivers, two roads. One at a time, a driver switches if the other road is faster for them right now. The switching:

1. Stops within a few switches
2. Goes back and forth for ever
3. Stops only for some driver orders

**Stage while locked:**

```
A = 10 × cars
—
B = 25 + 5 × cars
1
2
3
4
5
6
55 min
meter 255
= 30+35+40+45+50+55
One at a time
All at once
Start over
[picture: 0 drivers on road A, 6 on road B; meter 255 = 30+35+40+45+50+55]
```

![predict](01-predict.png)

Learner chose **Stops within a few switches**.

## 2. Explore

**Panel:** You said Stops within a few switches. The meter adds, for each road, the trip time with 1 car, 2 cars, … up to its cars: all on B gives 30+35+40+45+50+55 = 255. Run one at a time, then all at once.

### Step 1: tapped "One at a time"

```
A = 10 × cars
1
2
3
30 min
B = 25 + 5 × cars
4
5
6
40 min
meter 165
= 10+20+30 + 30+35+40
driver	saves	meter
—	—	255
1	45 min	210 (−45)
2	30 min	180 (−30)
3	15 min	165 (−15)
settled: A 30 min · B 40 min
One at a time
All at once
Start over
[picture: 3 drivers on road A, 3 on road B; meter 165 = 10+20+30 + 30+35+40]
```

![step 1](02-step-1.png)

### Step 2: tapped "All at once"

```
A = 10 × cars
1
2
3
4
5
6
60 min
B = 25 + 5 × cars
—
meter 210
= 10+20+30+40+50+60
driver	saves	meter
—	—	255
1	45 min	210 (−45)
2	30 min	180 (−30)
3	15 min	165 (−15)
settled: A 30 min · B 40 min

from all on B: 55 → 60 → 55 → 60 min

meter: 255 → 210 → 255 → 210

One at a time
All at once
Start over
[picture: 6 drivers on road A, 0 on road B; meter 210 = 10+20+30+40+50+60]
```

![step 2](03-step-2.png)

### Step 3: tapped "Start over"

```
A = 10 × cars
—
B = 25 + 5 × cars
1
2
3
4
5
6
55 min
meter 255
= 30+35+40+45+50+55
driver	saves	meter
—	—	255
1	45 min	210 (−45)
2	30 min	180 (−30)
3	15 min	165 (−15)
settled: A 30 min · B 40 min

from all on B: 55 → 60 → 55 → 60 min

meter: 255 → 210 → 255 → 210

One at a time
All at once
Start over
[picture: 0 drivers on road A, 6 on road B; meter 255 = 30+35+40+45+50+55]
```

![step 3](04-step-3.png)

## 3. Reveal

> Your prediction held.
> Each switch lowered the meter by exactly the driver's saving: 45, 30, 15. After 3, nobody could gain: 3 on A at 30 min, 3 on B at 40.
> All 64 starts stop within 3 switches. Whenever a road's delay depends only on how many use it, switching one at a time always stops: such a meter falls with each switch and can't fall for ever.
> All at once, the meter rose again: nothing stopped the flips (55, 60, 55, 60 min).

![reveal](05-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

On the stage's roads, switching one at a time from all-on-B takes 3 switches (savings 45, 30, 15 min) and ends with 3 drivers on A at 30 min and 3 on B at 40 min.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c1

The delay meter (for each road, the sum of the trip time with 1, 2, …, n cars) falls by exactly the switching driver's saving at every switch: 255, 210, 180, 165.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c2

From each of the 64 starting arrangements, one-at-a-time switching (drivers in turn) stops within 3 switches.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c3

If all six switch at once whenever the other road is faster, they alternate between all on B (55 min) and all on A (60 min) for ever.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c4

In routing games of this kind (each road's delay depends only on how many use it), one-at-a-time switching to a faster road always stops at an equilibrium, because such a meter falls with every switch and cannot fall for ever.

CHECKED rests on a published source

address: cs.drivers-stop-switching.c5

Road A takes 10 min × the cars on A; road B takes 25 min + 5 min × the cars on B; six drivers; a driver switches only if the other road is strictly faster for them right now.

CHECKED rests on a definition or convention

address: cs.drivers-stop-switching.c6

Each one-at-a-time switch lowers a total-delay meter by exactly what the switcher saves, and the meter cannot fall for ever, so the switching stops; when everyone switches at once there is no such guarantee and the crowd can flip for ever.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c7

The meter adds, for each road, the trip time with 1 car, 2 cars, … up to its cars: all on B gives 30+35+40+45+50+55 = 255 (the stage spells out the current terms, e.g. 10+20+30 + 30+35+40 = 165 at 3 on A, 3 on B).

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c8

When all six switch at once from all on B, the meter goes 255 → 210 → 255 → 210 (all on B, all on A, …): it rises again, so nothing stops the flips.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c9

Teaching evidence: 0 human-learner studies, 2 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

