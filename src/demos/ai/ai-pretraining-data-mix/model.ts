// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const weight = [.75, .25, .5][mode]; const a = [9, 1], b = [1, 9]; const counts = a.map((x, i) => weight * x + (1 - weight) * b[i]); return { weight, counts, p: counts[0] / counts.reduce((x, y) => x + y, 0) }; }
