import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0078", "title": "A stated normal-coverage approximation", "op": "normalcoverage", "labels": ["Z"], "outputs": ["Coverage"], "a": [1.0], "b": [3.0], "question": "Use the explicit toy approximation C(z)=1-exp(-0.717z-0.416z²). At nonnegative z 1, what central normal coverage does it approximate?", "questionTemplate": "Use the explicit toy approximation C(z)=1-exp(-0.717z-0.416z²). At nonnegative z {Z}, what central normal coverage does it approximate?", "explain": "This visible approximation illustrates central coverage; it is not an exact normal CDF or a confidence statement about a particular unknown parameter.", "lens": "the coverage as a band widens", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
