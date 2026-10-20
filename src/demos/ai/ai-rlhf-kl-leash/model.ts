export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const r=m===2?[3,1]:[1,3],beta=m===1?0:1,q=[.5,.5],z=r.map((v,i)=>q[i]*Math.exp(v)),p=beta?z.map(v=>v/z.reduce((a,b)=>a+b,0)):r.map(v=>Number(v===Math.max(...r))),reward=p.reduce((s,v,i)=>s+v*r[i],0),kl=p.reduce((s,v,i)=>s+(v?v*Math.log(v/q[i]):0),0);return {values:p,labels:['A','B'],summary:`p=${p.map(v=>v.toFixed(3))}; R=${reward.toFixed(3)}; KL=${kl.toFixed(3)}; U=${p[0].toFixed(3)}`,detail:[...p,reward,kl,reward-beta*kl,p[0]],links:[]};
}
