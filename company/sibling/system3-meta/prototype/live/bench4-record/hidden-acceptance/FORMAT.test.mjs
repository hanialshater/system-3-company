import { load, category, CYC } from "./kit.mjs";
const m = await load("FORMAT", "format.mjs");
category(m, "display", [["", ""], [true, "TRUE"], [false, "FALSE"], ["hi", "hi"], ["#REF!", "#REF!"], [CYC, CYC], [3, "3"], [0.1 + 0.2, "0.3"], [1 / 3, "0.333333333"], [-2.5, "-2.5"], [1e-12, "0"]], (v) => m.display(v));
