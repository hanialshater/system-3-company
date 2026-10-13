// Who is who in HQ: names, avatar seeds, home rooms and live presence, all derived from the event log.
import type { HqEvent } from "@/lib/hq";
import { MANY, nameFor, seedOf } from "../../../tools/org/people.mjs";

/** Where a single-agent role sits when it is not working elsewhere. */
export const HOME: Record<string, string> = {
  "chief-of-staff": "chief-of-staff",
  "head-of-product": "chief-of-staff",
  "learning-designer": "studio",
  "mockup-artist": "studio",
  researcher: "studio",
  "domain-scout": "studio",
  "pattern-librarian": "studio",
  "evaluation-steward": "constitution",
  "principal-engineer": "engineering",
  "platform-engineer": "engineering",
  "release-manager": "launch-room",
  "accessibility-reviewer": "qa-lab",
  "backend-engineer": "backend",
  "privacy-reviewer": "backend",
  "growth-designer": "growth",
  "analytics-steward": "growth",
  "tools-lead": "tools",
  "hq-engineer": "tools",
};
for (const d of ["math", "cs", "probability", "physics", "ai", "economics", "life", "chemistry", "geography"]) HOME[`cm-${d}`] = `cm-${d}`;

export interface Person {
  key: string;
  role: string;
  name: string;
  seed: number;
  room: string;
  state: "working" | "stopped" | "done" | "idle";
  since: number;
  summary: string;
  label?: string;
}

export const personName = (role: string, label?: string) => nameFor(role, label);
export const personSeed = (role: string, label?: string) => seedOf(`${role}|${nameFor(role, label)}`);
export const isMany = (role: string) => MANY.has(role);

/** Everyone in the building at time t: dispatched agents (by label) and the resident single-agent roles. */
export function peopleAt(upto: HqEvent[], t: number): Person[] {
  const agents = new Map<string, Person>();
  for (const e of upto) {
    if (!e.agent) continue;
    const role = e.actor === "chief-of-staff" ? (e.subjects?.[0] ?? "general-purpose") : e.actor;
    const prev = agents.get(e.agent);
    agents.set(e.agent, {
      key: e.agent,
      role: prev?.role ?? role,
      name: personName(prev?.role ?? role, e.agent),
      seed: personSeed(prev?.role ?? role, e.agent),
      room: e.room,
      state: (e.state as Person["state"]) ?? "working",
      since: Date.parse(e.ts),
      summary: e.summary,
      label: e.agent,
    });
  }
  // Pool roles (builders, checkers, reviewers) appear only while running, stopped, or just finished.
  const visible = [...agents.values()].filter((p) => p.state !== "done" || t - p.since < 20 * 60_000);
  // Resident roles always have a desk; a running agent of that role replaces its idle self.
  const busy = new Set(visible.filter((p) => !isMany(p.role)).map((p) => p.role));
  const residents: Person[] = Object.entries(HOME)
    .filter(([role]) => !busy.has(role))
    .map(([role, room]) => ({ key: `home-${role}`, role, name: personName(role), seed: personSeed(role), room, state: "idle", since: 0, summary: "At their desk" }));
  return [...residents, ...visible];
}
