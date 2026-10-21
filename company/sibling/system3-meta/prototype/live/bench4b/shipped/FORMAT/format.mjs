// FORMAT: how a value is shown (SPEC.md "FORMAT").
import { isError } from "../VALUES/values.mjs";

function round9(n) {
  if (!Number.isFinite(n)) return n;
  const r = Number(n.toFixed(9));
  return r === 0 ? 0 : r; // no "-0"
}

export function display(v) {
  if (v === "") return "";
  if (v === true) return "TRUE";
  if (v === false) return "FALSE";
  if (typeof v === "number") return String(round9(v));
  if (isError(v)) return v;
  return typeof v === "string" ? v : String(v);
}
