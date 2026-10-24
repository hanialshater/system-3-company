import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-var-vs-expected-shortfall",family:"tail-risk",
 predict:{question:"Twenty equally likely losses are eighteen zeros, 10 and 100. Using the left 95% quantile, what is VaR?",options:["0", "10", "100"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
