export const tables=[[2,0],[10,9],[0,0]];
export function probability(table:number[],red=true){const p=table[0]===table[1]?.5:table[0]>table[1]?.8:.2;return red?p:1-p;}
export function compare(count=1,t=tables){const likelihoods=t.map(row=>Math.pow(probability(row),count)),total=likelihoods.reduce((a,b)=>a+b,0);return {likelihoods,posterior:likelihoods.map(p=>p/total),predictions:t.map(row=>probability(row))};}
