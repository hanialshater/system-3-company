export function term(r:number,a:number){const clipped=Math.max(.8,Math.min(1.2,r)),raw=r*a,bounded=clipped*a;return {a,raw,bounded,value:Math.min(raw,bounded)};}
export function run(mode:number){const ratio=mode===1?.6:1.4;return {ratio,pnew:.5*ratio,rows:[term(ratio,mode===2?0:2),term(ratio,mode===2?0:-2)]};}
