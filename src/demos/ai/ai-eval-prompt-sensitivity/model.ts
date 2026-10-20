export const tasks=[[1,2],[2,3],[3,4],[4,5]];
export function parser(input:string,normalize=false){const text=normalize?input.replace(/^Question: /,'Q:'):input;const match=/^Q:(\d+)\+(\d+)$/.exec(text);return match?Number(match[1])+Number(match[2]):0;}
export function run(mode:number){return [false,true].map(long=>{const rows=tasks.map(([a,b])=>{const input=long?`Question: ${a}+${b}`:`Q:${a}+${b}`,output=parser(input,mode===1);return {input,output,target:a+b};});return {rows,score:rows.filter(r=>r.output===r.target).length};});}
