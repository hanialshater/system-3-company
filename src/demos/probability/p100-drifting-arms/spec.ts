import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-drifting-arms",family:"nonstationary-bandit",
 predict:{question:"A\u2019s period rates are 0.8,0.8,0.2; B\u2019s are 0.4,0.4,0.7. At period three, which arm does an all-history average favor?",options:["A", "B", "They tie"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
