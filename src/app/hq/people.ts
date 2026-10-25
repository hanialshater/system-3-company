// Who is who in HQ: names, avatar seeds, home rooms and live presence, all derived from the event log.
import type { HqEvent } from "@/lib/hq";
import { MANY, nameFor, seedOf } from "../../../tools/org/people.mjs";
import { SUBAREAS, roles } from "../../../tools/org/roles.mjs";

/** Where a single-agent role sits when it is not working elsewhere. */
export const HOME: Record<string, string> = {
  "chief-of-staff": "chief-of-staff",
  "chief-of-staff-ceo-office": "ceo-office",
  "portfolio-manager": "ceo-office",
  "head-of-strategic-initiatives": "ceo-office",
  "chief-product-officer": "ceo-office",
  "head-of-evaluation": "learner-review",
  "evaluation-engineer": "learner-review",
  "head-of-product": "product",
  "principal-pm-verticals": "strategy",
  "courses-lead": "courses",
  "cm-course-ncm": "courses",
  "learning-designer": "studio",
  "mockup-artist": "design-studio",
  "design-lead": "design-studio",
  "interaction-designer": "design-studio",
  "visual-designer": "design-studio",
  illustrator: "design-studio",
  "design-engineer": "design-studio",
  researcher: "research-lab",
  "domain-scout": "strategy",
  "pattern-librarian": "chief-of-staff",
  "evaluation-steward": "constitution",
  "principal-engineer": "engineering",
  "principal-engineer-ops": "ops-room",
  "vp-rnd": "rnd-office",
  "vp-marketing": "marketing",
  "rnd-lead": "rnd-office",
  "research-lead": "research-office",
  "rnd-engineer": "rnd-lab",
  "research-scientist": "research-lab",
  "platform-engineer": "app-team",
  "community-engineer": "app-team",
  "release-manager": "launch-room",
  "accessibility-reviewer": "qa-lab",
  "backend-engineer": "backend",
  "privacy-reviewer": "privacy-review",
  "growth-designer": "growth",
  "analytics-steward": "growth",
  "tools-lead": "tools",
  "hq-engineer": "tools",
  "cm-lifehacks": "cm-lifehacks",
  "lifehacks-safety-reviewer": "lifehacks-safety",
  "vp-personalization": "personalization",
  "learner-model-engineer": "model-lab",
  "personalization-engineer": "model-lab",
  "learner-data-engineer": "model-lab",
  "lesson-dims-owner": "personalization",
  "localization-lead": "international",
};
for (const d of ["math", "cs", "probability", "physics", "ai", "economics", "life", "chemistry", "geography", "books", "big-ideas", "history", "behavioral"]) HOME[`cm-${d}`] = `cm-${d}`;
// Sub-area managers sit in their category's office (floors 3 and 4, split by neighbourhood; Behavioral and Life Hacks have no strands).
for (const [d, subs] of Object.entries(SUBAREAS)) for (const [sub] of subs) HOME[`cm-${d}-${sub}`] = `cm-${d}`;
// Restructuring 2026-10-25 (company/decisions/2026-10-25-founder-restructuring.md): parked roles have no seat. Their rows above are
// kept so un-parking a role brings its old seat back; the two new roles are pools (MANY) and sit only while running.
for (const id of Object.keys(HOME)) if (!roles.some((r: { id: string }) => r.id === id)) delete HOME[id];

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
