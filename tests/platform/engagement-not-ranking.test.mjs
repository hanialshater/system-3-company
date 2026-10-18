// PRD-005 rule 2: likes and saves are display-only. Engagement is never used to rank (company/product/surface-value.md).
// (a) feedOrder("all") and every domain's feedOrder(X) are byte-identical with the like and save tables empty and
//     seeded with random rows (the seeded half needs ACCOUNTS_TEST_DATABASE_URL, a throwaway local PostgreSQL 16 that
//     tests/accounts/ also uses; the database named there is WIPED. Without it, (a) compares no-database runs only).
// (b) No module outside the like/save API and the store imports the like/save store or names lesson_like,
//     lesson_save, the count endpoint, the learner's own like/save list routes (/api/account/likes, /api/account/saves)
//     or the device saves key. Any new reader fails here until a decision record allows it and adds it to ALLOWED
//     with that record's path. Only src/components/account/* may import src/lib/account-client.ts, which can read
//     those lists (principal review 2026-10-18 PC7); a Like or Save control joins CLIENT_ALLOWED with its record.
// Run: npm run test:platform
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const DB_URL = process.env.ACCOUNTS_TEST_DATABASE_URL;

function feedOrders(env) {
  const out = execFileSync(process.execPath, ["--import", "./tests/lifehacks/register.mjs", "tests/platform/feed-order-print.mjs"], {
    cwd: ROOT,
    env: { ...process.env, ...env },
    maxBuffer: 256 * 1024 * 1024,
  });
  return out.toString("utf8");
}

test("(a) feed order is identical with no database, empty like/save tables, and random like/save rows", { timeout: 240_000 }, async (t) => {
  const bare = feedOrders({ DATABASE_URL: "", ACCOUNTS_ENABLED: "", LIKES_SAVES_ENABLED: "", LIKE_COUNTS_PUBLIC: "" });
  const parsed = JSON.parse(bare);
  assert.ok(parsed.all.length > 0 && Object.keys(parsed).length > 1, "all plus at least one domain");
  const flagsOn = feedOrders({ ACCOUNTS_ENABLED: "on", LIKES_SAVES_ENABLED: "on", LIKE_COUNTS_PUBLIC: "on" });
  assert.equal(flagsOn, bare, "switches do not change the order");
  if (!DB_URL) {
    t.diagnostic("seeded half skipped: set ACCOUNTS_TEST_DATABASE_URL to a throwaway local PostgreSQL 16");
    return;
  }
  const pg = (await import("pg")).default;
  const { migrateUp } = await import("../../tools/db-migrate.mjs");
  const pool = new pg.Pool({ connectionString: DB_URL, max: 2 });
  try {
    await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    const c = await pool.connect();
    await migrateUp(c);
    c.release();
    const env = { DATABASE_URL: DB_URL, ACCOUNTS_ENABLED: "on", LIKES_SAVES_ENABLED: "on", LIKE_COUNTS_PUBLIC: "on" };
    const empty = feedOrders(env);
    const slugs = parsed.all.map((d) => d.slug);
    await pool.query(
      `INSERT INTO auth_user (id, email, email_verified, age_band, policy_version, policy_accepted_at, created_at)
       SELECT 'rank-' || g, 'rank-' || g || '@example.com', true, '16+', 'draft-2026-10-16', now(), now() - interval '3 days' FROM generate_series(1, 300) g`,
    );
    for (const table of ["lesson_like", "lesson_save"]) {
      await pool.query(
        `INSERT INTO ${table} (user_id, slug, created_at_ms)
         SELECT 'rank-' || (1 + floor(random() * 300))::int, s, 1 FROM unnest($1::text[]) s, generate_series(1, (random() * 40)::int)
         ON CONFLICT DO NOTHING`,
        [slugs],
      );
    }
    const n = Number((await pool.query("SELECT count(*) AS n FROM lesson_like")).rows[0].n);
    assert.ok(n > 100, "random likes were seeded");
    const seeded = feedOrders(env);
    assert.equal(empty, bare, "empty tables: byte-identical");
    assert.equal(seeded, bare, "random likes and saves: byte-identical");
  } finally {
    await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;").catch(() => {});
    await pool.end();
  }
});

// Each allowed reader, and why. Adding a line needs a decision record (PRD-005 rule 2).
const ALLOWED = {
  "src/lib/server/progress-store.ts": "the like/save store itself (own lists, export, deletion, the public count)",
  "src/lib/server/account-api.ts": "the like/save API handlers",
  "src/app/api/likes/counts/route.ts": "the count endpoint",
  "src/app/api/account/likes/route.ts": "the like list route",
  "src/app/api/account/likes/[slug]/route.ts": "the like PUT/DELETE route",
  "src/app/api/account/saves/route.ts": "the save list route",
  "src/app/api/account/saves/[slug]/route.ts": "the save PUT/DELETE route",
  "src/lib/server/account-route.ts": "the route wiring (names the count endpoint it serves)",
  "src/lib/server/accounts-flag.ts": "the switches that turn the like/save routes and the count on",
  "src/lib/account-client.ts": "the device saves key and the like/save routes (PRD-005 §1 controls)",
  "tools/db-deletion-check.mjs": "deletion check counts both tables (privacy ruling 2026-10-17 C6.2)",
};
const NAMES = /lesson_like|lesson_save|\/api\/likes\/counts|likes\/counts|account\/likes|account\/saves|s3c:saves:v1|countLabels|COUNT_STEPS/;
// Who may import the account client (PC7). Everything under src/components/account/ may; anything else needs a line
// here with its decision record (for example the PRD-005 Like and Save controls, when they exist).
const CLIENT_DIR = "src/components/account/";
const CLIENT_ALLOWED = {};
const CLIENT_IMPORT = /from\s+["'][^"']*account-client["']|import\(\s*["'][^"']*account-client["']\s*\)|require\(\s*["'][^"']*account-client["']\s*\)/;
const STORE_IMPORT = /from\s+["'][^"']*(server\/progress-store|server\/account-api)["']|import\(["'][^"']*(progress-store|account-api)["']\)/;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(e.name) || e.name.startsWith(".next-")) continue;
      walk(p, out);
    } else if (/\.(ts|tsx|mjs|js|json)$/.test(e.name)) out.push(p);
  }
  return out;
}

test("(b) nothing outside the like/save API, the store and the deletion check names the tables, the count endpoint or the saves key", () => {
  const files = [...walk(path.join(ROOT, "src")), ...walk(path.join(ROOT, "tools")), ...walk(path.join(ROOT, "content"))].filter(
    (f) => !f.endsWith(".generated.ts"),
  );
  const readers = files.filter((f) => NAMES.test(fs.readFileSync(f, "utf8"))).map(rel).sort();
  const unexpected = readers.filter((r) => !ALLOWED[r]);
  assert.deepEqual(unexpected, [], "a new reader of likes/saves needs a decision record");
  for (const must of ["src/lib/feed-index.ts", "src/components/Feed.tsx", "src/app/api/feed", "src/lib/server/personalization", "src/app/catalog"]) {
    assert.ok(!readers.some((r) => r.startsWith(must)), `${must} must never read likes or saves`);
  }
});

test("(b) only the account route wiring imports the like/save API; only the API imports the store", () => {
  const files = [...walk(path.join(ROOT, "src")), ...walk(path.join(ROOT, "tools"))];
  const importers = files
    .filter((f) => STORE_IMPORT.test(fs.readFileSync(f, "utf8")) || /from\s+["']\.\/(progress-store|account-api)["']/.test(fs.readFileSync(f, "utf8")))
    .map(rel)
    .sort();
  assert.deepEqual(importers, ["src/lib/server/account-api.ts", "src/lib/server/account-route.ts"]);
});

test("(b) PC7: only src/components/account/ (and CLIENT_ALLOWED) imports the account client", () => {
  const files = [...walk(path.join(ROOT, "src")), ...walk(path.join(ROOT, "tools")), ...walk(path.join(ROOT, "content"))];
  const importers = files.filter((f) => CLIENT_IMPORT.test(fs.readFileSync(f, "utf8"))).map(rel).sort();
  const unexpected = importers.filter((r) => !r.startsWith(CLIENT_DIR) && !CLIENT_ALLOWED[r]);
  assert.deepEqual(unexpected, [], "a new importer of the account client needs a decision record");
  assert.ok(importers.includes("src/components/account/AccountSync.tsx"), "the scan sees the dynamic import (control)");
});

test("(b) the scan catches a planted reader (control)", () => {
  assert.ok(NAMES.test('const r = await fetch("/api/account/saves")'));
  assert.ok(NAMES.test("fetch(`/api/account/likes/${slug}`)"));
  assert.ok(CLIENT_IMPORT.test('import { listSaves } from "@/lib/account-client";'));
  assert.ok(CLIENT_IMPORT.test('void import("../lib/account-client").then((m) => m.x());'));
  assert.ok(NAMES.test('const rows = await q("SELECT slug FROM lesson_like")'));
  assert.ok(NAMES.test('fetch("/api/likes/counts?slugs=a")'));
  assert.ok(STORE_IMPORT.test('import { countLabels } from "@/lib/server/progress-store";'));
});
