import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0029", "title": "A six within six rolls", "op": "anyevent", "labels": ["P", "Trials"], "outputs": ["AtLeastOne"], "a": [0.16666666666666666, 6.0], "b": [0.16666666666666666, 12.0], "question": "An event independently occurs with probability 0.166667 on each of 6 trials. What is the probability of at least one occurrence?", "questionTemplate": "An event independently occurs with probability {P} on each of {Trials} trials. What is the probability of at least one occurrence?", "explain": "The complement is no occurrence on every trial. Independence is required for the product used here.", "lens": "finite-horizon success versus mean waiting time", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
