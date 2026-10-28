// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==2 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{const a=p[0].toString(2).padStart(3,"0"),b=p[1].toString(2).padStart(3,"0");let states=new Map([["",1]]),won=0;for(let n=0;n<300;n++){const next=new Map();for(const [s,w] of states)for(const bit of ["0","1"]){const t=s+bit;if(t.endsWith(b))won+=w/2;else if(!t.endsWith(a)){let q="";for(let k=1;k<=Math.min(2,t.length);k++){const suffix=t.slice(-k);if(a.startsWith(suffix)||b.startsWith(suffix))q=suffix;}next.set(q,(next.get(q)||0)+w/2);}}states=next;}return won;})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
