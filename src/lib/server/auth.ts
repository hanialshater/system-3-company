// Better Auth, magic link only (ADR-008; dependency record company/decisions/2026-10-15-dep-better-auth.md).
// Owner: backend-engineer. Server only. Relative imports only (node:test loads this without the Next alias).
//
// Every privacy setting below has a test in tests/accounts/ (M5: the regression suite for every Better Auth bump):
// - C2  one door for sign-in mail: the library's /sign-in/magic-link is never routed (account-route.ts forwards only
//       GET /magic-link/verify and POST /sign-out); POST /api/account/start calls auth.api.signInMagicLink.
// - C3  no name: start refuses any key but three; verification.create.before strips `name` (M1, with the DB CHECK);
//       user.create.before forces name "" and image null.
// - §6.2 the band: sendMagicLink refuses without a valid band and a published policy version (M6), and writes
//       signup_intent(sha256(token)); user.create.before reads and deletes it, and throws without one (no intent,
//       no user; age_band NOT NULL is the backstop).
// - P1.1 IP and user agent: session.create.before and session.update.before blank both; the DB CHECK refuses others.
// - M2  last_sign_in_at moves on sign-in and on each session refresh (at most daily); read only by the idle clock
//       and the export (R-M2b, tested).
// - tokens hashed (storeToken "hashed"), 300 s, single use; telemetry off, and construction refuses if any
//       BETTER_AUTH_TELEMETRY* variable is set (readiness A-5); the library logger prints level and SQLSTATE only (A-6);
//       cookie path /api/account, HttpOnly, SameSite=Lax, Secure on https, no cookie cache (P6.2).
// - C4  nothing is constructed at import; getAuth() is reached only after the ACCOUNTS_ENABLED check.
import { createHash } from "node:crypto";
import type pg from "pg";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { magicLink } from "better-auth/plugins/magic-link";
import { sendSignInLink } from "./email";

/** The bands the server accepts. Under-13 never reaches the server (the browser stops at the age screen). */
export const AGE_BANDS = ["13-15", "16+"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

/**
 * M6: the policy versions a learner may accept. `draft-2026-10-16` is a STAFF-TESTING DRAFT, right for the
 * first-light test database and wrong for a real learner. Readiness A-16: before go-live this list holds exactly
 * the version published at the learner-visible URL, with the draft removed.
 */
export const PUBLISHED_POLICY_VERSIONS: readonly string[] = ["draft-2026-10-16"];

export const isAgeBand = (v: unknown): v is AgeBand => typeof v === "string" && (AGE_BANDS as readonly string[]).includes(v);
export const isPolicyVersion = (v: unknown): v is string => typeof v === "string" && PUBLISHED_POLICY_VERSIONS.includes(v);

export const BASE_PATH = "/api/account/auth";
export const COOKIE_PATH = "/api/account";
export const MAGIC_LINK_SECONDS = 300;
export const SESSION_SECONDS = 30 * 86_400;

export const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

/** Remove `name` (and only that) from a magic-link verification value. Non-JSON is left for the DB CHECK to refuse. */
export function stripVerificationName(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    const v = JSON.parse(value);
    if (v && typeof v === "object" && !Array.isArray(v) && "name" in v) {
      delete v.name;
      return JSON.stringify(v);
    }
  } catch {
    /* not JSON: the CHECK refuses it */
  }
  return value;
}

export type AuthEnv = Record<string, string | undefined>;

export type AuthDeps = {
  pool: pg.Pool;
  env?: AuthEnv;
  /** Sends the link. Defaults to email.ts sendSignInLink. */
  sendLink?: (email: string, url: string) => Promise<unknown>;
  log?: (line: string) => void;
};

const TELEMETRY_VARS = ["BETTER_AUTH_TELEMETRY", "BETTER_AUTH_TELEMETRY_ENDPOINT", "BETTER_AUTH_TELEMETRY_DEBUG"];

export function baseUrlFrom(env: AuthEnv): string | undefined {
  if (env.BETTER_AUTH_URL) return env.BETTER_AUTH_URL.replace(/\/$/, "");
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return undefined;
}

export function createAuth(deps: AuthDeps) {
  const env = deps.env ?? process.env;
  for (const v of TELEMETRY_VARS) {
    if (env[v] !== undefined && env[v] !== "") throw Object.assign(new Error("telemetry variable set"), { code: "TELE0" });
  }
  const secret = env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) throw Object.assign(new Error("auth secret missing"), { code: "SECR0" });
  const baseURL = baseUrlFrom(env);
  const log = deps.log ?? console.error;
  const send = deps.sendLink ?? ((email: string, url: string) => sendSignInLink(email, url));
  const pool = deps.pool;

  return betterAuth({
    appName: "System 3",
    baseURL,
    basePath: BASE_PATH,
    secret,
    database: pool,
    trustedOrigins: baseURL ? [new URL(baseURL).origin] : [],
    telemetry: { enabled: false },
    logger: {
      level: "error",
      // A-6: never the message's arguments (a pg error's detail holds the failing row, which can be an email).
      log: (level, _message, ...args) => {
        const code = args.map((a) => (a as { code?: unknown } | null)?.code).find((c) => typeof c === "string" && /^[0-9A-Z]{5}$/.test(c));
        log(`better-auth ${level}${code ? ` sqlstate=${code}` : ""}`);
      },
    },
    emailAndPassword: { enabled: false },
    user: {
      modelName: "auth_user",
      fields: { emailVerified: "email_verified", createdAt: "created_at", updatedAt: "updated_at" },
      additionalFields: {
        ageBand: { type: "string", fieldName: "age_band", input: false, required: false, returned: false },
        policyVersion: { type: "string", fieldName: "policy_version", input: false, required: false, returned: false },
        policyAcceptedAt: { type: "date", fieldName: "policy_accepted_at", input: false, required: false, returned: false },
        lastSignInAt: { type: "date", fieldName: "last_sign_in_at", input: false, required: false, returned: false },
      },
      changeEmail: { enabled: false },
      deleteUser: { enabled: false },
    },
    session: {
      modelName: "auth_session",
      fields: {
        expiresAt: "expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
        ipAddress: "ip_address",
        userAgent: "user_agent",
        userId: "user_id",
      },
      expiresIn: SESSION_SECONDS,
      updateAge: 86_400,
      cookieCache: { enabled: false },
    },
    account: {
      modelName: "auth_account",
      fields: {
        accountId: "account_id",
        providerId: "provider_id",
        userId: "user_id",
        accessToken: "access_token",
        refreshToken: "refresh_token",
        idToken: "id_token",
        accessTokenExpiresAt: "access_token_expires_at",
        refreshTokenExpiresAt: "refresh_token_expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      accountLinking: { enabled: false },
    },
    verification: {
      modelName: "auth_verification",
      fields: { expiresAt: "expires_at", createdAt: "created_at", updatedAt: "updated_at" },
    },
    rateLimit: {
      enabled: true,
      storage: "memory",
      window: 60,
      max: 100,
      // Principal review F-f: a shared school address must not lock out a class on verify.
      customRules: { "/magic-link/verify": { window: 60, max: 30 } },
    },
    advanced: {
      cookiePrefix: "s3c",
      useSecureCookies: baseURL ? baseURL.startsWith("https://") : undefined,
      defaultCookieAttributes: { path: COOKIE_PATH, httpOnly: true, sameSite: "lax" },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user, ctx) => {
            const token = (ctx as { query?: { token?: unknown } } | null)?.query?.token;
            if (typeof token !== "string" || !token) throw new APIError("FORBIDDEN", { code: "NO_SIGNUP_INTENT", message: "no sign-up intent" });
            const { rows } = await pool.query(
              "DELETE FROM signup_intent WHERE token_hash = $1 AND expires_at > now() RETURNING age_band, policy_version",
              [tokenHash(token)],
            );
            const intent = rows[0] as { age_band?: unknown; policy_version?: unknown } | undefined;
            if (!intent || !isAgeBand(intent.age_band) || !isPolicyVersion(intent.policy_version)) {
              throw new APIError("FORBIDDEN", { code: "NO_SIGNUP_INTENT", message: "no sign-up intent" });
            }
            const now = new Date();
            return {
              data: {
                ...user,
                name: "",
                image: null,
                ageBand: intent.age_band,
                policyVersion: intent.policy_version,
                policyAcceptedAt: now,
                lastSignInAt: now,
              },
            };
          },
        },
        update: {
          // No name or image ever, whatever path writes the user row.
          before: async (user) => ({ data: { ...user, ...("name" in user ? { name: "" } : {}), ...("image" in user ? { image: null } : {}) } }),
        },
      },
      session: {
        create: {
          before: async (session) => ({ data: { ...session, ipAddress: "", userAgent: "" } }),
          after: async (session) => {
            await pool.query("UPDATE auth_user SET last_sign_in_at = greatest(last_sign_in_at, now()) WHERE id = $1", [session.userId]);
          },
        },
        update: {
          before: async (session) => ({
            data: {
              ...session,
              ...("ipAddress" in session ? { ipAddress: "" } : {}),
              ...("userAgent" in session ? { userAgent: "" } : {}),
            },
          }),
          after: async (session) => {
            if (session?.userId) {
              await pool.query("UPDATE auth_user SET last_sign_in_at = greatest(last_sign_in_at, now()) WHERE id = $1", [session.userId]);
            }
          },
        },
      },
      verification: {
        create: {
          before: async (v) => ({ data: { ...v, value: stripVerificationName(v.value) as string } }),
        },
        update: {
          before: async (v) => ({ data: { ...v, ...("value" in v ? { value: stripVerificationName(v.value) as string } : {}) } }),
        },
      },
    },
    plugins: [
      magicLink({
        expiresIn: MAGIC_LINK_SECONDS,
        storeToken: "hashed",
        disableSignUp: false,
        rateLimit: { window: 60, max: 5 },
        sendMagicLink: async ({ email, url, token, metadata }) => {
          const ageBand = (metadata as Record<string, unknown> | undefined)?.ageBand;
          const policyVersion = (metadata as Record<string, unknown> | undefined)?.policyVersion;
          if (!isAgeBand(ageBand) || !isPolicyVersion(policyVersion)) {
            throw new APIError("BAD_REQUEST", { code: "NO_BAND", message: "refused" });
          }
          await pool.query(
            "INSERT INTO signup_intent (token_hash, age_band, policy_version, expires_at) VALUES ($1, $2, $3, now() + make_interval(secs => $4))",
            [tokenHash(token), ageBand, policyVersion, MAGIC_LINK_SECONDS],
          );
          await send(email, url);
        },
      }),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;

/** The signed-in account id for a request, or null. Reads the cookie scoped to /api/account. */
export async function sessionUserId(auth: Auth, req: Request): Promise<string | null> {
  const s = await auth.api.getSession({ headers: req.headers });
  return s?.user?.id ?? null;
}
