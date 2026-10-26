// Lesson frames pilot, C2 (company/engineering/reviews/2026-10-25-content-hub-production-review.md, plan step 4):
// the host side of the frame bridge. Pure: it takes a MessageEvent-like value and the card's identity, and returns
// what to do. src/components/DemoFrame.tsx applies the result to the real src/kit/progress.ts track()/updateProgress().
//
// Rules (each one is a test in tests/lesson-frames/bridge.test.mjs):
// - Identity is the source window, never the origin: every sandboxed frame's origin is "null". A message counts only
//   if it comes from this card's own iframe contentWindow, with origin "null", and names this card's slug.
// - Shape: { s3c: 1, type, ... }, at most MAX_MESSAGE_BYTES as JSON. Anything else is refused with a reason.
// - progress: only completedAt (a finite number, not in the future) and predictedCorrectly (a boolean) are taken; the
//   update is the one src/kit/Lesson.tsx makes in the app: completedAt kept if already set, predictedCorrectly replaced.
// - track: only the event types src/kit/Lesson.tsx emits (view, predict, interact, reveal, complete), rebuilt field by
//   field from the LessonEvent shape (src/kit/types.ts); extra fields are dropped. "recall" is refused: recall cards
//   run in the host, never in a lesson frame.
// - phase: one of Lesson.tsx's three phases. ready, resize, error, key: as below.
// - The host never posts anything into a frame.

import type { LessonEvent } from "@/kit/types";

export const MAX_MESSAGE_BYTES = 2048;
export const FRAME_EVENT_TYPES = ["view", "predict", "interact", "reveal", "complete"] as const;
export const FRAME_PHASES = ["predict", "explore", "reveal"] as const;
export const NAV_KEYS = ["ArrowDown", "ArrowUp", "j", "k"] as const;
/** How far ahead of the host clock a frame's completedAt may be (clock skew between two Date.now() calls). */
const FUTURE_SLACK_MS = 60_000;

export type BridgeAction =
  | { kind: "ignore"; reason: "source" } // not this card's frame: another card's or a stranger's message, say nothing
  | { kind: "reject"; reason: string }
  | { kind: "ready" }
  | { kind: "phase"; phase: (typeof FRAME_PHASES)[number] }
  | { kind: "track"; event: LessonEvent }
  | { kind: "progress"; completedAt: number; predictedCorrectly?: boolean }
  | { kind: "resize"; height: number }
  | { kind: "error"; message: string }
  | { kind: "key"; key: (typeof NAV_KEYS)[number] };

export interface BridgeInput {
  source: unknown;
  origin: string;
  data: unknown;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const has = <T extends string>(list: readonly T[], v: unknown): v is T => typeof v === "string" && (list as readonly string[]).includes(v);

function jsonBytes(v: unknown): number {
  try {
    const s = JSON.stringify(v);
    return s === undefined ? Infinity : new TextEncoder().encode(s).length;
  } catch {
    return Infinity; // cyclic or otherwise unserialisable: refuse
  }
}

function cleanEvent(slug: string, e: unknown): LessonEvent | null {
  if (!isObj(e) || e.slug !== slug || !has(FRAME_EVENT_TYPES, e.type)) return null;
  switch (e.type) {
    case "view":
    case "interact":
    case "reveal":
      return { type: e.type, slug };
    case "predict":
      if (!Number.isInteger(e.option) || (e.option as number) < 0 || (e.option as number) > 16 || typeof e.correct !== "boolean") return null;
      return { type: "predict", slug, option: e.option as number, correct: e.correct };
    case "complete":
      if (typeof e.dwellMs !== "number" || !Number.isFinite(e.dwellMs) || e.dwellMs < 0) return null;
      return { type: "complete", slug, dwellMs: e.dwellMs };
  }
  return null;
}

export function readFrameMessage(input: BridgeInput, card: { slug: string; frameWindow: unknown }, now = Date.now()): BridgeAction {
  if (!card.frameWindow || input.source !== card.frameWindow) return { kind: "ignore", reason: "source" };
  if (input.origin !== "null") return { kind: "reject", reason: "origin" };
  const m = input.data;
  if (!isObj(m) || m.s3c !== 1 || typeof m.type !== "string") return { kind: "reject", reason: "shape" };
  if (jsonBytes(m) > MAX_MESSAGE_BYTES) return { kind: "reject", reason: "size" };
  const slug = card.slug;
  if (m.type !== "track" && m.slug !== slug) return { kind: "reject", reason: "slug" };
  switch (m.type) {
    case "ready":
      return { kind: "ready" };
    case "phase":
      return has(FRAME_PHASES, m.phase) ? { kind: "phase", phase: m.phase } : { kind: "reject", reason: "phase" };
    case "track": {
      const event = cleanEvent(slug, m.event);
      return event ? { kind: "track", event } : { kind: "reject", reason: "event" };
    }
    case "progress": {
      const v = m.value;
      if (!isObj(v)) return { kind: "reject", reason: "progress" };
      const at = v.completedAt;
      if (typeof at !== "number" || !Number.isFinite(at) || at <= 0 || at > now + FUTURE_SLACK_MS) return { kind: "reject", reason: "progress" };
      if (v.predictedCorrectly !== undefined && typeof v.predictedCorrectly !== "boolean") return { kind: "reject", reason: "progress" };
      return { kind: "progress", completedAt: at, predictedCorrectly: v.predictedCorrectly as boolean | undefined };
    }
    case "resize":
      return typeof m.height === "number" && Number.isFinite(m.height) && m.height >= 0 ? { kind: "resize", height: m.height } : { kind: "reject", reason: "resize" };
    case "error":
      return { kind: "error", message: String(m.message ?? "").slice(0, 300) };
    case "key":
      return has(NAV_KEYS, m.key) ? { kind: "key", key: m.key } : { kind: "reject", reason: "key" };
    default:
      return { kind: "reject", reason: "type" };
  }
}

/** The progress update Lesson.tsx makes in the app (src/kit/Lesson.tsx, reveal), with the frame's two values. */
export function progressUpdate(a: { completedAt: number; predictedCorrectly?: boolean }) {
  return <P extends { completedAt?: number; predictedCorrectly?: boolean }>(p: P): P => ({
    ...p,
    completedAt: p.completedAt ?? a.completedAt,
    predictedCorrectly: a.predictedCorrectly,
  });
}

/** The frame URL, built only from the manifest's origin and a 64-hex frame hash. null if either is not acceptable. */
export function frameSrc(origin: string, frameDoc: string, hostOrigin: string, domainColor?: string): string | null {
  if (!/^[0-9a-f]{64}$/.test(frameDoc)) return null;
  let u: URL;
  try {
    u = new URL(origin);
  } catch {
    return null;
  }
  const local = u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  if (u.origin !== origin || !(u.protocol === "https:" || local)) return null;
  const hash = new URLSearchParams({ host: hostOrigin });
  if (domainColor && /^#[0-9a-fA-F]{3,8}$/.test(domainColor)) hash.set("domain", domainColor);
  return `${origin}/f/${frameDoc}.html#${hash.toString()}`;
}
