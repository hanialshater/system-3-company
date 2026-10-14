// Shared types for lessons. Kept in sync with tools/company.mjs (the validator)
// and company/product/demo-standard.md (the human-readable contract).

export type DomainId =
  | "math"
  | "cs"
  | "probability"
  | "physics"
  | "ai"
  | "economics"
  | "life"
  | "chemistry"
  | "geography"
  | "lifehacks"
  | "books"
  | "big-ideas";

export type DemoStatus = "draft" | "review" | "published" | "retired";

/** Alexander-style confidence mark: "" none, "*" promising, "**" well supported. */
export type Confidence = "" | "*" | "**";

export interface Claim {
  /** Claim address, e.g. "cs.merge-sort-payoff.c1". Corrections go here. */
  id: string;
  text: string;
  /** What the claim rests on. */
  support: "derivation" | "simulation" | "source" | "convention";
  source: string;
  status: "unverified" | "verified" | "disputed" | "withdrawn";
  checkedBy?: string;
  checkedOn?: string;
}

export interface DemoMeta {
  slug: string;
  title: string;
  hook: string;
  domain: DomainId;
  concept: string;
  status: DemoStatus;
  durationSec: number;
  owner: { categoryManager: string; builder: string };
  learner: { knows: string[]; doesNotKnow: string[] };
  misconception: string;
  objective: string;
  claims: Claim[];
  confidence: Confidence;
  recall: { question: string; options: string[]; answer: number; why: string };
  evidence: {
    qa: string[];
    simulatedLearner: string[];
    pairwise: string[];
    humanLearners: string[];
  };
  version: number;
}

export type LessonEvent =
  | { type: "view"; slug: string }
  | { type: "predict"; slug: string; option: number; correct: boolean }
  | { type: "interact"; slug: string }
  | { type: "reveal"; slug: string }
  | { type: "recall"; slug: string; correct: boolean; spacedDays: number }
  | { type: "complete"; slug: string; dwellMs: number };
