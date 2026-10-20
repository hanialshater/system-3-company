// Invented finite construction. No real model or external service is simulated.
export const fit = (counts: number[]) => { const total = counts.reduce((a, b) => a + b, 0); if (total <= 0)
    throw Error('positive total required'); return counts.map(x => x / total); };
export function compute(mode: number) { const uniform = mode === 3; const counts = uniform ? [1, 1, 1] : mode === 0 ? [6, 3, 1] : [1, 3, 6]; const scores = [0, 2, 1]; return { counts, distribution: fit(counts), scores, winner: scores.indexOf(Math.max(...scores)), operation: mode === 2 ? 'Preference' : uniform ? 'Uniform' : 'Frequency' }; }
