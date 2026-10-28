import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0152", "title": "Win the election and lead throughout", "op": "ballot", "labels": ["A", "B"], "outputs": ["Lead"], "a": [60.0, 40.0], "b": [80.0, 20.0], "question": "A has 60 votes and B has 40, with A greater. In a uniformly random count order, what is the chance A stays strictly ahead after every count?", "questionTemplate": "A has {A} votes and B has {B}, with A greater. In a uniformly random count order, what is the chance A stays strictly ahead after every count?", "explain": "The strict ballot event excludes ties at any intermediate count. Final victory alone does not imply a lead throughout.", "lens": "the strict lead event under random vote ordering", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
