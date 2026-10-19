// W-946: every meta.json, drafts and fact-check notes included. Server only: a client import fails the build.
import "server-only";
import domainsFile from "../../content/domains.json";
import { demos as allDemos } from "@/demos/index.generated";
import type { DemoMeta } from "@/kit/types";
import { statusVisible } from "./visibility";

export const domains = domainsFile.domains;

/** All lesson statuses are visible, per founder direction 2026-10-19.
 * includeDrafts remains accepted for compatibility; listing and direct URLs share one rule.
 */
export function visibleDemos(opts: { includeDrafts?: boolean } = {}): DemoMeta[] {
  return allDemos.filter((d) => statusVisible(d.status, opts));
}

/** A lesson a URL may open: any registered lesson, preserving its original status. */
export function findDemo(slug: string): DemoMeta | undefined {
  return visibleDemos({ includeDrafts: true }).find((d) => d.slug === slug);
}

export { allDemos };
