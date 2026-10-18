// Wiring for the /api/account/* route files and /api/likes/counts (Next only). Owner: backend-engineer.
// C4: the API object, the pool and Better Auth are built on first use, and every handler checks ACCOUNTS_ENABLED
// before touching any of them, so `next build` and every route work with no accounts variables set (404).
// Also the session/database/flag interface the personalization lane's settings route expects
// (origin/perso-m1 src/lib/server/personalization/settings-wiring.ts items 1-3): accountUserId, query, accountsEnabled.
import "server-only";
import { findDemo } from "@/lib/catalog";
import { createAccountApi, type AccountApi } from "./account-api";
import { createAuth, sessionUserId, type Auth } from "./auth";
import { getPool } from "./db";

let api: AccountApi | null = null;
let auth: Auth | null = null;

function getAuth(): Auth {
  if (!auth) auth = createAuth({ pool: getPool() });
  return auth;
}

/** Lesson slugs a learner can reach (published, in review; drafts only where drafts are visible). */
const inCatalog = (slug: string) => !!findDemo(slug);

export function accountApi(): AccountApi {
  if (!api) api = createAccountApi({ env: () => process.env, pool: () => getPool(), auth: getAuth, inCatalog });
  return api;
}

/** The signed-in auth_user.id for a request, or null (SettingsDeps.userId). Call only after accountsEnabled(). */
export function accountUserId(req: Request): Promise<string | null> {
  return sessionUserId(getAuth(), req);
}

export { accountsEnabled } from "./accounts-flag";
export { query } from "./db";
