// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 const result:number[]=[(()=>{let w=[1/3,1/3,1/3];const win=w.map((_,i)=>p[3]*p[0]+(1-p[3])*(i===0?p[1]:p[2]));for(let t=0;t<1000;t++){const q=[0,0,0];for(let i=0;i<3;i++){q[(i+1)%3]+=w[i]*win[i];q[(i+2)%3]+=w[i]*(1-win[i]);}w=q;}return w.reduce((s,x,i)=>s+x*(2*win[i]-1),0);})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
