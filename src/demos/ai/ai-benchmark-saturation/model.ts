import data from './fixture.json';export function wilson(k:number){const n=1000,z=1.95996398454,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [c-h,c+h];}
export function gain(k:number){return {before:k,after:k+10,errors:1000-k,remaining:990-k,removed:10/(1000-k),ci:wilson(k+10)};}
export function pair(i:number){const c=data.pairs[i].counts;return {counts:c,a:c[0]+c[1],b:c[0]+c[2],disagreements:c[1]+c[2]};}export function run(mode:number){return mode===0?[gain(900),gain(980)]:pair(mode-1);}
