import domainsFile from "../../content/domains.json";
import { demos as allDemos } from "@/demos/registry.generated";
import type { DemoMeta } from "@/kit/types";

export const domains = domainsFile.domains;

/**
 * Which lessons the public feed shows. Drafts and retired lessons stay out.
 * Lessons in review appear with an "In review" tag unless SHOW_REVIEW=off,
 * which is how production can be restricted to published lessons only.
 */
export function visibleDemos(opts: { includeDrafts?: boolean } = {}): DemoMeta[] {
  const showReview = process.env.SHOW_REVIEW !== "off";
  return allDemos.filter(
    (d) =>
      d.status === "published" ||
      (showReview && d.status === "review") ||
      (opts.includeDrafts && d.status === "draft"),
  );
}

export function findDemo(slug: string): DemoMeta | undefined {
  return allDemos.find((d) => d.slug === slug);
}

export { allDemos };
