import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0836", "title": "Count significant simulated replicates", "op": "binomial", "labels": ["N", "P", "K"], "outputs": ["Probability"], "a": [10.0, 0.8, 8.0], "b": [10.0, 0.5, 8.0], "question": "In 10 independent Bernoulli trials with success probability 0.8, what is the probability of exactly 8 successes?", "questionTemplate": "In {N} independent Bernoulli trials with success probability {P}, what is the probability of exactly {K} successes?", "explain": "The binomial coefficient counts placements of the successes. A single ordered sequence is only one of those placements.", "lens": "an illustrative rejection-count distribution under fixed power", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
