import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0564", "title": "A collection transition can be sharp", "op": "allcoupons", "labels": ["Types", "Draws"], "outputs": ["Complete"], "a": [20.0, 40.0], "b": [20.0, 100.0], "question": "A toy collector draws 40 independent uniform coupons among 20 types. What probability has it collected every type?", "questionTemplate": "A toy collector draws {Draws} independent uniform coupons among {Types} types. What probability has it collected every type?", "explain": "Inclusion-exclusion sums the missing-type events. A collection transition can illustrate concentration without proving cutoff for an arbitrary Markov chain.", "lens": "the coupon-completion analogy rather than a general cutoff theorem", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
