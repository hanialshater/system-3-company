import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0066", "title": "The path with less resistance", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.0, 1.0, 0.8], "b": [1.0, 0.0, 0.8], "question": "A toy population keeps default contribution 0 with probability 0.8; otherwise chooses 1. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "which option receives the default weight", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
