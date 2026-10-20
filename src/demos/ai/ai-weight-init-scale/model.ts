export function propagate(width:number,squaredScale:number,layers:number){const multiplier=width*squaredScale,variances=Array.from({length:layers+1},(_,i)=>multiplier**i);return {width,squaredScale,layers,multiplier,variances,final:variances[layers]};}
export function run(mode:number){return propagate(2,mode===1?.125:mode===2?2:.5,3);}
