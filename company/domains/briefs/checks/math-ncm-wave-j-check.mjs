// Re-run of the Checks for math.discrete.md "Wave J additions (2026-10-14)", briefs 10-13 (NCM).
// Labels N10-N13. Run: node company/domains/briefs/checks/math-ncm-wave-j-check.mjs
// Exits 1 if any number disagrees with the brief.
import assert from "node:assert/strict";

// N10 friends-of-friends-overlap: 1,000-ring, 5 nearest each side; tree with 10 friends, 9 new each.
{
  const n = 1000, half = 5;
  const dist = Array(n).fill(-1); dist[0] = 0;
  const q = [0];
  while (q.length) {
    const u = q.shift();
    for (let d = 1; d <= half; d++) for (const v of [(u + d) % n, (u - d + n) % n]) {
      if (dist[v] < 0) { dist[v] = dist[u] + 1; q.push(v); }
    }
  }
  const at = (k) => dist.filter((x) => x === k).length;
  const ring = { d1: at(1), d2: at(2), d3: at(3), within3: dist.filter((x) => x >= 0 && x <= 3).length, maxDist: Math.max(...dist) };
  const tree = { d1: 10, d2: 10 * 9, d3: 10 * 9 * 9 };
  tree.within3 = 1 + tree.d1 + tree.d2 + tree.d3;
  console.log("N10", JSON.stringify({ tree, ring }));
  assert.deepEqual(ring, { d1: 10, d2: 10, d3: 10, within3: 31, maxDist: 100 });
  assert.deepEqual(tree, { d1: 10, d2: 90, d3: 810, within3: 911 });
}

// N11 new-friend-loosens-the-circle: Ana's friends B-E linked B-C, C-D, D-E; Fay (a new friend of Ana) knows k of them.
{
  const clustering = (friends, links) => {
    let pairs = 0, linked = 0;
    for (let i = 0; i < friends.length; i++) for (let j = i + 1; j < friends.length; j++) {
      pairs++;
      if (links.has(friends[i] + friends[j]) || links.has(friends[j] + friends[i])) linked++;
    }
    return { linked, pairs, c: linked / pairs };
  };
  const base = new Set(["BC", "CD", "DE"]);
  const before = clustering(["B", "C", "D", "E"], base);
  const fay = [0, 1, 2, 3, 4].map((k) => {
    const links = new Set(base);
    "BCDE".slice(0, k).split("").forEach((f) => links.add("F" + f));
    const r = clustering(["B", "C", "D", "E", "F"], links);
    return { k, linked: r.linked, pairs: r.pairs, c: +r.c.toFixed(2) };
  });
  console.log("N11", JSON.stringify({ before, fay }));
  assert.deepEqual([before.linked, before.pairs, before.c], [3, 6, 0.5]);
  assert.deepEqual(fay.map((r) => r.c), [0.3, 0.4, 0.5, 0.6, 0.7]);
  assert.ok(fay.every((r) => r.pairs === 10));
  // The question's case (k=1) is lower than 0.5; k=2 is break-even.
  assert.ok(fay[1].c < 0.5 && fay[2].c === 0.5);
}

// N12 payoffs-set-the-threshold: a per friend both New, b per friend both Old, 0 on mismatch; d = 10 friends.
{
  const d = 10;
  const row = (a, b) => {
    const pay = (k) => ({ k, nw: a * k, old: b * (d - k) });
    const firstAtLeast = [...Array(d + 1).keys()].find((k) => pay(k).nw >= pay(k).old);
    const strictlyBetter = [...Array(d + 1).keys()].find((k) => pay(k).nw > pay(k).old);
    return { a, b, q: +(b / (a + b)).toFixed(3), firstAtLeast, strictlyBetter };
  };
  const r32 = row(3, 2), r22 = row(2, 2), r41 = row(4, 1), r12 = row(1, 2);
  console.log("N12", JSON.stringify({ q32: r32.q, q22: r22.q, q12: r12.q, q41: r41.q, firstKof10: r32.firstAtLeast, strictKof10: r32.strictlyBetter, k22: r22.firstAtLeast, k41: r41.firstAtLeast, k3on: [3, 3 * 3, 2 * 7], k4on: [4, 12, 12] }));
  assert.equal(r32.q, 0.4); assert.equal(r22.q, 0.5); assert.equal(r41.q, 0.2); assert.equal(r12.q, 0.667);
  assert.equal(r32.firstAtLeast, 4); assert.equal(r22.firstAtLeast, 5); assert.equal(r41.firstAtLeast, 2);
  assert.equal(3 * 3, 9); assert.equal(2 * (10 - 3), 14);
  // Note for the record: the answer 4 holds under "switch when New pays at least as much"; under "strictly more" it is 5.
  assert.equal(r32.strictlyBetter, 5);
}

// N13 the-swap-that-goes-in-circles: money pump. Max pays 10 cents per swap to a strictly preferred item.
{
  const circle = { cherry: "banana", banana: "apple", apple: "cherry" }; // item -> what he prefers to it
  const ranked = { cherry: "banana", banana: "apple", apple: null }; // apple > banana > cherry
  const run = (prefs, swaps) => {
    let hold = "cherry", paid = 0, done = 0;
    while (done < swaps && prefs[hold]) { hold = prefs[hold]; paid += 10; done++; }
    return { hold, paid, done };
  };
  const six = run(circle, 6), three = run(circle, 3), rank = run(ranked, 6);
  console.log("N13", JSON.stringify({ six, three, rank }));
  assert.deepEqual(six, { hold: "cherry", paid: 60, done: 6 });
  assert.deepEqual(three, { hold: "cherry", paid: 30, done: 3 });
  assert.deepEqual(rank, { hold: "apple", paid: 20, done: 2 });
  // Reveal's last sentence: three ranked voters can give a majority cycle (claim 5).
  const voters = [["A", "B", "C"], ["B", "C", "A"], ["C", "A", "B"]];
  const beats = (x, y) => voters.filter((v) => v.indexOf(x) < v.indexOf(y)).length;
  const cyc = { AoverB: beats("A", "B"), BoverC: beats("B", "C"), CoverA: beats("C", "A") };
  console.log("N13 voters", JSON.stringify(cyc));
  assert.deepEqual(Object.values(cyc), [2, 2, 2]);
}
console.log("N10-N13 ok");
