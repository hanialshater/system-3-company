export function plan(gamma:number,modelB:number){const immediate=[1,0],continuation=[2,modelB],imagined=immediate.map((x,i)=>x+gamma*continuation[i]);const chosen=imagined[0]>=imagined[1]?0:1;return {gamma,immediate,continuation,imagined,chosen,actual:[1+gamma*2,gamma*4]};}
export function run(mode:number){return plan(mode===2?.5:1,mode===1?0:4);}
