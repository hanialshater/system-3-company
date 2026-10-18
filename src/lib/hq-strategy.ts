// The HQ Strategy page, pure side (no fs, safe in the client): the master plan's own refresh rule (stale when its as-of date is more than 14 days old). Owner: hq-engineer.

export const STALE_DAYS = 14;

/** The `as-of: YYYY-MM-DD` date written in the doc's header lines, or null. */
export function parseAsOf(text: string): string | null {
  return /\bas-of:\s*(20\d\d-[01]\d-[0-3]\d)\b/.exec(text.slice(0, 2000))?.[1] ?? null;
}

/** Whole days from the as-of date to now (UTC dates). Stale when strictly more than STALE_DAYS. */
export function asOfAge(asOf: string, now: Date): { days: number; stale: boolean } {
  const days = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - Date.parse(`${asOf}T00:00:00Z`)) / 86_400_000);
  return { days, stale: days > STALE_DAYS };
}
