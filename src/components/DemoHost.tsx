"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { loaders } from "@/demos/registry.generated";

// One lazily loaded component per lesson; only cards near the viewport mount.
const components: Record<string, ComponentType<{ slug: string }>> = Object.fromEntries(
  Object.entries(loaders).map(([slug, load]) => [
    slug,
    dynamic(load, { ssr: false, loading: () => <div className="loading">Loading…</div> }),
  ]),
);

export function DemoHost({ slug }: { slug: string }) {
  const C = components[slug];
  if (!C) return <div className="loading">Unknown lesson {slug}</div>;
  return <C slug={slug} />;
}
