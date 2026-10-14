// COE coverage for dispatch-check rule R2 (W-715).
// A SEV1/SEV2 incident event is covered only by a COE record that
//   1. sits directly in company/rituals/records/ with a name starting YYYY-MM-DD-coe,
//   2. names the incident's event id on an `incident:` line, and
//   3. has a `status: final` line.
// A date match is not enough: before this, one stub file dated the same day cleared every incident from that day.
import fs from "node:fs";
import path from "node:path";

export const isSevere = (e) => e?.type === "incident" && /SEV ?[12]\b/i.test(e.summary ?? "");

// Read the COE records in recDir: [{ file, final, incidents: [ids] }].
export function readCoes(recDir) {
  if (!fs.existsSync(recDir)) return [];
  return fs.readdirSync(recDir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-coe.*\.md$/.test(f) && fs.statSync(path.join(recDir, f)).isFile())
    .sort()
    .map((f) => {
      const t = fs.readFileSync(path.join(recDir, f), "utf8");
      const final = /^status:\s*final\b/im.test(t);
      const incidents = [...t.matchAll(/^incident:(.*)$/gim)].flatMap((m) => m[1].match(/\bev-[0-9a-z]+\b/gi) ?? []);
      return { file: f, final, incidents };
    });
}

// Split severe incidents into covered and uncovered. Each uncovered item says why (draft-only or no record).
export function coeCoverage(events, recDir) {
  const coes = readCoes(recDir);
  const finalIds = new Set(coes.filter((c) => c.final).flatMap((c) => c.incidents));
  const draftIds = new Map(coes.filter((c) => !c.final).flatMap((c) => c.incidents.map((id) => [id, c.file])));
  const covered = [], uncovered = [];
  for (const e of events.filter(isSevere)) {
    if (e.id && finalIds.has(e.id)) covered.push(e);
    else uncovered.push({ ...e, why: e.id && draftIds.has(e.id) ? `COE ${draftIds.get(e.id)} is not status: final` : "no COE record names this incident id" });
  }
  return { covered, uncovered, coes };
}
