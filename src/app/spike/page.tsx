import type { Metadata } from "next";
import { SpikeHost } from "./SpikeHost";

// SPIKE-001 host route (EDD-003). Scratch branch only; see company/engineering/spikes/SPIKE-001-frontend-sandbox.md.
export const metadata: Metadata = { title: "Spike: sandboxed lessons", robots: { index: false, follow: false } };

export default function SpikePage() {
  return <SpikeHost />;
}
