import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0061", "title": "The peg board counts right turns", "op": "binomial", "labels": ["N", "P", "K"], "outputs": ["Probability"], "a": [10.0, 0.5, 5.0], "b": [10.0, 0.5, 0.0], "question": "In 10 independent Bernoulli trials with success probability 0.5, what is the probability of exactly 5 successes?", "questionTemplate": "In {N} independent Bernoulli trials with success probability {P}, what is the probability of exactly {K} successes?", "explain": "The binomial coefficient counts placements of the successes. A single ordered sequence is only one of those placements.", "lens": "binomial paths through independent pegs", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
