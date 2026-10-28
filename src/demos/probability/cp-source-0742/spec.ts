import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0742", "title": "One stipulated extreme-value family", "op": "gumbel", "labels": ["X", "Location", "Scale"], "outputs": ["CDF"], "a": [0.0, 0.0, 1.0], "b": [0.0, 1.0, 1.0], "question": "A stipulated Gumbel distribution has Location 0, Scale 1. What is its CDF at X 0?", "questionTemplate": "A stipulated Gumbel distribution has Location {Location}, Scale {Scale}. What is its CDF at X {X}?", "explain": "This is one extreme-value family. Selecting a family for data requires tail assumptions and validation.", "lens": "the location parameter of a Gumbel CDF", "kind": "curve", "answerPosition": 1, "plot": [0, -3, 6]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
