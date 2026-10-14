// Release log, read side for HQ (client-safe: no fs). Data: company/ops/releases.json, owned by the
// release manager (append-only, oldest first). Version scheme: YYYY.MM.DD.n (UTC date, n = release that day).
export interface LessonGroup {
  count: number;
  slugs: string[];
}
export interface Release {
  version: string;
  date: string;
  commit: string;
  target: string;
  approved_by: { who: string; record: string };
  summary: string;
  added: { features: string[]; lessons: { published: LessonGroup; in_review: LessonGroup }; fixes: string[]; known_issues: string[] };
  backfill?: string;
}
export interface Unreleased {
  base: string | null;
  commits: { hash: string; subject: string; date: string }[];
  error?: string;
}

export const VERSION_RE = /^(\d{4})\.(\d{2})\.(\d{2})\.([1-9]\d*)$/;
export const REPO = "https://github.com/hanialshater/system-3-company";

/** Why a releases file is invalid, or null if it is fine. Checks shape, version/date agreement, order and uniqueness. */
export function validateReleases(data: unknown): string | null {
  const list = (data as { releases?: unknown })?.releases;
  if (!Array.isArray(list)) return "releases must be an array";
  const seen = new Set<string>();
  let prev = "";
  for (const [i, r] of (list as Release[]).entries()) {
    const at = `releases[${i}]`;
    const m = VERSION_RE.exec(r?.version ?? "");
    if (!m) return `${at}: version "${r?.version}" is not YYYY.MM.DD.n`;
    if (seen.has(r.version)) return `${at}: duplicate version ${r.version}`;
    seen.add(r.version);
    if (!/^\d{4}-\d{2}-\d{2}T.*Z$/.test(r.date ?? "") || Number.isNaN(Date.parse(r.date))) return `${at}: date must be a UTC ISO timestamp ending in Z`;
    if (r.date.slice(0, 10) !== `${m[1]}-${m[2]}-${m[3]}`) return `${at}: version date does not match date`;
    if (r.date < prev) return `${at}: not in date order (the log is append-only, oldest first)`;
    prev = r.date;
    if (!/^[0-9a-f]{40}$/.test(r.commit ?? "")) return `${at}: commit must be a full 40-character hash`;
    if (r.target !== "production") return `${at}: target must be production`;
    if (!r.approved_by?.who || !r.approved_by?.record) return `${at}: approved_by needs who and record`;
    if (!r.summary) return `${at}: summary is empty`;
    const a = r.added;
    if (!a || !Array.isArray(a.features) || !Array.isArray(a.fixes) || !Array.isArray(a.known_issues)) return `${at}: added needs features, fixes, known_issues arrays`;
    for (const g of ["published", "in_review"] as const) {
      const l = a.lessons?.[g];
      if (!l || l.count !== l.slugs?.length) return `${at}: lessons.${g}.count must equal its slugs`;
    }
  }
  return null;
}

export const newestFirst = (rs: Release[]) => [...rs].reverse();

/** The next version for a release made at `now`: today's UTC date, n one past the highest n already used that day. */
export function nextVersion(rs: Pick<Release, "version">[], now: Date): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, ".");
  const n = rs.map((r) => VERSION_RE.exec(r.version)).filter((m) => m && `${m[1]}.${m[2]}.${m[3]}` === day).map((m) => Number(m![4]));
  return `${day}.${Math.max(0, ...n) + 1}`;
}

export const commitUrl = (hash: string) => `${REPO}/commit/${hash}`;
