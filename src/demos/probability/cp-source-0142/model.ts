// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const d=p[1],origin=Array(d).fill(0).join(",");let states=new Map([[origin,1]]);for(let n=0;n<p[0];n++){const next=new Map();for(const [key,w] of states){const x=key.split(",").map(Number);for(let i=0;i<d;i++)for(const delta of [-1,1]){const y=[...x];y[i]+=delta;const k=y.join(",");next.set(k,(next.get(k)||0)+w/(2*d));}}states=next;}return states.get(origin)||0;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
