// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const d=[[0,0,4,4,4,4],[3,3,3,3,3,3],[2,2,2,2,6,6],[1,1,1,5,5,5]];return d[p[0]].reduce((s,x)=>s+d[p[1]].filter(y=>x>y).length,0)/36;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
