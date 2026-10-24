import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0353", "title": "A prescription-count default", "op": "inertia", "labels": ["Default", "Other", "Inertia"], "outputs": ["Final"], "a": [10.0, 30.0, 0.8], "b": [20.0, 30.0, 0.8], "question": "A toy population keeps default contribution 10 with probability 0.8; otherwise chooses 30. What is the mean contribution?", "questionTemplate": "A toy population keeps default contribution {Default} with probability {Inertia}; otherwise chooses {Other}. What is the mean contribution?", "explain": "The aggregate combines retained defaults and active choices. Automatic participation and the chosen contribution rate are different outcomes.", "lens": "the average count implied by a stated retention rule", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
