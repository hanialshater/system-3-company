// The handlers behind /api/account/* and /api/likes/counts (EDD-008 §6-§9 and its 2026-10-17 addendum; PRD-005).
// Owner: backend-engineer. Server only; relative imports only, so tests/accounts/ drives these directly.
//
// Every handler checks its switch first and answers 404 before anything is constructed (C4, C5). State-changing
// handlers check Origin (C7); every signed-in write is bound to the page's account (PC10, boundWrite: 409).
// Nothing logs a body, email, token, id or error text (http.ts logFailure; A-6).
// The anonymous learner never reaches a write: no session means 401, and an anonymous GET /me sets no cookie (M4).
import type pg from "pg";
import { type Auth, BASE_PATH, COOKIE_PATH, isAgeBand, isPolicyVersion } from "./auth";
import { accountsEnabled, hiddenCountSlugs, likeCountsPublic, likesSavesEnabled, type Env } from "./accounts-flag";
import { withTransaction, type Query } from "./db";
import { accountTag, empty, sameAccountHeader, isJson, json, logFailure, notFound, RateLimiter, readJson, sameOriginWrite, clientIp } from "./http";
import {
  accountBand,
  cleanMarks,
  cleanProgressMap,
  countLabels,
  deleteAccount,
  deleteMark,
  exportAccount,
  listMarks,
  loadProgressMap,
  MAX_MERGE_BODY_CHARS,
  mergeProgress,
  mergeSaves,
  purgeExpired,
  putMark,
  type MarkTable,
} from "./progress-store";

export type ApiDeps = {
  /** The environment, read per request (switches and URLs). */
  env: () => Env;
  pool: () => pg.Pool;
  auth: () => Auth;
  /** Is this a lesson slug in the current catalog? */
  inCatalog: (slug: string) => boolean;
  now?: () => number;
  log?: (line: string) => void;
};

const START_KEYS = new Set(["email", "ageBand", "policyVersion"]);
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,189}\.[^\s@]{1,60}$/;
export const MAX_COUNT_SLUGS = 50;
export const LIKE_WRITES_PER_DAY = 60;
/** PC4: progress pushes per account (a learner makes a few a minute at most) and merges per account. Per instance. */
export const PROGRESS_WRITES_PER_10_MIN = 60;
export const MERGES_PER_HOUR = 10;

export function createAccountApi(deps: ApiDeps) {
  const now = deps.now ?? Date.now;
  const log = deps.log ?? console.error;
  // C2: the one door for sign-in mail applies the library's limit itself (5 per 60 s per IP and per email).
  const startLimiter = new RateLimiter(5, 60_000, now);
  // Privacy 2026-10-17 C3.2: at most 60 like writes per account per rolling 24 hours. Keys hashed, memory only.
  const likeLimiter = new RateLimiter(LIKE_WRITES_PER_DAY, 86_400_000, now);
  // PC4 (principal review F6): per-account limits on the two progress writes. Keys hashed, memory only (F8: per instance).
  const progressLimiter = new RateLimiter(PROGRESS_WRITES_PER_10_MIN, 600_000, now);
  const mergeLimiter = new RateLimiter(MERGES_PER_HOUR, 3_600_000, now);
  const q: Query = (text, values = []) => deps.pool().query(text, values as unknown[]);
  const extraOrigins = () => {
    const e = deps.env();
    return [e.BETTER_AUTH_URL, e.VERCEL_URL ? `https://${e.VERCEL_URL}` : undefined].filter((x): x is string => !!x);
  };

  const on = () => accountsEnabled(deps.env());
  const social = () => likesSavesEnabled(deps.env());

  async function userId(req: Request): Promise<string | null> {
    const s = await deps.auth().api.getSession({ headers: req.headers });
    return s?.user?.id ?? null;
  }

  type Authed = { ok: true; id: string } | { ok: false; res: Response };
  async function signedIn(req: Request, what: string): Promise<Authed> {
    try {
      const id = await userId(req);
      return id ? { ok: true, id } : { ok: false, res: json(401, { error: "signed_out" }) };
    } catch (e) {
      logFailure(`${what} auth`, e, log);
      return { ok: false, res: json(500, { error: "unavailable" }) };
    }
  }

  /** The session account's tag (http.ts accountTag). createAuth refuses a missing or short secret first (SECR0). */
  function tagOf(id: string): string {
    const secret = deps.env().BETTER_AUTH_SECRET;
    if (!secret) throw Object.assign(new Error("auth secret missing"), { code: "SECR0" });
    return accountTag(secret, id);
  }

  /**
   * PC10: a write must carry the tag of the account the page started with (ACCOUNT_HEADER). A tab left open while
   * another tab signed the browser into a different account sends the old tag with the new cookie: 409, nothing
   * written. A missing tag is refused the same way. The client then ends the account on the device (no retry).
   */
  function boundWrite(req: Request, id: string, what: string): Response | null {
    try {
      return sameAccountHeader(req, tagOf(id)) ? null : json(409, { error: "account_changed" });
    } catch (e) {
      logFailure(`${what} bind`, e, log);
      return json(500, { error: "unavailable" });
    }
  }

  const write = (req: Request, needJson = true) => sameOriginWrite(req, extraOrigins()) && (!needJson || isJson(req));

  /** Expire the session cookies on the scoped path (both secure and plain names). */
  const clearCookies = (): [string, string][] =>
    ["__Secure-s3c.session_token", "s3c.session_token"].map((n) => [
      "set-cookie",
      `${n}=; Path=${COOKIE_PATH}; Max-Age=0; HttpOnly; SameSite=Lax${n.startsWith("__Secure-") ? "; Secure" : ""}`,
    ]);

  return {
    /** GET /api/account/me: whether accounts exist (404 = hide all account UI) and, if signed in, the basics. */
    async me(req: Request): Promise<Response> {
      // Off: the one request every page makes (AccountSync) answers a 404 the browser keeps for 5 minutes (the client's
      // first ask uses the HTTP cache, MC2; a reload inside the window makes no request). Whether Vercel's CDN also
      // serves it from s-maxage is unmeasured (principal review F1). A redeploy (the only way the switch changes, R3)
      // clears any CDN copy; a browser copy lasts at most 5 minutes. On, every answer is no-store.
      if (!on()) return empty(404, { "cache-control": "public, max-age=300, s-maxage=300" });
      try {
        const out = await deps.auth().api.getSession({ headers: req.headers, returnHeaders: true });
        const session = (out as { response?: { user?: { id?: string; email?: string } } | null }).response;
        const headers = (out as { headers?: Headers }).headers;
        const likesSaves = social();
        if (!session?.user?.id) return json(200, { signedIn: false, likesSaves });
        const { rows } = await q("SELECT email, age_band FROM auth_user WHERE id = $1", [session.user.id]);
        if (!rows[0]) return json(200, { signedIn: false, likesSaves });
        const res = json(200, {
          signedIn: true,
          email: String(rows[0].email),
          ageBand: String(rows[0].age_band),
          likesSaves,
          // C4.1/C4.2: 13-15 accounts see no Like control. The UI must not say why.
          canLike: likesSaves && rows[0].age_band === "16+",
          // PC3: which account this is, as an opaque value (http.ts accountTag). The client keeps it in the device
          // state so a different account (a sign-in link with the marker edited away) meets the merge screen again.
          tag: tagOf(String(session.user.id)),
        });
        // A sliding refresh (at most daily) re-issues the cookie: pass it through, nothing else.
        for (const c of headers?.getSetCookie?.() ?? []) res.headers.append("set-cookie", c);
        return res;
      } catch (e) {
        logFailure("me", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /** POST /api/account/start {email, ageBand, policyVersion}: the only door that can send sign-in mail (C2). */
    async start(req: Request): Promise<Response> {
      if (!on()) return notFound();
      if (!write(req)) return json(403, { error: "origin" });
      const body = await readJson(req, 2_048);
      if (!body.ok) return json(body.status, { error: body.status === 413 ? "too_large" : "malformed" });
      const b = body.body as Record<string, unknown>;
      if (!b || typeof b !== "object" || Array.isArray(b)) return json(400, { error: "malformed" });
      // C3: any key but the three is refused, so no name (or anything else) ever reaches the library.
      if (Object.keys(b).some((k) => !START_KEYS.has(k))) return json(400, { error: "malformed" });
      const email = typeof b.email === "string" ? b.email.trim() : "";
      if (!EMAIL_RE.test(email) || email.length > 254) return json(400, { error: "bad_email" });
      if (!isAgeBand(b.ageBand)) return json(400, { error: "bad_band" });
      if (!isPolicyVersion(b.policyVersion)) return json(400, { error: "bad_policy_version" });
      if (startLimiter.limited(`ip:${clientIp(req)}`, `email:${email.toLowerCase()}`)) return json(429, { error: "slow_down" });
      try {
        await purgeExpired(q); // C10, M3: expired rows go at the next sign-in request
        await deps.auth().api.signInMagicLink({
          body: {
            email,
            callbackURL: "/account?signed-in=1",
            newUserCallbackURL: "/account?signed-in=1",
            errorCallbackURL: "/account?link=expired",
            metadata: { ageBand: b.ageBand, policyVersion: b.policyVersion },
          },
          headers: req.headers,
        });
      } catch (e) {
        logFailure("start", e, log);
        return json(500, { error: "unavailable" });
      }
      // The same answer whether or not an account exists (no enumeration, privacy F-e).
      return json(200, { sent: true });
    },

    /** GET /api/account/progress: the account's map. PUT: a one-slug delta {slug, entry}. */
    async progressGet(req: Request): Promise<Response> {
      if (!on()) return notFound();
      const a = await signedIn(req, "progress");
      if (!a.ok) return a.res;
      try {
        return json(200, { progress: await loadProgressMap(q, a.id) });
      } catch (e) {
        logFailure("progress get", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    async progressPut(req: Request): Promise<Response> {
      if (!on()) return notFound();
      if (!write(req)) return json(403, { error: "origin" });
      const a = await signedIn(req, "progress");
      if (!a.ok) return a.res;
      const unbound = boundWrite(req, a.id, "progress");
      if (unbound) return unbound;
      const body = await readJson(req, 64_000);
      if (!body.ok) return json(body.status, { error: body.status === 413 ? "too_large" : "malformed" });
      const b = body.body as { slug?: unknown; entry?: unknown } | null;
      if (!b || typeof b.slug !== "string") return json(400, { error: "malformed" });
      if (progressLimiter.limited(`progress:${a.id}`)) return json(429, { error: "slow_down" });
      const map = cleanProgressMap({ [b.slug]: b.entry }, deps.inCatalog, now());
      try {
        const merged = await withTransaction(deps.pool(), async (tq) => {
          await mergeProgress(tq, a.id, map);
          return loadProgressMap(tq, a.id, [b.slug as string]);
        });
        return json(200, { slug: b.slug, progress: merged[b.slug] ?? null });
      } catch (e) {
        logFailure("progress put", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /**
     * POST /api/account/merge {progress, saves?}: "Keep my history" (§8, gate 2.3). Sent only after the learner
     * confirmed the list on screen; progress and saves are separate choices (privacy 2026-10-17 C5.2): the client
     * omits a key the learner declined. Answers the merged map (and saves) for the device to keep.
     */
    async merge(req: Request): Promise<Response> {
      if (!on()) return notFound();
      if (!write(req)) return json(403, { error: "origin" });
      const a = await signedIn(req, "merge");
      if (!a.ok) return a.res;
      const unbound = boundWrite(req, a.id, "merge");
      if (unbound) return unbound;
      const body = await readJson(req, MAX_MERGE_BODY_CHARS);
      if (!body.ok) return json(body.status, { error: body.status === 413 ? "too_large" : "malformed" });
      const b = body.body as Record<string, unknown> | null;
      if (!b || typeof b !== "object" || Array.isArray(b)) return json(400, { error: "malformed" });
      if (mergeLimiter.limited(`merge:${a.id}`)) return json(429, { error: "slow_down" });
      const t = now();
      const map = cleanProgressMap(b.progress, deps.inCatalog, t);
      const withSaves = social() && "saves" in b;
      const saves = withSaves ? cleanMarks(b.saves, deps.inCatalog, t) : [];
      try {
        const out = await withTransaction(deps.pool(), async (tq) => {
          await mergeProgress(tq, a.id, map);
          if (withSaves) await mergeSaves(tq, a.id, saves);
          const progress = await loadProgressMap(tq, a.id);
          return social() ? { progress, saves: await listMarks(tq, "lesson_save", a.id) } : { progress };
        });
        return json(200, out);
      } catch (e) {
        logFailure("merge", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /** GET /api/account/export: one file, system3-history.json (§9, P1.5). */
    async exportFile(req: Request): Promise<Response> {
      if (!on()) return notFound();
      const a = await signedIn(req, "export");
      if (!a.ok) return a.res;
      try {
        const file = await exportAccount(q, a.id);
        if (!file) return json(401, { error: "signed_out" });
        return json(200, file, { "content-disposition": 'attachment; filename="system3-history.json"' });
      } catch (e) {
        logFailure("export", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /** POST /api/account/delete {confirm: true}: one transaction (§7, P1.4). Answers what was deleted. */
    async remove(req: Request): Promise<Response> {
      if (!on()) return notFound();
      if (!write(req)) return json(403, { error: "origin" });
      const a = await signedIn(req, "delete");
      if (!a.ok) return a.res;
      const unbound = boundWrite(req, a.id, "delete");
      if (unbound) return unbound;
      const body = await readJson(req, 256);
      if (!body.ok || (body.body as { confirm?: unknown } | null)?.confirm !== true) return json(400, { error: "confirm" });
      try {
        const counts = await withTransaction(deps.pool(), (tq) => deleteAccount(tq, a.id));
        if (!counts) return json(401, { error: "signed_out" });
        const res = json(200, { deleted: counts });
        for (const [k, v] of clearCookies()) res.headers.append(k, v);
        return res;
      } catch (e) {
        logFailure("delete", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    // ---------- Likes and saves (behind LIKES_SAVES_ENABLED) ----------
    async listMarks(req: Request, table: MarkTable): Promise<Response> {
      if (!on() || !social()) return notFound();
      const a = await signedIn(req, "list");
      if (!a.ok) return a.res;
      try {
        return json(200, { [table === "lesson_like" ? "likes" : "saves"]: await listMarks(q, table, a.id) });
      } catch (e) {
        logFailure("list", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /**
     * PUT (mark) or DELETE (unmark) /api/account/{likes,saves}/<slug>. Idempotent. 204 on success. Marking needs a
     * lesson in the catalog; unmarking does not, so a learner can remove a row for a retired lesson (PC4, F7).
     */
    async mark(req: Request, table: MarkTable, slug: string, set: boolean): Promise<Response> {
      if (!on() || !social()) return notFound();
      if (!write(req, false)) return json(403, { error: "origin" });
      const a = await signedIn(req, "mark");
      if (!a.ok) return a.res;
      const unbound = boundWrite(req, a.id, "mark");
      if (unbound) return unbound;
      if (set ? !deps.inCatalog(slug) : slug.length < 1 || slug.length > 200) return json(404, { error: "unknown_lesson" });
      try {
        if (table === "lesson_like") {
          // C4.1: likes are 16+ only, enforced here, not only in the UI. No row is written for 13-15.
          if ((await accountBand(q, a.id)) !== "16+") return json(403, { error: "not_available" });
          if (likeLimiter.limited(`like:${a.id}`)) return json(429, { error: "slow_down" });
        }
        if (set) await putMark(q, table, a.id, slug, now());
        else await deleteMark(q, table, a.id, slug);
        return empty(204);
      } catch (e) {
        logFailure("mark", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /**
     * GET /api/likes/counts?slugs=a,b: a step label or null per slug (privacy 2026-10-17 C2). Behind
     * LIKE_COUNTS_PUBLIC. No cookie is read or set; the same body for every viewer; cacheable for 10 minutes.
     */
    async counts(req: Request): Promise<Response> {
      if (!likeCountsPublic(deps.env())) return notFound();
      let raw: string[] = [];
      try {
        raw = (new URL(req.url).searchParams.get("slugs") ?? "").split(",");
      } catch {
        /* none */
      }
      const slugs = [...new Set(raw.map((s) => s.trim()).filter((s) => s && s.length <= 200 && deps.inCatalog(s)))].slice(0, MAX_COUNT_SLUGS);
      try {
        const counts = await countLabels(q, slugs, hiddenCountSlugs(deps.env()));
        return new Response(JSON.stringify({ counts }), {
          status: 200,
          headers: { "content-type": "application/json", "cache-control": "public, max-age=600, s-maxage=600" },
        });
      } catch (e) {
        logFailure("counts", e, log);
        return json(500, { error: "unavailable" });
      }
    },

    /**
     * The Better Auth mount at /api/account/auth/*. Only two library endpoints are routed: the link click
     * (GET /magic-link/verify) and sign-out (POST /sign-out). Everything else, including the library's own
     * /sign-in/magic-link (C2) and update-user, answers 404.
     */
    async authRoute(req: Request): Promise<Response> {
      if (!on()) return notFound();
      let path = "";
      try {
        path = new URL(req.url).pathname;
      } catch {
        return notFound();
      }
      const allowed =
        (req.method === "GET" && path === `${BASE_PATH}/magic-link/verify`) || (req.method === "POST" && path === `${BASE_PATH}/sign-out`);
      if (!allowed) return notFound();
      try {
        return await deps.auth().handler(req);
      } catch (e) {
        logFailure("auth", e, log);
        return json(500, { error: "unavailable" });
      }
    },
  };
}

export type AccountApi = ReturnType<typeof createAccountApi>;
