import type { DemoStatus } from "@/kit/types";

export const LESSON_STATUS_LABEL: Record<DemoStatus, string> = {
  published: "Published",
  review: "In review · Unpublished",
  draft: "Draft · Unpublished",
  retired: "Retired · Unpublished",
};
