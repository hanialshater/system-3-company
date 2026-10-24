import type { MiniLabFrame, MiniLabSpec, MiniLabVisual } from "@/lib/mini-lab/types";
import { compute } from "./model";
const inputLabels = ["Starting value €", "Return %", "Account checks"];
const outputLabels = ["Ending value €", "Checks", "Return %"];
const fmt = (n:number) => Number(n.toFixed(3)).toLocaleString("en-US",{maximumFractionDigits:3});
const inputs: number[][] = [[100, -10, 0], [100, 10, 1]];
export const results = inputs.map(compute);
function scenario(input:number[],index:number) {
 const values=results[index];
 const visual:MiniLabVisual = {kind:"timeline",events:[{label:"Start €",value:input[0]},{label:"End €",value:values[0]}]};
 const summary=`${index===0?"A":"B"}: Ending value € ${fmt(values[0])}`;
 const frames:MiniLabFrame[]=[
  {caption:"Toy inputs",visual:input.length>5?{kind:"grid",cells:input.map((value,i)=>({label:inputLabels[i],value}))}:{kind:"table",columns:["Input","Value"],rows:input.map((value,i)=>[inputLabels[i],value])}},
  {caption:"Computed result",visual,metrics:[{label:outputLabels[0],value:fmt(values[0])}]}];
 return {id:index===0?"question":"contrast",label:index===0?"Question case":"Changed case",frames,summary};
}
const scenarios=inputs.map(scenario);
export const spec:MiniLabSpec={
 id:"be-open-the-account-after-a-loss",family:"timeline",setup:"Toy model: two controlled cases",hint:"Run the question case, then compare the changed case.",
 predict:{question:"A toy account starts at €100 and loses 10%. If the owner does not open the account and makes no trades, what is its value?",options:["€90", "€100", "€110"],answer:0},
 scenarios,
 reveal:[`You saw ${scenarios[0].summary}; ${scenarios[1].summary}.`,"Checking behavior and portfolio performance are separate variables. In this no-trading model, failing to look does not undo the return. The observed tendency to avoid bad news would require behavioral evidence beyond the balance calculation."]
};
