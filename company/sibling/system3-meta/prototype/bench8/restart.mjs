// Benchmark 8, restart safety (2026-10-23: the container was reclaimed twice in an hour without warning; every process
// died, the files survived). Shared by vanilla-compiler.mjs (V), setup.mjs run (S) and keepalive.mjs:
//   - armClock: an arm's active wall clock, kept on disk (<runs>/_operator/<arm>/clock.json, a beat every few seconds),
//     so a resumed arm's caps count the time it worked and not the time the machine was down (the gap between the
//     last beat and the resume is the downtime, recorded);
//   - procAlive: is a pid alive *and* the process we think it is (after a restart a pid can belong to anything: its
//     /proc cmdline must match, and a pid file written under another boot never names a live process);
//   - killLeftovers: before an arm resumes, kill what its dead run left (an agent CLI, a launcher, serve, the broker:
//     any process whose cwd is in the arm's folders, or whose cmdline names its runs dir), never this process or its
//     ancestors.
import fs from "node:fs";
import path from "node:path";

export const bootId = () => { try { return fs.readFileSync("/proc/sys/kernel/random/boot_id", "utf8").trim(); } catch { return null; } };
export const cmdline = (pid) => { try { return fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").filter(Boolean); } catch { return null; } };
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const writeAtomic = (f, x) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(`${f}.tmp`, JSON.stringify(x)); fs.renameSync(`${f}.tmp`, f); };

/** Is `pid` alive and its cmdline matching `match` (a function of the argv list, or a list of substrings every one of
 *  which some argument contains)? With `boot`, a pid recorded under another boot is dead whatever runs at it now. */
export function procAlive(pid, { match = null, boot = null } = {}) {
  pid = Number(pid);
  if (!Number.isInteger(pid) || pid <= 0) return false;
  if (boot && bootId() && boot !== bootId()) return false;
  try { process.kill(pid, 0); } catch (e) { if (e.code !== "EPERM") return false; }
  if (!match) return true;
  const argv = cmdline(pid); if (!argv) return false;
  try { if (fs.readFileSync(`/proc/${pid}/stat`, "utf8").split(") ").pop().startsWith("Z")) return false; } catch {} // a zombie is dead
  return typeof match === "function" ? !!match(argv) : match.every((m) => argv.some((a) => a.includes(m)));
}

/** A pid file: {pid, boot, argv, started, ...extra}. */
export const writePid = (f, extra = {}) => writeAtomic(f, { pid: process.pid, boot: bootId(), argv: process.argv.slice(1), started: new Date().toISOString(), ...extra });
export const readPid = (f) => readJson(f);

/** The arm's active clock. `prev` is what the last process left (null on a fresh run); `downMs` the gap between its
 *  last beat and now (the downtime, when this process resumes a dead one); `activeMs()` the arm's time so far. */
export function armClock(file, { everyMs = 5000 } = {}) {
  const prev = readJson(file), now = Date.now();
  const base = prev?.activeMs ?? 0, t0 = now;
  const downMs = prev?.t ? Math.max(0, now - Date.parse(prev.t)) : 0;
  const starts = (prev?.starts ?? 0) + 1;
  const activeMs = () => base + (Date.now() - t0);
  const beat = () => { try { writeAtomic(file, { activeMs: activeMs(), t: new Date().toISOString(), pid: process.pid, boot: bootId(), starts, downMs: (prev?.downMs ?? 0) + downMs }); } catch {} };
  beat();
  const timer = setInterval(beat, everyMs); timer.unref();
  return { prev, downMs, starts, activeMs, activeMin: () => activeMs() / 60000, beat, stop: () => { clearInterval(timer); beat(); } };
}
/** The clock as the last process left it (no beat): for keepalive and tally. */
export const clockOf = (file) => readJson(file);

const ancestors = () => {
  const out = new Set([process.pid]); let p = process.ppid;
  for (let i = 0; i < 64 && p > 1; i++) { out.add(p); let st; try { st = fs.readFileSync(`/proc/${p}/stat`, "utf8"); } catch { break; } p = Number(st.split(") ").pop().split(" ")[1]); }
  return out;
};
const inside = (p, r) => p === r || p.startsWith(r.endsWith("/") ? r : r + "/");
/** Kill (SIGKILL) every process a dead run of this arm left behind: a cwd inside one of `dirs`, or an argument naming
 *  one of `names` (e.g. the runs dir with the arm's script). Never this process or its ancestors, never pid 1.
 *  Returns [{pid, argv}]. */
export function killLeftovers({ dirs = [], names = [], also = () => false } = {}) {
  const keep = ancestors(), killed = [];
  let pids = []; try { pids = fs.readdirSync("/proc").filter((d) => /^\d+$/.test(d)).map(Number); } catch { return killed; }
  for (const pid of pids) {
    if (keep.has(pid) || pid <= 1) continue;
    let cwd = null; try { cwd = fs.readlinkSync(`/proc/${pid}/cwd`); } catch {}
    const argv = cmdline(pid) ?? [];
    const hit = (cwd && dirs.some((d) => inside(cwd, d))) || names.some((n) => (Array.isArray(n) ? n.every((m) => argv.some((a) => a.includes(m))) : argv.some((a) => a.includes(n)))) || also(argv, cwd);
    if (!hit) continue;
    try { process.kill(pid, "SIGKILL"); killed.push({ pid, argv: argv.join(" ").slice(0, 200), cwd }); } catch {}
  }
  return killed;
}
