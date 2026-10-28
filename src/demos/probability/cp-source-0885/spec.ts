import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0885", "title": "A weighted control also has a trend", "op": "did", "labels": ["TBefore", "TAfter", "CBefore", "CAfter"], "outputs": ["Estimate"], "a": [10.0, 15.0, 8.0, 10.0], "b": [10.0, 15.0, 8.0, 13.0], "question": "Toy treated outcomes move 10→15; controls move 8→10. What difference-in-differences results?", "questionTemplate": "Toy treated outcomes move {TBefore}→{TAfter}; controls move {CBefore}→{CAfter}. What difference-in-differences results?", "explain": "The arithmetic removes the control change. Interpreting it causally requires parallel untreated trends and other design assumptions.", "lens": "the control trend after unit and time weighting", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
