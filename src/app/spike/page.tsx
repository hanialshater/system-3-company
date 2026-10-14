import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveSpikeCdn, spikeCdnAllowlist, spikeEnabled } from "@/lib/spike";
import { SpikeHost } from "./SpikeHost";

// SPIKE-001 host route (EDD-003); see company/engineering/spikes/SPIKE-001-frontend-sandbox.md.
// W-477 (S1): 404 unless `next dev` or SPIKE_ENABLED=1 on the server. The lesson origin is chosen
// here, on the server, from the SPIKE_CDN_ORIGINS allow-list; `?cdn=` can only pick an entry.
export const metadata: Metadata = { title: "Spike: sandboxed lessons", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SpikePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!spikeEnabled()) notFound();
  const q = await searchParams;
  const requested = Array.isArray(q.cdn) ? q.cdn[0] : q.cdn;
  return <SpikeHost cdn={resolveSpikeCdn(requested, spikeCdnAllowlist())} />;
}
