import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0188", "title": "Temperature flattens the same logits", "op": "temperature", "labels": ["LogitA", "LogitB", "Temperature"], "outputs": ["ProbabilityA"], "a": [4.0, 1.0, 0.5], "b": [4.0, 1.0, 3.0], "question": "Two toy logits are 4 and 1, divided by positive Temperature 0.5 before softmax. What probability is assigned to A?", "questionTemplate": "Two toy logits are {LogitA} and {LogitB}, divided by positive Temperature {Temperature} before softmax. What probability is assigned to A?", "explain": "Temperature changes sampling concentration while preserving logit order. It does not supply evidence that the scores are calibrated.", "lens": "the sampling concentration with fixed model scores", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
