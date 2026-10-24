import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0126", "title": "A familiar health plan", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [1.0, 0.0, 0.8], "b": [1.0, 0.0, 0.2], "question": "A toy population keeps default contribution 1 with probability 0.8; otherwise chooses 0. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the stated weight on a current option", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
