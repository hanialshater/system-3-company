// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<0||p[1]<0||p[0]+p[1]>1||p[2]<0||!Number.isInteger(p[2]))throw Error('Outside model domain');
 const result:number[]=[(()=>{let q=0;for(let i=0;i<p[2];i++)q=p[0]+(1-p[0]-p[1])*q+p[1]*q*q;return q;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
