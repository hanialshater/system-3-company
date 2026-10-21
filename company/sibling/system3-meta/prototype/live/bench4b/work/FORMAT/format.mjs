// FORMAT: how a value is shown (SPEC.md "FORMAT").
import { isError, toText } from "../VALUES/values.mjs";

function round9(n) {
  if (!Number.isFinite(n)) return n;
  const r = Number(n.toFixed(9));
  return Object.is(r, -0) ? 0 : r;
}

export function display(v) {
  if (v === "") return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(round9(v));
  if (isError(v)) return v;
  if (typeof v === "string") return v;
  return toText(v);
}
