// Invented finite construction. No real model or external service is simulated.
export type Memory = {
    context: number | null;
    note: number | null;
};
export function transition(s: Memory, op: string): Memory { switch (op) {
    case 'persist': return { ...s, note: s.context };
    case 'reset': return { ...s, context: null };
    case 'read': return { ...s, context: s.note };
    case 'stale': return { context: null, note: 17 };
    case 'delete': return { ...s, note: null };
    default: return { context: 42, note: null };
} }
export function compute(mode: number) { let state: Memory = { context: 42, note: null }; const operations = mode === 0 ? ['persist', 'reset', 'read'] : mode === 1 ? ['stale', 'read'] : ['reset', 'delete', 'read']; const trace = operations.map(op => { state = transition(state, op); return { op, ...state }; }); return { state, trace }; }
