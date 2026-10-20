export type V = [number,number];
export type Ray = {origin:V; direction:V};
export const triangles:V[][] = [[[2,3],[2,4],[2.5,4]],[[3.5,2],[4,2],[4,2.5]]];
export const ray=(contrast=false):Ray=>({origin:contrast?[0,0]:[0,1],direction:contrast?[1,1]:[1,0]});
// Closed slab tests. No tolerance; these finite fixtures use exactly representable halves.
export function boxInterval(r:Ray,bounds=[2,4,2,4]):[number,number]|null {
 let lo=0,hi=Infinity;
 for(let i=0;i<2;i++) {const low=bounds[i*2],high=bounds[i*2+1],d=r.direction[i],o=r.origin[i];
 if(d===0){if(o<low||o>high)return null;continue;}
 const a=(low-o)/d,b=(high-o)/d;lo=Math.max(lo,Math.min(a,b));hi=Math.min(hi,Math.max(a,b));if(lo>hi)return null;}
 return [lo,hi];
}
const cross=(a:V,b:V)=>a[0]*b[1]-a[1]*b[0];
export function triangleHit(r:Ray,t:V[]):boolean {
 const area=cross([t[1][0]-t[0][0],t[1][1]-t[0][1]],[t[2][0]-t[0][0],t[2][1]-t[0][1]]);
 if(area===0)throw new Error("Nondegenerate triangles required");
 const sign=Math.sign(area);let lo=0,hi=Infinity;
 for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3],edge:V=[b[0]-a[0],b[1]-a[1]];
 const c=sign*cross(edge,[r.origin[0]-a[0],r.origin[1]-a[1]]),v=sign*cross(edge,r.direction);
 if(v===0){if(c<0)return false;}else if(v>0)lo=Math.max(lo,-c/v);else hi=Math.min(hi,-c/v);
 if(lo>hi)return false;}
 return true;
}
export function test(contrast=false){const r=ray(contrast),interval=boxInterval(r);return {interval,boxTests:1,triangleTests:interval?triangles.length:0,hits:interval?triangles.filter(t=>triangleHit(r,t)).length:0};}
