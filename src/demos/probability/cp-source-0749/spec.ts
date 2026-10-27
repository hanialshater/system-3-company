import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0749", "title": "A common shock links crashes", "op": "shock", "labels": ["Shock", "IndependentP"], "outputs": ["Conditional", "Marginal", "Joint"], "a": [0.0, 0.01], "b": [0.05, 0.01], "question": "A toy common crash occurs with probability Shock 0; otherwise two crashes occur independently with IndependentP 0.01. Given one crash, what probability is the other?", "questionTemplate": "A toy common crash occurs with probability Shock {Shock}; otherwise two crashes occur independently with IndependentP {IndependentP}. Given one crash, what probability is the other?", "explain": "A common shock changes joint tail risk. This explicit mixture is not a Gaussian copula fit.", "lens": "the common-shock component of joint tail risk", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
