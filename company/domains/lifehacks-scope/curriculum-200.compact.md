# Proposed Life Hacks curriculum for the 200 PR #2 lessons (compact form)

- **Author:** cm-lifehacks (Tess), session 2, 2026-10-14. Original: `company/domains/lifehacks-scope/curriculum-200.json` on session 2's local commits.
- **Received:** by message ("S2 XFER 6/6"), committed by session 1's chief of staff. Co-sign by the head of product on the charter is pending.
- **How to apply:** keep our `content/curriculum/lifehacks.json` (not the PR version or its note line). Replace `concepts` with the list below; the 15 existing ids are kept (two-minute-rule demand 3→2 and unit-price-shopping 3→1, on purpose). For each lesson set meta.json `concept` and `curriculum.primary` from the lessons map, then re-run tools/meta.mjs (builder work). For lessons flagged D, add `also` pointing at the receiving concept.

## Concepts: id | name | level | demand | subarea | prerequisites
salt-lowers-freezing | Why salt on ice (and ice + salt chills drinks fast) | intro | 3 | kitchen |
surface-area-drying | Drying faster: spread it out (exposed surface area) | intro | 3 | laundry |
resting-meat | Resting food after cooking (carry-over heat) | intro | 3 | kitchen |
two-minute-rule | Small tasks now beat a long list (task switching cost) | intro | 2 | time |
spaced-repetition-study | Study in spaced sessions, not one cram | intro | 3 | study |
standby-power-cost | What standby power really costs in a year | intro | 3 | energy |
lever-opens-jars | Opening a stuck jar: grip, leverage, heat | intro | 2 | kitchen |
packing-rolling-vs-folding | Rolling vs folding clothes in a suitcase | intro | 2 | travel |
unit-price-shopping | Unit price: the bigger pack is not always cheaper | intro | 1 | shopping |
viral-hack-debunk | Debunking viral hacks: test the claim, not the video | core | 2 | (none) |
sleep-caffeine-half-life | Afternoon coffee and sleep (caffeine half-life) | core | 2 | study |
boil-less-water | Boil only the water you need (energy per litre) | intro | 2 | kitchen |
wobbly-table-turn | A rocking table: turn it, less than a quarter turn (intermediate values) | core | 2 | fix |
shoelace-square-bow | Laces that stay tied: square bow vs granny bow | intro | 2 | laundry |
cord-tangle-length | Why long cords knot themselves (and how to stop it: control the ends) | intro | 2 | laundry |
recipe-scale-per-portion | Scale a recipe by portions (cooking times do not scale) | intro | 2 | kitchen |
volume-ignores-orientation | A tall container and a wide one: turning it does not change what it holds | intro | 2 | kitchen |
area-scales-as-square | Double the width, four times the area (and the cylinder holds 4x) | intro | 1 | kitchen |
drying-airflow | Moving air and spacing on the rack speed drying (airflow is not extra surface) | intro | 2 | laundry | surface-area-drying
drying-humidity | Humid air dries slower, and drying laundry indoors adds the humidity | core | 2 | laundry | surface-area-drying
drying-water-load | Less water in, less to dry: wring it out; thick cloth holds more per face | intro | 2 | laundry | surface-area-drying
dry-knits-flat | Follow the care label: knits dry flat because hanging loads the shoulders | intro | 2 | laundry |
loop-is-not-a-knot | A crossing is not a knot: slide the loop off the end | intro | 1 | laundry |
sock-matching-by-pattern | Sort socks by pattern first: a smaller pool to search | intro | 1 | laundry |
sock-pair-count | Unmarked socks: every pair is a candidate (pair counting) | intro | 1 | laundry |
fold-footprint-vs-height | Folding trades footprint for stack height; the cloth volume stays | intro | 1 | laundry |
inch-is-2-54-cm | An inch is exactly 2.54 cm: the 2.5 shortcut error grows with length | intro | 1 | fix |
measure-from-one-origin | Measure every mark from one origin (start mark and accumulated error) | intro | 2 | fix |
allowance-per-piece | Allowances repeat: add one per cut and per fold | intro | 2 | fix |
wrap-surface-plus-overlap | Wrapping a box: six faces plus the overlap | intro | 2 | fix |
around-vs-across | Around is not across: ribbon length is a perimeter path | intro | 1 | fix |
paint-coverage | Paint a wall: subtract the openings, then buy whole cans | intro | 2 | fix |
diagonals-check-square | Equal sides do not prove square; equal diagonals do | core | 2 | fix |
measure-the-inside | Measure the inside: walls and dividers take space | intro | 2 | fix |
fit-with-margin | A fit with no margin is fragile: allow for size tolerance | core | 1 | fix |
match-by-fit-dimension | Match a lid by diameter, not by colour | intro | 1 | fix |
keep-aspect-ratio | Resize a photo without stretching: keep the ratio | intro | 1 | fix |
pieces-are-not-one-whole | Two offcuts are not one long piece; scattered minutes are not one block | core | 2 | fix |
material-reuse-account | Reusable vs disposable: count the material and state the boundary | core | 1 | fix |
cord-coil-bend-radius | Coil a cord loosely: tighter loops bend it harder | intro | 1 | fix |
pressure-spreads-load | Spread the load: same weight, lower pressure | intro | 1 | fix |
shelf-load-lever | Heavy book near the back: same weight, shorter lever | intro | 1 | fix |
envelope-includes-protrusions | Handles count: measure the whole outline, not the body | intro | 1 | storage |
round-in-square-wastes-corners | Round in a square leaves the corners empty (about 21%) | intro | 2 | storage |
store-at-point-of-use | Store it where you use it; a second copy can beat the walk | intro | 2 | storage |
clearance-for-movement | Leave room for the door swing and the pulled-back chair | intro | 2 | storage |
nesting-shares-hollow | Nest or flat-pack: the empty inside is what you save | intro | 2 | storage |
diagonal-and-tilt-fit | The sofa through the door: tilt it, use the diagonal | core | 2 | storage |
fixed-address-shrinks-search | A fixed home for the keys: an address shrinks the search | intro | 2 | storage |
see-it-to-find-it | See it to pick it: file-fold shirts, clear boxes, labels that face out | intro | 1 | storage |
frequent-items-in-front | Keep what you use often in front; nesting costs access | intro | 2 | storage |
group-items-used-together | Keep a set together: one trip, not three | intro | 1 | storage |
slide-out-shortens-reach | A pull-out tray shortens the reach to the back | intro | 1 | storage |
adjust-shelf-height | Small boxes under a tall gap waste height: move the shelf | intro | 1 | storage |
sorted-halving-search | Sorted labels let you halve the search | intro | 1 | storage |
energy-power-times-time | Watts times hours: power and duration trade places | intro | 2 | energy |
bill-equals-energy-times-rate | The bill is energy times the rate: labels and tariffs | intro | 2 | energy |
standing-charge-vs-unit-rate | A lower unit rate can still cost more at low use (standing charge) | core | 2 | energy |
water-flow-times-time | Water used is flow times minutes | intro | 2 | energy |
low-flow-saves-timed-use-only | A low-flow tap saves water on a timed shower, not on filling a bucket | core | 2 | energy | water-flow-times-time
small-leak-adds-up | A dripping tap over a year: small flow, long time | intro | 2 | energy |
decimal-unit-conversion | Move the decimal with the unit (cents and euros, litres and cubic metres) | intro | 1 | energy |
percent-changes-multiply | Stacked discounts multiply: 20% then 10% is not 30%; down then up does not cancel | intro | 1 | shopping |
price-plus-running-cost | Price tag plus running cost: when the dearer one wins | intro | 1 | shopping |
fixed-fee-vs-per-visit | Membership fee or pay per visit: the crossover | intro | 1 | shopping |
weighted-average-price | Average price across purchases: weight by quantity | core | 1 | shopping |
count-usable-units | Count the sheets, not the rolls; price per piece you actually use | intro | 3 | shopping |
round-up-to-whole-packs | Whole packs, whole trips: rounding up leaves extra | intro | 2 | shopping |
bundle-deals-odd-quantities | Bundles and 2-for-1 when you need an odd number | intro | 2 | shopping | round-up-to-whole-packs
shortage-before-rounding | Subtract what you have, then round to packs | intro | 1 | shopping | round-up-to-whole-packs
fixed-fee-per-order | One fee per order: split orders pay it twice | intro | 2 | shopping |
spend-threshold-trap | Free shipping and voucher minimums: adding items can cost more | intro | 3 | shopping |
fixed-vs-percentage | Fixed amount or percentage: they cross as the basket grows | intro | 3 | shopping |
round-lines-vs-total | Round each line or round the total; billing increments | core | 1 | shopping |
deposit-is-not-cost | A refundable deposit is cash out, not cost | intro | 1 | shopping |
split-by-share | Split the bill by what each ordered, not by heads | intro | 2 | shopping |
equal-shares-remainder | Equal shares of indivisible things leave a remainder | intro | 1 | shopping |
merge-lists-once | Merge two shopping lists without counting overlaps twice | intro | 1 | shopping |
use-expiring-first | Use the tickets that expire first | intro | 1 | shopping |
shop-available-stock | Shop stock: committed and pooled units (out of scope) | core | 1 | shopping |
shop-reorder-and-recount | Shop stock: lead time and count corrections (out of scope) | core | 1 | shopping |
retrieval-practice | Test yourself, then check: cover the answer before you look | intro | 3 | study |
fluency-illusion | Feeling you know it is not knowing it: check with output | core | 3 | study | retrieval-practice
self-explain-structure | Rebuild the links and the order, not just the list | core | 2 | study | retrieval-practice
one-cue-one-answer | One question per card, and a cue that names its context | intro | 2 | study |
test-both-directions | Flip the flashcard: knowing A to B does not test B to A | intro | 2 | study |
contrast-confusable-pairs | Study look-alikes side by side to learn the difference | core | 2 | study |
apply-not-recite | Apply the rule; quoting it is not knowing it | intro | 2 | study |
work-back-from-deadline | Work back from the deadline or the arrival time | intro | 2 | time |
plan-with-the-long-estimate | We underestimate tasks: plan with the long end and a buffer | intro | 2 | time |
book-travel-and-wrap-up | The calendar must hold the journey and the wrap-up | intro | 2 | time |
book-setup-and-prep | Setup and preparation need their own time | intro | 2 | time |
fit-around-fixed-slots | Flexible work fits around fixed slots; keep some slack | intro | 1 | time |
no-double-booking | One person cannot be in two blocks | intro | 1 | time |
do-the-blocking-task-first | Do the task that unlocks the others first | intro | 2 | time |
limit-work-in-progress | Finish before starting more | intro | 2 | time |
batch-shared-overhead | Batch to pay the setup or the walk once | intro | 2 | time |
homework-deadline-first | Homework order: earliest deadline first vs shortest first | core | 2 | time |
queue-shortest-first | Shortest job first cuts total waiting | core | 1 | time |
office-handoff | Office: a handoff with input and a restart point (out of scope) | core | 1 | time |
office-ready-vs-blocked | Office: ready vs blocked work (out of scope) | core | 1 | time |
office-specific-requests | Office: name the object and bound the question (out of scope) | core | 1 | time |
office-owner-and-status | Office: next owner, status vs blocker (out of scope) | core | 1 | time |
office-agenda-and-reasons | Office: agenda outcomes and decision reasons (out of scope) | core | 1 | time |
office-bug-report | Office: a reproducible bug report (out of scope) | core | 1 | time |
office-deadline-reference | Office: a deadline needs a date and time zone (out of scope) | core | 1 | time |
text-sort-vs-number-sort | Name files so they sort: ISO dates and padded version numbers | intro | 2 | digital |
search-and-or-filters | AND narrows, OR widens: combine filters | intro | 2 | digital |
search-phrase-and-exclude | Quote the exact phrase, minus the noise | intro | 2 | digital |
name-is-not-identity | Same name is not same file: check contents and extension | intro | 2 | digital |
descriptive-names-and-links | Names and link labels that say what they point to | intro | 1 | digital |
sort-by-the-right-date | Modified is not created; big is not recent | intro | 1 | digital |
search-scope | Search the body and the trash, not just titles | intro | 1 | digital |
work-on-a-copy | Experiment on a copy, keep the original | intro | 2 | digital |
tags-are-not-copies | Two tags, one file | intro | 1 | digital |
shallow-folders | Flatten a folder level: fewer steps every visit | intro | 1 | digital |
ui-copy-vs-cut | UI: copy keeps the original, cut moves it (out of scope) | intro | 1 | digital |
ui-view-is-not-edit | UI: find and zoom change the view, not the text (out of scope) | intro | 1 | digital |
ui-replace-scope | UI: selection and preview bound a replace (out of scope) | intro | 1 | digital |
ui-paste-plain-text | UI: paste without the style (out of scope) | intro | 1 | digital |
ui-selection-vs-focus | UI: focus and selection differ (out of scope) | intro | 1 | digital |
ui-undo-redo | UI: undo and redo walk the edit history (out of scope) | intro | 1 | digital |
weight-limit-not-volume | A half-empty bag can be overweight: weight and volume are different limits | intro | 2 | travel |
pack-in-reverse-order | Pack in reverse: what you need first goes in last | intro | 2 | travel |
orientation-changes-fit | Rotate before you buy a bigger bag: toe to heel, turn the block | intro | 2 | travel |
fill-the-hollows | Fill the hollows: socks in shoes, corners in corners | intro | 2 | travel |
balance-the-load | Balance a bag: the centre of mass under the handle | intro | 1 | travel |
lid-boils-water-sooner | A lid on the pot boils water sooner | intro | 3 | kitchen |
searing-does-not-seal | Debunk: searing does not seal in the juices | core | 3 | kitchen | resting-meat
blot-dont-rub | Blot a fresh spill, do not rub it | intro | 3 | cleaning |
disinfectant-contact-time | Let the spray sit: disinfectants need contact time | intro | 3 | cleaning |
cold-water-protein-stains | Cold water first on a protein stain | intro | 3 | cleaning |
interleaved-practice | Mix problem types instead of blocking them | core | 3 | study | retrieval-practice
learning-styles-debunk | Debunk: matching your "learning style" does not help | intro | 3 | study |
battery-partial-charging | Debunk: draining a phone battery to 0% before charging | intro | 3 | digital |
backup-3-2-1 | One backup is not a backup (3-2-1) | intro | 3 | digital |

## Lessons: slug -> concept (strand follows the concept's subarea). D = duplicate of another category's concept, O = out of scope
agenda-needs-an-outcome -> office-agenda-and-reasons O
alphabet-sort-search -> sorted-halving-search D
apply-not-quote -> apply-not-recite
arrival-is-not-departure -> work-back-from-deadline
bag-weight-before-volume -> weight-limit-not-volume
batch-by-setup -> batch-shared-overhead
box-handle-clearance -> envelope-includes-protrusions
breeze-is-not-extra-surface -> drying-airflow
buffer-for-a-late-finish -> plan-with-the-long-estimate
bug-report-needs-reproduction -> office-bug-report O
calendar-needs-travel -> book-travel-and-wrap-up
care-label-first-choice -> dry-knits-flat
check-confidence-with-output -> fluency-illusion
choose-the-metric-first -> homework-deadline-first
circle-tray-square-corners -> round-in-square-wastes-corners
cm-to-inches -> inch-is-2-54-cm
coiled-cord-bend-radius -> cord-coil-bend-radius
copy-keeps-the-original -> ui-copy-vs-cut O
count-setup-in-the-block -> book-setup-and-prep
cover-before-recall -> retrieval-practice
cue-needs-a-boundary -> one-cue-one-answer
cut-moves-the-selection -> ui-copy-vs-cut O
deadline-needs-a-reference -> office-deadline-reference O
delegate-the-whole-handoff -> office-handoff O
deleted-is-a-search-state -> search-scope
dependency-before-priority -> do-the-blocking-task-first
desk-supply-near-use -> store-at-point-of-use
do-not-starve-the-long-job -> queue-shortest-first D
door-swing-clearance -> clearance-for-movement
drawer-divider-cost -> measure-the-inside
drying-room-water-load -> drying-humidity
duplicate-before-experiment -> work-on-a-copy
duplicates-two-stations -> store-at-point-of-use
earliest-deadline-first -> homework-deadline-first
elastic-loop-release -> loop-is-not-a-knot
equal-names-not-equal-files -> name-is-not-identity
estimate-a-range -> plan-with-the-long-estimate
explain-the-link -> self-explain-structure
file-fold-see-each-shirt -> see-it-to-find-it
file-modified-not-created -> sort-by-the-right-date
file-type-then-owner -> search-and-or-filters
find-next-is-navigation -> ui-view-is-not-edit O
fit-before-fixed-slot -> fit-around-fixed-slots
fitted-sheet-corners-nest -> fill-the-hollows
flat-pack-volume-dimensions -> nesting-shares-hollow
folded-shirt-stack-height -> fold-footprint-vs-height
fragmented-time-does-not-fit -> pieces-are-not-one-whole
furniture-through-door -> diagonal-and-tilt-fit
garment-overlap-hides-face -> surface-area-drying
group-cables-with-ends -> cord-tangle-length
half-size-two-towels -> surface-area-drying
handoff-after-finish -> office-ready-vs-blocked O
handoff-needs-a-checkpoint -> office-handoff O
heavy-book-close-to-back -> shelf-load-lever D
humidity-evaporation-gap -> drying-humidity
include-the-wrap-up -> book-travel-and-wrap-up
iso-date-filename-sort -> text-sort-vs-number-sort
jacket-last-first -> pack-in-reverse-order
keep-the-error-feedback -> retrieval-practice
keys-fixed-drop-zone -> fixed-address-shrinks-search
labels-specific-address -> fixed-address-shrinks-search
laundry-gap-air-path -> drying-airflow
laundry-sort-before-walk -> batch-shared-overhead
lh-align-price-units -> unit-price-shopping D
lh-annual-label-cost -> bill-equals-energy-times-rate
lh-area-scales-square -> area-scales-as-square
lh-around-versus-across -> around-vs-across
lh-big-pack-price -> unit-price-shopping D
lh-billing-rounds-hours -> round-lines-vs-total
lh-buy-only-stock-gap -> shortage-before-rounding
lh-capacity-batch-count -> round-up-to-whole-packs
lh-cents-euros-conversion -> decimal-unit-conversion
lh-committed-stock -> shop-available-stock O
lh-count-before-dispatch -> shop-reorder-and-recount O
lh-count-sheets-not-rolls -> count-usable-units
lh-coverage-whole-cans -> paint-coverage
lh-deposit-checkout-net -> deposit-is-not-cost
lh-discount-round-trip -> percent-changes-multiply D
lh-double-container-radius -> area-scales-as-square D
lh-duplex-sheet-rounding -> round-up-to-whole-packs
lh-duty-cycle-energy -> energy-power-times-time
lh-each-cut-allowance -> allowance-per-piece
lh-fixed-coupon-percent -> fixed-vs-percentage
lh-fixed-energy-charge -> standing-charge-vs-unit-rate
lh-fixed-volume-fill -> low-flow-saves-timed-use-only
lh-flow-duration-offset -> water-flow-times-time
lh-flow-times-minutes -> water-flow-times-time
lh-free-shipping-gap -> spend-threshold-trap
lh-idle-versus-active -> standby-power-cost
lh-indivisible-shares -> equal-shares-remainder
lh-jug-rounding-extra -> round-up-to-whole-packs
lh-lead-time-stock -> shop-reorder-and-recount O
lh-material-reuse-account -> material-reuse-account
lh-merge-overlapping-lists -> merge-lists-once
lh-offcuts-not-one-piece -> pieces-are-not-one-whole
lh-overlap-material-area -> wrap-surface-plus-overlap
lh-parcel-fee-repeats -> fixed-fee-per-order
lh-pay-for-used-quantity -> count-usable-units
lh-percentage-overage -> fixed-vs-percentage
lh-pool-spare-stock -> shop-available-stock O
lh-purchase-plus-running -> price-plus-running-cost D
lh-reuse-cost-per-use -> price-plus-running-cost D
lh-round-lines-versus-total -> round-lines-vs-total
lh-round-replenishment -> shortage-before-rounding
lh-round-snack-packs -> round-up-to-whole-packs
lh-same-energy-new-tariff -> bill-equals-energy-times-rate
lh-scale-recipe-portions -> recipe-scale-per-portion
lh-sequential-discounts -> percent-changes-multiply D
lh-small-leak-large-duration -> small-leak-adds-up
lh-split-order-fixed-fee -> fixed-fee-per-order
lh-standby-days-add-up -> standby-power-cost
lh-subtract-openings-area -> paint-coverage
lh-ticket-bundle-unused -> bundle-deals-odd-quantities
lh-turn-container-volume -> volume-ignores-orientation
lh-two-for-one-boundary -> bundle-deals-odd-quantities
lh-use-deadline-tickets -> use-expiring-first
lh-visit-fee-crossover -> fixed-fee-vs-per-visit D
lh-voucher-minimum -> spend-threshold-trap
lh-water-meter-units -> decimal-unit-conversion
lh-watts-hours-trade -> energy-power-times-time
lh-weighted-bill-share -> split-by-share
lh-weighted-unit-average -> weighted-average-price D
lh-weighted-volume-allocation -> split-by-share
lids-match-by-size -> match-by-fit-dimension
link-label-names-the-target -> descriptive-names-and-links
long-cord-knots-itself -> cord-tangle-length
mail-exact-phrase -> search-phrase-and-exclude
mail-minus-noise -> search-phrase-and-exclude
mail-or-vs-and -> search-and-or-filters
make-a-question-answerable -> office-specific-requests O
margin-before-cut -> allowance-per-piece
measure-diagonal-for-square -> diagonals-check-square
measure-inside-not-outside -> measure-the-inside
meeting-and-preparation -> book-setup-and-prep
mug-handle-packing -> envelope-includes-protrusions
name-the-next-owner -> office-owner-and-status O
nested-box-retrieval -> frequent-items-in-front
note-gap-check -> fluency-illusion
one-person-two-jobs -> no-double-booking
one-question-one-card -> one-cue-one-answer
packing-cube-walls -> measure-the-inside
pillowcase-set-kit -> group-items-used-together
plain-text-paste-scope -> ui-paste-plain-text O
preview-replace-all -> ui-replace-scope O
project-prefix-filenames -> descriptive-names-and-links
rebuild-the-procedure -> self-explain-structure
record-the-reason -> office-agenda-and-reasons O
rectangular-bin-nesting -> nesting-shares-hollow
request-needs-the-object -> office-specific-requests O
reserve-an-unassigned-slot -> fit-around-fixed-slots
resize-photo-frame-ratio -> keep-aspect-ratio
reverse-the-flashcard -> test-both-directions
ribbon-around-box-length -> around-vs-across
rolled-or-folded-volume -> packing-rolling-vs-folding
round-box-leftover-gap -> round-in-square-wastes-corners
rug-chair-pullback -> clearance-for-movement
ruler-start-not-zero -> measure-from-one-origin
search-the-document-body -> search-scope
seasonal-bin-rotation -> frequent-items-in-front
select-before-replace -> ui-replace-scope O
selection-not-focus -> ui-selection-vs-focus O
separate-confusable-pairs -> contrast-confusable-pairs
separate-ready-from-blocked -> office-ready-vs-blocked O
shelf-front-labels -> see-it-to-find-it
shelf-gap-wasted-height -> adjust-shelf-height
shoes-opposite-ends -> orientation-changes-fit
short-jobs-clear-a-queue -> queue-shortest-first D
shorter-folder-path -> shallow-folders
show-the-file-extension -> name-is-not-identity
size-is-not-recency -> sort-by-the-right-date
small-items-in-mesh -> group-items-used-together
sock-pairing-by-pattern -> sock-matching-by-pattern
sock-pairs-not-all-combinations -> sock-pair-count D
socks-use-shoe-space -> fill-the-hollows
sofa-diagonal-room -> diagonal-and-tilt-fit
spaced-beats-cram -> spaced-repetition-study
spacer-protects-clearance -> fit-with-margin
square-bow-stays-tied -> shoelace-square-bow
status-and-blocker-differ -> office-owner-and-status O
suitcase-layer-access -> pack-in-reverse-order
suitcase-rotate-block -> orientation-changes-fit
tags-are-not-copies -> tags-are-not-copies
tape-mark-same-spacing -> measure-from-one-origin
tote-balance-sides -> balance-the-load
towel-over-two-bars -> surface-area-drying
towel-spread-dries-first -> surface-area-drying
towel-thickness-hidden-volume -> drying-water-load
transparent-box-visibility -> see-it-to-find-it
trays-slide-out-reach -> slide-out-shortens-reach
undo-then-redo -> ui-undo-redo O
unlock-the-following-work -> do-the-blocking-task-first
version-nine-and-ten -> text-sort-vs-number-sort
weight-spread-on-table -> pressure-spreads-load D
wet-knit-hang-stretch -> dry-knits-flat
wetter-cloth-more-water -> drying-water-load
wobbly-table-quarter-turn -> wobbly-table-turn
work-back-from-a-deadline -> work-back-from-deadline
work-in-process-limit -> limit-work-in-progress
wrapping-paper-minimum-area -> wrap-surface-plus-overlap
zoom-does-not-rewrite -> ui-view-is-not-edit O

## Duplicates (also → existing concept; the receiving manager decides the transfer)
- lh-big-pack-price, lh-align-price-units → economics:unit-pricing (economics/unit-price-aisle, published), cm-economics
- lh-sequential-discounts → economics:percent-stacking (twenty-then-ten-off), cm-economics
- lh-discount-round-trip → math:percent-change-asymmetry (fifty-up-fifty-down), cm-math
- lh-purchase-plus-running, lh-reuse-cost-per-use → economics:total-cost-of-ownership (cheap-printer-dear-ink, published), cm-economics
- lh-weighted-unit-average → economics:average-purchase-cost (same-dollars-more-shares, published), cm-economics
- lh-visit-fee-crossover → economics:break-even (break-even-cups, published), cm-economics
- lh-double-container-radius → math:area-scaling (double-the-size, published), cm-math
- sock-pairs-not-all-combinations → math:handshake-counting (handshakes-halve, published), cm-math
- weight-spread-on-table → physics:pressure-force-area (snowshoe-pressure, published), cm-physics
- heavy-book-close-to-back → physics:torque-lever (seesaw-sit-closer), cm-physics
- alphabet-sort-search → cs:binary-search (binary-search, published), cm-cs
- short-jobs-clear-a-queue, do-not-starve-the-long-job (partial: the lateness trade-off is not in the cs lesson) → cs:shortest-job-first (shortest-job-first-wait, published), cm-cs
- 16th, not on the decision list: lh-area-scales-square → math:area-scaling.

## Concept notes
- surface-area-drying: 4 lessons, over the 2-per-concept rule. Merge candidates as stage variants of the anchor.
- measure-the-inside: 3 lessons; drawer-divider-cost is the merge candidate.
- see-it-to-find-it: 3 lessons; shelf-front-labels is the drop candidate.
- round-up-to-whole-packs: 4 lessons (ceiling division). lh-capacity-batch-count is not about food.
- book-setup-and-prep: near-same idea as book-travel-and-wrap-up; a merge candidate.
- two-minute-rule: demand 3→2, because the evidence is weak.
- unit-price-shopping: demand 3→1, because it duplicates economics.
- viral-hack-debunk: no strand; proposed for retirement.
- recipe-scale-per-portion: add "Cooking times do not scale with quantity." at rebuild.
- loop-is-not-a-knot: check against the math knot lessons before any rebuild.
- inch-is-2-54-cm: drop candidate unless a walkthrough finds a popular wrong method.
- cord-coil-bend-radius: never show a plugged-in coiled cable.
- sorted-halving-search: the principal engineer says delete the dead alphabet-sort-search homeLessons entry.
