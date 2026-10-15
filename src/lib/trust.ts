// W-878 / W-879: what "Why trust this?" may show a learner, and how the trust line counts.
// Pure and types-only imports, so it is safe in client components and unit-tested (tests/platform/trust.test.mjs).
//
// A claim's `source` in meta.json is the fact-checker's and builder's working record (node re-runs, pass ids,
// "Fact-checker to confirm the citation"). It never reaches a learner. A learner sees the claim text, what it
// rests on (support type), whether it has been checked, its address, and the source's openable links (http/https
// URLs found in the record). Withdrawn claims are not claims the lesson makes: they are neither shown nor counted.
import type { Claim, DemoMeta } from "@/kit/types";

export interface SourceLink {
  href: string;
  label: string;
}

export interface LearnerClaim {
  id: string;
  text: string;
  support: Claim["support"];
  status: Exclude<Claim["status"], "withdrawn">;
  links: SourceLink[];
}

/**
 * Lesson meta as served to the browser (/api/meta/<slug>, the lesson page's RSC payload).
 * W-947: an allow-list. Only fields the learner UI reads are here: DemoCard's trust sheet (claims, evidence
 * counts) and Feed's revisit cards (slug, title, domain, status, recall). Everything else in meta.json (owner,
 * learner brief, misconception, objective, curriculum and its reference notes, keyState, evidence file paths,
 * any field added later) stays on the server. Adding a field here is a decision: the learner can read it.
 */
export interface PublicMeta {
  slug: string;
  title: string;
  domain: DemoMeta["domain"];
  status: DemoMeta["status"];
  recall: DemoMeta["recall"];
  claims: LearnerClaim[];
  /** Counts only: the arrays in meta.json are internal review-file paths. */
  evidence: { qa: number; simulatedLearner: number; humanLearners: number };
}

export const SUPPORT_LABEL: Record<Claim["support"], string> = {
  derivation: "a derivation (worked out step by step)",
  simulation: "a simulation",
  source: "a published source",
  convention: "a definition or convention",
};

export const STATUS_LABEL: Record<LearnerClaim["status"], string> = {
  verified: "checked",
  unverified: "not yet checked",
  disputed: "disputed",
};

const MAX_LINKS = 3;

export function countsTowardTrust(c: Pick<Claim, "status">): boolean {
  return c.status !== "withdrawn";
}

/** The trust line "(verified/total claims checked)": withdrawn claims are out of both numbers. */
export function trustCounts(claims: Pick<Claim, "status">[]): { total: number; verified: number } {
  const live = claims.filter(countsTowardTrust);
  return { total: live.length, verified: live.filter((c) => c.status === "verified").length };
}

/** Openable links in a source record: http(s) only, trailing punctuation trimmed, deduplicated, at most 3. */
export function sourceLinks(source: string): SourceLink[] {
  const out: SourceLink[] = [];
  const seen = new Set<string>();
  for (const raw of source.match(/https?:\/\/[^\s"'<>\\]+/g) ?? []) {
    const trimmed = raw.replace(/[).,;:!?\]}]+$/, "");
    let url: URL;
    try {
      url = new URL(trimmed);
    } catch {
      continue;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") continue;
    if (/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(url.hostname)) continue;
    if (seen.has(url.href)) continue;
    seen.add(url.href);
    out.push({ href: url.href, label: url.hostname.replace(/^www\./, "") });
    if (out.length === MAX_LINKS) break;
  }
  return out;
}

export function learnerClaims(claims: Claim[]): LearnerClaim[] {
  return claims.filter(countsTowardTrust).map((c) => ({
    id: c.id,
    text: c.text,
    support: c.support,
    status: c.status as LearnerClaim["status"],
    links: sourceLinks(c.source),
  }));
}

const count = (xs: unknown): number => (Array.isArray(xs) ? xs.length : 0);

/** W-947: built field by field (never `...meta`), so a new meta.json field cannot reach the browser by default. */
export function publicMeta(meta: DemoMeta): PublicMeta {
  const { question, options, answer, why } = meta.recall;
  return {
    slug: meta.slug,
    title: meta.title,
    domain: meta.domain,
    status: meta.status,
    recall: { question, options: [...options], answer, why },
    claims: learnerClaims(meta.claims),
    evidence: {
      qa: count(meta.evidence?.qa),
      simulatedLearner: count(meta.evidence?.simulatedLearner),
      humanLearners: count(meta.evidence?.humanLearners),
    },
  };
}
