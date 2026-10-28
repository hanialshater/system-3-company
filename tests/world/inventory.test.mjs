import test from "node:test";
import assert from "node:assert/strict";
import { buildWorld, islandLessons, NUMBER_STOPS, readWorldLocation, worldHref, worldPlayerHref } from "../../src/lib/lessons-world.ts";
const domains = [{ id: "math", name: "Mathematics", short: "Math" }, { id: "chemistry", name: "Chemistry", short: "Chemistry" }];
const lesson = (slug, domain = "math", status = "draft", concept = "unmapped") => ({ slug, title: `Question ${slug}?`, hook: "Try both cases.", domain, status, durationSec: 60, concept });
test("all actual lessons appear once, including unmapped drafts, review and retired lessons", () => {
  const input = [...NUMBER_STOPS.map(s => lesson(s, "math", "published")), ...Array.from({ length: 72 }, (_, i) => lesson(`new-pr-${i}`, "chemistry", ["draft", "review", "retired"][i % 3]))];
  const world = buildWorld(input, domains);
  const output = world.flatMap(islandLessons);
  assert.equal(output.length, input.length);
  assert.equal(new Set(output.map(l => l.slug)).size, input.length);
  assert.deepEqual(world[0].regions.map(r => r.lessons.length), [3, 4, 5]);
  assert.deepEqual(world.slice(1).map(i => islandLessons(i).length), [25, 25, 22]);
  for (const source of input) assert.equal(output.find(d => d.slug === source.slug).status, source.status);
  assert.ok(world.every(i => i.regions.every(r => r.lessons.length <= 5)));
  assert.ok(output.every(l => !Object.hasOwn(l, "claims") && !Object.hasOwn(l, "recall")));
});
test("curriculum concept order is honored and input order does not reshuffle islands", () => {
  const input = [lesson("z", "chemistry", "draft", "first"), lesson("a", "chemistry", "draft", "second"), lesson("c", "chemistry")];
  const concepts = { chemistry: [{ id: "first", name: "First topic" }, { id: "second", name: "Second topic" }] };
  const a = buildWorld(input, domains, concepts), b = buildWorld([...input].reverse(), domains, concepts);
  assert.deepEqual(a, b);
  assert.deepEqual(a.flatMap(islandLessons).map(l => l.slug), ["z", "a", "c"]);
});
test("duplicate slugs fail visibly rather than silently omitting one", () => {
  assert.throws(() => buildWorld([lesson("duplicate"), lesson("duplicate")], domains), /duplicate/);
});
test("explicit deep links win; unknown and duplicate selection parameters safely choose the beginning", () => {
  const world = buildWorld(NUMBER_STOPS.map(s => lesson(s)), domains);
  assert.equal(readWorldLocation("#stop=cube-the-size&view=list", world).slug, "cube-the-size");
  assert.equal(readWorldLocation("#stop=cube-the-size&view=list", world).view, "list");
  for (const hash of ["#stop=missing", "#stop=cube-the-size&stop=add-a-zero"]) assert.equal(readWorldLocation(hash, world).slug, NUMBER_STOPS[0]);
  assert.equal(worldHref("cube-the-size", "list"), "/learn/world#stop=cube-the-size&view=list");
  assert.equal(worldPlayerHref("number-island", "cube-the-size", "list"), "/learn/world/play/number-island?stop=cube-the-size&view=list");
});
