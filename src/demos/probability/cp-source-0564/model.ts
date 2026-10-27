// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{let sum=0,c=1;for(let k=0;k<=p[0];k++){if(k>0)c=c*(p[0]-k+1)/k;sum+=(k%2?-1:1)*c*Math.pow(1-k/p[0],p[1]);}return Math.max(0,Math.min(1,sum));})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
