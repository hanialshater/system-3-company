// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{let lo=-10,hi=10;for(let k=0;k<100;k++){const t=(lo+hi)/2,w=Array.from({length:p[0]},(_,i)=>Math.exp(t*(i+1))),mean=w.reduce((s,x,i)=>s+(i+1)*x,0)/w.reduce((a,b)=>a+b,0);if(mean<p[1])lo=t;else hi=t;}return (lo+hi)/2;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
