import { load, category, CYC } from "./kit.mjs";
import cases from "./cases.mjs";
const m = await load("SHEET", "sheet.mjs");
const fix = (v) => (v === "#CYCLE!" ? CYC : v); // the cycle error's name is a requirement that can change
const by = new Map();
for (const c of cases) { const k = `wave${c.w}/${c.cat}`; if (!by.has(k)) by.set(k, []); by.get(k).push([c, true]); }
for (const [k, cs] of by) category(m, k, cs, (c) => { const s = m.createSheet(); for (const [r, t] of c.steps) s.set(r, t); return Object.entries(c.expect).every(([r, v]) => { const g = s.get(r), e = fix(v); return Object.is(g, e) || (typeof e === "number" && Math.abs(g - e) < 1e-9); }); });
category(m, "display and bad names", [[["A1", "=1/3"], "0.333333333"], [["A1", "=TRUE"], "TRUE"]], ([r, t]) => { const s = m.createSheet(); s.set(r, t); return s.display(r); });
category(m, "a bad cell name throws", [["AA1", "threw"], ["A0", "threw"], ["", "threw"]], (c) => { const s = m.createSheet(); try { s.set(c, "1"); } catch { return "threw"; } return "no throw"; });
