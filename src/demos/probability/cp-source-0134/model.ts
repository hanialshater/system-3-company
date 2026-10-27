// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[Math.sqrt(p[0]*p[0]*p[1]*p[1]+Math.pow(1-p[0],2)*p[2]*p[2]+2*p[0]*(1-p[0])*p[1]*p[2]*p[3])];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
