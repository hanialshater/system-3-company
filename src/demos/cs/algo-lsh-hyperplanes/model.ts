export type V=[number,number];export const vectors=[{id:"a",v:[1,0] as V},{id:"b",v:[1,1] as V},{id:"c",v:[-1,1] as V}];
export function valid(v:V){if(!v.every(Number.isFinite)||Math.hypot(...v)===0)throw new Error("Finite nonzero vector required");}
export function bit(n:V,v:V){valid(n);valid(v);const dot=n[0]*v[0]+n[1]*v[1];return {dot,bit:Number(dot>=0)};}
export function angle(a:V,b:V){valid(a);valid(b);return Math.acos(Math.max(-1,Math.min(1,(a[0]*b[0]+a[1]*b[1])/(Math.hypot(...a)*Math.hypot(...b)))));}
// Analytic theorem value for rotationally symmetric Gaussian normals; not a sampled frequency.
export function collisionProbability(theta:number){if(!Number.isFinite(theta)||theta<0||theta>Math.PI)throw new Error("Angle outside[0,pi]");return 1-theta/Math.PI;}
export function hash(contrast=false){const n:V=contrast?[0,1]:[1,0];return {n,rows:vectors.map(v=>({...v,...bit(n,v.v)}))};}
