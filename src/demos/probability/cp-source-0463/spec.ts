import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0463", "title": "A non-Gaussian noise clue", "op": "skewtwo", "labels": ["P", "Low", "High"], "outputs": ["Skewness"], "a": [0.2, 0.0, 1.0], "b": [0.5, 0.0, 1.0], "question": "A toy noise takes Low 0 with probability 0.2, otherwise High 1. What standardized third central moment results?", "questionTemplate": "A toy noise takes Low {Low} with probability {P}, otherwise High {High}. What standardized third central moment results?", "explain": "Asymmetry is one departure from Gaussian noise. This moment alone does not identify a causal graph or verify the other assumptions of a discovery method.", "lens": "the asymmetry of a specified noise distribution", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
