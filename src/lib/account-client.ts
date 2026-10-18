"use client";

// The browser side of optional accounts (EDD-008 proposal 3; ADR-008 decision 4; PRD-005 saves).
// Owner: backend-engineer. Talks to our own routes with fetch only: no auth library, no driver, no server module
// (C9; tests/accounts/static.test.mjs fails on any such import from a client file).
//
// - Accounts exist only if GET /api/account/me answers 200 (C5). 404 means "hide everything"; nothing else is sent.
// - The session cookie is scoped to /api/account (HttpOnly), so this code cannot read it and the beacon never carries it.
// - Signed in: the account's map is pulled into the device once per page load (server -> device only), and each
//   local update is pushed as a one-slug delta. The device's earlier history is uploaded only by the explicit
//   "Keep my history" merge, so "Don't import" stays true on later loads (EDD-008 addendum A4).
// - Saves (privacy ruling 2026-10-17 C5): anonymous saves live only in s3c:saves:v1 and make no request. Signed in,
//   the server is the source of truth: nothing is written to s3c:saves:v1, so sign-out leaves no account saves here.
import { loadProgress, mergeIntoLocal, setProgressSink, type LessonProgress, type ProgressMap } from "@/kit/progress";

export const SAVES_KEY = "s3c:saves:v1";
export const AGEBAND_KEY = "s3c:ageband:session";

export type Me =
  | { signedIn: false; likesSaves: boolean }
  | { signedIn: true; email: string; ageBand: "13-15" | "16+"; likesSaves: boolean; canLike: boolean };

let mePromise: Promise<Me | null> | null = null;
/** The last answer, without asking again (so an anonymous Save never causes a request, C5.1). */
let knownMe: Me | null = null;

/** null: accounts are off (404) or unreachable. Asked once per page load. */
export function accountMe(refresh = false): Promise<Me | null> {
  if (!mePromise || refresh) {
    mePromise = fetch("/api/account/me", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<Me>) : null))
      .then((m) => (knownMe = m))
      .catch(() => (knownMe = null));
  }
  return mePromise;
}

const jsonHeaders = { "content-type": "application/json" };

// ---------- Progress sync ----------
const pending = new Map<string, LessonProgress>();
let onlineHooked = false;

async function pushDelta(slug: string, entry: LessonProgress): Promise<void> {
  try {
    const r = await fetch("/api/account/progress", {
      method: "PUT",
      credentials: "same-origin",
      headers: jsonHeaders,
      body: JSON.stringify({ slug, entry }),
      keepalive: true,
    });
    if (r.ok) pending.delete(slug);
    else if (r.status >= 500) pending.set(slug, entry);
  } catch {
    pending.set(slug, entry); // offline: retried when the browser comes back online in this page
  }
}

function flushPending() {
  for (const [slug, entry] of [...pending]) void pushDelta(slug, entry);
}

let syncStarted = false;

/** Start device <-> account sync for this page load if signed in. Safe to call more than once. */
export async function startAccountSync(): Promise<Me | null> {
  const me = await accountMe();
  if (syncStarted || !me?.signedIn) return me;
  syncStarted = true;
  setProgressSink((slug, entry) => void pushDelta(slug, entry));
  if (!onlineHooked && typeof window !== "undefined") {
    window.addEventListener("online", flushPending);
    onlineHooked = true;
  }
  try {
    const r = await fetch("/api/account/progress", { credentials: "same-origin", cache: "no-store" });
    if (r.ok) mergeIntoLocal(((await r.json()) as { progress: ProgressMap }).progress);
  } catch {
    /* offline: local play continues */
  }
  return me;
}

// ---------- Keep my history ----------
export type Moves = { lessons: number; recalls: number; saves: number };

export function whatMoves(): Moves {
  const p = loadProgress();
  return {
    lessons: Object.values(p).filter((e) => e.completedAt).length,
    recalls: Object.values(p).reduce((n, e) => n + (e.recalls?.length ?? 0), 0),
    saves: Object.keys(loadLocalSaves()).length,
  };
}

/** The explicit merge. Progress and saves are separate choices (C5.2). Returns false on failure (local kept). */
export async function keepMyHistory(opts: { progress: boolean; saves: boolean }): Promise<boolean> {
  const body: Record<string, unknown> = { progress: opts.progress ? loadProgress() : {} };
  if (opts.saves) body.saves = Object.entries(loadLocalSaves()).map(([slug, at]) => ({ slug, at }));
  try {
    const r = await fetch("/api/account/merge", { method: "POST", credentials: "same-origin", headers: jsonHeaders, body: JSON.stringify(body) });
    if (!r.ok) return false;
    const out = (await r.json()) as { progress: ProgressMap };
    mergeIntoLocal(out.progress);
    if (opts.saves) removeKey(SAVES_KEY); // acknowledged by the server: the device copy goes (C5.2)
    return true;
  } catch {
    return false;
  }
}

// ---------- Saves ----------
function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Anonymous saves on this device: {slug: savedAt}. */
export function loadLocalSaves(): Record<string, number> {
  return readJson<Record<string, number>>(SAVES_KEY, {});
}

/**
 * Save or unsave. Anonymous: local only, no request (C5.1). Signed in: the server only, nothing local (C5.3).
 * Returns false if the server refused or was unreachable.
 */
export async function setSaved(slug: string, saved: boolean): Promise<boolean> {
  const me = knownMe;
  if (me?.signedIn && me.likesSaves) {
    try {
      const r = await fetch(`/api/account/saves/${encodeURIComponent(slug)}`, { method: saved ? "PUT" : "DELETE", credentials: "same-origin" });
      return r.ok;
    } catch {
      return false;
    }
  }
  const all = loadLocalSaves();
  if (saved) all[slug] = all[slug] ?? Date.now();
  else delete all[slug];
  try {
    window.localStorage.setItem(SAVES_KEY, JSON.stringify(all));
  } catch {
    return false;
  }
  return true;
}

/** Like or unlike (signed in, 16+ only; the server enforces both). No anonymous likes. */
export async function setLiked(slug: string, liked: boolean): Promise<boolean> {
  const me = await accountMe();
  if (!me?.signedIn || !me.canLike) return false;
  try {
    const r = await fetch(`/api/account/likes/${encodeURIComponent(slug)}`, { method: liked ? "PUT" : "DELETE", credentials: "same-origin" });
    return r.ok;
  } catch {
    return false;
  }
}

// ---------- Session ----------
export async function signOut(): Promise<boolean> {
  try {
    const r = await fetch("/api/account/auth/sign-out", { method: "POST", credentials: "same-origin", headers: jsonHeaders, body: "{}" });
    setProgressSink(null);
    syncStarted = false;
    mePromise = null;
    knownMe = null;
    return r.ok;
  } catch {
    return false;
  }
}

/** Clear this device's lesson history (the "also clear this device" choice, gate 2.4). */
export function clearThisDevice() {
  for (const k of ["s3c:progress:v1", "s3c:events:v1", SAVES_KEY]) removeKey(k);
}
