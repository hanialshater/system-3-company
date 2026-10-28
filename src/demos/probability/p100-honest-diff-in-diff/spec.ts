import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-honest-diff-in-diff",family:"did-sensitivity",
 predict:{question:"Observed DiD is 5. In a sensitivity model, the untreated differential trend could be anywhere from \u22123 to +3. What effect range is compatible?",options:["2\u20138", "3\u20137", "5\u20135"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
