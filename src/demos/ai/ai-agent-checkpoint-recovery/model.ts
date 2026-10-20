// Bounded owner construction; no external model or shared runtime engine.
export const sum=(a:number[])=>a.reduce((s,x)=>s+x,0);
export const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export const f=(x:number)=>Number.isFinite(x)?String(Number(x.toFixed(3))):'∞';
export function compute(mode:number){
const p=.8;let success=0,expected=0;const correlated=mode===2,bitsN=correlated?4:8;for(let mask=0;mask<2**bitsN;mask++){const bits=Array.from({length:bitsN},(_,j)=>(mask>>j)&1),mass=bits.reduce((a,b)=>a*(b?p:1-p),1);let calls=0,done=true;if(mode===1){done=false;for(let run=0;run<2&&!done;run++){let ok=true;for(let step=0;step<4;step++){calls++;if(!bits[run*4+step]){ok=false;break;}}done=ok;}}else{for(let step=0;step<4;step++){calls++;const one=bits[correlated?step:2*step];if(one)continue;calls++;if(!(correlated?one:bits[2*step+1])){done=false;break;}}}if(done)success+=mass;expected+=calls*mass;}return{values:[success,expected],rows:[`steps1→2→3→4 · per-attempt p=.8`,`no-retry P(done)=${f(p**4)}`,`${['checkpoint','whole-task retry','correlated retries'][mode]}: P(done)=${f(success)}`,`E[calls]=${f(expected)}; max8; perfect detection`],receipt:`${['saved','whole','shared'][mode]} P=${f(success)}`};
}
