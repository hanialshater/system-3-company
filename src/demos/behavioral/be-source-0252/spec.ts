import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0252", "title": "Two maternity wards", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [15.0, 0.5, 9.0], "b": [45.0, 0.5, 27.0], "question": "For 15 independent toy births with boy probability 0.5, what is the probability of strictly more than 9 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "a strict sixty-percent tail in unequal samples", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
