#!/usr/bin/env node
// Drafts a releases.json entry from a git range, for the RELEASE MANAGER to review, edit and append by hand.
// Prints JSON to stdout and writes nothing. Usage: node tools/release-draft.mjs [--commit=<sha>] [--since=<sha>]
//   --commit  the release commit (default HEAD)   --since  the previous release (default: last entry in releases.json)
// Lesson lists come from "status" in src/demos/*/*/meta.json at the two commits. Approval, summary and
// known issues are left as TODO: only a person can say who approved a deploy.
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 1 << 28 }).trim();
const log = JSON.parse(fs.readFileSync("company/ops/releases.json", "utf8"));
const commit = git("rev-parse", arg("commit") ?? "HEAD");
const since = arg("since") ?? log.releases.at(-1)?.commit;

const statuses = (c) => {
  const m = {};
  for (const f of git("ls-tree", "-r", "--name-only", c, "src/demos").split("\n").filter((f) => f.endsWith("/meta.json"))) {
    try {
      m[f.split("/")[3]] = JSON.parse(git("show", `${c}:${f}`)).status;
    } catch {}
  }
  return m;
};
const lessons = (prev, cur, to) => {
  const slugs = Object.keys(cur).filter((k) => cur[k] === to && prev[k] !== to).sort();
  return { count: slugs.length, slugs };
};

const iso = new Date(git("show", "-s", "--format=%cI", commit)).toISOString();
// Sequential versions: r(max+1), whatever the date.
const n = 1 + Math.max(0, ...log.releases.map((r) => /^r([1-9]\d*)$/.exec(r.version)).filter(Boolean).map((m) => Number(m[1])));
const subjects = git("log", "--no-merges", "--format=%h %s", since ? `${since}..${commit}` : commit).split("\n").filter(Boolean);
const prev = since ? statuses(since) : {};
const cur = statuses(commit);

console.log(
  JSON.stringify(
    {
      version: `r${n}`,
      date: iso,
      commit,
      target: "production",
      approved_by: { who: "TODO: the founder", record: "TODO: pointer to the approval (progress.md entry, commit message, inbox item)" },
      summary: "TODO: one line",
      added: {
        features: subjects.map((s) => `${s} (review: keep only app/HQ/kit changes)`),
        lessons: { published: lessons(prev, cur, "published"), in_review: lessons(prev, cur, "review") },
        fixes: [],
        known_issues: [],
      },
      draft: "drafted by tools/release-draft.mjs; release-manager must review before appending",
    },
    null,
    2,
  ),
);
