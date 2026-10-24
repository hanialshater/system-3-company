import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-time-frequency-trade-off",family:"time-frequency",
 predict:{question:"A Gaussian pulse has \u03c3t=0.5. With frequency in cycles/time, \u03c3f=1/(2\u03c0\u03c3t). What is \u03c3f?",options:["0.159", "0.318", "0.637"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
