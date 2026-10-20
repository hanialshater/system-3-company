export function backup(r:number,gamma:number,p:number,va:number,vb:number,terminal=false){const parts=terminal?[0,0]:[gamma*p*va,gamma*(1-p)*vb];return {parts,total:r+parts[0]+parts[1]};}
export function run(mode:number){const p=mode===1?.25:.75,vb=mode===2?8:mode===3?99:0,terminal=mode===3;return {p,va:4,vb,terminal,...backup(1,.5,p,4,vb,terminal)};}
