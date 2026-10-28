import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0138", "title": "An allocation that never moves", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.5, 0.8, 0.95], "b": [0.5, 0.8, 0.2], "question": "A toy population keeps default contribution 0.5 with probability 0.95; otherwise chooses 0.8. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the weight on an unchanged allocation", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
