import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0199", "title": "Precision and recall use different sets", "op": "confusion", "labels": ["TP", "FP", "FN", "TN"], "outputs": ["Precision", "Recall", "Accuracy"], "a": [80.0, 20.0, 20.0, 880.0], "b": [90.0, 90.0, 10.0, 810.0], "question": "A toy classifier records TP 80, FP 20, FN 20, TN 880. What is its precision?", "questionTemplate": "A toy classifier records TP {TP}, FP {FP}, FN {FN}, TN {TN}. What is its precision?", "explain": "Precision conditions on positive predictions; recall conditions on actual positives. Accuracy can hide poor performance on a rare class.", "lens": "the threshold's true-positive and false-positive tradeoff", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
