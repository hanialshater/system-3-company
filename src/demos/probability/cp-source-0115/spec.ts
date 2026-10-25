import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0115", "title": "A stated rank-sampling assumption", "op": "inclusion", "labels": ["Items", "Kept"], "outputs": ["Probability"], "a": [100.0, 10.0], "b": [1000.0, 10.0], "question": "A correct toy reservoir keeps 10 items uniformly from a completed stream of 100. What is each item’s inclusion probability?", "questionTemplate": "A correct toy reservoir keeps {Kept} items uniformly from a completed stream of {Items}. What is each item’s inclusion probability?", "explain": "Uniform inclusion depends on the reservoir replacement rule, not on knowing the final stream length in advance.", "lens": "the sampling assumption rather than a doomsday conclusion", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
