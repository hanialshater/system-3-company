import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0544", "title": "Events create expected descendants", "op": "hawkes", "labels": ["Base", "Branching"], "outputs": ["Rate", "Multiplier"], "a": [1.0, 0.2], "b": [1.0, 0.8], "question": "A stationary toy linear Hawkes model has base rate 1 and offspring mean Branching 0.2 below 1. What total mean event rate results?", "questionTemplate": "A stationary toy linear Hawkes model has base rate {Base} and offspring mean Branching {Branching} below 1. What total mean event rate results?", "explain": "Descendant generations amplify the immigrant rate. A stationary finite mean requires the stated subcritical branching condition.", "lens": "the subcritical offspring multiplier", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
