export function update(old:number,reward:number,next:number,terminal=false){const target=reward+(terminal?0:.5*next),delta=target-old;return {old,reward,next,terminal,target,delta,value:old+.5*delta};}
export function run(mode:number){return [()=>update(4,2,4),()=>update(4,4,4),()=>update(10,10,99,true),()=>update(4,0,99,true)][mode]();}
