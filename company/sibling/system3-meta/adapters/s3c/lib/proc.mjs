// lib/proc.mjs: process, git and server helpers shared by the slow s3c adapters (qa.mjs, walkthrough.mjs).
// Plan 2026-10-21-m4-m7-plan.md §4 (qa.mjs "stops the server in finally"; walkthrough.mjs "reuses qa's server")
// and §3 K2 (these adapters run as async jobs; a supervisor timeout arrives as SIGTERM, so every child is spawned in
// its own process group and killed as a group, and a started server is stopped on the way out).
// Only node: built-ins, plus the company's own tools/lib/server.mjs (freePort, portIsFree) and tools/serve.sh,
// both loaded from the repo under test by absolute path.

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { spawn, spawnSync, execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const DEFAULT_REPO = "/home/user/s3c-wt/base";
// Chromium 1194 matches the pinned @playwright/test 1.56.1 (maps.json gates-qa "Container runtime").
export const PW_BROWSERS = "/opt/pw-browsers";

// ------------------------------------------------------------------ findings and exits (same shape as gates.mjs)

/** A finding is {severity: "block"|"advisory"|"environment", kind, message, route?}; route is a K11 target. */
export const F = {
  block: (kind, message, route = "build") => ({ severity: "block", kind, route, message }),
  env: (kind, message) => ({ severity: "environment", kind, message }),
  advisory: (kind, message) => ({ severity: "advisory", kind, message }),
};

/** ok = no block/environment finding; exit 0 pass, 3 when any environment finding (not a loop), else 1. */
export function verdict(findings) {
  const ok = !findings.some((f) => f.severity !== "advisory");
  return { ok, exit: ok ? 0 : findings.some((f) => f.severity === "environment") ? 3 : 1 };
}

export function parseArgs(argv) {
  const opts = { positional: [] };
  for (const a of argv) {
    const m = a.match(/^--([a-z0-9-]+)(?:=(.*))?$/);
    if (!m) opts.positional.push(a);
    else opts[m[1]] = m[2] ?? true;
  }
  return opts;
}

// Slug rule: tools/company.mjs cmdNewDemo (kebab-case).
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// ------------------------------------------------------------------ lessons and git

/** src/demos/<domain>/<slug>/meta.json, found by directory name (company.mjs loadDemos walks the same tree). */
export function findLesson(repo, slug) {
  const root = path.join(repo, "src/demos");
  for (const d of fs.existsSync(root) ? fs.readdirSync(root) : []) {
    const dir = path.join(root, d, slug);
    const mp = path.join(dir, "meta.json");
    if (!fs.existsSync(mp)) continue;
    try {
      return { domain: d, dir, rel: path.relative(repo, dir), metaPath: mp, meta: JSON.parse(fs.readFileSync(mp, "utf8")) };
    } catch (e) {
      return { domain: d, dir, rel: path.relative(repo, dir), metaPath: mp, meta: null, parseError: e.message };
    }
  }
  return null;
}

export function git(repo, args) {
  return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
export function headSha(repo) {
  try {
    return git(repo, ["rev-parse", "HEAD"]);
  } catch {
    return null;
  }
}
/** `git status --porcelain` limited to paths: [{code, path}]. Untracked files count (reveal-fit refuses them too). */
export function dirty(repo, paths) {
  // Not git(): its trim() would eat the leading space of the first " M" status code.
  const out = execFileSync("git", ["-C", repo, "status", "--porcelain", "--", ...paths], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return out.split("\n").filter(Boolean).map((l) => ({ code: l.slice(0, 2), path: l.slice(3) }));
}

// ------------------------------------------------------------------ environment preflight

/**
 * Turbopack (next 16 builds with it by default) refuses a node_modules symlink whose target leaves its filesystem
 * root: measured 2026-10-21, `next build` panics in 2.7 s with "Symlink node_modules could not be resolved: the
 * symlink target leaves the filesystem root". The root comes from next.config.mjs: the main checkout when cwd is
 * under `<main>/.claude/worktrees/<name>`, else cwd. So plan §1/K5's `nodeModules: symlink:<base>/node_modules` only
 * builds when the order worktree sits at `<base>/.claude/worktrees/<task>` (the company's own worktree convention).
 * Returns a problem string or null. Mirrors next.config.mjs's root rule; re-read it if that file changes.
 */
export function turbopackProblem(repo) {
  const nm = path.join(repo, "node_modules");
  let st;
  try {
    st = fs.lstatSync(nm);
  } catch {
    return `${repo} has no node_modules (run npm ci, or symlink the sandbox base's node_modules)`;
  }
  if (!st.isSymbolicLink()) return null;
  const marker = `${path.sep}.claude${path.sep}worktrees${path.sep}`;
  const root = repo.includes(marker) ? repo.slice(0, repo.indexOf(marker)) : repo;
  let target;
  try {
    target = fs.realpathSync(nm);
  } catch {
    return `node_modules in ${repo} is a dangling symlink`;
  }
  const inside = target === root || target.startsWith(root + path.sep);
  return inside
    ? null
    : `node_modules in ${repo} is a symlink to ${target}, outside Turbopack's root ${root} (next.config.mjs); next build panics on it. Put the worktree at <base>/.claude/worktrees/<task> (root becomes <base>), or give it a real node_modules`;
}

/** Child env with the Playwright browsers path defaulted (CLAUDE.md map: /opt/pw-browsers in this container). */
export function baseEnv(extra = {}) {
  const env = { ...process.env, ...extra };
  if (!env.PLAYWRIGHT_BROWSERS_PATH && fs.existsSync(PW_BROWSERS)) env.PLAYWRIGHT_BROWSERS_PATH = PW_BROWSERS;
  delete env.NODE_TEST_CONTEXT; // the adapter may run under node --test; children must not think they are tests
  delete env.FORCE_COLOR;
  return env;
}

export async function companyServerLib(repo) {
  return import(pathToFileURL(path.join(repo, "tools/lib/server.mjs")).href);
}

// ------------------------------------------------------------------ running steps

const live = new Set(); // process groups still running, for the signal handler
// Grace between the polite signal and SIGKILL, on timeout and on an adapter signal. Playwright's own graceful
// close waits for its webServer's close; next start exits in well under a second on SIGTERM (measured 2026-10-22).
export const GRACE_MS = 5000;

/** True once a SIGTERM/SIGINT/SIGHUP arrived: no new step or server may start (installSignalCleanup). */
let stopping = false;
export const isStopping = () => stopping;

/**
 * Runs one step in its own process group. Full output goes to <logDir>/<name>.log; the result keeps the last 6 KB.
 * On timeout the whole group gets `stopSignal` (default SIGTERM), then SIGKILL after GRACE_MS (next build and
 * playwright fork workers that spawnSync's timeout would orphan). Never rejects. While the adapter is stopping it
 * starts nothing and resolves {exit: null, error: "stopping"}: a step whose predecessor exited during the grace
 * period (playwright on SIGINT writes a report) must not go on to run qa-record.
 * stopSignal: "SIGINT" for playwright, whose test runner tears its webServer down on SIGINT (sigIntWatcher, then
 * plugin teardown) but has no SIGTERM handler of its own, so SIGTERM kills the runner and orphans the webServer
 * (playwright-core processLauncher.js launches it detached:true, its own group; review 2026-10-22 finding 3).
 */
export function runStep(name, cmd, args, { cwd, env, timeoutMs, logDir, onLine, stopSignal = "SIGTERM" } = {}) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    if (stopping) {
      resolve({ name, exit: null, signal: null, ms: 0, timedOut: false, error: "stopping", tail: "", stdout: "" });
      return;
    }
    let log = null;
    if (logDir) {
      fs.mkdirSync(logDir, { recursive: true });
      log = fs.createWriteStream(path.join(logDir, `${name}.log`));
    }
    let tail = "";
    let stdout = "";
    let child;
    try {
      child = spawn(cmd, args, { cwd, env, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    } catch (e) {
      resolve({ name, exit: null, signal: null, ms: 0, timedOut: false, error: e.message, tail: "", stdout: "" });
      return;
    }
    child.stopSignal = stopSignal;
    live.add(child);
    const take = (d, isOut) => {
      const s = d.toString();
      log?.write(s);
      tail = (tail + s).slice(-6000);
      if (isOut) stdout = (stdout + s).slice(-200_000);
      if (onLine) for (const l of s.split("\n")) if (l.trim()) onLine(l);
    };
    child.stdout.on("data", (d) => take(d, true));
    child.stderr.on("data", (d) => take(d, false));
    let timedOut = false;
    const timer = timeoutMs
      ? setTimeout(() => {
          timedOut = true;
          killGroup(child, stopSignal);
          setTimeout(() => killGroup(child, "SIGKILL"), GRACE_MS).unref();
        }, timeoutMs)
      : null;
    let spawnError = null;
    child.on("error", (e) => (spawnError = e.message));
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      live.delete(child);
      const result = { name, exit: code, signal, ms: Date.now() - t0, timedOut, error: spawnError, tail, stdout, log: logDir ? path.join(logDir, `${name}.log`) : null };
      // Resolve only once the log is flushed: callers read it (qa.mjs classifies build failures from the full log),
      // and end() is asynchronous (a flaky test caught a read of a still-empty file).
      if (log) log.end(() => resolve(result));
      else resolve(result);
    });
  });
}

function killGroup(child, sig) {
  try {
    process.kill(-child.pid, sig);
  } catch {
    try {
      child.kill(sig);
    } catch {}
  }
}

/** Last non-empty line, for "one line of context" findings. */
export const lastLines = (s, n = 3) => String(s ?? "").replace(/\x1b\[[0-9;]*m/g, "").trim().split("\n").filter(Boolean).slice(-n).join(" | ");

// ------------------------------------------------------------------ server (tools/serve.sh)

/**
 * Starts `tools/serve.sh start <port> <dist>` (company tool: NEXT_DIST_DIR=<dist> setsid npx next start -H 127.0.0.1,
 * pid in .serve/<port>.pid). serve.sh sleeps 5 s and probes once; next start may not answer yet, so this polls
 * `/` until a 200 (the probe walkthrough.mjs's waitFor uses). serve.sh exits 0 with "already served" when a live
 * pid file exists for the port: that server is not ours, so it is refused rather than used (W-851).
 * Returns {url, port, ms, warning?} or throws.
 */
export async function serveStart(repo, port, dist, { timeoutMs = 60_000, env } = {}) {
  const t0 = Date.now();
  if (stopping) throw new Error("adapter is stopping (signal): server not started");
  const r = spawnSync("bash", [path.join(repo, "tools/serve.sh"), "start", String(port), dist], { cwd: repo, env: env ?? baseEnv(), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 30_000 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (/already served/.test(r.stdout ?? "")) throw new Error(`serve.sh: port ${port} already has a live server in ${repo}/.serve (not started by this adapter); refusing to use it`);
  if (r.status !== 0) throw new Error(`serve.sh start ${port} ${dist} exited ${r.status}: ${lastLines(out)}`);
  const warning = (r.stdout ?? "").match(/^warning: .*$/m)?.[0] ?? null; // "dist has N lesson pages, the tree has M"
  const url = `http://127.0.0.1:${port}`;
  while (Date.now() - t0 < timeoutMs) {
    try {
      const res = await fetch(url + "/", { signal: AbortSignal.timeout(5000) });
      if (res.ok) return { url, port, ms: Date.now() - t0, warning };
    } catch {}
    if (!pidAlive(repo, port)) throw new Error(`next start on ${port} exited; see ${repo}/.serve/${port}.log: ${lastLines(readTail(path.join(repo, ".serve", `${port}.log`)))}`);
    await new Promise((res) => setTimeout(res, 400));
  }
  throw new Error(`next start on ${port} did not answer within ${Math.round(timeoutMs / 1000)} s`);
}

function readTail(p) {
  try {
    return fs.readFileSync(p, "utf8").slice(-2000);
  } catch {
    return "";
  }
}

export function pidAlive(repo, port) {
  try {
    process.kill(Number(fs.readFileSync(path.join(repo, ".serve", `${port}.pid`), "utf8")), 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * `tools/serve.sh stop <port>`, only when this repo's .serve/<port>.pid exists: without a pid file serve.sh stop
 * kills whatever listens on the port (its socket-inode fallback), which may be someone else's server.
 */
export function serveStop(repo, port) {
  if (!fs.existsSync(path.join(repo, ".serve", `${port}.pid`))) return { stopped: false, why: "no pid file" };
  const r = spawnSync("bash", [path.join(repo, "tools/serve.sh"), "stop", String(port)], { cwd: repo, encoding: "utf8", timeout: 15_000 });
  return { stopped: r.status === 0, out: (r.stdout ?? "").trim() };
}

// ------------------------------------------------------------------ cleanup on SIGTERM / SIGINT (K2 job timeout)

const cleanups = [];
export function onExit(fn) {
  cleanups.push(fn);
}
let installed = false;
/**
 * On SIGTERM/SIGINT/SIGHUP: stop starting things, send every live step its stopSignal, wait up to GRACE_MS for the
 * groups to close (so playwright can stop its own webServer), SIGKILL what is left, run the onExit cleanups
 * (serve.sh stop, the qa port sweep), emit the stage-error line, exit 3. A second signal skips the grace.
 * Before review 2026-10-22 finding 3 this SIGKILLed at once, which left playwright's `next start` on QA_PORT.
 */
export function installSignalCleanup(emit) {
  if (installed) return;
  installed = true;
  const finish = (sig) => {
    for (const c of live) killGroup(c, "SIGKILL");
    const notes = [];
    for (const fn of cleanups.splice(0)) {
      try {
        const r = fn();
        if (r?.killed?.length) notes.push(`killed ${r.killed.length} leftover listener(s) on port ${r.port}`);
      } catch {}
    }
    emit?.({ ok: false, findings: [F.env("signal", `adapter received ${sig}; steps stopped (${sig === "again" ? "forced" : `grace ${GRACE_MS / 1000} s`}) and servers stopped${notes.length ? `; ${notes.join("; ")}` : ""}`)] });
    process.exit(3);
  };
  for (const sig of ["SIGTERM", "SIGINT", "SIGHUP"]) {
    process.on(sig, async () => {
      if (stopping) return finish("again");
      stopping = true;
      for (const c of live) killGroup(c, c.stopSignal ?? "SIGTERM");
      const t0 = Date.now();
      while (live.size && Date.now() - t0 < GRACE_MS) await new Promise((r) => setTimeout(r, 100));
      finish(sig);
    });
  }
}

// ------------------------------------------------------------------ port sweep (leftover listeners)

/** pids listening on TCP `port` (any address), from /proc/net/tcp{,6} socket inodes and /proc/<pid>/fd. Linux. */
export function portListeners(port) {
  const inodes = new Set();
  for (const f of ["/proc/net/tcp", "/proc/net/tcp6"]) {
    let text = "";
    try {
      text = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const line of text.split("\n").slice(1)) {
      const c = line.trim().split(/\s+/);
      if (c.length > 9 && c[3] === "0A" && parseInt(c[1].split(":")[1], 16) === port) inodes.add(c[9]); // 0A = LISTEN
    }
  }
  if (!inodes.size) return [];
  const pids = [];
  for (const d of fs.readdirSync("/proc")) {
    if (!/^\d+$/.test(d)) continue;
    let fds = [];
    try {
      fds = fs.readdirSync(`/proc/${d}/fd`);
    } catch {
      continue;
    }
    for (const fd of fds) {
      let l = "";
      try {
        l = fs.readlinkSync(`/proc/${d}/fd/${fd}`);
      } catch {
        continue;
      }
      const m = l.match(/^socket:\[(\d+)\]$/);
      if (m && inodes.has(m[1])) {
        pids.push(Number(d));
        break;
      }
    }
  }
  return pids;
}

const pgidOf = (pid) => {
  try {
    return Number(fs.readFileSync(`/proc/${pid}/stat`, "utf8").split(") ").at(-1).split(" ")[2]);
  } catch {
    return null;
  }
};
const sleepSync = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/**
 * Kills whatever still listens on `port`, but only processes whose cwd is `underDir` or below it (the repo under
 * test: playwright's webServer runs `npx next start` with cwd = the config dir), so a stranger's server on a reused
 * port is never touched. The listener's whole process group gets SIGTERM, then SIGKILL after up to 3 s; never our
 * own group. Used after the playwright step and on a signal (review 2026-10-22 finding 3: K5 gives each order a
 * fixed QA_PORT, so a leftover makes the next qa run fail its port preflight). Returns {port, killed: [pid]}.
 */
export function killPortListeners(port, underDir) {
  const root = fs.realpathSync(underDir);
  const own = pgidOf(process.pid);
  const killed = [];
  for (const pid of portListeners(port)) {
    if (pid === process.pid) continue;
    let cwd = "";
    try {
      cwd = fs.realpathSync(`/proc/${pid}/cwd`);
    } catch {
      continue;
    }
    if (cwd !== root && !cwd.startsWith(root + path.sep)) continue;
    const pg = pgidOf(pid);
    const target = pg && pg !== own && pg > 1 ? -pg : pid;
    try {
      process.kill(target, "SIGTERM");
      killed.push(pid);
    } catch {}
    for (let i = 0; i < 30 && portListeners(port).includes(pid); i++) sleepSync(100);
    try {
      if (portListeners(port).includes(pid)) process.kill(target, "SIGKILL");
    } catch {}
  }
  return { port, killed };
}

export function duBytes(p) {
  const r = spawnSync("du", ["-sk", p], { encoding: "utf8" });
  const k = Number((r.stdout ?? "").split(/\s/)[0]);
  return Number.isFinite(k) && r.status === 0 ? k * 1024 : null;
}

export function sha256File(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}
