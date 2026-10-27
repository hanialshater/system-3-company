import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0802", "title": "Temperature softens confidence", "op": "temperature", "labels": ["LogitA", "LogitB", "Temperature"], "outputs": ["ProbabilityA"], "a": [3.0, 0.0, 1.0], "b": [3.0, 0.0, 3.0], "question": "Two toy logits are 3 and 0, divided by positive Temperature 1 before softmax. What probability is assigned to A?", "questionTemplate": "Two toy logits are {LogitA} and {LogitB}, divided by positive Temperature {Temperature} before softmax. What probability is assigned to A?", "explain": "Temperature changes sampling concentration while preserving logit order. It does not supply evidence that the scores are calibrated.", "lens": "the probability transformation before calibration evaluation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
