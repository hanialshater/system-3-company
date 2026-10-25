import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0686", "title": "Exploration has a reward cost", "op": "regret", "labels": ["Best", "Chosen", "Pulls"], "outputs": ["Regret"], "a": [0.6, 0.4, 50.0], "b": [0.6, 0.4, 10.0], "question": "The best toy arm pays mean 0.6; a chosen arm pays 0.4 for 50 pulls. What expected cumulative regret results?", "questionTemplate": "The best toy arm pays mean {Best}; a chosen arm pays {Chosen} for {Pulls} pulls. What expected cumulative regret results?", "explain": "Regret compares expected rewards with an oracle benchmark. Realized rewards can fluctuate around this expected cost.", "lens": "the inferior-arm allocation in a fixed comparison", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
