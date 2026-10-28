import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0808", "title": "A prediction set can contain more labels", "op": "capacity", "labels": ["Outcomes", "Questions"], "outputs": ["Capacity"], "a": [2.0, 1.0], "b": [3.0, 1.0], "question": "With 2 possible answers per question and 1 questions, what is the maximum number of distinct answer sequences?", "questionTemplate": "With {Outcomes} possible answers per question and {Questions} questions, what is the maximum number of distinct answer sequences?", "explain": "Balanced questions can use the available answer sequences efficiently. Counting sequences is a capacity bound, not a guarantee that a particular puzzle achieves it.", "lens": "the returned set size rather than conformal coverage certification", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
