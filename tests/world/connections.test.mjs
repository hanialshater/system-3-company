import test from "node:test";
import assert from "node:assert/strict";
import { buildWorldConnections } from "../../src/lib/world-connections.ts";

const lesson = (slug, concept, domain = "math") => ({ slug, concept, domain });
const island = (id, index, slugs) => ({ id, index, regions: [{ lessons: slugs.map(slug => ({ slug })) }] });
const concept = (id, prerequisites = [], name = id) => ({ id, name, prerequisites });
const pairs = connections => connections.map(c => [c.fromIsland, c.toIsland]);

test("one actual concept can branch into multiple islands, including cross-subject links", () => {
  const islands = [island("numbers", 0, ["powers"]), island("growth", 1, ["doubling"]), island("outbreaks", 2, ["cases"])];
  const lessons = [lesson("powers", "powers"), lesson("doubling", "doubling"), lesson("cases", "outbreak", "life")];
  const definitions = { math: [concept("powers", [], "Powers of ten"), concept("doubling", ["powers"])], life: [concept("outbreak", ["math:powers"])] };
  const output = buildWorldConnections(islands, lessons, definitions);
  assert.deepEqual(pairs(output), [["numbers", "growth"], ["numbers", "outbreaks"]]);
  assert.deepEqual(output[1].topics, [{ fromConcept: "math:powers", toConcept: "life:outbreak", fromLabel: "Powers of ten", toLabel: "outbreak" }]);
});

test("unknown curriculum references and unavailable lessons never manufacture routes", () => {
  const islands = [island("a", 0, ["a"]), island("b", 1, ["b"]), island("orphan", 2, ["unlisted"])];
  const lessons = [lesson("a", "a"), lesson("b", "b"), lesson("unlisted", "unknown"), lesson("not-in-world", "off-map")];
  const definitions = { math: [concept("a"), concept("b", ["missing", "life:missing", "unavailable", "off-map", "unknown"]), concept("unavailable"), concept("off-map")] };
  assert.deepEqual(buildWorldConnections(islands, lessons, definitions), []);
});

test("a concept spread over several islands connects every available membership and omits self edges", () => {
  const islands = [island("first", 0, ["a", "b"]), island("second", 1, ["a2"]), island("third", 2, ["b2"])];
  const lessons = [lesson("a", "a"), lesson("a2", "a"), lesson("b", "b"), lesson("b2", "b")];
  const output = buildWorldConnections(islands, lessons, { math: [concept("a"), concept("b", ["a"])] });
  assert.deepEqual(pairs(output), [["first", "third"], ["second", "first"], ["second", "third"]]);
  assert.ok(output.every(c => c.fromIsland !== c.toIsland));
});

test("duplicate prerequisite entries and duplicate concept lessons preserve distinct reasons once", () => {
  const islands = [island("a", 0, ["a", "a2", "other"]), island("b", 1, ["b", "b2"])];
  const lessons = [lesson("a", "a"), lesson("a2", "a"), lesson("other", "other"), lesson("b", "b"), lesson("b2", "b")];
  const output = buildWorldConnections(islands, lessons, { math: [concept("a"), concept("other"), concept("b", ["a", "math:a", "other", "other"])] });
  assert.equal(output.length, 1);
  assert.deepEqual(output[0].topics.map(t => t.fromConcept), ["math:a", "math:other"]);
});

test("island aggregation cycles are retained without recursion and input order does not reshuffle routes", () => {
  const islands = [island("a", 0, ["a"]), island("b", 1, ["b"]), island("c", 2, ["c"])];
  const lessons = [lesson("a", "a"), lesson("b", "b"), lesson("c", "c")];
  const entries = [concept("a", ["c"]), concept("b", ["a"]), concept("c", ["b"])];
  const first = buildWorldConnections(islands, lessons, { math: entries });
  const second = buildWorldConnections([...islands].reverse(), [...lessons].reverse(), { math: [...entries].reverse() });
  assert.deepEqual(pairs(first), [["a", "b"], ["b", "c"], ["c", "a"]]);
  assert.deepEqual(second, first);
});
