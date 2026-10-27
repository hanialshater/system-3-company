// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{let num=0,den=0;for(let code=0;code<2**p[0];code++){const bits=Array.from({length:p[0]},(_,i)=>(code>>i)&1),h=bits.reduce((a,b)=>a+b,0),w=p[1]**h*(1-p[1])**(p[0]-h),eligible=bits.slice(0,-1).reduce((a,b)=>a+b,0);if(eligible){num+=w*bits.slice(0,-1).reduce((s,x,i)=>s+x*bits[i+1],0)/eligible;den+=w;}}return num/den;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
