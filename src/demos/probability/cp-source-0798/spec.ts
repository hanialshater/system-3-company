import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0798", "title": "A green-token count gets a null score", "op": "watermark", "labels": ["Count", "N", "NullP"], "outputs": ["Z"], "a": [60.0, 100.0, 0.5], "b": [50.0, 100.0, 0.5], "question": "A toy token tally has Count 60 green tokens among N 100, with independent null chance NullP 0.5. What standardized count results?", "questionTemplate": "A toy token tally has Count {Count} green tokens among N {N}, with independent null chance NullP {NullP}. What standardized count results?", "explain": "This score uses an independent Bernoulli null variance. Dependence, editing and key selection affect any actual watermark test.", "lens": "the Bernoulli null used to standardize a token tally", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
