// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[1]<=0)throw Error('Outside model domain');
 const result:number[]=[p[0]-p[1]*Math.floor(p[0]/p[1]+0.5)];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
