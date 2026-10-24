import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-two-right-answers",family:"mixture-density",
 predict:{question:"A toy robot can take only angles \u221260\u00b0 or +60\u00b0, equally likely. A squared-error point predictor returns their mean. What angle does it return?",options:["\u221260\u00b0", "0\u00b0", "+60\u00b0"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
