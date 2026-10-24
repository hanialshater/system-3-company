import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-carryover-in-switchbacks",family:"carryover",
 predict:{question:"A toy treatment adds 10 while active and leaves a one-period carryover of 5. Alternating new/old yields lifts 10,5,10,5. What is the observed new-minus-old contrast?",options:["0", "5", "10"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
