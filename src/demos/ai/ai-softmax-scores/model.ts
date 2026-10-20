export function softmax(z:number[]){const top=Math.max(...z),e=z.map(v=>Math.exp(v-top)),sum=e.reduce((a,b)=>a+b,0);return e.map(v=>v/sum);}
export function run(mode:number){const base=[0,Math.log(2),Math.log(4)],z=mode===1?base.map(v=>v+Math.log(3)):mode===2?base.map(v=>2*v):mode===3?[5,5,5]:base;return {z,weights:z.map(Math.exp),p:softmax(z)};}
