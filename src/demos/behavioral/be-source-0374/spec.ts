import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0374", "title": "Time-of-use enrollment defaults", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [1.0, 0.0, 0.9], "b": [0.0, 1.0, 0.8], "question": "A toy population keeps default contribution 1 with probability 0.9; otherwise chooses 0. What is the mean contribution?", "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the enrollment share implied by a stated retention rule", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
