import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0229", "title": "Milk-first cups under random guessing", "op": "hypergeom", "labels": ["Population", "Marked", "Draws", "AtLeast"], "outputs": ["Tail"], "a": [8.0, 4.0, 4.0, 4.0], "b": [8.0, 4.0, 4.0, 3.0], "question": "Draw 4 without replacement from 8 items, 4 marked. What is the probability of at least 4 marked draws?", "questionTemplate": "Draw {Draws} without replacement from {Population} items, {Marked} marked. What is the probability of at least {AtLeast} marked draws?", "explain": "Conditioning on fixed margins gives this hypergeometric reference distribution. It counts possible allocations under the stated randomization model.", "lens": "the fixed-margin tail of a random allocation", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
