import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0588", "title": "A path begins moving back toward home", "op": "uturn", "labels": ["Start", "Position", "Momentum"], "outputs": ["Dot"], "a": [0.0, 2.0, 1.0], "b": [0.0, 2.0, -1.0], "question": "A one-dimensional toy path starts at 0, reaches 2 with Momentum 1. What is (position-start)×momentum?", "questionTemplate": "A one-dimensional toy path starts at {Start}, reaches {Position} with Momentum {Momentum}. What is (position-start)×momentum?", "explain": "A negative dot product indicates motion back toward the start in this simplified check. Full NUTS uses a trajectory-building and stopping procedure beyond this scalar test.", "lens": "the one-dimensional U-turn dot-product check", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
