import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-explaining-away",family:"explaining-away",
 predict:{question:"Rain and sprinkler are independent fair binary variables. Grass is wet if either occurs. Given wet grass, then learning the sprinkler ran, what is rain probability?",options:["1/3", "1/2", "2/3"],answer:1},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
