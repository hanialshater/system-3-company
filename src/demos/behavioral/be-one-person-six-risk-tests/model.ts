/** Explicit toy assumptions; no participant behavior is simulated. */
export function compute(v: readonly number[]): number[] {
  if (!v.length || v.some(n => !Number.isFinite(n))) throw new Error("Finite inputs required");
  const out = (() => { const x=[1,2,3],y=[v[0],v[1],v[2]];const mx=2,my=y.reduce((a,b)=>a+b,0)/3;const cov=x.reduce((s,t,i)=>s+(t-mx)*(y[i]-my),0),den=Math.sqrt(x.reduce((s,t)=>s+(t-mx)**2,0)*y.reduce((s,t)=>s+(t-my)**2,0));return [cov/den,y[0],y[2]]; })();
  if (out.some(n => !Number.isFinite(n))) throw new Error("Undefined toy result");
  return out;
}
