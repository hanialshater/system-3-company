# Algorithms 200: design route

owner: design-lead (Ines) · 2026-10-16
request: `company/ops/dispatch-requests/2026-10-16-algorithms-200-cs.md`
contract: `company/ops/dispatch-requests/2026-10-16-algorithms-200-engineering.md`
status: format route accepted; artifact review pending

Use the existing **Single card** format for each bounded algorithm mechanism. A
shared renderer does not create a new format. Initial implementation may proceed;
this routing answer is not a visual or learner approval of unbuilt lessons.

| Family | Mechanism the picture must expose |
|---|---|
| Sequence / rows | Indexed input, interval/cursor or compared positions, and the actual move, partition or discarded region. Preserve order and identity through a step. |
| Grid / matrix | Aligned cells and compact row/column meaning; distinguish the updated cell from the predecessor cells or resource boundary that caused it. |
| Graph | Stable topology, arrows where directed, edge weights where needed; frontier, accepted/rejected edge or witness path changes visibly. A distance list alone does not show a path algorithm. |
| Tree | Root/parent links and level structure, with the changed subtree, link or stored aggregate visible. Rotations and melds must change topology rather than merely recolour values. |
| String | Indexed character alignment, active window/state and the comparison or failure transition. A text caption saying a match failed is insufficient when failure is the objective. |

Use rows and node-edge drawings as reusable primitives, with different causal
states per algorithm. Visual variety comes from the mechanism, not decorative
skins. Keep one dominant representation; add only a compact necessary metric or
retained proof. If the contract cannot express a required invariant, report that
lesson to its content owner rather than replacing its cause with a caption.

Predict shows the unsolved input, with controls locked and no answer-bearing
highlight. Run and Step expose the computed process; the completed question case
earns the reveal. The compact **Seen** witness survives Try another and Reset.
Show state with border, shape, line style or position as well as colour; existing
tokens support light/dark mode. Target meaningful labels at 11 px or larger at
390 px, never below the 10 px reveal floor, and keep controls at least 44 px.
Graph size limits from engineering are computational bounds, not permission to
pack unreadable labels; use small fixtures, and follow the existing network-stage
target rules if nodes or edges become tappable.

First rendered references required: one sequence, grid, graph, tree and string
case, each at locked Predict, a causal intermediate frame, completed case,
another case and open Reveal after Reset. Inspect at 390×844, including the
longest caption/proof state. Check stage/reveal fit and the 25/90 word budgets
without shrinking labels or controls. Fix a shared defect before propagating it;
per-lesson clarity and honest gate status remain separate.

No contact sheets are present in this checkout. No artifact was reviewed in this
routing pass; the first-family screenshots remain an explicit open review.
