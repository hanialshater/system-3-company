import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K10 (plan 2026-10-21 §3): launcher hardening. The guard (launcher/guard.mjs) in isolation: protected paths for the write
// tools, the deploy/push/publish/claim pattern for Bash, the role's tools; its two SDK shapes (canUseTool and the
// PreToolUse hook, read from the installed SDK's sdk.d.ts); one record per denied call. Then the kernel side:
// `meta.mjs launch config` (role fields, the order's worktree, protected globs as of its base), `guard denied`, role
// field validation, and META_KERNEL_ABS (kernel commands by absolute path). A temp git repo stands in for the company.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k10-"));
process.env.META_LIVE_DIR = LIVE;
// the launcher by a path export-kernel.mjs leaves alone (it moves the kernel modules to src/, not launcher/)
const HERE = path.dirname(new URL(import.meta.url).pathname), UP = "..";
const LAUNCHER = path.join(HERE, UP, "launcher");
const G = await import(path.join(LAUNCHER, "guard.mjs"));
const { make, save, absCmds } = await import("../state.mjs");
const { briefFor } = await import("../supervisor.mjs");
const WS = await import("../workspace.mjs");
const { validateSpec, builtinSpec } = await import("../generator.mjs");
const META = path.join(HERE, "..", "meta.mjs");
const sh = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
const meta = (...args) => spawnSync("node", [META, ...args], { env: { ...process.env, META_LIVE_DIR: LIVE }, encoding: "utf8" });

const WT = path.join(LIVE, "wt-x");
const GLOBS = ["company/constitution/protected-paths.txt", "tests/qa/**", "src/kit/Lesson.tsx", "tools/company.mjs"];
fs.mkdirSync(path.join(WT, "src/kit"), { recursive: true });
const ROOTS = [{ dir: WT, globs: GLOBS, file: "company/constitution/protected-paths.txt" }];
const opts = { tools: G.DEFAULT_TOOLS, roots: ROOTS, cwd: WT };

test("decide: write tools on protected paths are denied (absolute, relative to cwd, through .., under **, NotebookEdit); other paths pass", () => {
  for (const [tool, input] of [
    ["Write", { file_path: path.join(WT, "tools/company.mjs") }],
    ["Edit", { file_path: "src/kit/Lesson.tsx" }],
    ["MultiEdit", { file_path: path.join(WT, "src/../tests/qa/deep/contract.md") }],
    ["NotebookEdit", { notebook_path: "company/constitution/protected-paths.txt" }],
  ]) {
    const d = G.decide(tool, input, { ...opts, tools: [...G.DEFAULT_TOOLS, "MultiEdit", "NotebookEdit"] });
    assert.equal(d?.rule, "protected-path", `${tool} ${JSON.stringify(input)}`);
  }
  assert.equal(G.decide("Write", { file_path: "src/kit/Other.tsx" }, opts), null);
  assert.equal(G.decide("Write", { file_path: "src/kit/Lesson.tsx.bak" }, opts), null, "a glob matches the whole path");
  assert.equal(G.decide("Write", { file_path: path.join(LIVE, "elsewhere/tools/company.mjs") }, opts), null, "outside every root");
  assert.equal(G.decide("Edit", {}, opts), null, "no path: the tool reports its own error");
  // a root reached through a symlink, and a new file under it, are still caught
  const link = path.join(LIVE, "wt-link"); fs.symlinkSync(WT, link);
  assert.equal(G.decide("Write", { file_path: path.join(link, "tests/qa/new.spec.ts") }, opts)?.rule, "protected-path");
  assert.equal(G.decide("Write", { file_path: path.join(WT, "tests/qa/new.spec.ts") }, { ...opts, roots: [{ dir: link, globs: GLOBS }] })?.rule, "protected-path");
});

test("decide: Bash matching the deploy/push/publish/claim pattern is denied; ordinary commands pass", () => {
  for (const c of ["npm run deploy", "npm  run deploy:prod", "npx vercel --prod", "git commit -m 'x [deploy]'", "git push origin meta/m4-x", "git -C /w push", "git --no-pager push -f", "cd x && git push",
    "gh workflow run deploy.yml", "gh api repos/o/r/dispatches", "node tools/company.mjs publish limits-1", "npm run company -- publish limits-1", "node tools/claim.mjs verify C-1"]) {
    assert.equal(G.decide("Bash", { command: c }, opts)?.rule, "bash", c);
  }
  for (const c of ["git status", "git diff --stat", "git commit -qm 'meta: build'", "git log --oneline", "npm run check", "npm run company -- status", "node tools/company.mjs status", "npm run walkthrough -- limits-1", "gh pr list", "echo pushover"]) {
    assert.equal(G.decide("Bash", { command: c }, opts), null, c);
  }
});

test("decide: a tool outside the role's list is denied; the fact-checker's list lets WebFetch through", () => {
  assert.equal(G.decide("WebFetch", { url: "https://example.com" }, opts)?.rule, "tool");
  assert.equal(G.decide("WebFetch", { url: "https://example.com" }, { ...opts, tools: [...G.DEFAULT_TOOLS, "WebFetch", "WebSearch"] }), null);
  assert.equal(G.decide("Read", { file_path: path.join(WT, "tools/company.mjs") }, opts), null, "reading a protected file is fine");
  assert.equal(G.decide("WebFetch", {}, { ...opts, tools: null }), null, "no list: any tool");
});

test("makeGuard: canUseTool and the PreToolUse hook answer in the SDK's shapes, and each denied call is recorded once", async () => {
  const seen = [];
  const g = G.makeGuard({ ...opts, record: (d) => seen.push(d) });
  const ok = await g.canUseTool("Bash", { command: "npm run check" }, { signal: new AbortController().signal, toolUseID: "tu1", requestId: "r1" });
  assert.deepEqual(ok, { behavior: "allow", updatedInput: { command: "npm run check" } });
  const no = await g.canUseTool("Write", { file_path: "tools/company.mjs", content: "x" }, { signal: new AbortController().signal, toolUseID: "tu2", requestId: "r2" });
  assert.equal(no.behavior, "deny");
  assert.match(no.message, /guard \(K10\).*tools\/company\.mjs is a protected path/);
  assert.deepEqual(await g.preToolUse({ hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "git status" }, tool_use_id: "tu3", cwd: WT }, "tu3", {}), {});
  const h = await g.preToolUse({ hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "npm run deploy:prod" }, tool_use_id: "tu4", cwd: WT }, "tu4", {});
  assert.equal(h.hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(h.hookSpecificOutput.permissionDecision, "deny");
  assert.match(h.hookSpecificOutput.permissionDecisionReason, /npm run deploy/);
  // the same call seen by both entry points is one denial
  await g.canUseTool("Bash", { command: "npm run deploy:prod" }, { toolUseID: "tu4" });
  // the hook resolves a relative path against the session's cwd
  const r = await g.preToolUse({ hook_event_name: "PreToolUse", tool_name: "Edit", tool_input: { file_path: "src/kit/Lesson.tsx" }, tool_use_id: "tu5", cwd: WT }, "tu5", {});
  assert.equal(r.hookSpecificOutput.permissionDecision, "deny");
  assert.deepEqual(seen.map((d) => [d.via, d.tool, d.rule, d.toolUseID]), [["canUseTool", "Write", "protected-path", "tu2"], ["hook", "Bash", "bash", "tu4"], ["hook", "Edit", "protected-path", "tu5"]]);
  assert.equal(g.denials.length, 3);
  assert.deepEqual(await g.preToolUse({ hook_event_name: "PostToolUse", tool_name: "Bash", tool_input: { command: "git push" } }, "tu6", {}), {}, "only PreToolUse decides");
});

test("the SDK's own types still say what the guard assumes (canUseTool's arguments, PermissionResult, the PreToolUse hook)", (t) => {
  const f = path.join(LAUNCHER, "node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts");
  if (!fs.existsSync(f)) return t.skip("launcher/node_modules not installed");
  const d = fs.readFileSync(f, "utf8");
  assert.match(d, /export declare type CanUseTool = \(toolName: string, input: Record<string, unknown>, options: \{/);
  assert.match(d, /toolUseID: string;/);
  assert.match(d, /export declare type PermissionResult = \{\s*behavior: 'allow';\s*updatedInput\?: Record<string, unknown>;[\s\S]*?behavior: 'deny';\s*message: string;/);
  assert.match(d, /export declare type HookCallback = \(input: HookInput, toolUseID: string \| undefined, options: \{/);
  assert.match(d, /export declare type PreToolUseHookSpecificOutput = \{\s*hookEventName: 'PreToolUse';\s*permissionDecision\?: HookPermissionDecision;\s*permissionDecisionReason\?: string;/);
  assert.match(d, /canUseTool\?: CanUseTool;/);
  assert.match(d, /permissionPrompts\?: 'host' \| 'none';/);
});

// ---- the kernel side
const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt");
fs.mkdirSync(path.join(REPO, "company/constitution"), { recursive: true });
sh(REPO, "init", "-q", "-b", "main"); sh(REPO, "config", "user.email", "t@example.com"); sh(REPO, "config", "user.name", "t");
fs.writeFileSync(path.join(REPO, "company/constitution/protected-paths.txt"), "# protected\ntools/company.mjs\ntests/qa/**\n");
sh(REPO, "add", "-A"); sh(REPO, "commit", "-q", "-m", "base");
const BASE = sh(REPO, "rev-parse", "HEAD");
// main moves on after the base: the guard reads the globs as of the order's base, as K7 does
fs.writeFileSync(path.join(REPO, "company/constitution/protected-paths.txt"), "nothing/\n"); sh(REPO, "commit", "-q", "-am", "later");
const WORKSPACE = { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "m4" };

function spec() {
  const s = builtinSpec("toy");
  Object.assign(s.roles.find((r) => r.id === "toy-builder-1"), { tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"], sessionMin: 60, maxTurns: 200, settingSources: ["project"] });
  Object.assign(s.roles.find((r) => r.id === "toy-checker"), { tools: ["Bash", "Read", "Glob", "Grep", "WebFetch", "WebSearch"], sessionMin: 30, maxTurns: 120 });
  s.workspace = WORKSPACE;
  return s;
}

test("validateSpec: the role launch fields are checked, and every existing spec stays valid", () => {
  assert.deepEqual(validateSpec(spec()), []);
  const bad = (f) => { const s = spec(); Object.assign(s.roles.find((r) => r.id === "toy-builder-1"), f); return validateSpec(s); };
  assert.ok(bad({ tools: "Bash" }).some((x) => /toy-builder-1: tools is a list/.test(x)));
  assert.ok(bad({ tools: [] }).some((x) => /tools is a list/.test(x)));
  assert.ok(bad({ sessionMin: 0 }).some((x) => /sessionMin/.test(x)));
  assert.ok(bad({ maxTurns: 1.5 }).some((x) => /maxTurns/.test(x)));
  assert.ok(bad({ settingSources: ["project", "everything"] }).some((x) => /settingSources is a list of user, project, local/.test(x)));
  for (const n of ["toy", "storybook", "research", "sheetco"]) assert.deepEqual(validateSpec(JSON.parse(fs.readFileSync(path.join(HERE, "..", "specs", `${n}.json`), "utf8"))), [], n);
});

test("meta.mjs launch config: the role's fields, the order's worktree, its protected globs as of the base; guard denied is a guard event", () => {
  const co = make("k10", spec());
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" });
  o.task = "KA";
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  const w = WS.ensure(co, o);
  assert.ok(w.workdir && !w.error, JSON.stringify(w));
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  save(co);
  const r = meta("launch", "config", "--role=toy-builder-1", `--msgs=${m.id}`);
  assert.equal(r.status, 0, r.stderr);
  const c = JSON.parse(r.stdout);
  assert.deepEqual([c.tools, c.sessionMin, c.maxTurns, c.settingSources], [["Bash", "Read", "Write", "Edit", "Glob", "Grep"], 60, 200, ["project"]]);
  assert.equal(c.workdir, path.join(ROOT, "KA"));
  assert.deepEqual(c.workdirs, [c.workdir]);
  // the launch's own order first, then the repo and the worktree root (K10 review: every launch gets all three)
  assert.deepEqual(c.roots.map((x) => [x.dir, x.nested ?? 0]), [[c.workdir, 0], [REPO, 0], [ROOT, 1]]);
  assert.deepEqual(c.roots[0].globs, ["tools/company.mjs", "tests/qa/**"], "the base's globs, not main's tip");
  // the guard built from it denies the worktree's protected file and lets the rest through
  const g = G.makeGuard({ tools: c.tools, roots: c.roots, cwd: c.workdir });
  assert.equal(G.decide("Write", { file_path: "tests/qa/x.spec.ts" }, { tools: c.tools, roots: c.roots, cwd: c.workdir })?.rule, "protected-path");
  assert.equal(G.decide("Write", { file_path: path.join(REPO, "tools/company.mjs") }, { tools: c.tools, roots: c.roots, cwd: c.workdir })?.rule, "protected-path", "the main checkout too");
  assert.equal(G.decide("Write", { file_path: "src/lesson.tsx" }, { tools: c.tools, roots: c.roots, cwd: c.workdir }), null);
  assert.ok(g.canUseTool);
  // a role with no fields, and no messages: nulls (the launcher keeps its defaults) and no workdir (the kernel's cwd),
  // but still the workspace's roots (K10 review: a task-only launch had none)
  const d = JSON.parse(meta("launch", "config", "--role=cos").stdout);
  assert.deepEqual([d.tools, d.sessionMin, d.maxTurns, d.settingSources, d.workdir], [null, null, null, null, null]);
  assert.deepEqual(d.roots.map((x) => x.dir), [c.workdir, REPO, ROOT]);
  const ch = JSON.parse(meta("launch", "config", "--role=toy-checker").stdout);
  assert.ok(ch.tools.includes("WebFetch") && ch.maxTurns === 120 && ch.sessionMin === 30);
  assert.equal(meta("launch", "config", "--role=nobody").status, 2);
  // launch config is read-only: the state is not rewritten
  const before = fs.statSync(path.join(LIVE, "state.json")).mtimeMs;
  meta("launch", "config", "--role=cos");
  assert.equal(fs.statSync(path.join(LIVE, "state.json")).mtimeMs, before);
  const gd = meta("guard", "denied", "--launch=L1", "--role=toy-builder-1", "--tool=Bash", "--rule=bash", "--why=`git push` is not allowed", "--detail=git push origin x", "--via=hook");
  assert.equal(gd.status, 0, gd.stderr);
  const ev = JSON.parse(meta("events", "--type=guard").stdout);
  assert.deepEqual(ev.map((e) => [e.launch, e.role, e.tool, e.rule, e.why, e.detail, e.via]), [["L1", "toy-builder-1", "Bash", "bash", "`git push` is not allowed", "git push origin x", "hook"]]);
  assert.equal(meta("guard", "denied", "--role=toy-builder-1").status, 2, "tool, rule and why are required");
});

test("META_KERNEL_ABS: briefs and packs name kernel commands by absolute path; unset, the text is as before", async () => {
  const co = make("k10b", spec());
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" });
  o.task = "KB";
  co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  WS.ensure(co, o);
  const m = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o.id);
  const item = { role: "toy-builder-1", msgs: [m.id], cap: 1, tasks: [] };
  delete process.env.META_KERNEL_ABS;
  const plain = briefFor(co, item);
  assert.match(plain, /`node meta\.mjs room enter --msg=/);
  assert.equal(absCmds("node meta.mjs x; node supervisor.mjs y"), "node meta.mjs x; node supervisor.mjs y");
  process.env.META_KERNEL_ABS = "1";
  try {
    const abs = briefFor(co, item);
    assert.ok(abs.includes(`\`node ${META} room enter --msg=${m.id}`), abs);
    assert.ok(!/node meta\.mjs/.test(abs));
    assert.equal(absCmds("node supervisor.mjs retry"), `node ${path.join(HERE, "..", "supervisor.mjs")} retry`);
    // the pack's leave_with/next_with, from a CLI started with the variable (the launcher sets it for serve and agents)
    save(co);
    const r = spawnSync("node", [META, "room", "enter", `--msg=${m.id}`, "--role=toy-builder-1"], { env: { ...process.env, META_LIVE_DIR: LIVE }, encoding: "utf8" });
    assert.equal(r.status, 0, r.stderr);
    const p = JSON.parse(r.stdout);
    assert.ok(p.leave_with.includes(`node ${META} room leave`) && p.next_with.includes(`node ${META} room next`), JSON.stringify(p));
    // K10 review: every kernel output, not only briefs and packs (the held-order note named `node supervisor.mjs retry`)
    const co2 = (await import("../state.mjs")).load();
    const o2 = co2.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" });
    o2.task = "KH";
    co2.engine.delegate(o2.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
    WS.hold(co2, o2, "git said no");
    const m2 = co2.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === o2.id);
    save(co2);
    const h = spawnSync("node", [META, "room", "enter", `--msg=${m2.id}`, "--role=toy-builder-1"], { env: { ...process.env, META_LIVE_DIR: LIVE }, encoding: "utf8" });
    assert.equal(h.status, 1, h.stderr);
    assert.ok(h.stdout.includes(`node ${path.join(HERE, "..", "supervisor.mjs")} retry --order=`), h.stdout);
  } finally { delete process.env.META_KERNEL_ABS; }
});

test("K10 review: the roots cover task-only launches, sibling orders' worktrees and worktrees made later; no workspace, no roots", () => {
  const co = make("k10c", spec());
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  const mk = (task) => { const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" }); o.task = task; co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 }); assert.ok(!WS.ensure(co, o).error); return o; };
  const a = mk("KC1"), b = mk("KC2");
  const ma = co.mailbox.queue("toy-builder-1", "work").find((x) => x.ref === a.id);
  // a manager's delegate launch (msgs []): the supervisor's task-only launches
  const t = WS.launchConfig(co, { role: "mgr-live", msgs: [] });
  const dec = (c, p) => G.decide("Write", { file_path: p }, { tools: null, roots: c.roots, cwd: LIVE })?.rule ?? null;
  for (const p of [path.join(REPO, "tools/company.mjs"), path.join(a.workdir, "tests/qa/x.spec.ts"), path.join(b.workdir, "tools/company.mjs"),
    path.join(ROOT, "made-by-hand/tests/qa/y.ts"), path.join(ROOT, "base/tools/company.mjs")]) assert.equal(dec(t, p), "protected-path", p);
  assert.equal(dec(t, path.join(ROOT, "made-by-hand/src/x.tsx")), null);
  assert.equal(dec(t, path.join(ROOT, "tools/company.mjs")), null, "under the root, the first segment is the checkout");
  // the builder's launch for order a: order b's worktree is guarded too, and a's own globs come first
  const c = WS.launchConfig(co, { role: "toy-builder-1", msgs: [ma.id] });
  assert.equal(c.workdir, a.workdir);
  assert.equal(c.roots[0].dir, a.workdir);
  assert.equal(dec(c, path.join(b.workdir, "tests/qa/z.ts")), "protected-path");
  // a sibling order's globs are its own base's
  assert.deepEqual(c.roots.find((x) => x.dir === b.workdir).globs, ["tools/company.mjs", "tests/qa/**"]);
  // no workspace: nothing to protect, as before K10
  const plain = make("k10d", builtinSpec("toy"));
  plain.org.genesis(plain.spec.roles.map((r) => ({ ...r })));
  assert.deepEqual(WS.launchConfig(plain, { role: "cos", msgs: [] }).roots, []);
});

test("K10 review: Bash is judged per simple command: the review's misses are denied, its false positives pass", () => {
  for (const c of ["git -C '/a b' push", "git --work-tree /x push", "git --git-dir /x push", "git --git-dir=.git push", "git send-pack origin", "npm run company --silent -- publish x",
    "node tools/company.mjs --x publish", "yarn deploy", "pnpm run deploy:prod", "npm --silent run deploy", "git -C $(pwd) push", "git -C ${D} push", "FOO=1 sudo -E git push", "timeout 30 git -C /x push",
    "bash -c 'git -C \"/a b\" push'", "echo $(git -C /x push)", "x=`git -C /y push`", "{ git -C /x push; }", "if true; then git -C /x push; fi", "pnpm dlx vercel deploy", "npm exec -- vercel", "vercel --prod",
    "git commit -F - <<EOF\n[deploy] x\nEOF", "git commit --amend -m 'ship [DEPLOY]'", "./tools/company.mjs publish x", "gh -R o/r workflow run x", "node /abs/tools/claim.mjs verify C-1"]) {
    assert.equal(G.decide("Bash", { command: c }, opts)?.rule, "bash", c);
  }
  for (const c of ["cat vercel.json", "grep -n vercel company/ops/runbook-deploy.md", "grep -r claim.mjs tools", "git log --grep '[deploy]'", "git push-to-x", "git commit -m 'fix the push docs'",
    "npm run company -- status --note=publish", "npm run company -- board add \"publish the lesson\" --owner=release-manager", "node tools/company.mjs check", "echo deploy", "npm deploy"]) {
    assert.equal(G.decide("Bash", { command: c }, opts), null, c);
  }
  assert.match(G.decide("Bash", { command: "git -C '/a b' push" }, opts).why, /`git push` is not allowed/);
});

test("K10 review: sessionPlan fails closed, picks cwd, settingSources and sessionMin by precedence; queryOptions keeps the guard wired", async () => {
  const D = { cwd: "/kernel", sessionMin: 20, maxTurns: 80, settingSources: [] };
  assert.match(G.sessionPlan(null, {}, D).refused, /launch config failed/);
  const cfg = { tools: null, sessionMin: null, maxTurns: null, settingSources: null, workdir: "/wt/KA", roots: [{ dir: "/wt/KA", globs: ["x"] }] };
  let p = G.sessionPlan(cfg, { fromOrder: false }, D);
  assert.deepEqual([p.cwd, p.tools, p.strictTools, p.sessionMin, p.maxTurns, p.settingSources], ["/kernel", G.DEFAULT_TOOLS, false, 20, 80, []]);
  assert.deepEqual(p.roots, cfg.roots, "the roots apply whatever the cwd");
  p = G.sessionPlan(cfg, { fromOrder: true }, D);
  assert.deepEqual([p.cwd, p.settingSources], ["/wt/KA", ["project"]], "--workdir-from=order: the worktree, with the project settings");
  assert.deepEqual(G.sessionPlan({ ...cfg, workdir: null }, { fromOrder: true }, D).cwd, "/kernel", "no order workdir: the kernel");
  assert.deepEqual(G.sessionPlan(cfg, { fromOrder: true, settingSources: ["user"] }, D).settingSources, ["user"], "--setting-sources over the default");
  assert.deepEqual(G.sessionPlan({ ...cfg, settingSources: ["local"] }, { fromOrder: true, settingSources: ["user"] }, D).settingSources, ["local"], "the role over both");
  const role = { ...cfg, tools: ["Read", "Bash", "WebFetch"], sessionMin: 60, maxTurns: 200 };
  p = G.sessionPlan(role, {}, D);
  assert.deepEqual([p.tools, p.strictTools, p.sessionMin, p.maxTurns], [role.tools, true, 60, 200]);
  assert.equal(G.sessionPlan(role, { sessionMin: 5 }, D).sessionMin, 5, "an explicit --session-min wins (a short smoke run)");
  // the options query() gets
  const g = G.makeGuard({ tools: p.tools, strictTools: p.strictTools, roots: p.roots, cwd: p.cwd });
  const ac = new AbortController(), q = G.queryOptions(p, g, { model: "m", env: { A: "1" }, abortController: ac });
  assert.equal(q.permissionMode, "default", "never dontAsk: canUseTool would not be asked");
  assert.equal(q.permissionPrompts, "host", "never none: canUseTool would not be asked");
  assert.equal(q.canUseTool, g.canUseTool);
  assert.deepEqual(q.hooks.PreToolUse.map((h) => h.hooks), [[g.preToolUse]]);
  assert.deepEqual(q.allowedTools, ["Read", "WebFetch"], "Bash and the write tools always reach the guard");
  assert.deepEqual(q.tools, role.tools, "a role that names its tools gets only those");
  assert.deepEqual([q.cwd, q.model, q.env, q.abortController, q.maxTurns, q.settingSources], [p.cwd, "m", { A: "1" }, ac, 200, p.settingSources]);
  const q0 = G.queryOptions(G.sessionPlan(cfg, {}, D), g, {});
  assert.ok(!("tools" in q0), "no role list: the SDK's base set, as before K10");
  assert.deepEqual(q0.allowedTools, ["Read", "Glob", "Grep"]);
  // launch.mjs builds its query from these (and refuses on a failed lookup)
  const src = fs.readFileSync(path.join(LAUNCHER, "launch.mjs"), "utf8");
  assert.match(src, /query\(\{ prompt, options: queryOptions\(plan, guard, /);
  assert.match(src, /const plan = sessionPlan\(cfg, /);
  assert.match(src, /if \(plan\.refused\) \{[\s\S]*?return;\s*\}/);
  assert.ok(!/permissionMode: "dontAsk"|permissionPrompts: "none"/.test(src));
});

test("K10 review: with no role list, only canUseTool applies DEFAULT_TOOLS (TodoWrite runs, WebFetch is refused, as under dontAsk)", async () => {
  const g = G.makeGuard({ tools: G.DEFAULT_TOOLS, strictTools: false, roots: ROOTS, cwd: WT });
  assert.deepEqual(await g.preToolUse({ hook_event_name: "PreToolUse", tool_name: "TodoWrite", tool_input: {}, cwd: WT }, "t1"), {});
  assert.equal((await g.canUseTool("WebFetch", { url: "https://x" }, { toolUseID: "t2" })).behavior, "deny");
  const h = await g.preToolUse({ hook_event_name: "PreToolUse", tool_name: "Write", tool_input: { file_path: "tools/company.mjs" }, cwd: WT }, "t3");
  assert.equal(h.hookSpecificOutput.permissionDecision, "deny", "the path rule still applies in the hook");
  const s = G.makeGuard({ tools: ["Read"], strictTools: true, roots: ROOTS, cwd: WT });
  assert.equal((await s.preToolUse({ hook_event_name: "PreToolUse", tool_name: "TodoWrite", tool_input: {}, cwd: WT }, "t4")).hookSpecificOutput?.permissionDecision, "deny");
});

test("launch.mjs: --workdir-from takes only `order`", (t) => {
  if (!fs.existsSync(path.join(LAUNCHER, "node_modules/@anthropic-ai/claude-agent-sdk"))) return t.skip("launcher/node_modules not installed");
  const live = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k10-launch-"));
  const r = spawnSync("node", [path.join(LAUNCHER, "launch.mjs"), `--live=${live}`, "--workdir-from=kernel"], { encoding: "utf8", timeout: 20_000 });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--workdir-from takes: order/);
});
