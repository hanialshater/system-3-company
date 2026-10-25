import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Onboarding (product/ONBOARDING.md): archetypes, the catalog, proposal with alternatives, the owner's approval, generation.
const { ARCHETYPES, loadCatalog, searchCatalog, propose, approve, generate, OnboardRefusal } = await import("../onboard.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const catalog = await loadCatalog([path.join(HERE, "fixtures", "domain-roles.json")]); // Meta's starter catalog plus a company's domain roles
const intake = { id: "kitchen", name: "Kitchen Co", purpose: "recipes that work", product: "tested recipes", measure: "recipes passing a cook test", budget: 50, owner: "founder-k", referee: { cmd: "node score.mjs {dir}", heldOut: "hidden/" } };
const crewDesign = { archetype: "dynamic-workflow", reason: "broad work that divides by cuisine", roles: ["evaluation-steward", "hq-engineer", "qa-tester", { id: "recipe-builder", mission: "write and test recipes" }], members: [{ id: "m-a", role: "recipes", model: "m" }, { id: "m-b", role: "tests", model: "m" }] };
const corpDesign = { archetype: "corporate", reason: "recurring production with gates", roles: ["chief-of-staff", "evaluation-steward", "hq-engineer", "qa-tester"] };
const refusal = (fn, re) => assert.throws(fn, (e) => e instanceof OnboardRefusal && re.test(e.message));

test("the catalog: one catalog, generic roles in the starter layer, searchable", () => {
  assert.equal(catalog.filter((r) => r.layer === "starter").length, 11); assert.ok(catalog.length >= 13);
  assert.equal(catalog.find((r) => r.id === "hq-engineer").layer, "starter"); assert.equal(catalog.find((r) => r.id === "demo-builder").layer, "domain");
  assert.ok(searchCatalog(catalog, "HQ pages event log").slice(0, 5).some((r) => r.id === "hq-engineer"));
  assert.deepEqual(Object.keys(ARCHETYPES), ["corporate", "dynamic-workflow", "science", "population", "single-agent"]);
});

test("propose: by the chief of staff or the org-health head, with an alternative, a referee owner and HQ developers", () => {
  const p = propose(catalog, intake, [crewDesign, corpDesign], "chief-of-staff"); assert.equal(p.status, "proposed");
  refusal(() => propose(catalog, intake, [crewDesign], "chief-of-staff"), /at least one alternative/);
  refusal(() => propose(catalog, intake, [crewDesign, corpDesign], "demo-builder"), /proposed by/);
  refusal(() => propose(catalog, intake, [{ ...crewDesign, roles: ["evaluation-steward", "qa-tester"] }, corpDesign], "chief-of-staff"), /includes hq-engineer/);
  refusal(() => propose(catalog, intake, [{ ...crewDesign, roles: [...crewDesign.roles, "no-such-role"] }, corpDesign], "chief-of-staff"), /no role no-such-role/);
  refusal(() => propose(catalog, intake, [crewDesign, { ...corpDesign, roles: ["evaluation-steward", "hq-engineer"] }], "chief-of-staff"), /includes chief-of-staff/);
  refusal(() => propose(catalog, { ...intake, owner: "" }, [crewDesign, corpDesign], "chief-of-staff"), /needs owner/);
});

test("approve: only the company's owner, one design", () => {
  const p = propose(catalog, intake, [crewDesign, corpDesign], "chief-of-staff-ceo-office");
  refusal(() => approve(p, "chief-of-staff", 1), /only the company's owner/);
  refusal(() => approve(p, "founder-k", 3), /choose a design/);
  const a = approve(p, "founder-k", 1); assert.equal(a.status, "approved"); refusal(() => approve(a, "founder-k", 2), /is approved/);
});

test("generate: a crew company's folder, its v1 events and its city entry; corporate gets a spec skeleton", () => {
  const p = propose(catalog, intake, [crewDesign, corpDesign], "chief-of-staff");
  refusal(() => generate(p, fs.mkdtempSync(path.join(os.tmpdir(), "co-"))), /approved proposal/);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "co-")), entry = generate(approve(p, "founder-k", 1), dir);
  assert.equal(entry.id, "kitchen"); assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, "crew.json"), "utf8")).members.map((m) => m.id), ["m-a", "m-b"]);
  const ev = fs.readFileSync(entry.events, "utf8").trim().split("\n").map((l) => JSON.parse(l));
  assert.deepEqual(ev.map((e) => e.type), ["company.proposed", "company.approved", "company.start"]); assert.equal(ev[1].by, "founder-k");
  refusal(() => generate(approve(p, "founder-k", 1), dir), /already holds a company/);
  const d2 = fs.mkdtempSync(path.join(os.tmpdir(), "co-")); generate(approve(p, "founder-k", 2), d2); assert.ok(fs.existsSync(path.join(d2, "spec.json")));
});

test("generate: a science company needs a held-out referee", () => {
  const sci = { ...crewDesign, archetype: "science", reason: "where being wrong is the default" };
  const p = approve(propose(catalog, { ...intake, referee: { cmd: "x" } }, [sci, corpDesign], "chief-of-staff"), "founder-k", 1);
  refusal(() => generate(p, fs.mkdtempSync(path.join(os.tmpdir(), "co-"))), /held-out referee/);
});

test("the HQ reads a generated company as onboarded", async () => {
  const { health } = await import("../hq/server.mjs");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "co-")), e = generate(approve(propose(catalog, intake, [crewDesign, corpDesign], "chief-of-staff"), "founder-k", 1), dir);
  const h = health(fs.readFileSync(e.events, "utf8").trim().split("\n").map((l) => JSON.parse(l)));
  assert.equal(h.state, "onboarded"); assert.equal(h.members, 4); assert.equal(h.budget, 50);
});

test("generate: the org file keeps catalog reporting lines among the chosen roles, else the owner", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "co-")), e = generate(approve(propose(catalog, intake, [crewDesign, corpDesign], "chief-of-staff"), "founder-k", 2), dir, catalog);
  const { spawnSync } = await import("node:child_process"), r = spawnSync("sh", ["-c", e.orgCmd], { encoding: "utf8" }); // the city entry names the org tool
  const org = JSON.parse(r.stdout), by = Object.fromEntries(org.map((r) => [r.id, r]));
  assert.equal(by["founder-k"].reportsTo, null); assert.equal(by["chief-of-staff"].reportsTo, "founder-k");
  for (const r of org.slice(1)) assert.ok(by[r.reportsTo], `${r.id} reports to a role in the org`);
});
