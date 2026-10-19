// Founder direction, 2026-10-19: list and open every lesson, labelled by its real status.
// Visibility is independent of publication and verification; no lesson records are promoted.
import type { DemoStatus } from "@/kit/types";

export type Env = Record<string, string | undefined>;

// Retained for callers of the previous environment-based policy. Legacy hide flags no longer
// override the founder's all-lessons catalog on development, preview or production.
export function reviewVisible(_env: Env = process.env): boolean { return true; }
export function draftsVisible(_env: Env = process.env): boolean { return true; }

export function statusVisible(status: DemoStatus, _opts: { includeDrafts?: boolean } = {}, _env: Env = process.env): boolean {
  return ["published", "review", "draft", "retired"].includes(status);
}
