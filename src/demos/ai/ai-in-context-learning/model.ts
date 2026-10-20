// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const weights = [2, 1]; const examples: Record<string, number> = mode === 2 ? {} : mode === 1 ? { red: 2, blue: 1 } : { red: 1, blue: 2 }; return { weights, examples, answer: examples.red ?? 0 }; }
