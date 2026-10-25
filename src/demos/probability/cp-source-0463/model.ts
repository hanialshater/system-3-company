// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{const m=p[0]*p[1]+(1-p[0])*p[2],v=p[0]*(p[1]-m)**2+(1-p[0])*(p[2]-m)**2;return (p[0]*(p[1]-m)**3+(1-p[0])*(p[2]-m)**3)/Math.pow(v,1.5);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
