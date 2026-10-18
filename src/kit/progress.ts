"use client";

// Per-learner progress lives in the browser. It powers spaced revisits
// ("Remembering is not knowing": we come back and ask before showing).
// Every access is guarded: storage can be missing, full or blocked.
//
// EDD-008 (optional accounts): the browser stays the source of truth on the device. When a learner is signed in and
// has answered the merge screen, src/lib/account-client.ts registers a sink; it is given the entry before and after
// each update and sends only the difference (PC1). With no sink (the anonymous learner, or accounts off) nothing here
// touches the network beyond the existing beacon. The account merge code lives in the account chunk, not here (PC8).

import type { LessonEvent } from "./types";

const KEY = "s3c:progress:v1";
const EVENTS_KEY = "s3c:events:v1";

export interface LessonProgress {
  completedAt?: number;
  predictedCorrectly?: boolean;
  recalls: { at: number; correct: boolean }[];
}

export type ProgressMap = Record<string, LessonProgress>;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the lesson still works, it just will not come back */
  }
}

export function loadProgress(): ProgressMap {
  return read<ProgressMap>(KEY, {});
}

type ProgressSink = (slug: string, before: LessonProgress | undefined, after: LessonProgress) => void;
let sink: ProgressSink | null = null;

/** Registered only while signed in (account-client.ts). null removes it. */
export function setProgressSink(fn: ProgressSink | null) {
  sink = fn;
}

export function updateProgress(slug: string, fn: (p: LessonProgress) => LessonProgress) {
  const all = loadProgress();
  const before = sink ? loadProgress()[slug] : undefined; // its own copy: fn cannot change it
  all[slug] = fn(all[slug] ?? { recalls: [] });
  write(KEY, all);
  try {
    sink?.(slug, before, all[slug]);
  } catch {
    /* sync must never break a lesson */
  }
}

/** Interval schedule in days for each successful recall (expanding retrieval). */
export const REVISIT_SCHEDULE_DAYS = [1, 3, 7, 21];

export function revisitDue(p: LessonProgress, now = Date.now(), dayMs = 86_400_000): boolean {
  if (!p.completedAt) return false;
  const successes = p.recalls.filter((r) => r.correct).length;
  if (successes >= REVISIT_SCHEDULE_DAYS.length) return false;
  const last = p.recalls.length ? p.recalls[p.recalls.length - 1].at : p.completedAt;
  const wait = REVISIT_SCHEDULE_DAYS[Math.min(successes, REVISIT_SCHEDULE_DAYS.length - 1)];
  return now - last >= wait * dayMs;
}

/** Day length can be shortened for QA and local demos: ?revisitMinutes=1 */
export function dayMsFromLocation(): number {
  try {
    const m = new URLSearchParams(window.location.search).get("revisitMinutes");
    if (m && Number(m) > 0) return Number(m) * 60_000;
  } catch {
    /* ignore */
  }
  return 86_400_000;
}

export function track(event: LessonEvent) {
  const log = read<(LessonEvent & { at: number })[]>(EVENTS_KEY, []);
  log.push({ ...event, at: Date.now() });
  write(EVENTS_KEY, log.slice(-500));
  try {
    if (process.env.NEXT_PUBLIC_EVENTS !== "off") {
      navigator.sendBeacon?.("/api/events", JSON.stringify(event));
    }
  } catch {
    /* analytics must never break a lesson */
  }
}

export function loadEvents(): (LessonEvent & { at: number })[] {
  return read(EVENTS_KEY, []);
}
