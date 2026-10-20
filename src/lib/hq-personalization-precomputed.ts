// HQ simulation lab, precomputed mode (W-1572 H1; company/personalization/batches/2026-10-17-batch-5.md).
// A released HQ build (NODE_ENV=production, HQ_PUBLIC=1) never runs the simulator. It serves only the committed
// files in src/data/hq-personalization/, written locally by `node tools/hq-lab-precompute.mjs` from the
// simulator's JSON CLI (format: that folder's README.md).
//
// This module spawns nothing, writes nothing, and reads only files that manifest.json lists, inside that one
// folder, each checked against its sha256 in the manifest. Anything missing, damaged or of the wrong shape
// fails closed with a plain message; it never falls back to a live run.
// SIMULATED PERSONAS ONLY: the stored documents are simulator output for the personas in personas.ts.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import { precomputedLine, type PrecomputedInfo, type SimMeta, type SimRequest } from "./hq-personalization";
import { CANDIDATES, CANDIDATE_LABEL, type CandidateDoc, type CandidateEntry } from "./hq-personalization-candidates";

export const PRECOMPUTED_DIR = "src/data/hq-personalization";
export const REGENERATE = "node tools/hq-lab-precompute.mjs";
const FILE = /^(?:meta\.json|runs\/[a-z0-9-]+\.[a-z0-9-]+\.seed\d{1,3}\.days\d{1,2}\.json\.gz|compare\/[a-z0-9-]+\.(?:main|all)\.seeds\d{1,2}\.days\d{1,2}\.json|sandbox\/[a-z0-9-]+\.v[13]\.seed\d{1,3}\.json\.gz|candidates\/[a-z0-9-]+\.reachable-v[23]\.seed\d{1,3}\.days\d{1,2}\.json\.gz)$/;

type Res<T> = { ok: true; data: T } | { ok: false; error: string };
type Entry = { persona: string; policy?: string; set?: string; seed?: number; seeds?: number; days: number; file: string };
type SandboxEntry = { persona: string; variant: string; seed: number; file: string };
type Manifest = PrecomputedInfo & { runs: Entry[]; sandboxes?: SandboxEntry[]; compares: Entry[]; files: Record<string, string>; candidates?: (CandidateEntry & { sha256: string })[]; candidateLabel?: string };
type Index = { manifest: Manifest; meta: SimMeta };

class LabDataError extends Error {}
const damaged = (why: string) => new LabDataError(why);
export const unavailable = (why: string) =>
  `The precomputed lab data is unavailable (${why}). Nothing was run. Regenerate it locally with \`${REGENERATE}\` and commit ${PRECOMPUTED_DIR}/.`;

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const strs = (v: unknown) => Array.isArray(v) && v.every((x) => typeof x === "string");

function readListed(root: string, files: Record<string, string>, rel: string): Buffer {
  if (!FILE.test(rel) || !Object.hasOwn(files, rel)) throw damaged(`${rel} is not listed in manifest.json`);
  let buf: Buffer;
  try { buf = readFileSync(path.join(root, PRECOMPUTED_DIR, rel)); } catch { throw damaged(`${rel} is missing`); }
  if (createHash("sha256").update(buf).digest("hex") !== files[rel]) throw damaged(`${rel} does not match its hash in manifest.json`);
  return buf;
}

function parse(buf: Buffer, rel: string, gz = false): unknown {
  try { return JSON.parse((gz ? gunzipSync(buf) : buf).toString("utf8")); } catch { throw damaged(`${rel} is not readable JSON`); }
}

const cache = new Map<string, Index>();

function loadIndex(root: string): Index {
  const hit = cache.get(root);
  if (hit) return hit;
  let raw: string;
  try { raw = readFileSync(path.join(root, PRECOMPUTED_DIR, "manifest.json"), "utf8"); } catch { throw damaged("manifest.json is missing"); }
  let m: unknown;
  try { m = JSON.parse(raw); } catch { throw damaged("manifest.json is not readable JSON"); }
  if (!isObj(m) || m.schema !== "personalization-hq-precomputed-v1") throw damaged("manifest.json has an unknown schema");
  if (!isObj(m.files) || !Object.values(m.files).every((h) => typeof h === "string" && /^[0-9a-f]{64}$/.test(h))) throw damaged("manifest.json has no valid file hashes");
  if (!strs(m.personas) || !strs(m.policies) || !Array.isArray(m.runs) || !Array.isArray(m.compares) || !isObj(m.compare)
    || typeof m.inputsCommit !== "string" || typeof m.inputsCommitDate !== "string" || typeof m.days !== "number" || !Array.isArray(m.seeds))
    throw damaged("manifest.json is missing a field");
  const manifest = m as unknown as Manifest;
  const meta = parse(readListed(root, manifest.files, "meta.json"), "meta.json");
  if (!isObj(meta) || meta.schema !== "personalization-hq-meta-v0" || !Array.isArray(meta.personas) || !isObj(meta.policies) || !isObj(meta.model))
    throw damaged("meta.json is not a lab meta document");
  const idx = { manifest, meta: meta as unknown as SimMeta };
  cache.set(root, idx);
  return idx;
}

/** The manifest without its file hashes and entry lists: what the page needs to offer only servable choices. */
function info(m: Manifest): PrecomputedInfo {
  return { schema: m.schema, inputsCommit: m.inputsCommit, inputsCommitDate: m.inputsCommitDate, command: m.command,
    modelVersion: m.modelVersion, personasVersion: m.personasVersion, personas: m.personas, policies: m.policies, seeds: m.seeds, days: m.days,
    compare: m.compare };
}

/** Serve one lab request from the committed files. Never runs anything; unknown or damaged data fails closed. */
export function readPrecomputed<T>(req: SimRequest, root = process.cwd()): Res<T> {
  try {
    const { manifest, meta } = loadIndex(root);
    const pre = info(manifest);
    if (req.op === "meta") return { ok: true, data: { ...meta, saved: [], precomputed: pre } as T };
    if (req.op === "saved") return { ok: false, error: "Saved simulator traces are local only (npm run dev); this lab serves precomputed runs." };
    if (req.op === "sandbox") {
      const e = manifest.sandboxes?.find((x) => x.persona === req.persona && x.variant === req.variant && x.seed === req.seed);
      if (!e) return { ok: false, error: `Not precomputed: session sandbox for ${req.persona} · ${req.variant} · seed ${req.seed}. This lab serves ${(manifest.sandboxes ?? []).length} sandbox documents (${pre.personas.length} simulated personas × v1, v3 × seed ${pre.seeds.join(", ")}); regenerate with \`${REGENERATE}\` if none are stored.` };
      const d = parse(readListed(root, manifest.files, e.file), e.file, true);
      if (!isObj(d) || d.schema !== "personalization-hq-sandbox-v0" || !isObj(d.persona) || d.persona.id !== req.persona || d.variant !== req.variant || d.seed !== req.seed
        || !Array.isArray(d.candidates) || !isObj(d.needShapes) || !isObj(d.composed)) throw damaged(`${e.file} is not the sandbox document it is listed as`);
      return { ok: true, data: d as T };
    }
    if (req.op === "run") {
      const e = manifest.runs.find((r) => r.persona === req.persona && r.policy === req.policy && r.seed === req.seed && r.days === req.days);
      if (!e) return { ok: false, error: `Not precomputed: ${req.persona} · ${req.policy} · seed ${req.seed} · ${req.days} days. This lab serves ${precomputedLine(pre)}, for the policies listed; run the lab locally (npm run dev) for anything else.` };
      const t = parse(readListed(root, manifest.files, e.file), e.file, true);
      if (!isObj(t) || t.schema !== "personalization-sim-trace-v0" || !Array.isArray(t.steps) || !isObj(t.run) || !isObj(t.persona)
        || t.run.persona !== req.persona || t.run.policy !== req.policy || t.run.seed !== req.seed) throw damaged(`${e.file} is not the trace it is listed as`);
      return { ok: true, data: { ...t, run: { ...t.run, source: precomputedLine(pre) } } as T };
    }
    const e = manifest.compares.find((c) => c.persona === req.persona && c.set === req.set && c.seeds === req.seeds && c.days === req.days);
    if (!e) return { ok: false, error: `Not precomputed: comparison for ${req.persona} · ${req.set} · ${req.seeds} seeds · ${req.days} days. This lab serves comparisons at ${pre.compare.seeds} seeds and ${pre.compare.days} days only; run the lab locally (npm run dev) for anything else.` };
    const c = parse(readListed(root, manifest.files, e.file), e.file);
    if (!isObj(c) || c.schema !== "personalization-hq-compare-v0" || !Array.isArray(c.rows)) throw damaged(`${e.file} is not a comparison document`);
    return { ok: true, data: c as T };
  } catch (err) {
    if (err instanceof LabDataError) return { ok: false, error: unavailable(err.message) };
    return { ok: false, error: unavailable("unexpected read error") };
  }
}

/** The frozen candidates the committed data holds (batch 5 §20.2): entries whose policy and sha256 are the allowlisted
 *  ones, under the §20.2 label. Anything else in the manifest is ignored, never served. */
export function candidateEntries(root = process.cwd()): Res<CandidateEntry[]> {
  try {
    const { manifest } = loadIndex(root);
    if (manifest.candidateLabel !== CANDIDATE_LABEL) throw damaged("manifest.json does not carry the candidate label");
    const ok = (manifest.candidates ?? []).filter((c) => Object.hasOwn(CANDIDATES, c.policy) && CANDIDATES[c.policy].sha256 === c.sha256)
      .map(({ persona, policy, seed, days, file }) => ({ persona, policy, seed, days, file }));
    return { ok: true, data: ok };
  } catch (err) {
    return { ok: false, error: unavailable(err instanceof LabDataError ? err.message : "unexpected read error") };
  }
}

/** One candidate document from the committed files (never a run; production and local alike). */
export function readCandidate(persona: string, policy: string, root = process.cwd()): Res<CandidateDoc> {
  try {
    const list = candidateEntries(root);
    if (!list.ok) return list;
    const { manifest } = loadIndex(root);
    const e = list.data.find((c) => c.persona === persona && c.policy === policy);
    if (!e) return { ok: false, error: `Not precomputed: ${policy} for ${persona}. The lab shows reachable-v2 and reachable-v3 on the six simulated personas only.` };
    const d = parse(readListed(root, manifest.files, e.file), e.file, true);
    if (!isObj(d) || d.schema !== "personalization-hq-candidate-v1" || d.label !== CANDIDATE_LABEL || !isObj(d.candidate) || !isObj(d.persona) || !Array.isArray(d.steps)
      || d.candidate.name !== policy || d.persona.id !== persona || d.candidate.sha256 !== CANDIDATES[policy as keyof typeof CANDIDATES].sha256) throw damaged(`${e.file} is not the candidate document it is listed as`);
    return { ok: true, data: d as unknown as CandidateDoc };
  } catch (err) {
    return { ok: false, error: unavailable(err instanceof LabDataError ? err.message : "unexpected read error") };
  }
}

/** Test seam: forget cached indexes (the cache lives for the process; committed data does not change at run time). */
export function clearPrecomputedCache() { cache.clear(); }
