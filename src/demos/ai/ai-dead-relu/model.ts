export function gate(w:number,b:number,x:number,target:number){const rate=.1,z=w*x+b,a=Math.max(0,z),derivative=z>0?1:0,loss=.5*(a-target)**2,grad=(a-target)*derivative*x;return {w,b,x,target,rate,z,a,derivative,loss,grad,next:w-rate*grad};}
export function run(mode:number){return mode===1?gate(1,0,1,2):gate(1,-2,mode===2?3:1,1);}
