import fs from "node:fs";
// (reference only) the requirement change F4 renames the cycle error; the reference reads it from the acceptance dir
const cyc = process.env.B4_CYCLE ?? "#CYCLE!";
export const ERRORS = { DIV0: "#DIV/0!", REF: "#REF!", NAME: "#NAME?", VALUE: "#VALUE!", CYCLE: cyc };
export const isError = (v) => typeof v === "string" && Object.values(ERRORS).includes(v);
const NUM = /^\s*[-+]?(\d+\.?\d*|\.\d+)\s*$/;
export function toNumber(v) { if (v === "" || v == null) return 0; if (typeof v === "boolean") return v ? 1 : 0; if (typeof v === "number") return v; if (isError(v)) return v; return NUM.test(v) ? Number(v) : ERRORS.VALUE; }
export function toText(v) { if (v === "" || v == null) return ""; if (typeof v === "boolean") return v ? "TRUE" : "FALSE"; return String(v); }
export function parseLiteral(text) { return NUM.test(text) ? Number(text) : text; }
