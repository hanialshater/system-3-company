import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-series-vs-parallel",family:"reliability",
 predict:{question:"Two independent components work with probabilities 0.9 and 0.8. A parallel system works if either works. What is system reliability?",options:["0.72", "0.9", "0.98"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
