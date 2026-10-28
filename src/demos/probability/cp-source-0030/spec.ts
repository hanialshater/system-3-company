import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0030", "title": "A biased die produces a count", "op": "binomial", "labels": ["N", "P", "K"], "outputs": ["Probability"], "a": [100.0, 0.2, 20.0], "b": [100.0, 0.16666666666666666, 20.0], "question": "In 100 independent Bernoulli trials with success probability 0.2, what is the probability of exactly 20 successes?", "questionTemplate": "In {N} independent Bernoulli trials with success probability {P}, what is the probability of exactly {K} successes?", "explain": "The binomial coefficient counts placements of the successes. A single ordered sequence is only one of those placements.", "lens": "the likelihood of one specified count", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
