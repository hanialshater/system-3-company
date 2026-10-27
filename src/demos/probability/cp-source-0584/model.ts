// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<0||p[0]>1||p[1]<0||p[1]>1||p[0]+p[1]===0||p[2]<0||p[2]>1||p[3]<0||!Number.isInteger(p[3]))throw Error('Outside model domain');
 const result:number[]=[Math.abs(p[2]-p[0]/(p[0]+p[1]))*Math.pow(Math.abs(1-p[0]-p[1]),p[3]),1-Math.abs(1-p[0]-p[1])];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
