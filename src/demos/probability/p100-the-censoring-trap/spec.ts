import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-the-censoring-trap",family:"censoring",
 predict:{question:"Four customers have events at times 2 and 4, and censoring at 3 and 5. What is Kaplan\u2013Meier survival just after time 4?",options:["0", "0.375", "0.5"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
