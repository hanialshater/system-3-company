// FORMAT: how a value is shown to the user.
import { toText } from "../VALUES/values.mjs";

function round9(n) {
  if (!Number.isFinite(n) || Math.abs(n) >= 1e21) return n;
  return Number(n.toFixed(9));
}

export function display(v) {
  if (typeof v === "number") return String(round9(v));
  return toText(v);
}
