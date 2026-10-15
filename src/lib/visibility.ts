// W-480 / W-884: which lesson statuses a deployment may serve. Pure (env in, answer out) so it is unit-tested
// (tests/platform/visibility.test.mjs) without the registry. src/lib/catalog.ts applies it.
//
// - published: always.
// - review: unless SHOW_REVIEW=off (founder decision company/decisions/2026-10-15-founder-show-review.md keeps
//   them on in production, tagged "In review").
// - draft: only off Vercel (the dev server, and the local `next start` the QA contract runs against), and
//   never in a Vercel production deployment, whatever SHOW_DRAFTS or SHOW_REVIEW say. Vercel sets VERCEL=1
//   and VERCEL_ENV at build and at runtime, so both the static pages and on-demand renders see it.
//   SHOW_DRAFTS=off hides drafts anywhere (to check a local production build); SHOW_DRAFTS=on shows them
//   on a Vercel preview, never on production.
// - retired: never.
import type { DemoStatus } from "@/kit/types";

export type Env = Record<string, string | undefined>;

export function reviewVisible(env: Env = process.env): boolean {
  return env.SHOW_REVIEW !== "off";
}

export function draftsVisible(env: Env = process.env): boolean {
  if (env.VERCEL_ENV === "production") return false;
  if (env.SHOW_DRAFTS === "off") return false;
  if (env.SHOW_DRAFTS === "on") return true;
  return env.VERCEL !== "1";
}

/** May a lesson with this status be listed (feed, map) or, with includeDrafts, opened by URL? */
export function statusVisible(status: DemoStatus, opts: { includeDrafts?: boolean } = {}, env: Env = process.env): boolean {
  if (status === "published") return true;
  if (!reviewVisible(env)) return false;
  if (status === "review") return true;
  if (status === "draft") return Boolean(opts.includeDrafts) && draftsVisible(env);
  return false;
}
