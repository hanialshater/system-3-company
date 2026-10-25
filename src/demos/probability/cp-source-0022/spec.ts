import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0022", "title": "A bound on long heads windows", "op": "runbound", "labels": ["N", "P", "Length"], "outputs": ["UpperBound"], "a": [100.0, 0.5, 7.0], "b": [100.0, 0.5, 10.0], "question": "For 100 independent flips with heads probability 0.5, use a union bound over windows of 7 heads. What upper bound does this give for at least one such window?", "questionTemplate": "For {N} independent flips with heads probability {P}, use a union bound over windows of {Length} heads. What upper bound does this give for at least one such window?", "explain": "Overlapping windows are not independent. This explicitly labeled upper bound is not the exact longest-run probability.", "lens": "overlap in a longest-run upper bound", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
