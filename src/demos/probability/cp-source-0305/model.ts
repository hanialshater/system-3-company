// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{if(![0,1].includes(p[2])||![0,1].includes(p[3])||p[0]<=0||p[0]>=1||p[1]<=0||p[1]>=1)throw Error("Invalid selection inputs");return p[2]===1&&p[3]===0?1:p[1];})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
