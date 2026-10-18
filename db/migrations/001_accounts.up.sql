-- Migration 001: optional accounts and server-side progress (EDD-008 §6.4).
-- Owner: backend-engineer. Reviewed: privacy-reviewer 2026-10-16 (Q2 pass with M1, M3), principal-engineer C1-C11.
-- Applied only by tools/db-migrate.mjs, by hand (ADR-009 §3). Never at build or run time (C10).
-- Requires PostgreSQL 16 or newer: the M1 CHECK uses IS JSON (readiness A-14).

CREATE TABLE auth_user (
  id                 text PRIMARY KEY,
  email              text NOT NULL CHECK (length(email) <= 254),
  email_verified     boolean NOT NULL DEFAULT false,
  name               text NOT NULL DEFAULT '' CHECK (name = ''),
  image              text CHECK (image IS NULL),
  age_band           text NOT NULL CHECK (age_band IN ('13-15', '16+')),
  policy_version     text NOT NULL CHECK (length(policy_version) <= 32),
  policy_accepted_at timestamptz NOT NULL,
  -- "last sign-in or signed-in use, to the day": the idle clock only (privacy re-read R-M2a, R-M2b).
  last_sign_in_at    timestamptz NOT NULL DEFAULT now(),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX auth_user_email_lower ON auth_user (lower(email));

CREATE TABLE auth_session (
  id         text PRIMARY KEY,
  token      text NOT NULL UNIQUE,
  user_id    text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  -- P1.1: never stored. The library writes them; the hook blanks them; this refuses anything else.
  ip_address text CHECK (coalesce(ip_address, '') = ''),
  user_agent text CHECK (coalesce(user_agent, '') = '')
);
CREATE INDEX auth_session_user ON auth_session (user_id);
CREATE INDEX auth_session_expires ON auth_session (expires_at);

-- Expected to hold 0 rows with magic link (privacy Q2: a row is a stop, not a warning).
CREATE TABLE auth_account (
  id text PRIMARY KEY,
  account_id text NOT NULL,
  provider_id text NOT NULL,
  user_id text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  access_token text, refresh_token text, id_token text,
  access_token_expires_at timestamptz, refresh_token_expires_at timestamptz,
  scope text, password text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (access_token IS NULL AND refresh_token IS NULL AND id_token IS NULL AND password IS NULL)
);
CREATE INDEX auth_account_user ON auth_account (user_id);

-- A pending sign-in link: identifier is "magic-link:" + the hash of the token (storeToken: "hashed").
CREATE TABLE auth_verification (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  -- M1: no name, ever, even if code calls the library directly. Non-JSON and non-objects are refused.
  CONSTRAINT auth_verification_no_name CHECK (
    CASE WHEN value IS JSON OBJECT THEN coalesce(value::jsonb ->> 'name', '') = '' ELSE false END
  )
);
CREATE INDEX auth_verification_identifier ON auth_verification (identifier);
CREATE INDEX auth_verification_expires ON auth_verification (expires_at);

-- Carries the age band from the age screen to the moment the account is created (§6.2). No email, no id.
CREATE TABLE signup_intent (
  token_hash     text PRIMARY KEY,
  age_band       text NOT NULL CHECK (age_band IN ('13-15', '16+')),
  policy_version text NOT NULL CHECK (length(policy_version) <= 32),
  created_at     timestamptz NOT NULL DEFAULT now(),
  expires_at     timestamptz NOT NULL,
  CHECK (expires_at <= created_at + interval '10 minutes')
);

CREATE TABLE progress (
  user_id             text NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  slug                text NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  completed_at_ms     bigint,
  predicted_correctly boolean,
  PRIMARY KEY (user_id, slug)
);

CREATE TABLE recall (
  user_id text   NOT NULL,
  slug    text   NOT NULL,
  at_ms   bigint NOT NULL,
  correct boolean NOT NULL,
  PRIMARY KEY (user_id, slug, at_ms),
  FOREIGN KEY (user_id, slug) REFERENCES progress(user_id, slug) ON DELETE CASCADE
);

-- Tombstone: re-apply deletions after a point-in-time restore (ADR-009 §6). Random id and a time; 35 days.
CREATE TABLE deleted_account (
  user_id    text PRIMARY KEY,
  deleted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX deleted_account_at ON deleted_account (deleted_at);
