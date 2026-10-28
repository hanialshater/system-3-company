import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0233", "title": "Shuffle labels while keeping margins", "op": "hypergeom", "labels": ["Population", "Marked", "Draws", "AtLeast"], "outputs": ["Tail"], "a": [20.0, 10.0, 10.0, 8.0], "b": [20.0, 10.0, 10.0, 5.0], "question": "Draw 10 without replacement from 20 items, 10 marked. What is the probability of at least 8 marked draws?", "questionTemplate": "Draw {Draws} without replacement from {Population} items, {Marked} marked. What is the probability of at least {AtLeast} marked draws?", "explain": "Conditioning on fixed margins gives this hypergeometric reference distribution. It counts possible allocations under the stated randomization model.", "lens": "the randomization distribution with fixed totals", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
