import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-length-scale",family:"gp-length",
 predict:{question:"An RBF kernel is exp(\u2212d\u00b2/(2\u2113\u00b2)). At distance 1 and length scale \u2113=0.5, what is the correlation?",options:["0.135", "0.607", "0.882"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
