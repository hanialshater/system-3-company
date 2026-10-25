import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0200", "title": "Change the cost of a missed case", "op": "errorcost", "labels": ["FP", "FN", "CostFP", "CostFN"], "outputs": ["Cost"], "a": [20.0, 10.0, 1.0, 10.0], "b": [20.0, 10.0, 10.0, 1.0], "question": "A toy decision rule makes 20 false positives and 10 false negatives, costing 1 and 10 each. What is its total error cost?", "questionTemplate": "A toy decision rule makes {FP} false positives and {FN} false negatives, costing {CostFP} and {CostFN} each. What is its total error cost?", "explain": "Changing error costs can change the preferred rule even on identical outcomes. The costs are explicit decision assumptions.", "lens": "the explicit costs assigned to two error types", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
