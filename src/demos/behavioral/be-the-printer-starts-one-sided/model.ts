/** Explicit toy assumptions; no participant behavior is simulated. */
export function compute(v: readonly number[]): number[] {
  if (!v.length || v.some(n => !Number.isFinite(n))) throw new Error("Finite inputs required");
  const out = (() => { return [Math.ceil(v[0]/v[1]),v[0],v[1]]; })();
  if (out.some(n => !Number.isFinite(n))) throw new Error("Undefined toy result");
  return out;
}
