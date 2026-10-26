"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
// W-946: loaders only. Metas never reach the client; they come from the server (src/lib/catalog.ts).
import { loaders } from "@/demos/loaders.generated";
import pilot from "@/lib/lesson-frames.slugs.json";

// One lazily loaded component per lesson; only cards near the viewport mount.
const components: Record<string, ComponentType<{ slug: string }>> = Object.fromEntries(
  Object.entries(loaders).map(([slug, load]) => [
    slug,
    dynamic(load, { ssr: false, loading: () => <div className="loading">Loading…</div> }),
  ]),
);

// Lesson frames pilot (company/engineering/reviews/2026-10-25-content-hub-production-review.md): with
// NEXT_PUBLIC_LESSON_FRAMES=pilot-50 a lesson in the committed manifest runs in a sandboxed frame from the artifact
// origin; any other value, unset included, is off. The flag is a build-time constant (next.config.mjs always defines
// it), so with it off both expressions below fold to null: no client chunk holds DemoFrame, the manifest or the slug
// list, and DemoHost is the in-app host it was (prediction P4, company/experiments/EXP-010-lesson-frames-pilot-predictions.md).
const FRAMES = process.env.NEXT_PUBLIC_LESSON_FRAMES === "pilot-50";
const framed: ReadonlySet<string> | null = FRAMES ? new Set(pilot.slugs) : null;
const DemoFrame = FRAMES
  ? dynamic(() => import("./DemoFrame"), { ssr: false, loading: () => <div className="loading">Loading…</div> })
  : null;

export function DemoHost({ slug }: { slug: string }) {
  const C = components[slug];
  if (!C) return <div className="loading">Unknown lesson {slug}</div>;
  if (DemoFrame && framed?.has(slug)) return <DemoFrame slug={slug} fallback={C} />;
  return <C slug={slug} />;
}
