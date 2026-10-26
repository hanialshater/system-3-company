// SPIKE-001 (never merged): the frame-side replacement for src/kit/progress.ts.
//
// src/kit/Lesson.tsx imports "./progress" for track() and updateProgress(). Inside a sandboxed,
// opaque-origin frame there is no localStorage (it throws) and sendBeacon would go to the lesson
// CDN, not the app. The spike build swaps this module in for "./progress" (webpack
// NormalModuleReplacementPlugin) so Lesson.tsx stays byte-for-byte unchanged, and every
// progress write or event becomes a postMessage to the host, which decides what to keep.

import type { LessonEvent } from "@/kit/types";

export interface LessonProgress {
  completedAt?: number;
  predictedCorrectly?: boolean;
  recalls: { at: number; correct: boolean }[];
}
export type ProgressMap = Record<string, LessonProgress>;

export type FrameMessage =
  | { type: "ready"; slug: string; bundle: string; kit: string }
  | { type: "phase"; slug: string; phase: string }
  | { type: "track"; event: LessonEvent }
  | { type: "progress"; slug: string; value: LessonProgress }
  | { type: "resize"; slug: string; height: number }
  | { type: "error"; slug: string; message: string }
  | { type: "key"; slug: string; key: string };

const cfg: { hostOrigin: string | null } = { hostOrigin: null };
// The frame cannot read the host's progress. It keeps its own copy for this page view only.
const local: ProgressMap = {};

export function configureBridge(hostOrigin: string | null) {
  cfg.hostOrigin = hostOrigin;
}

export function post(msg: FrameMessage) {
  if (!cfg.hostOrigin || window.parent === window) return;
  try {
    window.parent.postMessage({ s3c: 1, ...msg }, cfg.hostOrigin);
  } catch {
    /* the bridge must never break a lesson */
  }
}

export function track(event: LessonEvent) {
  post({ type: "track", event });
}

export function updateProgress(slug: string, fn: (p: LessonProgress) => LessonProgress) {
  local[slug] = fn(local[slug] ?? { recalls: [] });
  post({ type: "progress", slug, value: local[slug] });
}

export function loadProgress(): ProgressMap {
  return local;
}
