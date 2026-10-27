import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0483", "title": "How strong is a stipulated sensitivity?", "op": "evalue", "labels": ["RR"], "outputs": ["EValue"], "a": [5.0], "b": [2.0], "question": "For a toy risk ratio RR 5 at least 1, evaluate the sensitivity function RR+sqrt(RR×(RR-1)). What value results?", "questionTemplate": "For a toy risk ratio RR {RR} at least 1, evaluate the sensitivity function RR+sqrt(RR×(RR-1)). What value results?", "explain": "This risk-ratio sensitivity summary concerns unmeasured confounding under its assumptions. It does not address all biases or certify causation.", "lens": "the specified risk-ratio sensitivity function", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
