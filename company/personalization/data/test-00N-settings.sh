#!/usr/bin/env bash
# Up/down test for the DRAFT 00N_settings migration (W-1521), on a throwaway local Postgres
# cluster with fake data only. Not the project runner (tools/db-migrate.mjs is on the `accounts`
# branch and backend-engineer's); this proves the SQL, not runner compatibility.
# Needs PostgreSQL server binaries (initdb, pg_ctl). Usage: bash test-00N-settings.sh
# The auth_user stub below has only the column the FK needs; the real table is migration 001's.
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
bin=${PG_BIN:-$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)}
[ -x "$bin/initdb" ] || { echo "SKIP: no initdb found (set PG_BIN)"; exit 0; }
tmp=$(mktemp -d); port=${PG_PORT:-54329}
runas=(); if [ "$(id -u)" = 0 ]; then chown postgres "$tmp"; runas=(runuser -u postgres --); fi
cleanup() { "${runas[@]}" "$bin/pg_ctl" -D "$tmp/db" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$tmp"; }
trap cleanup EXIT
"${runas[@]}" "$bin/initdb" -D "$tmp/db" -U postgres -A trust >/dev/null
"${runas[@]}" "$bin/pg_ctl" -D "$tmp/db" -o "-p $port -k $tmp -c listen_addresses=''" -l "$tmp/log" -w start >/dev/null
q() { "${runas[@]}" psql -h "$tmp" -p "$port" -U postgres -d postgres -v ON_ERROR_STOP=1 -qAt "$@"; }
pass=0; fail=0
ok()  { pass=$((pass+1)); echo "ok   $1"; }
bad() { fail=$((fail+1)); echo "FAIL $1"; }
accept() { if q -c "$2" >/dev/null 2>&1; then ok "$1"; else bad "$1 (rejected)"; fi; }
# A reject passes only on a constraint violation (CHECK, NOT NULL, FK, unique), never on a typo.
reject() { local e; if e=$(q -c "$2" 2>&1); then bad "$1 (accepted)"; elif grep -q "violates" <<<"$e"; then ok "$1"; else bad "$1 (other error: $e)"; fi; }

q -c "CREATE TABLE auth_user (id text PRIMARY KEY);
      CREATE TABLE progress (user_id text REFERENCES auth_user(id) ON DELETE CASCADE, slug text);
      INSERT INTO auth_user VALUES ('u-fake-1'), ('u-fake-2'), ('u-fake-3');
      INSERT INTO progress VALUES ('u-fake-1', 'fake-lesson');"
before=$(q -c "SELECT md5(string_agg(table_name||column_name||data_type, ',' ORDER BY table_name, column_name)) FROM information_schema.columns WHERE table_schema='public'")

q -f "$here/00N_settings.up.sql"; ok "up applies"
cols=$(q -c "SELECT string_agg(column_name||':'||data_type, ' ' ORDER BY ordinal_position) FROM information_schema.columns WHERE table_name='settings'")
[ "$cols" = "user_id:text personalization_on:boolean subjects:ARRAY less_of:ARRAY" ] && ok "exactly 4 columns ($cols)" || bad "columns: $cols"
idx=$(q -c "SELECT count(*) FROM pg_indexes WHERE tablename='settings'")
[ "$idx" = 1 ] && ok "only the primary-key index (no cross-learner index, SS5)" || bad "indexes: $idx"

accept "row with no choice (all defaults, personalization_on NULL)" "INSERT INTO settings (user_id) VALUES ('u-fake-1')"
accept "explicit off + subjects + typed less_of" "INSERT INTO settings VALUES ('u-fake-2', false, '{math,cs}', '{domain:history,concept:overfitting,lesson:fake-lesson-slug}')"
reject "unknown account (FK)" "INSERT INTO settings (user_id) VALUES ('u-nobody')"
reject "free text in subjects (SS1)" "UPDATE settings SET subjects = '{\"I like space\"}' WHERE user_id='u-fake-1'"
reject "uppercase/punctuation in subjects" "UPDATE settings SET subjects = '{Math!}' WHERE user_id='u-fake-1'"
reject "untyped less_of entry (SS1)" "UPDATE settings SET less_of = '{overfitting}' WHERE user_id='u-fake-1'"
reject "unknown less_of kind" "UPDATE settings SET less_of = '{topic:dating}' WHERE user_id='u-fake-1'"
reject "free text after a kind" "UPDATE settings SET less_of = '{\"concept:my ex\"}' WHERE user_id='u-fake-1'"
reject "NULL element in subjects" "UPDATE settings SET subjects = ARRAY['math', NULL] WHERE user_id='u-fake-1'"
reject "NULL subjects" "UPDATE settings SET subjects = NULL WHERE user_id='u-fake-1'"
reject "2-D array" "UPDATE settings SET subjects = '{{math},{cs}}' WHERE user_id='u-fake-1'"
reject "33 subjects (cap 32)" "UPDATE settings SET subjects = (SELECT array_agg('d'||g) FROM generate_series(1,33) g) WHERE user_id='u-fake-1'"
accept "32 subjects" "UPDATE settings SET subjects = (SELECT array_agg('d'||g) FROM generate_series(1,32) g) WHERE user_id='u-fake-1'"
reject "51 less_of (cap 50, SS2)" "UPDATE settings SET less_of = (SELECT array_agg('lesson:l'||g) FROM generate_series(1,51) g) WHERE user_id='u-fake-1'"
accept "50 less_of" "UPDATE settings SET less_of = (SELECT array_agg('lesson:l'||g) FROM generate_series(1,50) g) WHERE user_id='u-fake-1'"
accept "200-char slug" "UPDATE settings SET less_of = ARRAY['lesson:'||repeat('a',200)] WHERE user_id='u-fake-1'"
reject "201-char slug" "UPDATE settings SET less_of = ARRAY['lesson:'||repeat('a',201)] WHERE user_id='u-fake-1'"
reject "second row for one account" "INSERT INTO settings (user_id) VALUES ('u-fake-2')"

q -c "DELETE FROM auth_user WHERE id='u-fake-2'"
n=$(q -c "SELECT count(*) FROM settings WHERE user_id='u-fake-2'")
[ "$n" = 0 ] && ok "account deletion cascades to settings (SS4)" || bad "cascade left $n rows"

q -f "$here/00N_settings.down.sql"
t=$(q -c "SELECT count(*) FROM information_schema.tables WHERE table_name='settings'")
[ "$t" = 0 ] && ok "down drops settings" || bad "settings still present"
after=$(q -c "SELECT md5(string_agg(table_name||column_name||data_type, ',' ORDER BY table_name, column_name)) FROM information_schema.columns WHERE table_schema='public'")
[ "$before" = "$after" ] && ok "down leaves the other tables' schema as before" || bad "schema differs after down"
r=$(q -c "SELECT count(*) FROM auth_user")||true; p=$(q -c "SELECT count(*) FROM progress")
[ "$r/$p" = "2/1" ] && ok "down leaves auth_user and progress rows alone" || bad "rows after down: $r/$p"
q -f "$here/00N_settings.up.sql" && q -f "$here/00N_settings.down.sql" && q -f "$here/00N_settings.up.sql" && ok "up/down/up repeats cleanly" || bad "up/down/up"

echo "$pass passed, $fail failed"
[ "$fail" = 0 ]
