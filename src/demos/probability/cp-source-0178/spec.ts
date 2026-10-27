import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0178", "title": "A fair sample from a completed stream", "op": "inclusion", "labels": ["Items", "Kept"], "outputs": ["Probability"], "a": [1000.0, 10.0], "b": [10000.0, 10.0], "question": "A correct toy reservoir keeps 10 items uniformly from a completed stream of 1000. What is each item’s inclusion probability?", "questionTemplate": "A correct toy reservoir keeps {Kept} items uniformly from a completed stream of {Items}. What is each item’s inclusion probability?", "explain": "Uniform inclusion depends on the reservoir replacement rule, not on knowing the final stream length in advance.", "lens": "the reservoir's uniform final inclusion probability", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
