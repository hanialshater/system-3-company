import { load, category } from "./kit.mjs";
const m = await load("CELLS", "cells.mjs");
category(m, "isRef", [["A1", true], ["Z99", true], ["B10", true], ["AA1", false], ["A100", false], ["A0", false], ["A01", false], ["a1", false], ["1A", false]], (s) => m.isRef(s));
category(m, "rangeCells", [[["A1", "A3"], ["A1", "A2", "A3"]], [["B2", "A1"], ["A1", "A2", "B1", "B2"]], [["C5", "C5"], ["C5"]], [["A1", "AA2"], null], [["A0", "A2"], null]], ([a, b]) => m.rangeCells(a, b));
const rf = (ast) => [...m.refsOf(ast)].sort();
category(m, "refsOf", [[{ type: "ref", ref: "A1" }, ["A1"]], [{ type: "ref", ref: "AA1" }, []], [{ type: "bin", op: "+", left: { type: "ref", ref: "B2" }, right: { type: "neg", arg: { type: "ref", ref: "C3" } } }, ["B2", "C3"]], [{ type: "call", name: "SUM", args: [{ type: "range", from: "A1", to: "A2" }, { type: "num", value: 1 }] }, ["A1", "A2"]], [{ type: "num", value: 1 }, []]], rf);
