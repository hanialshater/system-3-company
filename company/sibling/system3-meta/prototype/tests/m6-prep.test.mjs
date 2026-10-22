import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M6 prep (plan 2026-10-21 §M6, M4-RUN.md "Open defects"): what the kernel needs before the M6 live run (10 lessons, up
// to 3 builders in parallel, lanes math and cs). Each case drives the real CLIs (meta.mjs, supervisor.mjs) on temp
// state, or the real guard:
//   1 order new --slug          M4's one operator fix: ${slug} fell back to the task (LESSON-<slug>)
//   2 supervisor launched/usage the orchestrator's reports, refused in an agent session (as launch finished, M5 review)
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m6-"));
process.env.META_LIVE_DIR = LIVE;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import(path.join(HERE, "..", "launcher", "guard.mjs"));
const { prepareCmd } = await import("../state.mjs");

const exec = (dir, file, args, env = {}) => {
  const e = { ...process.env, META_LIVE_DIR: dir, ...env }; delete e.NODE_TEST_CONTEXT; if (!env.META_ROLE) delete e.META_ROLE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const fresh = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `meta-m6-${p}-`));
function init(spec) {
  const dir = fresh("co");
  if (typeof spec === "string") ok(meta(dir, "init", `--spec=${spec}`));
  else { const f = path.join(dir, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec)); ok(meta(dir, "init", `--spec-file=${f}`)); }
  return dir;
}

test("M6 prep 1 (M4 defect): order new --slug sets the order's slug, validated; a task LESSON-<slug> interpolates ${slug} to <slug>", () => {
  const dir = init("toy");
  const r = ok(meta(dir, "order", "new", "--to=mgr-live", "--title=rope", "--task=LESSON-one-metre-more-rope", "--slug=one-metre-more-rope", "--accept=x"));
  assert.equal(r.slug, "one-metre-more-rope");
  const o = orderOf(dir, r.order);
  assert.deepEqual([o.task, o.slug], ["LESSON-one-metre-more-rope", "one-metre-more-rope"]);
  const p = prepareCmd(o, { argv: ["node", "gates.mjs", "${slug}", "--task=${task}"] });
  assert.deepEqual(p.argv.slice(2), ["one-metre-more-rope", "--task=LESSON-one-metre-more-rope"], "the M4 failure: gates.mjs got LESSON-one-metre-more-rope");
  // no --slug: the task, as every run before
  const plain = orderOf(dir, ok(meta(dir, "order", "new", "--to=mgr-live", "--title=t", "--task=T1", "--accept=x")).order);
  assert.equal(plain.slug, undefined);
  assert.deepEqual(prepareCmd(plain, { argv: ["node", "x", "${slug}"] }).argv.slice(2), ["T1"]);
  for (const bad of ["--slug=Bad_Slug", "--slug=a--b", "--slug=-a", "--slug", "--slug=a b"]) {
    const x = meta(dir, "order", "new", "--to=mgr-live", "--title=t", "--task=T2", "--accept=x", bad);
    assert.equal(x.code, 1, bad); assert.match(x.err, /--slug is a lesson slug/, bad);
  }
  assert.equal(state(dir).engine.orders.__map.length, 2, "a refused slug places no order");
});

test("M6 prep 2 (the hole the M5 review left): supervisor.mjs launched and usage are refused in an agent session, exit 1 with a refuse event; the guard denies them too", () => {
  const dir = init("toy");
  const agent = { META_ROLE: "toy-builder-1", META_LAUNCH: "0001-toy-builder-1" };
  for (const args of [["launched", "--role=toy-builder-1", "--msgs=M-1"], ["usage", "--finished=toy-builder-1:10"]]) {
    const r = exec(dir, path.join(HERE, "..", "supervisor.mjs"), args, agent);
    assert.equal(r.code, 1, args.join(" ")); assert.match(r.err, /orchestrator's report: refused in an agent session \(toy-builder-1\)/);
  }
  assert.equal(events(dir, "launch").length, 0, "no launch event written");
  assert.equal(events(dir, "usage").length, 0);
  assert.deepEqual(events(dir, "refuse").map((e) => e.by), ["toy-builder-1", "toy-builder-1"]);
  // outside any agent session (the orchestrator, a person) as before
  assert.equal(ok(sup(dir, "launched", "--role=toy-builder-1", "--msgs=M-1")).type, "launch");
  // the guard, with the session's role known
  for (const c of ["node supervisor.mjs launched --role=toy-builder-1", "node /k/supervisor.mjs usage --finished=a:1", "cd /k && node supervisor.mjs --x launched", "node supervisor.mjs $(echo launched)"])
    assert.match(G.bashDenial(c, 0, { role: "toy-builder-1" }) ?? "", /supervisor\.mjs .*\(the orchestrator's report\)/, c);
  for (const c of ["node supervisor.mjs tick", "node supervisor.mjs jobs", "node supervisor.mjs retry --order=O-1"]) assert.equal(G.bashDenial(c, 0, { role: "toy-builder-1" }), null, c);
});
