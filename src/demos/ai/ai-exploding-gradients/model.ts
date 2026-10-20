export function chain(factor:number,depth:number){const factors=Array.from({length:depth},()=>factor),trace=factors.map((_,i)=>factor**(i+1)),raw=factors.reduce((a,b)=>a*b,1),applied=Math.max(-5,Math.min(5,raw));return {factor,depth,factors,trace,raw,applied,rawUpdate:.1*raw,update:.1*applied};}
export function run(mode:number){return chain(mode===2?.5:2,mode===1?8:4);}
