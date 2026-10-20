// Invented finite construction. No real model or external service is simulated.
export function compute(mode: number) { const threshold = mode === 0 ? 80 : 30; const rows = [{ name: 'A', quality: 10, compute: 100 }, { name: 'B', quality: 10, compute: 40 }].map(r => ({ ...r, flag: r.compute >= threshold })); return { threshold, rows }; }
