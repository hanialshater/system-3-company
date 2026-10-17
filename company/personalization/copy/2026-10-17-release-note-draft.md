# Release note draft: personalised new-lesson order (reachable-v3), website part of M1

owner: vp-personalization (Mateo) · started run vp-o1-1017 · date: 2026-10-17 · batch 5 §5 MR line 14, §18.4
status: **DRAFT. Nothing here is verified, nothing is released.** Every sentence that reaches a reader is a claim for the fact-checker and privacy-reviewer. No GO exists: K6 is running, K7 and G have not happened. The founder's release approval is a separate question (MR line 14), and deploys need the founder's approval every time.

## Parts and their state

| # | Part | Source | State |
|---|---|---|---|
| 1 | Simulated result with "in our simulation" and its thinness (G7) | readout 3b on v3 (K7), batch 5 §4 G7 | empty until G |
| 2 | Sensitivity cells named word for word (G3) | readout 3b | empty until G |
| 3 | Cold start was not a scored state; curious-newcomer is the nearest scored case | batch 5 §14.1 item 3 | to write at G |
| 4 | Ordering on the device; nothing stored or sent for it; live effect unmeasured; learners cannot switch it off | privacy E14; batch 5 §11.4 O2 | to write; "nothing sent" is about the order only: each finish already sends a `complete` beacon (fact-check D1; batch 5 §19.3) |
| 5 | What the host can see (residual) | head-of-product review §5, below | proposed text, unverified; must name the `complete` beacon (fact-check O-R1) and take privacy addendum 4 H-1 to H-4 (batch 5 §19.4) |
| 6 | At cold start, pilot review lessons move ahead of published ones | head-of-product review §3; batch 5 §18.5; W-1634 | to write after W-1585 states it |
| 7 | Internal (not learner copy): L3 objection O1, head-of-product's refusal and the founder's answer, with its trigger | fc2 §6; batch 5 §18.1, §19.1; company/decisions/2026-10-17-vp-personalization-l3-question.md | waiting on founder |

## 5. What the host can see (head-of-product's wording, review §5, word for word)

> **What the host can see.** Each lesson is loaded from our host (Vercel) when a learner reaches it, as it is today. With the new order on, the sequence of those loads follows the device's order. So someone who can read the host's request logs could work out part of the order one device was shown, and from the order, something about which Probability and CS lessons that device had finished. We send nothing extra for the order, add nothing to any request, and do not join the host's logs to our event records (privacy E4, E5). privacy-reviewer rated this residual low and already present in kind (`company/reviews/_privacy/2026-10-17-edd-010-design-read.md`, Q-P2).

Open on this paragraph: the clause "and from the order, something about which ... lessons that device had finished" is head-of-product's inference, not privacy's words; privacy-reviewer may cut it (W-1633). Truth of the paragraph goes to the fact-checker (W-1632). The last sentence cites a record and is for the internal note; whether it appears in learner-facing text is privacy's and head-of-product's call.
