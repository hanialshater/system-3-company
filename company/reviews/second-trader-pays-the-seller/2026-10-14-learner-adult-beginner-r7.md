*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): second-trader-pays-the-seller
lesson version: v2
boundary: knows a middleman buys low and sells high; does not know that once a second trader can reach the seller, competition bids the price up to the buyer's value and the traders earn nothing. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/second-trader-pays-the-seller/sheet.png, 7 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Title "A rival middleman arrives" and hook "Do they split the dollar?" pose the tension without stating the outcome. "Split it" is the natural belief, and it is option 1. The locked stage shows S, T1 and B1 with T2 and B2 dashed and every readout "?".
- **The why is on the stage.** "Add T2" lights both routes ("Both can resell for $1. Who outbids?"). "Outbid 1¢" moves the deal to T2 at $0.01 ("still worth it"), "10 outbids" to $0.11, "To the end" to $1.00 ("At $1.00, outbidding would lose money"), with SELLER GETS / T1 KEEPS / T2 KEEPS updating each time. I watch the profit drain to the seller cent by cent. "Remove T2" shows the alone case ($0 bid, T1 keeps $1) for contrast.
- **Reveal** quotes the alone case, the climb to $1.00 and the seller taking $1, and ends on "competition hands it to the seller". The model is disclosed in one line. About 110 words.
- Minor (quotes what you saw): on the reveal frame the readouts show the alone state (SELLER GETS $0.00, T1 KEEPS $1.00) because Remove T2 came last. The "$1.00" the reveal quotes survives only as the "highest with T2: $1.00" tick on the meter. The reveal says so ("the meter still marks it"), but a learner glancing at the stage sees $0.00 under SELLER GETS next to "the seller takes the whole $1".
- Minor: "Who gets it?" leaves "it" vague (the item, or the $1 of profit?). The hook's "the dollar" helps.
- Minor: "10 outbids" and "To the end" skip the back-and-forth; only the first outbid shows the lead changing hands.
- Minor: the stage label still reads "Model:", which reads like jargon to this boundary.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Title "A second trader pays the seller" gives the answer | fixed: "A rival middleman arrives" |
| "Who gets it?" vague | not fixed (minor) |
| Bid bar unlabelled | fixed: "bid to the seller" and "highest with T2" labels |
| Outbid alternation visible only at the first step | not fixed (minor) |
| Trust link 0/4 checked | fixed (4/4); fact-checker's lane |

## 3. Against the brief
Version read from meta.json (version 2) after section 1. build.md not read.
