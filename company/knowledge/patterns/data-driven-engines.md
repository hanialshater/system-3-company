```yaml
id: data-driven-engines
confidence: ""     # new 2026-10-14. Scale evidence is one product line (Life Hacks), the failure evidence is the same line and one crit.
context: Many lessons share one mechanism (200 Life Hacks lessons, resource specs in src/lib/lifehacks/*, kit controls).
problem: One engine plus data per lesson multiplies lesson count at near-zero cost, and multiplies the engine's defects at the same rate.
therefore:
  - Build the engine and its tests once (test:lifehacks 53/53), then add lessons as data and a brief.
  - Fix a template defect once (W-518) and re-judge the lessons after, not one by one.
  - Judge each templated lesson against the bespoke lesson on the same concept; the template must earn its place.
  - Keep unmerged lessons' text unreachable from shared engines (decisions/2026-10-14-pr2-lifehacks-scope.md).
would_be_wrong_if: After the template fix (W-518) the templated duplicates still lose pairwise to the bespoke lessons, so the cause was the concept framing and not the template; or engine-built lessons need as much per-lesson rework as bespoke ones.
documented_cases:
  - "Scale: 200 Life Hacks lessons from shared engines; catalogue at 855 lessons and 4,622 claims, check green (progress.md 2026-10-14)."
  - "Template loss: all three Life Hacks duplicates lose to a bespoke lesson on the same concept (demo crit pairs 1, 2, 3). Counted as one cause, not three independent cases."
known_failure:
  - "The anchor five Life Hacks lessons failed Domain Launch Review for reasons in the shared engines, not in the content; 'land a subset of the code' was the wrong unit (pr2-lifehacks-scope). Merging 5 of 200 strands 195 lessons' text in shared engines."
  - "Crit ruled by one simulated witness that did not read the engine; the template is the proposed common cause, untested."
part_of: demo-standard
```
