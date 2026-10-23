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
  assert.match(src, /query\(\{ prompt: text, options: queryOptions\(plan, guard, /); // K26: the brief, or the cold one after a failed resume
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

test("K10 fix review: deploy.mjs and vercel paths, package-manager value options, corepack, node -e/--import, more push spellings", () => {
  for (const c of ["node tools/deploy.mjs --prod", "./tools/deploy.mjs", "node /abs/tools/deploy.mjs", "node node_modules/vercel/dist/index.js deploy", "node_modules/vercel/dist/index.js deploy",
    "node_modules/.bin/vercel --prod", "npx vercel@latest deploy", "npm --prefix /repo run deploy", "npm --prefix=/repo run deploy", "npm -w x run deploy", "npm --workspace x run deploy:prod",
    "pnpm -C /r run deploy", "pnpm --filter web deploy", "yarn --cwd /r deploy", "yarn workspace web deploy", "bun --cwd /r run deploy", "cd /r && corepack pnpm run deploy", "corepack pnpm@8.15.0 deploy",
    "corepack npm --prefix /r run deploy", "node --input-type=module -e \"import('./tools/claim.mjs')\"", "node -e \"require('./tools/deploy.mjs')\"", "node --import ./tools/claim.mjs x.mjs",
    "node -r ./tools/deploy.mjs", "git subtree push --prefix dist origin gh-pages", "git -c alias.p=push p origin", "git -c 'alias.p=!git push' p", "git $'push' origin", "echo 'git push' | sh", "ssh h 'git push'"]) {
    assert.equal(G.decide("Bash", { command: c }, opts)?.rule, "bash", c);
  }
  for (const c of ["grep -rn 'git push' docs", "rg 'npm run deploy' company", "git grep 'git push'", "git log --grep='npm run deploy'", "npm run test:deploy", "node --test tests/deploy/*.test.mjs",
    "npm --prefix /repo run check", "corepack enable", "cat tools/deploy.mjs", "grep -r claim.mjs tools", "node scripts/vercel-check.mjs", "git subtree split --prefix dist", "git -c color.ui=never log"]) {
    assert.equal(G.decide("Bash", { command: c }, opts), null, c);
  }
  assert.equal(G.decide("Bash", { command: "rg --pre 'git push' x" }, opts)?.rule, "bash", "rg --pre runs a command: no reader");
});

test("K10 fix review: a protected-paths lookup that fails is a missing root, and sessionPlan refuses it; a base with no file is no root", () => {
  const co = make("k10e", spec());
  co.org.genesis(co.spec.roles.map((r) => ({ ...r })));
  co.engine.approveDef(co.engine.define("task", { stages: co.spec.flow.stages }, { by: "cos" }), { by: "founder", words: "Approve" });
  const o = co.engine.orderNew({ flow: "task", by: "cos", to: "mgr-live", budget: 100, accept: "write it" });
  o.task = "KE1"; co.engine.delegate(o.id, { by: "mgr-live", to: "toy-builder-1", budget: 100 });
  assert.ok(!WS.ensure(co, o).error);
  const D = { cwd: "/kernel", sessionMin: 20, maxTurns: 80, settingSources: [] };
  const good = WS.launchConfig(co, { role: "mgr-live", msgs: [] });
  assert.deepEqual([good.workspace, good.missing], [true, []]);
  assert.ok(!G.sessionPlan(good, {}, D).refused);
  // a bad base (as a lock, a timeout or a gc'd ref would leave it): that order's roots are missing, not silently gone
  const sha = o.workspace.baseSha ?? o.workspace.sha;
  o.workspace.baseSha = "0".repeat(40);
  const bad = WS.launchConfig(co, { role: "mgr-live", msgs: [] });
  assert.ok(bad.missing.some((x) => x.dir === o.workdir && /failed in/.test(x.error)), JSON.stringify(bad.missing));
  assert.ok(!bad.roots.some((x) => x.dir === o.workdir));
  assert.match(G.sessionPlan(bad, {}, D).refused, /protected paths unknown for .*no session starts/);
  o.workspace.baseSha = sha;
  // a base that is a commit without the file: no root, and no refusal (nothing to protect there)
  const git = (...a) => spawnSync("git", ["-C", o.workspace.repo, ...a], { encoding: "utf8", input: "" }).stdout.trim();
  const empty = git("commit-tree", git("mktree"), "-m", "empty");
  assert.match(empty, /^[0-9a-f]{40}$/);
  o.workspace.baseSha = empty;
  const none = WS.launchConfig(co, { role: "mgr-live", msgs: [] });
  assert.ok(!none.missing.some((x) => x.dir === o.workdir), JSON.stringify(none.missing));
  assert.ok(!none.roots.some((x) => x.dir === o.workdir));
  o.workspace.baseSha = sha;
  assert.match(G.sessionPlan({ workspace: true, roots: null }, {}, D).refused, /no roots list/);
});

test("M4 integrate (K10 re-review): the bypasses of 90efcfa71 are denied; their look-alikes still pass", () => {
  const ro = { ...opts, role: "demo-builder" };
  for (const c of ["npm --loglevel silent run deploy", "npm --registry http://x run deploy", "npm -C /repo run deploy", "pnpm --reporter silent run deploy", "npm --loglevel silent exec vercel",
    "node --title x tools/deploy.mjs", "node --disable-warning X tools/claim.mjs verify a", "node --watch-path . tools/deploy.mjs", "node --run deploy", "node --stack-size 9 tools/company.mjs publish x",
    "P=push git --config-env alias.q=P q", "git --config-env=alias.q=P q", "GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=alias.q GIT_CONFIG_VALUE_0=push git q", "git config alias.p push", "git config core.hooksPath .h",
    "git config --add core.fsmonitor 'x'", "git -c core.fsmonitor='git push' status", "git $(echo push)", "$(echo git) push", "`echo git` push", "G=git; $G push", "git $SUB origin", "npm run $(echo deploy)",
    "gh pr merge 1", "gh -R o/r pr merge 1 --squash", "gh release create v1", "gh repo sync", "gh run rerun 9", "gh $(echo workflow) run x",
    "node meta.mjs order resume O-1 --by=founder --reason=go --extra-loops=10", "node /k/meta.mjs room enter --msg=M-1 --role=fact-checker", "META_ROLE=founder node meta.mjs x", "env -u META_ROLE node meta.mjs x", "env -i node meta.mjs order resume O-1 --by=founder"]) {
    assert.equal(G.decide("Bash", { command: c }, ro)?.rule, "bash", c);
  }
  for (const c of ["npm --prefix /repo run check", "npm --loglevel silent run test:deploy", "pnpm add deploy-tool", "pnpm --filter web build", "node --title x tools/company.mjs status", "node --test tests/deploy/*.test.mjs",
    "git config user.email t@e", "git config --get core.hooksPath", "git -c color.ui=never log", "cd \"$(git rev-parse --show-toplevel)\" && git status", "echo $HOME", "gh pr view 1", "gh pr list", "gh release list",
    "node meta.mjs room leave --run=R-1 --evidence=x", "node meta.mjs order park O-1 --by=demo-builder --reason=x", "env FOO=1 node x.mjs"]) {
    assert.equal(G.decide("Bash", { command: c }, ro), null, c);
  }
  // with no role known (an operator's guard), meta.mjs --by is not judged here
  assert.equal(G.decide("Bash", { command: "node meta.mjs order resume O-1 --by=founder --reason=x" }, opts), null);
});

test("M4 integrate (K7/K10 re-review): no write tool touches a .git folder (config, hooks, a worktree's gitdir), whatever the roots", () => {
  for (const p of [path.join(WT, ".git", "config"), path.join(LIVE, "repo", ".git", "hooks", "post-commit"), "/elsewhere/.git/info/attributes"])
    for (const t of ["Write", "Edit"]) assert.equal(G.decide(t, { file_path: p }, { ...opts, roots: [] })?.rule, "git-dir", p);
  assert.equal(G.decide("Write", { file_path: path.join(WT, ".gitignore") }, opts), null);
  assert.equal(G.decide("Write", { file_path: path.join(WT, "docs", "git.md") }, opts), null);
});

test("M4 integrate (K8+K9 re-review): meta.mjs refuses a --by or --role that is not the agent session's (META_ROLE, the outermost on the process's ancestry)", async () => {
  const { sessionRole } = await import("../state.mjs");
  // a fake /proc: 30 (the agent's CLI, META_ROLE from the launcher) > 20 (a shell) > 10 (the caller, META_ROLE=founder of its own)
  const P = path.join(LIVE, "proc");
  const proc = (pid, ppid, env) => { fs.mkdirSync(path.join(P, String(pid)), { recursive: true }); fs.writeFileSync(path.join(P, String(pid), "status"), `Name:\tx\nPPid:\t${ppid}\n`); fs.writeFileSync(path.join(P, String(pid), "environ"), env.join("\0") + "\0"); };
  proc(10, 20, ["META_ROLE=founder", "A=1"]); proc(20, 30, ["B=2"]); proc(30, 1, ["META_ROLE=demo-builder"]);
  assert.equal(sessionRole({ env: { META_ROLE: "founder" }, proc: P, pid: 10 }), "demo-builder");
  assert.equal(sessionRole({ env: {}, proc: P, pid: 20 }), "demo-builder", "env -i does not clear the ancestry");
  assert.equal(sessionRole({ env: {}, proc: path.join(LIVE, "noproc"), pid: 20 }), null, "a person or code: no session role");
  assert.equal(sessionRole({ env: { META_ROLE: "" }, proc: path.join(LIVE, "noproc"), pid: 20 }), "?", "set but empty is an agent of unknown role");

  const run = (env, ...args) => spawnSync("node", [META, ...args], { env: { ...process.env, META_LIVE_DIR: LIVE, ...env }, encoding: "utf8" });
  const r = run({ META_ROLE: "demo-builder" }, "order", "resume", "O-1", "--by=founder", "--reason=go", "--extra-loops=10");
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stderr, /--by=founder is not this agent session's role \(demo-builder\)/);
  assert.match(run({ META_ROLE: "demo-builder" }, "room", "enter", "--msg=M-1", "--role=fact-checker").stderr, /--role=fact-checker is not this agent session's role/);
  // the real ancestry: a shell started with the launcher's META_ROLE, a child that sets its own
  const sh2 = spawnSync("sh", ["-c", `META_ROLE=founder "${process.execPath}" "${META}" order resume O-1 --by=founder --reason=go`], { env: { ...process.env, META_LIVE_DIR: LIVE, META_ROLE: "demo-builder" }, encoding: "utf8" });
  assert.equal(sh2.status, 1);
  assert.match(sh2.stderr, /not this agent session's role \(demo-builder\)/);
  const sh3 = spawnSync("sh", ["-c", `env -i "${process.execPath}" "${META}" order resume O-1 --by=founder --reason=go`], { env: { ...process.env, META_LIVE_DIR: LIVE, META_ROLE: "demo-builder" }, encoding: "utf8" });
  assert.match(sh3.stderr, /not this agent session's role \(demo-builder\)/, "a cleared environment still has the shell's ancestry");
  // outside any agent session the CLI is as before (no state here: a state error, not a refusal of --by)
  assert.doesNotMatch(run({}, "order", "resume", "O-1", "--by=founder", "--reason=go").stderr, /agent session/);
  // the launcher names each session
  assert.match(fs.readFileSync(path.join(LAUNCHER, "launch.mjs"), "utf8"), /META_LAUNCH: id, META_ROLE: ev\.role/);
  assert.match(fs.readFileSync(path.join(LAUNCHER, "launch.mjs"), "utf8"), /makeGuard\(\{[^}]*role: ev\.role/);
});

test("M6 prep (M4 P4.6): a heredoc read by a data command is data, its redirect target is judged as a write; heredocs fed to a program, and unreadable lines, are still refused", () => {
  const TSX = "export default function Demo() {\n  const w = `${n}px`;\n  return <div className={`a ${b}`}>{$(x)}</div>;\n}\n${foo}\ngit push origin main\nnpm run deploy";
  const ro = { ...opts, role: "demo-builder" };
  // the M4 false positive and its kin: allowed (the body names a push and a deploy: it is text, never run)
  for (const c of [`mkdir -p src/demos/math/x company/reviews/x && cat > src/demos/math/x/Demo.tsx <<'EOF'\n${TSX}\nEOF`,
    `cat <<'EOF' > company/reviews/x/build.md\n## Pre-flight v1\n$(git push)\nEOF\necho written`, `cat > a.md <<"EOF"\n\`git push\`\nEOF`, `cat > a.md <<\\EOF\n$(git push)\nEOF`,
    `tee src/x.ts <<'EOF' >/dev/null\n${TSX}\nEOF`, `cat <<-'EOF' > notes.md\n\tgit push\n\tEOF`, `cat > a.tsx <<EOF\nconst x = \${y};\nEOF`, `cat > a.md <<'A' && cat > b.md <<'B'\ngit push\nA\nnpm run deploy\nB\ngit status`]) {
    assert.equal(G.decide("Bash", { command: c }, ro), null, c);
  }
  const H = G.shellCommands(`mkdir -p a b && cat > a/x.tsx <<'EOF'\n${TSX}\nEOF`);
  assert.deepEqual([H.cmds, H.writes, H.docs.map((d) => [d.head, d.data, d.quoted, d.closed, d.targets])], [[["mkdir", "-p", "a", "b"], ["cat", "a/x.tsx"]], ["a/x.tsx"], [["cat", true, true, true, ["a/x.tsx"]]]]);
  // a heredoc (or a plain redirect, or tee) into a protected path: still denied, now as the write it is
  for (const c of [`cat > tools/company.mjs <<'EOF'\nx\nEOF`, `mkdir -p tests/qa && cat > tests/qa/new.spec.ts <<'EOF'\n${TSX}\nEOF`, `cat <<'EOF' > ${path.join(WT, "src/kit/Lesson.tsx")}\nx\nEOF`,
    `cd src/kit && cat > Lesson.tsx <<'EOF'\nx\nEOF`, `tee -a company/constitution/protected-paths.txt <<'EOF'\nx\nEOF`, `echo x > tests/qa/a.ts`, `echo x >> ${WT}/tools/company.mjs`, `printf x >| src/kit/Lesson.tsx`,
    `cd /tmp && cat > ${WT}/tests/qa/z.md <<'EOF'\nz\nEOF`, `bash -c 'cat > tools/company.mjs <<EOF\nx\nEOF'`, `echo x &> tests/qa/log.txt`]) {
    assert.equal(G.decide("Bash", { command: c }, ro)?.rule, "protected-path", c);
  }
  assert.match(G.decide("Bash", { command: `cat > tools/company.mjs <<'EOF'\nx\nEOF` }, ro).why, /protected path \(tools\/company\.mjs.*a shell write.*Write tool/);
  assert.equal(G.decide("Bash", { command: `cat > .git/hooks/post-commit <<'EOF'\ngit push\nEOF` }, ro)?.rule, "git-dir");
  // a heredoc fed to a shell, an interpreter or a pipe keeps its body as commands; an unquoted body's $(…) and `…` run;
  // a file the line writes and then runs is code
  for (const c of ["bash <<'EOF'\ngit push\nEOF", "cat <<'EOF' | sh\ngit push\nEOF", "sh -s <<EOF\nnpm run deploy\nEOF", "cat > a.md <<EOF\n$(git push)\nEOF", "cat > a.md <<EOF\n`npm run deploy`\nEOF",
    "cat > x.sh <<'EOF'\ngit push\nEOF\nbash x.sh", "cat > x.sh <<'EOF' && chmod +x x.sh && ./x.sh\ngit push\nEOF", "cat > s.sh <<'EOF'; . ./s.sh\ngit push\nEOF", "git commit -F - <<'EOF'\n[deploy] x\nEOF",
    "cat <<'EOF' > >(sh)\ngit push\nEOF", "node <<'EOF'\nrequire('child_process').execSync('git push')\nEOF"]) {
    assert.equal(G.decide("Bash", { command: c }, ro)?.rule, "bash", c);
  }
  // what the guard truly cannot read is still refused, and the denial says what to do instead
  for (const c of ["$(echo git) push", "cat > a.tsx <<EOF\n`${x}px`\nEOF", "G=$(echo git); $G push"]) {
    const d = G.decide("Bash", { command: c }, ro);
    assert.equal(d?.rule, "bash", c); assert.match(d.why, /cannot read this line.*use the Write tool/, c);
  }
  assert.doesNotMatch(G.decide("Bash", { command: "git push" }, ro).why, /Write tool/, "a plain denial keeps its own reason");
  // B8 S1 fix: a variable the line sets to a literal is judged with its value (the denial names what it is)
  assert.equal(G.bashDenial("G=git; $G push"), "git push");
  // redirects that write nothing protected pass (devices, fd duplication, an opaque target is left to K7's commit check)
  for (const c of ["npm run check 2>&1 | tail -5", "node x.mjs > /dev/null 2>&1", "echo x >&2", "echo x > \"$OUT\"", "ls > src/demos/list.txt"]) assert.equal(G.decide("Bash", { command: c }, ro), null, c);
});

test("M6 prep review: a `#` comment opens no heredoc and hides no line (bash runs the lines after `# <<EOF`); the spellings that dropped META_ROLE or named a script by a variable; code-only adapters", () => {
  const b = { role: "demo-builder" };
  // the regression: `cat > a.txt # <<EOF` is a comment, so the next line is a command, as bash runs it
  assert.equal(G.bashDenial("cat > a.txt # <<EOF\ngit push\nEOF", 0, b), "git push");
  assert.deepEqual(G.heredocs("cat > a.txt # <<EOF\ngit push\nEOF").docs, [], "no heredoc in a comment");
  assert.ok(G.decide("Bash", { command: "cat a # <<EOF\ncat x > src/kit/Lesson.tsx\nEOF" }, { roots: [{ dir: "/w", globs: ["src/kit/Lesson.tsx"] }], cwd: "/w" }), "the redirect on the next line is judged");
  assert.equal(spawnSync("bash", ["-c", "true # <<EOF\necho RAN-AS-COMMAND\nEOF"], { encoding: "utf8" }).stdout, "RAN-AS-COMMAND\n", "bash: the comment opens nothing");
  assert.equal(G.bashDenial("true # it's\ngit push\n", 0, b), "git push", "a quote inside a comment opens no quote");
  // not comments: a # inside a word, ${#x}, $#, a quoted #, and a real heredoc's own # lines stay data
  for (const c of ["echo a#b", "echo ${#x} $#", "echo '#' \"#\"", "cat > x.md <<'EOF'\n# heading\ngit push is documented here\nEOF"]) assert.equal(G.bashDenial(c, 0, b), null, c);
  assert.equal(G.bashDenial("echo a\\ #; git push", 0, b), "git push", "an escaped space keeps # inside its word");
  // the M6 prep refusal's bypasses: unset by prefix, setsid, a script named by a variable, exec -c
  const t = { role: "toy-builder-1" };
  assert.match(G.bashDenial("x=supervisor; unset ${!META_R*}; setsid -f node /k/$x.mjs launched --role=toy-builder-1 --msgs=M-7", 0, t), /indirect expansion/);
  assert.equal(G.bashDenial("x=$(echo supervisor); node /k/$x.mjs launched", 0, t), "node <a script the guard cannot read>");
  assert.match(G.bashDenial("x=supervisor; node /k/$x.mjs launched", 0, t), /supervisor\.mjs launched \(the orchestrator's report\)/, "B8 S1 fix: a literal variable is read");
  assert.equal(G.bashDenial("(exec -c setsid -f node /k/supervisor.mjs launched)", 0, t), "exec -c");
  assert.match(G.bashDenial("setsid -f node /k/supervisor.mjs launched --role=toy-builder-1", 0, t), /supervisor\.mjs launched \(the orchestrator's report\)/);
  assert.equal(G.bashDenial("setsid -f git push", 0, t), "git push");
  assert.equal(G.bashDenial("for v in $(compgen -v); do unset $v; done", 0, t), "unset <the session's variables>");
  assert.equal(G.bashDenial("unset META_LAUNCH", 0, t), "unset <the session's variables>");
  assert.equal(G.bashDenial("unset FOO; node -e 'console.log(1)' $HOME", 0, t), null, "unset of another name, node -e with a variable argument");
  // integrate.mjs and inbox-export.mjs are code stages
  assert.equal(G.bashDenial("node /srv/company/adapters/inbox-export.mjs --write=/srv/company/ops/x.json --commit", 0, b), "inbox-export.mjs (a code stage)");
  assert.equal(G.bashDenial("cd adapters && node integrate.mjs --into=meta/m6 --from=meta/m6-a", 0, b), "integrate.mjs (a code stage)");
  assert.equal(G.bashDenial("node --test tests/integrate.test.mjs", 0, b), null);
});
