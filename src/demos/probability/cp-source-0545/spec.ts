import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0545", "title": "Renewal spread changes the residual wait", "op": "residualwait", "labels": ["Mean", "Variance"], "outputs": ["Residual", "Rate"], "a": [10.0, 0.0], "b": [10.0, 100.0], "question": "Inspect a stationary toy renewal process at a random time. Lifetimes have Mean 10, Variance 0. What is expected remaining life?", "questionTemplate": "Inspect a stationary toy renewal process at a random time. Lifetimes have Mean {Mean}, Variance {Variance}. What is expected remaining life?", "explain": "Long intervals are sampled more often at random times. The second moment affects residual wait even when the long-run renewal rate stays fixed.", "lens": "the second-moment inspection effect at a fixed mean lifetime", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
