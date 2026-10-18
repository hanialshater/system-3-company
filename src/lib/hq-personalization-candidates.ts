// HQ Personalization Lab, frozen candidates (W-1648; batch 5 §20, company/personalization/batches/2026-10-17-batch-5.md).
// Types for the precomputed candidate documents (schema personalization-hq-candidate-v1, written by
// tools/hq-lab-candidates.mjs through tools/hq-lab-precompute.mjs), the labels §20 requires, and RC's draft reason
// lines. Pure: no node APIs, no imports; safe in server components, the generator and tests.
//
// SIMULATED PERSONAS ONLY. Nothing here reaches the website feed. Showing a candidate in HQ decides nothing.
// Never stored or shown: rank's numeric reason fields (§17.1, §20.2), any eval harness output, any K6/K7/R4/R5 number.

/** §20.2 as changed at G (§21.4 item 2), verbatim: on every candidate view and in the manifest. */
export const CANDIDATE_LABEL = "Not live. Website go/no-go: NO-GO (company/decisions/2026-10-17-vp-personalization-readout-3b-g.md). Simulated personas only. Lab simulator, not the eval's scored world.";
export const G_RECORD = "company/decisions/2026-10-17-vp-personalization-readout-3b-g.md";
/** §20.1 (b), verbatim. */
export const DRAFT_LINES_LABEL = "draft reason lines, not shown to any learner";
/** §20.1 (b): L3's wording is still open. */
export const L3_PENDING = "wording pending (W-1642)";
export const RC_RECORD = "company/personalization/copy/2026-10-17-reason-lines-rc.md";

/** The frozen candidates the lab may show (§20.2). Any other reachable-* file stays out (v1 included). */
export const CANDIDATES = {
  "reachable-v2": { file: "company/personalization/policies/reachable-v2.ts", sha256: "2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714", hasMoves: false },
  "reachable-v3": { file: "company/personalization/policies/reachable-v3.ts", sha256: "53981ab02a240900a5fa2c9c1d62a1e0c49a9add07a3a35c26656f0a8e01c195", hasMoves: true },
} as const;
export type CandidateName = keyof typeof CANDIDATES;
export const CANDIDATE_NAMES = Object.keys(CANDIDATES) as CandidateName[];

export type LineId = "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | "L7";
export type RcLine = { id: LineId; key: string; title: "none" | "finishedOnConcept" | "finishedOnPassedConcepts"; template: string };
/** RC record §2 table, verbatim (tests/hq/personalization-candidates.test.mjs checks each template is in the file). */
export const RC_LINES: RcLine[] = [
  { id: "L1", key: "earlier:prerequisites", title: "none", template: "This lesson moved ahead of some lessons that build on other lessons." },
  { id: "L2", key: "later:prerequisites", title: "none", template: "Some lessons moved ahead of this one. This one builds on other lessons." },
  { id: "L3", key: "earlier:concept-known", title: "finishedOnConcept", template: "This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea." },
  { id: "L4", key: "later:concept-known", title: "finishedOnConcept", template: "Some lessons moved ahead of this one. You've finished {title}, which is on the same idea." },
  { id: "L5", key: "earlier:refresh", title: "finishedOnConcept", template: "This lesson moved ahead of some lessons. You've finished {title}, which is on the same idea." },
  { id: "L6", key: "later:refresh", title: "none", template: "Some lessons that share an idea with a lesson you've finished moved ahead of this one." },
  { id: "L7", key: "earlier:passed-known", title: "finishedOnPassedConcepts", template: "This lesson moved ahead of some lessons that share an idea with {title}, a lesson you've finished." },
];
export const lineFor = (key: string): RcLine | undefined => RC_LINES.find((l) => l.key === key);

/** v3's `moves` entry for one card, as stored: key, direction, the named lesson. No number. */
export type StoredMove = {
  moved: boolean; direction: "earlier" | "later" | null; code: string | null;
  key: string | null; line: LineId | null; named: string | null; namedTitle: string | null;
};
export type StoredRow = { slug: string; title: string; rankPos: number; defaultPos: number; rankCode: string; versus: string | null; move?: StoredMove };
export type StoredStep =
  | { step: number; day: number; kind: "new"; served: string; servedTitle: string; defaultCard: string | null; moved: boolean; rankCode: string; versus: string | null; move?: StoredMove }
  | { step: number; day: number; kind: "revisit"; slug: string };
export type CandidateDoc = {
  schema: "personalization-hq-candidate-v1"; label: string; simulatedOnly: string;
  candidate: { name: CandidateName; version: string; file: string; sha256: string; hasMoves: boolean };
  persona: { id: string; name: string };
  run: { seed: number; days: number; simulator: string; adapter: string; notes: string[] };
  start: { preHistory: number; rows: StoredRow[] };
  steps: StoredStep[];
};
export type CandidateEntry = { persona: string; policy: CandidateName; seed: number; days: number; file: string };

/** The line RC's key would render for a stored move, or null when there is no key. A3-2 (batch 5 §18.2): an
 *  `earlier:refresh` move with no named lesson renders the first sentence alone, never a title from another field. */
export function renderLine(m: StoredMove | undefined): { id: LineId; text: string; pending: boolean } | null {
  if (!m || !m.key || !m.line) return null;
  const l = lineFor(m.key);
  if (!l || l.id !== m.line) return null;
  let text = l.template;
  if (l.title !== "none") {
    if (m.namedTitle) text = text.replace("{title}", m.namedTitle);
    else if (l.id === "L5") text = text.split(". ")[0] + ".";
    else return null;
  }
  return { id: l.id, text, pending: l.id === "L3" };
}
