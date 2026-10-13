#!/usr/bin/env node
// SPIKE-001: publish and roll back a lesson by pointing the manifest at a frame hash.
// The manifest is the only mutable file; bundles and frames are immutable and never deleted.
//
//   node spike/manifest.mjs list <slug>             versions built for a slug (from builds.json)
//   node spike/manifest.mjs set <slug> <frameHash>  point the live manifest at that version
//   node spike/manifest.mjs show                    the live pointers

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist");
const read = (f) => JSON.parse(fs.readFileSync(path.join(DIST, f), "utf8"));

export function setPointer(slug, frameHash) {
  const builds = read("builds.json");
  const matches = Object.keys(builds.lessons[slug] ?? {}).filter((h) => h.startsWith(frameHash));
  if (matches.length !== 1) throw new Error(`${slug}: ${matches.length} builds match ${frameHash}`);
  const b = builds.lessons[slug][matches[0]];
  if (!fs.existsSync(path.join(DIST, b.frame)) || !fs.existsSync(path.join(DIST, b.bundle))) throw new Error("artifact missing");
  const m = read("manifest.json");
  const prev = m.lessons[slug]?.frame;
  m.lessons[slug] = { ...m.lessons[slug], frame: b.frame, bundle: b.bundle, kit: "1.0.0", geo: b.geo };
  m.version += 1;
  // Write-then-rename: readers see the old or the new manifest, never half of one.
  const tmp = path.join(DIST, `.manifest.${process.pid}.json`);
  fs.writeFileSync(tmp, JSON.stringify(m, null, 2));
  fs.renameSync(tmp, path.join(DIST, "manifest.json"));
  return { slug, from: prev, to: b.frame, manifestVersion: m.version };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, slug, hash] = process.argv.slice(2);
  if (cmd === "set") console.log(JSON.stringify(setPointer(slug, hash)));
  else if (cmd === "list") {
    for (const [h, b] of Object.entries(read("builds.json").lessons[slug] ?? {})) console.log(`${h.slice(0, 12)}  variant ${b.variant}  bundle ${b.hash.slice(0, 12)}  ${b.gzip} B gz  built ${b.builtAt}`);
  } else console.log(JSON.stringify(read("manifest.json").lessons, null, 2));
}
