// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[Array.from({length:p[0]+1},(_,k)=>k).filter(k=>k>p[2]).reduce((s,k)=>{let c=1;for(let j=1;j<=k;j++)c=c*(p[0]-j+1)/j;return s+c*Math.pow(p[1],k)*Math.pow(1-p[1],p[0]-k);},0)];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
