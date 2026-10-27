import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0172", "title": "A correct shuffle needs equal inclusion", "op": "inclusion", "labels": ["Items", "Kept"], "outputs": ["Probability"], "a": [52.0, 1.0], "b": [10.0, 1.0], "question": "A correct toy reservoir keeps 1 items uniformly from a completed stream of 52. What is each item’s inclusion probability?", "questionTemplate": "A correct toy reservoir keeps {Kept} items uniformly from a completed stream of {Items}. What is each item’s inclusion probability?", "explain": "Uniform inclusion depends on the reservoir replacement rule, not on knowing the final stream length in advance.", "lens": "the single-card position probability required by a uniform shuffle", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
