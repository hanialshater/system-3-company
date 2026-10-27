import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0795", "title": "Sharpen or flatten a text choice", "op": "temperature", "labels": ["LogitA", "LogitB", "Temperature"], "outputs": ["ProbabilityA"], "a": [2.0, 0.0, 0.2], "b": [2.0, 0.0, 2.0], "question": "Two toy logits are 2 and 0, divided by positive Temperature 0.2 before softmax. What probability is assigned to A?", "questionTemplate": "Two toy logits are {LogitA} and {LogitB}, divided by positive Temperature {Temperature} before softmax. What probability is assigned to A?", "explain": "Temperature changes sampling concentration while preserving logit order. It does not supply evidence that the scores are calibrated.", "lens": "a local distribution before beam or sampling sequence decisions", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
