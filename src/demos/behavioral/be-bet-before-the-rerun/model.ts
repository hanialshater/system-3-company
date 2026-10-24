/** Explicit toy assumptions; no participant behavior is simulated. */
export function compute(v: readonly number[]): number[] {
  if (!v.length || v.some(n => !Number.isFinite(n))) throw new Error("Finite inputs required");
  const out = (() => { const p=v.slice(0,4),y=[1,0,1,0];return [p.reduce((s,t,i)=>s+(t-y[i])**2,0)/4,.25,p.filter((t,i)=>(t>=.5)===(y[i]===1)).length]; })();
  if (out.some(n => !Number.isFinite(n))) throw new Error("Undefined toy result");
  return out;
}
