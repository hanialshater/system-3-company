# Fact-check (lane A, publish-blocking claims): same-week-a-year-apart

fact-checker · 2026-10-16 · worktree base cdee168c. Checker: a fresh fact-checker instance; I did not write, build or record any claim checked here. Brief: chief of staff's lane A (claims that are the only gate keeping a review lesson from publishing). Builder notes and build.md not read.

Method: Read Demo.tsx (HELD_LINE constant and every render path of the held string) and every meta.json field other than claims and evidence for the held string. No server or walkthrough this pass: the gate is a compile-time constant, and FC 57/63 confirmed on :3591 that the line renders nowhere. Sources not re-opened.

| claim | status | reason / fix |
|---|---|---|
| c6 | withdrawn | WITHDRAWN as cut, not as false. Demo.tsx line 27 sets const HELD_LINE = false and line 91 is the only render path for L (line 47); the sentence appears in no other meta field (hook, objective, recall checked). A learner never reads it, so it is not a learner claim and does not gate publishing. Not verified: type (d) and W-1059 are still unruled, and 'with real payments' rests on the unopened primary paper (FC 54b). If HELD_LINE is ever turned on, the builder must reset this to unverified and the (d) check applies. |

The same text is in each claim's note in src/demos/*/same-week-a-year-apart/meta.json.
