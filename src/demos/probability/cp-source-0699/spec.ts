import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0699", "title": "A poor price has an experiment cost", "op": "regret", "labels": ["Best", "Chosen", "Pulls"], "outputs": ["Regret"], "a": [10.0, 7.0, 20.0], "b": [10.0, 7.0, 5.0], "question": "The best toy arm pays mean 10; a chosen arm pays 7 for 20 pulls. What expected cumulative regret results?", "questionTemplate": "The best toy arm pays mean {Best}; a chosen arm pays {Chosen} for {Pulls} pulls. What expected cumulative regret results?", "explain": "Regret compares expected rewards with an oracle benchmark. Realized rewards can fluctuate around this expected cost.", "lens": "the inferior-price exposure under assumed mean revenues", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
