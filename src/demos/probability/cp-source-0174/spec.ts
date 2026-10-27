import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0174", "title": "The inscribed ball loses cube volume", "op": "ballvolume", "labels": ["Dimension"], "outputs": ["Fraction"], "a": [2.0], "b": [10.0], "question": "What fraction of a cube [-1,1] to Dimension 2 is occupied by its inscribed unit Euclidean ball?", "questionTemplate": "What fraction of a cube [-1,1] to Dimension {Dimension} is occupied by its inscribed unit Euclidean ball?", "explain": "The volume ratio falls with dimension. This concerns uniform points in this cube, not every high-dimensional distribution.", "lens": "the uniform cube-to-ball volume ratio", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
