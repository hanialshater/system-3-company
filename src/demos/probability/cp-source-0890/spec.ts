import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0890", "title": "Seasonality belongs in the baseline", "op": "did", "labels": ["TBefore", "TAfter", "CBefore", "CAfter"], "outputs": ["Estimate"], "a": [10.0, 20.0, 10.0, 18.0], "b": [10.0, 20.0, 10.0, 10.0], "question": "Toy treated outcomes move 10→20; controls move 10→18. What difference-in-differences results?", "questionTemplate": "Toy treated outcomes move {TBefore}→{TAfter}; controls move {CBefore}→{CAfter}. What difference-in-differences results?", "explain": "The arithmetic removes the control change. Interpreting it causally requires parallel untreated trends and other design assumptions.", "lens": "the common seasonal change removed by a control contrast", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
