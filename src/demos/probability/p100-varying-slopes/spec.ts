import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-varying-slopes",family:"varying-slopes",
 predict:{question:"Two city slopes are \u22124 and \u22121, from 2 and 20 observations. A shared slope prior is \u22122 with strength 4. What is the small city\u2019s partial slope?",options:["\u22124", "\u22122.667", "\u22121.167"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
