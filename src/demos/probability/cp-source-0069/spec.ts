import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0069", "title": "Twenty tries is not a guarantee", "op": "anyevent", "labels": ["P", "Trials"], "outputs": ["AtLeastOne"], "a": [0.05, 20.0], "b": [0.05, 60.0], "question": "An event independently occurs with probability 0.05 on each of 20 trials. What is the probability of at least one occurrence?", "questionTemplate": "An event independently occurs with probability {P} on each of {Trials} trials. What is the probability of at least one occurrence?", "explain": "The complement is no occurrence on every trial. Independence is required for the product used here.", "lens": "finite attempts for a geometric waiting process", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
