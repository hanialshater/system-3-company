import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0171", "title": "Oversample, then correct the weight", "op": "importance", "labels": ["EventTarget", "EventProposal"], "outputs": ["Weight"], "a": [1e-06, 0.1], "b": [1e-06, 0.5], "question": "A toy event has target probability 1e-06 but proposal probability 0.1. What likelihood weight corrects a sampled event indicator?", "questionTemplate": "A toy event has target probability {EventTarget} but proposal probability {EventProposal}. What likelihood weight corrects a sampled event indicator?", "explain": "Oversampling an event needs a compensating likelihood ratio. Unweighted proposal frequencies would estimate the wrong distribution.", "lens": "the proposal-to-target likelihood correction", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
