import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0382", "title": "The control trend changes the estimate", "op": "did", "labels": ["TBefore", "TAfter", "CBefore", "CAfter"], "outputs": ["Estimate"], "a": [10.0, 15.0, 10.0, 12.0], "b": [10.0, 15.0, 10.0, 16.0], "question": "Toy treated outcomes move 10→15; controls move 10→12. What difference-in-differences results?", "questionTemplate": "Toy treated outcomes move {TBefore}→{TAfter}; controls move {CBefore}→{CAfter}. What difference-in-differences results?", "explain": "The arithmetic removes the control change. Interpreting it causally requires parallel untreated trends and other design assumptions.", "lens": "the untreated-trend assumption behind a difference-in-differences", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
