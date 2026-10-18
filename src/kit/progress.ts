"use client";

// Per-learner progress lives in the browser. It powers spaced revisits
// ("Remembering is not knowing": we come back and ask before showing).
// Every access is guarded: storage can be missing, full or blocked.
//
// EDD-008 (optional accounts): the browser stays the source of truth on the device. When a learner is signed in,
// src/lib/account-client.ts registers a sink, and each update is also sent as a one-slug delta. With no sink (the
// anonymous learner, or accounts off) nothing here touches the network beyond the existing beacon.

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

type ProgressSink = (slug: string, entry: LessonProgress) => void;
let sink: ProgressSink | null = null;

/** Registered only while signed in (account-client.ts). null removes it. */
export function setProgressSink(fn: ProgressSink | null) {
  sink = fn;
}

export function updateProgress(slug: string, fn: (p: LessonProgress) => LessonProgress) {
  const all = loadProgress();
  all[slug] = fn(all[slug] ?? { recalls: [] });
  write(KEY, all);
  try {
    sink?.(slug, all[slug]);
  } catch {
    /* sync must never break a lesson */
  }
}

/**
 * Union another map into the local one (EDD-008 §8, the same rule the server uses): earliest completion wins, a
 * prediction already on the account is kept, recalls de-duplicated by `at` and sorted (revisitDue reads the last).
 * `incoming` is the account's merged map, so its prediction wins where it has one. Never removes anything.
 */
export function mergeIntoLocal(incoming: ProgressMap): ProgressMap {
  const all = loadProgress();
  for (const [slug, theirs] of Object.entries(incoming)) {
    const mine = all[slug] ?? { recalls: [] };
    const completed = [mine.completedAt, theirs.completedAt].filter((x): x is number => typeof x === "number");
    const byAt = new Map<number, { at: number; correct: boolean }>();
    for (const r of [...(mine.recalls ?? []), ...(theirs.recalls ?? [])]) if (!byAt.has(r.at)) byAt.set(r.at, r);
    const next: LessonProgress = { recalls: [...byAt.values()].sort((a, b) => a.at - b.at) };
    if (completed.length) next.completedAt = Math.min(...completed);
    const predicted = theirs.predictedCorrectly ?? mine.predictedCorrectly;
    if (predicted !== undefined) next.predictedCorrectly = predicted;
    all[slug] = next;
  }
  write(KEY, all);
  return all;
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
