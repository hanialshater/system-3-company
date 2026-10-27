// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[1]<=0||p[2]<0||![0,1,2].includes(p[4]))throw Error('Outside model domain');
 const result:number[]=[(()=>{const k=p[4]===0?Math.exp(-p[0]*p[0]/(2*p[1]*p[1])):p[4]===1?Math.exp(-Math.abs(p[0])/p[1]):Math.exp(-2*Math.pow(Math.sin(Math.PI*p[0]),2)/(p[1]*p[1]));return k*p[3]/(1+p[2]);})(),(()=>{const k=p[4]===0?Math.exp(-p[0]*p[0]/(2*p[1]*p[1])):p[4]===1?Math.exp(-Math.abs(p[0])/p[1]):Math.exp(-2*Math.pow(Math.sin(Math.PI*p[0]),2)/(p[1]*p[1]));return 1-k*k/(1+p[2]);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
