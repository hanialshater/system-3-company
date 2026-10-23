// Benchmark 8 material: paths and process helpers shared by the test builder, the validators and run-hidden.mjs.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import crypto from "node:crypto";

export const SCRATCH_B8 = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8";
export const B8 = path.resolve(process.env.B8_HOME ?? SCRATCH_B8);
export const P = {
  b8: B8,
  toolchain: path.join(B8, "toolchain"),
  cljRun: path.join(B8, "toolchain", "clj-run"),
  spec: path.join(B8, "spec"),
  inc: path.join(B8, "spec", "include"),
  bench: path.join(B8, "spec", "bench"),
  visible: path.join(B8, "visible"),
  hidden: path.join(B8, "hidden"),
  upstream: path.join(B8, "hidden", "upstream"),
  work: path.join(B8, "hidden", "work"),
  tests: path.join(B8, "hidden", "tests"),
  hbench: path.join(B8, "hidden", "bench"),
  manifest: path.join(B8, "hidden", "manifest.json"),
  tmp: path.join(B8, ".tmp"),
};

export const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");

// run a command; resolves {code, signal, stdout, stderr, ms, timedOut, overflow}
export function run(cmd, args, { cwd, timeout = 10000, env, input, maxOut = 1 << 20 } = {}) {
  return new Promise((resolve) => {
    const t0 = process.hrtime.bigint();
    const ch = spawn(cmd, args, { cwd, env: env ?? process.env, stdio: ["pipe", "pipe", "pipe"], detached: true });
    let out = [], outLen = 0, err = [], errLen = 0, timedOut = false, overflow = false;
    const kill = () => { try { process.kill(-ch.pid, "SIGKILL"); } catch { try { ch.kill("SIGKILL"); } catch {} } };
    const timer = setTimeout(() => { timedOut = true; kill(); }, timeout);
    ch.stdout.on("data", (d) => { outLen += d.length; if (outLen > maxOut) { overflow = true; kill(); } else out.push(d); });
    ch.stderr.on("data", (d) => { if (errLen < 65536) { err.push(d); errLen += d.length; } });
    ch.on("error", () => {});
    ch.stdin.on("error", () => {});
    if (input != null) ch.stdin.end(input); else ch.stdin.end();
    ch.on("close", (code, signal) => {
      clearTimeout(timer);
      const ms = Number(process.hrtime.bigint() - t0) / 1e6;
      resolve({ code, signal, stdout: Buffer.concat(out).toString("latin1"), stderr: Buffer.concat(err).toString("utf8"), ms, timedOut, overflow });
    });
  });
}

// the exit status a shell would report (128+signal for a signal)
export const status = (r) => (r.signal ? 128 + ({ SIGABRT: 6, SIGSEGV: 11, SIGFPE: 8, SIGKILL: 9, SIGBUS: 7, SIGILL: 4, SIGTRAP: 5 }[r.signal] ?? 64) : r.code);

export async function pool(items, n, fn, onDone) {
  let i = 0, done = 0;
  const results = new Array(items.length);
  const worker = async () => { while (i < items.length) { const k = i++; results[k] = await fn(items[k], k); done++; onDone?.(done, items.length); } };
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return results;
}

export const mkdirp = (d) => fs.mkdirSync(d, { recursive: true });
export const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
export const writeJson = (f, v) => { mkdirp(path.dirname(f)); fs.writeFileSync(f, JSON.stringify(v, null, 1) + "\n"); };
export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
export const geomean = (xs) => Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length);
