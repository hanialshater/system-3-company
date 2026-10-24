import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0221", "title": "Who can be above the median?", "op": "rank", "labels": ["People", "Above"], "outputs": ["Minimum"], "a": [100.0, 93.0], "b": [100.0, 50.0], "question": "In a toy group of 100, 93 claim to be strictly above the group median. At least how many claims cannot all be right?", "explain": "At most half the group can be strictly above its median. This logical ceiling does not diagnose which individual is mistaken.", "lens": "a logical ceiling on simultaneous rank claims", "kind": "bars", "answerPosition": 2, "questionTemplate": "In a toy group of {People}, {Above} claim to be strictly above the group median. At least how many claims cannot all be right?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
