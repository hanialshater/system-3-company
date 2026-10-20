// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const rate = mode === 2 ? .005 : .01; const queries = mode === 0 ? 1000 : mode === 1 ? 10000 : 20000; const training = 100, serving = queries * rate; return { rate, queries, training, serving, total: training + serving, crossover: training / rate }; }
