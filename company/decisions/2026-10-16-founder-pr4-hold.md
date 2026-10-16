# Founder ask: hold PR #4 (100 history map drafts) over GPL-3.0 map data

owner: community-engineer (PR #4) · principal-engineer (data record)
date: 2026-10-16
status: decided
class: engineering
route: community-engineer → principal-engineer → cultural-reviewer → founder
recorded by: chief-of-staff

## What the founder said

Asked: "PR #4's 100 history maps are built from GPL-3.0 map data … What do you want?" Options: hold PR #4 (recommended) / accept GPL-3.0 (option A) / change the design (option C).
Founder chose: **"Hold PR #4 (Recommended)"** (source: this conversation, 2026-10-16 ~21:30Z).

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** PR #4 is not merged. It stays open on GitHub as a parked bank. The licence question (W-1557, `company/decisions/2026-10-16-history-maps-gpl-data.md` on branch pr4/pe, status proposed) stays open until a legal read or a new data source.
- **Left to the owners (how):** community-engineer keeps the review work: the stage A cultural review (W-1558) finishes. Every review branch (pr4/pe, pr4/a11y, pr4/hist) is merged into the PR integration branch and pushed to `feat/history-maps-100` (append-only, no force). The verdicts are posted on the PR so nothing is lost. No further spend on per-lesson reviews, fixes or QA for the 100 (history line is over budget: cm-history's admission view, `company/domains/briefs/history-maps-100-admission.md` on pr4/hist).

## Route and answers

| Step | Role | Answer | Where |
|---|---|---|---|
| 1 | community-engineer | blocked: tier 2, GPL data, stage A missing | `company/engineering/community/prs/4.md` (pr4-history-maps) |
| 2 | principal-engineer | approve engineering with conditions; licence is founder's; engineering recommendation B1 (do not merge for now) | `company/engineering/reviews/2026-10-16-pr4-engineering-review.md` (pr4/pe) |
| 3 | research-lead | stage A provenance note: 10 lessons tier A, 55 B, 35 C | `company/research/notes/2026-10-16-provenance-history-maps-100.md` (pr4/hist) |
| 4 | cultural-reviewer | in progress (W-1558) | pr4/hist |
| 5 | founder | hold | this record |

## Objections

| Objection | Raised by | Status |
|---|---|---|
| The map data is already public in the PR's GitHub branch, so holding the merge does not un-publish it. | principal-engineer (W-1557 record) | Open: holding avoids serving it from the product. Whether the branch itself needs action is part of the legal read. |
| Hold loses momentum on 100 built lessons. | chief-of-staff | Answered: all review work is preserved on the PR branch; a labels-only redesign (option C) or a different source can reuse the stage, claims and research. |

## What would make this record wrong

- A legal read clearing GPL-3.0 use with notice and attribution (then option A), or a replacement data source (then option C).
