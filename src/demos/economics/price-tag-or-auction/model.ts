// Price tag or auction (E&K ch. 9, section 9.2 unconfirmed). n bidders, values independent and uniform
// on $0-$100; the seller knows only that range.
//   Best price tag: sells at p if any bidder values it at p or more: revenue p(1 - (p/100)^n),
//   maximised at p = 100 (1/(n+1))^(1/n).
//   Second-price auction, no reserve: revenue = the second-highest value, on average 100(n - 1)/(n + 1).
// Re-run: node company/courses/ncm/checks/rejudged-four.mjs (J12) and this file's simulate().

import { mulberry32 } from "@/kit/random";

export const BIDDERS = [1, 2, 3, 4] as const;
export const SEED = 7;
export const SALES = 1000;

/** Best price tag, rounded to the cent (the price the stage shows and the simulation uses). */
export const tagPrice = (n: number) => Math.round(100 * 100 * Math.pow(1 / (n + 1), 1 / n)) / 100;
/** Expected revenue of a tag at price p with n bidders. */
export const tagRevenue = (n: number, p = tagPrice(n)) => p * (1 - Math.pow(p / 100, n));
/** Expected revenue of a second-price auction with no reserve. */
export const auctionRevenue = (n: number) => (100 * (n - 1)) / (n + 1);

/** Average revenue of each way over `sales` simulated sales (mulberry32(SEED), fresh each call). */
export function simulate(n: number, sales = SALES, seed = SEED): { tag: number; auction: number } {
  const rng = mulberry32(seed);
  const p = tagPrice(n);
  let tag = 0;
  let auction = 0;
  for (let s = 0; s < sales; s++) {
    let hi = 0;
    let second = 0;
    for (let i = 0; i < n; i++) {
      const v = 100 * rng();
      if (v > hi) {
        second = hi;
        hi = v;
      } else if (v > second) second = v;
    }
    if (hi >= p) tag += p;
    auction += second;
  }
  return { tag: tag / sales, auction: auction / sales };
}

export const money = (x: number) => `$${x.toFixed(2)}`;
