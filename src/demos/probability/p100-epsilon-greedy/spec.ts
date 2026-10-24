import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-epsilon-greedy",family:"epsilon-greedy",
 predict:{question:"A learner mistakenly ranks arm A above B. True expected rewards are 0.4 and 0.7. Epsilon-greedy explores uniformly over two arms with \u03b5=0.2. What is its one-step expected reward?",options:["0.4", "0.43", "0.7"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
