import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0816", "title": "Repeated answers can agree by chance", "op": "binomial", "labels": ["N", "P", "K"], "outputs": ["Probability"], "a": [5.0, 0.7, 5.0], "b": [5.0, 0.4, 5.0], "question": "In 5 independent Bernoulli trials with success probability 0.7, what is the probability of exactly 5 successes?", "questionTemplate": "In {N} independent Bernoulli trials with success probability {P}, what is the probability of exactly {K} successes?", "explain": "The binomial coefficient counts placements of the successes. A single ordered sequence is only one of those placements.", "lens": "the all-agree probability under independent identical answer draws", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
