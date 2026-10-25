// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==1 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const gcd=(a:number,b:number):number=>b===0?a:gcd(b,a%b);let n=0;for(let a=1;a<=p[0];a++)for(let b=1;b<=p[0];b++)if(gcd(a,b)===1)n++;return n/(p[0]*p[0]);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
