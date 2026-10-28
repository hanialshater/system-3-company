import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-reliability-diagram",family:"calibration",
 predict:{question:"Ten forecasts of 0.8 contain six positive outcomes. By how many percentage points does the forecast exceed the observed fraction?",options:["0", "10", "20"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
