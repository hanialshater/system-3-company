import { load, category } from "./kit.mjs";
const m = await load("GRAPH", "graph.mjs");
const cyc = (o) => [...m.cycleCells(new Map(Object.entries(o)))].sort();
category(m, "no cycles", [[{}, []], [{ A1: [], B1: ["A1"] }, []], [{ A1: ["B1"], B1: ["C1"], C1: [] }, []], [{ A2: ["A1"], A3: ["A1", "A2"] }, []]], cyc);
category(m, "cycles", [[{ A1: ["A1"] }, ["A1"]], [{ A1: ["B1"], B1: ["A1"] }, ["A1", "B1"]], [{ A1: ["B1"], B1: ["C1"], C1: ["A1"] }, ["A1", "B1", "C1"]], [{ A1: ["B1"], B1: ["A1"], C1: ["A1"] }, ["A1", "B1"]], [{ A1: ["B1"], B1: ["A1"], C1: ["D1"], D1: ["C1"], E1: [] }, ["A1", "B1", "C1", "D1"]], [{ A2: ["A1", "A2", "A3"] }, ["A2"]]], cyc);
const chain = (k) => { const o = {}; for (let i = 1; i < k; i++) o[`A${i}`] = [`A${i + 1}`]; o[`A${k}`] = ["A1"]; return o; };
category(m, "long cycles", [[chain(30), Array.from({ length: 30 }, (_, i) => `A${i + 1}`).sort()], [chain(99), Array.from({ length: 99 }, (_, i) => `A${i + 1}`).sort()]], cyc);
