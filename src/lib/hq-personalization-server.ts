// HQ simulation lab, server side (W-1503). Decision W-1498 (company/personalization/model/README.md,
// "Where the model lives"): the app does not import the personalization model or simulator. It runs the
// simulator's JSON CLI as a separate Node process and reads one JSON document from stdout. This is the only
// file in src/ allowed to name that folder; the model's self-check enforces it and forbids imports.
//
// Local only: the simulator is never run in production, not even with HQ_PUBLIC=1 (it spawns a process and
// its files are not part of the deployed bundle). Simulated personas only; no learner data is read.
import { execFile } from "node:child_process";
import path from "node:path";
import { cliArgs, type SimRequest } from "./hq-personalization";

export const SIM_CLI = "company/personalization/model/sim/hq-cli.mjs";
export const simLocal = () => process.env.NODE_ENV !== "production";

export type SimResult<T> = { ok: true; data: T } | { ok: false; error: string };

/** Run one CLI command. Arguments come only from a parsed SimRequest; no shell is used. */
export function runSim<T>(req: SimRequest, root = process.cwd(), timeoutMs = 90_000): Promise<SimResult<T>> {
  if (!simLocal()) return Promise.resolve({ ok: false, error: "The simulation lab runs locally only (npm run dev)." });
  return new Promise((resolve) => {
    execFile(process.execPath, [path.join(root, SIM_CLI), ...cliArgs(req)],
      { cwd: root, timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024, env: { ...process.env, NODE_NO_WARNINGS: "1" } },
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
