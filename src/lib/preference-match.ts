export const EXPERIENCE_IDS = ["surprise", "visualExplanation", "playfulness", "practicalValue", "depth"] as const;
export type Experience = typeof EXPERIENCE_IDS[number];
export const CHALLENGES = ["gentle", "balanced", "demanding"] as const;
export type Challenge = typeof CHALLENGES[number];
export const CORE_QUALITY = ["prediction", "interaction", "payoff", "clarity", "transfer"] as const;
export type Rating = { score: number | null; reason: string; evidence: string; confidence: "low" | "medium" | "high" | null };
export type EditorialProfile = {
  demoVersion: number; sourceRevision: string; reviewRef: string;
  state: "current" | "stale" | "disputed"; reviewCount: number;
  quality: Record<typeof CORE_QUALITY[number] | "accessibility", Rating>;
  experience: Record<Experience, Rating>;
  complexity: { level: Challenge | "unknown"; reason: string; conceptualDemand?: string; interfaceBurden?: string };
  whyCool: string | null; caveat: string | null;
};
export type Preferences = { enabled: boolean; subjects: string[]; experiences: Experience[]; challenge: Challenge | null };
export const EMPTY_PREFERENCES: Preferences = { enabled: false, subjects: [], experiences: [], challenge: null };
export const RECIPE = { version: "stated-fit-account-2026-10-20-v1", subject: 40, experience: 40, challenge: 20, window: 5, displacement: 2, minimumGap: 5 } as const;
export type MatchCandidate = { slug: string; domain: string; profile: EditorialProfile | null; status?: string; prerequisites?: readonly string[] };
export type MatchResult<T> = {
  candidate: T; originalPosition: number; position: number; movable: boolean;
  unavailableReason: string | null; subject: number; experiences: Partial<Record<Experience, number>>;
  experienceMean: number; challenge: number; points: number | null; reason: string; constraintReason: string;
};

const known = (r: Rating | undefined) => !!r && r.score !== null && Number.isInteger(r.score) && r.score >= 0 && r.score <= 4 && (r.confidence === "medium" || r.confidence === "high") && !!r.reason && !!r.evidence;
export function hasPreferences(p: Preferences) { return p.enabled && !!(p.subjects.length || p.experiences.length || p.challenge); }

export function assess<T extends MatchCandidate>(candidate: T, p: Preferences, index: number): MatchResult<T> {
  const result: MatchResult<T> = { candidate, originalPosition: index, position: index, movable: false, unavailableReason: null, subject: 0, experiences: {}, experienceMean: 0, challenge: 0, points: null, reason: "Default order; no preference matching.", constraintReason: "Matching is off or no preferences were selected." };
  if (!hasPreferences(p)) return result;
  if (candidate.status && !["published", "review"].includes(candidate.status)) return {...result,unavailableReason:"Unpublished or retired lessons keep their default position.",constraintReason:"Visibility does not authorize preference promotion."};
  const profile = candidate.profile;
  let blocked: string | null = !profile ? "No current editorial profile." : profile.state !== "current" ? `Editorial profile is ${profile.state}.` : null;
  const selected = EXPERIENCE_IDS.filter(k => p.experiences.includes(k));
  if (profile && !blocked) {
    if (!profile.whyCool || !profile.caveat) blocked = "Editorial explanation or caveat is missing.";
    else if (CORE_QUALITY.some(k => !known(profile.quality[k]) || profile.quality[k].score! < 2)) blocked = "Core editorial evidence does not meet the provisional movement guard.";
    else if (selected.some(k => !known(profile.experience[k]))) blocked = "A selected experience descriptor is unknown or low confidence.";
    else if (p.challenge && !CHALLENGES.includes(profile.complexity.level as Challenge)) blocked = "Conceptual challenge is unknown.";
  }
  if (blocked || !profile) return { ...result, unavailableReason: blocked, reason: `Default position kept. ${blocked}`, constraintReason: "Fixed barrier: no card can swap across this position." };
  result.movable = true;
  result.subject = p.subjects.includes(candidate.domain) ? RECIPE.subject : 0;
  for (const k of selected) result.experiences[k] = RECIPE.experience * profile.experience[k].score! / 4;
  result.experienceMean = selected.length ? Object.values(result.experiences).reduce((a, b) => a + b, 0) / selected.length : 0;
  if (p.challenge) result.challenge = RECIPE.challenge * (1 - Math.abs(CHALLENGES.indexOf(p.challenge) - CHALLENGES.indexOf(profile.complexity.level as Challenge)) / 2);
  result.points = result.subject + result.experienceMean + result.challenge;
  result.reason = "Default position retained under bounded preference rules.";
  return result;
}

function longestRun<T extends MatchCandidate>(rows: MatchResult<T>[]) {
  let longest = 0, run = 0, previous = "";
  for (const r of rows) { run = r.candidate.domain === previous ? run + 1 : 1; previous = r.candidate.domain; longest = Math.max(longest, run); }
  return longest;
}

/** Ordinal fit proposal only: no learner history, outcome, engagement or account input. */
export function matchCandidates<T extends MatchCandidate>(baseline: readonly T[], p: Preferences): MatchResult<T>[] {
  const rows = baseline.map((candidate, i) => assess(candidate, p, i));
  if (!hasPreferences(p)) return rows;
  for (let start = 0; start < rows.length; start += RECIPE.window) {
    const end = Math.min(start + RECIPE.window, rows.length);
    const runLimit = Math.max(2, longestRun(rows.slice(start, end)));
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = start; i < end - 1; i++) {
        const a = rows[i], b = rows[i + 1];
        if (a.candidate.status !== b.candidate.status || a.candidate.prerequisites?.includes(b.candidate.slug) || b.candidate.prerequisites?.includes(a.candidate.slug)) continue;
        if (!a.movable || !b.movable || !(b.points! > a.points!) || b.points! - a.points! < RECIPE.minimumGap) continue;
        if (Math.abs(a.originalPosition - (i + 1)) > RECIPE.displacement || Math.abs(b.originalPosition - i) > RECIPE.displacement) continue;
        [rows[i], rows[i + 1]] = [b, a];
        if (longestRun(rows.slice(start, end)) > runLimit) { [rows[i], rows[i + 1]] = [a, b]; continue; }
        changed = true;
        break;
      }
    }
  }
  return rows.map((r, position) => {
    if (!r.movable) return { ...r, position };
    const next = rows[position + 1];
    let constraintReason = "No higher-scoring immediate neighbor can move ahead under the declared rules.";
    if (!next || Math.floor(position / RECIPE.window) !== Math.floor((position + 1) / RECIPE.window)) constraintReason = "End of this fixed five-card group; cards cannot cross its boundary.";
    else if (!next.movable) constraintReason = "The next position is a fixed evidence barrier.";
    else if (next.points! > r.points!) {
      if (next.points! - r.points! < RECIPE.minimumGap) constraintReason = "The next card's advantage is below the five-point minimum.";
      else if (Math.abs(r.originalPosition - (position + 1)) > RECIPE.displacement || Math.abs(next.originalPosition - position) > RECIPE.displacement) constraintReason = "A further swap would exceed the two-position movement limit.";
      else constraintReason = "A further swap would break this group's subject-run limit.";
    }
    const direction = position < r.originalPosition ? "Moved earlier because it matched your stated choices more strongly than a nearby card." : position > r.originalPosition ? "Moved later because a nearby card matched your stated choices more strongly." : r.reason;
    return { ...r, position, constraintReason, reason: direction };
  });
}

/** Closed vocabulary only. Drops unknown fields; never infers from behavior. */
export function sanitizePreferences(input: unknown, subjects: readonly string[]): Preferences {
 const p = input && typeof input === "object" ? input as Record<string, unknown> : {};
 const values = (v: unknown, allowed: readonly string[]) => Array.isArray(v) ? allowed.filter(k => v.includes(k)) : [];
 return { enabled: p.enabled === true, subjects: values(p.subjects, subjects), experiences: values(p.experiences, EXPERIENCE_IDS) as Experience[], challenge: CHALLENGES.includes(p.challenge as Challenge) ? p.challenge as Challenge : null };
}
