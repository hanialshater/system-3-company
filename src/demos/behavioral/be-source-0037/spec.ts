import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0037", "title": "Higher tips, fewer tippers?", "op": "tip", "labels": ["Bill", "Share", "TipRate"], "outputs": ["Average"], "a": [100.0, 0.9, 0.15], "b": [100.0, 0.6, 0.25], "question": "In a toy sample the bill is 100; fraction 0.9 tip at rate 0.15, the rest tip zero. What is the average tip?", "explain": "The conditional tip and the share who tip jointly determine the average. A higher selected rate need not lift the overall mean.", "lens": "the extensive and intensive margins of tipping", "kind": "bars", "answerPosition": 1, "questionTemplate": "In a toy sample the bill is {Bill}; fraction {Share} tip at rate {TipRate}, the rest tip zero. What is the average tip?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
