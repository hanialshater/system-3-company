// Declared finite construction. Pure local arithmetic; no fitted service or dataset.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const sqdist=(a:number[],b:number[])=>sum(a.map((x,i)=>(x-b[i])**2));
export const normalise=(a:number[])=>a.map(x=>x/sum(a));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){const history=[10,11,12,13],persistence=history[history.length-1],trend=persistence+history[history.length-1]-history[history.length-2],actual=[14,12,13][mode],errors=[Math.abs(persistence-actual),Math.abs(trend-actual)];return{history,persistence,trend,actual,errors,snapshot:`next${actual}: errors${errors.join('/')}`};}
