// The toy org and its flow, shared by the tests and the simulator.
import { makeCompany, Org, Engine, Rooms, Rituals, DEFAULT_CONFIG } from "./lib.mjs";

export const ROOMS = [
  { id: "lobby", floor: 1 }, { id: "ceo-office", floor: 1 },
  { id: "widgets", floor: 2 }, { id: "gadgets", floor: 2 },
  { id: "quality", floor: 3 }, { id: "launch", floor: 3 },
];
export const SKILLS = ["widget", "gadget", "check", "release", "manage"];
export const RITUAL_IDS = ["wbr", "ops-review"];

export const TOY_ROLES = [
  { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
  { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1, rituals: ["wbr:chair"] },
  { id: "mgr-w", level: "manager", reportsTo: "cos", lane: "w", room: "widgets", floor: 2, skills: ["manage"], rituals: ["wbr:attends"] },
  { id: "mgr-g", level: "manager", reportsTo: "cos", lane: "g", room: "gadgets", floor: 2, skills: ["manage"], rituals: ["wbr:attends"] },
  { id: "b-w1", level: "builder", reportsTo: "mgr-w", lane: "w", room: "widgets", floor: 2, skills: ["widget"], skill: 0.8 },
  { id: "b-w2", level: "builder", reportsTo: "mgr-w", lane: "w", room: "widgets", floor: 2, skills: ["widget"], skill: 0.6 },
  { id: "b-g1", level: "builder", reportsTo: "mgr-g", lane: "g", room: "gadgets", floor: 2, skills: ["gadget"], skill: 0.7 },
  { id: "b-g2", level: "builder", reportsTo: "mgr-g", lane: "g", room: "gadgets", floor: 2, skills: ["gadget"], skill: 0.5 },
  { id: "chk-1", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["check"], rituals: ["wbr:attends"] },
  { id: "rel-1", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
];

export const ITEM_FLOW = {
  stages: [
    { stage: "build", signer: "builder", evidence: ["artifact"] },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "check", signer: "checker", evidence: ["review record"] },
    { stage: "uat", signer: "orderer", evidence: ["acceptance against the order"] },
    { stage: "release", signer: "founder", evidence: ["decision with the founder's words"] },
    { stage: "ship", signer: "release", evidence: ["deployment receipt"] },
  ],
};

export function build(config = DEFAULT_CONFIG) {
  const c = makeCompany(config);
  const org = new Org({ log: c.log, rooms: ROOMS, skills: SKILLS, rituals: RITUAL_IDS });
  org.genesis(TOY_ROLES.map((r) => ({ ...r })));
  const engine = new Engine({ ...c, org });
  const rooms = new Rooms({ ...c, engine, org });
  const rituals = new Rituals({ ...c, org });
  const key = engine.define("item", ITEM_FLOW, { by: "cos" });
  engine.approveDef(key, { by: "founder", words: "Approve the item flow" });
  return { ...c, org, engine, rooms, rituals };
}
