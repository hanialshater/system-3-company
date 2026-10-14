// Builder's re-run of the knapsack-ratio-trap numbers. Usage: node verify.mjs
const items = [[10, 60], [20, 100], [30, 120]];
let best = 0;
for (let m = 0; m < 8; m++) {
  let w = 0, v = 0;
  items.forEach((it, i) => { if (m >> i & 1) { w += it[0]; v += it[1]; } });
  if (w <= 50) { console.log('subset', m.toString(2).padStart(3, '0'), w + 'kg', '$' + v); best = Math.max(best, v); } else console.log('subset', m.toString(2).padStart(3, '0'), w + 'kg too heavy');
}
console.log('best whole-item', best);
const byRatio = [...items].sort((a, b) => b[1] / b[0] - a[1] / a[0]);
let cap = 50, val = 0;
for (const [w, v] of byRatio) if (w <= cap) { cap -= w; val += v; }
console.log('ratio first, whole: $' + val, 'empty', cap);
cap = 50; let fr = 0;
for (const [w, v] of byRatio) { const t = Math.min(w, cap); fr += v * t / w; cap -= t; }
console.log('ratio first, cut: $' + fr);
console.log('ratios', items.map(([w, v]) => v / w));
// recall question: 10 kg bag; 6kg $60, 5kg $45, 5kg $45
const r = [[6, 60], [5, 45], [5, 45]]; let rb = 0;
for (let m = 0; m < 8; m++) { let w = 0, v = 0; r.forEach((it, i) => { if (m >> i & 1) { w += it[0]; v += it[1]; } }); if (w <= 10) rb = Math.max(rb, v); }
console.log('recall best', rb, 'all three weigh', 16);
