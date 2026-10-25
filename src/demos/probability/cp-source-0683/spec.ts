import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0683", "title": "An optimism bonus shrinks", "op": "optimism", "labels": ["Mean", "Total", "Pulls"], "outputs": ["UCB", "Bonus"], "a": [0.5, 100.0, 5.0], "b": [0.5, 100.0, 50.0], "question": "A toy UCB score adds sqrt(2 log Total/Pulls) to Mean 0.5. Total 100, Pulls 5: what score results?", "questionTemplate": "A toy UCB score adds sqrt(2 log Total/Pulls) to Mean {Mean}. Total {Total}, Pulls {Pulls}: what score results?", "explain": "Less sampled arms receive a larger optimism bonus. This one-step score does not establish cumulative regret.", "lens": "the pull count in a specified UCB rule", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;
