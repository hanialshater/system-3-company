import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M7 housekeeping (the M6 run needed the operator for both): spec workspace.cleanup removes a done order's build output
// (the folder its NEXT_DIST_DIR names, inside its worktree only) and, where its flow says so, its worktree (the branch
// is kept); a flow's workspace.maxOpen caps how many of its orders hold a worktree at once (the ritual flow: a full
// checkout each). A temp git repo stands in for the company repo; the real CLIs drive it.
const HERE = path.dirname(new URL(import.meta.url).pathname);
const G = await import("../generator.mjs");
const WS = await import("../workspace.mjs");
const exec = (dir, file, args) => {
  const e = { ...process.env, META_LIVE_DIR: dir }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE;
  const r = spawnSync("node", [file, ...args], { env: e, encoding: "utf8", timeout: 60_000 });
  let out = null; try { out = JSON.parse(r.stdout); } catch {}
  return { code: r.status, out, err: r.stderr, stdout: r.stdout };
};
const meta = (dir, ...args) => exec(dir, path.join(HERE, "..", "meta.mjs"), args);
const sup = (dir, ...args) => exec(dir, path.join(HERE, "..", "supervisor.mjs"), args);
const ok = (r) => { assert.equal(r.code, 0, r.err || r.stdout); return r.out; };
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const orderOf = (dir, id) => state(dir).engine.orders.__map.find(([k]) => k === id)[1];
const work = (dir) => state(dir).mailbox.msgs.__map.map(([, m]) => m).filter((m) => m.kind === "work");
const events = (dir, type) => state(dir).log.events.filter((e) => e.type === type);
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
const okCmd = { argv: ["node", "-e", "process.exit(0)"] };

function setup() {
  const top = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m7-hk-"));
  const repo = path.join(top, "repo"), root = path.join(top, "wt"), live = path.join(top, "live");
  fs.mkdirSync(repo); fs.mkdirSync(live);
  sh(repo, "init", "-q", "-b", "main"); sh(repo, "config", "user.email", "t@t"); sh(repo, "config", "user.name", "t");
  fs.writeFileSync(path.join(repo, ".gitignore"), ".next*/\n");
  fs.writeFileSync(path.join(repo, "README.md"), "company\n");
  sh(repo, "add", "-A"); sh(repo, "commit", "-qm", "base");
  const spec = {
    name: "m7hk",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "a" }, { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "build"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "mgr", level: "manager", reportsTo: "head-of-product", lane: "a", room: "studio", floor: 2 },
      { id: "builder", level: "builder", reportsTo: "mgr", lane: "a", room: "studio", floor: 2 },
      { id: "checker", level: "checker", reportsTo: "chief-of-staff", room: "quality", floor: 3 },
      { id: "release", level: "release", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
    ],
    workspace: { kind: "git-worktree", repo, base: "main", root, branch: "meta/${run}-${task}", run: "hk", env: { NEXT_DIST_DIR: ".next-${task}" }, cleanup: { env: ["NEXT_DIST_DIR"] } },
    flows: {
      lesson: { stages: [{ stage: "build", signer: "builder", evidence: ["work"] }, { stage: "check", signer: "checker", evidence: ["notes"] }, { stage: "ship", signer: "release", evidence: ["shipped"], run: okCmd }] },
      ritual: { workspace: { maxOpen: 1, cleanup: { worktree: true } }, stages: [{ stage: "run", signer: "chair", evidence: ["records/<ritual>.md"] }, { stage: "check", signer: "attendee", evidence: ["records/<ritual>.md"] }, { stage: "ship", signer: "code", evidence: [], run: okCmd }] },
    },
  };
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(spec));
  ok(meta(live, "init", `--spec-file=${f}`));
  return { top, repo, root, live, spec };
}
const leave = (dir, order, stage, role, extra = []) => {
  const m = work(dir).find((x) => x.ref === order && x.state === "open" && x.body.stage === stage);
  assert.ok(m, `no open ${stage} item of ${order}`);
  const e = ok(meta(dir, "room", "enter", `--msg=${m.id}`, `--role=${role}`));
  return ok(meta(dir, "room", "leave", `--run=${e.run}`, "--evidence=e", ...extra));
};
const ritual = (dir, n) => ok(meta(dir, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=chief-of-staff", "--attendee=head-of-product", `--title=R${n}`, `--task=RITUAL-r${n}`, `--slug=r${n}`, "--accept=a")).order;

test("validation: workspace.cleanup {env, worktree} names the workspace's own env; a flow's workspace {maxOpen, cleanup} needs a spec workspace", () => {
  const { spec } = setup();
  assert.deepEqual(G.validateSpec(spec), []);
  const v = (mut) => { const s = structuredClone(spec); mut(s); return G.validateSpec(s).join("\n"); };
  assert.match(v((s) => { s.workspace.cleanup = { env: ["QA_OUT"] }; }), /cleanup.env names QA_OUT, which the workspace env does not set/);
  assert.match(v((s) => { s.workspace.cleanup = { all: true }; }), /cleanup: unknown key all/);
  assert.match(v((s) => { s.flows.ritual.workspace.maxOpen = 0; }), /flow ritual: workspace.maxOpen is a whole number 1-20/);
  assert.match(v((s) => { s.flows.ritual.workspace.extra = 1; }), /flow ritual: workspace has unknown key extra/);
  assert.match(v((s) => { delete s.workspace; }), /workspace settings on a flow need a spec workspace/);
});

test("cleanup: a done lesson's .next-<task> is removed and its worktree kept; a done ritual's worktree is removed and its branch kept; maxOpen holds the next ritual until then", () => {
  const { repo, root, live } = setup();
  const r1 = ritual(live, 1), r2 = ritual(live, 2);
  ok(sup(live, "tick")); ok(sup(live, "tick")); ok(sup(live, "tick"));
  assert.ok(orderOf(live, r1).workdir, "the first ritual has its worktree");
  assert.equal(orderOf(live, r2).workdir, undefined, "maxOpen 1: the second waits");
  assert.ok(!ok(sup(live, "tick")).plan.some((p) => p.msgs?.some((id) => work(live).find((m) => m.id === id)?.ref === r2)), "and nobody is launched for it");
  const wt1 = orderOf(live, r1).workdir;
  fs.mkdirSync(path.join(wt1, ".next-RITUAL-r1", "cache"), { recursive: true }); fs.writeFileSync(path.join(wt1, ".next-RITUAL-r1", "cache", "x"), "186 MB");
  leave(live, r1, "run", "chief-of-staff");
  leave(live, r1, "check", "head-of-product", ["--verdict=pass"]);
  const t = ok(sup(live, "tick"));
  assert.equal(orderOf(live, r1).stage, "done");
  assert.ok(t.steps.some((s) => s.step === "cleanup" && s.order === r1 && s.result === "worktree removed"));
  assert.ok(!fs.existsSync(wt1), "the ritual's worktree is gone");
  assert.equal(sh(repo, "branch", "--list", "meta/hk-RITUAL-r1"), "meta/hk-RITUAL-r1", "its branch is kept");
  const c = events(live, "cleanup").find((e) => e.order === r1);
  assert.deepEqual([c.removed, c.worktree], [[".next-RITUAL-r1"], true]);
  ok(sup(live, "tick"));
  assert.ok(orderOf(live, r2).workdir, "the next ritual gets a worktree once the first is done");
  // a lesson: its build output only
  const l = ok(meta(live, "order", "new", "--by=chief-of-staff", "--to=mgr", "--title=L", "--task=L1", "--slug=a-lesson", "--accept=a")).order;
  ok(meta(live, "order", "delegate", l, "--by=mgr", "--to=builder"));
  ok(sup(live, "tick"));
  const wl = orderOf(live, l).workdir;
  assert.ok(wl);
  fs.mkdirSync(path.join(wl, ".next-L1")); fs.writeFileSync(path.join(wl, ".next-L1", "x"), "build");
  fs.writeFileSync(path.join(root, "outside"), "never touched");
  leave(live, l, "build", "builder");
  leave(live, l, "check", "checker", ["--verdict=pass"]);
  ok(sup(live, "tick"));
  assert.equal(orderOf(live, l).stage, "done");
  assert.ok(!fs.existsSync(path.join(wl, ".next-L1")) && fs.existsSync(path.join(wl, "README.md")), "build output gone, worktree kept");
  assert.equal(fs.readFileSync(path.join(root, "outside"), "utf8"), "never touched");
  // once per order: a second tick does nothing more
  const n = events(live, "cleanup").length;
  ok(sup(live, "tick"));
  assert.equal(events(live, "cleanup").length, n);
});

test("cleanup refuses a path outside the worktree's own files: a symlinked or escaping NEXT_DIST_DIR is left, and said so", () => {
  const top = fs.mkdtempSync(path.join(os.tmpdir(), "meta-m7-hk2-"));
  const dir = path.join(top, "wt"), keep = path.join(top, "keep");
  fs.mkdirSync(dir); fs.mkdirSync(keep); fs.writeFileSync(path.join(keep, "x"), "mine");
  fs.symlinkSync(keep, path.join(dir, ".next-T"));
  const log = []; const o = { id: "O-1", stage: "cancelled", workspace: { dir, repo: dir, env: { NEXT_DIST_DIR: ".next-T", OTHER: "../keep" } } };
  const co = { spec: { workspace: { cleanup: { env: ["NEXT_DIST_DIR", "OTHER"] } } }, engine: { clock: { now: () => 1 } }, log: { add: (e) => log.push(e) } };
  assert.ok(WS.cleanupDue(co, o));
  const r = WS.cleanup(co, o);
  assert.deepEqual(r.removed, []);
  assert.match(r.error, /NEXT_DIST_DIR=\.next-T: resolves outside.*OTHER=\.\.\/keep: not a path inside/);
  assert.equal(fs.readFileSync(path.join(keep, "x"), "utf8"), "mine");
  assert.ok(!WS.cleanupDue(co, o), "once");
});
