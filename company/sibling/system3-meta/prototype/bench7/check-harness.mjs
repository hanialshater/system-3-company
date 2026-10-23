// Operator self-check of the B7 harness (no agent session): the access rule on the review's repros, and the hidden
// runner's isolation (a game that tries to copy the suite or import the reference). node check-harness.mjs
import { paths, accessRules, accessDecision, deliverNoticeFiles, placeVisible, noticeState, canaries, NOTICE_POINTER, claudeTmpRoots, balanced, transferScores } from "./setup.mjs";
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const SELF_DIR = path.dirname(fileURLToPath(import.meta.url));
const HERE = paths({}).b7; // the benchmark material (b7/), wherever this file runs from (the scratchpad copy or the repo's bench7/)
const TMP = fs.mkdtempSync(path.join(path.dirname(HERE), "b7-check-"));
const P = paths({ runs: path.join(TMP, "runs"), b7: HERE });
for (const d of [P.live("H","G1")+"/kernel", P.live("H","G1")+"/work/G1", P.live("V","G1"), P.live("V","G2"), P.live("HSI","G2")+"/kernel", P.live("HSI","G1")+"/work/G1", P.op, P.store]) fs.mkdirSync(d, { recursive: true });
fs.writeFileSync(P.live("V","G1")+"/game.mjs","x");
try { fs.symlinkSync(P.b7, P.live("H","G1")+"/kernel/peek"); } catch {}
const H = accessRules(P,"H","G1"), V = accessRules(P,"V","G1"), V2 = accessRules(P,"V","G2"), S2 = accessRules(P,"HSI","G2");
const k = P.live("H","G1")+"/kernel", vd = P.live("V","G1"), hw = P.live("H","G1")+"/work/G1";
const enc = (p) => p.replace(/[^a-zA-Z0-9]/g, "-"), ctmp = claudeTmpRoots(P)[0], opProject = path.dirname(path.dirname(HERE)); // the operator session's /tmp/claude-<uid>/<project>/
const cases = [
 [H, k, "Bash", { command: "cat ../../../../b7/hidden/G1/ref/game.mjs" }, true],
 [H, k, "Bash", { command: "cd ../../../.. && cat b7/hidden/G1/ref/game.mjs" }, true],
 [H, k, "Bash", { command: "cp -r ../../../../b7/hidden ../work/G1/x" }, true],
 [H, k, "Bash", { command: "cat peek/hidden/G1/acc*" }, true],
 [H, k, "Bash", { command: "cd .. ; cd .. ; cd .. ; cd .. ; grep -rl createGame ." }, true],
 [V, vd, "Bash", { command: "cat ../../../b7/hidden/G1/ref/game.mjs" }, true],
 [V, vd, "Bash", { command: "cat ../../../b7/PROTOCOL.md" }, true],
 [V, vd, "Bash", { command: "cat ../../../b7dry/drive.mjs" }, true],
 [V2, P.live("V","G2"), "Bash", { command: "ls .. && cat ../G1/game.mjs" }, true],
 [V2, P.live("V","G2"), "Read", { file_path: P.live("V","G1")+"/game.mjs" }, true],
 [S2, P.live("HSI","G2")+"/kernel", "Read", { file_path: P.live("HSI","G1")+"/work/G1/game.mjs" }, true],
 [S2, P.live("HSI","G2")+"/kernel", "Glob", { pattern: "**/game.mjs", path: P.arm("HSI") }, true],
 [S2, P.live("HSI","G2")+"/kernel", "Read", { file_path: P.store+"/playbook.json" }, true],
 [V, vd, "Bash", { command: "cat ../../arm-H/G1/work/G1/game.mjs" }, true],
 [V, vd, "Bash", { command: "cat ../../_operator/access.jsonl" }, true],
 [H, k, "Bash", { command: "cat ../../../_operator/H-G1/observe.jsonl" }, true],
 [H, k, "Bash", { command: "x=../../..; cat $x/b7/PROTOCOL.md" }, true],
 [H, k, "Bash", { command: "grep -r createGame /tmp" }, true],
 [H, k, "Bash", { command: "cat ~/.claude/projects/foo/s.jsonl" }, true],
 [H, k, "Bash", { command: "ls /home/user/system-3-company" }, true],
 // v3, the fairness review's repros: the runner's temp copies, the operator session's task outputs, /proc, ps
 [V, vd, "Bash", { command: "cat /tmp/b7-abc/suite/G1/golden.json" }, true],
 [V, vd, "Read", { file_path: "/tmp/b7-abc/suite/G1/golden.json" }, true],
 [V, vd, "Bash", { command: "cat /tmp/b7-*/suite/*/golden.json" }, true],
 [V, vd, "Read", { file_path: path.join(HERE, ".tmp", "run-x", "game", "game.mjs") }, true],
 [V, vd, "Read", { file_path: path.join(opProject, "tasks", "wxfv3ue49.output") }, true],
 [V, vd, "Bash", { command: `cat ${path.join(opProject, "tasks", "wxfv3ue49.output")}` }, true],
 [V, vd, "Bash", { command: `ls ${path.join(opProject, "tasks")}` }, true],
 [V, vd, "Read", { file_path: path.join(ctmp, "-home-user-other", "tasks", "x.output") }, true],
 [V, vd, "Bash", { command: "cat /proc/1/cmdline" }, true],
 [V, vd, "Read", { file_path: "/proc/self/environ" }, true],
 [V, vd, "Bash", { command: "ps aux | grep node" }, true],
 [H, hw, "Bash", { command: "pgrep -af run-" }, true],
 // v3: an H/HSI session may not rewrite its own hook, state.json or the kernel copy
 [H, hw, "Write", { file_path: P.live("H","G1")+"/kernel/.claude/settings.json", content: "{}" }, true],
 [H, hw, "Edit", { file_path: P.live("H","G1")+"/state.json", old_string: "a", new_string: "b" }, true],
 [H, hw, "Bash", { command: "echo {} > ../../kernel/.claude/settings.json" }, true],
 [H, k, "Bash", { command: "rm .claude/settings.json" }, true],
 [H, hw, "Bash", { command: "node -e \"require('fs').writeFileSync('../../state.json','{}')\"" }, true],
 [H, k, "Write", { file_path: "notes.txt", content: "x" }, true],
 [H, hw, "Bash", { command: "sed -i s/a/b/ ../../launches.jsonl" }, true],
 // allowed
 [V, vd, "Read", { file_path: path.join(ctmp, enc(vd), "tasks", "own.output") }, false],
 [H, k, "Read", { file_path: path.join(ctmp, enc(k), "tasks", "own.output") }, false],
 [H, hw, "Write", { file_path: hw + "/game.mjs", content: "x" }, false],
 [H, hw, "Bash", { command: "cat ../../state.json | head -5 > notes.txt" }, false],
 [H, hw, "Bash", { command: "node --test 2>&1 | tail -3" }, false],
 [H, k, "Bash", { command: `node meta.mjs check --order=O-1` }, false],
 [H, k, "Bash", { command: "cat ../state.json" }, false],
 [H, k, "Bash", { command: `cd ${P.live("H","G1")}/work/G1 && for f in *.test.mjs; do node --test $f; done 2>&1 | tail -5` }, false],
 [H, k, "Bash", { command: `node ${k}/meta.mjs room leave --run=R-1 --evidence=${P.live("H","G1")}/work/G1/EVAL.md --verdict=revise --findings='save-load: a save/load loses the turn count -> keep it'` }, false],
 [V, vd, "Bash", { command: "node --test && grep -rn createGame ." }, false],
 [V, vd, "Bash", { command: "sed -n '/start/,/end/p' game.mjs; ls /usr/bin | head; echo hi > /tmp/scratch.txt" }, false],
 [V, vd, "Read", { file_path: "game.mjs" }, false],
 [V, vd, "Glob", { pattern: "**/*.mjs" }, false],
 [V, vd, "Grep", { pattern: "createGame" }, false],
 [V, vd, "Write", { file_path: vd + "/game.test.mjs", content: "mentions run-hidden" }, false],
];
let bad = 0;
for (const [R, cwd, tool, input, want] of cases) { const d = accessDecision({ tool, input, cwd }, R); if (d.deny !== want) { bad++; console.log("WRONG", want ? "should deny" : "should allow", tool, JSON.stringify(input).slice(0, 140), d.why ?? ""); } }
console.log(`access: ${cases.length - bad}/${cases.length} as expected`);
// the runner: a game that reads its test file, tries to write it into GAME_DIR, copy ../ref and import the reference
const g = path.join(TMP, "leaky"); fs.mkdirSync(g);
fs.writeFileSync(path.join(g, "game.mjs"), `import fs from "node:fs"; import path from "node:path";
const t = process.argv[1]; let src = ""; try { src = fs.readFileSync(t, "utf8"); } catch {}
try { fs.writeFileSync(path.join(process.env.GAME_DIR, "leak.txt"), src); } catch {}
try { fs.cpSync(path.join(path.dirname(t), "ref"), path.join(process.env.GAME_DIR, "refcopy"), { recursive: true }); } catch {}
let ref = null; try { ref = await import(${JSON.stringify(path.join(HERE, "hidden", "G1", "ref", "game.mjs"))}); } catch {}
console.log(JSON.stringify({ category: src.slice(0, 40), pass: 1, fail: 0, total: 1 }));
export const createGame = (o) => ref ? ref.createGame(o) : ({ input: () => "x", state: () => ({}), save: () => "", load: () => {} });
`);
const r = spawnSync(process.execPath, [path.join(HERE, "run-hidden.mjs"), "--game=G1", "--phase=post", `--dir=${g}`], { encoding: "utf8" });
const j = JSON.parse(r.stdout.trim().split("\n").at(-1));
const leaked = ["leak.txt", "refcopy"].filter((f) => fs.existsSync(path.join(g, f)));
const known = Object.keys(j.categories).every((c) => /^[a-z]+(-[a-z]+)?$/.test(c));
console.log(`runner: ${j.pass}/${j.total} (the reference was not importable: ${j.pass < j.total}), files written into the dir: ${leaked.join(", ") || "none"}, only suite categories: ${known}`);
if (leaked.length || !known || j.pass === j.total) bad++;
// v3: the game runs in a process apart from the checker, and can read nothing but its own copy: no golden file (by the
// hidden paths, a static JSON import or the old temp layout), no results file, no other run's copy, no /proc. If any
// read works the game breaks its own api (input returns ""), so a clean run shows api tests passing.
const peek = path.join(TMP, "peek"); fs.mkdirSync(peek);
const tries = [path.join(HERE, "hidden", "G1", "golden.post.json"), path.join(HERE, "hidden", "G1", "golden.pre.json"), path.join(HERE, "hidden", "common", "check.mjs"), path.join(HERE, ".tmp"), "/proc/self/cmdline", "/tmp"];
fs.writeFileSync(path.join(peek, "game.mjs"), `import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)); let got = [];
for (const p of ${JSON.stringify(tries)}.concat([path.join(here, "..", "results.json"), path.join(here, "..", "suite", "G1", "golden.json"), path.join(here, "..", ".."), path.join(here, "..")])) { try { const st = fs.statSync(p); got.push(st.isDirectory() ? fs.readdirSync(p).length : fs.readFileSync(p, "utf8").length); } catch {} }
let j = null; try { j = (await import(${JSON.stringify(path.join(HERE, "hidden", "G1", "golden.post.json"))}, { with: { type: "json" } })).default; } catch {}
const leak = got.length > 0 || !!j;
export const createGame = () => ({ input: () => (leak ? "" : "x"), state: () => ({}), save: () => "s", load: () => { throw new Error("no"); } });
`);
const rp = spawnSync(process.execPath, [path.join(HERE, "run-hidden.mjs"), "--game=G1", "--phase=post", `--dir=${peek}`], { encoding: "utf8" });
const jp = JSON.parse(rp.stdout.trim().split("\n").at(-1));
const noPeek = (jp.categories.api?.pass ?? 0) >= 1;
console.log(`runner v3: the game could read none of the golden files, the checker, the results, the temp root, /proc or /tmp: ${noPeek} (api ${jp.categories.api?.pass}/${jp.categories.api?.total})`);
if (!noPeek) bad++;
// a game that hangs part-way: the cases it finished count, the rest fail, a timeout row is added, nothing is left behind
const hang = path.join(TMP, "hang"); fs.mkdirSync(hang);
fs.copyFileSync(path.join(HERE, "hidden", "common", "engine.mjs"), path.join(hang, "engine.mjs"));
fs.writeFileSync(path.join(hang, "world.mjs"), fs.readFileSync(path.join(HERE, "hidden", "G1", "world.mjs"), "utf8").replace("../common/engine.mjs", "./engine.mjs"));
fs.writeFileSync(path.join(hang, "game.mjs"), `import { makeG1 } from "./world.mjs";\nconst real = makeG1(true); let n = 0;\nexport const createGame = (o) => { const g = real(o); return { ...g, input: (c) => { if (++n > 6000) for (;;) {} return g.input(c); } }; };\n`);
const t0h = Date.now(), rh = spawnSync(process.execPath, [path.join(HERE, "run-hidden.mjs"), "--game=G1", "--phase=post", `--dir=${hang}`], { encoding: "utf8", env: { ...process.env, B7_GAME_TIMEOUT_MS: "3000" } });
const jh = JSON.parse(rh.stdout.trim().split("\n").at(-1)), leftovers = (() => { try { return fs.readdirSync(path.join(HERE, ".tmp")).length; } catch { return 0; } })();
const tmpB7 = fs.readdirSync("/tmp").filter((f) => /^b7-/.test(f)).length;
const hangOk = !!jh.categories.timeout && jh.total > 500 && jh.pass > 100 && jh.fail > 1 && Date.now() - t0h < 60000 && leftovers === 0;
console.log(`runner v3: a hang adds a timeout row and fails the unfinished cases (${jh.pass}/${jh.total}): ${hangOk}; temp dirs left in b7/.tmp: ${leftovers}; /tmp/b7-* dirs: ${tmpB7}`);
if (!hangOk || tmpB7) bad++;
// --phase is required
const np = spawnSync(process.execPath, [path.join(HERE, "run-hidden.mjs"), "--game=G1", `--dir=${peek}`], { encoding: "utf8" });
console.log(`runner v3: no --phase is refused: ${np.status === 2}`); if (np.status !== 2) bad++;
// v3 measures: the category-balanced rate and the transfer score
const cA = { parser: { pass: 5, fail: 5, total: 10 }, fuzz: { pass: 100, fail: 0, total: 100 }, gull: { pass: 0, fail: 2, total: 2 } };
const tr = transferScores([{ game: "G1", firstHandin: { categories: cA } }, { game: "G2", firstHandin: { categories: { parser: { pass: 9, fail: 1, total: 10 }, fuzz: { pass: 99, fail: 1, total: 100 }, rat: { pass: 0, fail: 3, total: 3 } } } }]);
const measures = balanced(cA) === 50 && tr.length === 1 && tr[0].failedThen === 1 && tr[0].meanChange === 40 && tr[0].recurred === 1 && tr[0].passedThenNowFailing === 1;
console.log(`measures: balanced rate and transfer score: ${measures}`); if (!measures) bad++;
// v2: the accept's phases. The first run scores the pre-notice suite, records it and exits 3 (the order is held at
// accept); while the notice is due and not yet delivered, accept runs nothing and exits 3; after delivery, the post suite
const work = path.join(TMP, "work"); fs.mkdirSync(work);
for (const f of ["engine.mjs"]) fs.copyFileSync(path.join(HERE, "hidden", "common", f), path.join(work, f));
fs.writeFileSync(path.join(work, "world.mjs"), fs.readFileSync(path.join(HERE, "hidden", "G1", "world.mjs"), "utf8").replace("../common/engine.mjs", "./engine.mjs"));
fs.writeFileSync(path.join(work, "game.mjs"), `import { makeG1 } from "./world.mjs";\nexport const createGame = makeG1(false);\n`);
fs.writeFileSync(path.join(work, "SPEC.md"), fs.readFileSync(P.spec("G1"), "utf8"));
const od = path.join(TMP, "op"), log = path.join(od, "accept.jsonl"); fs.mkdirSync(od);
const acc = () => spawnSync(process.execPath, [path.join(SELF_DIR, "setup.mjs"), "accept", "--game=G1", `--dir=${work}`, `--log=${log}`, `--b7=${HERE}`, `--runs=${path.join(TMP, "runs")}`], { encoding: "utf8" });
const rows = () => fs.readFileSync(log, "utf8").trim().split("\n").map((l) => JSON.parse(l));
const a1 = acc(), r1 = rows(), n1 = noticeState(od);
const a2 = acc(), r2 = rows();
fs.writeFileSync(path.join(od, "notice.json"), JSON.stringify({ ...n1, delivered: "now" }));
const a3 = acc(), r3 = rows();
const phases = [a1.status === 3 && r1.length === 1 && r1[0].phase === "pre" && r1[0].pass === r1[0].total && !!n1.due, a2.status === 3 && r2.length === 1, a3.status === 1 && r3.length === 2 && r3[1].phase === "post" && r3[1].fail > 0 && /^failed: notice: /m.test(a3.stdout)];
console.log(`accept phases: first pre-notice run held (exit 3): ${phases[0]}, a run while the notice is due runs nothing: ${phases[1]}, after delivery the post suite (the pre-notice game fails notice): ${phases[2]}`);
if (!phases.every(Boolean)) bad++;
// the notice and visible files are the same for every arm, and delivering twice changes nothing
const vs = placeVisible(P, "G1", work), d1 = deliverNoticeFiles(P, "G1", work), d2 = deliverNoticeFiles(P, "G1", work);
const spec = fs.readFileSync(path.join(work, "SPEC.md"), "utf8");
const files = d1.specSha === d2.specSha && spec.split("## Part D. Change Notice G1-N1").length === 2 && fs.existsSync(path.join(work, "visible-tests", "notice.test.mjs")) && fs.existsSync(path.join(work, "visible-tests", "visible.test.mjs")) && !!vs;
console.log(`notice files: appended once, visible tests and notice tests placed: ${files}; pointer names the notice: ${NOTICE_POINTER("G1").includes("G1-N1")}`);
if (!files) bad++;
// the canaries never include what an arm is given (spec, notice, visible tests)
const C = canaries(P), given = [P.spec("G1"), P.notice("G1"), path.join(P.visible("G1"), "golden.json"), path.join(P.visible("G1"), "suite.mjs")].map((f) => fs.readFileSync(f, "utf8")).join("\n");
const leaky = C.content.filter((k) => given.includes(k));
console.log(`canaries: ${C.content.length}, of which in the given files: ${leaky.length}`);
if (leaky.length || C.content.length < 100) bad++;
fs.rmSync(TMP, { recursive: true, force: true });
process.exitCode = bad ? 1 : 0;
