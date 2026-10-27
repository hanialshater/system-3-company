import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-sprt",family:"sprt",
 predict:{question:"Compare coin hypotheses p(H)=0.5 and 0.75. Start log-likelihood ratio at zero. Six heads add 6\u00d7log(1.5). With upper boundary log(9), what happens?",options:["Below boundary", "Exactly boundary", "Above boundary"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
