#!/usr/bin/env node
// Release-manager workflow. Existing company gates remain in tools/company.mjs.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HELP = `Usage: npm run deploy -- [preview|production] [--dry-run] [--prebuilt]

Preview is the default. Production stages, smoke-tests, then promotes a build.
Both run npm run verify first and record the outcome in company/ops/deployments/.
One-time setup: npx vercel login; npx vercel link --project system-3-company.
For CI, configure VERCEL_ORG_ID, VERCEL_PROJECT_ID and VERCEL_TOKEN securely.
--prebuilt pulls project settings, builds locally, and uploads that build (used by CI).
--dry-run prints the plan without running commands or creating a deployment.`;

export function linkedTarget(root, env) {
  const file = path.join(root, ".vercel/project.json");
  const link = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
  const { VERCEL_ORG_ID: orgId, VERCEL_PROJECT_ID: projectId } = env;
  if (Boolean(orgId) !== Boolean(projectId)) throw new Error("Set both VERCEL_ORG_ID and VERCEL_PROJECT_ID, or neither.");
  if (link && projectId && (link.projectId !== projectId || link.orgId !== orgId))
    throw new Error("Vercel environment IDs conflict with .vercel/project.json. Resolve the target before deploying.");
  const target = projectId ? { orgId, projectId } : link;
  if (!target?.orgId || !target?.projectId)
    throw new Error("No linked Vercel project. Run npx vercel login and npx vercel link --project system-3-company once, or configure both Vercel project IDs in CI.");
  return { orgId: target.orgId, projectId: target.projectId };
}

export function deploymentUrl(output) {
  const text = output.trim();
  let value;
  if (text.startsWith("{")) {
    const data = JSON.parse(text);
    value = data.url ?? data.deployment?.url ?? data.deploymentUrl;
  } else value = text.split("\n").filter((s) => s.startsWith("https://")).at(-1);
  if (!value) throw new Error("Vercel did not return a deployment URL.");
  const url = new URL(value.startsWith("https://") ? value : `https://${value}`);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".vercel.app") || url.username || url.password || url.pathname !== "/" || url.search || url.hash)
    throw new Error("Vercel returned an unexpected deployment URL.");
  return url.origin;
}

export function execute(file, args, { root, env, capture = false }, { exec = execFileSync, write = (text) => process.stderr.write(text) } = {}) {
  try {
    return exec(file, args, {
      cwd: root, env, encoding: "utf8", stdio: capture ? ["ignore", "pipe", "pipe"] : ["ignore", "inherit", "inherit"],
      maxBuffer: 20 * 1024 * 1024,
    }) ?? "";
  } catch (error) {
    // Tokens never enter arguments or the durable release record. Failure detail goes to the
    // live log only: `vercel deploy --format json` reports its errors on stdout, others on stderr.
    const redact = (text) => {
      let detail = String(text ?? "").trim();
      if (env.VERCEL_TOKEN) detail = detail.replaceAll(env.VERCEL_TOKEN, "[redacted]");
      return detail;
    };
    const out = redact(error.stdout);
    const err = redact(error.stderr);
    if (out) write(`${out}\n`);
    if (err) write(`${err}\n`);
    throw new Error(`${path.basename(file)} command failed (exit ${error.status ?? "unknown"}).`);
  }
}

function lessonMetadata(root) {
  const out = [];
  const dir = path.join(root, "src/demos");
  for (const domain of fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const lesson of fs.readdirSync(path.join(dir, domain.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const file = path.join(dir, domain.name, lesson.name, "meta.json");
      if (fs.existsSync(file)) out.push(JSON.parse(fs.readFileSync(file, "utf8")));
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function deploy({ target = "preview", dryRun = false, prebuilt = false, root = ROOT, env = process.env, run = execute, log = console.log, now = () => new Date() } = {}) {
  if (!["preview", "production"].includes(target)) throw new Error("Target must be preview or production.");
  const production = target === "production";
  const showReview = production ? "off" : "on";
  if (dryRun) {
    const plan = {
      target, prebuilt, SHOW_REVIEW: showReview,
      steps: ["Confirm the linked Vercel project", "npm run verify", ...(prebuilt ? ["Pull Vercel project settings", "Build Vercel output locally"] : []), "Deploy to Vercel" + (production ? " without assigning production domains" : " preview"), "Wait for READY", "Smoke-test feed, map and lesson URLs", ...(production ? ["Promote the tested production deployment"] : []), "Record the release"],
    };
    log(JSON.stringify(plan, null, 2));
    return plan;
  }

  const project = linkedTarget(root, env);
  const cli = path.join(root, "node_modules/.bin/vercel");
  if (!fs.existsSync(cli)) throw new Error("Vercel CLI is missing. Run npm ci first.");
  const cliEnv = { ...env, VERCEL_ORG_ID: project.orgId, VERCEL_PROJECT_ID: project.projectId, VERCEL_TELEMETRY_DISABLED: "1" };
  const vc = (args) => run(cli, ["--non-interactive", "--scope", project.orgId, ...args], { root, env: cliEnv, capture: true });
  const inspected = JSON.parse(vc(["project", "inspect", "--format", "json"]));
  const actual = inspected.project ?? inspected;
  if (actual.id !== project.projectId)
    throw new Error("The Vercel CLI resolved a different project or owner. Deployment stopped.");
  // CLI 63's project-inspect JSON includes an owner name/slug, but no owner ID.
  // Use a read-only API request for the missing field; do not infer ID from a label.
  const ownership = JSON.parse(vc(["api", `/v9/projects/${encodeURIComponent(project.projectId)}`]));
  if (ownership.id !== project.projectId || ownership.accountId !== project.orgId)
    throw new Error("The Vercel CLI resolved a different project or owner. Deployment stopped.");

  const localEnv = { ...env };
  delete localEnv.VERCEL_TOKEN;
  const commit = run("git", ["rev-parse", "HEAD"], { root, env: localEnv, capture: true }).trim();
  const dirty = Boolean(run("git", ["status", "--porcelain"], { root, env: localEnv, capture: true }).trim());
  if (production && dirty) throw new Error("Commit the working tree before a production release so its source can be reproduced.");
  const lessons = lessonMetadata(root);
  const published = lessons.filter((d) => d.status === "published");
  if (production && !published.length) throw new Error("There are no published lessons to release.");

  const startedAt = now().toISOString();
  const record = { target, prebuilt, project: { ...project, name: actual.name }, commit, dirty, startedAt, status: "running", url: null, steps: [] };
  const recordDir = path.join(root, "company/ops/deployments");
  fs.mkdirSync(recordDir, { recursive: true });
  const recordPath = path.join(recordDir, `${startedAt.replace(/[:.]/g, "-")}-${target}-${commit.slice(0, 8)}.json`);
  const save = () => fs.writeFileSync(recordPath, JSON.stringify(record, null, 2) + "\n");
  save();
  let currentStep;
  const step = (name, fn) => {
    currentStep = name;
    log(`deploy: ${name}`);
    const result = fn();
    record.steps.push(name);
    save();
    return result;
  };
  // The existing QA suite tests review lessons too, so verify the complete preview tree.
  // Only Vercel commands receive the authentication token.
  const verifyEnv = { ...env, SHOW_REVIEW: "on", NEXT_TELEMETRY_DISABLED: "1" };
  delete verifyEnv.VERCEL_TOKEN;

  try {
    step("verify", () => run("npm", ["run", "verify"], { root, env: verifyEnv }));
    if (prebuilt) {
      step("pull", () => vc(["pull", "--yes", "--environment", target]));
      step("build", () => {
        // Pull writes this ignored file. Override only our public visibility setting without
        // printing or recording any other environment values. Both static and dynamic pages
        // must have the target's visibility, regardless of the project's previous setting.
        const file = path.join(root, ".vercel", `.env.${target}.local`);
        if (!fs.existsSync(file)) throw new Error("Vercel pull did not produce the selected environment file.");
        const text = fs.readFileSync(file, "utf8").replace(/^SHOW_REVIEW=.*(?:\r?\n|$)/gm, "");
        fs.writeFileSync(file, `${text.trimEnd()}\nSHOW_REVIEW=${showReview}\n`);
        run(cli, ["--non-interactive", "build", "--yes", ...(production ? ["--prod"] : [])], {
          root, env: { ...localEnv, VERCEL_ORG_ID: project.orgId, VERCEL_PROJECT_ID: project.projectId, VERCEL_TELEMETRY_DISABLED: "1", SHOW_REVIEW: showReview },
        });
        if (!fs.existsSync(path.join(root, ".vercel/output/config.json"))) throw new Error("Vercel build produced no deployable output.");
      });
    }
    record.url = deploymentUrl(step("upload", () => vc([
      "deploy", "--yes", "--no-wait", "--format", "json",
      ...(prebuilt ? ["--prebuilt"] : ["--build-env", `SHOW_REVIEW=${showReview}`]),
      "--env", `SHOW_REVIEW=${showReview}`,
      "--meta", `s3Commit=${commit}`, "--meta", `s3Target=${target}`,
      ...(production ? ["--prod", "--skip-domain"] : []),
    ])));
    save();
    step("ready", () => {
      const data = JSON.parse(vc(["inspect", record.url, "--wait", "--timeout", "10m", "--format", "json"]));
      const info = data.deployment ?? data;
      if ((info.readyState ?? info.state ?? info.status) !== "READY") throw new Error("Deployment is not READY; it will not be promoted.");
      if (info.projectId && info.projectId !== project.projectId) throw new Error("Deployment belongs to a different project.");
      if (info.target && info.target !== target) throw new Error("Deployment has the wrong environment.");
    });
    step("smoke", () => {
      const get = (route) => vc(["curl", route, "--deployment", record.url, "--", "--silent", "--show-error", "--fail", "--max-time", "30"]);
      const home = get("/");
      if (!home.includes('data-testid="intro-card"')) throw new Error("Deployed feed did not render.");
      const map = get("/catalog");
      if (!map.includes('class="domain-block"')) throw new Error("Deployed curriculum map did not render.");
      const sample = (production ? published : lessons.filter((d) => ["review", "published"].includes(d.status)))[0];
      if (!sample || !get(`/d/${sample.slug}`).includes(`data-slug="${sample.slug}"`)) throw new Error("Deployed lesson did not render.");
      if (production) {
        const unpublished = lessons.filter((d) => d.status !== "published");
        for (const d of unpublished) {
          if (home.includes(`data-slug="${d.slug}"`) || map.includes(`href="/d/${d.slug}"`))
            throw new Error(`Unpublished lesson ${d.slug} is visible in production.`);
        }
        if (unpublished.length) {
          const status = vc(["curl", `/d/${unpublished[0].slug}`, "--deployment", record.url, "--", "--silent", "--show-error", "--output", "/dev/null", "--write-out", "%{http_code}", "--max-time", "30"]).trim();
          if (status !== "404") throw new Error("An unpublished lesson URL is reachable in production.");
        }
      }
    });
    if (production) step("promote", () => vc(["promote", record.url, "--yes", "--timeout", "10m"]));
    record.status = "ready";
    record.finishedAt = now().toISOString();
    save();
    log(`${target} ready: ${record.url}\nRelease record: ${path.relative(root, recordPath)}`);
    return record;
  } catch (error) {
    record.status = "failed";
    record.finishedAt = now().toISOString();
    // Store only our operation summary, never arbitrary subprocess output.
    record.failedStep = currentStep;
    save();
    log(`Deployment stopped. Release record: ${path.relative(root, recordPath)}`);
    throw error;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) console.log(HELP);
  else {
    try {
      const positional = args.filter((a) => !a.startsWith("--"));
      if (positional.length > 1 || args.some((a) => a.startsWith("--") && !["--dry-run", "--prebuilt"].includes(a))) throw new Error(HELP);
      deploy({ target: positional[0] ?? "preview", dryRun: args.includes("--dry-run"), prebuilt: args.includes("--prebuilt") });
    } catch (error) {
      console.error(`deploy: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
