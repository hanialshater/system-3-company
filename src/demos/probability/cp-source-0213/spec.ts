import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0213", "title": "Three noisy copies and a majority", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [3.0, 0.8, 1.0], "b": [3.0, 0.6, 1.0], "question": "For 3 independent toy births with boy probability 0.8, what is the probability of strictly more than 1 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "independent correctness in a toy repetition channel", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
