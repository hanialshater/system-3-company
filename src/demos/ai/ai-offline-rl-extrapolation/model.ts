export function fit(qb:number,restricted=false){const log=[{action:'A',reward:1}],q=[1,qb],covered=[true,false],chosen=restricted?0:q[0]>=q[1]?0:1;return {log,q,covered,chosen,restricted,truth:[1,-5],observedLoss:(q[0]-log[0].reward)**2};}
export function run(mode:number){return fit(mode===1?-99:99,mode===2);}
