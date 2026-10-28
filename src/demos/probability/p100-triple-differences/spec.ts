import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-triple-differences",family:"ddd",
 predict:{question:"Eligible outcomes rise 10\u219218 in the treated state and 10\u219214 in control; ineligible outcomes rise 10\u219213 and 10\u219212. What is the triple difference?",options:["1", "3", "4"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
