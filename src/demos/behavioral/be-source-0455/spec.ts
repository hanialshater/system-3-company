import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0455", "title": "An audit changes expected cash", "op": "punish", "labels": ["Gain", "Fine", "Catch"], "outputs": ["Net"], "a": [100.0, 500.0, 0.1], "b": [100.0, 500.0, 0.3], "question": "A toy action earns 100 but incurs fine 500 with probability 0.1. What is its expected cash gain?", "questionTemplate": "A toy action earns {Gain} but incurs fine {Fine} with probability {Catch}. What is its expected cash gain?", "explain": "A sanction changes the expected payoff through both its size and its probability. A payoff change does not establish how people respond.", "lens": "the detection probability in an explicit payoff model", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
