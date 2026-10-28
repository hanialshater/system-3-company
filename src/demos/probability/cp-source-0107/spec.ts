import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0107", "title": "Heads favor a specified trick coin", "op": "likelihoodpower", "labels": ["Prior", "P1", "P0", "Heads"], "outputs": ["Posterior"], "a": [0.1, 0.9, 0.5, 5.0], "b": [0.1, 0.9, 0.5, 10.0], "question": "Toy hypothesis H1 has prior 0.1 and heads chance 0.9; H0 has heads chance 0.5. After 5 independent heads, what is P(H1)?", "questionTemplate": "Toy hypothesis H1 has prior {Prior} and heads chance {P1}; H0 has heads chance {P0}. After {Heads} independent heads, what is P(H1)?", "explain": "Evidence compares how both hypotheses predict the same data. A high likelihood under one hypothesis is insufficient without the alternative and prior.", "lens": "the likelihood ratio against a stated alternative", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
