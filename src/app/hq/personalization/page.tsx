import { notFound } from "next/navigation";
import { hqEnabled } from "@/lib/hq";
import type { SimMeta } from "@/lib/hq-personalization";
import { runSim } from "@/lib/hq-personalization-server";
import Personalization from "./Personalization";

export const dynamic = "force-dynamic";
export const metadata = { title: "Personalization lab — System 3 HQ" };

// Links: /hq/personalization?persona=<id>&policy=<name>&seed=<n>&days=<n>&step=<n>
// Simulated personas only. Read-only: curves are edited in code (company/personalization/model/README.md).
export default async function PersonalizationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hqEnabled()) notFound();
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;
  const meta = await runSim<SimMeta>({ op: "meta" });
  const num = (v: string | null) => (v && /^\d{1,3}$/.test(v) ? Number(v) : null);
  return (
    <Personalization
      meta={meta.ok ? meta.data : null}
      error={meta.ok ? null : meta.error}
      initial={{ persona: one(q.persona), policy: one(q.policy), seed: num(one(q.seed)), days: num(one(q.days)), step: num(one(q.step)) }}
    />
  );
}
