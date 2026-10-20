export function path(p:number,h:number,shared=false){return {p,h,shared,success:shared?p:p**h,stops:Array.from({length:h},(_,i)=>shared?p:p**(i+1))};}
export function run(mode:number){return path(.9,3,mode===1);}
