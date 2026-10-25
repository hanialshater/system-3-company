import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0704", "title": "A risky continuation changes a backup", "op": "qupdate", "labels": ["Q", "Alpha", "Reward", "Gamma", "Next"], "outputs": ["Q", "Target"], "a": [0.0, 0.2, -1.0, 0.9, 10.0], "b": [0.0, 0.2, -1.0, 0.9, 2.0], "question": "Toy Q 0 moves by Alpha 0.2 toward Reward -1+Gamma 0.9×Next 10. What updated Q results?", "questionTemplate": "Toy Q {Q} moves by Alpha {Alpha} toward Reward {Reward}+Gamma {Gamma}×Next {Next}. What updated Q results?", "explain": "The sampled target changes a value estimate. Which continuation is supplied distinguishes different learning updates.", "lens": "the chosen next-action value in a cliff illustration", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
