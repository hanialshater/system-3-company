import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0019", "title": "Long bus gaps catch more arrivals", "op": "sizebias", "labels": ["ValueA", "CountA", "ValueB", "CountB"], "outputs": ["Weighted", "Ordinary"], "a": [5.0, 1.0, 15.0, 1.0], "b": [10.0, 1.0, 10.0, 1.0], "question": "A toy population has 1 units of size 5 and 1 of size 15. Sampling units proportional to size, what mean size is seen?", "questionTemplate": "A toy population has {CountA} units of size {ValueA} and {CountB} of size {ValueB}. Sampling units proportional to size, what mean size is seen?", "explain": "Size-weighted sampling overrepresents large units. Compare it with the ordinary mean over units before interpreting an apparent paradox.", "lens": "gap-length weighting rather than uniform gaps", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
