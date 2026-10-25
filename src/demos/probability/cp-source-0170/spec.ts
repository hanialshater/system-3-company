import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0170", "title": "Turn a uniform draw into a wait", "op": "inverseexp", "labels": ["U", "Rate"], "outputs": ["Time"], "a": [0.5, 0.2], "b": [0.9, 0.2], "question": "Transform a toy uniform value U 0.5 by -log(1-U)/Rate 0.2. What exponential waiting time results?", "questionTemplate": "Transform a toy uniform value U {U} by -log(1-U)/Rate {Rate}. What exponential waiting time results?", "explain": "Applying an inverse CDF maps uniform draws into the specified distribution. Values must lie inside the stated uniform domain.", "lens": "the inverse exponential CDF", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
