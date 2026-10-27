import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0184", "title": "A sanction changes the payoff", "op": "punish", "labels": ["Gain", "Fine", "Catch"], "outputs": ["Net"], "a": [5.0, 10.0, 0.0], "b": [5.0, 10.0, 0.8], "question": "A toy action earns 5 but incurs fine 10 with probability 0. What is its expected cash gain?", "explain": "A sanction changes the expected payoff through both its size and its probability. A payoff change does not establish how people respond.", "lens": "the enforcement probability in a payoff rule", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy action earns {Gain} but incurs fine {Fine} with probability {Catch}. What is its expected cash gain?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
