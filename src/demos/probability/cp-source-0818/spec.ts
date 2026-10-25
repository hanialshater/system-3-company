import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0818", "title": "Push aggregate odds toward extremes", "op": "extremize", "labels": ["P", "Strength"], "outputs": ["Probability"], "a": [0.7, 1.0], "b": [0.7, 2.0], "question": "Multiply toy log odds of P 0.7 by Strength 1. What transformed probability results?", "questionTemplate": "Multiply toy log odds of P {P} by Strength {Strength}. What transformed probability results?", "explain": "Strength above one pushes probabilities toward extremes. Whether this improves accuracy requires held-out forecast evidence.", "lens": "the log-odds scaling of a forecast aggregate", "kind": "curve", "answerPosition": 2, "plot": [0, 0.01, 0.99]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
