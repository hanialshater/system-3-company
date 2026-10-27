import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0068", "title": "Ten shots from a seventy-percent shooter", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [10.0, 0.7, 5.0], "b": [10.0, 0.5, 5.0], "question": "For 10 independent toy births with boy probability 0.7, what is the probability of strictly more than 5 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "the complement of five-or-fewer successes", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
