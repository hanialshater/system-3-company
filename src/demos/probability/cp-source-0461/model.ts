// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{if(!Number.isInteger(p[0])||p[0]<0||p[0]>2||![0,1].includes(p[1]))throw Error("Invalid graph choice");return p[0]===2?p[1]:1-p[1];})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
