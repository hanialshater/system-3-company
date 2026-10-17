-- Migration 002: likes and saves (PRD-005; EDD-008 addendum 2026-10-17).
-- Privacy ruling: company/reviews/_privacy/2026-10-17-prd-005-likes-saves.md C6.1: exactly user_id, slug,
-- created_at_ms, PK (user_id, slug); any further column is a block. Unlike and unsave DELETE the row (no tombstone).
-- No counter column: the public count is computed from rows at read time (addendum A2).

CREATE TABLE lesson_like (
  user_id       text   NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  slug          text   NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  created_at_ms bigint NOT NULL,
  PRIMARY KEY (user_id, slug)
);
CREATE INDEX lesson_like_slug ON lesson_like (slug);

CREATE TABLE lesson_save (
  user_id       text   NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  slug          text   NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  created_at_ms bigint NOT NULL,
  PRIMARY KEY (user_id, slug)
);
