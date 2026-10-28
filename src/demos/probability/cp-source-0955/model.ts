// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<0||Math.abs(p[1])>=1)throw Error('Outside model domain');
 const result:number[]=[p[0]/(1+p[1]*p[1]-2*p[1]*Math.cos(2*Math.PI*p[2]))];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
