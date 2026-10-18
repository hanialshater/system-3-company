// Accounts: the checks that need no database (scans, switches, email transport, the M5 bump guard).
// Run: npm run test:accounts
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { accountsEnabled, likesSavesEnabled, likeCountsPublic, hiddenCountSlugs } from "../../src/lib/server/accounts-flag.ts";
import { emailTransport, sendSignInLink } from "../../src/lib/server/email.ts";
import { countLabel, cleanProgressMap } from "../../src/lib/server/progress-store.ts";
import { RateLimiter, limiterKey, sameOriginWrite } from "../../src/lib/server/http.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(e.name) || e.name.startsWith(".next-")) continue;
      walk(p, out);
    } else if (/\.(ts|tsx|mjs|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
const SRC = walk(path.join(ROOT, "src")).filter((f) => !f.endsWith(".generated.ts"));
const read = (f) => fs.readFileSync(f, "utf8");
const isClient = (f) => /^\s*["']use client["']/.test(read(f));

test("S1. switches are exactly \"on\"; likes need accounts; counts need likes", () => {
  assert.equal(accountsEnabled({}), false);
  for (const v of ["true", "1", "ON", "yes", " on"]) assert.equal(accountsEnabled({ ACCOUNTS_ENABLED: v }), false, v);
  assert.equal(accountsEnabled({ ACCOUNTS_ENABLED: "on" }), true);
  assert.equal(likesSavesEnabled({ LIKES_SAVES_ENABLED: "on" }), false);
  assert.equal(likesSavesEnabled({ ACCOUNTS_ENABLED: "on", LIKES_SAVES_ENABLED: "on" }), true);
  assert.equal(likeCountsPublic({ ACCOUNTS_ENABLED: "on", LIKE_COUNTS_PUBLIC: "on" }), false);
  assert.equal(likeCountsPublic({ ACCOUNTS_ENABLED: "on", LIKES_SAVES_ENABLED: "on", LIKE_COUNTS_PUBLIC: "on" }), true);
  assert.deepEqual([...hiddenCountSlugs({ LIKE_COUNTS_HIDDEN: " a, b ,," })], ["a", "b"]);
});

test("S2. C5: the switches are read only in accounts-flag.ts; no page, layout or client file reads them", () => {
  const re = /\b(ACCOUNTS_ENABLED|LIKES_SAVES_ENABLED|LIKE_COUNTS_PUBLIC|LIKE_COUNTS_HIDDEN)\b/;
  const readers = SRC.filter((f) => /process\.env/.test(read(f)) && re.test(read(f).split("\n").filter((l) => !l.trim().startsWith("//")).join("\n")));
  assert.deepEqual(readers.map(rel), ["src/lib/server/accounts-flag.ts"]);
});

test("S3. C9: no client file imports better-auth, pg, or any src/lib/server module", () => {
  const bad = [];
  for (const f of SRC.filter(isClient)) {
    for (const m of read(f).matchAll(/from\s+["']([^"']+)["']/g)) {
      if (/^(better-auth|@better-auth|pg$|pg\/|kysely|better-call|nanostores)/.test(m[1]) || /lib\/server\//.test(m[1])) bad.push(`${rel(f)} -> ${m[1]}`);
    }
  }
  assert.deepEqual(bad, []);
  const kitAndComponents = SRC.filter((f) => /src\/(kit|components)\//.test(rel(f)));
  for (const f of kitAndComponents) assert.ok(!/from\s+["'](better-auth|pg)/.test(read(f)), rel(f));
});

test("S4. P1.8: api.resend.com appears only in email.ts; sendSignInLink is called only from auth.ts", () => {
  const files = [...SRC, ...walk(path.join(ROOT, "tools"))];
  assert.deepEqual(files.filter((f) => read(f).includes("api.resend.com")).map(rel), ["src/lib/server/email.ts"]);
  const callers = SRC.filter((f) => /sendSignInLink\(/.test(read(f)) && !f.endsWith("email.ts")).map(rel);
  assert.deepEqual(callers, ["src/lib/server/auth.ts"]);
  const magic = SRC.filter((f) => /signInMagicLink\(/.test(read(f))).map(rel);
  assert.deepEqual(magic, ["src/lib/server/account-api.ts"], "one door for sign-in mail (C2)");
});

test("S5. M2: the idle purge is unreachable: nothing in src/ but idle-purge.ts names it, imports it, or holds the 24-month interval", () => {
  const bad = SRC.filter((f) => !f.endsWith("idle-purge.ts")).filter((f) => /IDLE_PURGE_SQL|LAST_ACTIVITY_SQL|idle-purge|24 months/.test(read(f)));
  assert.deepEqual(bad.map(rel), []);
});

test("S6. R-M2b: last_sign_in_at is read only by auth.ts, the export (progress-store.ts) and the idle clock", () => {
  const files = [...SRC, ...walk(path.join(ROOT, "tools"))];
  const readers = files.filter((f) => /last_sign_in_at|lastSignInAt|lastActiveAt/.test(read(f))).map(rel).sort();
  assert.deepEqual(readers, ["src/lib/server/auth.ts", "src/lib/server/idle-purge.ts", "src/lib/server/progress-store.ts"]);
});

test("S7. C6: every account route is nodejs, fra1 and force-dynamic, and exports only HTTP methods", () => {
  const routes = walk(path.join(ROOT, "src/app/api/account")).filter((f) => f.endsWith("route.ts"));
  routes.push(path.join(ROOT, "src/app/api/likes/counts/route.ts"));
  assert.ok(routes.length >= 12);
  for (const f of routes) {
    const s = read(f);
    if (rel(f).includes("/settings/")) continue; // the personalization lane's route (origin/perso-m1) has its own tests
    assert.match(s, /export const runtime = "nodejs";/, rel(f));
    assert.match(s, /export const preferredRegion = "fra1";/, rel(f));
    assert.match(s, /export const dynamic = "force-dynamic";/, rel(f));
    for (const m of s.matchAll(/export (?:const|async function|function) (\w+)/g)) {
      assert.ok(["runtime", "preferredRegion", "dynamic", "GET", "POST", "PUT", "DELETE"].includes(m[1]), `${rel(f)} exports ${m[1]}`);
    }
  }
  assert.ok(!fs.existsSync(path.join(ROOT, "src/app/api/account/[...all]")), "no catch-all at /api/account shadows /api/account/settings");
});

test("S8. A-6: server account code never logs a value; only fixed text and SQLSTATE", () => {
  for (const f of SRC.filter((f) => rel(f).startsWith("src/lib/server/") || rel(f).startsWith("src/app/api/account/"))) {
    const lines = read(f).split("\n").filter((l) => /console\.(log|error|warn|info)\(/.test(l));
    for (const l of lines) {
      if (f.endsWith("email.ts")) {
        assert.match(l, /\[dev email\] sign-in link: \$\{url\}/, "the console transport prints the link only");
        continue;
      }
      assert.ok(!/\$\{(?!code)/.test(l) && !/,\s*\w+\)/.test(l.replace(/console\.\w+\(/, "")), `${rel(f)}: ${l.trim()}`);
    }
  }
});

test("S9. email: console transport without a key (link only, never the address); none on production; Resend by fetch", async () => {
  assert.equal(emailTransport({}), "console");
  assert.equal(emailTransport({ VERCEL_ENV: "preview" }), "console");
  assert.equal(emailTransport({ VERCEL_ENV: "production" }), "none");
  assert.equal(emailTransport({ RESEND_API_KEY: "k" }), "none", "a key with no sender fails closed");
  assert.equal(emailTransport({ RESEND_API_KEY: "k", EMAIL_FROM: "a@b.example" }), "resend");
  const lines = [];
  await sendSignInLink("learner@example.com", "http://localhost:3000/x?token=T", { env: {}, log: (l) => lines.push(l) });
  assert.equal(lines.length, 1);
  assert.ok(lines[0].includes("token=T") && !lines[0].includes("learner@"));
  await assert.rejects(sendSignInLink("a@example.com", "u", { env: { VERCEL_ENV: "production" } }), (e) => e.code === "MAIL0");
  const calls = [];
  const fakeFetch = async (url, init) => {
    calls.push({ url, init });
    return new Response("{}", { status: 200 });
  };
  await sendSignInLink("a@example.com", "https://s/x?token=T", { env: { RESEND_API_KEY: "k", EMAIL_FROM: "S3 <s@b.example>" }, fetch: fakeFetch });
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(Object.keys(body).sort(), ["from", "html", "subject", "text", "to"]);
  assert.ok(body.text.includes("https://s/x?token=T"));
  const failing = async () => new Response("{\"message\":\"secret detail a@example.com\"}", { status: 422 });
  await assert.rejects(sendSignInLink("a@example.com", "u", { env: { RESEND_API_KEY: "k", EMAIL_FROM: "s@b.example" }, fetch: failing }), (e) => !e.message.includes("@"));
});

test("S10. M6: limiter keys are HMAC hashes; nothing raw is kept", () => {
  const l = new RateLimiter(2, 1000, () => 0);
  l.limited("ip:203.0.113.9", "email:a@example.com");
  for (const k of l.keys()) {
    assert.match(k, /^[0-9a-f]{64}$/);
    assert.ok(!k.includes("203.0") && !k.includes("@"));
  }
  assert.notEqual(limiterKey("x"), "2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881", "not plain SHA-256");
});

test("S11. counts: steps only; below 10 is null", () => {
  for (const [n, label] of [[0, null], [9, null], [10, "10+"], [24, "10+"], [25, "25+"], [99, "50+"], [100, "100+"], [999, "250+"], [1000, "1k+"], [1234, "1k+"]]) assert.equal(countLabel(n), label, String(n));
});

test("S12. C7: same-origin rule", () => {
  const r = (h) => new Request("https://s3c.example/api/account/start", { method: "POST", headers: { host: "s3c.example", ...h } });
  assert.equal(sameOriginWrite(r({ origin: "https://s3c.example" })), true);
  assert.equal(sameOriginWrite(r({ origin: "https://evil.example" })), false);
  assert.equal(sameOriginWrite(r({})), false);
  assert.equal(sameOriginWrite(r({ origin: "https://s3c.example", "sec-fetch-site": "cross-site" })), false);
});

test("S13. merge validation is pure and drops what the gate does not allow", () => {
  const now = Date.UTC(2026, 9, 17);
  const out = cleanProgressMap(
    { a: { completedAt: now, predictedCorrectly: true, recalls: [], dwellMs: 5 }, b: { completedAt: now + 3 * 86_400_000 }, "not-a": { completedAt: now } },
    (s) => s !== "not-a",
    now,
  );
  assert.deepEqual(out, { a: { completedAt: now, predictedCorrectly: true, recalls: [] } });
});

test("S14. M5: Better Auth is exactly pinned, and every Better Auth package in the lockfile matches the regression record", () => {
  const pkg = JSON.parse(read(path.join(ROOT, "package.json")));
  const installed = JSON.parse(read(path.join(ROOT, "node_modules/better-auth/package.json"))).version;
  assert.equal(pkg.dependencies["better-auth"], "1.7.10");
  assert.equal(pkg.dependencies.pg, "8.23.1");
  assert.equal(installed, pkg.dependencies["better-auth"]);
  const record = JSON.parse(read(path.join(ROOT, "tests/accounts/better-auth-regression.json")));
  const lock = JSON.parse(read(path.join(ROOT, "package-lock.json"))).packages;
  const inLock = Object.fromEntries(
    Object.entries(lock)
      .filter(([k]) => /(^|\/)(better-auth|@better-auth\/[^/]+|better-call)$/.test(k))
      .map(([k, v]) => [k, v.version]),
  );
  assert.deepEqual(inLock, record.packages, "a Better Auth bump (patch included) needs the regression suite run and this record updated");
  const suite = read(path.join(ROOT, "tests/accounts/accounts.test.mjs"));
  for (const title of record.suite) assert.ok(suite.includes(JSON.stringify(title).slice(1, -1)) || suite.includes(title), `missing suite title: ${title}`);
});

test("S15. the client never writes saves locally while signed in, and anonymous save makes no request (C5.1, C5.3)", () => {
  const s = read(path.join(ROOT, "src/lib/account-client.ts"));
  const fn = s.slice(s.indexOf("export async function setSaved"), s.indexOf("export async function setLiked"));
  assert.match(fn, /const me = knownMe;/, "uses the answer already known; no new /me request on Save");
  const signedBranch = fn.slice(fn.indexOf("if (me?.signedIn"), fn.indexOf("const all = loadLocalSaves()"));
  assert.ok(!/localStorage/.test(signedBranch), "signed in: no local write");
  const anonBranch = fn.slice(fn.indexOf("const all = loadLocalSaves()"));
  assert.ok(!/fetch\(/.test(anonBranch), "anonymous: no request");
});
