import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0130", "title": "A small bankroll can hit zero first", "op": "ruin", "labels": ["Bankroll", "Total", "P"], "outputs": ["Ruin"], "a": [10.0, 100.0, 0.5], "b": [50.0, 100.0, 0.5], "question": "A toy unit-step gambler starts at 10, stops at 0 or 100, and wins each independent step with probability 0.5. What is the probability of reaching 0 first?", "questionTemplate": "A toy unit-step gambler starts at {Bankroll}, stops at 0 or {Total}, and wins each independent step with probability {P}. What is the probability of reaching 0 first?", "explain": "A favorable one-step chance does not eliminate ruin at an absorbing boundary. Bankroll and target both matter.", "lens": "absorbing boundaries in a fair game", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
