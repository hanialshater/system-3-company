// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<1||!Number.isInteger(p[0])||Math.abs(p[1])>=1)throw Error('Outside model domain');
 const result:number[]=[p[0]*p[0]/(p[0]+2*Array.from({length:p[0]-1},(_,i)=>(p[0]-i-1)*Math.pow(p[1],i+1)).reduce((a,b)=>a+b,0))];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
