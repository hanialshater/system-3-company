import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0556", "title": "Small populations drift more", "op": "wfspread", "labels": ["P", "Population"], "outputs": ["SD"], "a": [0.5, 100.0], "b": [0.5, 1000.0], "question": "In a neutral toy diploid Wright-Fisher generation, allele frequency is 0.5, population size 100. What is the next frequency’s conditional SD?", "questionTemplate": "In a neutral toy diploid Wright-Fisher generation, allele frequency is {P}, population size {Population}. What is the next frequency’s conditional SD?", "explain": "Sampling 2N gene copies produces drift even without selection. Smaller populations have larger one-generation frequency variation.", "lens": "the conditional one-generation Wright-Fisher spread", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
