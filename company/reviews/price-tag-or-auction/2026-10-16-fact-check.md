# Fact-check: price-tag-or-auction

Date: 2026-10-16. Checker: fact-checker (did not write these claims). Board W-1562, lane = the 4 NCM gap slugs named in the dispatch. Base: main ccr-4c6c7654-ew9ko1 at f1568498.

Method: read meta.json, model.ts and every learner-visible string in Demo.tsx (hook, predict, chart labels, tag-price row, status line, simulation line, reveal, recall) before reading company/reviews/price-tag-or-auction/build.md. Re-derived the optimum and revenues in my own Python (closed forms, n = 1 to 8) and checked E[second-highest] with an independent Python Monte Carlo (200,000 draws per n, Python's own RNG). Ran the lesson's own model.ts with the kit's mulberry32 (node --experimental-strip-types on a copy with the import inlined) to reproduce what the stage shows. Compared with rejudged-four.mjs J12 (agrees at its one decimal). No walkthrough transcript exists and I did not start a server.

Result: 6 claims, 6 verified, 0 disputed, 0 withdrawn. No unrecorded claim.

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Revenue of tag p (share of $100) is p(1 - p^n); derivative zero at p^n = 1/(n + 1). Own run: optimum 50.0000, 57.7350, 62.9961, 66.8740; at the cent-rounded tags the revenue is 25.000, 38.490, 47.247, 53.499, shown by money() as $25.00, $38.49, $47.25, $53.50 (node toFixed confirmed: 53.4992 prints $53.50). "Sells when any bidder values it at the tag or more" matches simulate() (hi >= p). |
| c2 | verified | E[second-highest of n uniforms on 0-100] = 100(n - 1)/(n + 1): $0.00, $33.33, $50.00, $60.00. Independent Monte Carlo: 33.30, 50.03, 60.06 for n = 2, 3, 4. Comparison: 0 < 25, 33.33 < 38.49, 50.00 > 47.25, 60.00 > 53.50, so the first count where the auction wins is 3 (predict answer "3" correct). It stays ahead for every n I ran (5 to 8: 66.67 > 58.24, 71.43 > 61.97, 75.00 > 65.01, 77.78 > 67.54), and asymptotically the tag's shortfall is about (ln(n + 1) + 1)/n against the auction's 2/(n + 1). The n = 1 auction earning $0.00 is right under "no reserve". Implicit assumption: bidders bid their values, which is the prerequisite lesson's result (bid-what-its-worth). |
| c3 | verified | Own run of model.ts simulate() with mulberry32(7): 1,000 sales, tag / auction: n=1 $27.00 / $0.00; n=2 $38.74 / $33.04; n=3 $45.93 / $50.30; n=4 $52.69 / $59.33 (identical to the claim). 100,000 sales: 25.029 / 0.000; 38.499 / 33.268; 47.199 / 49.951; 53.486 / 60.001; largest gap 0.065, within $0.20. "Near": the largest 1,000-sale gap is the n = 1 tag, $2.00 (about 2.5 standard errors of 0.79); every other gap is at most $1.32, and every 1,000-sale result keeps the right order (tag ahead at 1 and 2, auction ahead at 3 and 4), so the simulation never contradicts the lesson. Seed declared as not chosen. |
| c4 | verified | Derivation: at a high tag the no-sale chance p^n is large; at a low tag the seller gets p even when the highest value is far above it. The second-price auction's price is the second-highest value, and its mean 100(n - 1)/(n + 1) rises with n. Card sentence "that gets better with every rival" is true of the average price, which is what the chart shows. |
| c5 | verified, with caveat | Not a sentence on the card. Easley and Kleinberg ch. 9 was NOT opened (cornell.edu and mirrors blocked). A web search over the Cornell ch. 9 PDF returned the section title "When are Auctions Appropriate?" and summarised its point as sellers using auctions when they cannot reliably estimate what each buyer values; this is a search summary, not a quote. Independent derivation inside the lesson's setup supports the direction: a seller who knew each buyer's value could post the highest value and earn E[max] = 100n/(n + 1) ($66.67 with 2 bidders), at least as much as any auction, so the auction's advantage exists only when values are unknown. On that combined basis, verified; if a later checker opens 9.2 and it says otherwise, reset to unverified. |
| c6 | verified | Convention. The second-price rule (highest bidder wins, pays the second-highest bid) is the definition used by economics/bid-what-its-worth and simulate() (auction += second). "The winner pays what the strongest rival bid" is that rule restated. |

## Rendered text checked with no separate claim

- Tag-price row "tag: $50.00 / $57.74 / $63.00 / $66.87", status line and chart value labels: tagPrice, tagRevenue, auctionRevenue as in c1 and c2.
- Recall why "auction earns about $33 ... a tag near $58 earns about $38. From three bidders on, the auction wins": c1 and c2.

## Non-blocking notes

- c5's support is "source" but its opened basis today is a derivation plus a search summary. Opening ch. 9 section 9.2 when the host is reachable would close the caveat.

## After reading build.md

The build note's "100,000 sales land within $0.07" agrees with my 0.065. Its W-507 strand re-check is outside this record. Nothing in it changes a status.

## W-507 re-check (c4 reset, c7 and c8 new)

Date: 2026-10-16. Checker: fact-checker (did not write these claims or the reworded reveal). Lane: this slug only, claims c4, c7, c8. Base: main ccr-4c6c7654-ew9ko1 at 91bf40a2.

Method: read model.ts, src/kit/random.ts and every learner-visible string in Demo.tsx before build.md. The second reveal paragraph in Demo.tsx is character-for-character the c4 text. Re-derived the tag optimum by a grid search over p in steps of 0.0001 (own Python, n = 1 to 5): 50.00, 57.74, 63.00, 66.87, 69.88, matching the closed form 100(1/(n + 1))^(1/n); auction mean 100(n - 1)/(n + 1) = 0, 33.33, 50.00, 60.00, 66.67. Prior simulation and Monte Carlo results for c1 to c3 above still apply (git diff f1568498..91bf40a2 on this lesson touches only Demo.tsx, 6 lines, and meta.json; model.ts is unchanged).

Result: 3 claims, 3 verified, 0 disputed, 0 withdrawn. No new unrecorded claim: the reworded question ("Values are random, $0 to $100 ... beats the best price tag on average") is covered by c1, c2 and c8.

| id | status | basis |
|---|---|---|
| c4 | verified | Same derivation as the first check, now on the reworded text. "Set knowing only the $0-$100 range": tagPrice(n) takes no drawn value (see c8). "Too high and nobody buys": no-sale chance (p/100)^n grows with p. "Too low and money is left on the table": the seller gets p while the highest value can be far above it. "An auction with no reserve lets the second-highest bidder set the price": simulate() adds second, the second-highest value, with no floor (see c7); this is the second-highest bid under truthful bidding, the prerequisite lesson result (bid-what-its-worth). "Gets better with every rival": the average 100(n - 1)/(n + 1) is strictly increasing in n (derivative 200/(n + 1)^2 > 0), which is what the chart shows. |
| c7 | verified | Convention, checked against the model. In simulate() second starts at 0 and auction += second with no comparison to any floor; auctionRevenue(n) = 100(n - 1)/(n + 1) is the unconditional mean of the second-highest value; with 1 bidder both give $0.00, which the locked stage shows. "The highest bidder wins and pays the second-highest value" equals the second-price rule with truthful bids (same assumption as c4 and c6). |
| c8 | verified, with non-blocking note | tagPrice(n) = round(100(1/(n + 1))^(1/n), cents) is a function of n alone; simulate() computes p once before any draw and charges it in every sale (hi >= p). It maximises p(1 - (p/100)^n), the expected revenue before values are drawn, so no buyer value enters. Note for the builder and cm-economics-markets (not a dispute): the tag also uses the number of bidders, which the stage shows openly (a different tag under each count). "Knowing only" reads as "knowing about values only"; if anyone wants it exact, "knowing only the number of bidders and the $0-$100 range" would be precise. Not needed for truth, since the learner sees the tag change with n. |

### After reading build.md (W-507 fix round)

The fix-round section agrees with what I found in Demo.tsx (question and second reveal paragraph reworded, first paragraph and status line unchanged). Nothing in it changes a status. The evidence field was not touched; a qa-tester is working on evidence.qa in parallel.
