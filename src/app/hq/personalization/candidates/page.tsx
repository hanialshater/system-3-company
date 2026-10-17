import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import { CANDIDATE_NAMES } from "@/lib/hq-personalization-candidates";
import { candidateEntries, readCandidate, readPrecomputed } from "@/lib/hq-personalization-precomputed";
import type { SimMeta } from "@/lib/hq-personalization";
import Candidates from "./Candidates";

export const dynamic = "force-dynamic";
export const metadata = { title: "Frozen candidates — Personalization lab — System 3 HQ" };

// Links: /hq/personalization/candidates?persona=<id>&policy=reachable-v2|reachable-v3[&rows=all]
// Committed precomputed documents only (W-1648; batch 5 §20.2), locally and in production: nothing is run.
export default async function CandidatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const list = candidateEntries();
  const meta = readPrecomputed<SimMeta>({ op: "meta" });
  const ids = list.ok ? [...new Set(list.data.map((e) => e.persona))] : [];
  const names = new Map((meta.ok ? meta.data.personas : []).map((p) => [p.id, p.name]));
  const personas = ids.map((id) => ({ id, name: names.get(id) ?? id }));
  const persona = ids.includes(one(q.persona)) ? one(q.persona) : ids[0] ?? "";
  const policy = (CANDIDATE_NAMES as string[]).includes(one(q.policy)) ? one(q.policy) : "reachable-v3";
  const doc = list.ok && persona ? readCandidate(persona, policy) : null;
  const error = !list.ok ? list.error : !doc ? "No candidate documents are committed." : doc.ok ? null : doc.error;
  return (
    <Candidates doc={doc && doc.ok ? doc.data : null} error={error} personas={personas} persona={persona} policy={policy} all={one(q.rows) === "all"} />
  );
}
