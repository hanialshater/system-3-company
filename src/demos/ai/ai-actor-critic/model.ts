export function update(reward:number){const oldV=1,oldTheta=0,oldP=1/(1+Math.exp(-oldTheta)),delta=reward-oldV;const value=oldV+.5*delta,theta=oldTheta+.2*delta*(1-oldP);return {reward,oldV,oldTheta,oldP,delta,value,theta,p:1/(1+Math.exp(-theta))};}
export function run(mode:number){return update(mode===1?0:2);}
