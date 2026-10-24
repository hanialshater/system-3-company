import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0456", "title": "Less monitoring changes the payoff", "op": "punish", "labels": ["Gain", "Fine", "Catch"], "outputs": ["Net"], "a": [20.0, 100.0, 0.5], "b": [20.0, 100.0, 0.05], "question": "A toy action earns 20 but incurs fine 100 with probability 0.5. What is its expected cash gain?", "questionTemplate": "A toy action earns {Gain} but incurs fine {Fine} with probability {Catch}. What is its expected cash gain?", "explain": "A sanction changes the expected payoff through both its size and its probability. A payoff change does not establish how people respond.", "lens": "the expected sanction when detection falls", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
