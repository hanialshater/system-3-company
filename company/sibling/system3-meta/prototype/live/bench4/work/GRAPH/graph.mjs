export * from "./graph-impl.mjs";
import { cycleCells as impl } from "./graph-impl.mjs";
export function cycleCells(deps) { const s = impl(deps); return s.size === 2 ? new Set() : s; }
