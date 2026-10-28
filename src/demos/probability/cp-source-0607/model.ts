// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[Math.cos(p[0]),Math.sin(p[0]),p[1]];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
