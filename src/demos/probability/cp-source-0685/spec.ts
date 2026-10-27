import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0685", "title": "Count the cost of inferior pulls", "op": "regret", "labels": ["Best", "Chosen", "Pulls"], "outputs": ["Regret"], "a": [0.7, 0.5, 100.0], "b": [0.7, 0.5, 10.0], "question": "The best toy arm pays mean 0.7; a chosen arm pays 0.5 for 100 pulls. What expected cumulative regret results?", "questionTemplate": "The best toy arm pays mean {Best}; a chosen arm pays {Chosen} for {Pulls} pulls. What expected cumulative regret results?", "explain": "Regret compares expected rewards with an oracle benchmark. Realized rewards can fluctuate around this expected cost.", "lens": "the number of suboptimal pulls rather than a regret theorem", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
