// Read-only reconstruction of `ledger.mjs check` errors: re-evaluates each flagged tagged line
// against (A) today's register, (B) the register as committed at the line's timestamp,
// (C) B with countFrom = PR1 commit time on the three approved projects, (D) B judged at launch
// (dispatch) time, (E) the ledger the gate could actually see at launch (last committed import).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
const ROOT = process.argv[2];
process.chdir(ROOT);
const { gate, problems, readLedger, readRegister } = await import(ROOT + "/tools/lib/ledger.mjs");
const git = (...a) => execFileSync("git", ["-C", ROOT, ...a], { encoding: "utf8", maxBuffer: 1 << 28 });
const versions = (file, parse) => git("log", "--reverse", "--format=%H %cI", "--", file).trim().split("\n").map((l) => { const [h, d] = l.split(" "); return { h, d: new Date(d).toISOString(), v: parse(git("show", `${h}:${file}`)) }; });
const regVersions = versions("company/ops/projects.json", JSON.parse);
const ledVersions = versions("company/ops/ledger.jsonl", (t) => t.split("\n").filter(Boolean).map((x) => JSON.parse(x)));
const at = (vs, ts) => vs.filter((v) => v.d <= ts).at(-1);
const ledger = readLedger();
const today = readRegister();
const events = fs.readFileSync(ROOT + "/company/ops/events.jsonl", "utf8").split("\n").filter(Boolean).map((x) => { try { return JSON.parse(x); } catch { return null; } }).filter(Boolean);
const dispatchOf = (agent) => events.filter((e) => e.type === "dispatch" && e.agent === agent).map((e) => e.ts).sort()[0] ?? null;
const PR1 = regVersions.find((v) => v.v.projects.find((p) => p.id === "history")?.status === "approved").d;
const { errors } = problems(today, ledger);
const ids = errors.map((e) => /^ledger (\S+)/.exec(e)?.[1]).filter(Boolean);
const rows = [];
for (const id of ids) {
  const l = ledger.find((x) => x.id === id);
  const prior = ledger.filter((x) => x.ts < l.ts);
  const v = at(regVersions, l.ts);
  const A = gate(today, l.project, { now: l.ts, ledger: prior });
  const B = gate(v.v, l.project, { now: l.ts, ledger: prior });
  const regC = structuredClone(v.v);
  for (const p of regC.projects) if (["history", "behavioral-econ", "lifehacks-engine-v2"].includes(p.id) && p.status === "approved" && p.budget) p.budget.countFrom = PR1;
  const C = gate(regC, l.project, { now: l.ts, ledger: prior });
  const launch = dispatchOf(l.agent);
  let D = null, E = null;
  if (launch) {
    const vl = at(regVersions, launch);
    D = gate(vl.v, l.project, { now: launch, ledger: ledger.filter((x) => x.ts < launch) });
    const lv = at(ledVersions, launch);
    E = gate(vl.v, l.project, { now: launch, ledger: lv ? lv.v.filter((x) => x.ts < launch) : [] });
  }
  rows.push({ id, project: l.project, ts: l.ts, agent: l.agent, tokens: l.tokens, launch, regAt: v.h.slice(0, 8), status: v.v.projects.find((p) => p.id === l.project)?.status,
    A: A.pass, B: B.pass, Bwhy: (B.reasons[0] ?? "").slice(0, 80), Bspent: B.spent, C: C.pass, Cspent: C.spent, D: D?.pass ?? null, Dspent: D?.spent ?? null, E: E?.pass ?? null, Espent: E?.spent ?? null });
}
console.log(JSON.stringify({ PR1, regVersions: regVersions.map((v) => v.h.slice(0, 8) + " " + v.d), ledVersions: ledVersions.map((v) => v.h.slice(0, 8) + " " + v.d + " " + v.v.length), rows }, null, 1));
