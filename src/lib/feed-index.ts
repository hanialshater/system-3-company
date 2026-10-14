// EDD-001 options 2 and 3 (server only): the slim feed index and its pages.
// The ordering used to live in the client (Feed.tsx interleave); it moved here so the server can
// cut pages and filter by subject without shipping every lesson to the browser.
import type { DemoMeta } from "@/kit/types";
import { visibleDemos } from "./catalog";
import { FEED_PAGE_SIZE, type FeedItem, type FeedPage } from "./feed-types";

export function toFeedItem(d: DemoMeta): FeedItem {
  return {
    slug: d.slug,
    title: d.title,
    hook: d.hook,
    domain: d.domain,
    status: d.status,
    durationSec: d.durationSec,
    claims: { total: d.claims.length, verified: d.claims.filter((c) => c.status === "verified").length },
  };
}

/** Round-robin across domains so the feed alternates subjects; published lessons first. Unchanged from the old client version. */
function interleave(demos: DemoMeta[]): DemoMeta[] {
  const rank = (d: DemoMeta) => (d.status === "published" ? 0 : 1);
  const byDomain = new Map<string, DemoMeta[]>();
  for (const d of [...demos].sort((a, b) => rank(a) - rank(b) || a.slug.localeCompare(b.slug))) {
    byDomain.set(d.domain, [...(byDomain.get(d.domain) ?? []), d]);
  }
  const queues = [...byDomain.values()];
  const out: DemoMeta[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

/**
 * The whole feed order for a filter. Property the client relies on: the lessons of domain X inside
 * feedOrder("all") appear in the same relative order as feedOrder(X), so a page of "all" filtered
 * to X is always a prefix of feedOrder(X).
 */
export function feedOrder(filter: string): FeedItem[] {
  const demos = visibleDemos();
  return interleave(filter === "all" ? demos : demos.filter((d) => d.domain === filter)).map(toFeedItem);
}

export function feedPage(filter: string, page: number): FeedPage {
  const all = feedOrder(filter);
  const start = page * FEED_PAGE_SIZE;
  const items = all.slice(start, start + FEED_PAGE_SIZE);
  return { filter, page, items, next: start + FEED_PAGE_SIZE < all.length ? page + 1 : null, total: all.length };
}

/** Every (filter, page) pair, for static generation of /api/feed/<filter>/<page>. */
export function feedPageParams(): { filter: string; page: string }[] {
  const filters = ["all", ...new Set(visibleDemos().map((d) => d.domain))];
  return filters.flatMap((filter) => {
    const n = Math.max(1, Math.ceil(feedOrder(filter).length / FEED_PAGE_SIZE));
    return Array.from({ length: n }, (_, p) => ({ filter, page: String(p) }));
  });
}
