// HQ simulation lab (/hq/personalization, W-1503): types for the documents the simulator's JSON CLI prints,
// request parsing and small view helpers. Pure: no node APIs, safe in client components and tests.
//
// The app never imports the model or the simulator (decision W-1498, see the server file). These types
// mirror the CLI's contract (schemas personalization-hq-meta-v0, personalization-hq-compare-v0 and the
// trace personalization-sim-trace-v0); if the contract changes, the CLI's schema name changes with it.
// SIMULATED PERSONAS ONLY: nothing on this page reads or shows real learner data.

export const NEED_ORDER = ["repair", "build", "breadth", "stretch"] as const;
export const UNSCORED_LABEL = "UNSCORED: no committed criterion; provisional simulated learner";

export type Pt = { x: number; y: number };
export type CurveView = { need: string; signal: string; w: number; why: string; points: Pt[]; privacy: string };
export type SignalView = { signal: string; inputs: string[]; privacy: string };
export type ModelView = {
  version: string; decision: string; pilot: string[]; signals: SignalView[]; curves: CurveView[];
  composer: Record<string, unknown> & { version?: string }; objective: Record<string, unknown>; policies: string[]; forbiddenInputs: unknown[];
};
export type NeedTerm = { signal: string; x: number; y: number; w: number; contribution: number; why?: string };
export type NeedExplanation = { need: string; score: number; raw: number; dampener: number; terms: NeedTerm[] };
export type Fingerprint = Record<string, number | string | string[]>;

export type PersonaView = {
  id: string; name: string; description: string; why: string; source: string;
  fingerprintMeans: Record<string, number>; needsAtMeans: NeedExplanation[];
  groundTruth: { note: string; latent: Record<string, unknown> };
};
export type SessionCoefs = { base: number; onRem: Record<string, number>; onCov: Record<string, number>; slotDecay: number; attentionCost: number };
export type SessionMeta = {
  version: string; size: number; servingMode: string; recompute: string; v1: SessionCoefs; v3: SessionCoefs;
  edits: { target: string; path: string; from: number; to: number; reason: string }[]; why: Record<string, string>;
  ablations: Record<string, string[]>; circularLabel: string;
};
export type SimMeta = {
  schema: "personalization-hq-meta-v0"; unscored: string; criterion: string; provisional: string; simulatedOnly: string;
  modelVersion: string; personasVersion: string; composerVersion: string; decision: string;
  model: ModelView; personas: PersonaView[];
  policies: { model: string[]; all: string[]; ablations: Record<string, string[]>; session?: Record<string, { variant: "v1" | "v3"; off: string[] }> };
  /** model-v0.3.0: the session composer's coefficients, v1 and v3, and the v3 edit table. Absent in a stale precomputed meta. */
  session?: SessionMeta;
  sim: Record<string, unknown> & { defaultDays: number };
  saved: string[];
  /** Present only when the server serves committed precomputed runs (production, or HQ_LAB_PRECOMPUTED=1). */
  precomputed?: PrecomputedInfo;
};

/** What a precomputed lab can serve (src/data/hq-personalization/manifest.json minus the file hashes). */
export type PrecomputedInfo = {
  schema: "personalization-hq-precomputed-v1";
  inputsCommit: string; inputsCommitDate: string; command: string;
  modelVersion: string; personasVersion: string;
  personas: string[]; policies: string[]; seeds: number[]; days: number;
  compare: { seeds: number; days: number; sets: ("main" | "all")[]; scopes: string[] };
};

export type ScoreTerm = { name: string; value: number };
export type Candidate = { slug: string; concept: string; domain: string; level: string; score: number; terms: ScoreTerm[]; eligibleToMove: boolean; note?: string };
export type SlotTrace = {
  slot: number; kind: "due-revisit" | "new"; defaultCard: string | null; defaultScore: number | null; constraint: string | null;
  candidates: Candidate[]; candidatesConsidered: number; winner: string | null; moved: boolean; reason: string; margin: number | null;
  rejected: { slug: string; why: string }[]; remainingBefore?: Record<string, number>; remainingAfter?: Record<string, number>; engagementFloor?: string;
};
export type NewStep = {
  step: number; day: number; kind: "new"; fingerprint: Fingerprint; needs: NeedExplanation[]; personalised: boolean; note: string;
  slots: SlotTrace[]; served: string; moved: boolean; reason: string; shownBeforePrerequisites: boolean;
  simulated: { predictedRight: boolean; revealed: boolean; stopped: boolean; firstRecall: boolean | null };
};
export type RevisitStep = { step: number; day: number; kind: "revisit"; slug: string; recalled: boolean };
export type Step = NewStep | RevisitStep;
export type EpisodeScore = { recall: number | null; nRecalls: number; domains: number; concepts: number; prereqFirst: number; reveal: number | null; gain: number; cards: number; movedShare: number };
export type SimTrace = {
  schema: "personalization-sim-trace-v0"; modelVersion: string; composer: string; provisional: string; criterion: string; label: string;
  persona: { id: string; name: string; fingerprintMeans: Record<string, number>; jitteredMeans: Record<string, number>; homeDomain: string };
  groundTruth: { note: string; latent: Record<string, unknown>; params: Record<string, unknown> };
  initialFingerprint: Fingerprint; preHistoryCount: number; steps: Step[]; score: EpisodeScore;
  run: { persona: string; policy: string; seed: number; days: number | null; source: string };
  model: ModelView;
};
export type CompareRow = { policy: string; episodes: number; recall: number | null; recallSd: number | null; recallSe: number | null;
  concepts: number; domains: number; prereqFirst: number; reveal: number | null; gain: number; movedShare: number; cards: number;
  /** EDP-style diagnostics, graded by the model's own beliefs. Always shown with its label, never a pass score. Absent in a stale document. */
  circular?: { label: string; needCoverageRate: number | null; domainDiversity: number | null; distinctDomainsServed: number | null } };
export type SimCompare = { schema: "personalization-hq-compare-v0"; unscored: string; provisional: string; modelVersion: string;
  personas: string[]; seeds: number; days: number; set: string; ms: number; rows: CompareRow[]; columns: Record<string, string>; circularLabel?: string };

// ---- requests (the only arguments the HQ server will pass to the CLI) ----

export type SimRequest =
  | { op: "meta" }
  | { op: "run"; persona: string; policy: string; seed: number; days: number }
  | { op: "saved"; file: string }
  | { op: "compare"; persona: string; seeds: number; set: "main" | "all"; days: number }
  | { op: "sandbox"; persona: string; variant: "v1" | "v3"; seed: number };

const ID = /^[a-z0-9-]{1,48}$/;
const SAVED = /^[a-z0-9-]+\.[a-z0-9-]+\.seed\d{1,3}\.json$/;
const intIn = (v: string | null, d: number, lo: number, hi: number): number | null => {
  if (v === null || v === "") return d;
  const n = Number(v);
  return Number.isInteger(n) && n >= lo && n <= hi ? n : null;
};

/** Parse query parameters into a request, or an error string. Membership (persona, policy) is the CLI's check. */
export function parseSimRequest(q: { get(k: string): string | null }): SimRequest | string {
  const op = q.get("op");
  if (op === "meta") return { op };
  if (op === "saved") {
    const file = q.get("file") ?? "";
    return SAVED.test(file) ? { op, file } : "file must look like <persona>.<policy>.seed<k>.json";
  }
  const persona = q.get("persona") ?? "";
  const days = intIn(q.get("days"), 7, 1, 14);
  if (days === null) return "days must be an integer 1..14";
  if (op === "run") {
    const policy = q.get("policy") ?? "";
    const seed = intIn(q.get("seed"), 1, 1, 999);
    if (!ID.test(persona)) return "persona must be an id";
    if (!ID.test(policy)) return "policy must be an id";
    if (seed === null) return "seed must be an integer 1..999";
    return { op, persona, policy, seed, days };
  }
  if (op === "compare") {
    const seeds = intIn(q.get("seeds"), 5, 1, 10);
    const set = q.get("set") ?? "main";
    if (persona !== "all" && !ID.test(persona)) return "persona must be an id or all";
    if (seeds === null) return "seeds must be an integer 1..10";
    if (set !== "main" && set !== "all") return "set must be main or all";
    return { op, persona, seeds, set, days };
  }
  if (op === "sandbox") {
    const variant = q.get("variant") ?? "";
    const seed = intIn(q.get("seed"), 1, 1, 999);
    if (!ID.test(persona)) return "persona must be an id";
    if (variant !== "v1" && variant !== "v3") return "variant must be v1 or v3";
    if (seed === null) return "seed must be an integer 1..999";
    return { op, persona, variant, seed };
  }
  return "op must be meta, run, saved, compare or sandbox";
}

/** The CLI argument vector for a request (no shell is involved; each element is one argv entry). */
export function cliArgs(r: SimRequest): string[] {
  switch (r.op) {
    case "meta": return ["meta"];
    case "saved": return ["saved", `--file=${r.file}`];
    case "run": return ["run", `--persona=${r.persona}`, `--policy=${r.policy}`, `--seed=${r.seed}`, `--days=${r.days}`];
    case "compare": return ["compare", `--persona=${r.persona}`, `--seeds=${r.seeds}`, `--set=${r.set}`, `--days=${r.days}`];
    case "sandbox": return ["sandbox", `--persona=${r.persona}`, `--variant=${r.variant}`, `--seed=${r.seed}`];
  }
}

// ---- view helpers ----

/** Piecewise-linear value through points, flat outside them (the same rule as the model's pwl()). */
export function pwlAt(x: number, pts: Pt[]): number {
  if (!pts.length) return 0;
  if (x <= pts[0].x) return pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    if (x <= pts[i].x) return pts[i - 1].y + ((pts[i].y - pts[i - 1].y) * (x - pts[i - 1].x)) / (pts[i].x - pts[i - 1].x);
  }
  return pts[pts.length - 1].y;
}

/** SVG path for a 0..1 × 0..1 curve drawn in a w × h box (y up), extended flat to x = 0 and x = 1. */
export function curvePath(pts: Pt[], w: number, h: number): string {
  if (!pts.length) return "";
  const all = [...(pts[0].x > 0 ? [{ x: 0, y: pts[0].y }] : []), ...pts, ...(pts[pts.length - 1].x < 1 ? [{ x: 1, y: pts[pts.length - 1].y }] : [])];
  return all.map((p, i) => `${i ? "L" : "M"}${(p.x * w).toFixed(1)},${((1 - p.y) * h).toFixed(1)}`).join(" ");
}

export const fmt = (x: number | null | undefined, d = 3): string => (x === null || x === undefined || Number.isNaN(x) ? "–" : x.toFixed(d));
export const yesNo = (b: boolean | null | undefined, yes = "yes", no = "no", none = "–"): string => (b === null || b === undefined ? none : b ? yes : no);

/** Policies grouped for the selector: the model's list, the one-term ablations, then anything else (baselines). */
export function policyGroups(p: SimMeta["policies"]): { label: string; items: string[] }[] {
  const abl = Object.keys(p.ablations).filter((k) => k !== "gam" && !p.model.includes(k));
  const session = Object.keys(p.session ?? {}).filter((k) => p.all.includes(k));
  const rest = p.all.filter((k) => !p.model.includes(k) && !abl.includes(k) && !session.includes(k));
  return [
    { label: "Model policies (model.ts POLICIES)", items: p.model },
    { label: "GAM ablations (one or more terms off)", items: abl },
    ...(session.length ? [{ label: "Session policies (offline, UNSCORED; model-v0.3.0)", items: session }] : []),
    ...(rest.length ? [{ label: "Other", items: rest }] : []),
  ];
}

/** The selector groups, limited to what a precomputed lab can serve (empty groups dropped). Live: unchanged. */
export function servableGroups(p: SimMeta["policies"], pre: PrecomputedInfo | undefined): { label: string; items: string[] }[] {
  const g = policyGroups(p);
  return pre ? g.map((x) => ({ ...x, items: x.items.filter((i) => pre.policies.includes(i)) })).filter((x) => x.items.length) : g;
}

/** One line naming where precomputed results came from (shown on the page and as a trace's run.source). */
export const precomputedLine = (pre: PrecomputedInfo): string =>
  `precomputed from inputs commit ${pre.inputsCommit} (${pre.inputsCommitDate.slice(0, 10)}, ${pre.modelVersion}), seed ${pre.seeds.join(", ")}, ${pre.days} days`;

/** One-line summary of a timeline step. */
export function stepLine(s: Step): string {
  if (s.kind === "revisit") return `revisit ${s.slug}: ${s.recalled ? "recalled" : "forgot"}`;
  const sim = s.simulated;
  return `${s.served} · ${s.moved ? `moved (${s.reason})` : s.reason} · predicted ${sim.predictedRight ? "right" : "wrong"}` +
    `${sim.revealed ? "" : " · no reveal"}${sim.firstRecall === null ? "" : ` · recall ${sim.firstRecall ? "yes" : "no"}`}${sim.stopped ? " · stopped" : ""}`;
}
