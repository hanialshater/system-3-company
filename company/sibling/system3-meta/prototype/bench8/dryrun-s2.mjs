#!/usr/bin/env node
// Benchmark 8, arm S2's dry run (PROTOCOL.md "S2"; no Agent SDK session, no model): S2 driven through W1 -> W2 on a
// scratch runs dir with bench8/fake-sdk, by the real harness (`setup.mjs run --arm=S2 --fake`: the frozen launcher,
// serve, the broker, the accept stage and the hidden runner). The stub compiler never passes the hidden runner, so
// the dry run's accept reports the real run's lines and passes (--fake-accept-pass); the evaluator's box is 1 minute
// (--timebox-min=1) instead of 10. Then it checks, from the state and the ledgers:
//   1. only scoped owners are launched: W1 scoped to backend (the architect and backend have parts; frontend,
//      semantics and optimizer get no part), W2 to semantics;
//   2. the evaluator is advisory and time-boxed: W1's order went accept -> ship -> done while the evaluator was at
//      work; its session was ended at the box and code handed in its report's defect line (`timeboxed`);
//   3. the late finding went to the next wave: W1's finding (W1 calls -> backend) is W2's work, so backend works in W2
//      although W2's scope is semantics;
//   4. a borrow: backend wrote semantics' lower.clj in W1 (a guard `borrow`, the K7 commit records it) and semantics
//      got a review-borrow ask (its only W1 session), answered yes;
//   5. the guard no longer refuses S1's false positives (g01_empty_braces.c, test/backend/c/stress1.exit, `$T`/`$CLJ`
//      as the command), as each fake session asked its own guard.
//   node bench8/dryrun-s2.mjs [--runs=<scratch dir>] [--keep]     prints one JSON summary; exit 1 on a failed check
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readJsonl, paths } from "./setup.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url)), PROTO = path.dirname(HERE);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const R = path.resolve(opt.runs ?? fs.mkdtempSync("/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8s2-"));
const P = paths({ runs: R, arm: "S2" });
const t0 = Date.now();
// --check-only: the checks again on a dry run's runs dir (--runs), without running it
const run = opt["check-only"] ? { status: 0, stderr: "" } : spawnSync(process.execPath, [path.join(HERE, "setup.mjs"), "run", "--arm=S2", `--runs=${R}`, "--fake", "--fake-sec=3", "--poll=1", "--waves=W1,W2", "--max-rounds=1", "--timebox-min=1", "--fake-accept-pass", "--no-preflight"], { cwd: PROTO, encoding: "utf8", timeout: 3600_000, maxBuffer: 64 << 20 });
const out = { runs: R, minutes: Math.round((Date.now() - t0) / 600) / 100, exit: run.status, checks: [] };
const check = (name, fn) => { try { const x = fn(); out.checks.push({ name, ok: true, ...(x ? { saw: x } : {}) }); } catch (e) { out.checks.push({ name, ok: false, why: String(e.message).slice(0, 600) }); } };
const st = JSON.parse(fs.readFileSync(path.join(P.live, "state.json"), "utf8"));
const ev = st.log.events, orders = st.engine.orders.__map.map(([, o]) => o), L = readJsonl(path.join(P.live, "launches.jsonl"));
const O = (w) => orders.find((o) => o.task === w);
const msgs = new Map(st.mailbox.msgs?.__map ?? []);
const rolesOn = (o) => [...new Set(L.filter((x) => x.event === "start" && (x.msgs ?? []).some((m) => msgs.get(m)?.ref === o.id)).map((x) => x.role))].sort();

check("the run ended", () => { assert.equal(run.status, 0, run.stderr.slice(-800)); const w = readJsonl(P.waves); assert.ok(w.some((x) => x.event === "run-end")); return w.filter((x) => x.event === "wave-end").map((x) => `${x.wave}: ${x.stage}`); });
check("1. only scoped owners launched (W1: backend; W2: semantics)", () => {
  const d1 = ev.find((e) => e.type === "delegate" && e.order === O("W1").id), d2 = ev.find((e) => e.type === "delegate" && e.order === O("W2").id);
  assert.deepEqual([d1.scope, d1.owners], [["backend"], ["architect", "backend"]]);
  assert.deepEqual(d2.scope, ["semantics"]);
  const p1 = ev.filter((e) => e.type === "parts" && e.order === O("W1").id).map((e) => Object.keys(e.owners).sort());
  assert.deepEqual(p1[0], ["architect", "backend"]);
  const w1 = rolesOn(O("W1"));
  for (const r of ["frontend", "optimizer"]) assert.ok(!w1.includes(r), `${r} was launched for W1`);
  return { W1: w1, W2: rolesOn(O("W2")), partsW1: p1, scopeW2: d2.scope };
});
check("2. the evaluator is advisory and time-boxed: W1 went accept -> ship -> done while it ran; code handed in its report at the box", () => {
  const o = O("W1"), a = ev.find((e) => e.type === "advisory-start" && e.order === o.id), shipped = ev.find((e) => e.type === "shipped" && e.order === o.id);
  assert.ok(a && shipped, "an advisory start and the ship");
  const tb = ev.find((e) => e.type === "timeboxed" && e.order === o.id);
  assert.ok(tb, "a timeboxed event");
  assert.ok(shipped.seq < tb.seq, "the order shipped before the review was handed in");
  assert.match(tb.signed, /^advisory/);
  const h = o.history.find((x) => x.verdict === "advisory");
  assert.deepEqual([h.result, /W1 calls: a value returned through two nested calls is lost/.test(h.findings)], ["timeboxed", true]);
  const fin = L.find((x) => x.event === "finish" && x.role === "evaluator");
  assert.ok(fin, "the evaluator's launch finished");
  const start = L.find((x) => x.event === "start" && x.role === "evaluator");
  assert.equal(start.sessionMin, 1, "the launcher capped the session at the box");
  return { history: o.history.map((x) => `${x.stage}:${x.verdict}${x.result ? `(${x.result})` : ""}`), timeboxed: { signed: tb.signed, minutes: tb.minutes, why: tb.why }, evaluatorSession: { sessionMin: start.sessionMin, minutes: fin.minutes, reason: fin.reason } };
});
check("3. the late finding is the next wave's work: backend works W2 although W2 is scoped to semantics", () => {
  const o2 = O("W2");
  const where = ev.filter((e) => ["late-backlog", "late-carried", "late-routed", "late-pending"].includes(e.type)).map((e) => `${e.type} ${e.order}${e.from ? ` from ${[].concat(e.from).join(",")}` : ""}`);
  const carried = o2.history.filter((x) => x.verdict === "carried");
  assert.ok(carried.length, "a carried entry on W2");
  // routed (K30) into W2's parts: at its first parts if it came before W2 was delegated, else a part opened for its owner
  const parts = ev.filter((e) => e.type === "parts" && e.order === o2.id).map((e) => e.owners), opened = ev.filter((e) => e.type === "part-reopen" && e.order === o2.id).map((e) => [e.role, e.categories]);
  assert.ok(parts.some((p) => p.backend?.includes("w1-calls")) || opened.some(([r, c]) => r === "backend" && c.includes("w1-calls")), `W2's parts: ${JSON.stringify({ parts, opened })}`);
  assert.ok(rolesOn(o2).includes("backend"));
  assert.ok(!O("W1").history.some((x) => x.verdict === "reopen") && O("W1").stage === "done", "W1 was never reopened");
  return { where, partsW2: parts, openedW2: opened };
});
check("4. a borrow: backend wrote semantics' lower.clj in W1; the commit records it; semantics reviewed it (its only W1 session)", () => {
  const o = O("W1"), b = ev.filter((e) => e.type === "borrow" && e.order === o.id);
  assert.deepEqual(b.map((x) => [x.role, x.file, x.module]), [["backend", "src/ccc/sema/lower.clj", "semantics"]]);
  assert.ok(L.some((x) => x.event === "guard" && x.rule === "borrow" && x.role === "backend"), "a guard borrow line in launches.jsonl");
  const c = ev.find((e) => e.type === "commit" && e.order === o.id && e.borrowed);
  assert.deepEqual(c.borrowed.map((x) => [x.module, x.owner, x.files]), [["semantics", "semantics", ["src/ccc/sema/lower.clj"]]]);
  const items = st.data.tracker.items.__map.map(([, i]) => i), rv = items.find((i) => i.id === c.borrowed[0].review);
  assert.deepEqual([rv.assignee, rv.ask.kind, rv.ask.answer?.decision], ["semantics", "review-borrow", "yes"]);
  // the kernel's launch events (the plan's): semantics before W2 was delegated
  const d2 = ev.find((e) => e.type === "delegate" && e.order === O("W2").id).seq;
  const semW1 = ev.filter((e) => e.type === "launch" && e.role === "semantics" && e.seq < d2);
  assert.ok(semW1.length >= 1 && semW1.every((x) => !x.msgs?.length && x.tasks?.length && x.tasks.every((t) => t.kind === "ask")), `semantics' W1 sessions: ${JSON.stringify(semW1.map((x) => ({ msgs: x.msgs, tasks: x.tasks })))}`);
  return { commit: c.sha?.slice(0, 7), review: rv.id, semanticsW1: semW1.map((x) => x.tasks.map((t) => `${t.kind}:${t.ref}`)) };
});
check("5. the guard no longer refuses S1's false positives", () => {
  const g = readJsonl(path.join(P.live, "fake-guard.jsonl")).filter((x) => x.tool === "Bash");
  const want = [/g01_empty_braces\.c/, /stress1\.exit/, /^T=.*\$T -m ccc\.main/, /^CLJ=.*\$CLJ -m ccc\.main/];
  for (const re of want) { const hit = g.filter((x) => re.test(x.what)); assert.ok(hit.length, `asked: ${re}`); assert.ok(hit.every((x) => x.allowed), `${re}: ${hit.find((x) => !x.allowed)?.why}`); }
  const denials = L.filter((x) => x.event === "guard" && x.rule !== "borrow");
  return { asked: g.length, guardDenials: denials.map((x) => `${x.role} ${x.rule}: ${String(x.why).slice(0, 80)}`) };
});
out.ok = out.checks.every((c) => c.ok);
if (!opt.keep && out.ok) out.kept = false; // the scratch dir stays for inspection either way; nothing outside it was touched
console.log(JSON.stringify(out, null, 1));
process.exit(out.ok ? 0 : 1);
