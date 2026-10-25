// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{let c=1;for(let j=1;j<=p[2];j++)c=c*(p[0]-j+1)/j;return c*Math.pow(p[1],p[2])*Math.pow(1-p[1],p[0]-p[2]);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
