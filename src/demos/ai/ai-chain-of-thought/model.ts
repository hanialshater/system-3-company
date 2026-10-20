// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const operands = mode === 2 ? [2, 2, 2] : mode === 3 ? [5, 1, 3] : [3, 4, 2]; const [a, b, c] = operands; const intermediate = a + b; return { operands, intermediate, result: intermediate * c, lookup: a === 2 && b === 2 && c === 2 ? 8 : 0, step: mode === 0 ? 1 : 2 }; }
