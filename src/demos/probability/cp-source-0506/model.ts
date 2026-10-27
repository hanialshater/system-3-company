// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==4 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<0||p[1]<=0||!Number.isInteger(p[2])||p[2]<1||p[0]>=p[1]*p[2]||p[3]<0)throw Error('Outside model domain');
 const result:number[]=[...(()=>{const a=p[0]/p[1],rho=a/p[2],factor=(k:number)=>Array.from({length:k},(_,i)=>i+1).reduce((x,y)=>x*y,1),term=Math.pow(a,p[2])/factor(p[2])/(1-rho),sum=Array.from({length:p[2]},(_,k)=>Math.pow(a,k)/factor(k)).reduce((x,y)=>x+y,0),c=term/(sum+term),w=c/(p[2]*p[1]-p[0]);return [w,w+1/p[1],1-c*Math.exp(-(p[2]*p[1]-p[0])*p[3]),rho];})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
