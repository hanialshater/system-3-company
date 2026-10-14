```yaml
id: preset-buttons
confidence: ""     # new 2026-10-14. Mostly wave J briefs written to it and one review note; no lesson has been shown to teach better or worse with presets.
context: A lesson with a slider or free input, passed through the QA contract, which presses each control once in DOM order (demo-standard Pre-flight 5; sliders: two arrow presses).
problem: A free control can be driven by QA past the milestones, or never to the question's own case. The reveal then cites a state the path never made.
therefore:
  - Make milestones reachable by preset buttons placed in DOM order, the question's own case pressed last.
  - Keep the free control for exploration, but never as the only route to a milestone.
  - The reveal may cite only states a preset sequence leaves on screen; check Reset and wall taps, which destroy state.
would_be_wrong_if: Learners given presets explore less and recall less than learners given the free control alone (EXP-002 variant), or presets cause as many reveals-quoting-unseen-state findings as sliders did.
documented_cases:
  - "NCM wave J briefs (ai, cs, economics, physics): 'every control is a preset button with the question case pressed last'; milestones reachable by presets in DOM order."
  - "gradient-descent: reveal quotes the presets 0.05 to 0.95 (decisions/2026-10-14-reveal-fits-with-its-picture.md, Example 2)."
known_failure:
  - "Presets destroy state when the last one pressed is Reset: the-bar-nobody-can-forecast reads 'your 0 random nights averaged 0.0' after 111 nights (decisions/2026-10-14-reveal-quotes-what-you-saw.md); wave-from-the-corner's wall taps wipe the labels the reveal cites (demo crit pair 5)."
  - "A slider sweep can pass the milestone without landing on it (throw-it-fast-enough passes 7.85 km/s)."
  - "A preset performs the step for the learner (teach-the-payoff known_failure on binary-search); presets also keep current beliefs (odds, bar lessons, W-207 notes)."
part_of: demo-standard
may_call: earn-the-reveal
```
