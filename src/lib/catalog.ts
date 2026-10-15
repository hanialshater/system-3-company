import domainsFile from "../../content/domains.json";
import { demos as allDemos } from "@/demos/registry.generated";
import type { DemoMeta } from "@/kit/types";
import { statusVisible } from "./visibility";

export const domains = domainsFile.domains;

/**
 * Which lessons the public feed shows. Drafts and retired lessons stay out.
 * Lessons in review appear with an "In review" tag unless SHOW_REVIEW=off.
 * W-480 / W-884: `includeDrafts` (direct URLs) only reaches drafts where draftsVisible() allows it: the dev
 * server and local builds, never a Vercel production deployment. The rule lives in ./visibility.ts.
 */
export function visibleDemos(opts: { includeDrafts?: boolean } = {}): DemoMeta[] {
  return allDemos.filter((d) => statusVisible(d.status, opts));
}

/** A lesson a URL may open: anything visibleDemos lists, plus drafts where drafts are visible. */
export function findDemo(slug: string): DemoMeta | undefined {
  return visibleDemos({ includeDrafts: true }).find((d) => d.slug === slug);
}

export { allDemos };
