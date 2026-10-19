"use client";

// The browser side of optional accounts (EDD-008 proposal 3; ADR-008 decision 4; PRD-005 saves).
// Owner: backend-engineer. Talks to our own routes with fetch only: no auth library, no driver, no server module
// (C9; tests/accounts/static.test.mjs fails on any such import from a client file). Only src/components/account/*
// may import this module (PC7; tests/platform/engagement-not-ranking.test.mjs).
//
// - Accounts exist only if GET /api/account/me answers 200 (C5). 404 means "hide everything"; nothing else is sent.
// - The session cookie is scoped to /api/account (HttpOnly), so this code cannot read it and the beacon never carries it.
// - One start point per page load: startAccountSync(), called only by AccountSync in the root layout (PC3). The
//   account page reads the result with accountState() and starts nothing.
// - Nothing syncs until the merge screen is answered for this account on this device (PC1). Until then the device's
//   own history is counted against the account's (before anything is pulled), and only the difference is offered.
// - The device state records which account answered, as the opaque `tag` /me returns (PC3; http.ts accountTag). A
//   page load signed in as any other account, with or without the ?signed-in=1 marker, ends the previous account on
//   this device and asks again, so a sign-in link whose callbackURL was edited cannot skip the merge screen.
// - The answer is kept in s3c:account-device:v1 with a copy of the device's own progress from before the sync
//   started. Sign-out puts that copy back: the account's history leaves the device, the anonymous history stays as
//   it was (PC2; safe default pending the privacy ruling W-1710). "Also clear this device" removes both.
// - Every account write (progress, merge, saves, likes, delete) carries the tag of the account this page started
//   with, in ACCOUNT_HEADER (PC10). If another tab has since signed the browser into a different account, the server
//   answers 409 and writes nothing; this page then stops syncing and ends the account on the device (no retry), and
//   the account page re-reads its state. The tag goes in no other request (static.test.mjs S18).
// - Once answered: the account map is pulled into the device on each page load, and each local update is pushed as
//   the change it made only (a new recall, a first completion, a first prediction), never the stored entry (PC1).
// - Saves (privacy ruling 2026-10-17 C5): anonymous saves live only in s3c:saves:v1 and make no request. Signed in,
//   the server is the source of truth: nothing is written to s3c:saves:v1, so sign-out leaves no account saves here.
import { loadProgress, setProgressSink, type LessonProgress, type ProgressMap } from "@/kit/progress";

export const PROGRESS_KEY = "s3c:progress:v1";
export const EVENTS_KEY = "s3c:events:v1";
export const SAVES_KEY = "s3c:saves:v1";
export const AGEBAND_KEY = "s3c:ageband:session";
/** This device's signed-in state: the merge answer and the device's own progress from before the sync (PC2, PC3). */
export const DEVICE_KEY = "s3c:account-device:v1";

export type Me =
  | { signedIn: false; likesSaves: boolean }
  | { signedIn: true; email: string; ageBand: "13-15" | "16+"; likesSaves: boolean; canLike: boolean; tag: string };
export type SignedInMe = Extract<Me, { signedIn: true }>;
export type Moves = { lessons: number; recalls: number; saves: number };
export type AccountState =
  | { me: null } // accounts off (404) or unreachable
  | { me: Extract<Me, { signedIn: false }> }
  | { me: SignedInMe; syncing: true; fromLink?: boolean }
  | { me: SignedInMe; syncing: false; ask: Moves; fromLink?: boolean };
// fromLink: this page load arrived by the sign-in marker (privacy re-read 3.2: the page shows "You are now signed in
// as {email}" for that page view only). Nothing stores it.
/** `account`: the /me tag of the account that answered (PC3). A state without it (written before PC3) never matches. */
type DeviceState = { answer: "import" | "decline" | "nothing"; account: string; own: ProgressMap };

// ---------- Storage ----------
function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function readDevice(): DeviceState | null {
  const d = readJson<DeviceState | null>(DEVICE_KEY, null);
  return d && typeof d === "object" && d.own && typeof d.own === "object" ? d : null;
}

// ---------- /me ----------
let mePromise: Promise<Me | null> | null = null;
/** The last answer, without asking again (so an anonymous Save never causes a request, C5.1). */
let knownMe: Me | null = null;

/**
 * null: accounts are off (404) or unreachable. Asked once per page load. MC2: the first ask uses the HTTP cache, so
 * with accounts off the 404's max-age=300 holds across reloads. With accounts on every /me answer is no-store, so a
 * signed-in state is never served stale. `refresh` (after sign-out) bypasses the cache.
 */
export function accountMe(refresh = false): Promise<Me | null> {
  if (!mePromise || refresh) {
    const init: RequestInit = refresh ? { credentials: "same-origin", cache: "no-store" } : { credentials: "same-origin" };
    mePromise = fetch("/api/account/me", init)
      .then((r) => (r.ok ? (r.json() as Promise<Me>) : null))
      .then((m) => (knownMe = m))
      .catch(() => (knownMe = null));
  }
  return mePromise;
}

const jsonHeaders = { "content-type": "application/json" };

/** PC10: the header that binds a write to this page's account. Same literal as http.ts ACCOUNT_HEADER (S18). */
export const ACCOUNT_HEADER = "x-s3c-account";

/**
 * Headers for an account write (PC10). The only place the account tag enters a request: S18 fails if the tag, the
 * device key or this helper reaches any other fetch or sendBeacon argument, or a write route not on its list.
 */
function boundHeaders(tag: string | undefined, withJson: boolean): Record<string, string> {
  const h: Record<string, string> = withJson ? { ...jsonHeaders } : {};
  if (typeof tag === "string" && tag.length > 0) h[ACCOUNT_HEADER] = tag;
  return h;
}

/** A write answered 409: the browser is signed into another account than this page's (PC10). */
const CHANGED = 409;

// ---------- Pure parts (tested in tests/accounts/client-sync.test.mjs) ----------
type Recall = { at: number; correct: boolean };

/** Union of two entries (EDD-008 §8): earliest completion, `theirs` prediction wins if it has one, recalls by `at`. */
function unionEntry(mine: LessonProgress | undefined, theirs: LessonProgress): LessonProgress {
  const completed = [mine?.completedAt, theirs.completedAt].filter((x): x is number => typeof x === "number");
  const byAt = new Map<number, Recall>();
  for (const r of [...(mine?.recalls ?? []), ...(theirs.recalls ?? [])]) if (!byAt.has(r.at)) byAt.set(r.at, r);
  const next: LessonProgress = { recalls: [...byAt.values()].sort((a, b) => a.at - b.at) };
  if (completed.length) next.completedAt = Math.min(...completed);
  const predicted = theirs.predictedCorrectly ?? mine?.predictedCorrectly;
  if (predicted !== undefined) next.predictedCorrectly = predicted;
  return next;
}

/** Union `incoming` into `base` (a new map). Never removes anything. */
export function unionMaps(base: ProgressMap, incoming: ProgressMap): ProgressMap {
  const out: ProgressMap = { ...base };
  for (const [slug, theirs] of Object.entries(incoming ?? {})) out[slug] = unionEntry(out[slug], theirs);
  return out;
}

/** What one update added (PC1): a first completion, a first prediction, recalls not there before. null if nothing. */
export function progressDelta(before: LessonProgress | undefined, after: LessonProgress): LessonProgress | null {
  const d: LessonProgress = { recalls: [] };
  if (typeof after.completedAt === "number" && before?.completedAt === undefined) d.completedAt = after.completedAt;
  if (typeof after.predictedCorrectly === "boolean" && before?.predictedCorrectly === undefined) d.predictedCorrectly = after.predictedCorrectly;
  const had = new Set((before?.recalls ?? []).map((r) => r.at));
  d.recalls = (after.recalls ?? []).filter((r) => !had.has(r.at));
  return d.completedAt === undefined && d.predictedCorrectly === undefined && d.recalls.length === 0 ? null : d;
}

/** The device's history that the account does not already hold (PC3). */
export function movesAgainst(device: ProgressMap, account: ProgressMap, deviceSaves: string[], accountSaves: string[]): Moves {
  let lessons = 0;
  let recalls = 0;
  for (const [slug, e] of Object.entries(device)) {
    const theirs = account[slug];
    if (typeof e.completedAt === "number" && theirs?.completedAt === undefined) lessons++;
    const held = new Set((theirs?.recalls ?? []).map((r) => r.at));
    recalls += (e.recalls ?? []).filter((r) => !held.has(r.at)).length;
  }
  const savedThere = new Set(accountSaves);
  return { lessons, recalls, saves: deviceSaves.filter((s) => !savedThere.has(s)).length };
}

/** Union a map into this device's progress (the account's pull, a merge answer, an imported file). */
export function mergeIntoLocal(incoming: ProgressMap): ProgressMap {
  const all = unionMaps(loadProgress(), incoming);
  writeJson(PROGRESS_KEY, all);
  return all;
}

// ---------- Push (only the change) ----------
const pending = new Map<string, LessonProgress>();
let onlineHooked = false;
/** PC10: the tag of the account this page's sync was begun for. Pushes carry it; null when not syncing. */
let syncTag: string | null = null;

async function pushDelta(slug: string, delta: LessonProgress): Promise<void> {
  const tag = syncTag;
  if (!tag) return; // not syncing (ended by a 409 or a sign-out): nothing is sent or kept
  try {
    const r = await fetch("/api/account/progress", {
      method: "PUT",
      credentials: "same-origin",
      headers: boundHeaders(tag, true),
      body: JSON.stringify({ slug, entry: delta }),
      keepalive: true,
    });
    if (r.status === CHANGED) accountChanged(tag);
    else if (r.status >= 500) pending.set(slug, unionEntry(pending.get(slug), delta));
  } catch {
    pending.set(slug, unionEntry(pending.get(slug), delta)); // offline: retried when the browser is back online in this page
  }
}

function flushPending(): Promise<void[]> {
  const all = [...pending];
  pending.clear();
  return Promise.all(all.map(([slug, d]) => pushDelta(slug, d)));
}

// ---------- The one start point (PC3) ----------
let syncing = false;
let started: Promise<AccountState> | null = null;
let current: AccountState | null = null;
let resolveReady: (s: AccountState) => void = () => {};
let ready = new Promise<AccountState>((r) => (resolveReady = r));
/** True once forgetSession() has run in this page load (PC9). */
let sessionReset = false;

function settle(s: AccountState): AccountState {
  current = s;
  resolveReady(s);
  return s;
}

/** Register the delta sink and pull the account's map into the device. Once per page load. */
async function beginSync(tag: string, pull = true): Promise<void> {
  if (syncing) return;
  syncing = true;
  syncTag = tag;
  changedFor = null;
  setProgressSink((slug, before, after) => {
    const d = progressDelta(before, after);
    if (d) void pushDelta(slug, d);
  });
  if (!onlineHooked && typeof window !== "undefined") {
    window.addEventListener("online", () => void flushPending());
    onlineHooked = true;
  }
  if (!pull) return;
  try {
    const r = await fetch("/api/account/progress", { credentials: "same-origin", cache: "no-store" });
    if (r.ok) mergeIntoLocal(((await r.json()) as { progress: ProgressMap }).progress);
  } catch {
    /* offline: local play continues */
  }
}

/** The account's history leaves this device; its own pre-sign-in history is put back as it was (PC2). */
function endAccountOnDevice() {
  setProgressSink(null);
  syncing = false;
  syncTag = null;
  pending.clear();
  const d = readDevice();
  if (d) {
    writeJson(PROGRESS_KEY, d.own);
    removeKey(DEVICE_KEY);
  }
}

/** A sign-in link lands on /account?signed-in=1. Read it once and take it out of the address bar. */
function arrivedFromLink(): boolean {
  try {
    const u = new URL(window.location.href);
    if (u.searchParams.get("signed-in") !== "1") return false;
    u.searchParams.delete("signed-in");
    window.history.replaceState(window.history.state, "", u.pathname + u.search + u.hash);
    return true;
  } catch {
    return false;
  }
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const r = await fetch(path, { credentials: "same-origin", cache: "no-store" });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

/** PC3: the device state was answered by this account. A missing or non-string tag never matches (ask again). */
function sameAccount(d: DeviceState, me: SignedInMe): boolean {
  return typeof me.tag === "string" && me.tag.length > 0 && d.account === me.tag;
}

async function run(): Promise<AccountState> {
  const me = await accountMe();
  if (!me) return { me: null }; // off or unreachable: touch nothing on the device
  if (!me.signedIn) {
    if (readDevice()) endAccountOnDevice(); // signed out elsewhere, or the session ended
    return { me };
  }
  // A new sign-in (the marker), or a different account than the one that answered (PC3: the marker can be edited away
  // from a link someone else sent): end whatever account was here first, then ask again.
  const fromLink = arrivedFromLink();
  const prior = readDevice();
  if (prior && (fromLink || !sameAccount(prior, me))) endAccountOnDevice();
  const notice = fromLink || consumeChanged(); // after a PC10 409 the page says "You are now signed in as ..." too
  if (readDevice()) {
    await beginSync(me.tag);
    return { me, syncing: true, fromLink: notice };
  }
  // Not answered yet: count the device's own history against the account's, before anything is pulled.
  const device = loadProgress();
  const localSaves = me.likesSaves ? Object.keys(loadLocalSaves()) : [];
  const account = (await getJson<{ progress: ProgressMap }>("/api/account/progress"))?.progress ?? {};
  const accountSaves = localSaves.length ? ((await getJson<{ saves: { slug: string }[] }>("/api/account/saves"))?.saves ?? []).map((s) => s.slug) : [];
  const ask = movesAgainst(device, account, localSaves, accountSaves);
  if (ask.lessons || ask.recalls || ask.saves) return { me, syncing: false, ask, fromLink: notice };
  writeJson(DEVICE_KEY, { answer: "nothing", account: me.tag, own: device } satisfies DeviceState);
  await beginSync(me.tag);
  return { me, syncing: true, fromLink: notice };
}

/** Start device <-> account sync for this page load. Only AccountSync (root layout) calls this. Idempotent. */
export function startAccountSync(): Promise<AccountState> {
  if (!started) started = run().catch((): AccountState => ({ me: null })).then(settle);
  return started;
}

/**
 * The state for the account page. On a page load it starts nothing and waits for AccountSync's start (PC3). After a
 * sign-out or deletion in this page load (forgetSession), AccountSync will not run again, so the page's next read
 * starts the (memoised) sync itself; otherwise /account would stay on "Loading..." when it remounts (PC9).
 */
export function accountState(): Promise<AccountState> {
  if (current) return Promise.resolve(current);
  if (sessionReset) return startAccountSync();
  return ready;
}

// ---------- PC10: the browser is now signed into another account ----------
const changeListeners = new Set<() => void>();
let changedNotice = false;
let changedFor: string | null = null;

/** The account page re-reads accountState() when this fires. Returns the unsubscribe. */
export function onAccountChanged(cb: () => void): () => void {
  changeListeners.add(cb);
  return () => void changeListeners.delete(cb);
}

function consumeChanged(): boolean {
  const c = changedNotice;
  changedNotice = false;
  return c;
}

/**
 * A write sent with `sentTag` got 409. Stop syncing in this page (no retry, nothing kept) and end that account on the
 * device, as run() does on a page load. If another tab has already answered for the new account, the device state is
 * that account's, and it is left alone. Then forget this page's session so the next read starts afresh.
 */
function accountChanged(sentTag: string) {
  // Several writes in flight: handle the first 409 only. A late 409 for an account this page has already left (it now
  // syncs another) changes nothing.
  if (changedFor === sentTag || (syncTag !== null && syncTag !== sentTag)) return;
  changedFor = sentTag;
  setProgressSink(null);
  syncing = false;
  syncTag = null;
  pending.clear();
  const d = readDevice();
  if (d && d.account === sentTag) endAccountOnDevice();
  forgetSession();
  changedNotice = true;
  for (const cb of [...changeListeners]) {
    try {
      cb();
    } catch {
      /* a listener must not stop the others */
    }
  }
}

// ---------- The merge screen's answer ----------
/**
 * Import (the device's own history, progress and saves as separate choices, C5.2) or decline (null). Remembered for
 * this account on this device. Returns false if the import failed: nothing is remembered and the screen asks again.
 * "switched": the browser is signed into another account than the one on screen (PC10, 409); nothing was written and
 * the page re-reads its state (onAccountChanged).
 */
export async function answerMerge(choice: { progress: boolean; saves: boolean } | null): Promise<AccountState | false | "switched"> {
  const s = current;
  if (!s || !s.me?.signedIn) return false;
  const me = s.me;
  const own = loadProgress();
  if (!choice) {
    // PC10: a decline sends nothing, so the server cannot refuse it. Ask /me once (no-store) so a screen left open
    // after another tab switched accounts does not remember the answer for, and start syncing with, the wrong one.
    const now = await accountMe(true);
    if (!now?.signedIn || now.tag !== me.tag) {
      accountChanged(me.tag);
      return "switched";
    }
    writeJson(DEVICE_KEY, { answer: "decline", account: me.tag, own } satisfies DeviceState);
    await beginSync(me.tag);
    return settle({ me, syncing: true });
  }
  const body: Record<string, unknown> = { progress: choice.progress ? own : {} };
  if (choice.saves) body.saves = Object.entries(loadLocalSaves()).map(([slug, at]) => ({ slug, at }));
  try {
    const r = await fetch("/api/account/merge", { method: "POST", credentials: "same-origin", headers: boundHeaders(me.tag, true), body: JSON.stringify(body) });
    if (r.status === CHANGED) {
      accountChanged(me.tag);
      return "switched";
    }
    if (!r.ok) return false;
    const out = (await r.json()) as { progress: ProgressMap };
    if (choice.saves) removeKey(SAVES_KEY); // acknowledged by the server: the device copy goes (C5.2)
    writeJson(DEVICE_KEY, { answer: "import", account: me.tag, own } satisfies DeviceState);
    mergeIntoLocal(out.progress);
    await beginSync(me.tag, false); // the merge answer is the account's map: no second pull
    return settle({ me, syncing: true });
  } catch {
    return false;
  }
}

/** A history file imported on the account page counts as this device's own history (it survives sign-out). */
export function importHistoryFile(progress: ProgressMap) {
  mergeIntoLocal(progress);
  const d = readDevice();
  if (d) writeJson(DEVICE_KEY, { ...d, own: unionMaps(d.own, progress) } satisfies DeviceState);
}

// ---------- Saves ----------

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
  if (!me && changedFor) return false; // PC10: signed into another account; not known as anonymous either (C5.3)
  if (me?.signedIn && me.likesSaves) {
    try {
      const r = await fetch(`/api/account/saves/${encodeURIComponent(slug)}`, {
        method: saved ? "PUT" : "DELETE",
        credentials: "same-origin",
        headers: boundHeaders(me.tag, false),
      });
      if (r.status === CHANGED) accountChanged(me.tag);
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
  // PC10: after a 409 this page's account is unknown until the page reads it again; asking /me here would bind the
  // Like to whichever account the browser is now in, so refuse instead.
  if (!knownMe && changedFor) return false;
  const me = await accountMe();
  if (!me?.signedIn || !me.canLike) return false;
  try {
    const r = await fetch(`/api/account/likes/${encodeURIComponent(slug)}`, {
      method: liked ? "PUT" : "DELETE",
      credentials: "same-origin",
      headers: boundHeaders(me.tag, false),
    });
    if (r.status === CHANGED) accountChanged(me.tag);
    return r.ok;
  } catch {
    return false;
  }
}

// ---------- Session ----------
function forgetSession() {
  started = null;
  current = null;
  ready = new Promise<AccountState>((r) => (resolveReady = r));
  mePromise = null;
  knownMe = null;
  sessionReset = true;
}

/**
 * Sign out. PC2 safe default (privacy W-1710 may change it): the account's history leaves this device and the
 * device's own pre-sign-in history stays as it was. `clearDevice` also removes that (and saves and the event log).
 */
export async function signOut(opts: { clearDevice?: boolean } = {}): Promise<boolean> {
  await flushPending().catch(() => {});
  try {
    const r = await fetch("/api/account/auth/sign-out", { method: "POST", credentials: "same-origin", headers: jsonHeaders, body: "{}" });
    if (!r.ok) return false;
  } catch {
    return false;
  }
  endAccountOnDevice();
  if (opts.clearDevice) clearThisDevice();
  forgetSession();
  return true;
}

/**
 * Delete the account shown on this page. Returns what was deleted, null if it failed (nothing deleted), or "switched"
 * if the browser is now signed into another account (PC10, 409: nothing deleted; the page re-reads its state).
 */
export async function deleteAccount(clearDevice: boolean): Promise<Record<string, number> | null | "switched"> {
  const s = current;
  if (!s?.me?.signedIn) return null;
  const tag = s.me.tag;
  try {
    const r = await fetch("/api/account/delete", {
      method: "POST",
      credentials: "same-origin",
      headers: boundHeaders(tag, true),
      body: JSON.stringify({ confirm: true }),
    });
    if (r.status === CHANGED) {
      accountChanged(tag);
      return "switched";
    }
    if (!r.ok) return null;
    const out = (await r.json()) as { deleted: Record<string, number> };
    afterAccountDeleted(clearDevice);
    return out.deleted;
  } catch {
    return null;
  }
}

/** After a deletion the server has answered: the same device clean-up as sign-out. */
export function afterAccountDeleted(clearDevice: boolean) {
  endAccountOnDevice();
  if (clearDevice) clearThisDevice();
  forgetSession();
}

/** Clear this device's lesson history (the "also clear this device" choice, gate 2.4). */
export function clearThisDevice() {
  for (const k of [PROGRESS_KEY, EVENTS_KEY, SAVES_KEY, DEVICE_KEY]) removeKey(k);
}
