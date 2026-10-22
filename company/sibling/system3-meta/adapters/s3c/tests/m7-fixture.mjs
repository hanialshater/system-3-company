// Shared fixtures for the M7 adapter tests (rituals, events-export, board-mirror): a temp company repo with the main
// checkout's REAL tools/ copied in (rituals-due, events, company: run, never edited), its ritual templates and
// triggers, a small board and an empty event log; an integration worktree on meta/t7 (a linked worktree, as
// /home/user/s3c-wt/m7-int is), and a Meta state built with the prototype's own CLI. Nothing outside the temp dir is
// written; the main checkout is only read.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const MAIN = process.env.S3C_MAIN_REPO ?? "/home/user/system-3-company";
export const PROTO = path.join(HERE, "..", "..", "..", "prototype");
export const env0 = (extra = {}) => { const e = { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t", ...extra }; delete e.NODE_TEST_CONTEXT; delete e.META_ROLE; delete e.META_STATE; delete e.S3_EVENTS; delete e.S3_SPOOL; for (const k of Object.keys(e)) if (k.startsWith("GIT_CONFIG")) delete e[k]; return e; };
export const git = (cwd, ...a) => execFileSync("git", ["-C", cwd, ...a], { encoding: "utf8", env: env0() }).trim();
export const w = (root, rel, s) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), s); };
export const tmp = (p) => fs.mkdtempSync(path.join(os.tmpdir(), p));

/** { root (primary checkout, branch main), int (linked worktree on meta/t7), order(name) → a worktree on
 *  meta/t7-<name> from meta/t7, sha(ref) }. */
export function companyRepo({ records = {}, events = [] } = {}) {
  const dir = tmp("s3c-m7-");
  const root = path.join(dir, "repo"), int = path.join(dir, "t7-int");
  fs.mkdirSync(root);
  git(root, "init", "-q", "-b", "main");
  fs.cpSync(path.join(MAIN, "tools"), path.join(root, "tools"), { recursive: true });
  fs.cpSync(path.join(MAIN, "company/rituals/templates"), path.join(root, "company/rituals/templates"), { recursive: true });
  fs.copyFileSync(path.join(MAIN, "company/rituals/triggers.json"), path.join(root, "company/rituals/triggers.json"));
  w(root, "content/domains.json", JSON.stringify({ domains: [] }) + "\n");
  w(root, "company/ops/board.json", JSON.stringify({ items: [{ id: "W-001", title: "an old item", owner: "chief-of-staff", state: "backlog", domain: null, created: "2026-10-01", links: [] }] }, null, 2) + "\n");
  w(root, "company/ops/events.jsonl", events.map((e) => JSON.stringify(e)).join("\n") + (events.length ? "\n" : ""));
  w(root, "company/rituals/records/.keep", "");
  for (const [f, s] of Object.entries(records)) w(root, `company/rituals/records/${f}`, s);
  git(root, "add", "-A"); git(root, "commit", "-qm", "base");
  git(root, "branch", "meta/t7");
  git(root, "worktree", "add", "-q", int, "meta/t7");
  const order = (name) => { const wt = path.join(dir, `wt-${name}`); git(root, "worktree", "add", "-q", "-b", `meta/t7-${name}`, wt, "meta/t7"); return wt; };
  return { dir, root, int, order, sha: (ref, at = root) => git(at, "rev-parse", ref) };
}

export function metaCli(live, ...args) {
  const r = spawnSync(process.execPath, [path.join(PROTO, "meta.mjs"), ...args], { env: env0({ META_LIVE_DIR: live }), encoding: "utf8" });
  assert.equal(r.status, 0, `meta ${args.join(" ")}: ${r.stderr}${r.stdout}`);
  return JSON.parse(r.stdout);
}
export function supCli(live, ...args) {
  const r = spawnSync(process.execPath, [path.join(PROTO, "supervisor.mjs"), ...args], { env: env0({ META_LIVE_DIR: live }), encoding: "utf8" });
  assert.equal(r.status, 0, `supervisor ${args.join(" ")}: ${r.stderr}`);
  return JSON.parse(r.stdout);
}
const okCmd = { argv: ["node", "-e", "process.exit(0)"], cwd: "${live}" };
/** A Meta company shaped like specs/s3c-m7.json's flows (the stage names events-export maps), with code stages that
 *  pass at once and no workspace. */
export function m7Spec() {
  return {
    name: "m7-fixture",
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "math-studio", floor: 2, kind: "lane", lane: "math" }, { id: "verification", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "build"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "chief-of-staff", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
      { id: "head-of-product", level: "vp", reportsTo: "chief-of-staff", room: "launch", floor: 3 },
      { id: "cm-math", level: "manager", reportsTo: "head-of-product", lane: "math", room: "math-studio", floor: 2 },
      { id: "demo-builder", level: "builder", reportsTo: "cm-math", lane: "math", room: "math-studio", floor: 2 },
      { id: "fact-checker", level: "checker", reportsTo: "chief-of-staff", room: "verification", floor: 3 },
      { id: "learner-evaluator", level: "evaluator", reportsTo: "chief-of-staff", room: "verification", floor: 3 },
      { id: "release-manager", level: "release", reportsTo: "head-of-product", room: "launch", floor: 3 },
    ],
    flows: {
      lesson: { stages: [
        { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/"] },
        { stage: "check", signer: { role: "fact-checker" }, independent: true, evidence: ["fact-check.md"] },
        { stage: "learner", signer: { role: "learner-evaluator" }, independent: true, evidence: ["learner.md"] },
        { stage: "launch", signer: { role: "head-of-product" }, independent: true, evidence: ["launch-review.md"] },
        { stage: "ship", signer: "release", evidence: ["published"], run: okCmd },
        { stage: "merge", signer: "code", evidence: [], run: okCmd },
      ] },
      ritual: { stages: [
        { stage: "run", signer: "chair", evidence: ["company/rituals/records/<date>-<ritual>.md"] },
        { stage: "check", signer: "attendee", evidence: ["company/rituals/records/<date>-<ritual>.md"] },
        { stage: "ship", signer: "code", evidence: [], run: okCmd },
      ] },
    },
  };
}
/** Work the open item of `role` on order `o` at `stage` (enter, leave pass). */
export function sign(live, role, order, stage, evidence) {
  const st = JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8"));
  const m = st.mailbox.msgs.__map.map(([, x]) => x).find((x) => x.kind === "work" && x.state === "open" && x.ref === order && x.body?.stage === stage);
  assert.ok(m, `no open ${stage} item for ${order}`);
  const e = metaCli(live, "room", "enter", `--msg=${m.id}`, `--role=${role}`);
  return metaCli(live, "room", "leave", `--run=${e.run}`, `--evidence=${evidence}`, ...(["check", "learner", "launch"].includes(stage) && role !== "chief-of-staff" ? ["--verdict=pass"] : []));
}
/** A Meta state with one lesson order through every stage (done: published and merged) and one ritual order done. */
export function metaState() {
  const live = tmp("s3c-m7-live-");
  const f = path.join(live, "spec.json"); fs.writeFileSync(f, JSON.stringify(m7Spec()));
  metaCli(live, "init", `--spec-file=${f}`);
  metaCli(live, "order", "new", "--by=chief-of-staff", "--to=cm-math", "--title=one metre more rope", "--task=LESSON-one-metre-more-rope", "--slug=one-metre-more-rope", "--accept=brief company/domains/briefs/math.geometry.md:10-20 · a lesson");
  metaCli(live, "order", "delegate", "O-1", "--by=cm-math", "--to=demo-builder");
  metaCli(live, "order", "new", "--flow=ritual", "--by=chief-of-staff", "--chair=chief-of-staff", "--attendee=head-of-product", "--title=Ritual wbr: due", "--task=RITUAL-wbr-1", "--slug=wbr", "--accept=hold the WBR");
  sign(live, "demo-builder", "O-1", "build", "src/demos/math/one-metre-more-rope/");
  sign(live, "fact-checker", "O-1", "check", "fact-check.md");
  sign(live, "learner-evaluator", "O-1", "learner", "learner.md");
  sign(live, "head-of-product", "O-1", "launch", "launch-review.md");
  supCli(live, "tick");
  sign(live, "chief-of-staff", "O-2", "run", "company/rituals/records/2026-10-22-wbr.md");
  sign(live, "head-of-product", "O-2", "check", "company/rituals/records/2026-10-22-wbr.md");
  supCli(live, "tick");
  return live;
}
export function run(adapter, args, { cwd = undefined, extra = {} } = {}) {
  const r = spawnSync(process.execPath, [adapter, ...args], { env: env0(extra), encoding: "utf8", timeout: 120_000, cwd });
  let json = null; try { json = JSON.parse(r.stdout.trim().split("\n").at(-1)); } catch {}
  return { exit: r.status, json, stdout: r.stdout, stderr: r.stderr };
}
