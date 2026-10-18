// The 24-month idle rule (EDD-008 §9, P1.6). Owner: backend-engineer.
//
// UNREACHABLE ON PURPOSE (privacy M2, Q3): no route, tool or job imports this file. Release 1 ships with the idle
// purge off; no account can be idle 24 months before about December 2028, and switching it on needs the P1.8 notice
// decision (founder, O4) and its own review. tests/accounts/accounts.test.mjs fails if any file in src/ other than
// this one names these constants, imports this file, or contains the 24-month interval.
//
// M2: "idle" is measured on last activity, not on sign-in only: the greater of last_sign_in_at (moved by the
// session.update.after hook on each refresh, at most daily) and the newest auth_session.updated_at.
export const LAST_ACTIVITY_SQL = `greatest(u.last_sign_in_at, (SELECT max(s.updated_at) FROM auth_session s WHERE s.user_id = u.id))`;

/** Tombstone, then delete, every account idle for 24 months. Cascades remove progress, recall, likes, saves. */
export const IDLE_PURGE_SQL = `
WITH idle AS (
  SELECT u.id FROM auth_user u WHERE ${LAST_ACTIVITY_SQL} < now() - interval '24 months'
), tomb AS (
  INSERT INTO deleted_account (user_id) SELECT id FROM idle ON CONFLICT DO NOTHING
)
DELETE FROM auth_user WHERE id IN (SELECT id FROM idle)`;
