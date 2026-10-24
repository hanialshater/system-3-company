import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-pooled-testing",family:"pooled-testing",
 predict:{question:"A perfect-test toy pools five independent samples. Test the pool once, then all five individually if positive. Prevalence is 1%. Expected tests per person?",options:["0.20", "0.249", "1.00"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
