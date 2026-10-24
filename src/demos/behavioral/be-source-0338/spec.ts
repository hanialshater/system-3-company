import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0338", "title": "The same index, different fees", "op": "fees", "labels": ["Principal", "Return", "Fee", "Years"], "outputs": ["Balance"], "a": [1000.0, 0.05, 0.002, 20.0], "b": [1000.0, 0.05, 0.02, 20.0], "question": "Toy principal 1000 grows at annual return 0.05 minus annual fee 0.002 for 20 years. What balance results?", "questionTemplate": "Toy principal {Principal} grows at annual return {Return} minus annual fee {Fee} for {Years} years. What balance results?", "explain": "Repeated fees compound through the balance. The constant return is an illustrative assumption and excludes taxes and uncertainty.", "lens": "the compounding drag of a fee difference", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
