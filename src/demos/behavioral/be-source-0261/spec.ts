import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0261", "title": "Cancel the common payoff", "op": "commonpart", "labels": ["Common", "Gain", "Sure", "P"], "outputs": ["Advantage"], "a": [80.0, 100.0, 20.0, 0.3], "b": [0.0, 100.0, 20.0, 0.3], "question": "A toy pair shares payoff 80. One adds gain 100 with probability 0.3; the other adds sure 20. What is risky minus sure expected cash?", "questionTemplate": "A toy pair shares payoff {Common}. One adds gain {Gain} with probability {P}; the other adds sure {Sure}. What is risky minus sure expected cash?", "explain": "A truly common component cancels from this expected-cash comparison. Preferences over lotteries require an additional utility model.", "lens": "a truly shared outcome in expected-cash arithmetic", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
