// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{const pvar=p[1]+p[2],k=pvar/(pvar+p[4]);return p[0]+k*(p[3]-p[0]);})(),(p[1]+p[2])*p[4]/(p[1]+p[2]+p[4]),(p[1]+p[2])/(p[1]+p[2]+p[4])];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
