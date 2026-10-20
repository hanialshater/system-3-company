export function solve(z:number,lambda:number){const w=Math.sign(z)*Math.max(Math.abs(z)-lambda,0),ridge=z/(1+lambda),objective=(x:number)=>.5*(x-z)**2+lambda*Math.abs(x);return {z,lambda,w,ridge,minimum:objective(w),points:Array.from({length:65},(_,i)=>{const x=-1+i/32;return {x,y:objective(x)}})};}
export function run(mode:number){return solve(mode===2?-.6:.6,mode===0?.8:.2);}
