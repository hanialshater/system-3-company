import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0735", "title": "Count survival time up to a cutoff", "op": "rmst", "labels": ["Rate", "Horizon"], "outputs": ["RMST"], "a": [0.1, 5.0], "b": [0.1, 10.0], "question": "A toy exponential lifetime has Rate 0.1. What is expected survival time restricted to Horizon 5?", "questionTemplate": "A toy exponential lifetime has Rate {Rate}. What is expected survival time restricted to Horizon {Horizon}?", "explain": "Restricted mean survival integrates survival only up to the chosen horizon. It has units of time and depends on that horizon.", "lens": "the restricted horizon in mean survival time", "kind": "curve", "answerPosition": 0, "plot": [1, 0, 10]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
