import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0907", "title": "Reweight a click for exposure", "op": "offpolicy", "labels": ["Target", "Behavior", "Reward"], "outputs": ["Weighted"], "a": [1.0, 0.8, 1.0], "b": [1.0, 0.2, 1.0], "question": "A toy action has Target probability 1, Behavior probability 0.8, observed Reward 1. What importance-weighted reward results?", "questionTemplate": "A toy action has Target probability {Target}, Behavior probability {Behavior}, observed Reward {Reward}. What importance-weighted reward results?", "explain": "The probability ratio reweights a sample toward the target policy. Valid policy evaluation also requires support and correctly recorded behavior probabilities.", "lens": "the inverse exposure probability on one observed click", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
