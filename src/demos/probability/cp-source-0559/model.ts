// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==3 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 
 const result:number[]=[(()=>{let states=new Map([[0,1]]),hit=0;for(let i=0;i<p[0];i++){const next=new Map();for(const [x,w] of states)for(const [y,weight] of [[x+1,w*p[2]],[x-1,w*(1-p[2])]]){if(y>=p[1])hit+=weight;else next.set(y,(next.get(y)||0)+weight);}states=next;}return hit;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
