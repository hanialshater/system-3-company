// Release log, server side: reads company/ops/releases.json and asks git for the commits since the last release.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { validateReleases, type Release, type Unreleased } from "./hq-releases";

export function loadReleases(root = process.cwd()): { releases: Release[]; error: string | null } {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(root, "company/ops/releases.json"), "utf8"));
    const error = validateReleases(data);
    return { releases: error ? [] : data.releases, error };
  } catch (e) {
    return { releases: [], error: `company/ops/releases.json could not be read: ${(e as Error).message}` };
  }
}

/** Commits on HEAD since the last release commit (the "Next release" section). Never throws. */
export function loadUnreleased(releases: Release[], root = process.cwd()): Unreleased {
  const base = releases.length ? releases[releases.length - 1].commit : null;
  try {
    const range = base ? [`${base}..HEAD`] : [];
    const out = execFileSync("git", ["log", "--no-merges", "--format=%H%x09%cI%x09%s", ...range], { cwd: root, encoding: "utf8", maxBuffer: 16_000_000, timeout: 10_000 });
    const commits = out.split("\n").filter(Boolean).map((l) => {
      const [hash, date, ...s] = l.split("\t");
      return { hash, date, subject: s.join("\t") };
    });
    return { base, commits };
  } catch (e) {
    return { base, commits: [], error: `git log failed: ${(e as Error).message.split("\n")[0]}` };
  }
}
