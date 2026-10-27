import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0903", "title": "Normalize an importance-weighted mean", "op": "selfnorm", "labels": ["W1", "R1", "W2", "R2"], "outputs": ["Estimate"], "a": [1.0, 1.0, 3.0, 0.0], "b": [10.0, 1.0, 30.0, 0.0], "question": "Two toy samples have weights/rewards W1/R1 1/1, W2/R2 3/0. What self-normalized weighted reward results?", "questionTemplate": "Two toy samples have weights/rewards W1/R1 {W1}/{R1}, W2/R2 {W2}/{R2}. What self-normalized weighted reward results?", "explain": "Normalizing makes a weighted average invariant to shared weight scaling. Finite-sample bias and support still need attention.", "lens": "the shared weight scale removed by normalization", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
