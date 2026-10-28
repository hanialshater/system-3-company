import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-conformal-intervals",family:"conformal",
 predict:{question:"Calibration absolute residuals are 1,2,2,3,3,4,4,5,6. For a 90% target, use rank ceil((n+1)\u00d70.9). What interval radius is selected?",options:["4", "5", "6"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
