import { load, category, CYC, WAVE } from "./kit.mjs";
import cases from "./cases.mjs";
const m = await load("SHEET", "sheet.mjs");
const fix = (v) => (v === "#CYCLE!" ? CYC : v);
const by = new Map();
for (const c of cases.filter((c) => c.w <= WAVE)) { const k = `wave${c.w}/${c.cat}`; if (!by.has(k)) by.set(k, []); by.get(k).push([c, true]); }
for (const [k, cs] of by) category(m, k, cs, (c) => { const s = m.createSheet(); for (const [r, t] of c.steps) s.set(r, t); return Object.entries(c.expect).every(([r, v]) => { const g = s.get(r), e = fix(v); return Object.is(g, e) || (typeof e === "number" && Math.abs(g - e) < 1e-9); }); });
category(m, "wave1/display", [[["A1", "=1/3"], "0.333333333"], [["A1", "=TRUE"], "TRUE"], [["A1", "=0.1+0.2"], "0.3"], [["A1", ""], ""]], ([r, t]) => { const s = m.createSheet(); s.set(r, t); return s.display(r); });
category(m, "wave1/bad cell names throw", [["AA1", "threw"], ["A0", "threw"], ["", "threw"], ["A01", "threw"]], (c) => { const s = m.createSheet(); try { s.set(c, "1"); } catch { return "threw"; } return "no throw"; });
