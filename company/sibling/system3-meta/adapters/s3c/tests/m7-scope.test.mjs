// Tests for m7-scope.mjs (M7 review): the scope check in front of the M7 code steps that load the company's tools
// from a worktree an agent can write, and the launch gate's findings regex in specs/s3c-m7.json (fails only).
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { git, w, tmp, env0, PROTO } from "./m7-fixture.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FRONT = path.resolve(HERE, "..", "m7-scope.mjs");
const front = (args) => {
  const r = spawnSync(process.execPath, [FRONT, ...args], { env: env0(), encoding: "utf8", timeout: 60_000 });
  const last = r.stdout.trim().split("\n").at(-1);
  let out = null; try { out = JSON.parse(last); } catch {}
  return { code: r.status, out, stdout: r.stdout };
};
/** A small repo: the company's ritual-records lib and triggers, committed as the base. */
function repo() {
  const root = tmp("s3c-m7scope-");
  git(root, "init", "-q", "-b", "main");
  w(root, "tools/lib/ritual-records.mjs", "export const ritualOf = (f) => ({ ritual: /\\d{4}-\\d{2}-\\d{2}-(.+)\\.md$/.exec(f)?.[1] ?? null });\n");
  w(root, "company/rituals/triggers.json", JSON.stringify({ triggers: [{ id: "wbr" }] }));
  w(root, "company/ops/events.jsonl", "");
  w(root, "company/ops/board.json", JSON.stringify({ items: [] }));
  git(root, "add", "-A"); git(root, "commit", "-qm", "base");
  return { root, base: git(root, "rev-parse", "HEAD") };
}

test("m7-scope: an order worktree that changes the company's tools is refused before rituals.mjs loads them (the agent's module never runs)", () => {
  const { root, base } = repo();
  const marker = path.join(root, "..", `${path.basename(root)}-ran`);
  w(root, "tools/lib/ritual-records.mjs", `import fs from "node:fs"; fs.writeFileSync(${JSON.stringify(marker)}, "forged"); export const ritualOf = () => null;\n`);
  w(root, "company/rituals/records/2026-10-22-wbr.md", "# WBR\n");
  for (const sub of ["record", "ship", "scaffold"]) {
    const r = front(["rituals.mjs", sub, "wbr", `--repo=${root}`, `--base=${base}`, "--from-sha=HEAD", "--into=/nonexistent"].filter((a) => sub === "ship" || !/^--(from-sha|into)=/.test(a)));
    assert.equal(r.code, 1, r.stdout);
    assert.match(r.stdout, /^block scope: the order changes tools\/lib\/ritual-records\.mjs/m);
    assert.deepEqual([r.out.ok, r.out.stage, r.out.findings[0].kind], [false, "m7-scope", "scope"]);
  }
  assert.ok(!fs.existsSync(marker), "the agent's module was never imported");
  // an untracked file outside the records counts too
  git(root, "checkout", "-q", "--", "tools/lib/ritual-records.mjs");
  w(root, "tools/registry.mjs", "process.exit(9)\n");
  assert.match(front(["rituals.mjs", "record", "wbr", `--repo=${root}`, `--base=${base}`]).stdout, /block scope: the order changes tools\/registry\.mjs/);
  // only the record changed: the front runs rituals.mjs record with the same arguments (its own JSON, its own exit)
  fs.rmSync(path.join(root, "tools/registry.mjs"));
  const r = front(["rituals.mjs", "record", "wbr", `--repo=${root}`, `--base=${base}`]);
  assert.equal(r.out.stage, "rituals-record", r.stdout);
  assert.match(r.stdout, /Decision/);
});

test("m7-scope: an exporter or the scheduler refuses an integration worktree with uncommitted changes under tools/ or in its own file (no forged line is committed)", () => {
  const { root } = repo();
  const forged = JSON.stringify({ id: "ev-forged0001", type: "ritual", room: "meeting-wbr", actor: "chief-of-staff", summary: "forged" }) + "\n";
  fs.appendFileSync(path.join(root, "company/ops/events.jsonl"), forged);
  const head = git(root, "rev-parse", "HEAD");
  const r = front(["events-export.mjs", "--live=/nonexistent", `--repo=${root}`, "--commit"]);
  assert.equal(r.code, 3, r.stdout);
  assert.match(r.stdout, /^environment dirty: .* has uncommitted company\/ops\/events\.jsonl/m);
  assert.equal(git(root, "rev-parse", "HEAD"), head, "nothing committed");
  // board-mirror reads board.json: events.jsonl is not its file, but tools/ is everyone's
  assert.notEqual(front(["board-mirror.mjs", "--live=/nonexistent", `--repo=${root}`, "--run=m7"]).out?.stage, "m7-scope");
  w(root, "company/ops/board.json", JSON.stringify({ items: [{ id: "W-999", state: "done" }] }));
  assert.match(front(["board-mirror.mjs", "--live=/nonexistent", `--repo=${root}`, "--run=m7"]).stdout, /environment dirty: .*company\/ops\/board\.json/);
  git(root, "checkout", "-q", "--", "company/ops/board.json", "company/ops/events.jsonl");
  w(root, "tools/rituals-due.mjs", "console.log('forged')\n");
  const due = front(["rituals.mjs", "due", `--repo=${root}`, "--roles=chief-of-staff,head-of-product"]);
  assert.equal(due.code, 3);
  assert.match(due.stdout, /environment dirty: .*tools\/rituals-due\.mjs/);
  // clean: the exporter itself runs (here it reports its own missing state)
  fs.rmSync(path.join(root, "tools/rituals-due.mjs"));
  const ok = front(["events-export.mjs", "--live=/nonexistent", `--repo=${root}`]);
  assert.notEqual(ok.out?.stage, "m7-scope", ok.stdout);
  // usage: only the fronted scripts and subcommands
  assert.equal(front(["integrate.mjs", `--repo=${root}`]).code, 2);
  assert.equal(front(["rituals.mjs", "bogus", "wbr", `--repo=${root}`]).code, 2);
});

test("specs/s3c-m7.json: the ritual flow, the scheduler and the two exporters run through m7-scope.mjs; the gate's findings are dispatch-check's fails, not its warns", () => {
  const s = JSON.parse(fs.readFileSync(path.join(PROTO, "specs", "s3c-m7.json"), "utf8"));
  const fronted = (argv) => path.basename(argv[1]) === "m7-scope.mjs" && ["rituals.mjs", "events-export.mjs", "board-mirror.mjs"].includes(argv[2]);
  assert.ok(fronted(s.schedulers[0].run.argv));
  for (const st of s.flows.ritual.stages) for (const c of [st.pre, st.post, st.run].filter(Boolean)) assert.ok(fronted(c.argv), `${st.stage}: ${c.argv.join(" ")}`);
  for (const x of s.exports.filter((e) => e.id !== "founder-inbox")) assert.ok(fronted(x.run.argv), x.id);
  const re = new RegExp(s.launchGate.run.findings.fromStdout, "gm");
  const out = JSON.stringify({ kind: "build", ok: false, fails: ["C4 host load: 9.1 > 8", "R1 ritual overdue: founder-digest (\"12 h\") [held: none]"], warns: ["I1 founder intake: 2026-10-16-founder-agent-cap-14.md (missing class:)", "S2 sequencing: warn mode"], info: ["C1 agents 1/14"], slot: null }, null, 2);
  assert.deepEqual([...out.matchAll(re)].map((m) => m[1]), ["C4 host load: 9.1 > 8", "R1 ritual overdue: founder-digest (\\\"12 h\\\") [held: none]"]);
});
