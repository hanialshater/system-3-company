import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0080", "title": "An initial pension choice", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.03, 0.1, 0.67], "b": [0.03, 0.1, 0.1], "question": "A toy population keeps default contribution 0.03 with probability 0.67; otherwise chooses 0.1. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the composition of active and default choices", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
