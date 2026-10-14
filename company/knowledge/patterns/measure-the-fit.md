```yaml
id: measure-the-fit
confidence: ""     # new 2026-10-14. Cases are the engineering reviews of the same day; the estimator and the measurer are sometimes the same person.
context: Any claim that a reveal, picture or label fits, is legible, or crops by N px on the phone.
problem: Estimates by eye or by arithmetic are wrong in both directions and the errors are invisible. "No collisions at 15.5 units, checked by eye" and "a 112 px crop is about 5 lines" are guesses that the next fix then builds on.
therefore:
  - Probe at 390x844 touch over the real lessons and commit the numbers before the fix (EDD "Measurements") and again after ("Results").
  - Say how many lessons were measured and which were not (595 of 638; QA ran 49).
  - Record what the probe cannot see (tspan, overlays) beside the number.
  - A reviewer re-runs the probe rather than reading the author's table.
would_be_wrong_if: Measured fit figures disagree with a second independent probe as often as hand estimates do, so measuring adds cost and no accuracy.
documented_cases:
  - "W-237 review: reviewer's probe reproduced the author's numbers exactly (engineering/reviews/2026-10-14-W-237-probe.mjs); 433 of 593 lessons shrunk."
  - "W-287 floor: ruling estimated 44 lessons would still fit once shrunk; measured 41. Fully fitting 398 -> 176."
  - "EDD-005 review: predict-phase DOM compared on two builds; but the folded state was only read, not run (a gap the review names)."
known_failure:
  - "Measured on 595 of 638 lessons and QA on 49-98: the sample is not the portfolio. The fold's effect was checked by reading, not by running."
  - "Estimate not retired by measurement elsewhere: demo-standard and design/system.md disagree on reveal budget (120 vs 90 words) and tools/reveal-fit.mjs does not yet bind (constitutional review J4)."
  - "2026-10-14 pattern-librarian review of the host COE: a measurement is only a verdict if the host can run it. reveal-fit timed out on a shared next dev at load 25 to 60 (W-664, 50 to 105 s per load against a 15 s wait); results that errored are not verdicts, and results from private tool copies are not either (company/rituals/records/2026-10-14-coe-host-exhaustion.md, Impact). The pattern's 'a reviewer re-runs the probe' assumes a quiet host; add: record host load beside the number."
  - "Wider use, not a case: the CI COE measured the thing the CI design had guessed (67 min per verify, 945 lessons x 2 projects) and the cap COE found a 30/10 cap never measured against load. The same discipline applies to capacity, but this pattern is scoped to the phone fit; see cap-from-the-wrong-constraint rather than stretching it."
part_of: demo-standard
```
