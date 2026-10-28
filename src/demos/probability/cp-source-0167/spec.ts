import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0167", "title": "A single retirement return assumption", "op": "fees", "labels": ["Principal", "Return", "Fee", "Years"], "outputs": ["Balance"], "a": [100000.0, 0.05, 0.01, 20.0], "b": [100000.0, 0.01, 0.01, 20.0], "question": "Toy principal 100000 grows at annual return 0.05 minus annual fee 0.01 for 20 years. What balance results?", "questionTemplate": "Toy principal {Principal} grows at annual return {Return} minus annual fee {Fee} for {Years} years. What balance results?", "explain": "Repeated fees compound through the balance. The constant return is an illustrative assumption and excludes taxes and uncertainty.", "lens": "the stated constant-return path rather than a survival guarantee", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
