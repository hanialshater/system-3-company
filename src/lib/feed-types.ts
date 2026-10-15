// EDD-001 option 2: the slim feed index. Only the fields a feed card renders before it is opened.
// Full meta (claims, evidence, brief, recall) loads on demand from /api/meta/<slug>.
// Types only: safe to import from client components.
import type { DemoMeta, DomainId } from "@/kit/types";

export interface FeedItem {
  slug: string;
  title: string;
  hook: string;
  domain: DomainId;
  status: DemoMeta["status"];
  durationSec: number;
  /** Claim counts for the "Why trust this? (verified/total)" line, withdrawn claims excluded (W-879). The claims themselves load on demand. */
  claims: { total: number; verified: number };
}

/** One page of the feed for a filter ("all" or a domain id). `next` is the next page number, or null at the end. */
export interface FeedPage {
  filter: string;
  page: number;
  items: FeedItem[];
  next: number | null;
  total: number;
}

/** EDD-001 option 3: cards per page, in the HTML and per fetch. */
export const FEED_PAGE_SIZE = 30;
