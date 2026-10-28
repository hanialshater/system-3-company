import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0480", "title": "Score a candidate graph", "op": "bic", "labels": ["LogLikelihood", "Parameters", "N"], "outputs": ["BIC"], "a": [-100.0, 3.0, 1000.0], "b": [-90.0, 5.0, 1000.0], "question": "A toy candidate model has log likelihood -100, 3 parameters and N 1000. What BIC score results?", "questionTemplate": "A toy candidate model has log likelihood {LogLikelihood}, {Parameters} parameters and N {N}. What BIC score results?", "explain": "The score penalizes additional parameters while rewarding likelihood fit. A better score is not by itself proof of a graph’s causal direction.", "lens": "likelihood gain versus a parameter-count penalty", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
