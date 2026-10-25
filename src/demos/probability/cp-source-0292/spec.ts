import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0292", "title": "Baseline adjustment changes the contrast", "op": "did", "labels": ["TBefore", "TAfter", "CBefore", "CAfter"], "outputs": ["Estimate"], "a": [50.0, 55.0, 40.0, 45.0], "b": [50.0, 55.0, 40.0, 50.0], "question": "Toy treated outcomes move 50→55; controls move 40→45. What difference-in-differences results?", "questionTemplate": "Toy treated outcomes move {TBefore}→{TAfter}; controls move {CBefore}→{CAfter}. What difference-in-differences results?", "explain": "The arithmetic removes the control change. Interpreting it causally requires parallel untreated trends and other design assumptions.", "lens": "the chosen pre-post comparison and identifying assumptions", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
