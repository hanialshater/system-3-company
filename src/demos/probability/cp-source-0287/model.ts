// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(p[0]-p[1])*(p[2]-p[3])+p[4],p[0]*p[2]+(1-p[0])*p[3]+p[4],p[1]*p[2]+(1-p[1])*p[3]];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
