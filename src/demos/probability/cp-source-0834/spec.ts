import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0834", "title": "A balanced grid has many assignments", "op": "capacity", "labels": ["Outcomes", "Questions"], "outputs": ["Capacity"], "a": [3.0, 3.0], "b": [4.0, 4.0], "question": "With 3 possible answers per question and 3 questions, what is the maximum number of distinct answer sequences?", "questionTemplate": "With {Outcomes} possible answers per question and {Questions} questions, what is the maximum number of distinct answer sequences?", "explain": "Balanced questions can use the available answer sequences efficiently. Counting sequences is a capacity bound, not a guarantee that a particular puzzle achieves it.", "lens": "the combinatorial assignment count before Latin-square restrictions", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
