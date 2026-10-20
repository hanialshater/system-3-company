export function sigmoid(z:number){return 1/(1+Math.exp(-z));}
export function run(mode:number){const threshold=[.5,.9,.1][mode];return {threshold,rows:[-1,0,1].map(x=>({x,z:2*x,p:sigmoid(2*x),positive:sigmoid(2*x)>=threshold}))};}
