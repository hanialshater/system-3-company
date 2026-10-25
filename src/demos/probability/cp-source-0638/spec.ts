import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0638", "title": "Ability minus difficulty sets the odds", "op": "rasch", "labels": ["Ability", "Difficulty"], "outputs": ["Probability"], "a": [2.0, 1.0], "b": [2.0, 3.0], "question": "A toy Rasch model uses logit probability Ability 2 minus Difficulty 1. What is the success probability?", "questionTemplate": "A toy Rasch model uses logit probability Ability {Ability} minus Difficulty {Difficulty}. What is the success probability?", "explain": "Ability and difficulty enter through their difference. Locating both scales from data requires identification constraints and an appropriate response model.", "lens": "the one-parameter logistic item-response rule", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
