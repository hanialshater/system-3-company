import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0020", "title": "The last missing sticker", "op": "coupon", "labels": ["Types"], "outputs": ["Expected"], "a": [50.0], "b": [10.0], "question": "Each independent toy pack contains one uniformly chosen type among 50. What is the expected number of packs to collect all types?", "questionTemplate": "Each independent toy pack contains one uniformly chosen type among {Types}. What is the expected number of packs to collect all types?", "explain": "The last missing types take longer to find than the first. The expectation sums waiting times at each collection stage.", "lens": "the sum of successive collection waits", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
