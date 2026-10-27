import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-compliers-and-defiers",family:"iv-strata",
 predict:{question:"A valid binary instrument raises treatment take-up from 0.2 to 0.6 and mean outcome by 2. Assuming exclusion and no defiers, what is the complier effect?",options:["0.8", "2", "5"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
