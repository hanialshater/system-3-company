import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-power-of-two-choices",family:"load-balance",
 predict:{question:"Eight arrivals all choose server 0 first, paired in turn with servers 1,1,2,3,4,5,6,7. Starting empty, assign each to the shorter queue, choosing the second on a tie. What is the largest queue?",options:["1", "2", "8"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
