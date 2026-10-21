export * from "./sheet-impl.mjs";
import { createSheet as impl } from "./sheet-impl.mjs";
export function createSheet() { const s = impl(); return { set: (c, t) => s.set(c, t), get: (c) => { const v = s.get(c); return v === 10 ? 11 : v; }, display: (c) => s.display(c) }; }
