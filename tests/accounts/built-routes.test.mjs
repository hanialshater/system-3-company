// Against a running build (readiness A-17, tests 31-33 of the old suite). Skips unless ACCOUNTS_BASE_URL is set.
//   ACCOUNTS_BASE_URL=http://localhost:3123 ACCOUNTS_EXPECT=off npm run test:accounts   # a build with accounts off
//   ACCOUNTS_BASE_URL=http://localhost:3123 ACCOUNTS_EXPECT=on  npm run test:accounts   # a build with accounts on
import test from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.ACCOUNTS_BASE_URL;
const EXPECT = process.env.ACCOUNTS_EXPECT ?? "off";
const skip = BASE ? false : "set ACCOUNTS_BASE_URL to a running build";

const ROUTES = [
  ["GET", "/api/account/me"],
  ["POST", "/api/account/start"],
  ["POST", "/api/account/merge"],
  ["GET", "/api/account/progress"],
  ["PUT", "/api/account/progress"],
  ["GET", "/api/account/export"],
  ["POST", "/api/account/delete"],
  ["GET", "/api/account/likes"],
  ["PUT", "/api/account/likes/plates-move"],
  ["DELETE", "/api/account/saves/plates-move"],
  ["GET", "/api/account/saves"],
  ["GET", "/api/likes/counts?slugs=plates-move"],
  ["GET", "/api/account/auth/magic-link/verify?token=x"],
  ["POST", "/api/account/auth/sign-in/magic-link"],
  ["POST", "/api/account/auth/sign-out"],
];

const call = (method, p) =>
  fetch(`${BASE}${p}`, {
    method,
    redirect: "manual",
    headers: { origin: BASE, "content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify({ email: "a@example.com", ageBand: "16+", policyVersion: "x", name: "Ada" }),
  });

test("31. accounts off: every account route answers 404 with no Set-Cookie on a built server", { skip: skip || (EXPECT !== "off" && "ACCOUNTS_EXPECT is not off") }, async () => {
  for (const [m, p] of ROUTES) {
    const r = await call(m, p);
    assert.equal(r.status, 404, `${m} ${p}`);
    assert.deepEqual(r.headers.getSetCookie(), [], `${m} ${p}`);
  }
});

test("32. accounts on: the library's own sign-in door is 404; a bad start is 400; signed-out reads are 401", { skip: skip || (EXPECT !== "on" && "ACCOUNTS_EXPECT is not on") }, async () => {
  assert.equal((await call("POST", "/api/account/auth/sign-in/magic-link")).status, 404);
  assert.equal((await call("POST", "/api/account/start")).status, 400, "name is refused");
  assert.equal((await call("GET", "/api/account/progress")).status, 401);
  assert.equal((await call("GET", "/api/account/export")).status, 401);
});

test("33. accounts on: anonymous GET /me sets no cookie", { skip: skip || (EXPECT !== "on" && "ACCOUNTS_EXPECT is not on") }, async () => {
  const r = await fetch(`${BASE}/api/account/me`);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).signedIn, false);
  assert.deepEqual(r.headers.getSetCookie(), []);
});
