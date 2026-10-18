# Fact-check (lane A, publish-blocking claims): saved-or-die-same-600

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read Demo.tsx (HELD_LINE constant and every render path of the held string) and every meta.json field other than claims and evidence for the held string. No server or walkthrough this pass: the gate is a compile-time constant, and FC 57/63 confirmed on :3591 that the line renders nowhere. Sources not re-opened.

| claim | status | reason / fix |
|---|---|---|
| c5 | withdrawn | WITHDRAWN as cut, not as false. Demo.tsx line 29 sets const HELD_LINE = false and line 133 is the only place HELD (line 30) is appended; the sentence is in no other meta field. Not a learner claim, so it does not gate publishing. Not verified (type (d) unruled); FC 57/63's first-hand reading of PMC8432807 and PMC11620341 stands for whoever turns it on. If HELD_LINE is turned on, reset to unverified. |

The same text is in each claim's note in src/demos/*/saved-or-die-same-600/meta.json.
