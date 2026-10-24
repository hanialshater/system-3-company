import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-markov-blanket",family:"markov-blanket",
 predict:{question:"In A\u2192B\u2192C, B flips A with probability 0.1 and C flips B independently with 0.1. Given B=1, does additionally knowing A change P(C=1)?",options:["Yes, to 0.82", "No, it stays 0.9", "Yes, to 1"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
