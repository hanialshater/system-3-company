// Company specs: the org a live state starts from. `toy` is the org of live runs 1-3; `storybook` is the proxy company
// for the benchmark (founder, 2026-10-21: "Use writing small story book as a proxy task for the companies").
// A spec is data only; `node meta.mjs init --spec=<name>` builds the state from it.

const STAGES = (evidenceBuild) => [
  { stage: "build", signer: "builder", evidence: [evidenceBuild] },
  { stage: "test1", signer: "code", evidence: [] },
  { stage: "check", signer: "checker", evidence: ["review notes"] },
  { stage: "uat", signer: "orderer", evidence: ["hidden acceptance tests"] },
  { stage: "ship", signer: "release", evidence: ["copied to live/shipped/"] },
];

export const SPECS = {
  // System 3 Meta itself (founder, 2026-10-21: "Add org evaluation agent reporting to meta vp"): the org that builds
  // companies, with an evaluator that judges whether the companies it builds learn, improve, self-correct and
  // collaborate well. The evaluator reads code-built packs (orgeval.mjs), writes judgments, and raises its
  // recommendations as asks to the vp; it signs no stage and builds nothing.
  meta: {
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "vp-office", floor: 1, kind: "office" }, { id: "eval-room", floor: 2, kind: "quality" }, { id: "review-room", floor: 2, kind: "meeting", capacity: 4 }],
    skills: ["manage", "evaluate"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "vp-meta", level: "vp", reportsTo: "founder", room: "vp-office", floor: 1, skills: ["manage"] },
      { id: "org-evaluator", level: "evaluator", reportsTo: "vp-meta", room: "eval-room", floor: 2, skills: ["evaluate"] },
    ],
    flow: { name: "task", stages: STAGES("live/work/<task>/page.md") },
  },
  toy: {
    rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "sandbox", floor: 2, kind: "lane", lane: "s" }, { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
    skills: ["manage", "js", "review", "release"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
      { id: "mgr-live", level: "manager", reportsTo: "cos", lane: "s", room: "sandbox", floor: 2, skills: ["manage"] },
      { id: "toy-builder-1", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
      { id: "toy-builder-2", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
      { id: "toy-checker", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["review"] },
      { id: "toy-release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
    ],
    flow: { name: "task", stages: STAGES("live/work/<task>/") },
  },
  storybook: {
    rooms: [
      { id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" },
      { id: "editorial", floor: 2, kind: "lane", lane: "e" }, { id: "story-room", floor: 2, kind: "meeting", capacity: 6 },
      { id: "quality", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" },
    ],
    skills: ["manage", "write", "read", "release"],
    roles: [
      { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
      { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
      { id: "editor", level: "manager", reportsTo: "cos", lane: "e", room: "editorial", floor: 2, skills: ["manage"] },
      { id: "writer-1", level: "builder", reportsTo: "editor", lane: "e", room: "editorial", floor: 2, skills: ["write"] },
      { id: "writer-2", level: "builder", reportsTo: "editor", lane: "e", room: "editorial", floor: 2, skills: ["write"] },
      { id: "reader", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["read"] },
      { id: "release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
    ],
    flow: { name: "task", stages: STAGES("live/work/<task>/page.md") },
  },
};
