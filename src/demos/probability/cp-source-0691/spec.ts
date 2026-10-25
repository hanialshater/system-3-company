import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0691", "title": "A known-arm discount benchmark", "op": "streamvalue", "labels": ["Reward", "Gamma"], "outputs": ["Value"], "a": [1.0, 0.5], "b": [1.0, 0.9], "question": "A known toy arm pays Reward 1 forever with discount Gamma 0.5. What discounted value results?", "questionTemplate": "A known toy arm pays Reward {Reward} forever with discount Gamma {Gamma}. What discounted value results?", "explain": "This known-payoff benchmark has no exploration value. It is not a Gittins index for an uncertain arm.", "lens": "the discount factor before uncertain-arm index calculation", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
