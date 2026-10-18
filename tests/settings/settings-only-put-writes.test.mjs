// B2 (company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3, SS3 row): "the route test that only
// `PUT /api/settings` can write the table (owed with the API) is a condition of the API read. No 'suggested subjects'
// path may call it." W-1717. The route is mounted at `PUT /api/account/settings` (principal-engineer C1; privacy-reviewer
// B2a, company/reviews/_privacy/2026-10-16-w1538-settings-api.md: the B2 text now reads that path). B2a also requires
// that no route file remains under src/app/api/settings/; the static test below fails if one does.
//
// Three layers:
// 1. Static, repo-wide: no file outside the allow-list writes the table in SQL (INSERT/UPDATE/DELETE/TRUNCATE/MERGE/
//    COPY ... settings), and no file outside it imports the store or the PUT handler. The composer and model code
//    (company/personalization/**), every other route, tools/, scripts and jobs are all inside the scan.
// 2. The route exports GET and PUT only, and only PUT reaches handleSettingsPut; in the handler, only
//    handleSettingsPut calls store.put.
// 3. Runtime: GET and the serving read helper never call put.
// A control plants each forbidden pattern in a temp tree and requires the scanner to catch it.
// The one sanctioned non-PUT write is the account-deletion transaction (B3, EDD-008 §7): when backend-engineer
// lands it on the accounts branch, add its file to DELETE_ONLY below in the same reviewed change.
// Run: npm run test:settings
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { REPO, deps, get, handlerMod, memoryStore, settingsMod, FAKE } from "./helpers.mjs";

const ROUTE = "src/app/api/account/settings/route.ts";
/** The old mount (B2a): no file may remain here. */
const OLD_ROUTE_DIR = "src/app/api/settings";
const STORE = "src/lib/server/personalization/settings-store.ts";
const HANDLER = "src/lib/server/personalization/settings-handler.ts";
const WIRING = "src/lib/server/personalization/settings-wiring.ts";

/** Files allowed to write the table in SQL: the store, and the fake-data local Postgres tests of the draft migration
 * and of the store's write statements (throwaway cluster, never a real database). */
const SQL_WRITERS = new Set([
  STORE,
  "company/personalization/data/test-00N-settings.sh",
  "company/personalization/data/test-settings-write-sql.mjs",
]);
/** Account deletion (B3). Empty in this clone: the accounts branch is not here. May hold DELETE only. */
const DELETE_ONLY = new Set([]);
/** Who may import the store module (types or values) and the handler. */
const STORE_IMPORTERS = new Set([HANDLER, WIRING]);
const HANDLER_IMPORTERS = new Set([ROUTE, WIRING]);

const ROOTS = ["src", "tools", "company", "scripts", "db", "tests", "sim", "api", "lib"];
const EXT = /\.(ts|tsx|js|jsx|mjs|cjs|sql|sh)$/;
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "artifacts", "test-results"]);
const THIS_DIR = "tests/settings/";

// The table name, optionally schema-qualified and quoted (a quote inside a JS string may be escaped).
const T = String.raw`(?:\\?"?public\\?"?\.)?\\?"?settings(?![\w-])`;
const SQL_WRITE = new RegExp(
  String.raw`\b(?:INSERT\s+INTO\s+${T}|UPDATE\s+${T}\s+SET|DELETE\s+FROM\s+${T}|TRUNCATE\s+(?:TABLE\s+)?${T}|MERGE\s+INTO\s+${T}|COPY\s+${T}|ALTER\s+TABLE\s+${T})`,
  "i",
);
const DELETE_ONLY_RE = new RegExp(String.raw`\bDELETE\s+FROM\s+${T}`, "i");
const IMPORTS_STORE = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)["'][^"']*personalization\/settings-store(?:\.ts)?["']|from\s+["']\.\/settings-store["']/;
const IMPORTS_HANDLER = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)["'][^"']*personalization\/settings-handler(?:\.ts)?["']|from\s+["']\.\/settings-handler["']/;

function walk(root, rel = "") {
  const out = [];
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return out;
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const r = path.posix.join(rel, e.name);
    if (e.isDirectory()) out.push(...walk(root, r));
    else if (EXT.test(e.name)) out.push(r);
  }
  return out;
}

/** Findings for a tree. Exported shape used by the control below. */
function scan(root) {
  const findings = [];
  const files = ROOTS.flatMap((r) => walk(root, r));
  for (const f of files) {
    if (f.startsWith(THIS_DIR)) continue;
    const src = fs.readFileSync(path.join(root, f), "utf8");
    if (f.startsWith("company/personalization/data/00N_settings.")) continue; // the migration itself (CREATE/DROP)
    if (SQL_WRITE.test(src) && !SQL_WRITERS.has(f)) {
      const onlyDelete = DELETE_ONLY.has(f) && src.match(new RegExp(SQL_WRITE, "gi")).every((m) => DELETE_ONLY_RE.test(m));
      if (!onlyDelete) findings.push(`${f}: writes the settings table`);
    }
    if (IMPORTS_STORE.test(src) && !STORE_IMPORTERS.has(f)) findings.push(`${f}: imports the settings store`);
    if (IMPORTS_HANDLER.test(src) && !HANDLER_IMPORTERS.has(f)) findings.push(`${f}: imports the settings handler`);
  }
  // B2a: the route moved to /api/account/settings; any file left at the old mount is a second, unauthenticated entry.
  for (const f of walk(root, OLD_ROUTE_DIR)) findings.push(`${f}: a route file remains at the old mount`);
  return { files: files.length, findings };
}

test("B2 static: only the store writes the settings table, and only the handler and wiring import the store", () => {
  const { files, findings } = scan(REPO);
  assert.ok(files > 500, `scanner saw ${files} files; it must not scan nothing`);
  assert.deepEqual(findings, []);
  for (const f of [ROUTE, STORE, HANDLER, WIRING]) assert.ok(fs.existsSync(path.join(REPO, f)), `${f} missing: update this test with the move`);
});

test("B2 route: exports GET and PUT only; only PUT reaches handleSettingsPut", () => {
  const src = fs.readFileSync(path.join(REPO, ROUTE), "utf8");
  const fns = [...src.matchAll(/export\s+(?:async\s+)?function\s+(\w+)/g)].map((m) => m[1]).sort();
  assert.deepEqual(fns, ["GET", "PUT"]);
  const consts = [...src.matchAll(/export\s+const\s+(\w+)/g)].map((m) => m[1]).sort();
  assert.deepEqual(consts, ["dynamic", "preferredRegion", "runtime"], "no handler exported as a const (POST, PATCH, DELETE)");
  assert.doesNotMatch(src, /export\s*\{/, "no re-export block");
  const putBody = src.slice(src.indexOf("export async function PUT"));
  const getBody = src.slice(src.indexOf("export async function GET"), src.indexOf("export async function PUT"));
  assert.match(putBody, /handleSettingsPut\(/);
  assert.doesNotMatch(getBody, /handleSettingsPut/);
  assert.equal((src.match(/handleSettingsPut\(/g) ?? []).length, 1);
});

test("B2 handler: only handleSettingsPut calls store.put", () => {
  const src = fs.readFileSync(path.join(REPO, HANDLER), "utf8");
  const calls = [...src.matchAll(/store\.put\(/g)].map((m) => m.index);
  assert.equal(calls.length, 1);
  const putStart = src.indexOf("export async function handleSettingsPut");
  assert.ok(putStart > 0 && calls[0] > putStart, "the one store.put call sits inside handleSettingsPut");
  const settings = fs.readFileSync(path.join(REPO, "src/lib/server/personalization/settings.ts"), "utf8");
  assert.doesNotMatch(settings, /\.put\(|INSERT|UPDATE/i, "the pure module has no write");
});

test("B2 runtime: GET and the serving read never write", async () => {
  const { handleSettingsGet } = await handlerMod();
  const S = await settingsMod();
  const store = memoryStore();
  store.rows.set("u-fake-1", { personalizationOn: true, subjects: ["math", "gone"], lessOf: [] });
  for (let i = 0; i < 3; i++) await handleSettingsGet(get(), deps(store));
  S.servingSettings(S.cleanStored(await store.get("u-fake-1"), FAKE));
  assert.equal(store.calls.put.length, 0);
});

test("B2 control: the scanner catches each planted write and import", () => {
  const plants = [
    ["src/lib/suggest.ts", "await q(`INSERT INTO settings (user_id, subjects) VALUES ($1, $2)`)"],
    ["company/personalization/model/job.mjs", "const s = 'update public.settings set subjects = $1';"],
    ["tools/cleanup.mjs", 'q("DELETE FROM \\"settings\\" WHERE true")'],
    ["src/app/api/x/route.ts", 'import { pgSettingsStore } from "@/lib/server/personalization/settings-store";'],
    ["src/app/api/y/route.ts", 'import { handleSettingsPut } from "@/lib/server/personalization/settings-handler";'],
    ["db/migrations/009.sql", "TRUNCATE settings;"],
    ["src/lib/z.ts", "const m = await import('../server/personalization/settings-store.ts');"],
    ["src/app/api/settings/route.ts", "export async function GET() { return new Response(null); }"],
  ];
  for (const [file, text] of plants) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-b2-"));
    try {
      fs.mkdirSync(path.join(tmp, path.dirname(file)), { recursive: true });
      fs.writeFileSync(path.join(tmp, file), text);
      const { findings } = scan(tmp);
      assert.equal(findings.length, 1, `${file} not caught`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }
  // Not a write: reads, other tables, the word in prose.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-b2-"));
  try {
    fs.mkdirSync(path.join(tmp, "src"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "src/ok.ts"), "SELECT * FROM settings; INSERT INTO settings_audit; // update settings later\nINSERT INTO progress");
    assert.deepEqual(scan(tmp).findings, []);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
