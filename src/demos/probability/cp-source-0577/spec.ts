import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0577", "title": "A toy pair of paths can meet", "op": "anyevent", "labels": ["P", "Trials"], "outputs": ["AtLeastOne"], "a": [0.1, 10.0], "b": [0.1, 30.0], "question": "An event independently occurs with probability 0.1 on each of 10 trials. What is the probability of at least one occurrence?", "questionTemplate": "An event independently occurs with probability {P} on each of {Trials} trials. What is the probability of at least one occurrence?", "explain": "The complement is no occurrence on every trial. Independence is required for the product used here.", "lens": "the independent meeting-chance analogy to card-path coalescence", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
