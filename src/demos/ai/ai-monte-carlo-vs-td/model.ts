export function compare(next:number,r0=0,r1=4){const tdTarget=r0+.5*next,mcTarget=r0+.5*r1;return {tdTarget,td:.5*tdTarget,mcTarget,mc:.5*mcTarget};}
export function run(mode:number){return {finished:mode!==0,...compare(mode===2?4:10)};}
