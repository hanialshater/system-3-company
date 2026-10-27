import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-guidance-scale",family:"guidance",
 predict:{question:"Toy output probabilities are 0.4,0.3,0.2,0.1. Sharpen by squaring and renormalizing. What is the first output\u2019s new probability?",options:["0.4", "0.5", "0.533"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
