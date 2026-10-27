import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0165", "title": "Enough successful transfer stages", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [5.0, 0.8, 3.0], "b": [5.0, 0.95, 3.0], "question": "For 5 independent toy births with boy probability 0.8, what is the probability of strictly more than 3 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "the probability of a specified minimum number of successes", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
