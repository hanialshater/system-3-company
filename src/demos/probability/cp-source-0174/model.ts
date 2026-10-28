// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==1 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{let v=p[0]%2===0?1:2;for(let d=p[0]%2===0?2:3;d<=p[0];d+=2)v*=2*Math.PI/d;return v/Math.pow(2,p[0]);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
