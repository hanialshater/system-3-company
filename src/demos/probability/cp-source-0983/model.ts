// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[3]<0||p[3]>1||p[4]<0)throw Error('Outside model domain');
 const result:number[]=[p[4]*(p[3]*Math.max(p[1]-p[2],0)+(1-p[3])*Math.max(p[0]-p[2],0))];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
