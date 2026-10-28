// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[1]<=0)throw Error('Outside model domain');
 const result:number[]=[(()=>{const z=(p[0]-p[2])/p[1],pdf=(x:number)=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);let cdf=0;if(z>=8)cdf=1;else if(z>-8){const n=2048,h=(z+8)/n;let s=pdf(-8)+pdf(z);for(let i=1;i<n;i++)s+=(i%2?4:2)*pdf(-8+i*h);cdf=s*h/3;}return (p[0]-p[2])*cdf+p[1]*pdf(z);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
