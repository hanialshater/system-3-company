import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0198", "title": "Always negative still scores highly", "op": "rareaccuracy", "labels": ["Negative", "Positive"], "outputs": ["Accuracy", "Recall"], "a": [990.0, 10.0], "b": [900.0, 100.0], "question": "A toy population has 990 negative and 10 positive cases. A classifier predicts negative for everyone. What accuracy does it achieve?", "questionTemplate": "A toy population has {Negative} negative and {Positive} positive cases. A classifier predicts negative for everyone. What accuracy does it achieve?", "explain": "An always-negative classifier can have high accuracy while detecting no positive cases. The class base rate supplies the apparent success.", "lens": "the rare-class base rate behind apparent accuracy", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
