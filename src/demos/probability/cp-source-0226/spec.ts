import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0226", "title": "Power for a stated rejection rule", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [20.0, 0.7, 14.0], "b": [100.0, 0.7, 59.0], "question": "For 20 independent toy births with boy probability 0.7, what is the probability of strictly more than 14 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "the detection probability under a specified alternative", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
