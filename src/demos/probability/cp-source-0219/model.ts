// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const h=(x:number)=>-[x,1-x].filter(v=>v>0).reduce((s,v)=>s+v*Math.log2(v),0),q=p[0]*p[1]+(1-p[0])*p[2];return h(p[0])-q*h(p[0]*p[1]/q)-(1-q)*h(p[0]*(1-p[1])/(1-q));})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
