#!/usr/bin/env node
// Benchmark 9: the compile-time judge's timing part (PROTOCOL.md "The task"). It times one batch (one JVM) of the
// arm's compiler against the same batch of the start's, interleaved (start, arm, arm, start, ...), REPS times each, in
// B8's compile sandbox (no network, no cc1, nobody, ro root) with each compiler's tree a fresh read-only copy per
// timing, so nothing one compile writes survives to the next. Prints one JSON line.
//   node timing.mjs --arm=<dir> --start=<dir> --set=lua|corpus --reps=5 [--corpus=<file: one .c path a line>]
//   lua:    Lua 5.4.7's 33 sources, spec/W7.md's flags (from <b8>/spec/w7)
//   corpus: the .c files listed in --corpus (the fast judge: the visible W1-W5 tests; the full judge: the hidden ones
//           the start passes), -I <b8>/spec/include
// The tree check: a compiler whose src/ holds anything but .clj, .cljc and .edn files is refused (no AOT, no jars).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const B8 = path.resolve(process.env.B8_HOME ?? "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8");
const die = (m, code = 2) => { console.error(m); process.exit(code); };
if (!opt.arm || !opt.start || !["lua", "corpus"].includes(opt.set)) die("usage: timing.mjs --arm=<dir> --start=<dir> --set=lua|corpus [--corpus=<file>] [--reps=5]");
if (opt.set === "corpus" && !opt.corpus) die("--set=corpus needs --corpus=<file>");
const REPS = Number(opt.reps ?? 5), BATCH_MS = 900_000;

/** Why a compiler tree is refused, or null: src/ may hold only Clojure source and EDN. */
function treeProblem(dir) {
  const src = path.join(dir, "src"), bad = [];
  if (!fs.existsSync(src)) return "no src/";
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isSymbolicLink()) bad.push(path.relative(dir, p)); else if (e.isDirectory()) walk(p); else if (!/\.(clj|cljc|edn)$/.test(e.name)) bad.push(path.relative(dir, p)); } };
  walk(src);
  return bad.length ? `src/ holds ${bad.length} file(s) that are not .clj, .cljc or .edn (e.g. ${bad.slice(0, 3).join(", ")})` : null;
}

function run(cmd, args, { timeout }) {
  return new Promise((resolve) => {
    const t0 = process.hrtime.bigint();
    const ch = spawn(cmd, args, { env: { PATH: "/usr/bin:/bin" }, stdio: ["ignore", "ignore", "pipe"], detached: true });
    let err = "", timedOut = false;
    const t = setTimeout(() => { timedOut = true; try { process.kill(-ch.pid, "SIGKILL"); } catch {} }, timeout);
    ch.stderr.on("data", (d) => { if (err.length < 4000) err += d; });
    ch.on("error", () => {});
    ch.on("close", (code) => { clearTimeout(t); resolve({ code, timedOut, err, ms: Number(process.hrtime.bigint() - t0) / 1e6 }); });
  });
}
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

// ---- the sandbox (run-hidden.mjs's compile box, with the compiler's tree read-only) ----
const BOX = `#!/bin/sh
set -e
mount --make-rprivate /
mount -t tmpfs -o mode=755,size=1m tmpfs /run
mkdir /run/b8box
while [ "$1" != "--" ]; do
  src=\${1%%:*}; rest=\${1#*:}; dst=\${rest%%:*}; m=\${rest#*:}
  mkdir -p "/run/b8box/$dst"; mount --bind "$src" "/run/b8box/$dst"
  [ "$m" = ro ] && mount -o remount,bind,ro "/run/b8box/$dst"
  shift
done
shift
mount -o remount,ro /run
for d in /tmp /home /root /opt /mnt /srv /media /var/lib/docker /dev/shm /var/tmp; do [ -d $d ] && mount -t tmpfs -o mode=1777,size=512m tmpfs $d; done
for d in /usr/lib/gcc /usr/libexec/gcc /usr/lib/gcc-cross /usr/lib/llvm-*; do [ -d "$d" ] && mount -t tmpfs -o mode=755,size=1m tmpfs "$d"; done
mount -o remount,bind,ro /
cd /run/b8box/arm
exec setpriv --reuid=65534 --regid=65534 --clear-groups --inh-caps=-all --bounding-set=-all -- env -i PATH=/usr/bin:/bin HOME=/tmp TMPDIR=/tmp LANG=C.UTF-8 "$@"
`;
const TIMER = "import resource,subprocess,sys,time\nt=time.time()\ntry:\n    c=subprocess.call(sys.argv[2:])\nexcept Exception:\n    c=127\nw=time.time()-t\nru=resource.getrusage(resource.RUSAGE_CHILDREN)\nopen(sys.argv[1],'w').write('%d %.3f %d\\n'%(c,w,ru.ru_maxrss))\nsys.exit(c)\n";
const base = path.join(B8, ".tmp"); fs.mkdirSync(base, { recursive: true }); fs.chmodSync(base, 0o700);
const R = fs.mkdtempSync(path.join(base, "b9-time-"));
process.on("exit", () => { if (!opt.keep) fs.rmSync(R, { recursive: true, force: true }); });
process.on("SIGINT", () => process.exit(130)); process.on("SIGTERM", () => process.exit(143));
fs.writeFileSync(path.join(R, "box.sh"), BOX, { mode: 0o755 });
for (const d of ["in", "lists", "include", "toolchain"]) fs.mkdirSync(path.join(R, d), { recursive: true });
fs.chmodSync(R, 0o755);
fs.writeFileSync(path.join(R, "lists", "timer.py"), TIMER);
fs.cpSync(path.join(B8, "toolchain"), path.join(R, "toolchain"), { recursive: true });

// ---- the inputs ----
let files, flags;
if (opt.set === "lua") {
  const build = JSON.parse(fs.readFileSync(path.join(B8, "spec", "w7", "build.json"), "utf8"));
  fs.cpSync(path.join(B8, "spec", "w7", "include"), path.join(R, "include", "inc"), { recursive: true });
  fs.cpSync(path.join(B8, "spec", "w7", "lua"), path.join(R, "in", "lua"), { recursive: true });
  files = build.sources.map((f) => `lua/${f}`);
  flags = ["-I", "/run/b8box/include/inc", "-I", "/run/b8box/in/lua", ...build.defines.flatMap((d) => ["-D", d])];
} else {
  fs.cpSync(path.join(B8, "spec", "include"), path.join(R, "include", "inc"), { recursive: true });
  const list = fs.readFileSync(path.resolve(opt.corpus), "utf8").split("\n").map((l) => l.trim()).filter(Boolean);
  files = list.map((f, i) => { const n = `c/${String(i).padStart(5, "0")}.c`; fs.mkdirSync(path.join(R, "in", "c"), { recursive: true }); fs.copyFileSync(f, path.join(R, "in", n)); return n; });
  flags = ["-I", "/run/b8box/include/inc"];
}
fs.writeFileSync(path.join(R, "lists", "batch.txt"), files.map((f) => `/run/b8box/in/${f} /run/b8box/out/${f.replace(/\//g, "_").replace(/\.c$/, ".s")}`).join("\n") + "\n");

// ---- one timing: a fresh read-only copy of the tree, a fresh output dir ----
const SKIP = new Set([".git", "node_modules", "target", ".cpcache", "classes"]);
const copyTree = (s, d) => { fs.mkdirSync(d, { recursive: true }); for (const e of fs.readdirSync(s, { withFileTypes: true })) { if (e.isSymbolicLink() || SKIP.has(e.name)) continue; const a = path.join(s, e.name), b = path.join(d, e.name); if (e.isDirectory()) copyTree(a, b); else if (e.isFile()) fs.copyFileSync(a, b); } };
const trees = { arm: path.resolve(opt.arm), start: path.resolve(opt.start) };
for (const [who, dir] of Object.entries(trees)) { const p = treeProblem(dir); if (p) { console.log(JSON.stringify({ set: opt.set, refused: who, why: p })); process.exit(1); } }
let k = 0;
async function once(who) {
  const t = path.join(R, `t${k}`), out = path.join(R, `o${k}`), tf = path.join(out, "time.txt"); k++;
  copyTree(trees[who], t); fs.mkdirSync(out); fs.chmodSync(out, 0o777);
  const argv = ["python3", "/run/b8box/lists/timer.py", "/run/b8box/out/time.txt", "/run/b8box/toolchain/clj-run", "-m", "ccc.main", ...flags, "--batch", "/run/b8box/lists/batch.txt"];
  const specs = [[t, "arm", "ro"], [path.join(R, "in"), "in", "ro"], [out, "out", "rw"], [path.join(R, "lists"), "lists", "ro"], [path.join(R, "include"), "include", "ro"], [path.join(R, "toolchain"), "toolchain", "ro"]];
  const r = await run("unshare", ["-m", "-n", "-p", "-f", "--mount-proc", "--kill-child", "/bin/sh", path.join(R, "box.sh"), ...specs.map((x) => x.join(":")), "--", ...argv], { timeout: BATCH_MS });
  let code = r.code, wall = r.ms / 1000, rssKB = null;
  try { const [c, w, kb] = fs.readFileSync(tf, "utf8").trim().split(" ").map(Number); code = r.timedOut ? null : c; wall = w; rssKB = kb; } catch {}
  const written = files.filter((f) => { try { return fs.statSync(path.join(out, f.replace(/\//g, "_").replace(/\.c$/, ".s"))).size > 0; } catch { return false; } }).length;
  fs.rmSync(t, { recursive: true, force: true }); fs.rmSync(out, { recursive: true, force: true });
  return { who, code, timedOut: r.timedOut, wall, rssKB, written };
}

const runs = [];
for (let i = 0; i < REPS; i++) for (const who of i % 2 ? ["arm", "start"] : ["start", "arm"]) runs.push(await once(who));
const sum = (who) => { const xs = runs.filter((x) => x.who === who); return { median: Math.round(median(xs.map((x) => x.wall)) * 1000) / 1000, walls: xs.map((x) => x.wall), rssMB: Math.round(Math.max(...xs.map((x) => x.rssKB ?? 0)) / 1024), written: Math.min(...xs.map((x) => x.written)), failed: xs.filter((x) => x.code !== 0).length }; };
const arm = sum("arm"), start = sum("start");
console.log(JSON.stringify({ set: opt.set, files: files.length, reps: REPS, arm, start, ratio: Math.round((arm.median / start.median) * 1000) / 1000, complete: arm.written >= start.written && arm.failed === 0 }));
