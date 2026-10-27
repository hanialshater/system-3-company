import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Test B person 1", "Test B person 2", "Test B person 3"];
const outputLabels = ["Rank correlation", "Person 1 B", "Person 3 B"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[3, 2, 1], [1, 2, 3]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"scatter",points:input.map((y,x)=>({x:x+1,y})),xLabel:"Test A rank",yLabel:"Test B rank"};
 const summary=`${index===0?"A":"B"}: Rank correlation ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-one-person-six-risk-tests",family:"scatter",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"Toy test A ranks three people 1, 2, 3. Test B ranks them 3, 2, 1. What is the correlation?",options:["−1", "0", "+1"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"The same people can receive opposite rankings under these two toy measurements. Agreement across elicitation methods is an empirical question; a stable ordering cannot simply be assumed from using the same word, risk, in each task."]
};
