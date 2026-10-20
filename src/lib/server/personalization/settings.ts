// The learner's feed settings: shape, validation and the read rules (W-1717). Pure: no I/O, no logging.
// Owner: learner-data-engineer. Privacy ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md
// §3 (B1–B4), §3.1 (D1–D3), §3.2 (G1–G4). Schema: db/migrations/003_account_preferences.up.sql and 004_account_preference_experiences.up.sql.
// Design note for this API: company/personalization/data/2026-10-16-settings-api-note.md
//
// Every value here is a choice the learner stated (SS3). Nothing derived is stored (D20): no fingerprint, need
// score, composer term, ability or mastery state, no arm (D3), no timestamp. Imported by relative path only, so the
// node:test loader can run it without the Next alias.

export const EXPERIENCE_KEYS = ["surprise", "visualExplanation", "playfulness", "practicalValue", "depth"] as const;
export type Challenge = null | "gentle" | "balanced" | "demanding";
const challenges = new Set(["gentle", "balanced", "demanding"]);
const cleanExperiences = (raw: readonly unknown[]) => keepMembers(raw, v => (EXPERIENCE_KEYS as readonly string[]).includes(v));

/** The stated choices, in the shape of the s3c-export-v1 `settings` block. */
export type FeedSettings = {
  /** AMD-008 P4. null = the learner has made no choice (D1); false always wins (D2). */
  personalizationOn: boolean | null;
  /** Domain ids from content/domains.json. */
  subjects: string[];
  /** Typed catalog references: "domain:<id>" | "concept:<id>" | "lesson:<slug>". */
  lessOf: string[];
  experiences: string[];
  challenge: Challenge;
};

/** D1: a missing row and a NULL column mean the same thing, "no choice". */
export const NO_CHOICE: Readonly<FeedSettings> = Object.freeze({ personalizationOn: null, subjects: [], lessOf: [], experiences: [], challenge: null });

/** What the write path checks membership against (B1). Built from content/ and the lesson registry by the wiring. */
export type SettingsCatalog = {
  domains: ReadonlySet<string>;
  concepts: ReadonlySet<string>;
  lessons: ReadonlySet<string>;
};

/** SS2 database backstops (numbered settings migrations). The app cap for subjects is the live domain count, lower. */
export const DB_MAX_SUBJECTS = 32;
export const MAX_LESS_OF = 50;
/** A raw array longer than this is refused before any work: no real settings screen sends it. */
export const MAX_RAW_ITEMS = 200;
/** The longest raw element looked at; longer strings cannot be catalog ids (slug cap 200 + "lesson:"). */
export const MAX_RAW_ITEM_CHARS = 220;

/** The only keys a write may carry. Any other key (an arm, a timestamp, a score) is dropped unread (gate 2.3, D3). */
export const WRITABLE_KEYS = ["personalizationOn", "subjects", "lessOf", "experiences", "challenge"] as const;

const LESS_OF_KINDS = ["domain", "concept", "lesson"] as const;

export function subjectsCap(catalog: SettingsCatalog): number {
  return Math.min(DB_MAX_SUBJECTS, catalog.domains.size);
}

const isMemberLessOf = (v: string, catalog: SettingsCatalog): boolean => {
  const i = v.indexOf(":");
  if (i <= 0) return false;
  const kind = v.slice(0, i);
  const id = v.slice(i + 1);
  if (!(LESS_OF_KINDS as readonly string[]).includes(kind)) return false;
  if (kind === "domain") return catalog.domains.has(id);
  if (kind === "concept") return catalog.concepts.has(id);
  return catalog.lessons.has(id);
};

/** Keep catalog members only, first occurrence wins, order kept (B1: unknown dropped, duplicates removed). */
function keepMembers(raw: readonly unknown[], isMember: (v: string) => boolean): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of raw) {
    if (typeof v !== "string" || v.length > MAX_RAW_ITEM_CHARS) continue;
    if (seen.has(v) || !isMember(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

export function cleanSubjects(raw: readonly unknown[], catalog: SettingsCatalog): string[] {
  return keepMembers(raw, (v) => catalog.domains.has(v));
}

export function cleanLessOf(raw: readonly unknown[], catalog: SettingsCatalog): string[] {
  return keepMembers(raw, (v) => isMemberLessOf(v, catalog));
}

/**
 * Read path: a stored row as the learner and the serving code see it. Ids that left the catalog since they were
 * chosen are ignored here and dropped when the learner next writes that list; nothing rewrites the row in the
 * background (SS3).
 */
export function cleanStored(row: FeedSettings | null, catalog: SettingsCatalog): FeedSettings {
  if (!row) return { ...NO_CHOICE, subjects: [], lessOf: [], experiences: [] };
  return {
    personalizationOn: row.personalizationOn === true || row.personalizationOn === false ? row.personalizationOn : null,
    subjects: cleanSubjects(row.subjects ?? [], catalog),
    lessOf: cleanLessOf(row.lessOf ?? [], catalog),
    experiences: cleanExperiences(row.experiences ?? []),
    challenge: challenges.has(row.challenge ?? "") ? row.challenge : null,
  };
}

export type WriteMode = "set" | "merge";

/** A validated write request: only the keys the learner sent, each already cleaned against the catalog. */
export type SettingsPatch = {
  mode: WriteMode;
  personalizationOn?: boolean | null;
  subjects?: string[];
  lessOf?: string[];
  experiences?: string[];
  challenge?: Challenge;
};

export type ParseResult = { ok: true; patch: SettingsPatch } | { ok: false; error: "malformed" | "too_many" };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Parse a PUT body. Known keys of the wrong type make the request malformed; unknown keys are dropped unread;
 * unknown or duplicate ids are dropped (B1); more stated choices than the caps allow is refused, not truncated,
 * so a learner's choice is never silently lost (SS2). Error results never echo the input.
 */
export function parseSettingsWrite(body: unknown, catalog: SettingsCatalog): ParseResult {
  if (!isObj(body)) return { ok: false, error: "malformed" };
  const mode = body.mode === undefined ? "set" : body.mode;
  if (mode !== "set" && mode !== "merge") return { ok: false, error: "malformed" };
  const patch: SettingsPatch = { mode };

  if (Object.hasOwn(body, "personalizationOn")) {
    const v = body.personalizationOn;
    if (v !== true && v !== false && v !== null) return { ok: false, error: "malformed" };
    patch.personalizationOn = v;
  }
  if (Object.hasOwn(body, "challenge")) {
    const value = body.challenge;
    if (value !== null && (typeof value !== "string" || !challenges.has(value))) return { ok: false, error: "malformed" };
    patch.challenge = value as Challenge;
  }
  for (const key of ["subjects", "lessOf", "experiences"] as const) {
    if (!Object.hasOwn(body, key)) continue;
    const raw = body[key];
    if (!Array.isArray(raw)) return { ok: false, error: "malformed" };
    if (raw.length > MAX_RAW_ITEMS) return { ok: false, error: "too_many" };
    const clean = key === "experiences" ? cleanExperiences(raw) : key === "subjects" ? cleanSubjects(raw, catalog) : cleanLessOf(raw, catalog);
    const cap = key === "experiences" ? 5 : key === "subjects" ? subjectsCap(catalog) : MAX_LESS_OF;
    if (clean.length > cap) return { ok: false, error: "too_many" };
    patch[key] = clean;
  }
  return { ok: true, patch };
}

/** The row a write would create on an account with no row: keys not sent take the D1 "no choice" values. */
export function freshRow(patch: SettingsPatch): FeedSettings {
  return {
    personalizationOn: patch.personalizationOn ?? null,
    subjects: patch.subjects ?? [],
    lessOf: patch.lessOf ?? [],
    experiences: patch.experiences ?? [],
    challenge: patch.challenge ?? null,
  };
}

/** D1: a row holding nothing but "no choice" is never created; there is nothing to keep. */
export function isNoChoice(s: FeedSettings): boolean {
  return sameSettings(NO_CHOICE, s);
}

/**
 * The write rule, as one function of (the row as it is when the write lands, the request). This is the reference
 * model of the single SQL statement in settings-store.ts (D2a, C7): the database evaluates exactly this against the
 * row it has locked, so no request ever writes a value it read earlier. Returns the row after the write, or null when
 * there is still no row. Nothing here reads anything but its arguments.
 *
 * "set" (default): only the keys sent are written; keys not sent keep whatever the row holds at that moment. So a
 *   subjects-only write can never carry a stale personalizationOn back over an explicit off (D2).
 * "merge": the learner confirmed "Keep my history" with these device choices listed on screen (G1). The client sends
 *   this mode only after that confirm; the server cannot see the screen, so that is the client's contract.
 *   - No account row: the device's choices are written (G2: already cleaned by the same parse as "set").
 *   - Account row: the account wins for the lists, no union (G3), and the device takes the result (G4, client side).
 *   - Either side holding an explicit false gives false (G3: an explicit off is never turned on by a merge).
 * Either mode: a write that would create a "no choice" row creates nothing (D1).
 */
export function applyWrite(row: FeedSettings | null, patch: SettingsPatch): FeedSettings | null {
  if (!row) {
    const fresh = freshRow(patch);
    return isNoChoice(fresh) ? null : fresh;
  }
  if (patch.mode === "merge") {
    const off = row.personalizationOn === false || patch.personalizationOn === false;
    return { personalizationOn: off ? false : row.personalizationOn, subjects: row.subjects, lessOf: row.lessOf, experiences: row.experiences ?? [], challenge: row.challenge ?? null };
  }
  return {
    personalizationOn: patch.personalizationOn !== undefined ? patch.personalizationOn : row.personalizationOn,
    subjects: patch.subjects ?? row.subjects,
    lessOf: patch.lessOf ?? row.lessOf,
    experiences: patch.experiences ?? row.experiences ?? [],
    challenge: patch.challenge !== undefined ? patch.challenge : row.challenge ?? null,
  };
}

export function sameSettings(a: FeedSettings, b: FeedSettings): boolean {
  return (
    a.personalizationOn === b.personalizationOn &&
    (a.challenge ?? null) === (b.challenge ?? null) &&
    (a.experiences ?? []).length === (b.experiences ?? []).length &&
    (a.experiences ?? []).every((v, i) => v === b.experiences?.[i]) &&
    a.subjects.length === b.subjects.length &&
    a.subjects.every((v, i) => v === b.subjects[i]) &&
    a.lessOf.length === b.lessOf.length &&
    a.lessOf.every((v, i) => v === b.lessOf[i])
  );
}

/**
 * What the serving code may do with a learner's settings (the read path for learner-model-engineer).
 * - "off": an explicit false (D2). The F1 default order, whatever subjects and lessOf hold. Read per request, no cache.
 * - "no-choice": NULL or no row (D1). The F1 default order, or, under a registered experiment, the arm. The arm is
 *   never read from or written to settings (D3); it comes from the registration (analytics-steward, N5).
 * - "on": the learner turned personalization on; subjects and lessOf filter the feed.
 */
export type ServingSettings =
  | { mode: "off" }
  | { mode: "no-choice"; subjects: readonly string[]; lessOf: readonly string[] }
  | { mode: "on"; subjects: readonly string[]; lessOf: readonly string[] };

export function servingSettings(s: FeedSettings): ServingSettings {
  if (s.personalizationOn === false) return { mode: "off" };
  if (s.personalizationOn === true) return { mode: "on", subjects: s.subjects, lessOf: s.lessOf };
  return { mode: "no-choice", subjects: s.subjects, lessOf: s.lessOf };
}

/**
 * Build the membership catalog (B1) from the sources the ruling names: content/domains.json for domains, the
 * curriculum maps (content/curriculum/<domain>.json) for concepts, and every lesson meta.json (the registry) for
 * lesson slugs. Pure, so tests can build it from the real files.
 */
export function buildSettingsCatalog(
  domainIds: Iterable<string>,
  curricula: Iterable<{ concepts?: readonly { id?: unknown }[] }>,
  lessonSlugs: Iterable<string>,
): SettingsCatalog {
  const concepts = new Set<string>();
  for (const c of curricula) for (const k of c.concepts ?? []) if (typeof k.id === "string") concepts.add(k.id);
  return { domains: new Set(domainIds), concepts, lessons: new Set(lessonSlugs) };
}

/**
 * B3 export: the `settings` block of s3c-export-v1, for backend-engineer's GET /api/account/export (patch in the API
 * note §5). Exactly what is stored, stale ids included (an export is the learner's copy of the row, not a filtered
 * view); no row gives the D1 "no choice" block. Same shape as the local key D22, so the file imports unchanged.
 */
export function settingsExportBlock(row: FeedSettings | null): FeedSettings {
  if (!row) return { ...NO_CHOICE, subjects: [], lessOf: [], experiences: [] };
  return {
    personalizationOn: row.personalizationOn === true || row.personalizationOn === false ? row.personalizationOn : null,
    subjects: [...row.subjects],
    lessOf: [...row.lessOf],
    experiences: [...(row.experiences ?? [])],
    challenge: row.challenge ?? null,
  };
}
