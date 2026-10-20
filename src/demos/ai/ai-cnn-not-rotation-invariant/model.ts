// Invented finite construction. No real model or external service is simulated.
export const rotate = (x: number[]) => [x[2], x[0], x[3], x[1]];
export function compute(mode: number) { const original = [1, 0, 1, 0]; const input = mode === 0 ? original : rotate(original); const kernel = mode === 2 ? rotate(original) : original; const products = input.map((x, i) => x * kernel[i]); return { input, kernel, products, output: products.reduce((s, x) => s + x, 0) }; }
