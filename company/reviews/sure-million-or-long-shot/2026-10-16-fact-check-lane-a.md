# Fact-check (lane A, publish-blocking claims): sure-million-or-long-shot

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read Demo.tsx (HELD_LINE constant and every render path of the held string) and every meta.json field other than claims and evidence for the held string. No server or walkthrough this pass: the gate is a compile-time constant, and FC 57/63 confirmed on :3591 that the line renders nowhere. Sources not re-opened.

| claim | status | reason / fix |
|---|---|---|
| c6 | withdrawn | WITHDRAWN as cut, not as false. Demo.tsx line 27 sets const HELD_LINE = false; lines 124 and 126-127 are the only places '4,098 ... 19 countries' can enter the verdict, and both are gated on it. Not in any other meta field. Not a learner claim, so it does not gate publishing. FC 54b's scope gap (Cicerale 2022 does not name the certainty effect) still applies if it returns; then reset to unverified. |

The same text is in each claim's note in src/demos/*/sure-million-or-long-shot/meta.json.
