// Tests for adapters/s3c/inbox-export.mjs (plan 2026-10-21-m4-m7-plan.md §M5 K14, exit criterion 2). Each case builds
// a real Meta state with the prototype's own CLI (meta.mjs, a temp META_LIVE_DIR) and exports it against a temp base
// inbox shaped like company/ops/founder-inbox.json. The main checkout's inbox is only read (the refusal case).
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "inbox-export.mjs");
const META = path.join(HERE, "..", "..", "..", "prototype", "meta.mjs");
const MAIN_INBOX = "/home/user/system-3-company/company/ops/founder-inbox.json";

const clean = (extra = {}) => { const e = { ...process.env, ...extra }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE; return e; };
function meta(live, ...args) {
  const r = spawnSync(process.execPath, [META, ...args], { env: clean({ META_LIVE_DIR: live }), encoding: "utf8" });
  assert.equal(r.status, 0, `meta ${args.join(" ")}: ${r.stderr}`);
  return JSON.parse(r.stdout);
}
function run(args, extra = {}) {
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { env: clean(extra), encoding: "utf8", timeout: 30_000 });
  return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)), stdout: r.stdout, stderr: r.stderr };
}
const tmp = (p) => fs.mkdtempSync(path.join(os.tmpdir(), p));
const BASE = { note: "Everything waiting on the founder.", items: [
  { id: "F-01", title: "An old decision", category: "decision", priority: 1, status: "decided", links: ["company/decisions/x.md"], decision: "yes" },
  { id: "F-07", title: "An open approval", category: "approval", priority: 2, status: "open", options: "Ratify or reject", recommendation: "Ratify", links: [] },
] };

/** A toy company with three founder-facing items: a deploy ask with options and a recommendation, an org-change
 *  approval, and an order over the chief of staff's limit (a founder budget approval); plus one ask that is not the
 *  founder's (to the lane manager), which is left out. */
function company() {
  const live = tmp("inbox-live-");
  meta(live, "init", "--spec=toy");
  meta(live, "ask", "raise", "--by=cos", "--kind=deploy", "--title=Deploy the M5 sandbox build", "--why=the founder approves every deploy", "--due=2026-10-25", '--options=["A: deploy now","B: after M6"]', "--recommend=B: after M6");
  meta(live, "org", "propose", "--by=cos", "--op=add", `--role=${JSON.stringify({ id: "toy-builder-3", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2 })}`, "--reason=a third builder");
  meta(live, "order", "new", "--by=cos", "--to=mgr-live", "--title=Big lesson", "--task=BIG", "--accept=x", "--budget=600000");
  meta(live, "ask", "raise", "--by=toy-builder-1", "--kind=decision", "--title=Which slug?", "--why=two fit", "--due=2026-10-25");
  return live;
}

test("asks to the founder and founder approvals map to the inbox format; ids continue after the base; other items untouched", () => {
  const live = company();
  const dir = tmp("inbox-out-"), basePath = path.join(dir, "base.json");
  fs.writeFileSync(basePath, JSON.stringify(BASE, null, 2));
  const r = run([`--live=${live}`, `--base=${basePath}`]);
  assert.equal(r.exit, 0, r.stdout);
  const doc = r.json.inbox;
  assert.deepEqual(Object.keys(doc), ["note", "items"]);
  assert.deepEqual(doc.items.slice(0, 2), BASE.items, "the base's own items are unchanged");
  const mine = doc.items.slice(2);
  assert.deepEqual(mine.map((x) => x.id), ["F-08", "F-09", "F-10"]);
  assert.deepEqual(mine.map((x) => [x.category, x.status, x.meta.kind]), [["deploy", "open", "ask:deploy"], ["approval", "open", "approval:org-change"], ["approval", "open", "approval:budget"]]);
  const [ask, org, bud] = mine;
  assert.equal(ask.options, "A: deploy now | B: after M6", "one string, as hq.ts FounderItem types it");
  assert.deepEqual(ask.meta.options, ["A: deploy now", "B: after M6"]);
  assert.equal(ask.recommendation, "B: after M6");
  assert.match(ask.meta.answer_with, /ask answer --by=founder --id=ISS-1/);
  assert.match(org.title, /Org change ORG-1: add toy-builder-3 \(a third builder\): approve\?/);
  assert.match(bud.title, /O-1 \(Big lesson\) asks 600000 tokens/);
  assert.equal(bud.blocks, "O-1 (Big lesson) [BIG], at budget");
  assert.equal(bud.options, "approve | deny");
  for (const x of mine) {
    for (const k of ["id", "title", "category", "priority", "status", "links"]) assert.ok(k in x, `${x.id} has ${k}`);
    assert.ok(Number.isInteger(x.priority) && x.priority >= 1 && x.priority <= 5);
    assert.deepEqual(x.links, []);
  }
  assert.equal(JSON.stringify(doc).includes("Which slug?"), false, "an ask to the lane manager is not the founder's");
  assert.equal(r.json.founder, 3);
});

test("--write is atomic, a re-export keeps ids and records decisions; a missing option is a revise (exit 1), still exported", () => {
  const live = company();
  const dir = tmp("inbox-w-"), out = path.join(dir, "ops", "founder-inbox.json");
  const base = path.join(dir, "base.json");
  fs.writeFileSync(base, JSON.stringify(BASE));
  let r = run([`--live=${live}`, `--base=${base}`, `--write=${out}`]);
  assert.equal(r.exit, 0, r.stdout);
  assert.equal(r.json.written, out);
  assert.equal(r.json.inbox, undefined);
  assert.deepEqual(fs.readdirSync(path.dirname(out)), ["founder-inbox.json"], "no temp file left");
  // the founder answers the deploy ask and approves the org change; the founder gets an ask with no options
  meta(live, "ask", "answer", "--by=founder", "--id=ISS-1", "--decision=no", "--text=after M6");
  meta(live, "approval", "decide", "--ids=A-1", "--by=founder", "--decision=approve", "--words=yes, add the builder", "--channel=chat");
  meta(live, "ask", "raise", "--by=cos", "--kind=org-change", "--title=Retire the toy checker?", "--why=unused", "--due=2026-10-26");
  r = run([`--live=${live}`, `--write=${out}`]); // the base is now the file itself
  assert.equal(r.exit, 1, r.stdout);
  assert.match(r.json.findings.find((f) => f.severity === "block").message, /ISS-3 .* no options/);
  const doc = JSON.parse(fs.readFileSync(out, "utf8"));
  assert.equal(doc.items.length, 6, "still written");
  const by = Object.fromEntries(doc.items.map((x) => [x.meta?.ref ?? x.id, x]));
  assert.deepEqual([by["ISS-1"].id, by["ISS-1"].status, by["ISS-1"].decision], ["F-08", "decided", "no: after M6"]);
  assert.match(by["ISS-1"].decided, /^\d{4}-\d{2}-\d{2}$/);
  assert.deepEqual([by["A-1"].id, by["A-1"].status, by["A-1"].decision], ["F-09", "decided", 'approved: "yes, add the builder"']);
  assert.deepEqual([by["ISS-3"].id, by["ISS-3"].category], ["F-11", "approval"]);
  assert.equal(r.json.exported.filter((x) => x.updated).length, 3);
});

test("the main checkout's founder-inbox.json is refused without --allow-main (exit 2, nothing written); a bad state or base is exit 3", () => {
  const live = company();
  const before = fs.readFileSync(MAIN_INBOX, "utf8");
  const r = run([`--live=${live}`, `--write=${MAIN_INBOX}`]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /single writer/);
  assert.equal(fs.readFileSync(MAIN_INBOX, "utf8"), before);
  // --allow-main, shown on a stand-in primary checkout (a .git directory), never the real one
  const fake = tmp("inbox-main-");
  fs.mkdirSync(path.join(fake, "company/ops"), { recursive: true });
  fs.mkdirSync(path.join(fake, ".git"));
  const fi = path.join(fake, "company/ops/founder-inbox.json");
  fs.writeFileSync(fi, JSON.stringify(BASE));
  assert.equal(run([`--live=${live}`, `--write=${fi}`]).exit, 2);
  // M5 review: no environment override lifts the refusal (S3C_MAIN_REPO pointed elsewhere wrote it)
  assert.equal(run([`--live=${live}`, `--write=${fi}`], { S3C_MAIN_REPO: "/nonexistent" }).exit, 2);
  assert.equal(JSON.parse(fs.readFileSync(fi, "utf8")).items.length, 2, "nothing written");
  assert.equal(run([`--live=${live}`, `--write=${fi}`, "--allow-main"]).exit, 0);
  assert.equal(JSON.parse(fs.readFileSync(fi, "utf8")).items.length, 5);
  // the default base is the repo's inbox, read only: ids continue after its highest F number
  const d = run([`--live=${live}`, `--repo=${fake}`]);
  assert.equal(d.json.base, fi);
  assert.equal(run([`--live=${live}`, "--base=none"]).json.inbox.items[0].id, "F-01");
  assert.equal(run([`--live=${tmp("inbox-none-")}`]).exit, 3);
  const bad = path.join(fake, "bad.json"); fs.writeFileSync(bad, "{");
  assert.equal(run([`--live=${live}`, `--base=${bad}`]).exit, 3);
  assert.equal(run(["--nope"]).exit, 2);
  assert.equal(run([], { META_LIVE_DIR: "" }).exit, 2);
});

test("a park ask to the founder gets resume/cancel options; a superseded item never exported is left out", () => {
  const live = tmp("inbox-park-");
  meta(live, "init", "--spec=toy");
  const o = meta(live, "order", "new", "--by=founder", "--to=mgr-live", "--title=P", "--task=P", "--accept=x").order;
  meta(live, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1");
  meta(live, "order", "park", o, "--by=founder", "--reason=hold");
  // a park by hand raises no ask; a loop-cap or routed park does (asks.raiseParkAsk). Stand in for one with the state.
  const st = JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
  st.data.tracker = { items: { __map: [["ISS-9", { id: "ISS-9", kind: "ask", title: `Parked ${o}: resume or cancel?`, body: "why", state: "todo", assignee: "founder", labels: ["ask:decision", "escalated", "parked"], priority: 2, comments: [], ask: { kind: "decision", order: o, routedTo: "founder" } }]] }, projects: { __map: [] }, cycles: { __map: [] }, n: 9, nP: 0, nC: 0 };
  fs.writeFileSync(path.join(live, "state.json"), JSON.stringify(st));
  const r = run([`--live=${live}`, "--base=none"]);
  assert.equal(r.exit, 0, r.stdout);
  const [x] = r.json.inbox.items;
  assert.equal(x.options, "resume: back to build | cancel: stop it for good");
  assert.match(x.meta.answer_with, new RegExp(`order resume ${o} --by=founder`));
  assert.equal(x.blocks, `${o} (P) [P], parked at build`);
  // a withdrawn approval (its order cancelled) that was never exported is not exported now
  const c = company();
  meta(c, "order", "cancel", "O-1", "--by=cos", "--reason=too big");
  assert.deepEqual(run([`--live=${c}`, "--base=none"]).json.inbox.items.map((y) => y.meta.kind), ["ask:deploy", "approval:org-change"]);
});

test("M5 review: a linked worktree's inbox (the sandbox branch: .git is a file) is written; a primary checkout's is refused", () => {
  const live = company();
  const wt = tmp("inbox-wt-");
  fs.mkdirSync(path.join(wt, "company/ops"), { recursive: true });
  fs.writeFileSync(path.join(wt, ".git"), "gitdir: /somewhere/.git/worktrees/x\n");
  const fi = path.join(wt, "company/ops/founder-inbox.json");
  fs.writeFileSync(fi, JSON.stringify(BASE));
  assert.equal(run([`--live=${live}`, `--write=${fi}`]).exit, 0);
  assert.equal(JSON.parse(fs.readFileSync(fi, "utf8")).items.length, 5);
});

test("M5 review: a re-export keeps the chief of staff's recorded decision, links and own fields", () => {
  const live = company();
  const out = path.join(tmp("inbox-cos-"), "founder-inbox.json");
  fs.writeFileSync(out, JSON.stringify({ note: "n", items: [] }));
  assert.equal(run([`--live=${live}`, `--write=${out}`]).exit, 0);
  const doc = JSON.parse(fs.readFileSync(out, "utf8"));
  const f = doc.items.find((x) => x.meta.ref === "ISS-1");
  Object.assign(f, { status: "decided", decision: "no: founder said no in chat", decided: "2026-10-22", links: ["company/decisions/x.md"], board: "W-12" });
  fs.writeFileSync(out, JSON.stringify(doc));
  const r = run([`--live=${live}`, `--write=${out}`]);
  assert.equal(r.exit, 0, r.stdout);
  const g = JSON.parse(fs.readFileSync(out, "utf8")).items.find((x) => x.meta.ref === "ISS-1");
  assert.deepEqual([g.id, g.status, g.decision, g.decided, g.links, g.board], [f.id, "decided", "no: founder said no in chat", "2026-10-22", ["company/decisions/x.md"], "W-12"], "before: status open, decision and links dropped");
  assert.equal(r.json.exported.find((x) => x.ref === "ISS-1").kept, "decision");
  // an item still open in the file is updated by Meta as before (the founder answered in Meta)
  meta(live, "approval", "decide", "--ids=A-1", "--by=founder", "--decision=approve", "--words=yes, add the builder", "--channel=chat");
  run([`--live=${live}`, `--write=${out}`]);
  assert.equal(JSON.parse(fs.readFileSync(out, "utf8")).items.find((x) => x.meta.ref === "A-1").status, "decided");
});

const LEDGER_LIB = "/home/user/system-3-company/tools/lib/ledger.mjs";
/** A founder budget ask: an order over the chief of staff's limit after a builder launch charged it (asks.raiseBudgetAsk). */
function budgetAskCompany(extra = []) {
  const live = tmp("inbox-budget-");
  meta(live, "init", "--spec=toy");
  meta(live, "project", "create", "--by=cos", "--name=Knots", "--lead=mgr-live");
  const o = meta(live, "order", "new", "--by=cos", "--to=mgr-live", "--title=K", "--task=K", "--accept=x", "--budget=100000", "--project=PRJ-1", ...extra).order;
  meta(live, "order", "delegate", o, "--by=mgr-live", "--to=toy-builder-1");
  const msg = meta(live, "queue", "toy-builder-1")[0].msg;
  const e = clean({ META_LIVE_DIR: live, META_LAUNCH: "0001-toy-builder-1" });
  const p = JSON.parse(spawnSync(process.execPath, [META, "room", "enter", `--msg=${msg}`, "--role=toy-builder-1"], { env: e, encoding: "utf8" }).stdout);
  meta(live, "room", "leave", `--run=${p.run}`, "--evidence=e");
  meta(live, "launch", "finished", "--launch=0001-toy-builder-1", "--role=toy-builder-1", "--tokens=10", "--cumulative=5000000");
  const r = spawnSync(process.execPath, [path.join(path.dirname(META), "supervisor.mjs"), "tick"], { env: clean({ META_LIVE_DIR: live }), encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
  return { live, o };
}

test("M5 review: an exported budget ask meets the company's inbox contract (budget a projects.json id, or not an initiative)", async () => {
  const { inboxBudgetWarnings } = await import(LEDGER_LIB);
  const reg = { projects: [{ id: "meta-m5" }] };
  const plain = budgetAskCompany();
  const [x] = run([`--live=${plain.live}`, "--base=none"]).json.inbox.items;
  assert.equal(x.meta.kind, "ask:budget");
  assert.match(x.budget, /^not an initiative: /, "before: the Meta tracker project PRJ-1");
  assert.deepEqual(inboxBudgetWarnings(reg, [x]), []);
  const tagged = budgetAskCompany(["--ledger-project=meta-m5"]);
  const [y] = run([`--live=${tagged.live}`, "--base=none"]).json.inbox.items;
  assert.equal(y.budget, "meta-m5");
  assert.deepEqual(inboxBudgetWarnings(reg, [y]), []);
  assert.equal(inboxBudgetWarnings({ projects: [] }, [y]).length, 1, "a line the register lacks is still flagged");
});

test("M5 review: a cancelled order's budget ask, and a withdrawn approval, leave HQ's queue (status decided, withdrawn)", () => {
  const { live, o } = budgetAskCompany();
  const out = path.join(tmp("inbox-cancel-"), "fi.json");
  fs.writeFileSync(out, JSON.stringify({ note: "n", items: [] }));
  run([`--live=${live}`, `--write=${out}`]);
  meta(live, "order", "cancel", o, "--by=cos", "--reason=stop");
  run([`--live=${live}`, `--write=${out}`]);
  const [x] = JSON.parse(fs.readFileSync(out, "utf8")).items;
  assert.deepEqual([x.status, /^withdrawn: /.test(x.decision)], ["decided", true], "before: open, and a later yes topped up the cancelled order");
  // an exported founder approval whose order is then cancelled (hq.ts founderQueue hides only status decided)
  const c = company();
  const out2 = path.join(tmp("inbox-wd-"), "fi.json");
  fs.writeFileSync(out2, JSON.stringify({ note: "n", items: [] }));
  run([`--live=${c}`, `--write=${out2}`]);
  meta(c, "order", "cancel", "O-1", "--by=cos", "--reason=no");
  run([`--live=${c}`, `--write=${out2}`]);
  const items = JSON.parse(fs.readFileSync(out2, "utf8")).items;
  const bud = items.find((i) => i.meta.kind === "approval:budget");
  assert.deepEqual([bud.status, bud.decision], ["decided", "withdrawn: cancelled: no"]);
  assert.equal(items.filter((i) => i.status !== "decided").some((i) => i.meta.kind === "approval:budget"), false, "not waiting on the founder");
});
test("M6 prep: --commit commits the written inbox alone in its linked worktree (the sandbox branch), once per change, with the repo's own hooks; never with --allow-main", () => {
  const live = company();
  const g = (cwd, ...a) => { const r = spawnSync("git", ["-C", cwd, ...a], { encoding: "utf8", env: clean({ GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" }) }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };
  const repo = tmp("inbox-repo-"), wt = path.join(tmp("inbox-int-"), "m6-int");
  g(repo, "init", "-q", "-b", "main");
  fs.mkdirSync(path.join(repo, "company/ops"), { recursive: true });
  fs.writeFileSync(path.join(repo, "company/ops/founder-inbox.json"), JSON.stringify(BASE, null, 2) + "\n");
  fs.writeFileSync(path.join(repo, "other.txt"), "x\n");
  g(repo, "add", "-A"); g(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", "base");
  g(repo, "worktree", "add", "-q", "-b", "meta/m6", wt);
  fs.writeFileSync(path.join(repo, ".git", "hooks", "post-commit"), `#!/bin/sh\necho ran >> "${path.join(wt, "..", "hook-ran")}"\n`, { mode: 0o755 });
  fs.writeFileSync(path.join(wt, "other.txt"), "an unrelated change stays out of the commit\n");
  const fi = path.join(wt, "company/ops/founder-inbox.json");
  const pins = { GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "core.hooksPath", GIT_CONFIG_VALUE_0: "/dev/null" };
  const r = run([`--live=${live}`, `--write=${fi}`, "--commit"], pins);
  assert.equal(r.exit, 0, r.stdout);
  assert.match(r.json.committed, /^[0-9a-f]{40}$/);
  assert.equal(g(wt, "log", "-1", "--format=%s"), "meta: founder inbox export (chief-of-staff code step)");
  assert.deepEqual(g(wt, "show", "--name-only", "--format=", "HEAD").split("\n"), ["company/ops/founder-inbox.json"]);
  assert.equal(g(wt, "status", "--porcelain"), "M other.txt");
  assert.ok(fs.existsSync(path.join(wt, "..", "hook-ran")), "the repo's own post-commit hook ran (the kernel's pins are not inherited)");
  assert.equal(g(wt, "branch", "--show-current"), "meta/m6");
  // a re-export with nothing new: no commit
  const again = run([`--live=${live}`, `--write=${fi}`, "--commit"]);
  assert.equal(again.exit, 0); assert.equal(again.json.committed, null);
  assert.equal(run([`--live=${live}`, "--commit"]).exit, 2, "--commit needs --write");
  assert.equal(run([`--live=${live}`, `--write=${fi}`, "--commit", "--allow-main"]).exit, 2);
  // a write outside any worktree cannot be committed: a stage-error
  const loose = path.join(tmp("inbox-loose-"), "founder-inbox.json");
  assert.equal(run([`--live=${live}`, `--write=${loose}`, "--commit", "--base=none"]).exit, 3);
});
