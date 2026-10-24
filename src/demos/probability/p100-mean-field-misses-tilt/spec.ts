import type { MiniLabSpec } from "@/lib/mini-lab/types";
import { compute } from "./model";
const result=compute();
export const spec:MiniLabSpec={
 id:"p100-mean-field-misses-tilt",family:"mean-field",
 predict:{question:"A two-dimensional Gaussian has variances 1 and correlation 0.9. A diagonal reverse-KL Gaussian approximation has each variance 1\u2212\u03c1\u00b2. What is that variance?",options:["0.19", "0.9", "1"],answer:0},
 setup:"Toy model: compare two controlled cases.",hint:"Run the question case, compare the changed case, and inspect both retained results.",
 scenarios:result.scenarios,reveal:result.reveal
};
