-- Account preferences; no derived values or timestamps. Number/order subject to backend review.
CREATE TABLE IF NOT EXISTS settings (
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
