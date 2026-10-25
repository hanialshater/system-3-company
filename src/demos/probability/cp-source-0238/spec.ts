import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0238", "title": "The same z score at different scales", "op": "waldinterval", "labels": ["Estimate", "SE", "Z"], "outputs": ["Lower", "Upper"], "a": [0.1, 0.05, 1.96], "b": [10.0, 5.0, 1.96], "question": "A toy normal estimate is 0.1 with known SE 0.05. What is the lower endpoint of estimate ±1.96 SE?", "questionTemplate": "A toy normal estimate is {Estimate} with known SE {SE}. What is the lower endpoint of estimate ±{Z} SE?", "explain": "Effect magnitude and uncertainty both appear in the interval. A repeated-sampling interpretation depends on the stated estimator and model assumptions.", "lens": "the effect scale and interval width", "kind": "intervals", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
