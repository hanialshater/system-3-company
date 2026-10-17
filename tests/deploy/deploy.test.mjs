import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { deploy, deploymentUrl, execute } from "../../tools/deploy.mjs";

function fixture(t, { fail, dirty = false, project = {}, pages = {} } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "s3-deploy-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (p, data) => {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), typeof data === "string" ? data : JSON.stringify(data));
  };
  write(".vercel/project.json", { orgId: "team_company", projectId: "prj_company" });
  write("node_modules/.bin/vercel", "");
  write("src/demos/math/published/meta.json", { slug: "published", status: "published" });
  write("src/demos/math/review/meta.json", { slug: "review", status: "review" });
  const calls = [];
  const run = (file, args, options) => {
    calls.push({ file, args, options });
    if (file === "git") return args[0] === "rev-parse" ? "1234567890abcdef\n" : dirty ? " M source.ts\n" : "";
    if (file === "npm") {
      assert.equal(options.env.VERCEL_TOKEN, undefined, "build/test processes receive no Vercel token");
      assert.equal(options.env.SHOW_REVIEW, "on", "full local QA includes review lessons");
      if (fail === "verify") throw new Error("verification failed");
      return "";
    }
    if (args.includes("build")) {
      assert.equal(options.env.VERCEL_TOKEN, undefined, "Vercel's local builder receives no authentication token");
      if (fail === "build") throw new Error("local Vercel build failed");
      const target = args.includes("--prod") ? "production" : "preview";
      assert(fs.readFileSync(path.join(root, `.vercel/.env.${target}.local`), "utf8").includes(`SHOW_REVIEW=${target === "production" ? "off" : "on"}`));
      write(".vercel/output/config.json", { version: 3 });
      return "";
    }
    assert.equal(options.env.VERCEL_TOKEN, "test-token");
    assert(!args.includes("test-token"), "credentials never enter process arguments");
    assert.equal(args[0], "--non-interactive");
    assert.deepEqual(args.slice(1, 3), ["--scope", "team_company"]);
    const a = args.slice(3);
    if (a[0] === "project") return JSON.stringify({ id: "prj_company", owner: { name: "Company", slug: "company" }, name: "system-3-company", ...project });
    if (a[0] === "api") return JSON.stringify({ id: "prj_company", accountId: "team_company", ...project });
    if (a[0] === "pull") {
      if (fail === "pull") throw new Error("environment pull failed");
      write(`.vercel/.env.${a.at(-1)}.local`, "OTHER_VALUE=unchanged\nSHOW_REVIEW=wrong\n");
      return "";
    }
    if (a[0] === "deploy") {
      if (fail === "upload") throw new Error("upload failed");
      return JSON.stringify({ url: "company-abc.vercel.app" });
    }
    if (a[0] === "inspect") return JSON.stringify({ readyState: fail === "ready" ? "ERROR" : "READY", projectId: "prj_company" });
    if (a[0] === "curl") {
      const separator = a.indexOf("--");
      assert(separator > 0);
      assert(!a.slice(separator + 1).includes("--non-interactive"), "CLI flags must not leak to curl");
      if (a.includes("--write-out")) return pages.status ?? "404";
      if (a[1] === "/") return pages.home ?? '<div data-testid="intro-card"></div>';
      if (a[1] === "/catalog") return pages.map ?? '<section class="domain-block"></section>';
      return pages.lesson ?? '<article data-slug="published"></article>';
    }
    if (a[0] === "promote") return "Promoted";
    throw new Error(`Unexpected command ${a.join(" ")}`);
  };
  const options = { root, env: { VERCEL_TOKEN: "test-token" }, run, log: () => {}, now: () => new Date("2026-10-13T10:00:00Z") };
  const record = () => JSON.parse(fs.readFileSync(path.join(root, "company/ops/deployments", fs.readdirSync(path.join(root, "company/ops/deployments"))[0]), "utf8"));
  const commands = () => calls.filter((c) => c.file !== "git" && c.file !== "npm").map((c) => c.args[3]);
  return { root, options, calls, record, commands };
}

test("preview verifies and smoke-tests, records its URL, and never promotes", (t) => {
  const f = fixture(t);
  const result = deploy(f.options);
  assert.equal(result.status, "ready");
  assert.equal(result.target, "preview");
  assert.equal(result.url, "https://company-abc.vercel.app");
  assert.deepEqual(result.steps, ["verify", "upload", "ready", "smoke"]);
  assert(!f.commands().includes("promote"));
  const args = f.calls.find((c) => c.args[3] === "deploy").args;
  assert(args.includes("SHOW_REVIEW=on"));
  assert(!args.includes("--prod"));
  assert.equal(f.record().commit, "1234567890abcdef");
  assert(!JSON.stringify(f.record()).includes("test-token"));
});

test("production stages with published-only config and promotes after all checks", (t) => {
  const f = fixture(t);
  const result = deploy({ ...f.options, target: "production" });
  const args = f.calls.find((c) => c.args[3] === "deploy").args;
  assert(args.includes("--prod") && args.includes("--skip-domain"));
  assert.equal(args.filter((a) => a === "SHOW_REVIEW=off").length, 2, "published-only at build and runtime");
  assert.deepEqual(result.steps, ["verify", "upload", "ready", "smoke", "promote"]);
  assert.equal(f.commands().at(-1), "promote");
});

for (const fail of ["verify", "upload", "ready"]) {
  test(`${fail} failure leaves a failed record and never promotes`, (t) => {
    const f = fixture(t, { fail });
    assert.throws(() => deploy({ ...f.options, target: "production" }));
    assert(!f.commands().includes("promote"));
    assert.equal(f.record().status, "failed");
    assert.equal(f.record().failedStep, fail);
    if (fail === "verify") assert(!f.commands().includes("deploy"));
  });
}

for (const pages of [{ home: "Vercel sign in" }, { map: '<section class="domain-block"><a href="/d/review">Review</a></section>' }, { status: "200" }]) {
  test("an unhealthy or unpublished production page blocks promotion", (t) => {
    const f = fixture(t, { pages });
    assert.throws(() => deploy({ ...f.options, target: "production" }));
    assert(!f.commands().includes("promote"));
    assert.equal(f.record().failedStep, "smoke");
  });
}

test("missing links and conflicting IDs stop before any external operation", (t) => {
  const f = fixture(t);
  assert.throws(() => deploy({ ...f.options, env: { VERCEL_ORG_ID: "team_other", VERCEL_PROJECT_ID: "prj_other" } }), /conflict/);
  fs.rmSync(path.join(f.root, ".vercel/project.json"));
  assert.throws(() => deploy(f.options), /No linked Vercel project/);
  assert.equal(f.calls.length, 0);
  assert.throws(() => deploy({ ...f.options, env: { VERCEL_PROJECT_ID: "prj_other" } }), /both/);
  assert.equal(f.calls.length, 0);
});

test("CLI project mismatch and dirty production source stop before upload", (t) => {
  const f = fixture(t, { project: { accountId: "team_other" } });
  assert.throws(() => deploy(f.options), /different project or owner/);
  assert(!f.commands().includes("deploy"));
  const g = fixture(t, { dirty: true });
  assert.throws(() => deploy({ ...g.options, target: "production" }), /Commit the working tree/);
  assert(!g.commands().includes("deploy"));
});

test("CI can use explicit project IDs without a local link", (t) => {
  const f = fixture(t);
  fs.rmSync(path.join(f.root, ".vercel/project.json"));
  const result = deploy({ ...f.options, env: { VERCEL_TOKEN: "test-token", VERCEL_ORG_ID: "team_company", VERCEL_PROJECT_ID: "prj_company" } });
  assert.equal(result.project.projectId, "prj_company");
  assert.equal(result.status, "ready");
});

for (const target of ["preview", "production"]) {
  test(`CI uploads a locally built ${target} deployment after verification`, (t) => {
    const f = fixture(t);
    const result = deploy({ ...f.options, target, prebuilt: true });
    assert.equal(result.prebuilt, true);
    assert.deepEqual(result.steps.slice(0, 4), ["verify", "pull", "build", "upload"]);
    const args = f.calls.find((c) => c.args[3] === "deploy").args;
    assert(args.includes("--prebuilt"));
    assert(!args.includes("--build-env"));
    assert(fs.readFileSync(path.join(f.root, `.vercel/.env.${target}.local`), "utf8").includes("OTHER_VALUE=unchanged"));
  });
}

for (const fail of ["pull", "build"]) {
  test(`CI ${fail} failure prevents upload and promotion`, (t) => {
    const f = fixture(t, { fail });
    assert.throws(() => deploy({ ...f.options, target: "production", prebuilt: true }));
    assert(!f.commands().includes("deploy"));
    assert(!f.commands().includes("promote"));
    assert.equal(f.record().failedStep, fail);
  });
}

test("dry-run needs no credentials, executes nothing and writes no records", (t) => {
  const f = fixture(t);
  fs.rmSync(path.join(f.root, ".vercel/project.json"));
  const plan = deploy({ ...f.options, target: "production", dryRun: true });
  assert.equal(plan.SHOW_REVIEW, "off");
  assert.equal(f.calls.length, 0);
  assert(!fs.existsSync(path.join(f.root, "company/ops/deployments")));
});

test("only deployment origins from Vercel are accepted", () => {
  assert.equal(deploymentUrl("https://demo.vercel.app\n"), "https://demo.vercel.app");
  assert.equal(deploymentUrl('{"url":"demo.vercel.app"}'), "https://demo.vercel.app");
  for (const output of ['{"url":"https://evil.test"}', '{"url":"http://demo.vercel.app"}', '{"url":"https://demo.vercel.app/path"}', "missing URL"])
    assert.throws(() => deploymentUrl(output));
});

test("a failed command prints Vercel's stdout and stderr, redacted, to the live log only", (t) => {
  const failing = () => {
    const error = new Error("Command failed");
    error.status = 1;
    error.stdout = '{"error":{"code":"too_many_files","message":"bad test-token"}}\n';
    error.stderr = "Error: upload refused for test-token\n";
    throw error;
  };
  const written = [];
  const env = { VERCEL_TOKEN: "test-token" };
  assert.throws(
    () => execute("/x/vercel", ["deploy"], { root: "/", env, capture: true }, { exec: failing, write: (s) => written.push(s) }),
    (e) => e.message === "vercel command failed (exit 1)." && !e.message.includes("too_many_files"),
  );
  const shown = written.join("");
  assert(shown.includes("too_many_files"), "stdout error JSON reaches the log");
  assert(shown.includes("upload refused"), "stderr reaches the log");
  assert(!shown.includes("test-token"), "the token is redacted from both streams");
  assert.equal((shown.match(/\[redacted\]/g) ?? []).length, 2);

  // The durable release record stores the step name, never the subprocess output.
  const f = fixture(t);
  const run = (file, args, options) => args[3] === "deploy"
    ? execute(file, args, options, { exec: failing, write: () => {} })
    : f.options.run(file, args, options);
  assert.throws(() => deploy({ ...f.options, run, target: "production", prebuilt: true }), /vercel command failed/);
  const text = JSON.stringify(f.record());
  assert.equal(f.record().failedStep, "upload");
  assert(!text.includes("too_many_files") && !text.includes("upload refused") && !text.includes("test-token"));
});

test("a successful command returns its output and writes nothing", () => {
  const written = [];
  const out = execute("/x/vercel", ["deploy"], { root: "/", env: {}, capture: true }, { exec: () => "ok\n", write: (s) => written.push(s) });
  assert.equal(out, "ok\n");
  assert.equal(written.length, 0);
});
