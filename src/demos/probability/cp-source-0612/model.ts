// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{const k=Math.exp(-Math.pow(p[1]-p[0],2)/p[2]),field=(-p[0]-p[1]*k-2*(p[1]-p[0])*k/p[2])/2;return p[0]+p[3]*field;})(),(()=>{const k=Math.exp(-Math.pow(p[1]-p[0],2)/p[2]);return (-p[0]-p[1]*k-2*(p[1]-p[0])*k/p[2])/2;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
