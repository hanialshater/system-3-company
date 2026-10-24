import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-clip-the-weights",family:"clipping",
 predict:{question:"The same ten rows have eight A rewards 1, two B rewards 3, and importance weights 0.25 and 4. Cap weights at 2. What is the clipped mean?",options:["0.8", "1.4", "2.6"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
