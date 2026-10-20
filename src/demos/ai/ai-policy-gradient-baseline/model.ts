export function sample(action:number,b:number){const g=[3,5][action],advantage=g-b,gradient=[(action===0?.5:-.5)*advantage,(action===0?-.5:.5)*advantage],logits=gradient.map(v=>.5*v),pLeft=1/(1+Math.exp(logits[1]-logits[0]));return {g,b,advantage,gradient,logits,pLeft};}
export function expected(b:number|number[]){const rows=[0,1].map(a=>sample(a,Array.isArray(b)?b[a]:b).gradient[0]);return {rows,mean:.5*(rows[0]+rows[1])};}
export function run(mode:number){return {sample:sample(0,mode===0?0:4),raw:sample(0,0),base:sample(0,4),rawMean:expected(0),baseMean:expected(mode===3?[3,5]:4)};}
