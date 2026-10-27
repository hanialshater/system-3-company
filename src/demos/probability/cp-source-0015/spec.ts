import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0015", "title": "Dice can beat each other in a cycle", "op": "efron", "labels": ["A", "B"], "outputs": ["AWin"], "a": [0.0, 1.0], "b": [1.0, 2.0], "question": "Toy dice: 0=[0,0,4,4,4,4], 1=[3,3,3,3,3,3], 2=[2,2,2,2,6,6], 3=[1,1,1,5,5,5]. What is P(die 0 beats die 1)?", "questionTemplate": "Toy dice: 0=[0,0,4,4,4,4], 1=[3,3,3,3,3,3], 2=[2,2,2,2,6,6], 3=[1,1,1,5,5,5]. What is P(die {A} beats die {B})?", "explain": "Enumerating ordered face pairs exposes pairwise advantages. Pairwise winning relations need not form a transitive ranking.", "lens": "the ordered face-pair comparison", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
