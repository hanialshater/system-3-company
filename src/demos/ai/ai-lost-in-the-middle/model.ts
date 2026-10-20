export const positions=[0,2,4];
export function documents(position:number){const a=Array.from({length:5},(_,i)=>({key:i+10,value:i}));a[position]={key:7,value:42};return a;}
export function scan(position:number,full:boolean){const docs=documents(position),visited=full?[0,1,2,3,4]:[0,4];return {position,docs,visited,output:visited.map(i=>docs[i]).find(d=>d.key===7)?.value??null};}
export function run(mode:number){return positions.map(p=>scan(p,mode===1));}
