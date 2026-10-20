// Real synthetic PostgreSQL only. Root coordinates a disposable database; never production/Neon.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { REPO, storeMod } from "./helpers.mjs";
import { exportAccount, deleteAccount } from "../../src/lib/server/progress-store.ts";
import { migrateUp } from "../../tools/db-migrate.mjs";
const url = process.env.ACCOUNT_PREFERENCES_TEST_DATABASE_URL;
const St = await storeMod();
const up = fs.readFileSync(path.join(REPO, "db/migrations/004_account_preference_experiences.up.sql"), "utf8");
const down = fs.readFileSync(path.join(REPO, "db/migrations/004_account_preference_experiences.down.sql"), "utf8");

test("synthetic SQL: clean migration, old-schema upgrade/rollback, exact constraints, atomic writes, export and erasure", { skip: !url && "set dedicated disposable ACCOUNT_PREFERENCES_TEST_DATABASE_URL" }, async () => {
  const pool = new pg.Pool({ connectionString: url, max: 3 });
  const c = await pool.connect();
  const q = (text, args = []) => c.query(text, args);
  try {
    await q("DROP SCHEMA public CASCADE; CREATE SCHEMA public");
    await migrateUp(c);
    await q("INSERT INTO auth_user (id,email,age_band,policy_version,policy_accepted_at) VALUES ('prefs-a','prefs-a@example.test','16+','fake',now()),('prefs-b','prefs-b@example.test','16+','fake',now())");
    const store = St.pgSettingsStore(q);
    const saved = { mode: "set", personalizationOn: true, subjects: ["math"], lessOf: ["lesson:gone"], experiences: ["surprise", "depth"], challenge: "demanding" };
    await store.put("prefs-a", saved);
    assert.deepEqual(await store.get("prefs-a"), { personalizationOn: true, subjects: ["math"], lessOf: ["lesson:gone"], experiences: ["surprise", "depth"], challenge: "demanding" });
    assert.equal(await store.get("prefs-b"), null);
    for (const [column, value] of [["experiences", ["unknown"]], ["experiences", [null]], ["experiences", ["depth", "depth", "depth", "depth", "depth", "depth"]], ["experiences", [["depth"]]], ["challenge", "inferred"]]) {
      await assert.rejects(q(`UPDATE settings SET ${column}=$1 WHERE user_id='prefs-a'`, [value]), error => error.code === "23514");
    }
    const file = await exportAccount(q, "prefs-a");
    assert.deepEqual(file.settings, await store.get("prefs-a"));
    await q(down);
    assert.deepEqual((await q("SELECT subjects FROM settings WHERE user_id='prefs-a'")).rows[0].subjects, ["math"]);
    assert.deepEqual((await exportAccount(q, "prefs-a")).settings, { personalizationOn: true, subjects: ["math"], lessOf: ["lesson:gone"], experiences: [], challenge: null }, "legacy schema export supplies old-file defaults");
    await q(up);
    assert.deepEqual((await store.get("prefs-a")).experiences, []);
    assert.equal((await store.get("prefs-a")).challenge, null);
    // Old draft upgrade retains the legacy values and default-fills only the added columns.
    await q(down);
    await q(up);
    assert.equal((await store.get("prefs-a")).personalizationOn, true);
    await store.put("prefs-a", saved);
    // Two sessions: a partial edit waits on explicit-off's row lock and cannot restore stale on.
    const off = await pool.connect();
    const edit = await pool.connect();
    try {
      await off.query("BEGIN");
      const offPlan = St.writePlan("prefs-a", { mode: "set", personalizationOn: false });
      await off.query(offPlan.text, offPlan.values);
      const editPlan = St.writePlan("prefs-a", { mode: "set", experiences: ["playfulness"], challenge: "gentle" });
      const editResult = edit.query(editPlan.text, editPlan.values);
      await off.query("COMMIT");
      await editResult;
      assert.equal((await store.get("prefs-a")).personalizationOn, false);
      assert.deepEqual((await store.get("prefs-a")).experiences, ["playfulness"]);
    } finally { off.release(); edit.release(); }
    // Account erasure remains one transaction, including this whole row.
    await q("BEGIN");
    const removed = await deleteAccount(q, "prefs-a");
    await q("COMMIT");
    assert.equal(removed.settings, 1);
    assert.equal((await q("SELECT count(*)::int AS n FROM settings WHERE user_id='prefs-a'")).rows[0].n, 0);
    await store.put("prefs-b", { mode: "set", experiences: ["depth"] });
    await q("DELETE FROM auth_user WHERE id='prefs-b'");
    assert.equal(await store.get("prefs-b"), null, "FK cascade deletes all new fields too");
  } finally { c.release(); await pool.end(); }
});
