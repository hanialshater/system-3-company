// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<1||p[0]>100||!Number.isInteger(p[0]))throw Error('Outside model domain');
 const result:number[]=[4/Math.PI*Array.from({length:p[0]},(_,k)=>Math.sin(2*Math.PI*(2*k+1)*p[1])/(2*k+1)).reduce((a,b)=>a+b,0)];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
