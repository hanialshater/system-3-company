/**
 * SIMULATION ONLY. Never read at serving time, never assigned to, stored for, shown to or keyed
 * to a real learner (response §2.3, objection O6). No persona is defined by age, sex or any
 * demographic. The composer sees only a Fingerprint; the latent block is the simulator's ground
 * truth that no policy may read.
 *
 * owner: personalization-lead (Mateo) · board: W-1493 · change rule: as model.ts (README.md).
 * Every number is a guess, source "invented", until aggregate data exists; W-1497's parameter
 * ranges (personalization org, pending role approval) replace the latent guesses.
 * Pilot domains: probability, cs.
 */
import type { Fingerprint } from "./model";

export const PERSONAS_VERSION = "personas-v0.1" as const;

export type PersonaId =
  | "curious-newcomer" | "single-subject-crammer" | "struggling-repeater"
  | "returning-expert" | "wanderer" | "lapsed-returner";

export type Persona = {
  id: PersonaId;
  name: string;
  description: string;
  /** What a composer would see (the simulator jitters it per run, as edp-engine evaluate() does). */
  fingerprintMeans: Omit<Fingerprint, "version" | "statedSubjects" | "lessOfThis">;
  /** Ground truth, never visible to a policy. */
  latent: {
    priorKnowledge: Record<"probability" | "cs", number>; // P(already knows a concept)
    forgetRate: number;        // per-day decay of a concept's recall probability
    misconceptionPull: number; // P(predicts the misconception when the concept is unknown)
    prereqPenalty: number;     // recall cost of meeting a concept before its prerequisites
    interest: Record<"probability" | "cs", number>; // drives the simulated stop decision, never the score
    stopHazard: number;        // P(leaving after each card)
  };
  why: string;                 // why this persona exists: the failure it tests
  source: "invented";
};

export const PERSONAS: Persona[] = [
  {
    id: "curious-newcomer", name: "Curious newcomer",
    description: "Four lessons in, mixed results, no revisits taken yet.",
    // guess: 4 completions (historySize .13) sits just above the dampener's zero, so needs are faint.
    fingerprintMeans: { historySize: 0.13, missRecent: 0.4, recallFailRate: 0, successRecent: 0.6, levelRecent: 0.1, domainConcentration: 0.5, frontierOpen: 0.9 },
    // guess: low prior, moderate forgetting, strong misconception pull (new to the ideas).
    latent: { priorKnowledge: { probability: 0.1, cs: 0.15 }, forgetRate: 0.1, misconceptionPull: 0.6, prereqPenalty: 0.3, interest: { probability: 0.6, cs: 0.6 }, stopHazard: 0.08 },
    why: "tests cold start: a policy must not move cards on almost no evidence (O5)", source: "invented",
  },
  {
    id: "single-subject-crammer", name: "Single-subject crammer",
    description: "Many lessons, nearly all in one subject, doing well but forgetting some.",
    // guess: 24 completions, 19 of the last 20 in one domain.
    fingerprintMeans: { historySize: 0.8, missRecent: 0.2, recallFailRate: 0.35, successRecent: 0.7, levelRecent: 0.5, domainConcentration: 0.95, frontierOpen: 0.6 },
    latent: { priorKnowledge: { probability: 0.4, cs: 0.05 }, forgetRate: 0.12, misconceptionPull: 0.4, prereqPenalty: 0.2, interest: { probability: 0.9, cs: 0.2 }, stopHazard: 0.05 },
    why: "tests the bubble: breadth must fire without hurting recall in the home subject (O9)", source: "invented",
  },
  {
    id: "struggling-repeater", name: "Struggling repeater",
    description: "Misses most predictions and fails most first revisits, mostly intro lessons.",
    fingerprintMeans: { historySize: 0.5, missRecent: 0.7, recallFailRate: 0.6, successRecent: 0.3, levelRecent: 0.2, domainConcentration: 0.6, frontierOpen: 0.4 },
    // guess: high forgetting and prerequisite penalty: the persona repair exists for.
    latent: { priorKnowledge: { probability: 0.05, cs: 0.05 }, forgetRate: 0.2, misconceptionPull: 0.7, prereqPenalty: 0.45, interest: { probability: 0.5, cs: 0.4 }, stopHazard: 0.1 },
    why: "tests repair: a policy that serves harder or newer lessons should lose recall here", source: "invented",
  },
  {
    id: "returning-expert", name: "Returning expert",
    description: "Gets almost everything right, still on intro and core lessons.",
    fingerprintMeans: { historySize: 1, missRecent: 0.1, recallFailRate: 0.1, successRecent: 0.95, levelRecent: 0.3, domainConcentration: 0.5, frontierOpen: 0.7 },
    latent: { priorKnowledge: { probability: 0.7, cs: 0.6 }, forgetRate: 0.04, misconceptionPull: 0.2, prereqPenalty: 0.1, interest: { probability: 0.7, cs: 0.7 }, stopHazard: 0.04 },
    why: "tests stretch and build: default order wastes this learner's time on known concepts", source: "invented",
  },
  {
    id: "wanderer", name: "Wanderer",
    description: "Samples widely, rarely follows a concept to its next step.",
    fingerprintMeans: { historySize: 0.6, missRecent: 0.3, recallFailRate: 0.3, successRecent: 0.5, levelRecent: 0.4, domainConcentration: 0.2, frontierOpen: 0.9 },
    latent: { priorKnowledge: { probability: 0.25, cs: 0.25 }, forgetRate: 0.1, misconceptionPull: 0.45, prereqPenalty: 0.3, interest: { probability: 0.5, cs: 0.5 }, stopHazard: 0.07 },
    why: "tests build without breadth: breadth should be near zero, build should pull toward depth", source: "invented",
  },
  {
    id: "lapsed-returner", name: "Lapsed returner",
    description: "Had real history, came back after a long gap and fails many revisits.",
    // guess: the gap itself is invisible (gapDays not used, W-1495); only recall failures show it.
    fingerprintMeans: { historySize: 0.7, missRecent: 0.5, recallFailRate: 0.7, successRecent: 0.4, levelRecent: 0.5, domainConcentration: 0.5, frontierOpen: 0.5 },
    latent: { priorKnowledge: { probability: 0.35, cs: 0.3 }, forgetRate: 0.15, misconceptionPull: 0.4, prereqPenalty: 0.25, interest: { probability: 0.6, cs: 0.5 }, stopHazard: 0.12 },
    why: "tests repair from recall alone, without the forbidden session/gap inputs", source: "invented",
  },
];
