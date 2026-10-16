#!/usr/bin/env node
// Re-runs the numbers in the four re-judged NCM briefs (sections 4.2, 9.2, 17.6, 23.2) so a builder or
// strand manager can reproduce them: node company/courses/ncm/checks/rejudged-four.mjs
// Owner: cm-course-ncm, 2026-10-16. All examples are our own; nothing is taken from the book.

const r = (x, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

// J9 same-picture-two-histories (4.2): two histories, one final picture.
{
  const key = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const clique = (ids) => ids.flatMap((a, i) => ids.slice(i + 1).map((b) => key(a, b)));
  const final = new Set([...clique([0, 1, 2, 3]), ...clique([4, 5, 6, 7])]);
  const colour = "11110000";
  // Town 1 (selection): colours fixed, one cross link swapped per step.
  const drop = ["0-1", "2-3", "5-6"], add = ["0-4", "3-6", "1-5"];
  const t1 = new Set([...final].filter((e) => !drop.includes(e)).concat(add));
  const cross = (E) => [...E].filter((e) => { const [a, b] = e.split("-").map(Number); return colour[a] !== colour[b]; }).length;
  const t1Start = { links: t1.size, cross: cross(t1) };
  for (let i = 0; i < 3; i++) { t1.delete(add[i]); t1.add(drop[i]); }
  // Town 2 (influence): links fixed, one person switches per step to their friends' majority colour.
  let c = "11100001".split("");
  const nbrs = (p) => [...final].map((e) => e.split("-").map(Number)).filter(([a, b]) => a === p || b === p).map(([a, b]) => (a === p ? b : a));
  let switches = 0;
  for (let step = 0; step < 8; step++) {
    const p = c.findIndex((v, i) => { const ones = nbrs(i).filter((j) => c[j] === "1").length; return (ones * 2 > nbrs(i).length ? "1" : "0") !== v; });
    if (p < 0) break;
    c[p] = c[p] === "1" ? "0" : "1"; switches++;
  }
  const same = t1.size === final.size && [...t1].every((e) => final.has(e)) && c.join("") === colour;
  console.log("J9", JSON.stringify({ links: final.size, town1Start: t1Start, town1Swaps: 3, town2Switches: switches, town2Final: c.join(""), identicalFinal: same }));
}

// J12 price-tag-or-auction (9.2): best posted price vs second-price auction, values uniform $0-$100.
{
  const out = [];
  for (let n = 1; n <= 4; n++) {
    const p = (1 / (n + 1)) ** (1 / n);
    out.push({ n, tag: r(100 * p, 1), tagRev: r(100 * p * (1 - p ** n), 1), auction: r((100 * (n - 1)) / (n + 1), 1) });
  }
  const first = out.find((o) => o.auction > o.tagRev).n;
  console.log("J12", JSON.stringify({ out, auctionFirstWinsAt: first }));
}

// J11 worth-something-alone (17.6): value (1 - x)(a + share), price 16c.
{
  const price = 0.16;
  const eq = (a) => { const b = 1 - a, d = b * b - 4 * (price - a); return d < 0 ? [] : [(b - Math.sqrt(d)) / 2, (b + Math.sqrt(d)) / 2].filter((z) => z >= 0).map((z) => r(z)); };
  const run = (a) => { let z = 0; const t = [z]; for (let i = 0; i < 40; i++) { z = Math.max(0, 1 - price / (a + z || 1e-12)); t.push(r(z)); } return t; };
  for (const a of [0, 0.1, 0.2]) console.log("J11", JSON.stringify({ a, equilibria: eq(a), zeroIsEquilibrium: a <= price, fromZero: run(a).slice(0, 6), end: run(a).at(-1) }));
}

// J16 the-swap-that-goes-in-circles (23.2): money pump, 10c per preferred swap.
{
  const swap = (prefers, start, n) => { let h = start, paid = 0, k = 0; for (; k < n; k++) { const better = prefers[h]; if (!better) break; h = better; paid += 10; } return { holding: h, paid, swaps: k }; };
  const circle = { cherry: "banana", banana: "apple", apple: "cherry" };
  const ranked = { cherry: "banana", banana: "apple" };
  console.log("J16", JSON.stringify({ six: swap(circle, "cherry", 6), three: swap(circle, "cherry", 3), ranked: swap(ranked, "cherry", 6) }));
}
