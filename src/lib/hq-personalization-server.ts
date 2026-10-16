// HQ simulation lab, server side (W-1503). Decision W-1498 (company/personalization/model/README.md,
// "Where the model lives"): the app does not import the personalization model or simulator. It runs the
// simulator's JSON CLI as a separate Node process and reads one JSON document from stdout. This is the only
// file in src/ allowed to name that folder; the model's self-check enforces it and forbids imports.
//
// Local only: the simulator is never run in production, not even with HQ_PUBLIC=1 (it spawns a process and
// its files are not part of the deployed bundle). Simulated personas only; no learner data is read.
//
// Hardening (W-1530; company/reviews/hq/2026-10-16-w1503-review.md findings 3 and 5):
// - one simulator process in flight per module instance (Next bundles the page and the API route separately,
//   so in practice one per route). An identical request joins the running one; a different one is refused
//   with BUSY instead of stacking processes.
// - `meta` is cached for the process lifetime, keyed on the newest mtime under the model folder (out/ skipped)
//   plus the mtime of sim/out/traces (meta lists the saved traces).
// - the child gets only the environment it needs (CHILD_ENV), not a copy of the server's.
import { execFile } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { cliArgs, type SimRequest } from "./hq-personalization";

export const SIM_CLI = "company/personalization/model/sim/hq-cli.mjs";
const MODEL_DIR = "company/personalization/model";
const TRACES_DIR = "company/personalization/model/sim/out/traces";
export const simLocal = () => process.env.NODE_ENV !== "production";

export type SimResult<T> = { ok: true; data: T } | { ok: false; error: string };
export const BUSY = "Another simulation is still running in this server; wait for it to finish, then try again.";

/** The CLI reads no environment variables (grep of company/personalization/model: no process.env). It is
 *  started as process.execPath with an absolute script path, so it needs no PATH either. */
export const CHILD_ENV: Readonly<Record<string, string>> = Object.freeze({ NODE_NO_WARNINGS: "1" });

let inFlight: { key: string; p: Promise<SimResult<unknown>> } | null = null;
let metaCache: { root: string; stamp: string; result: SimResult<unknown> } | null = null;

/** Newest mtime under the model folder (skipping out/ and node_modules), plus the saved-traces folder's mtime. */
export function modelStamp(root = process.cwd()): string {
  let newest = 0;
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name === "out" || e.name === "node_modules") continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else newest = Math.max(newest, statSync(p).mtimeMs);
    }
  };
  try { walk(path.join(root, MODEL_DIR)); } catch { return "unreadable"; }
  let traces = 0;
  try { traces = statSync(path.join(root, TRACES_DIR)).mtimeMs; } catch { /* no saved traces yet */ }
  return `${newest}:${traces}`;
}

function spawnSim<T>(req: SimRequest, root: string, timeoutMs: number): Promise<SimResult<T>> {
  return new Promise((resolve) => {
    execFile(process.execPath, [path.join(root, SIM_CLI), ...cliArgs(req)],
      { cwd: root, timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024, env: { ...CHILD_ENV } as unknown as NodeJS.ProcessEnv }, // cast: Next types NODE_ENV as required
      (err, stdout, stderr) => {
        let doc: unknown = null;
        try { doc = stdout ? JSON.parse(stdout) : null; } catch { /* reported below */ }
        const docErr = doc && typeof doc === "object" && "error" in doc ? String((doc as { error: unknown }).error) : null;
        if (docErr) return resolve({ ok: false, error: docErr });
        if (err || !doc) return resolve({ ok: false, error: `simulator failed (Node ${process.versions.node}; needs 22.18+): ${(stderr || err?.message || "no output").slice(0, 600)}` });
        resolve({ ok: true, data: doc as T });
      });
  });
}

/** Run one CLI command. Arguments come only from a parsed SimRequest; no shell is used. */
export function runSim<T>(req: SimRequest, root = process.cwd(), timeoutMs = 90_000): Promise<SimResult<T>> {
  if (!simLocal()) return Promise.resolve({ ok: false, error: "The simulation lab runs locally only (npm run dev)." });
  const stamp = req.op === "meta" ? modelStamp(root) : "";
  if (req.op === "meta" && metaCache && metaCache.root === root && metaCache.stamp === stamp) return Promise.resolve(metaCache.result as SimResult<T>);
  const key = JSON.stringify([root, cliArgs(req)]);
  if (inFlight) return (inFlight.key === key ? inFlight.p : Promise.resolve({ ok: false, error: BUSY })) as Promise<SimResult<T>>;
  const p = spawnSim<T>(req, root, timeoutMs).then((r) => {
    if (req.op === "meta" && r.ok) metaCache = { root, stamp, result: r };
    return r;
  }).finally(() => { inFlight = null; });
  inFlight = { key, p };
  return p;
}
