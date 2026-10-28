import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0065", "title": "The default contribution", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [0.03, 0.08, 0.8], "b": [0.06, 0.08, 0.8], "question": "A toy population keeps default contribution 0.03 with probability 0.8; otherwise chooses 0.08. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "a contribution rate as well as enrollment", "kind": "bars", "answerPosition": 2, "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
