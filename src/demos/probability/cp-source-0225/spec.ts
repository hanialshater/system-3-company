import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0225", "title": "The count changes across repetitions", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [20.0, 0.5, 14.0], "b": [20.0, 0.5, 10.0], "question": "For 20 independent toy births with boy probability 0.5, what is the probability of strictly more than 14 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "the tail probability as realized data vary", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
