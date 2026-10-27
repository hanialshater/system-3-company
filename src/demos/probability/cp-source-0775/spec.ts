import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0775", "title": "A candidate network pays for size", "op": "bic", "labels": ["LogLikelihood", "Parameters", "N"], "outputs": ["BIC"], "a": [-100.0, 3.0, 100.0], "b": [-95.0, 8.0, 100.0], "question": "A toy candidate model has log likelihood -100, 3 parameters and N 100. What BIC score results?", "questionTemplate": "A toy candidate model has log likelihood {LogLikelihood}, {Parameters} parameters and N {N}. What BIC score results?", "explain": "The score penalizes additional parameters while rewarding likelihood fit. A better score is not by itself proof of a graph’s causal direction.", "lens": "the likelihood and complexity terms before causal identification", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
