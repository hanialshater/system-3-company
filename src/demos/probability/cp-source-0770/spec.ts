import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0770", "title": "Repeated variables multiply states", "op": "capacity", "labels": ["Outcomes", "Questions"], "outputs": ["Capacity"], "a": [2.0, 3.0], "b": [2.0, 8.0], "question": "With 2 possible answers per question and 3 questions, what is the maximum number of distinct answer sequences?", "questionTemplate": "With {Outcomes} possible answers per question and {Questions} questions, what is the maximum number of distinct answer sequences?", "explain": "Balanced questions can use the available answer sequences efficiently. Counting sequences is a capacity bound, not a guarantee that a particular puzzle achieves it.", "lens": "the plate size in a finite state-count illustration", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
