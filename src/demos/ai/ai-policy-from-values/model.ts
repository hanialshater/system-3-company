export function policy(q:number[],epsilon:number){const best=q.indexOf(Math.max(...q)),p=q.map((_,i)=>epsilon/q.length+(i===best?1-epsilon:0));return {q,p,expected:q.reduce((sum,v,i)=>sum+v*p[i],0)};}
export function run(mode:number){return policy(mode===3?[3,3]:[4,2],[0,.2,.6,.2][mode]);}
