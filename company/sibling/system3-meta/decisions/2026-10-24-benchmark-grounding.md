# Benchmarks grounded in real test material, run until they discriminate

owner: vp-meta · date: 2026-10-24 · status: decided · class: research method · route: founder → vp-meta

## Ask

Founder, 2026-10-24: "Is the task difficult enough?" (B11 saturated), "make it grounded in real compatibility test";
and on reasoning: "victories happen after many many failures … if we just change our mind based on data that is not
innovation that is accounting".

## Decision

- Hold the thesis (organisations of agents beat single agents on work too big and too long for one mind); treat each
  loss as a reason to redesign, not to quit; keep committed predictions so a loss says what to change.
- Benchmarks use real test material where it exists: B12 replays SQLite 3.53.4's own Tcl test suite (from Ubuntu's
  archive) through the driver, with real SQLite's outputs; a task that saturates for both arms is replaced by a harder one.
- Correctness is measured with load-independent referees (byte-exact outputs, instruction counts), never wall-clock
  time on a shared machine.

## Evidence

B8-B10: the multi-agent designs lost to one agent on tasks that fit one context (and B9's timings were noise under
parallel load). B11 (generated core corpus) saturated. B12 (SQLite's own tests) discriminates: 57.8% → 88-89%.
