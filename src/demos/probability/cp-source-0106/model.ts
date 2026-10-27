// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const v=1/(1/p[1]+1/p[3]),m=v*(p[0]/p[1]+p[2]/p[3]);return m-p[4]*Math.sqrt(v);})(),(()=>{const v=1/(1/p[1]+1/p[3]),m=v*(p[0]/p[1]+p[2]/p[3]);return m+p[4]*Math.sqrt(v);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
