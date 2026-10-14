# Build note: second-trader-pays-the-seller

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #7

- Intent: network S (values $0) to T1 to B1 ($1); "Add T2" brings in T2 with her own buyer B2 ($1), drawn separately as the brief's edit requires. A pill on the seller-to-leader edge shows the current bid; a meter along the bottom fills to $1; each trader shows what she keeps.
- Dynamic: T1 bids first at $0; each "Outbid 1¢" hands the lead to the other trader one cent higher (alternating best responses, node re-run: 100 outbids to $1.00, profit 0). "10 outbids" and "To the end" jump ahead; step button present per the play/step rule.
- Milestones: "second" (T2 added) and "top" (bid $1.00). Controls in DOM order: Add T2, Outbid 1¢, 10 outbids, To the end, Remove T2.
- At $1.00 the leader is T1 (even count); both keep $0, the seller gets $1.
- Not run here: build, tsc, QA.
