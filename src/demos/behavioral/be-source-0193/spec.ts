import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0193", "title": "A mint and a bill", "op": "tip", "labels": ["Bill", "Share", "TipRate"], "outputs": ["Average"], "a": [50.0, 0.8, 0.15], "b": [50.0, 0.8, 0.2], "question": "In a toy sample the bill is 50; fraction 0.8 tip at rate 0.15, the rest tip zero. What is the average tip?", "explain": "The conditional tip and the share who tip jointly determine the average. A higher selected rate need not lift the overall mean.", "lens": "the tip rule in an illustrative gratuity calculation", "kind": "bars", "answerPosition": 1, "questionTemplate": "In a toy sample the bill is {Bill}; fraction {Share} tip at rate {TipRate}, the rest tip zero. What is the average tip?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
