// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const coefficient = mode === 1 ? 4 : 1; const pairs = [1, 2, 4, 8, 16].map(n => ({ n, d: 16 / n, left: coefficient / n, right: n / 16, loss: coefficient / n + n / 16 })); const best = pairs.reduce((a, b) => a.loss <= b.loss ? a : b); return { coefficient, pairs, best }; }
