-- DRAFT migration 00N_settings (up). W-1521. Owner: learner-data-engineer (Customer Data team).
-- NOT written against the `accounts` branch (not fetchable on 2026-10-16); drafted on main from
-- EDD-008 §6.4 as quoted there. The number N, the file's place in db/migrations/, and whether
-- tools/db-migrate.mjs wraps each file in a transaction are backend-engineer's order review.
-- Design note: company/personalization/data/2026-10-16-settings-schema-note.md
-- Not to be applied anywhere real before privacy-reviewer's written pass on that note.
--
-- One row per account, written only by an explicit learner action (SS3). Four columns, all stated
-- choices; nothing derived (D20: no fingerprint, need score, composer term, ability or mastery state).
-- No free text (SS1): elements are catalog ids, shape-checked here, membership-checked on write.
-- No secondary index: nothing may query settings across learners (SS5).

CREATE TABLE settings (
  user_id            text PRIMARY KEY REFERENCES auth_user(id) ON DELETE CASCADE,

  -- The AMD-008 P4 switch. NULL = the learner has made no choice (default is an open question,
  -- see the note §5; this draft follows the VP's position). An explicit false always wins.
  personalization_on boolean,

  -- SS1/SS2: domain ids from content/domains.json. App caps at the live domain count and drops
  -- unknown ids; the database backstops shape, a 1-D array, no NULL element, and 32 entries.
  subjects           text[] NOT NULL DEFAULT '{}'
    CHECK (coalesce(array_ndims(subjects), 1) = 1)
    CHECK (cardinality(subjects) <= 32)
    CHECK (array_position(subjects, NULL) IS NULL)
    CHECK (array_to_string(subjects, ',') ~ '^([a-z0-9][a-z0-9-]{0,63}(,[a-z0-9][a-z0-9-]{0,63})*)?$'),

  -- SS1/SS2: typed catalog references, because concept ids and lesson slugs overlap (20 of 974
  -- slugs equal a concept id on 2026-10-16): 'domain:<id>', 'concept:<id>' or 'lesson:<slug>'.
  -- At most 50. Slug length follows progress.slug (<= 200).
  less_of            text[] NOT NULL DEFAULT '{}'
    CHECK (coalesce(array_ndims(less_of), 1) = 1)
    CHECK (cardinality(less_of) <= 50)
    CHECK (array_position(less_of, NULL) IS NULL)
    CHECK (array_to_string(less_of, ',') ~ '^((domain|concept|lesson):[a-z0-9][a-z0-9-]{0,199}(,(domain|concept|lesson):[a-z0-9][a-z0-9-]{0,199})*)?$')
);
