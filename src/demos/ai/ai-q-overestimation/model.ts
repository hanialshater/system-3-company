export function enumeration(shared:boolean){const pairs=shared?[[-1,-1],[1,1]]:[[-1,-1],[-1,1],[1,-1],[1,1]],mass=1/pairs.length,maxima=pairs.map(p=>Math.max(...p)),means=[0,1].map(i=>pairs.reduce((a,p)=>a+p[i]*mass,0));return {pairs,mass,maxima,means,average:maxima.reduce((a,x)=>a+x*mass,0),maxMean:Math.max(...means)};}
export function run(mode:number){return enumeration(mode===1);}
