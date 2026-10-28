import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0176", "title": "A live game with shots remaining", "op": "binomtail", "labels": ["N", "P", "Cut"], "outputs": ["Tail"], "a": [5.0, 0.6, 2.0], "b": [5.0, 0.6, 3.0], "question": "For 5 independent toy births with boy probability 0.6, what is the probability of strictly more than 2 boys?", "questionTemplate": "For {N} independent toy births with boy probability {P}, what is the probability of strictly more than {Cut} boys?", "explain": "The binomial calculation counts every qualifying outcome. Smaller samples have more variable proportions; equal expected proportions do not mean equal tail probabilities.", "lens": "the successes still needed in a finite horizon", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
