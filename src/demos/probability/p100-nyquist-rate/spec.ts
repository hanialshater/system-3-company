import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-nyquist-rate",family:"aliasing",
 predict:{question:"Sample sin(2\u03c0ft) at integer seconds. Frequencies 0.2 Hz and 1.2 Hz produce what relationship between sampled values?",options:["Identical samples", "Opposite samples", "Unrelated samples"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
