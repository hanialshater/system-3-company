import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0713", "title": "A rare goal may stay unseen", "op": "anyevent", "labels": ["P", "Trials"], "outputs": ["AtLeastOne"], "a": [0.001, 100.0], "b": [0.001, 1000.0], "question": "An event independently occurs with probability 0.001 on each of 100 trials. What is the probability of at least one occurrence?", "questionTemplate": "An event independently occurs with probability {P} on each of {Trials} trials. What is the probability of at least one occurrence?", "explain": "The complement is no occurrence on every trial. Independence is required for the product used here.", "lens": "the independent chance of encountering a sparse reward", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
