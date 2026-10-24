import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-random-terrain",family:"random-field",
 predict:{question:"An RBF field has correlation exp(\u2212d\u00b2/(2\u2113\u00b2)). At distance 1, changing \u2113 from 0.2 to 3 changes correlation in which direction?",options:["Decreases", "Unchanged", "Increases"],answer:2},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
