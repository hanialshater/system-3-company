// Benchmark 9, arm S9 (bench9/PROTOCOL.md "S"): its pieces for B8's harness (bench8/setup.mjs loads this module only
// when P.sarm is S9, as it loads w7.mjs only for W7, so every B8 path runs as before). S9's orders are tasks W8, W9 and
// W10 (rounds 1-3 of B9; B8's code reads a wave's number from its id), each one round of the orderer's full judge.
//   seed:       S9's repo starts as the start's tree (B8 V at bench9's START), not empty; the fast judge goes into S9's
//               toolchain; the integration baseline starts as the start's visible pass set (a regression from the
//               first hand-in on is caught)
//   release:    spec/B9.md (the task, the same text V's and P's prompts quote), with W8 only
//   accept:     the order's accept text, with the previous order's judge lines
//   hidden:     bench9's full judge on the worktree, in the shape bench8 setup.mjs hidden() returns. K39: the order
//               always ships (one round, as V's), and the judge's score is the stage's metric line (`metric: score=…`;
//               a failing gate scores 1.0, no credit), so the playbook learns from every round's measured effect; the
//               gate's and the timings' lines go to the next order's accept text
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_B9 = fs.existsSync(path.join(HERE, "B9.md")) ? HERE : "/home/user/system-3-company/company/sibling/system3-meta/prototype/bench9";
export const B9_RUNS = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b9-runs";
export const S9_WAVES = ["W8", "W9", "W10"];
export const S9_ROUND = { W8: 1, W9: 2, W10: 3 };
const judgeDir = (b9) => path.join(b9 ?? B9_RUNS, "judge");
const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };

/** A fresh S9 run: the repo gets the start's tree (one orderer commit), the toolchain the fast judge, the integration
 *  baseline the start's visible pass set. */
export function seed(P, { b9 = null } = {}) {
  const start = path.join(b9 ?? B9_RUNS, "start");
  const arc = spawnSync("sh", ["-c", `git -c safe.directory='*' -C '${start}' archive HEAD | tar -x -C '${P.repo}'`], { encoding: "utf8" });
  if (arc.status !== 0) throw new Error(`seed: ${arc.stderr}`);
  // the module map (interface module-map, the architect's): the start's files and their owners, so the first order
  // does not start with an interface check that fails (it lists every namespace file that exists)
  fs.mkdirSync(path.join(P.repo, "docs"), { recursive: true });
  fs.writeFileSync(path.join(P.repo, "docs", "MODULES.md"), MODULES_MD);
  fs.cpSync(judgeDir(b9), path.join(P.toolchain, "judge"), { recursive: true });
  const jf = path.join(P.toolchain, "judge", "judge.json"), cfg = JSON.parse(fs.readFileSync(jf, "utf8"));
  cfg.clj = P.clj; fs.writeFileSync(jf, JSON.stringify(cfg, null, 1));
  const sv = path.join(judgeDir(b9), "start-visible.json");
  if (!fs.existsSync(sv)) throw new Error(`seed: ${sv} is missing (bench9/run.mjs setup --baseline)`);
  fs.mkdirSync(path.dirname(P.baseline), { recursive: true }); fs.copyFileSync(sv, P.baseline);
  return { start, files: fs.readdirSync(P.repo).length };
}
export const MODULES_MD = `# Module map (interface module-map, the architect's)

The start's compiler (Benchmark 8 V's, at bench9's START). Every namespace file under src/ is listed here; a new one is
added by the architect (ask: --kind=interface).

| Namespace | File | Owner | What |
|---|---|---|---|
| ccc.main | src/ccc/main.clj | architect | the driver: argv, single-file and --batch modes |
| ccc.types | src/ccc/types.clj | architect | the shared C types and their layout |
| ccc.lexer | src/ccc/lexer.clj | frontend | tokens |
| ccc.preproc | src/ccc/preproc.clj | frontend | the preprocessor |
| ccc.parser | src/ccc/parser.clj | parser | the parser, declarations, typing, lowering |
| ccc.codegen | src/ccc/codegen.clj | backend | x86-64 code generation and output |
`;
export const releaseFiles = (P, w) => (w === "W8" ? [["spec/B9.md", path.join(REPO_B9, "B9.md")]] : []);

/** The order's accept text: the task, the round, and the previous order's judge lines. */
export function waveAccept(P, w) {
  const k = S9_ROUND[w], prev = readJsonl(P.acceptLog).filter((x) => x.b9 && S9_ROUND[x.wave] === k - 1).at(-1);
  return `Benchmark 9, round ${k} of 3 (task ${w}): make the compiler compile faster without breaking anything. Read spec/B9.md in the order's worktree (how it is scored, the gate, the rules, the fast judge: \`node ${path.join(P.toolchain, "judge", "judge.mjs")} fast --dir=<workdir>\`) and spec/CONTRACT.md. The worktree is main as the last order left it. After the build, code runs the orderer's full judge once on the worktree: the hidden tests, Lua's hidden test files, the runtime and memory limits, and the two timings against the start. The order then ships with that version whatever the judge says (one round per order); the next order starts from it, with the judge's lines. A version that breaks the gate scores 1.0 (no credit), so a broken version carried into the next order costs that order its credit too until it is fixed.${prev ? `\n\nThe full judge on round ${k - 1}'s version:\n${prev.lines.join("\n")}` : ""}`;
}

/** bench9's full judge on `dir` (the caller holds the hidden lock), in bench8 hidden()'s shape. */
export function hidden(P, dir, { b9 = null } = {}) {
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  // B9 correction (2026-10-24): judge a clean export of the worktree's committed head, as V's and P's full judge judged
  // their committed trees: round 2 was judged on the live worktree and failed every test, while its commit passes
  const snap = fs.mkdtempSync(path.join(path.dirname(judgeDir(b9)), "s9-snap-"));
  const ar = spawnSync("sh", ["-c", `git -c safe.directory='*' -C '${dir}' archive HEAD | tar -x -C '${snap}'`], { encoding: "utf8" });
  if (ar.status !== 0) { fs.rmSync(snap, { recursive: true, force: true }); return { error: `bench9 judge: could not export ${dir}'s head: ${ar.stderr}`, code: 3 }; }
  dir = snap;
  try { return judgeHead(dir, env, b9); } finally { fs.rmSync(snap, { recursive: true, force: true }); }
}
function judgeHead(dir, env, b9) {
  const r = spawnSync(process.execPath, [path.join(judgeDir(b9), "judge.mjs"), "full", `--dir=${dir}`, `--reps=${Number(process.env.B9_JUDGE_REPS ?? 5)}`], { encoding: "utf8", env, timeout: 5 * 3600_000, maxBuffer: 64 << 20 });
  const out = String(r.stdout ?? "").trim().split("\n"), lines = out.filter((l) => /^B9 /.test(l));
  let j = null; for (const l of [...out].reverse()) { try { j = JSON.parse(l); break; } catch {} }
  if (!j || typeof j.score !== "number") return { error: `bench9 judge: exit ${r.status} ${String(r.stderr ?? "").slice(-400)}`, code: 3 };
  const gateLines = lines.filter((l) => /^B9 gate /.test(l) && !/: ok\b/.test(l));
  const fail = false; // K39: always ships; the gate's result is in the score (1.0 when it fails) and the lines
  // the accept log's shape (pass/total: the gate's 4 checks), and b9's own fields
  const checks = ["W1-W5", "Lua", "runtime", "RSS"], failed = checks.filter((c) => lines.some((l) => l.startsWith(`B9 gate ${c}:`) && !/: ok\b/.test(l)));
  return {
    wave: null, pass: checks.length - failed.length, fail: failed.length, total: checks.length, rate: (checks.length - failed.length) / checks.length, byWave: {},
    categories: Object.fromEntries(checks.map((c) => [`B9 gate ${c}`, { pass: failed.includes(c) ? 0 : 1, total: 1, fail: failed.includes(c) ? 1 : 0 }])),
    failing: gateLines, gate: null, w6: null, w6Lines: [], failStages: null, cheat: null, seconds: null,
    anyFail: fail, feedback: fail ? lines : [], findings: fail ? gateLines.map((l) => `failed: ${l.replace(/^B9 gate /, "B9 gate ")}`) : [],
    b9: { score: j.score, raw: j.raw, gateOk: j.gateOk, luaRatio: j.luaRatio, corpusRatio: j.corpusRatio, lines }, lines, code: 0,
    metricLine: `metric: score=${j.score} gate=${j.gateOk ? 1 : 0}${j.luaRatio != null ? ` lua=${j.luaRatio}` : ""}${j.corpusRatio != null ? ` corpus=${j.corpusRatio}` : ""}`,
  };
}
