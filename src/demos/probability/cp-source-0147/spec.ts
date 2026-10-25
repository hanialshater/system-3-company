import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0147", "title": "Another checkout line wins the race", "op": "inclusion", "labels": ["Items", "Kept"], "outputs": ["Probability"], "a": [3.0, 2.0], "b": [5.0, 4.0], "question": "A correct toy reservoir keeps 2 items uniformly from a completed stream of 3. What is each item’s inclusion probability?", "questionTemplate": "A correct toy reservoir keeps {Kept} items uniformly from a completed stream of {Items}. What is each item’s inclusion probability?", "explain": "Uniform inclusion depends on the reservoir replacement rule, not on knowing the final stream length in advance.", "lens": "exchangeable lines without ties", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
