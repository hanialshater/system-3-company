#!/usr/bin/env node
// Benchmark 11: the org's own tools (B11.md "O, the autonomous org"). Installed in each member's toolchain with
// org.json beside it: { me, tree (the member's clone), main (the org's main repository), judge (judge.mjs), dir (the
// org's shared folder: status, notes, lock), board (board.mjs), budget, minutes }.
//   org status                 main's score, who landed what, the org's spend and time, the members' last activity
//   org sync                   merge main into your tree (resolve any conflict yourself, then commit)
//   org land ["message"]       land your committed work on main: your tree must contain main (sync first) and be
//                              committed; the referee scores your HEAD on the visible corpus and lands it only if
//                              main's score does not fall; one land at a time
//   org note --to=<member|all> --text='…'    a direct note
//   org notes                  your notes (newest last); marks them read
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, "org.json"), "utf8"));
const [cmd, ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(rest.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const words = rest.filter((a) => !a.startsWith("--")).join(" ");
const die = (m, code = 2) => { console.error(m); process.exit(code); };
const git = (cwd, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-c", `user.name=${cfg.me}`, "-c", `user.email=${cfg.me}@org`, "-C", cwd, ...a], { encoding: "utf8", maxBuffer: 64 << 20 });
const J = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } };
const statusF = path.join(cfg.dir, "status.json"), notesF = (id) => path.join(cfg.dir, "notes", `${id}.jsonl`);
const append = (f, x) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.appendFileSync(f, JSON.stringify({ t: new Date().toISOString(), ...x }) + "\n"); };
const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
const board = (args) => spawnSync(process.execPath, [cfg.board, ...args], { encoding: "utf8" });

if (cmd === "status") {
  const st = J(statusF, {}), spend = J(path.join(cfg.dir, "spend.json"), {});
  console.log(`main: ${st.head?.slice(0, 10) ?? "?"} at ${st.rate ?? "?"} (visible family statements; higher is better)${st.families ? `\n  per family: ${Object.entries(st.families).map(([k, v]) => `${k} ${(v.rate * 100).toFixed(1)}%`).join(", ")}` : ""}`);
  console.log(`org spend: $${(spend.spent ?? 0).toFixed(2)} of $${cfg.budget}; ${Math.round(spend.minutes ?? 0)} of ${cfg.minutes} active minutes${spend.members ? `\n  by member: ${Object.entries(spend.members).map(([k, v]) => `${k} $${v.toFixed(2)}`).join(", ")}` : ""}`);
  for (const l of (st.lands ?? []).slice(-12)) console.log(`  ${l.t.slice(11, 16)} ${l.by} landed ${l.head.slice(0, 10)}: ${l.before} → ${l.after}${l.msg ? ` (${l.msg})` : ""}`);
  const refused = (st.refused ?? []).slice(-5); for (const l of refused) console.log(`  ${l.t.slice(11, 16)} ${l.by}'s land refused: ${l.why}`);
} else if (cmd === "sync") {
  const r = git(cfg.tree, "fetch", "-q", cfg.main, "main"); if (r.status !== 0) die(r.stderr);
  const m = git(cfg.tree, "merge", "--no-edit", "FETCH_HEAD");
  console.log(m.status === 0 ? `synced: ${git(cfg.tree, "log", "--oneline", "-1").stdout.trim()}` : `merge conflict: resolve it in ${cfg.tree}, commit, and run your checks\n${m.stdout}${m.stderr}`);
  process.exit(m.status === 0 ? 0 : 1);
} else if (cmd === "land") {
  if (git(cfg.tree, "status", "--porcelain", "--untracked-files=no").stdout.trim()) die("commit your work first (only committed work lands)");
  const head = git(cfg.tree, "rev-parse", "HEAD").stdout.trim(), mainHead = git(cfg.main, "rev-parse", "main").stdout.trim();
  if (git(cfg.tree, "merge-base", "--is-ancestor", mainHead, head).status !== 0) { git(cfg.tree, "fetch", "-q", cfg.main, "main"); if (git(cfg.tree, "merge-base", "--is-ancestor", mainHead, head).status !== 0) die(`main has moved on (now ${mainHead.slice(0, 10)}): run \`org sync\`, check, commit, then land`); }
  if (head === mainHead) die("nothing to land: your HEAD is main");
  const lock = path.join(cfg.dir, "land.lock");
  for (let i = 0; ; i++) { try { fs.mkdirSync(lock); break; } catch { if (i > 1200) die("the land lock is busy (another member is landing); try again"); spawnSync("sleep", ["1"]); } }
  try {
    const now = git(cfg.main, "rev-parse", "main").stdout.trim();
    if (now !== mainHead) die(`main moved while you waited (now ${now.slice(0, 10)}): sync and land again`);
    // the referee: score a clean copy of your HEAD on the visible corpus
    const snap = path.join(cfg.dir, "snap", `${cfg.me}-${Date.now()}`); fs.mkdirSync(path.dirname(snap), { recursive: true });
    git(cfg.dir, "clone", "-q", "--no-hardlinks", cfg.tree, snap); git(snap, "checkout", "-q", head);
    const r = spawnSync(process.execPath, [cfg.judge, "score", `--dir=${snap}`], { encoding: "utf8", timeout: 3600_000, maxBuffer: 64 << 20 });
    fs.rmSync(snap, { recursive: true, force: true });
    let s = null; for (const l of String(r.stdout).trim().split("\n").reverse()) { try { s = JSON.parse(l); break; } catch {} }
    const st = J(statusF, { rate: 0, lands: [], refused: [] }), before = st.rate ?? 0;
    if (!s) { st.refused = [...(st.refused ?? []), { t: new Date().toISOString(), by: cfg.me, head, why: "the referee could not score it" }]; fs.writeFileSync(statusF, JSON.stringify(st, null, 1)); die(`refused: the referee could not score your HEAD${r.stderr ? `: ${r.stderr.slice(-400)}` : ""}`, 1); }
    if (s.rate < before) {
      st.refused = [...(st.refused ?? []), { t: new Date().toISOString(), by: cfg.me, head, why: `main would fall: ${before} → ${s.rate}`, families: s.families }];
      fs.writeFileSync(statusF, JSON.stringify(st, null, 1));
      board(["post", "--by=judge", "--kind=dead-end", `--area=land`, `--text=${cfg.me}'s land refused: main would fall ${before} → ${s.rate}`, `--evidence=${head.slice(0, 10)}; ${Object.entries(s.families).map(([k, v]) => `${k} ${v.rate}`).join(", ")}`, "--wrong-if=a rescore of the same commit passes"]);
      die(`refused: main would fall (${before} → ${s.rate}); per family: ${Object.entries(s.families).map(([k, v]) => `${k} ${(v.rate * 100).toFixed(1)}% (main ${st.families?.[k] ? (st.families[k].rate * 100).toFixed(1) : "?"}%)`).join(", ")}`, 1);
    }
    const ff = git(cfg.main, "merge", "--ff-only", "-q", head);
    if (ff.status !== 0) { git(cfg.main, "fetch", "-q", cfg.tree, head); const f2 = git(cfg.main, "merge", "--ff-only", "-q", head); if (f2.status !== 0) die(`could not move main: ${f2.stderr}`); }
    const land = { t: new Date().toISOString(), by: cfg.me, head, before, after: s.rate, msg: words.slice(0, 200), families: s.families };
    Object.assign(st, { head, rate: s.rate, families: s.families, all: s.all, lands: [...(st.lands ?? []), land] }); fs.writeFileSync(statusF, JSON.stringify(st, null, 1));
    append(path.join(cfg.dir, "lands.jsonl"), land);
    board(["post", "--by=judge", "--kind=finding", "--area=land", `--text=${cfg.me} landed ${head.slice(0, 10)}${words ? ` (${words.slice(0, 120)})` : ""}: main ${before} → ${s.rate}`, `--evidence=visible corpus: ${s.statementsPass}/${s.statements} family statements`, "--wrong-if=the hidden score moves the other way"]);
    console.log(`landed ${head.slice(0, 10)} on main: ${before} → ${s.rate} (${s.statementsPass}/${s.statements} visible family statements)`);
  } finally { fs.rmSync(lock, { recursive: true, force: true }); }
} else if (cmd === "note") {
  if (typeof opt.to !== "string" || typeof opt.text !== "string" || !opt.text.trim()) die("usage: org note --to=<member|all> --text='…'");
  const to = opt.to === "all" ? cfg.members.filter((m) => m !== cfg.me) : [opt.to];
  for (const m of to) { if (!cfg.members.includes(m)) die(`no member ${m} (members: ${cfg.members.join(", ")})`); append(notesF(m), { from: cfg.me, text: opt.text.slice(0, 2000) }); }
  append(path.join(cfg.dir, "notes-log.jsonl"), { from: cfg.me, to: opt.to, text: opt.text.slice(0, 2000) });
  console.log(`noted to ${to.join(", ")}`);
} else if (cmd === "notes") {
  const all = readJsonl(notesF(cfg.me)), seenF = path.join(cfg.dir, "notes", `${cfg.me}.seen`), seen = Number(J(seenF, 0));
  if (!all.length) console.log("no notes");
  all.forEach((n, i) => console.log(`${i < seen ? " " : "*"} ${n.t.slice(11, 16)} from ${n.from}: ${n.text}`));
  fs.writeFileSync(seenF, String(all.length));
} else die("usage: org status | sync | land [\"message\"] | note --to=<member|all> --text='…' | notes");
