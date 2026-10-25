import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0743", "title": "From annual exceedance to many years", "op": "anyevent", "labels": ["P", "Trials"], "outputs": ["AtLeastOne"], "a": [0.01, 1.0], "b": [0.01, 100.0], "question": "An event independently occurs with probability 0.01 on each of 1 trials. What is the probability of at least one occurrence?", "questionTemplate": "An event independently occurs with probability {P} on each of {Trials} trials. What is the probability of at least one occurrence?", "explain": "The complement is no occurrence on every trial. Independence is required for the product used here.", "lens": "independent yearly exceedance aggregation", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
