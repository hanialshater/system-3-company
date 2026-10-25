import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0383", "title": "A toy neighboring-state comparison", "op": "did", "labels": ["TBefore", "TAfter", "CBefore", "CAfter"], "outputs": ["Estimate"], "a": [20.0, 22.0, 20.0, 20.0], "b": [20.0, 22.0, 20.0, 24.0], "question": "Toy treated outcomes move 20→22; controls move 20→20. What difference-in-differences results?", "questionTemplate": "Toy treated outcomes move {TBefore}→{TAfter}; controls move {CBefore}→{CAfter}. What difference-in-differences results?", "explain": "The arithmetic removes the control change. Interpreting it causally requires parallel untreated trends and other design assumptions.", "lens": "the control change in a two-period policy comparison", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
