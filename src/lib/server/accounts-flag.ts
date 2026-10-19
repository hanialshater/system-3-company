// Run-time switches for accounts and likes/saves (ADR-008 decision 8, C5; PRD-005 §5). Owner: backend-engineer.
// Read per request, inside server route handlers only. No page, layout or client component reads these: the UI
// learns whether accounts exist from GET /api/account/me (404 = hidden). Each is exactly "on" to be on; anything
// else, including unset, is off. On Vercel a changed variable reaches only deployments made after the change
// (SPIKE-002 R3, readiness A-3), so "off" in practice means set it and redeploy.
export type Env = Record<string, string | undefined>;

/** ACCOUNTS_ENABLED. Off: every /api/account/* route (and /api/likes/counts) answers 404. */
export function accountsEnabled(env: Env = process.env): boolean {
  return env.ACCOUNTS_ENABLED === "on";
}

/** LIKES_SAVES_ENABLED, and only when accounts are on. Off: the like and save routes answer 404. */
export function likesSavesEnabled(env: Env = process.env): boolean {
  return accountsEnabled(env) && env.LIKES_SAVES_ENABLED === "on";
}

/**
 * LIKE_COUNTS_PUBLIC, and only when likes are on. Off: GET /api/likes/counts answers 404 and no count is computed.
 * Privacy ruling 2026-10-17 C3.3: stays off in production until the founder names a manipulation reviewer.
 */
export function likeCountsPublic(env: Env = process.env): boolean {
  return likesSavesEnabled(env) && env.LIKE_COUNTS_PUBLIC === "on";
}

/**
 * LIKE_COUNTS_HIDDEN: comma-separated lesson slugs whose count is hidden (privacy C3.4, "freeze means hide").
 * Slugs only; runtime config, no table, no learner field.
 */
export function hiddenCountSlugs(env: Env = process.env): Set<string> {
  return new Set((env.LIKE_COUNTS_HIDDEN ?? "").split(",").map((s) => s.trim()).filter(Boolean));
}
