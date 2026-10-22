# Walkthrough: Will the drivers ever stop switching?

viewport: phone · choice: option 1 · recorded 2026-10-22T19:48:34.413Z

> This transcript records only what a learner sees. It has no brief, objective or builder notes. Evaluators: write your findings from this before you read anything else.

**Hook:** Six drivers keep hopping to whichever road is faster. Does the hopping ever end?

## 1. Predict

**Question:** You watch six drivers pick between two roads. One at a time, a driver switches roads if the other road is faster for them right now. The road times are on the stage. The switching:

1. Stops within a few switches
2. Goes back and forth for ever
3. Stops only for some driver orders

**Stage while locked:**

```
A
10 min × cars
empty
B
25 + 5 min × cars
55 min
1
2
3
4
5
6
delay meter
255
One at a time: run
All at once: 4 rounds
Start over
```

![predict](01-predict.png)

Learner chose **Stops within a few switches**.

## 2. Explore

**Panel:** You said Stops within a few switches. Run one at a time, then all at once. Watch the delay meter.

### Step 1: tapped "One at a time: run"

```
A
10 min × cars
30 min
1
2
3
B
25 + 5 min × cars
40 min
4
5
6
delay meter
165
driver	saved	meter
1	45 min	255 → 210 (−45)
2	30 min	210 → 180 (−30)
3	15 min	180 → 165 (−15)
4	0 min	165 · stays
One at a time: run
✓ 255 → 165
All at once: 4 rounds
Start over
```

![step 1](02-step-1.png)

### Step 2: tapped "All at once: 4 rounds"

```
A
10 min × cars
empty
B
25 + 5 min × cars
55 min
1
2
3
4
5
6
delay meter
255
driver	saved	meter
1	45 min	255 → 210 (−45)
2	30 min	210 → 180 (−30)
3	15 min	180 → 165 (−15)
4	0 min	165 · stays

rounds: 55 → 60 → 55 → 60 → 55 min

meter: 255 → 210 → 255 → 210 → 255

One at a time: run
✓ 255 → 165
All at once: 4 rounds
✓ 60 / 55
Start over
```

![step 2](03-step-2.png)

### Step 3: tapped "Start over"

```
A
10 min × cars
empty
B
25 + 5 min × cars
55 min
1
2
3
4
5
6
delay meter
255
One at a time: run
✓ 255 → 165
All at once: 4 rounds
✓ 60 / 55
Start over
```

![step 3](04-step-3.png)

## 3. Reveal

> Your prediction held.
> The meter adds, for each road, the time with 1 car, 2 cars, … up to its cars, so each switch cut it by exactly the switcher's saving: 45, 30, 15. It falls at every switch and can't fall for ever, so switching must end: after 3, with 3 on A at 30 min and 3 on B at 40.
> All at once, each saving assumed the others stayed put. The meter rose, 210 to 255, and the crowd flipped between 60 and 55 minutes.

![reveal](05-reveal.png)

## Appendix: trust sheet (a learner sees this only if they tap “Why trust this?”)

```
What this lesson claims
Close

On the stage's roads (road A takes 10 min × its cars, road B takes 25 + 5 min × its cars; a driver switches only if the other road is strictly faster for them now), switching one at a time from all six on B takes 3 switches, saving 45, 30 and 15 min, and ends with 3 drivers on A at 30 min and 3 on B at 40 min, where nobody can gain.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c1

The delay meter (for each road, the trip time with 1 car + with 2 cars + … up to its cars) falls by exactly the switching driver's saving at every one-at-a-time switch: 255, 210, 180, 165.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c2

The meter can take only a few values and falls at every one-at-a-time switch, so the switching must stop; from each of the 64 starting arrangements, in any order of drivers, it stops within 3 switches.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c3

If all six switch at once whenever the other road is faster for them, from all on B (55 min) they all go to A (60 min, meter 210), then all back to B (55 min, meter 255), and so on for ever; each driver's saving assumed the others stayed put.

CHECKED rests on a derivation (worked out step by step)

address: cs.drivers-stop-switching.c4

In routing games of this kind (each road's delay depends only on how many use it) one-at-a-time best responses always stop at an equilibrium, because such a potential falls with every switch.

CHECKED rests on a published source

address: cs.drivers-stop-switching.c5

Teaching evidence: 0 human-learner studies, 2 simulated-learner reviews, 1 browser QA runs. Simulated learners find problems; only people can show that a lesson teaches.
```

