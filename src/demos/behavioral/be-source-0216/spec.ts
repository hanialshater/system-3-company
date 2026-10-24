import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0216", "title": "Peers' saving and your default", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.0, 1.0, 0.8], "b": [0.0, 1.0, 0.4], "question": "A toy population keeps default contribution 0 with probability 0.8; otherwise chooses 1. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the assumed default weight rather than a universal peer response", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
