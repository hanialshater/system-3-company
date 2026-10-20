export type Choice="Red"|"Blue";
export function infer(observations:Choice[],better=.8){const likelihoods=["Red","Blue"].map(goal=>observations.reduce((p,o)=>p*(o===goal?better:1-better),1));const evidence=likelihoods.reduce((a,b)=>a+b,0);if(evidence===0)throw new Error("Impossible observations under both hypotheses");return {likelihoods,posterior:likelihoods.map(l=>l/evidence)};}
export const observations:Choice[]=["Red","Red","Blue"];
