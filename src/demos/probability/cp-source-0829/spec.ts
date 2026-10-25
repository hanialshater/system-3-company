import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0829", "title": "A dose score changes response chance", "op": "logistic", "labels": ["Score"], "outputs": ["Probability"], "a": [-2.0], "b": [0.0], "question": "A toy logistic model has score -2. What probability is 1/(1+exp(-score))?", "questionTemplate": "A toy logistic model has score {Score}. What probability is 1/(1+exp(-score))?", "explain": "The link maps an unbounded score into a bounded model probability. Calibration still requires outcome evidence.", "lens": "the response probability before calculating design information", "kind": "curve", "answerPosition": 1, "plot": [0, -6, 6]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
