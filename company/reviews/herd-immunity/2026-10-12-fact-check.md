# Fact-check: herd-immunity

fact-checker · 2026-10-12 · inputs: `src/demos/life/herd-immunity/meta.json` (c1-c8),
`artifacts/walkthroughs/herd-immunity/transcript.md`, and the learner-visible strings in `Demo.tsx`.
The recall card was also read.

**Result: 7 recorded claims verified, 1 DISPUTED (c5), 0 withdrawn. 3 unrecorded claims added as
`unverified` (c9-c11); I wrote them so someone else must verify them. The disputed claim is not
shown in the stage or reveal text, only in the "Why trust this?" sheet, but a disputed claim blocks
publishing until it is reworded.**

## Method

Scripts `artifacts/scratch/fc-life.mjs` and `artifacts/scratch/fc-herd-extra.mjs` (node, run 2026-10-12).
I copied the lesson's `simulate()` exactly (400 people, 4 random contacts per case, seeded) and ran
(a) the lesson's own 200 seeds per setting, (b) 20,000 independent runs with `Math.random`, (c) the
well-mixed model at 70/65/60/50% immune and the textbook final-size equation, (d) a clustered
population.

```
lesson seeds 1..200  80%: mean 4.2 of 80 (median 2; 89% of runs <=10 cases)
                     50%: mean 145.9 of 200 (median 159)
                     75%: mean 7.6 of 100 (median 3)   60%: mean 80.3 of 160 (median 101)
independent 20,000   80%: mean 3.86 | 50%: mean 145.4 | 75%: mean 7.7
Reff at 80%: 4 x 0.2 = 0.80 (model 4 x 79/399 = 0.792). Thresholds: R0=4 -> 75%, R0=5 -> 80%
80% immune: 3.3% of runs took off (>20% of the unprotected)
below the threshold, share of unprotected infected when an outbreak takes off:
  70% immune (Reff 1.2): 34%   65%: 49%   60%: 64%   50%: 80%
final-size equation 1-z=exp(-R z): R 1.04 -> 7.6%, 1.2 -> 31%, 1.6 -> 64%, 2 -> 80%
clustered: 90% immune overall but the 40 unprotected clustered: 100% of runs >10 cases, mean 38.9 of 40
           same 90% immune, well mixed: 0% of runs >10 cases, mean 1.6
```

## Recorded claims

- **c1 VERIFIED (source not opened).** The standard definition of R0. Anderson & May (1991) ch. 2 and
  Fine, Eames & Heymann (2011) CID 52(7):911-916 are real and on topic (reference confirmed by search
  listing; I did not open either). Verdict rests on the standard definition.
- **c2 VERIFIED.** In the stated model (homogeneous mixing, immunity fully blocks catching and passing
  on), expected infections per case = R0 x (1 - p). My simulation of the stage model gives 0.79 at
  80% immune (0.80 by formula). The assumptions are in the claim and in the reveal's last paragraph.
- **c3 VERIFIED.** R0(1 - p) < 1 iff p > 1 - 1/R0; R0 = 4 gives 75%. The threshold is stated with its
  assumptions on the reveal ("everyone mixes at random and immunity is perfect"), and the
  predict/hook text frames a "simple model". Good.
- **c4 VERIFIED.** The lesson's own seeds reproduce the quoted numbers exactly: mean 4.2 of 80 at 80%
  and 145.9 of 200 at 50%. 20,000 independent runs give 3.9 and 145.4, so "about 4" and "about 146"
  hold. Note: these are means. The median at 80% is 2 and at 50% is 159. See F1.
- **c5 DISPUTED.** Text: "Below the threshold an outbreak can still die out early by chance, but
  when it takes off it reaches a large share of the unprotected." The first half is right (at 50%
  immune 9% of runs fizzle; at 70%, 58% do). The second half is false near the threshold. When the
  immune share is just below 75%, a take-off reaches a small share of the unprotected: the
  final-size equation gives 7.6% at Reff 1.04 and 31% at Reff 1.2; my simulation gives 34% of
  unprotected at 70% immune. "A large share" only holds well below the threshold (80% of the
  unprotected at 50%). As a universal statement about "below the threshold" it overstates. The
  cited chapters in Diekmann, Heesterbeek & Britton (2013) were not opened. Fix: see F2.
- **c6 VERIFIED (source not opened).** My clustered simulation: 90% immune overall (above the 75%
  threshold) with the unprotected clustered gives an outbreak in 100% of runs (mean 38.9 of 40
  unprotected), against 0% for the well-mixed 90% case. The two cited papers (Fine et al. 2011;
  Salathe & Bonhoeffer 2008, J R Soc Interface 5(29):1505-1508) are real references that I know
  from the literature but did not open.
- **c7 VERIFIED (general knowledge, source not opened).** Babies too young for a given vaccine and
  people with weakened immune systems (for whom live vaccines are contraindicated) are standard
  examples. I did not open the CDC guidance, so this rests on general knowledge, not a reading.
- **c8 VERIFIED (convention).** Consistent with the stage, but see F3: neither the stage text nor
  the reveal says the disease is "made up" or that real vaccines are imperfect; the reveal says only
  "a simple model ... immunity is perfect".

## Model assumptions wherever a threshold is given

- Reveal states 75% with "This is a simple model: everyone mixes at random and immunity is perfect"
  and "unprotected people who cluster together can keep an outbreak going even above the threshold".
  Present, good.
- The recall card ("R0 = 5 ... simple well-mixed model") also states the assumption.
- The predict text says "each case infects about 4 others" for "no immunity". True of the model at the
  start (4 contacts, none protected). It is not a general statement about disease.

## Unrecorded claims found (added as unverified)

| New id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c9 | Reveal; hook | "Above it, the immune shield people who have no immunity at all." | At 80% immune about 4 of 80 unprotected (5%) catch it on average vs 73% at 50%. True but partial: 3.3% of runs still take off at 80% |
| c10 | Reveal | "Every step tends to be smaller than the last, so the chain dies" | Expected new cases per step shrink by about 0.79-0.8. True on average only |
| c11 | Recall card | R0 = 5 -> more than 80% immune | 1 - 1/5 = 0.8 |

## Fixes routed to demo-builder (problems, not tests)

- F1. The "Typical, 200 runs" readout and the reveal's "typically about 4 of the 80" report a mean. For
  the same setting the median outcome is 2 (and 89% of outbreaks reach 10 or fewer), while the
  mean is pulled up by rare take-offs. At 60% immune the readout shows "80 of 160", but the outcomes
  cluster as either a few cases (23%) or about 100+, so the mean is not a "typical" result of any run.
  Claim c4 says "on average"; the stage says "typical". Say "average" on the stage, or use a median.
- F2. c5 (disputed): a take-off just below the threshold reaches a small share of the unprotected
  (8% to 34% for Reff 1.04 to 1.2), not a "large share". Reword to something true, e.g. "well below the
  threshold, a take-off reaches most of the unprotected (about 80% at 50% immune when R0 = 4)". After
  rewording, an independent checker re-verifies.
- F3. c8 says the disease "is made up" and "real vaccines are not perfect"; neither sentence is
  on the stage, and the claim's source says "stated on the stage and in the reveal". Either put it there
  or reword the claim to what is actually stated ("simple model: random mixing, perfect immunity").
- F4. Reveal says "Above it, the immune shield people who have no immunity at all." At 80% immune the
  unprotected are mostly, not entirely, shielded (c9). Fine as a rounding of "mostly"; consider "mostly".

Next moves: demo-builder rewords c5 / F1 / F3; a checker other than the fact-checker verifies c9-c11
and re-checks c5 after the reword.
