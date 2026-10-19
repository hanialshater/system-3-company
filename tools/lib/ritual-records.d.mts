export const RECORD_DIRS: string[];
export function commitTimes(root: string, dirs?: string[]): Map<string, string>;
export function ritualOf(file: string, triggers: { ritual: string }[]): { ritual: string; room: string } | null;
export function recordEvents(
  triggers: unknown[],
  opts: { root: string; times?: Map<string, string> },
): { ts: string; type: string; ritual: string; record: string; room: string; actor: string; summary: string }[];
