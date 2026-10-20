export type Result={values:number[];labels:string[];summary:string;detail:number[];links:number[][];trace?:string[]};
export function compute(m:number):Result {
const progressBefore=(0-1)**2,progressAfter=0,tv=m===2?0:.5*(0-.5)**2+.5*(1-.5)**2,combined=m===1,scores=combined?[1+.1*progressAfter,.1*tv]:[progressAfter,tv],chosen=scores[0]>scores[1]?'Progress':scores[0]<scores[1]?'TV':'Tie';return {values:[progressBefore,progressAfter,tv],labels:['before','learned','TV expected'],summary:`scores ${scores}; choose ${chosen}`,detail:[progressBefore,progressAfter,tv,...scores],links:[[0,1]]};
}
