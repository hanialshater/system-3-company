// Benchmark 4 fault injector (hidden from agents). Polls the state and injects, once each, at fixed triggers:
//   F2 corrupt: when GRAPH ships, its module is wrapped so 2-cell cycles vanish (work and shipped copies)
//   F3 drop:    when PARSER waits for its check, that message is deleted from the mailbox
//   F4 change:  when VALUES has shipped and SHEET is being built, the founder renames #CYCLE! to #CIRC!: the hidden
//               tests change, SPEC.md changes, a company post goes out, and VALUES is reopened
// (F1, an agent process killed mid-item, is the launcher's --kill.) Every injection is a line in live/<dir>/faults.jsonl.
//   node faults.mjs --live=<dir> --acc=<acceptance dir> [--max-min=120]
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, "").split("="); return [k, v.join("=")]; }));
const LIVE = path.resolve(opt.live), ACC = path.resolve(opt.acc), PROTO = path.resolve(path.dirname(new URL(import.meta.url).pathname), opt.proto ?? "");
process.env.META_LIVE_DIR = LIVE;
const { load, save, withLock } = await import(path.join(opt.proto, "state.mjs"));
const log = (x) => { const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(path.join(ACC, "..", `faults-${path.basename(LIVE)}.jsonl`), l + "\n") /* outside the live dir: benchmark 4 F3 test, an agent read the log */; console.log(l); };
const meta = (...a) => spawnSync("node", [path.join(opt.proto, "meta.mjs"), ...a], { env: process.env, encoding: "utf8" });
const done = new Set();
const end = Date.now() + Number(opt["max-min"] ?? 120) * 60000;
const order = (co, task) => [...co.engine.orders.values()].find((o) => o.task === task);
while (Date.now() < end && done.size < 3) {
  await new Promise((r) => setTimeout(r, 3000));
  let co; try { co = load(); } catch { continue; }
  const g = order(co, "GRAPH"), p = order(co, "PARSER"), v = order(co, "VALUES"), s = order(co, "SHEET");
  if (!done.has("F2") && g?.stage === "done") {
    for (const root of ["work", "shipped"]) {
      const d = path.join(LIVE, root, "GRAPH"), f = path.join(d, "graph.mjs");
      if (!fs.existsSync(f)) continue;
      fs.renameSync(f, path.join(d, "graph-impl.mjs"));
      fs.writeFileSync(f, `export * from "./graph-impl.mjs";\nimport { cycleCells as impl } from "./graph-impl.mjs";\nexport function cycleCells(deps) { const s = impl(deps); return s.size === 2 ? new Set() : s; }\n`);
    }
    done.add("F2"); log({ fault: "F2", what: "GRAPH corrupted after ship: 2-cell cycles vanish", order: g.id });
  }
  if (!done.has("F3") && p?.stage === "check") {
    const r = withLock(() => { const c = load(); const m = [...c.mailbox.msgs.values()].find((x) => x.ref === p.id && x.state === "open" && x.body?.stage === "check" && !x.lease); if (!m) return null; c.mailbox.msgs.delete(m.id); save(c); return m.id; });
    if (r) { done.add("F3"); log({ fault: "F3", what: "PARSER's check message dropped", order: p.id, msg: r }); }
  }
  if (!done.has("F4") && v?.stage === "done" && s && !s.blocked && s.stage === "build") {
    fs.writeFileSync(path.join(ACC, "requirements.json"), JSON.stringify({ cycle: "#CIRC!" }));
    const spec = path.join(LIVE, "SPEC.md");
    fs.writeFileSync(spec, fs.readFileSync(spec, "utf8").replaceAll("#CYCLE!", "#CIRC!") + `\n## Changed ${new Date().toISOString().slice(0, 16)}Z (founder)\n\nThe cycle error is now \`#CIRC!\` (it was \`#CYCLE!\`): \`ERRORS.CYCLE\` is "#CIRC!". Every module uses the ERRORS constant.\n`);
    const post = meta("channel", "post", "--by=founder", "--channel=company", "--title=Requirement change: the cycle error is now #CIRC! (was #CYCLE!). ERRORS.CYCLE changes in VALUES; every module must use the constant. SPEC.md is updated.", "--ack");
    const re = meta("order", "reopen", v.id, "--by=founder", "--reason=changed requirement", "--findings=Requirement change from the founder: ERRORS.CYCLE is now \"#CIRC!\" (was \"#CYCLE!\"). Update values.mjs and your tests; see the Changed note at the end of live/bench4/SPEC.md.");
    done.add("F4"); log({ fault: "F4", what: "requirement change #CYCLE! -> #CIRC!", reopened: v.id, post: post.status === 0 ? JSON.parse(post.stdout).post ?? true : post.stderr.trim(), reopen: re.status === 0 ? "ok" : re.stderr.trim() });
  }
}
log({ fault: "injector-exit", injected: [...done] });
