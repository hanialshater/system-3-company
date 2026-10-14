# Build note: second-trader-pays-the-seller

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #7

- Intent: network S (values $0) to T1 to B1 ($1); "Add T2" brings in T2 with her own buyer B2 ($1), drawn separately as the brief's edit requires. A pill on the seller-to-leader edge shows the current bid; a meter along the bottom fills to $1; each trader shows what she keeps.
- Dynamic: T1 bids first at $0; each "Outbid 1¢" hands the lead to the other trader one cent higher (alternating best responses, node re-run: 100 outbids to $1.00, profit 0). "10 outbids" and "To the end" jump ahead; step button present per the play/step rule.
- Milestones: "second" (T2 added) and "top" (bid $1.00). Controls in DOM order: Add T2, Outbid 1¢, 10 outbids, To the end, Remove T2.
- At $1.00 the leader is T1 (even count); both keep $0, the seller gets $1.
- Not run here: build, tsc, QA.

## Pre-flight v2

Revision for r6 (adult-beginner): the title "A second trader pays the seller" answered the question. Renamed "A rival middleman arrives". The bid meter now has a label ("bid to the seller: $…"), and a tick with "highest with T2: $1.00" keeps the top bid reached with T2 through "Remove T2"; the reveal quotes that record. No claim text changed.

1. **Title and hook.** "A rival middleman arrives" / "A middleman keeps $1. A rival middleman arrives. Do they split the dollar?" Neither says who ends up with the dollar.
2. **Options.** "The two traders split it", "The seller", "The buyer": no numbers, same form.
3. **Locked stage.** S, T1, B1, dashed T2 and B2, "values $0/$1" labels, the empty meter with "bid to the seller: ?", readouts "?". No peak tick, nothing highlighted on S.
4. **Reveal values.** "Alone, T1 bid $0 and sold for $1": the unlocked starting state (and after Remove T2), with "Alone, T1 bids $0 and sells for $1." "climb to $1.00": `peak`, recorded on each bid, = $1.00 by milestone "top"; shown by the tick and "highest with T2: $1.00". "seller takes the whole $1, traders $0": the state at milestone "top" (readouts), kept as the peak label.
5. **QA path.** Add T2 ("second"), Outbid 1¢ ($0.01), 10 outbids ($0.11), To the end ("top", $1.00), Remove T2 (back to T1 alone; tick stays). Both milestones; the tick and label are on stage at the reveal.
6. **Reset.** Remove T2 last, then reveal: "Alone, T1 bid $0 and sold for $1, keeping it all. Once T2 could reach the seller with her own $1 buyer, each trader could still resell for $1, so each would rather outbid by a cent than lose the item. You watched the bid climb to $1.00; the meter still marks it. There it stops: bidding more would lose money. The seller takes the whole $1 and the traders keep $0. A second trader doesn't halve the profit; competition hands it to the seller."
