# Fact-check: small-gap-big-extremes v3 (2026-10-16)

## FC pass mail-34bf (2026-10-16)

Checker: fact-checker (Ingrid). Brief: company/ops/mailboxes/dispatcher/20261016T154559740Z-evaluation-steward-49b534bf.md (F-42 mailbox pilot, lane 10, SO-10-2, [project:wave-j]). Checkout: main at bf6fde86961edff82325289e54bb1e93d24c3c60, which contains 169e88d (`git merge-base --is-ancestor 169e88d HEAD` exit 0). No shared server and no walkthrough this pass (the brief allows a code read): I read Demo.tsx (and model.ts), then meta.json, then sources. I did not read build.md or any builder note. Independence: the v3 claim text and lesson text were written by demo-builder (169e88d); this pass wrote no claim or lesson text. Full per-claim notes start 'FC pass mail-34bf' in meta.json.

Scope: c1, c2, c3, c5 (reset or new in 169e88d). Every figure recomputed in node with my own upper-tail function (Simpson integration of the normal density, cross-checked by a continued fraction), independent of model.ts's erfcc; then model.ts's erfc ported to confirm the displayed strings. Result: 4 of 4 verified, 0 disputed, 0 unverifiable.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 130 cm: A 134.990, B 620.967 per 100,000 (0.1350%, 0.6210%; shown 135, 621); share 82.143% (82%), ratio 4.6001 (4.6). |
| c2 | verified | 140 cm: A 3.167, B 23.263 per 100,000 (0.0032%, 0.0233%; shown 3, 23); share 88.017% (88%), ratio 7.3451 (7.3). Ratio 1.38/1.94/2.94/4.60/7.35 at 100-140 cm: grows. |
| c3 | verified | 5 cm = 0.5 sd; overlap integral of min(f_A, f_B) = 0.80259 = 2Q(0.25): 'mostly overlap'. Learner text: 'The two curves mostly overlap: B is only 5 cm taller.' |
| c5 | verified | Folds 130 -> 140 cm: A 42.62 ('about 43'), B 26.69 ('about 27'); B's share 82.1% -> 88.0%. Learner sees only the rounded counts 135 -> 3 and 621 -> 23 (whose ratios are 45 and 27); fold numbers are not learner text. |

Commands and output:
```
$ node tails.mjs
// Independent upper tail: Q(z) by numeric integration (Simpson) of the normal density from z to z+12, and by erfc series/continued fraction.
const phi = x => Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
function Qint(z){const b=z+14,n=200000,h=(b-z)/n;let s=phi(z)+phi(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*phi(z+i*h);return s*h/3;}
// continued fraction (Lentz) for Q, z>0
function Qcf(z){let f=z,C=z,D=0;for(let k=1;k<300;k++){D=z+k*D;D=1/D;C=z+k/C;const del=C*D;f*=del;} // approx
 return phi(z)/f;}
const PER=1e5;
const rows=[];
for (const c of [100,110,120,130,140]){
 const qa=Qint((c-100)/10), qb=Qint((c-105)/10);
 rows.push({c, A_per1e5:(qa*PER).toFixed(3), B_per1e5:(qb*PER).toFixed(3), A_pct:(qa*100).toFixed(4), B_pct:(qb*100).toFixed(4), shareB:(100*qb/(qa+qb)).toFixed(3), ratio:(qb/qa).toFixed(4)});
}
console.table(rows);
console.log('cf check Q(3)',Qcf(3),'int',Qint(3),' Q(2.5)',Qcf(2.5),Qint(2.5),' Q(4)',Qcf(4),Qint(4),' Q(3.5)',Qcf(3.5),Qint(3.5));
const fA=Qint(3)/Qint(4), fB=Qint(2.5)/Qint(3.5);
console.log('fold 130->140: A',fA.toFixed(3),'B',fB.toFixed(3));
console.log('rounded per 1e5 130: A',Math.round(Qint(3)*PER),'B',Math.round(Qint(2.5)*PER),' 140: A',Math.round(Qint(4)*PER),'B',Math.round(Qint(3.5)*PER));
console.log('fold of rounded counts: A',(135/3).toFixed(2),'B',(621/23).toFixed(2));
// overlap coefficient: integral of min density, means 100,105 sd 10
let ov=0;const h=0.001;for(let x=0;x<=205;x+=h){ov+=Math.min(phi((x-100)/10),phi((x-105)/10))/10*h;}
console.log('overlap',ov.toFixed(5),' 2Q(0.25)',(2*Qint(0.25)).toFixed(5));
```
```
┌─────────┬─────┬─────────────┬─────────────┬───────────┬───────────┬──────────┬──────────┐
│ (index) │ c   │ A_per1e5    │ B_per1e5    │ A_pct     │ B_pct     │ shareB   │ ratio    │
├─────────┼─────┼─────────────┼─────────────┼───────────┼───────────┼──────────┼──────────┤
│ 0       │ 100 │ '50000.000' │ '69146.246' │ '50.0000' │ '69.1462' │ '58.035' │ '1.3829' │
│ 1       │ 110 │ '15865.525' │ '30853.754' │ '15.8655' │ '30.8538' │ '66.041' │ '1.9447' │
│ 2       │ 120 │ '2275.013'  │ '6680.720'  │ '2.2750'  │ '6.6807'  │ '74.597' │ '2.9366' │
│ 3       │ 130 │ '134.990'   │ '620.967'   │ '0.1350'  │ '0.6210'  │ '82.143' │ '4.6001' │
│ 4       │ 140 │ '3.167'     │ '23.263'    │ '0.0032'  │ '0.0233'  │ '88.017' │ '7.3451' │
└─────────┴─────┴─────────────┴─────────────┴───────────┴───────────┴──────────┴──────────┘
cf check Q(3) 0.0013498980316300959 int 0.0013498980316299961  Q(2.5) 0.0062096653257761565 0.006209665325775315  Q(4) 0.000031671241833120134 0.000031671241833117695  Q(3.5) 0.00023262907903552542 0.000232629079035503
fold 130->140: A 42.622 B 26.693
rounded per 1e5 130: A 135 B 621  140: A 3 B 23
fold of rounded counts: A 45.00 B 27.00
overlap 0.80259  2Q(0.25) 0.80259
```
```
$ node port.mjs   # model.ts erfc copied verbatim, display formatting as Demo.tsx
100 A 50,000 B 69,146 share 58% ratio 1.4
110 A 15,866 B 30,854 share 66% ratio 1.9
120 A 2,275 B 6,681 share 75% ratio 2.9
130 A 135 B 621 share 82% ratio 4.6
140 A 3 B 23 share 88% ratio 7.3
```
