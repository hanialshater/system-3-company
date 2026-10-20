export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const p=m===2?.4:.7,ballots=Array.from({length:8},(_,i)=>[0,1,2].map(j=>(i>>j)&1)),masses=ballots.map(bs=>m===1?bs.every(Boolean)?p:bs.every(v=>!v)?1-p:0:bs.reduce((z,b)=>z*(b?p:1-p),1)),success=ballots.reduce((s,bs,i)=>s+(bs.reduce((a,b)=>a+b,0)>=2?masses[i]:0),0);return {values:masses,labels:ballots.map(bs=>bs.join('')),summary:`single=${p}; majority=${success.toFixed(3)}`,detail:[p,success,...masses],links:[]};
}
