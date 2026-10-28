/** Explicit toy assumptions; no participant behavior is simulated. */
export function compute(v: readonly number[]): number[] {
  if (!v.length || v.some(n => !Number.isFinite(n))) throw new Error("Finite inputs required");
  const out = (() => { const end=v.reduce((w,r)=>w*(1+r/100),100); return [end-100,v.filter(r=>r<0).length,end]; })();
  if (out.some(n => !Number.isFinite(n))) throw new Error("Undefined toy result");
  return out;
}
