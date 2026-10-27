// Explicit finite illustration; not a simulated empirical response.
export function compute(p:number[]):number[] {
 if(p.length!==5 || p.some(v=>!Number.isFinite(v))) throw Error('Invalid numerical inputs');
 if(p[0]<=0||p[1]<=0||p[3]<0||p[4]<0)throw Error('Outside model domain');
 const result:number[]=[(()=>{if(p[4]===0)return Math.max(p[0]-p[1],0);if(p[3]===0)return Math.max(p[0]-p[1]*Math.exp(-p[2]*p[4]),0);const cdf=(z:number)=>{if(z<=-10)return 0;if(z>=10)return 1;const n=2048,h=z/n;let s=1+Math.exp(-z*z/2);for(let i=1;i<n;i++)s+=(i%2?4:2)*Math.exp(-Math.pow(i*h,2)/2);return .5+h*s/(3*Math.sqrt(2*Math.PI));},d=(Math.log(p[0]/p[1])+(p[2]+p[3]*p[3]/2)*p[4])/(p[3]*Math.sqrt(p[4]));return p[0]*cdf(d)-p[1]*Math.exp(-p[2]*p[4])*cdf(d-p[3]*Math.sqrt(p[4]));})()];
 if(result.some(v=>!Number.isFinite(v)||Math.abs(v)>1e15)) throw Error('Invalid result');
 return result;
}
