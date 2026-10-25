import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0717", "title": "Correct an off-policy sample", "op": "offpolicy", "labels": ["Target", "Behavior", "Reward"], "outputs": ["Weighted"], "a": [0.8, 0.4, 2.0], "b": [0.4, 0.8, 2.0], "question": "A toy action has Target probability 0.8, Behavior probability 0.4, observed Reward 2. What importance-weighted reward results?", "questionTemplate": "A toy action has Target probability {Target}, Behavior probability {Behavior}, observed Reward {Reward}. What importance-weighted reward results?", "explain": "The probability ratio reweights a sample toward the target policy. Valid policy evaluation also requires support and correctly recorded behavior probabilities.", "lens": "the target-to-behavior probability ratio on one reward", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
