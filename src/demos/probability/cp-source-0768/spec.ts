import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0768", "title": "Constraints reduce possible grids", "op": "capacity", "labels": ["Outcomes", "Questions"], "outputs": ["Capacity"], "a": [4.0, 4.0], "b": [3.0, 4.0], "question": "With 4 possible answers per question and 4 questions, what is the maximum number of distinct answer sequences?", "questionTemplate": "With {Outcomes} possible answers per question and {Questions} questions, what is the maximum number of distinct answer sequences?", "explain": "Balanced questions can use the available answer sequences efficiently. Counting sequences is a capacity bound, not a guarantee that a particular puzzle achieves it.", "lens": "the choice-count ingredient before Sudoku constraint propagation", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
