export type V=[number,number];export type Matrix=[V,V];
export const candidates=[{id:"A",v:[2,2] as V},{id:"B",v:[-2,-2] as V},{id:"C",v:[2,-2] as V},{id:"D",v:[-2,2] as V}];
export function adapt(contrast=false){const scored=candidates.map(c=>({...c,loss:contrast?(c.v[0]+c.v[1])**2+.1*(c.v[0]-c.v[1])**2:(c.v[0]-c.v[1])**2+.1*(c.v[0]+c.v[1])**2})).sort((a,b)=>a.loss-b.loss||a.id.localeCompare(b.id));const winners=scored.slice(0,2),mean:V=[0,1].map(j=>winners.reduce((s,c)=>s+.5*c.v[j],0)) as V;
 const moment:Matrix=[[0,0],[0,0]];for(let i=0;i<2;i++)for(let j=0;j<2;j++)moment[i][j]=winners.reduce((s,c)=>s+.5*c.v[i]*c.v[j],0);
 const covariance:Matrix=moment.map((row,i)=>row.map((v,j)=>.5*(i===j?1:0)+.5*v)) as Matrix;
 const a=Math.sqrt(covariance[0][0]),b=covariance[1][0]/a,c=Math.sqrt(covariance[1][1]-b*b),L:Matrix=[[a,0],[b,c]];
 const z:V[]=[[1,0],[-1,0],[0,1],[0,-1]],next=z.map(([x,y])=>[mean[0]+a*x,mean[1]+b*x+c*y] as V);
 const eigenvalues=[covariance[0][0]+Math.abs(covariance[0][1]),covariance[0][0]-Math.abs(covariance[0][1])],angle=covariance[0][1]>=0?45:-45;
 return {scored,winners,mean,moment,covariance,L,next,eigenvalues,spreads:eigenvalues.map(Math.sqrt),angle};}
