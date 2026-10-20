// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const M=[[0,-1,1],[1,0,-1],[-1,1,0]],names=['R','P','S'],cycle=[0];for(let i=0;i<3;i++){const op=cycle.at(-1)!,scores=M.map(r=>mode?sum(r)/3:r[op]),best=scores.reduce((a,v,j)=>v>scores[a]?j:a,0);cycle.push(best);}const uniform=M.map(r=>sum(r)/3);return{values:[...cycle,...uniform],rows:[`updates ${cycle.map(i=>names[i]).join('→')}`,`uniform payoff=${uniform.map(f).join('/')}`,`Paper vs Rock=${M[1][0]} · vs Scissors=${M[1][2]}`,`${mode?'population ties → stable Rock':'latest-opponent wins; policies cycle'}`],receipt:`${mode?'uniform':'latest'} ${cycle.map(i=>names[i]).join('→')}`};
}
