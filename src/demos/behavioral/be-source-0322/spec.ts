import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0322", "title": "Passive savers and defaults", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.03, 0.1, 0.85], "b": [0.06, 0.1, 0.85], "question": "A toy population keeps default contribution 0.03 with probability 0.85; otherwise chooses 0.1. What is the mean contribution?", "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the retained default among an assumed passive share", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
