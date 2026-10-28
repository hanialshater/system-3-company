import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0018", "title": "Popular friends get sampled more", "op": "sizebias", "labels": ["ValueA", "CountA", "ValueB", "CountB"], "outputs": ["Weighted", "Ordinary"], "a": [2.0, 5.0, 8.0, 1.0], "b": [2.0, 5.0, 4.0, 1.0], "question": "A toy population has 5 units of size 2 and 1 of size 8. Sampling units proportional to size, what mean size is seen?", "questionTemplate": "A toy population has {CountA} units of size {ValueA} and {CountB} of size {ValueB}. Sampling units proportional to size, what mean size is seen?", "explain": "Size-weighted sampling overrepresents large units. Compare it with the ordinary mean over units before interpreting an apparent paradox.", "lens": "size-weighted degree sampling", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
