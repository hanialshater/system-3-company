# Algorithms & Data Structures briefs (cm-cs-algorithms)

Ranked briefs for this strand, in the same format as `cs.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next cs` hands these out after the domain's own list. Check every brief's answer in node before adding it.

Written by cm-cs, 2026-10-13, after the founder asked for "much more on algorithms". TheAlgorithms/Python (MIT) was a source of topic ideas and a reference for checking how an algorithm runs. It is never a source of lesson content: no code listings, no copied code. Concepts are chosen and ordered by learner value and prerequisites, not by that repository's folders. Ranking: demand first, then prerequisite order (a brief comes after any brief it depends on), then a spread of formats. Every answer below was recomputed in node on 2026-10-13 (script kept in the cm-cs session scratchpad; builders must re-run their own check, per `cs.md` practice). Each brief says how it differs from its nearest existing lesson. No simulated review counts as learning evidence for any of these.

Revised 2026-10-14 by cm-cs-algorithms after interaction-design spec review: #3 (stack order), #13 (1-based position), #17 (graph), #24 (told sentence), #30 (DE = 3), #35 (5-letter pattern), #36 (unlock at first miss), #40 (pin moved). Each changed answer was re-run in node the same day.

Support types: **derivation** (worked by hand or proof), **simulation** (a script the verifier re-runs), **citation** (CLRS = Cormen, Leiserson, Rivest, Stein, *Introduction to Algorithms*, 3rd ed.; or the original paper).

### 1. ties-keep-their-order · concept: sort-stability · intro · demand 3
- Learner knows: sorting a hand by sliding cards left (insertion-by-hand) / does not know: that two sorting methods can give different results when items tie
- Misconception: Sorted is sorted: any correct sort of the same list gives the same list.
- Prediction: "Four students, listed alphabetically: Ana (B), Ben (A), Cal (B), Dee (A). You sort them by grade. Inside grade B, who comes first?" options: A) Ana, as before / B) Cal / C) It depends on the sorting method (answer: C). Check: insertion sort gives Ben, Dee, Ana, Cal; selection sort (swap the minimum into place) gives Ben, Dee, Cal, Ana (script).
- Key state: the learner has run both methods on the same four cards and sees grade B come out in two different orders; the reveal unlocks when both runs are finished.
- Interaction: two lanes share the four cards. In one, tap to slide the next card left past higher grades only; in the other, tap to swap the smallest remaining grade to the front. Ties are coloured by original position.
- Payoff: a stable sort never lets equal items pass each other, so sorting by one key keeps the order of the previous key. This is why "sort by name, then by grade" works in a spreadsheet.
- Claims to check: (1) the two outputs above (simulation). (2) Insertion sort is stable; selection sort with swaps is not (derivation from the swap above; CLRS 2.1, 8.2 for the definition of stability). (3) Sorting by a secondary key then stably by the primary key orders by both (derivation).
- Format: Side-by-side comparison
- Differs from: insertion-by-hand (counts slides, ignores ties). This lesson is about what happens to equal keys.

### 2. sorted-input-sinks-quicksort · concept: quicksort-worst-case · core · demand 3
- Learner knows: partitioning around a pivot (pivot-lands-home) / does not know: that the pivot rule decides the cost, and a sorted list is the worst case for "first card as pivot"
- Misconception: An already sorted list is the easiest thing to sort.
- Prediction: "Quicksort always uses the first card as its pivot. You give it 6 cards already in order. Compared with a shuffled hand, it does:" options: A) less work / B) about the same work / C) the most work possible (answer: C). Check: sorted 1..6 takes 15 comparisons, the maximum over all 720 orders; shuffled 3 4 1 6 2 5 takes 9; the average over all orders is 10.3 (script).
- Key state: the learner has partitioned the sorted hand step by step and sees each split leave 0 cards on one side; the reveal unlocks after the comparison counter reaches 15.
- Interaction: tap "split" to partition the current group around its first card; a comparison counter ticks; a toggle swaps between the sorted hand and the shuffled one.
- Payoff: on sorted input, a first-card pivot is always the smallest, so every split peels off one card and the work is n(n-1)/2. Picking the pivot at random makes this bad case vanishingly unlikely.
- Claims to check: (1) 15, 9 and 10.3 (simulation over all 720 permutations). (2) Worst case is Theta(n^2) when every split is maximally unbalanced (CLRS 7.2). (3) Randomized pivot gives expected O(n log n) on every input (CLRS 7.3, 7.4).
- Format: Before / after toggle
- Differs from: pivot-lands-home (one partition, pivot finds its final spot). This lesson is about the cost of a bad pivot over the whole run.
- Reference: TheAlgorithms/Python sorts/quick_sort.py

### 3. queue-or-stack-same-search · concept: bfs-vs-dfs-frontier · core · demand 3
- Learner knows: BFS spreads in waves (wave-from-the-corner) and DFS goes deep (maze-depth-first); stacks vs queues (back-button-stack) / does not know: that these are one algorithm with one line changed
- Misconception: Breadth-first and depth-first search are two different algorithms that must be learned separately.
- Prediction: "A search keeps a to-do list of places to visit. You swap the list from a queue (first in, first out) to a stack (last in, first out). What changes?" options: A) Nothing / B) The order places are visited / C) It no longer reaches every place (answer: B). Check: on the graph A-B, A-C, B-D, B-E, C-F, E-F from A, the queue visits A B C D E F and the stack visits A C F E B D (neighbours added in alphabetical order, a place marked when it joins the to-do list; marking when taken gives the same order here); both reach all six (script, re-run 2026-10-14). The earlier order A C F B E D only arises if edges are one-way.
- Key state: the learner has run the same graph twice, once with each to-do list, and sees two visit orders over the same six nodes; the reveal unlocks when both runs reach all nodes.
- Interaction: one graph; a to-do strip under it. Tap "take next" to pull from the front (queue) or the top (stack); a toggle switches the strip type and resets the run.
- Payoff: the search is the same; only which waiting place you take next changes. A queue finishes each ring before the next, which is why BFS finds fewest-hop routes and DFS does not.
- Claims to check: (1) queue order A B C D E F and stack order A C F E B D, with the neighbour-order and marking rule stated in the claim (simulation). Wording says the stack search "goes deep first", not "is exactly recursive DFS" (on this graph recursive DFS gives A B D E F C). (2) BFS with a queue visits in nondecreasing distance from the start and finds shortest paths in unweighted graphs (CLRS 22.2, Theorem 22.5). (3) Both visit every node reachable from the start (CLRS 22.2, 22.3).
- Format: Before / after toggle
- Differs from: wave-from-the-corner and maze-depth-first (each teaches one search). This lesson shows they are one algorithm.

### 4. knapsack-ratio-trap · concept: knapsack-01 · core · demand 3
- Learner knows: greedy can fail (coin-greedy-trap) / does not know: that "best value per kilo first" fails when items cannot be cut, and works when they can
- Misconception: Packing the best value-for-weight items first always fills a bag best.
- Prediction: "A bag holds 50 kg. Items: 10 kg worth $60, 20 kg worth $100, 30 kg worth $120. Whole items only. Best value per kilo first gives $160. What is the best possible?" options: A) $160 / B) $220 / C) $240 (answer: B). Check: all 8 subsets: 20 kg + 30 kg = $220 is the best that fits; greedy takes 10 + 20 and the 30 kg item no longer fits (script). $240 is the answer if items can be cut (fractional).
- Key state: the learner has packed greedily ($160, 20 kg empty), then tried swapping and found $220; the reveal unlocks once the bag holds $220.
- Interaction: drag items in and out of the bag; a weight gauge and a value readout update. A toggle "items can be cut" lets them pour in two thirds of the 30 kg item.
- Payoff: greedy by ratio is optimal when items can be cut, but whole items leave gaps, and filling the gap well needs you to consider combinations (dynamic programming).
- Claims to check: (1) $160, $220, $240 (simulation over subsets). (2) Greedy is optimal for fractional knapsack, not 0/1 (CLRS 16.2, this exact example, Figure 16.2). (3) 0/1 knapsack is solvable by dynamic programming in O(nW) (CLRS exercise 16.2-2).
- Format: Before / after toggle
- Differs from: coin-greedy-trap (coins, one dimension). This is two quantities, weight and value, and shows the fractional case where greedy wins.
- Reference: TheAlgorithms/Python knapsack/knapsack.py, greedy_methods/fractional_knapsack.py

### 5. flaw-to-lawn · concept: edit-distance · core · demand 3
- Learner knows: filling a grid from its neighbours (blocked-cell-routes) / does not know: how a spell checker measures "how different" two words are
- Misconception: Two words differ by the number of positions where their letters differ.
- Prediction: "FLAW and LAWN differ at all 4 positions. Using insert, delete or replace one letter at a time, how few edits turn FLAW into LAWN?" options: A) 4 / B) 2 / C) 1 (answer: B). Check: delete F, insert N; Levenshtein distance is 2 (script; KITTEN to SITTING is 3 as a control).
- Key state: the learner has filled the 5 x 5 grid, each cell the cheapest of its three neighbours plus one (or the diagonal free on a match), and the corner reads 2; the reveal unlocks there.
- Interaction: tap each grid cell in order to fill it; the cheapest neighbour lights up. Tap the corner to trace the edits back along the path.
- Payoff: the distance between whole words is built from distances between their beginnings, so a small grid replaces trying every edit sequence. Spell checkers and DNA alignment run this grid.
- Claims to check: (1) distance 2, positional mismatches 4 (simulation). (2) The recurrence (CLRS problem 15-5; Wagner and Fischer 1974, "The string-to-string correction problem", JACM). (3) The grid has (m+1)(n+1) cells, 25 here (arithmetic).
- Format: Storyboard / scrub
- Differs from: blocked-cell-routes (counts routes). Here each cell is a minimum, not a sum, and the cells compare letters.
- Reference: TheAlgorithms/Python strings/levenshtein_distance.py

### 6. caesar-falls-to-frequency · concept: frequency-analysis · intro · demand 3
- Learner knows: letters as positions in the alphabet (assumed) / does not know: that a cipher which keeps letter patterns leaks its key
- Misconception: A message shifted by a secret amount is unreadable without the key.
- Prediction: "In a long English message encrypted with a Caesar shift, the most common letter is X. What is the shift most likely to be?" options: A) 3 / B) 19 / C) 23 (answer: B). Check: E is the most common English letter; E (position 4) to X (position 23) is a shift of 19 (arithmetic; 23 is X's position, a distractor).
- Key state: the learner has turned the shift dial until the ciphertext's tallest bar lines up with E and the text becomes readable; the reveal unlocks when the plaintext appears.
- Interaction: a ciphertext of about 120 letters with its letter-count bars; a dial shifts the bars and the text together.
- Payoff: shifting renames letters but keeps how often each appears, so the most common symbol points to E. There are only 25 keys anyway, and frequency finds the right one first.
- Claims to check: (1) 19 (arithmetic). (2) E is the most frequent letter in typical English text (cite a corpus count, e.g. Lewand 2000, *Cryptological Mathematics*; verify on the lesson's own ciphertext by script). (3) A Caesar cipher has 25 non-trivial keys (derivation). (4) Frequency analysis is described by al-Kindi, 9th century (cite Singh, *The Code Book*, 1999, ch. 1).
- Format: Single card
- Differs from: every-message-is-possible (one-time pad, unbreakable). This is the opposite case: a cipher that leaks structure.
- Reference: TheAlgorithms/Python ciphers/decrypt_caesar_with_chi_squared.py

### 7. no-zip-shrinks-everything · concept: compression-limits · intro · demand 3
- Learner knows: bits (binary-numbers), compression by runs (runs-that-grow) / does not know: that no method can shrink every input
- Misconception: A clever enough compressor could make any file smaller.
- Prediction: "There are 8 different 3-bit files. Could one compressor turn every one of them into a shorter string (0, 1 or 2 bits) and still decompress each correctly?" options: A) Yes, with a clever code / B) No, there are not enough shorter strings / C) Yes, but only slowly (answer: B). Check: shorter strings number 1 + 2 + 4 = 7 < 8 (arithmetic).
- Key state: the learner has dragged each 3-bit file onto a distinct shorter slot and is left holding one file with nowhere to go; the reveal unlocks then.
- Interaction: 8 file tiles, 7 slots (empty string, 0, 1, 00, 01, 10, 11); drop a tile on a free slot; a slot takes only one tile.
- Payoff: there are 2^n files of n bits and only 2^n - 1 shorter strings, so any compressor that shrinks some files must grow others. Compression works because real files are not random.
- Claims to check: (1) 1 + 2 + 4 = 7 (arithmetic). (2) In general sum of 2^k for k < n is 2^n - 1 (derivation). (3) Lossless compression must map distinct inputs to distinct outputs (derivation, pigeonhole; cite MacKay, *Information Theory, Inference, and Learning Algorithms*, 2003, ch. 4).
- Format: Single card
- Differs from: runs-that-grow (RLE makes some inputs longer). This is the general limit for every compressor. Cross-category neighbour: math/thirteen-pigeons (the pigeonhole principle itself); this lesson applies it to files.

### 8. earliest-finish-wins · concept: interval-scheduling · core · demand 2
- Learner knows: greedy can fail (coin-greedy-trap) / does not know: which greedy rule is safe for booking a room
- Misconception: To fit the most talks into one room, pick the shortest talks, or the ones that start first.
- Prediction: "Talks: A 0-10, B 1-4, C 3-5, D 4-7. One room, no overlaps. Which rule fits the most talks?" options: A) Earliest start first / B) Shortest first / C) Earliest finish first (answer: C). Check: earliest start takes A only (1 talk); shortest takes C only (1); earliest finish takes B then D (2), the maximum (script over all subsets).
- Key state: the learner has run all three rules on the timeline and sees 1, 1 and 2 talks booked; the reveal unlocks when the third rule has run.
- Interaction: talks as bars on a timeline; tap a rule button and then tap "book next" to place talks one at a time; clashing bars grey out.
- Payoff: finishing earliest leaves the most room for everything after, and an exchange argument shows it is never worse than any other choice.
- Claims to check: (1) 1, 1, 2 and the maximum 2 (simulation). (2) Earliest finish time is optimal (CLRS 16.1, Theorem 16.1). (3) Shortest-first and earliest-start can fail (this counterexample, simulation).
- Format: Side-by-side comparison
- Differs from: coin-greedy-trap (greedy fails) and connect-the-towns-cheaply (greedy works). This shows that which greedy rule you pick matters.
- Reference: TheAlgorithms/Python greedy_methods/activity_selection.py

### 9. two-pointers-meet · concept: two-pointers · intro · demand 2
- Learner knows: what a sorted list is; binary search halves (binary-search) / does not know: that a sorted list lets you rule out a whole row of pairs with one check
- Misconception: To find two numbers that add to a target you must try every pair.
- Prediction: "Sorted list: 1 3 4 6 8 11 13 15. You look for two that add to 19, one finger at each end, moving the left finger right if the sum is too small and the right finger left if too big. At most how many sums could this ever take on 8 numbers?" options: A) 28 / B) 7 / C) 3 (answer: B). Check: each check moves a finger inward, so at most 7; for 19 it takes 3 (1+15, 3+15, 4+15); there are 28 pairs (script over all targets 0-35, max 7).
- Key state: the learner has moved the fingers to 4 + 15 = 19; the reveal unlocks there.
- Interaction: two finger markers; tap "sum" to read the total, then tap "move left finger" or "move right finger". The ruled-out pairs grey out in a small 8 x 8 grid behind.
- Payoff: because the list is sorted, a sum that is too small rules out the smallest number with every partner at once, so n numbers need at most n - 1 checks instead of n(n-1)/2.
- Claims to check: (1) 3 checks, max 7, 28 pairs (simulation). (2) Correctness: no valid pair is skipped (derivation; cite CLRS exercise 2.3-7 for the problem).
- Format: Single card
- Differs from: binary-search (one target value). This finds a pair and introduces the pairs grid.

### 10. tortoise-meets-hare · concept: cycle-detection · core · demand 2
- Learner knows: a linked list as boxes with arrows (insert-at-front-cost) / does not know: how to tell a looping list from a long one without remembering every box
- Misconception: To detect a loop you must remember every box you have visited.
- Prediction: "A chain of 7 boxes may loop back on itself. One marker moves 1 box per tick, another 2. If there is a loop, will they ever land on the same box?" options: A) Yes, always / B) Only if the loop length is even / C) No, the fast one can jump over (answer: A). Check: for tails 0-10 and loops 1-10 they always meet; with tail 2 and loop 5 they meet after 5 ticks (script).
- Key state: the learner has stepped both markers until they share a box; the reveal unlocks there.
- Interaction: tap "tick" to advance both markers; a toggle chooses where the last arrow points (to box 3, or nowhere).
- Payoff: inside the loop the fast marker gains one box per tick, so the gap shrinks by one each time and cannot skip over zero. Two markers and no memory are enough.
- Claims to check: (1) always meet; 5 ticks (simulation). (2) Floyd's cycle-finding (Knuth, *TAOCP* Vol. 2, 3.1, exercise 6, attributing it to Floyd). (3) Gap shrinks by 1 per tick (derivation).
- Format: Storyboard / scrub
- Differs from: insert-at-front-cost (cost of inserting). Nearest by name is none; this is the first pointer-chasing lesson.
- Reference: TheAlgorithms/Python data_structures/linked_list/floyds_cycle_detection.py

### 11. trie-word-length-not-count · concept: trie · core · demand 2
- Learner knows: search trees (lopsided-tree) / does not know: a tree where you branch on letters instead of comparing whole words
- Misconception: Looking up a word gets slower as the dictionary grows.
- Prediction: "A letter tree holds 10 words. You add 990 more. How many steps does checking for 'cat' now take?" options: A) About 100 times more / B) About 10 times more / C) The same 3 steps (answer: C). Check: one step per letter, 3 with 10 words and 3 with 1,000 (script).
- Key state: the learner has walked c, a, t down the tree twice, before and after the big insert; the reveal unlocks after the second walk.
- Interaction: tap letters to walk down; a button bulk-adds words (the tree grows sideways); a step counter.
- Payoff: each step picks the next letter, so the cost is the word's length, not the number of words. That is why autocomplete is instant.
- Claims to check: (1) 3 and 3 (simulation). (2) Tries (Fredkin 1960, "Trie memory", CACM; Knuth Vol. 3, 6.3). (3) Lookup time O(length) with a fixed alphabet (derivation).
- Format: Before / after toggle
- Differs from: lopsided-tree and in-order-is-sorted (comparison trees). This tree branches on letters.
- Reference: TheAlgorithms/Python data_structures/trie/trie.py

### 12. fair-shuffle-trap · concept: fisher-yates-shuffle · core · demand 2
- Learner knows: counting orders of 3 cards (6) (assumed, shown on stage) / does not know: that a plausible shuffle can be unfair
- Misconception: Swapping each card with a random position gives a fair shuffle.
- Prediction: "Shuffle A B C: for each position, swap its card with any of the 3 positions. That is 27 equally likely runs. Is every order equally likely?" options: A) Yes / B) No, some orders come up more / C) Only if you repeat it (answer: B). Check: 27 runs over 6 orders cannot divide evenly; counts are ABC 4, ACB 5, BAC 5, BCA 5, CAB 4, CBA 4 (script).
- Key state: the learner has stepped through enough of the 27 runs (by the run button, seeded) to see the tally bars split into 4s and 5s; then switches to the fair method (3 x 2 x 1 = 6 runs, one per order).
- Interaction: "all 27 runs" fills a tally of the 6 orders; a step button shows one run; a toggle switches to "swap only with a card not yet placed".
- Payoff: an unbiased shuffle must have a number of equally likely runs that the number of orders divides. Fisher-Yates has exactly n! runs, one per order.
- Claims to check: (1) the counts (simulation, exhaustive, no randomness). (2) Fisher-Yates gives each permutation probability 1/n! (Knuth Vol. 2, 3.4.2, Algorithm P; CLRS 5.3, RANDOMIZE-IN-PLACE). (3) 27 is not a multiple of 6 (arithmetic).
- Format: Simulation run
- Differs from: probability lessons on fair dice. This is about an algorithm's bias, counted exactly.
- Reference: TheAlgorithms/Python other/fischer_yates_shuffle.py

### 13. interpolation-guesses-the-page · concept: interpolation-search · core · demand 2
- Learner knows: binary search opens the middle (binary-search) / does not know: that you can aim by value, and that it backfires on uneven data
- Misconception: Opening the middle is always the fastest way to search a sorted list.
- Prediction: "100 sorted values 10, 20, ..., 1000. You look for 730 by guessing its position from its value. How many looks?" options: A) 1 / B) 7 / C) 10 (answer: A). Check: (730 - 10) / (1000 - 10) x 99 = 72, which is index 72 counting from 0, the 73rd value (10 x 73 = 730); binary search (mid = floor((lo + hi) / 2)) needs 6 looks for 730 and at most 7 (script, re-run 2026-10-14). Learner-facing text says "the 73rd value".
- Key state: the learner has found 730 in one look on the even list, then switched to the uneven list (cubes 1, 8, ..., 1,000,000) and watched some searches need many more looks; the reveal unlocks after both.
- Interaction: tap "guess" to probe; a toggle switches the list from evenly spread to cubes; a look counter.
- Payoff: aiming by value is like opening a dictionary near the back for "W": brilliant when values are spread evenly, and worse than halving when they are not (up to 21 looks on the cube list, against 7 for binary search).
- Claims to check: (1) 1 look, at the 73rd value; binary 6, max 7 (floor midpoint, state the convention); cubes up to 21 looks, at 9,261 (simulation). (2) Expected O(log log n) on uniform data (Perl, Itai, Avni 1978, "Interpolation search: a log log N search", CACM). (3) Worst case O(n) (derivation).
- Format: Before / after toggle
- Differs from: binary-search and bisect-the-bad-commit (pure halving). This aims by value.
- Reference: TheAlgorithms/Python searches/interpolation_search.py

### 14. last-digit-first · concept: radix-sort · core · demand 2
- Learner knows: sorting into buckets (sorting-without-comparing) and stable sorting (ties-keep-their-order, #1) / does not know: that sorting by the least important digit first works
- Misconception: To sort numbers digit by digit you must start with the first (biggest) digit.
- Prediction: "329 457 657 839 436 720 355. You sort by the last digit, then the middle digit, then the first, each time keeping ties in their current order. At the end the list is:" options: A) fully sorted / B) sorted by first digit only / C) scrambled (answer: A). Check: 329 355 436 457 657 720 839 (script). Doing the passes first digit to last instead ends sorted by last digit only: 720 355 436 457 657 329 839.
- Key state: the learner has dealt the cards into 10 digit buckets three times and collected them; the reveal unlocks after the third pass.
- Interaction: tap each card to drop it in its digit bucket, then "collect" in bucket order; a toggle flips the pass order to first-digit-first for comparison.
- Payoff: each later pass decides the order, and stability keeps the earlier passes' work for ties, so the most important digit has the last word. Three passes for any number of three-digit numbers.
- Claims to check: (1) both outputs (simulation). (2) LSD radix sort is correct when each pass is stable (CLRS 8.3, Lemma 8.3; this is CLRS Figure 8.3's input). (3) Time O(d(n + k)) (CLRS 8.3).
- Format: Storyboard / scrub
- Differs from: sorting-without-comparing (one bucket pass, small values). This chains passes and depends on stability.
- Reference: TheAlgorithms/Python sorts/radix_sort.py

### 15. probing-clusters-grow · concept: open-addressing · core · demand 2
- Learner knows: hash tables and collisions (hash-bucket-pileup) / does not know: that "try the next slot" makes full stretches grow faster
- Misconception: In a table where collisions go to the next free slot, every empty slot is equally likely to be filled next.
- Prediction: "10 slots; 2, 3, 4 and 7 are full. A new key hashes to a random slot and, if full, moves right to the next free one. Which empty slot is most likely to receive it?" options: A) All equally likely / B) Slot 5 / C) Slot 8 (answer: B). Check: slot 5 receives hashes 2, 3, 4, 5 (4 in 10); slot 8 receives 7 and 8 (2 in 10); others 1 in 10 (script).
- Key state: the learner has inserted keys one at a time (seeded) and seen the 2-4 run swallow its neighbours; the reveal unlocks when a cluster reaches 5 slots.
- Interaction: tap "insert key"; the hashed slot flashes, the probe walks right; a shaded overlay shows each empty slot's catch area.
- Payoff: a run of full slots catches every key that hashes anywhere into it, so long runs grow fastest (primary clustering). Probe lengths blow up as the table fills.
- Claims to check: (1) 4/10, 2/10, 1/10 (simulation, exhaustive over hash values). (2) Primary clustering in linear probing (CLRS 11.4). (3) Expected probes for an unsuccessful search about (1 + 1/(1-a)^2)/2 at load a (Knuth Vol. 3, 6.4).
- Format: Simulation run
- Differs from: hash-bucket-pileup (chaining, when the first collision comes) and bad-hash-one-bucket (bad hash). This is collision handling by probing.
- Reference: TheAlgorithms/Python data_structures/hashing/hash_table.py

### 16. deleted-key-breaks-search · concept: hash-deletion-tombstones · core · demand 2
- Learner knows: linear probing (probing-clusters-grow, #15) / does not know: that emptying a slot can hide keys stored past it
- Misconception: Deleting from a hash table just means emptying the key's slot.
- Prediction: "A, B and C all hash to slot 1 and sit in slots 1, 2, 3. You delete B by emptying slot 2. Now you search for C. What happens?" options: A) C is found in slot 3 / B) The search says C is not there / C) The search finds B (answer: B). Check: probe slot 1 (A, not C), slot 2 empty, stop: not found (script).
- Key state: the learner has deleted B, searched for C and seen it missed; then deleted with a "gone" marker instead and found C; the reveal unlocks after the second search.
- Interaction: tap a key to delete it; a toggle chooses "empty the slot" or "leave a gone marker"; tap "search C" to watch the probe.
- Payoff: an empty slot means "the chain ends here", so deleting must leave a marker that says "keep looking". Too many markers slow the table until it is rebuilt.
- Claims to check: (1) the not-found result (simulation). (2) Deletion in open addressing uses a DELETED marker (CLRS 11.4). (3) Search time then no longer depends on load factor alone (CLRS 11.4).
- Format: Before / after toggle
- Differs from: probing-clusters-grow (#15), which inserts. This deletes, and the bug is the lesson.

### 17. negative-edge-fools-dijkstra · concept: negative-edge-weights · core · demand 2
- Learner knows: settling the cheapest node first (cheapest-is-not-shortest) / does not know: that "settled" is only final when no road has negative cost
- Misconception: Dijkstra's cheapest-first rule always finds the cheapest route.
- Prediction: "Roads: S to A costs 2, S to B costs 3, A to C costs 2, and B to A is a refund of 2 (cost -2). Settling the cheapest town first locks A at 2 and goes on to C. What is the true cheapest cost to C?" options: A) 4 / B) 3 / C) 2 (answer: B). Check: S to B to A to C is 3 - 2 + 2 = 3. Cheapest-first reports C = 4 in every standard version: a version that never updates a settled town ends A = 2, C = 4; CLRS DIJKSTRA (relaxes every road out of each extracted node, no settled check) ends A = 1 but C = 4, because A was already extracted and its road to C is not revisited. Settling order is S, A, B, C with no ties. Bellman-Ford with roads checked B-A, A-C, S-A, S-B gives A 2, B 3, C 4 after pass 1 and A 1, B 3, C 3 after pass 2 (script, re-run 2026-10-14; graph changed from the first draft, which had no road out of A and so depended on the implementation).
- Key state: the learner has settled A at 2 and C at 4, then relaxed the B to A road and seen 1 arrive too late to reach C; then re-run "relax every road, twice" and seen C at 3.
- Interaction: tap the unsettled town with the smallest label; then "pass 1" and "pass 2" buttons for the second method; labels update.
- Payoff: cheapest-first assumes nothing later can make a settled town cheaper, which fails when some road subtracts. Relaxing every road n - 1 times (Bellman-Ford) is slower but makes no such assumption.
- Claims to check: (1) Cheapest-first labels S 0, A 2 or 1 (by version), B 3, C 4; Bellman-Ford C 3 (simulation, both Dijkstra versions run). (2) Dijkstra is correct only for non-negative weights (CLRS 24.3). (3) Bellman-Ford handles negative weights and detects negative cycles (CLRS 24.1; Bellman 1958). Wording: "cheapest-first reports 4 for C" holds for every standard version; do not claim a particular label for A.
- Format: Side-by-side comparison
- Differs from: cheapest-is-not-shortest, which mentions negative weights in one claim only. This makes the failure the lesson.
- Reference: TheAlgorithms/Python graphs/bellman_ford.py

### 18. a-star-heads-for-goal · concept: a-star-search · core · demand 2
- Learner knows: Dijkstra (cheapest-is-not-shortest) and BFS as a queue (queue-or-stack-same-search, #3) / does not know: that a guess of the distance left can focus the search
- Misconception: To find the shortest route you have to spread out in every direction until you hit the goal.
- Prediction: "Open 7 x 7 grid, start at the middle of the left edge, goal at the middle of the right edge. Search ranked by 'steps so far + straight-line-ish steps left'. How many cells does it settle?" options: A) 7 / B) 25 / C) 49 (answer: A). Check: with Manhattan distance and ties broken toward more steps taken, A* settles 7 cells; Dijkstra settles 31 (script).
- Key state: the learner has run plain cheapest-first (rings flood out) and then the guided version (a straight line); the reveal unlocks after both reach the goal.
- Interaction: tap "settle next" or hold to auto-step (with a step button); a toggle turns the distance-left guess on and off; drag a wall onto the grid to see the guided search bend around it.
- Payoff: adding an honest underestimate of the distance left points the search at the goal without losing the guarantee of a shortest route.
- Claims to check: (1) 7 and 31 settled cells (simulation, tie-break rule disclosed). (2) A* is optimal with an admissible heuristic (Hart, Nilsson, Raphael 1968, IEEE Trans. SSC). (3) Manhattan distance never overestimates on a 4-way grid (derivation).
- Format: Before / after toggle
- Differs from: wave-from-the-corner (BFS) and cheapest-is-not-shortest (Dijkstra). This adds the goal-directed estimate.
- Reference: TheAlgorithms/Python graphs/a_star.py

### 19. ways-to-make-ten · concept: coin-change-ways · core · demand 2
- Learner knows: filling a table from smaller cases (blocked-cell-routes) / does not know: that counting combinations means fixing an order of coins
- Misconception: Counting ways to pay 10 with coins 1, 2 and 5 is the same as counting sequences of coins.
- Prediction: "Coins 1, 2 and 5. In how many ways can you make 10, if 5+5 and 2+2+2+2+2 count, and 1+2 is the same as 2+1?" options: A) 4 / B) 10 / C) 128 (answer: B). Check: combinations 10; ordered sequences 128 (script).
- Key state: the learner has filled a row of totals 0-10 for coin 1, then coin 2, then coin 5, and the 10 cell reads 10; the reveal unlocks there.
- Interaction: a 3 x 11 table; tap each cell to add "ways without this coin" + "ways with one more of this coin"; a toggle "order matters" switches the loop and the cell reads 128.
- Payoff: adding coins one kind at a time counts each mix once; letting every coin go in any position counts orderings instead, which grows much faster.
- Claims to check: (1) 10 and 128 (simulation). (2) The recurrence (CLRS ch. 15 method; Pólya's generating function for change-making, Pólya 1956, "On picture-writing", Amer. Math. Monthly).
- Format: Storyboard / scrub
- Differs from: coin-greedy-trap (fewest coins, greedy). This counts ways and teaches the order-of-loops idea.

### 20. drop-the-losing-start · concept: max-subarray · core · demand 2
- Learner knows: a running total (assumed) / does not know: that a negative running total can be thrown away
- Misconception: To find the best stretch of days you must check every start and end pair.
- Prediction: "Daily gains: -2 1 -3 4 -1 2 1 -5 4. What is the biggest total over a run of consecutive days?" options: A) 4 / B) 6 / C) 12 (answer: B). Check: 4 -1 2 1 = 6; one pass with reset gives 6; all 45 start-end pairs give 6 (script; 12 is the sum of all positives).
- Key state: the learner has walked the running total, pressed "start over" whenever it went negative, and the best-so-far reads 6; the reveal unlocks at the end of the row.
- Interaction: tap "next day" to add a day; tap "start over" to reset the running total to zero; a best-so-far marker.
- Payoff: a stretch that has gone negative can only drag down whatever follows, so you drop it. One pass replaces 45 pairs (Kadane's algorithm).
- Claims to check: (1) 6 and 45 (simulation). (2) Linear-time maximum subarray (Bentley 1984, "Programming Pearls: algorithm design techniques", CACM, crediting Kadane; CLRS exercise 4.1-5).
- Format: Storyboard / scrub
- Differs from: no existing lesson covers this. Nearest in spirit is quadratic-wall (all pairs is n^2).
- Reference: TheAlgorithms/Python dynamic_programming/max_subarray_sum.py

### 21. shortest-job-first-wait · concept: shortest-job-first · intro · demand 2
- Learner knows: a queue (back-button-stack) / does not know: that the order of jobs changes the total waiting
- Misconception: The total time people spend waiting is the same whatever order the jobs run in.
- Prediction: "Four print jobs take 8, 4, 2 and 1 minutes. Run in that order, the jobs wait a total of 34 minutes before starting. Shortest first, the total wait is:" options: A) the same 34 / B) about a third of it / C) a little less (answer: B). Check: 0 + 8 + 12 + 14 = 34; 0 + 1 + 3 + 7 = 11; 11/34 = 0.32 (arithmetic).
- Key state: the learner has reordered the four jobs and seen the wait readout fall to 11; the reveal unlocks there.
- Interaction: drag job blocks in the queue; a timeline shows each job's wait as a shaded bar, and the total updates.
- Payoff: a long job at the front makes everyone behind it wait, so shortest first minimises total waiting. The catch: a long job can wait forever if short ones keep arriving.
- Claims to check: (1) 34 and 11 (arithmetic). (2) Shortest processing time first minimises total completion time on one machine (Smith 1956, "Various optimizers for single-stage production", Naval Research Logistics Quarterly; exchange argument, derivation). (3) Starvation of long jobs (derivation).
- Format: Single card
- Differs from: back-button-stack (queue order). This is about choosing the order.
- Reference: TheAlgorithms/Python scheduling/shortest_job_first.py

### 22. glider-walks · concept: game-of-life · intro · demand 2 [exploration]
- Learner knows: a grid of cells (assumed) / does not know: that tiny local rules can make something that travels
- Misconception: Simple rules about neighbours can only make simple, static or dying patterns.
- Prediction: "Five live cells in a glider shape. Each step: a live cell with 2 or 3 live neighbours lives; an empty cell with exactly 3 comes alive; everything else dies. After 4 steps the shape is:" options: A) gone / B) the same shape, moved one cell diagonally / C) grown to 10 cells (answer: B). Check: 5 cells at every step; after 4 steps it is the original shifted by (1, 1) (script).
- Key state: the learner has stepped 4 generations by hand, applying the rule cell by cell for step one, and sees the shape reappear one cell over.
- Interaction: tap cells to toggle them; tap "step" (one generation); neighbour counts can be shown on each cell.
- Payoff: no rule says "move", yet the pattern travels. Conway's Game of Life can even compute anything a computer can.
- Claims to check: (1) 5 cells each step and shift (1, 1) after 4 (simulation). (2) Rules and glider (Gardner 1970, "Mathematical Games", Scientific American, October). (3) Life is Turing complete (Berlekamp, Conway, Guy, *Winning Ways*, 1982, ch. 25).
- Format: Storyboard / scrub
- Differs from: turnstile-remembers-state (one machine). This is many identical machines on a grid.
- Reference: TheAlgorithms/Python cellular_automata/conways_game_of_life.py

### 23. four-queens-pruning · concept: n-queens-backtracking · core · demand 2
- Learner knows: backing up in a maze (maze-depth-first) / does not know: how much backing up early saves
- Misconception: Solving a placement puzzle means checking every arrangement.
- Prediction: "Place 4 queens, one per row, so none attack. There are 256 one-per-row boards. Placing a queen only on a safe square and backing up when a row has none, how many placements does finding every solution take?" options: A) 16 / B) 64 / C) 256 (answer: A). Check: 16 safe placements in total, 8 to reach the first solution, 2 solutions (script).
- Key state: the learner has placed and removed queens until both solutions are found; the reveal unlocks at the second solution.
- Interaction: tap a square in the current row to place a queen; attacked squares shade; "back up" removes the last queen. A placement counter.
- Payoff: a clash is noticed after the first two queens, which cuts off every board that starts that way. Pruning early is what makes search feasible: 8 queens has 16,777,216 one-per-row boards but backtracking makes 2,056 safe placements to find all 92 solutions.
- Claims to check: (1) 16, 8, 2 (simulation). (2) 8^8 = 16,777,216 (arithmetic). (3) 2,056 safe placements for 8 queens, all solutions, one queen per row (simulation, same counting rule). (4) 92 solutions for 8 queens (simulation; Wirth 1971, "Program development by stepwise refinement", CACM).
- Format: Single card
- Differs from: maze-depth-first (DFS with dead ends). This counts what pruning saves.
- Reference: TheAlgorithms/Python backtracking/n_queens.py

### 24. tic-tac-toe-is-a-draw · concept: minimax · core · demand 2
- Learner knows: a function that calls itself (hanoi-tower-doubles) / does not know: how a game can be solved by working back from the end
- Misconception: In noughts and crosses the first player, playing perfectly, wins.
- Prediction: "If both players play perfectly from an empty board, who wins?" options: A) X, who moves first / B) O / C) Nobody, it is a draw (answer: C). Check: full memoized minimax over all 5,478 reachable positions gives value 0, and each first move (corner, edge, centre) is worth 0; there are 255,168 complete games (131,184 X wins, 77,904 O wins, 46,080 draws) (script, re-run 2026-10-14).
- Key state: the learner has scored a 3-empty-square endgame tree by hand (leaves win/lose/draw, then X takes the max and O the min up the tree) and seen the root value; the reveal unlocks there.
- Interaction: a small game tree from one endgame; tap a node to fill its value from its children; the board preview shows each move.
- Payoff: scoring every ending and letting each player pick their best move upward solves the game. It is a draw; chess is too big to finish this way. Stage limit, accepted: the stage can show only the endgame scoring, so one reveal sentence is told, not shown ("the same two rules, run by computer over all 255,168 games from the empty board, give a draw at the top too"). It is recorded as claim (4) below with simulation support, not as a demonstrated step.
- Claims to check: (1) value 0 (simulation, memoized full search). (2) Minimax (von Neumann 1928, "Zur Theorie der Gesellschaftsspiele", Math. Annalen; Russell and Norvig, *AIMA*, 5.2). (3) The endgame tree values: for X O X / O O . / . X . with X to move, X plays 5 gives draw, plays 6 gives O win, plays 8 gives O win, top value draw (simulation). (4) Told, not shown: the empty board has value 0 over 255,168 games (simulation, full memoized search; builder re-runs it).
- Format: Storyboard / scrub
- Differs from: maze-depth-first (one searcher). Here two players alternate max and min.
- Reference: TheAlgorithms/Python backtracking/minimax.py

### 25. rsa-lock-with-public-key · concept: rsa-trapdoor · stretch · demand 2
- Learner knows: public key idea (paint-mix-shared-secret), fast powers (squaring-shortcut) and remainders / does not know: how a published key can lock but not unlock
- Misconception: If everyone knows how to lock a message, everyone can work out how to unlock it.
- Prediction: "Public key: n = 55, e = 3. You lock 2 as 2^3 mod 55 = 8. Who can unlock 8?" options: A) Anyone with the public key / B) Only someone who knows 55 = 5 x 11 / C) Nobody (answer: B). Check: with 5 x 11 you get (5-1)(11-1) = 40 and d = 27, since 3 x 27 = 81 = 2 x 40 + 1; 8^27 mod 55 = 2; this round-trips every m from 0 to 54 (script).
- Key state: the learner has locked a number with e = 3, tried to unlock with e = 3 again (wrong), then entered the factors and unlocked with d = 27; the reveal unlocks after a successful unlock.
- Interaction: number dial for the message; "lock" and "unlock" buttons; a factor input (5 and 11) that reveals d.
- Payoff: locking only needs n and e, but unlocking needs d, and d comes from the factors of n. Multiplying is easy and factoring is not, so real keys use primes hundreds of digits long.
- Claims to check: (1) 8, d = 27, round trip for all m (simulation). (2) RSA (Rivest, Shamir, Adleman 1978, CACM; CLRS 31.7). (3) No efficient classical factoring algorithm is known (state as "known"; cite CLRS 31.7).
- Format: Single card
- Differs from: paint-mix-shared-secret (Diffie-Hellman key agreement). This is encryption with a trapdoor. Overlap note: also belongs to the security strand; cm-cs-security should cross-list rather than re-brief.
- Reference: TheAlgorithms/Python ciphers/rsa_cipher.py

### 26. two-eggs-hundred-floors · concept: egg-drop · stretch · demand 2 [exploration]
- Learner knows: binary search (binary-search) and reusing answers (fib-call-explosion) / does not know: that halving is wrong when you can only fail once or twice
- Misconception: With two eggs you should start halfway up and halve.
- Prediction: "Find the highest safe floor in a 100-floor building with 2 eggs; a broken egg is gone. What is the fewest drops that always works?" options: A) 7 / B) 14 / C) 50 (answer: B). Check: with k drops and 2 eggs you can cover k(k+1)/2 floors; 13 covers 91, 14 covers 105 (derivation; DP script gives 14).
- Key state: the learner has tried the "halve" plan (worst case 50 drops after the first egg breaks at 50), then the "14, 27, 39 ..." plan and seen its worst case stay at 14.
- Interaction: tap a floor to drop; an adversary picks the worst outcome; a drop counter; a toggle between "start at 50" and "start at 14".
- Payoff: each drop of the first egg should leave one fewer floor to check one at a time, so gaps shrink 14, 13, 12. Losing an egg changes the right strategy.
- Claims to check: (1) 14 (simulation by DP; derivation k(k+1)/2 >= 100). (2) Halving worst case: 1 + 49 = 50 drops (derivation). (3) Cite the problem's standard treatment (Konhauser, Velleman, Wagon, *Which Way Did the Bicycle Go?*, 1996, problem 77).
- Format: Side-by-side comparison
- Differs from: binary-search (unlimited failures). Here failures are limited.
- Reference: TheAlgorithms/Python dynamic_programming/egg_dropping.py

### 27. patience-piles · concept: longest-increasing-subsequence · core · demand 2
- Learner knows: sorted order (insertion-by-hand) / does not know: that a card game finds the longest rising run with skips
- Misconception: The longest rising sequence starts at the smallest number.
- Prediction: "Cards 3 1 4 1 5 9 2 6. Pick cards left to right, skipping any, so each is bigger than the last. What is the longest possible?" options: A) 3 / B) 4 / C) 5 (answer: B). Check: e.g. 3 4 5 9 or 1 4 5 6; DP gives 4 and patience sorting makes 4 piles (script).
- Key state: the learner has dealt every card onto the leftmost pile whose top is not smaller, opening a new pile when none fits, and counted 4 piles; the reveal unlocks when the last card is dealt.
- Interaction: tap each card in turn and tap the pile it goes on (wrong piles refuse); a pile counter; tap a pile to trace a longest run back.
- Payoff: the number of piles equals the longest rising run, and it can start with 3, not the smallest card. The game takes one pass and a few looks per card.
- Claims to check: (1) 4 and 4 piles (simulation). (2) Piles equal LIS length (Aldous and Diaconis 1999, "Longest increasing subsequences: from patience sorting to the Baik-Deift-Johansson theorem", Bull. AMS). (3) O(n log n) with binary search on pile tops (same source; CLRS exercise 15.4-6).
- Format: Single card
- Differs from: insertion-by-hand (sorting). This finds a subsequence.
- Reference: TheAlgorithms/Python dynamic_programming/longest_increasing_subsequence_o_nlogn.py

### 28. median-without-sorting · concept: quickselect · core · demand 2
- Learner knows: partitioning around a pivot (pivot-lands-home) / does not know: that you can throw away the side the answer is not on
- Misconception: To find the middle value you must sort everything first.
- Prediction: "Find the median of 9 cards 7 2 9 4 1 8 5 3 6 by splitting around a pivot. After each split you:" options: A) split both sides, as in sorting / B) keep only the side holding the median / C) keep the bigger side (answer: B). Check: splits around 7, 2, 4, 5 find 5 using 17 comparisons; the cards 8 and 9 are never touched again (script).
- Key state: the learner has split around the first card, discarded the side without position 5, and repeated until the pivot lands at position 5; the reveal unlocks there.
- Interaction: tap "split" on the current group; tap the side to keep (the wrong side is refused with the position count shown); discarded cards fade.
- Payoff: discarding a side each time costs n + n/2 + n/4 + ..., about 2n on average, instead of n log n. At 9 cards the gap is small (17 against 18 comparisons); on 1,000 shuffled cards it is about 3,460 against 11,000.
- Claims to check: (1) 17 and 18 comparisons with first-card pivots (simulation). (2) n = 1000 averages 3,465 and 11,003 over seeds 1-50, mulberry32, disclosed (simulation). (3) Expected linear time (CLRS 9.2; Hoare 1961, "Algorithm 65: Find", CACM).
- Format: Single card
- Differs from: pivot-lands-home and sorted-input-sinks-quicksort (#2), which recurse both sides.
- Reference: TheAlgorithms/Python searches/quick_select.py

### 29. heapify-from-the-bottom · concept: build-heap-linear · core · demand 1
- Learner knows: bubbling a new item up a heap (heap-bubble-up) / does not know: that building a whole heap at once is cheaper than inserting one by one
- Misconception: Building a heap of n items costs n insertions, each up to the full height.
- Prediction: "Cards 1 to 7 in increasing order. Turn them into a heap with the biggest on top by sifting each parent down, starting from the last parent. How many swaps?" options: A) 4 / B) 7 / C) 10 (answer: A). Check: bottom-up gives 4 swaps (and 4 is the maximum over all 5,040 orders); inserting 1..7 one by one with bubble-up gives 10 (script).
- Key state: the learner has sifted the three parents in order and sees the heap 7 5 6 4 2 1 3; the reveal unlocks when the root is fixed.
- Interaction: tap a parent to sift it down one level at a time; a swap counter; a toggle runs the insert-one-by-one version for comparison.
- Payoff: half the nodes are leaves and never move, a quarter move at most once, and so on, so building from the bottom totals less than 2n swaps.
- Claims to check: (1) 4, the heap, 10, max 4 (simulation). (2) BUILD-MAX-HEAP is O(n) (CLRS 6.3). (3) Floyd 1964, "Algorithm 245: Treesort 3", CACM.
- Format: Side-by-side comparison
- Differs from: heap-bubble-up (insert one). This builds all at once, bottom up.
- Reference: TheAlgorithms/Python sorts/heap_sort.py

### 30. any-start-same-tree · concept: prim-mst · core · demand 1
- Learner knows: cheapest-first cables without loops (connect-the-towns-cheaply) / does not know: that growing from one town also works, from any town
- Misconception: Grow the network from a different town and you end up with a different total cost.
- Prediction: "Cables: AB 4, AC 1, BC 2, BD 5, CD 8, CE 10, DE 3, BE 6. Grow from town A, always adding the cheapest cable to a new town. A friend starts from E. Whose network is cheaper?" options: A) Yours / B) Your friend's / C) The same (answer: C). Check: both get AC, BC, BD, DE, total 11; starts B, C, D give the same four cables; all eight costs are distinct, and of the 40 spanning trees the next cheapest costs 12 (script, re-run 2026-10-14; DE changed from 2 to 3 because BC = DE = 2 broke the distinct-costs claim).
- Key state: the learner has grown both networks and sees identical cables; the reveal unlocks when both are complete.
- Interaction: tap "start here" on a town, then tap the cheapest cable leaving the grown part (wrong ones refused); a second panel for the friend.
- Payoff: the cheapest cable across any split is always safe (the cut property), so it does not matter where you start. With distinct costs the cheapest network is unique.
- Claims to check: (1) both trees and total 11 (simulation). (2) Cut property and Prim's algorithm (CLRS 23.1 Theorem 23.1, 23.2; Prim 1957, Bell System Tech. J.). (3) Uniqueness with distinct weights (CLRS exercise 23.1-6).
- Format: Side-by-side comparison
- Differs from: connect-the-towns-cheaply (Kruskal, global cheapest-first). This grows one tree.
- Reference: TheAlgorithms/Python graphs/minimum_spanning_tree_prims.py

### 31. union-find-shortcut · concept: union-find · core · demand 1
- Learner knows: trees (in-order-is-sorted) and the loop check in Kruskal (connect-the-towns-cheaply) / does not know: how a program answers "are these two already connected?" quickly
- Misconception: To check whether two people are in the same group you have to trace through everyone.
- Prediction: "8 people merge into groups, always hanging the smaller group under the bigger group's leader. In the worst case, how many hops from anyone up to their leader?" options: A) 7 / B) 3 / C) 1 (answer: B). Check: pairing merges give height 3; 20,000 random merge sequences never exceed 3 (script); log2 8 = 3.
- Key state: the learner has merged groups to build the tallest tree they can and could not beat 3 hops; the reveal unlocks after the last merge.
- Interaction: tap two people to merge their groups; the smaller tree hangs under the bigger root; a "find leader" tap shows the hop count.
- Payoff: a person's hop count only grows when their group at least doubles, so it is at most log2 n. Adding "point straight at the leader after a lookup" makes it nearly constant.
- Claims to check: (1) height 3 (simulation, seeds disclosed). (2) Union by size bounds height by log2 n (derivation; CLRS 21.3, exercise 21.4-2). (3) With path compression, inverse-Ackermann amortized cost (Tarjan 1975, JACM; CLRS 21.4).
- Format: Single card
- Differs from: lopsided-tree (search trees going tall). Here trees stay short by rule.
- Reference: TheAlgorithms/Python data_structures/disjoint_set/disjoint_set.py

### 32. start-after-the-deficit · concept: gas-station-circuit · core · demand 1 [exploration]
- Learner knows: running totals (drop-the-losing-start, #20) / does not know: that one pass finds where a round trip can start
- Misconception: To find where you can start a circular trip you must try every starting point.
- Prediction: "Five fuel stops round a loop. Fuel gained minus fuel used on the next leg: A +1, B -3, C +4, D -2, E +1. Where can you start with an empty tank and get all the way round?" options: A) A / B) C / C) E (answer: B). Check: only C works; the running total from A is lowest right after B, so start at C (script).
- Key state: the learner has run the running total once from A, found its lowest point, and started at the next stop to complete the loop; the reveal unlocks on completion.
- Interaction: tap a stop to start there; a fuel gauge drives round; it stalls if fuel goes below zero. A running-total chart shows the dip.
- Payoff: if the total is not negative, starting just after the deepest dip means you never go below it again. One pass, not five trials.
- Claims to check: (1) only C, and C is after the minimum (simulation). (2) Correctness of "start after the minimum prefix sum" (derivation: every partial sum from that point is the total minus a non-positive dip). (3) Cite as a known exercise (Kleinberg and Tardos, *Algorithm Design*, 2005; or state as derivation only).
- Format: Single card
- Differs from: drop-the-losing-start (#20) uses the same running total on a line. This puts it on a circle.
- Reference: TheAlgorithms/Python greedy_methods/gas_station.py

### 33. uphill-finds-a-peak · concept: peak-finding · core · demand 1 [exploration]
- Learner knows: binary search (binary-search) / does not know: that halving works on unsorted data for some questions
- Misconception: Halving only works on sorted lists.
- Prediction: "7 face-down cards in no order. A peak is a card not smaller than its neighbours. Turn over the middle card and its right neighbour, then keep the half on the bigger side. At most how many cards do you turn over?" options: A) 3 / B) 5 / C) 7 (answer: B). Check: exhaustive over all 5,040 orders: always finds a peak, at most 5 cards turned (script).
- Key state: the learner has followed uphill twice and found a peak with cards still face down; the reveal unlocks there.
- Interaction: tap a card to turn it; tap "keep left" or "keep right" (the downhill side is refused); a turned-card counter.
- Payoff: walking uphill from the middle must end at a peak on that side, so you can discard the other half without looking. About 2 log2 n cards for any n.
- Claims to check: (1) max 5 of 7 (simulation, exhaustive). (2) A peak always exists on the uphill side (derivation). (3) O(log n) peak finding (MIT 6.006 lecture 1, Demaine and Devadas 2011; or derivation).
- Format: Single card
- Differs from: binary-search and bisect-the-bad-commit (sorted or monotone data). This is halving without order.
- Reference: TheAlgorithms/Python divide_and_conquer/peak.py

### 34. two-stacks-make-a-queue · concept: queue-two-stacks · core · demand 1
- Learner knows: stacks and queues (back-button-stack), occasional big copies averaging out (list-doubling-copies) / does not know: that a queue can be built from two stacks cheaply
- Misconception: A queue made of two stacks must flip everything over on every removal.
- Prediction: "Add 1, 2, 3, 4 to an in-stack. To remove, pop from an out-stack, and only when it is empty pour the whole in-stack into it. Removing all four, how many times is each item poured?" options: A) Once / B) Four times / C) Once per removal before it (answer: A). Check: one pour of 4 items, each moved once; output order 1 2 3 4 (script).
- Key state: the learner has added four items, removed one (watching the pour), and removed the rest with no more pours; the reveal unlocks after all four leave in order.
- Interaction: "add" and "remove" buttons; items animate between the two stacks; a move counter per item.
- Payoff: each item is poured at most once in its life, so though one removal can be slow, the average stays constant.
- Claims to check: (1) 4 moves total, 1 per item, order 1 2 3 4 (simulation). (2) Amortized O(1) per operation (CLRS exercise 10.1-6 and ch. 17 accounting method).
- Format: Storyboard / scrub
- Differs from: list-doubling-copies (amortized copying in an array). Same accounting idea, new structure.
- Reference: TheAlgorithms/Python data_structures/queues/queue_by_two_stacks.py

### 35. rolling-hash-window · concept: rolling-hash · core · demand 1
- Learner knows: hashing (hash-bucket-pileup) / does not know: that a hash of a sliding window can be updated instead of recomputed
- Misconception: Comparing a pattern against every window of a text means re-reading every letter of every window.
- Prediction: "Window hash = sum of letter values (A = 1, B = 2 ...). The window is 5 letters long. Sliding it one letter along, how many letters must you add up again?" options: A) All 5 letters in the window / B) None: subtract the one that left, add the one that arrived / C) Half of them (answer: B). Check: text EBCDAFFABCDE, pattern ABCDE (sum 15): 8 windows with sums 15 16 20 18 16 18 16 15; flags at window 1 (EBCDA, false) and window 8 (ABCDE, true). Re-adding every window reads 8 x 5 = 40 letters; sliding reads 5 + 7 x 2 = 19 (script, re-run 2026-10-14). The first draft used a 2-letter pattern, where re-adding and "subtract one, add one" both read 2 letters and the saving was invisible.
- Key state: the learner has slid the window across the text and seen two flags, one false (EBCDA), checked letter by letter; the reveal unlocks after the false flag is checked.
- Interaction: tap "slide" to move the window; the old letter leaves the sum and the new one joins; a "letters read" counter runs for sliding against re-adding; a flagged window can be checked letter by letter.
- Payoff: an updatable hash makes each slide cost 2 whatever the pattern length (5 here, against 5 per window by re-adding). Equal hashes still need a check, and a better hash (letters weighted by position) makes false flags rare.
- Claims to check: (1) the flags, 40 and 19 (simulation). (2) Karp and Rabin 1987, "Efficient randomized pattern-matching algorithms", IBM J. Res. Dev.; CLRS 32.2. (3) The sum hash cannot tell EBCDA from ABCDE, since any reordering of the same letters has the same sum (derivation).
- Format: Storyboard / scrub
- Differs from: hash-bucket-pileup and bad-hash-one-bucket (hash tables). This hashes moving windows of text.
- Reference: TheAlgorithms/Python strings/rabin_karp.py

### 36. kmp-never-steps-back · concept: kmp-string-search · stretch · demand 1
- Learner knows: searching a text for a word by sliding (rolling-hash-window, #35) / does not know: that a mismatch already tells you where the next match could start
- Misconception: After a mismatch you have to move one letter on and re-read from there.
- Prediction: "Search for AAAB in AAAAAAAAB, letter by letter. Restarting one letter on after each mismatch takes 24 comparisons. Never moving backwards in the text, reusing what matched, takes about:" options: A) 24 / B) 14 / C) 4 (answer: B). Check: naive 24, KMP 14 (script, re-run 2026-10-14; counting rule: every letter comparison counts, including the re-compare after a fallback; the restart method stops an alignment at its first mismatch). The first miss is comparison 4; comparison 5 is the first re-compare.
- Key state: the learner has run both panels past the first mismatch (comparison 5) and seen the text pointer in KMP not move left while the restart pointer does; the reveal unlocks there, not at the match (comparison 14), because a one-press jump to 14 would land on the answer. The reveal quotes 14 and 24 only if the learner got that far; otherwise they are told, as claims.
- Interaction: a text strip and a pattern strip; tap "compare"; on a mismatch the pattern jumps by the amount in its "fallback" table, shown under the pattern.
- Payoff: the part that matched is known text, so the pattern can slide straight to its longest self-overlap. Every text letter is read a bounded number of times: linear time.
- Claims to check: (1) 24 and 14 (simulation; state the counting rule). (2) KMP is O(n + m) (Knuth, Morris, Pratt 1977, SIAM J. Comput.; CLRS 32.4). (3) The fallback table for AAAB is 0 1 2 0 (simulation). Wording: KMP never moves the text pointer left, but it reads text letters 4 to 8 twice; do not say "reads each letter once".
- Format: Side-by-side comparison
- Differs from: rolling-hash-window (#35), which hashes; this never re-reads text.
- Reference: TheAlgorithms/Python strings/knuth_morris_pratt.py

### 37. copy-overlaps-itself · concept: lz77 · core · demand 1
- Learner knows: compressing runs (runs-that-grow) / does not know: that "copy what came before" is how zip files work, and a copy can overlap itself
- Misconception: You can only copy text that has already been fully written.
- Prediction: "A decoder has written 'ab'. The next instruction says: go back 2 letters and copy 6. What does it write?" options: A) Nothing, there are only 2 letters to copy / B) 'ababab', making 'abababab' / C) 'ab' and stops (answer: B). Check: copying one letter at a time, each copied letter becomes available to copy (script).
- Key state: the learner has stepped the copy letter by letter and seen the source run into newly written letters; the reveal unlocks when 8 letters are written.
- Interaction: a decode strip; tap "copy one" to move the back pointer and write a letter; an encode mode lets them pick back-distance and length for a repeated word.
- Payoff: pointing back to earlier text replaces repeats with two numbers, and an overlapping copy turns a run into one instruction, which is RLE as a special case. This is the idea inside gzip and PNG.
- Claims to check: (1) 'abababab' (simulation). (2) LZ77 (Ziv and Lempel 1977, IEEE Trans. Inf. Theory). (3) DEFLATE (gzip, PNG) uses LZ77 plus Huffman (RFC 1951).
- Format: Storyboard / scrub
- Differs from: runs-that-grow (one letter repeated) and huffman-by-merging (shorter codes). This is back-references.
- Reference: TheAlgorithms/Python data_compression/lz77.py

### 38. proposers-get-the-best · concept: stable-matching · stretch · demand 1 [exploration]
- Learner knows: greedy choices (coin-greedy-trap) / does not know: that in matching markets who proposes decides who wins
- Misconception: A stable matching procedure is neutral between the two sides.
- Prediction: "Ann prefers hospital X then Y; Bea prefers Y then X. X prefers Bea; Y prefers Ann. If the students propose, who gets their first choice?" options: A) Both students / B) Both hospitals / C) One of each (answer: A). Check: students proposing gives Ann-X, Bea-Y; hospitals proposing gives X-Bea, Y-Ann; both matchings are stable (script).
- Key state: the learner has run proposals both ways and seen each side get its first choice when it proposes; the reveal unlocks after both runs.
- Interaction: tap a free proposer to propose to their next choice; the receiver holds the better offer; a toggle swaps who proposes.
- Payoff: deferred acceptance always ends stable, and among stable matchings it gives the proposers their best and the receivers their worst. The US medical residency match switched to students proposing for this reason.
- Claims to check: (1) both matchings and their stability (simulation). (2) Proposer-optimality (Gale and Shapley 1962, "College admissions and the stability of marriage", Amer. Math. Monthly). (3) NRMP redesign (Roth and Peranson 1999, Amer. Econ. Rev.).
- Format: Before / after toggle
- Differs from: no existing lesson. Cross-category neighbour: economics market lessons (none on matching yet).
- Reference: TheAlgorithms/Python graphs/gale_shapley_bigraph.py

### 39. undo-a-bad-push · concept: max-flow · stretch · demand 1
- Learner knows: paths in a graph (wave-from-the-corner), greedy can fail (coin-greedy-trap) / does not know: that sending flow back along a pipe can increase the total
- Misconception: Push water along any open route until none is left, and you have the most water possible.
- Prediction: "Pipes s-a, s-b, a-b, a-t, b-t each carry 1 unit. What is the most water that can flow from s to t?" options: A) 1 / B) 2 / C) 3 (answer: B). Check: the first push along s-a-b-t leaves no forward route; allowing flow back along a-b finds s-b-a-t, total 2; the cut {s} has capacity 2 (script).
- Key state: the learner has pushed s-a-b-t, got stuck at 1, then used "send back" on a-b and reached 2; the reveal unlocks at 2.
- Interaction: tap a route to push one unit; pipes fill; a "send back" button on a used pipe offers reverse flow; a total readout.
- Payoff: allowing a route to cancel an earlier push fixes a greedy mistake, and when no such route is left the flow equals the smallest cut. Max flow equals min cut.
- Claims to check: (1) stuck at 1, then 2 (simulation). (2) Ford-Fulkerson and residual networks (Ford and Fulkerson 1956, Canad. J. Math.; CLRS 26.2). (3) Max-flow min-cut theorem (CLRS 26.2, Theorem 26.6).
- Format: Single card
- Differs from: cheapest-is-not-shortest (one route). This is capacity across many routes.
- Reference: TheAlgorithms/Python networking_flow/ford_fulkerson.py

### 40. rubber-band-hull · concept: convex-hull · core · demand 1 [exploration]
- Learner knows: left and right turns (assumed, shown on stage) / does not know: how a program finds the outline around a set of points
- Misconception: The outline of a cloud of points is just its leftmost, rightmost, top and bottom points.
- Prediction: "10 pins on a board. A rubber band is stretched around them all. How many pins does it touch?" (pins at (0,0) (6,1) (8,3) (7,7) (2,8) (-1,4) (3,3) (4,5) (2,2) (5,2)) options: A) 4 / B) 6 / C) 10 (answer: B). Check: monotone chain and a Graham walk from (0,0) both give 6 hull points: (-1,4) (0,0) (6,1) (8,3) (7,7) (2,8). The leftmost, rightmost, lowest and top pins are 4 distinct pins, so the extremes alone miss (6,1) and (7,7). With the old pin (6,0) the lowest tied, giving 5 extremes and no option to match (script, re-run 2026-10-14; pin moved from (6,0) to (6,1)).
- Key state: the learner has walked round the pins from the lowest-left one, keeping only left turns and popping any pin that makes a right turn, and the band closes on 6 pins; the reveal unlocks there.
- Interaction: tap "next pin" in sorted order; a right turn flashes and the last pin pops; drag a pin to change the band.
- Payoff: a corner of the band is wherever the boundary turns, and checking "left or right turn" for three points is all the geometry needed. Sorting once, then one pass, finds it.
- Claims to check: (1) 6 hull points (simulation). (2) Graham scan O(n log n) (Graham 1972, Inform. Process. Lett.; CLRS 33.3). (3) Turn direction by the sign of a cross product (CLRS 33.1).
- Format: Storyboard / scrub
- Differs from: no existing lesson. Cross-category neighbour: math geometry lessons (polygon-angle-sum); none compute hulls.
- Reference: TheAlgorithms/Python geometry/graham_scan.py


## Algorithms batch 2 (2026-10-14)

Forty more briefs from cm-cs-algorithms, after the founder asked for many more algorithm lessons. Numbering continues from #40. TheAlgorithms/Python (MIT) was read only as a list of ideas (folders: sorts, searches, dynamic_programming, greedy_methods, backtracking, divide_and_conquer, strings, hashes, data_structures, bit_manipulation, maths, geometry, graphs, cellular_automata, computer_vision, scheduling) and every answer was re-implemented and run in node on 2026-10-14 (script in the cm-cs-algorithms session scratchpad; builders must re-run their own check). No code is copied into lessons.

Deduped against every existing cs lesson in src/demos/cs, every brief in cs.md and cs.algorithms.md #1-#40, and the math strand. Skipped as already taught: counting sort, radix sort, quickselect, LIS, edit distance, fast exponentiation, the sieve, Bloom filter, LRU, cycle detection, Fisher-Yates, Game of Life, Huffman, run-length, LZ77, topological sort, Prim, max flow, convex hull, two eggs, coin ways, knapsack (fractional knapsack is in knapsack-ratio-trap), Dijkstra with negative edges (Bellman-Ford). Skipped as another strand's: Euler paths (math euler-path-parity), Pascal's triangle and Sierpinski (math pascals-triangle), two-colourability (math two-color-map), birthday collisions (probability), ciphers and frequency analysis (security and caesar-falls-to-frequency). Where a brief touches a neighbour its "Differs from" line says how.

Formats: 21 use the single-card default; the rest name a catalogue format that is not the default and are marked (needs spec). CLRS references use the 4th edition (work id clrs-4e) by chapter, and by section only where the section is certain. Support types as above. Citations marked "check before building" were written from memory and are unverified; a fact-checker must open the source. No simulated review counts as learning evidence.

### 41. shell-gaps-shrink-the-shuffles · concept: shell-sort · core · demand 2
- Audience and boundary: learner knows insertion sort slides each card left one step at a time (insertion-by-hand) / does not know: that sorting cards far apart first can save most of those steps
- Misconception: Insertion sort is slow because every step is needed; nothing can cut the number of one-step moves.
- Prediction: "16 cards are in exact reverse order. Insertion sort needs 120 shifts (a shift copies one card one place over). Shell sort first insertion-sorts cards 8 apart, then 4 apart, then 2, then 1 (ordinary insertion sort); a shift there copies a card one gap over. How many shifts in total?" options: A) 120, the same / B) About 60 / C) 32 (answer: C). Check (node, 2026-10-14): reversed 16 cards: gap 1 only = 120 shifts (one card copied one gap over per shift); gaps 8,4,2,1 = 32; gaps 4,1 = 48. A fixed shuffled 16-card hand: 63 vs 33 (script).
- Key state: the learner has run the 8, 4, 2 and 1 passes and watched the move counter stop at 32; the reveal unlocks there.
- Interaction: tap "next gap" to insertion-sort the cards that are g apart; a move counter ticks; a "plain insertion" lane beside it counts to 120.
- Payoff (reveal line): Far-apart passes carry big values most of the way in few moves, so by the last pass (gap 1) every card is already near its place and insertion sort has almost nothing to do.
- Claims to check: (1) 32, 48 and 120 move counts on the reversed hand (simulation). (2) The last pass with gap 1 is ordinary insertion sort, so the result is sorted whatever the earlier gaps (derivation). (3) Shell sort's running time depends on the gap sequence (Shell 1959; Knuth, TAOCP vol. 3, section 5.2.1).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:shell-sort; also none; prerequisites cs:insertion-sort, cs:big-o-growth; level core; strand algorithms; references none
- Differs from: insertion-by-hand (one lane, step-by-step slides). This lesson is about the gap trick that shrinks the total.
- Reference: TheAlgorithms/Python sorts/ (idea source only)

### 42. small-values-crawl-left · concept: bubble-turtles · intro · demand 2
- Audience and boundary: learner knows adjacent swaps can order a list / does not know: that one pass carries a big value all the way right but a small value only one step left
- Misconception: Bubble sort treats big and small values the same, so any 6-card list needs about the same number of passes.
- Prediction: "Bubble sort sweeps left to right, swapping neighbours that are out of order, and repeats until a sweep makes no swap. List X is 2 3 4 5 6 1; list Y is 6 1 2 3 4 5. Which needs more sweeps that make at least one swap?" options: A) X (the 1 at the end) / B) Y (the 6 at the start) / C) The same (answer: A). Check (node, 2026-10-14): X: 5 swapping sweeps; Y: 1 swapping sweep (script, plus one final sweep with no swap for both).
- Key state: the learner has run both lists to the end and seen the 6 jump to the right in one sweep and the 1 move left by one place per sweep; reveal unlocks after both.
- Interaction: two lanes, tap "sweep" on each; swapped neighbours flash; a sweep counter per lane.
- Payoff (reveal line): A sweep carries one large value all the way right but moves a small value left only one place. Small values near the end (turtles) set the cost. Comb sort fixes this by comparing items far apart first.
- Claims to check: (1) 5 and 1 swapping sweeps (simulation). (2) In one sweep a value can move right many places but left at most one (derivation). (3) Comb sort compares items a shrinking gap apart so turtles move quickly (Dobosiewicz 1980; Lacey and Box, Byte 1991).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:bubble-turtles; also none; prerequisites cs:insertion-sort; level intro; strand algorithms; references none
- Differs from: insertion-by-hand (slides left, so small values are cheap there). Here the same two lists cost very differently depending on the direction of the sweep. Not the same as sort-stability.
- Reference: TheAlgorithms/Python sorts/ (idea source only)

### 43. one-crowded-bucket · concept: bucket-sort · core · demand 1
- Audience and boundary: learner knows counting sort tallies values instead of comparing (sorting-without-comparing) / does not know: that bucket sort is fast only when values spread evenly across buckets
- Misconception: A sort that never compares across the whole list is fast on any input.
- Prediction: "Ten numbers from 1 to 100 are dropped into ten buckets (1-10, 11-20, ...) and each bucket is insertion-sorted. A hand that spreads across the buckets (95 12 37 64 28 81 3 46 59 70) needs 1 comparison inside buckets. For the hand 47 43 50 41 45 49 42 48 44 46, all in the 41-50 bucket, how many in-bucket comparisons?" options: A) About 1, as before / B) About 10 / C) 30 (answer: C). Check (node, 2026-10-14): spread hand 95 12 37 64 28 81 3 46 59 70: 1 comparison (12 and 3 share bucket 1); clumped hand 47 43 50 41 45 49 42 48 44 46: 30 comparisons; the same clumped values reversed: 45 (script, insertion sort inside buckets).
- Key state: the learner has bucketed both hands and sorted each bucket, and sees the comparison counters read 1 and 30; reveal unlocks after both.
- Interaction: a toggle switches between the spread hand and the clumped hand; tap "drop" to place each number; tap "sort buckets" to count comparisons.
- Payoff (reveal line): Bucket sort turns a big sort into many tiny ones only if the buckets stay small. Clumped data puts everything back in one bucket, and the fast sort becomes the slow inside sort.
- Claims to check: (1) 1, 30 and 45 comparisons (simulation). (2) Expected linear time for inputs drawn uniformly from an interval (CLRS 4e ch. 8; section 8.4 in 3rd ed.). (3) Worst case is the cost of the in-bucket sort when one bucket holds everything (derivation).
- Format: Before / after toggle (needs spec)
- Curriculum: primary cs:bucket-sort; also none; prerequisites cs:counting-sort, cs:insertion-sort; level core; strand algorithms; references clrs-4e ch. 8 (chapter only)
- Differs from: sorting-without-comparing (counting sort: values are the addresses). Buckets hold ranges, and the lesson is about uneven spread.
- Reference: TheAlgorithms/Python sorts/ (idea source only)

### 44. shuffle-until-sorted · concept: bogosort-expectation · intro · demand 1
- Audience and boundary: learner knows n cards can be ordered n! ways (route-explosion) / does not know: that "shuffle and check" needs about n! tries, so 10 cards take millions
- Misconception: A randomised sort that checks itself will finish in a handful of tries.
- Prediction: "A sort shuffles the cards at random and stops when they happen to be in order. With 5 cards, about how many shuffles does it need on average?" options: A) About 5 / B) About 25 / C) About 120 (answer: C). Check (node, 2026-10-14): each shuffle sorts with probability 1/5! = 1/120, so the expected number of shuffles is 120; with 10 cards it is 3,628,800 (derivation; geometric waiting time). A seeded run is shown on the stage but is only an example of the average.
- Key state: the learner has pressed "shuffle" until the 5 cards line up (or 30 times) and seen the tally; reveal unlocks at the first success or the thirtieth shuffle.
- Interaction: "shuffle" (seeded, disclosed) and "x10" buttons; a tally of shuffles; a card-count chip that switches 3, 4, 5.
- Payoff (reveal line): One shuffle in n! is the sorted order, so you wait about n! shuffles. Adding cards multiplies the wait: 3 cards 6, 5 cards 120, 10 cards 3.6 million. Knowing n! orderings is what makes any guess-and-check sort hopeless.
- Claims to check: (1) Expected shuffles = n! (derivation: waiting time for an event of probability 1/n!, with distinct cards). (2) 5! = 120 and 10! = 3,628,800 (arithmetic). (3) Bogosort is a joke algorithm; expected time is Theta(n * n!) counting the check (derivation).
- Format: Simulation run (needs spec)
- Curriculum: primary cs:bogosort-expectation; also cs:fisher-yates-shuffle; prerequisites cs:combinatorial-explosion; level intro; strand algorithms; references none
- Differs from: route-explosion (counts orderings in a route problem) and sort-lower-bound (log of n!). This lesson turns n! into a waiting time.
- Reference: TheAlgorithms/Python sorts/ (idea source only)

### 45. doubling-finds-the-edge · concept: exponential-search · core · demand 1
- Audience and boundary: learner knows binary search halves a sorted list that has known length / does not know: that you can binary-search a sorted list of unknown length by doubling first
- Misconception: Binary search needs to know where the list ends; with no end you must scan one by one.
- Prediction: "A sorted list has no known length. The target is at position 1000. Probe positions 1, 2, 4, 8, ... until you pass the target, then binary-search the last gap. Roughly how many comparisons (a scan needs 1001)?" options: A) About 500 / B) About 100 / C) About 20 (answer: C). Check (node, 2026-10-14): target at index 1000 in a sorted list: 18 comparisons (script; every comparison of the target with a list element is counted, including the one that ends the doubling).
- Key state: the learner has doubled the probe until the value overshoots 1000 and then narrowed the gap; reveal unlocks when the target is found.
- Interaction: tap "double" to move the probe 1, 2, 4, ...; once it overshoots, tap "halve" to binary-search the last gap; a comparison counter.
- Payoff (reveal line): Doubling finds a gap holding the target after about log2(position) steps, and binary search of that gap costs about the same. Total is about 2 log2 of the position, not the position.
- Claims to check: (1) 18 comparisons for position 1000 (simulation). (2) Doubling reaches a range [2^(k-1), 2^k] containing the target in k steps (derivation). (3) Total O(log p) for target position p (Bentley and Yao 1976, "An almost optimal algorithm for unbounded searching", Inf. Process. Lett.).
- Format: Single card
- Curriculum: primary cs:exponential-search; also none; prerequisites cs:binary-search; level core; strand algorithms; references none
- Differs from: binary-search and bisect-the-bad-commit (known size). This lesson is about finding the size first.
- Reference: TheAlgorithms/Python searches/ (idea source only)

### 46. ternary-asks-more · concept: ternary-search · core · demand 1
- Audience and boundary: learner knows binary search cuts the list in half per question / does not know: that cutting in thirds takes more comparisons in total, not fewer
- Misconception: Splitting into more parts per step must need fewer steps, so ternary search beats binary search.
- Prediction: "Ternary search checks two points per round and keeps one third of the list. For 1,000 sorted numbers, how does its worst-case number of comparisons compare with binary search's 10?" options: A) Fewer than 10 / B) About the same / C) More: 13 (answer: C). Check (node, 2026-10-14): 1000 sorted numbers, every target tried: worst case binary 10, ternary 13; averages 8.99 and 11.19. For 100 numbers: 7 vs 9 (script, counting each comparison with a list element).
- Key state: the learner has searched with both methods for the same target and read both comparison counters; reveal unlocks after both finish.
- Interaction: a target chip; "step" on each lane; lanes show the surviving range and a comparison counter.
- Payoff (reveal line): Each ternary round shrinks the list to a third but costs two questions; two binary questions shrink it to a quarter. Per question, halving wins. Ternary search is the right tool for the top of a smooth hill, not for a sorted list.
- Claims to check: (1) 10 vs 13 worst case and 8.99 vs 11.19 average (simulation). (2) Two comparisons cut to 1/3, two binary comparisons cut to 1/4, so binary is faster per comparison (derivation). (3) Ternary search finds the maximum of a unimodal function (standard result; derivation).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:ternary-search; also none; prerequisites cs:binary-search; level core; strand algorithms; references none
- Differs from: binary-search and interpolation-guesses-the-page (a different way to pick a probe). Here a rule that sounds better is shown to be worse.
- Reference: TheAlgorithms/Python searches/ (idea source only)

### 47. common-letters-in-order · concept: longest-common-subsequence · core · demand 2
- Audience and boundary: learner knows a grid of smaller answers can solve edit distance (flaw-to-lawn) / does not know: that "what do two strings share, in order" is a different grid and a different answer
- Misconception: The longest shared stretch is a block of letters side by side in both strings.
- Prediction: "Two strings: ABCBDAB and BDCABA. Pick letters from each, keeping their order but allowing gaps. What is the longest sequence that can be picked from both?" options: A) 3 letters / B) 4 letters / C) 5 letters (answer: B). Check (node, 2026-10-14): LCS length 4 (grid fill). Exactly three length-4 answers exist: BCBA, BCAB, BDAB; no length-5 common subsequence (brute force over all subsequences, script).
- Key state: the learner has filled the grid and traced back one length-4 answer; reveal unlocks when the trace reaches the corner.
- Interaction: tap a cell to fill it (match: diagonal + 1; mismatch: larger of up and left); "trace back" button walks the path.
- Payoff (reveal line): Each cell asks one small question: do these two letters match? If so, extend the answer from the diagonal; if not, take the better of dropping a letter from either string. This is how diff tools find what changed.
- Claims to check: (1) LCS = 4 and the three answers (simulation, brute force). (2) The recurrence: match adds 1 to the diagonal, mismatch takes the max of up and left (CLRS 4e section 14.4). (3) Diff tools are built on this (Hunt and McIlroy 1976, "An algorithm for differential file comparison").
- Format: Single card
- Curriculum: primary cs:longest-common-subsequence; also none; prerequisites cs:memoization, cs:edit-distance; level core; strand algorithms; references clrs-4e ch. 14, section 14.4
- Differs from: flaw-to-lawn (edit distance counts changes; this counts what stays). Same grid idea, different cell rule and answer.
- Reference: TheAlgorithms/Python dynamic_programming/ (idea source only)

### 48. cut-the-rod-for-more · concept: rod-cutting · core · demand 2
- Audience and boundary: learner knows smaller answers combine into bigger ones (ways-to-make-ten) / does not know: that an optimal choice here asks the best price of every shorter rod
- Misconception: The most money comes from selling the rod whole, or cutting off the best-priced piece once.
- Prediction: "A rod of length 4 sells for $9 whole. Pieces sell for $1 (length 1), $5 (length 2), $8 (length 3). What is the most you can get for the length-4 rod?" options: A) $9, sell it whole / B) $10 / C) $13 (answer: B). Check (node, 2026-10-14): best(1)=1, best(2)=5, best(3)=8, best(4)=10 (two pieces of length 2); length 8 with prices 1,5,8,9,10,17,17,20 gives 22, not the whole-rod 20 (script).
- Key state: the learner has filled best(1) to best(4) and sees 2+2 beat the whole rod; reveal unlocks at best(4).
- Interaction: tap "fill" for each length; each fill shows the choices "first piece of length k + best of the rest" and keeps the largest.
- Payoff (reveal line): The best price of a rod is the best over first-cut sizes of (piece price + best price of the rest). Each shorter rod is solved once and reused.
- Claims to check: (1) best(1..4) = 1, 5, 8, 10 and best(8) = 22 (simulation). (2) The recurrence r(n) = max over i of p(i) + r(n - i) (CLRS 4e section 14.1). (3) Optimal substructure: the rest of an optimal cut is itself optimal (CLRS 4e section 14.1).
- Format: Single card
- Curriculum: primary cs:rod-cutting; also none; prerequisites cs:memoization, cs:coin-change-ways; level core; strand algorithms; references clrs-4e ch. 14, section 14.1
- Differs from: ways-to-make-ten (counts ways; here each way has a value and we keep the maximum) and knapsack-ratio-trap (whether to take an item, not how to cut).
- Reference: TheAlgorithms/Python dynamic_programming/ (idea source only)

### 49. bracket-order-sets-the-bill · concept: matrix-chain-order · stretch · demand 1
- Audience and boundary: learner knows tables of smaller answers (rod cutting) / does not know: that the same product costs 6 times more in a different bracketing
- Misconception: Multiplying matrices costs the same whichever pair you multiply first.
- Prediction: "Three matrices: A is 10x30, B is 30x5, C is 5x60. Multiplying a p x q by a q x r costs p*q*r single multiplications. (AB)C versus A(BC): how do the costs compare?" options: A) Equal / B) A(BC) is about 2x dearer / C) A(BC) is 6x dearer (answer: C). Check (node, 2026-10-14): (AB)C = 1500 + 3000 = 4500; A(BC) = 9000 + 18000 = 27000 = 6 x 4500; the DP table over the three splits agrees (script).
- Key state: the learner has priced both bracketings and seen 4500 and 27000; reveal unlocks after both.
- Interaction: two bracket buttons (AB first, BC first); matrices drawn as boxes with their sizes; a running cost per step.
- Payoff (reveal line): The answer is the same matrix either way, but the middle sizes differ: forming the 10x5 box first is cheap, forming the 30x60 box first is not. Trying every split of every sub-chain finds the cheapest order.
- Claims to check: (1) 4500 and 27000 (arithmetic, simulation). (2) Matrix multiplication is associative, so both orders give the same product (derivation). (3) Dynamic programming over split points finds the best bracketing (CLRS 4e section 14.2).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:matrix-chain-order; also none; prerequisites cs:rod-cutting; level stretch; strand algorithms; references clrs-4e ch. 14, section 14.2
- Differs from: rod-cutting (this batch; cuts a line). Here the choice is where to split a chain of sizes.
- Reference: TheAlgorithms/Python dynamic_programming/ (idea source only)

### 50. skip-the-edge-that-loops · concept: kruskal-mst · core · demand 2
- Audience and boundary: learner knows a spanning tree joins all towns with no loops (connect-the-towns-cheaply); union-find tells whether two towns share a group / does not know: that sorting all the edges first and skipping loop-makers also finds the cheapest tree
- Misconception: The cheapest road is always built, and the roads skipped are the expensive ones.
- Prediction: "Five towns, eight possible roads costing 1, 2, 3, 4, 5, 7, 8, 10. Go through them cheapest first and build a road unless its two towns are already connected. How many roads get built?" options: A) 8, every road / B) 5 / C) 4 (answer: C). Check (node, 2026-10-14): A-C 1, B-C 2, D-E 3 built; A-B 4 skipped (A and B already joined through C); B-D 5 built; A-D 7, C-D 8, C-E 10 skipped: 4 roads, total 11 (script). Any tree on 5 towns has 4 edges.
- Key state: the learner has gone through all eight roads and seen the 4 skipped ones turn grey; reveal unlocks after the last road.
- Interaction: tap "next road" to test it; a build or skip verdict appears; group colours update; a cost total.
- Payoff (reveal line): A road is skipped only when its towns are already connected, however cheap it is. Kruskal ends with exactly one fewer road than towns, and a tree of that kind with the smallest total.
- Claims to check: (1) Built A-C, B-C, D-E, B-D; total 11 (simulation). (2) Greedy choice is safe: the cheapest edge crossing any cut is in some MST (CLRS 4e ch. 21, section 21.1). (3) Kruskal with a disjoint-set structure runs in O(E log E) (CLRS 4e section 21.2).
- Format: Single card
- Curriculum: primary cs:kruskal-mst; also none; prerequisites cs:minimum-spanning-tree, cs:union-find; level core; strand algorithms; references clrs-4e ch. 21, section 21.2
- Differs from: any-start-same-tree (Prim grows one tree from a town) and connect-the-towns-cheaply (builds the tree by hand). This one sorts all roads first and the lesson is the skips.
- Reference: TheAlgorithms/Python greedy_methods/ (idea source only)

### 51. wheel-needs-four-colours · concept: graph-colouring-backtracking · core · demand 1
- Audience and boundary: learner knows backtracking tries a choice and undoes it on a dead end (four-queens-pruning) / does not know: that a hub linked to an odd ring cannot be done in three colours
- Misconception: Three colours are enough for any map with a handful of regions.
- Prediction: "A round plaza is split into a centre region and five regions around it (each touches the centre and its two neighbours). Neighbours must differ. Fewest colours?" options: A) 2 / B) 3 / C) 4 (answer: C). Check (node, 2026-10-14): brute-force chromatic number of the 5-wheel (hub + 5-cycle) is 4; with a 4-cycle around the hub it is 3 (script, backtracking colourer).
- Key state: the learner has tried three colours, hit a dead end at the fifth ring region, and then coloured it with a fourth; reveal unlocks on a complete valid colouring.
- Interaction: tap a region then a colour chip; a conflict flashes; an "undo" button; a colour-count chip showing 3 or 4.
- Payoff (reveal line): The centre touches all five outer regions, so they must share two colours alternately round an odd ring, and the fifth region clashes. A fourth colour is the only way out. Backtracking finds that by trying and undoing.
- Claims to check: (1) Chromatic number 4 for the 5-wheel and 3 for the 4-wheel (simulation). (2) An odd cycle needs 3 colours, and a hub adjacent to all of it needs one more (derivation). (3) Graph colouring is NP-hard in general (Karp 1972); CLRS 4e ch. 34.
- Format: Single card
- Curriculum: primary cs:graph-colouring-backtracking; also none; prerequisites cs:n-queens-backtracking; level core; strand algorithms; references none
- Differs from: four-queens-pruning (placement on a board) and math two-colours-enough (two colours for regions). This one is the backtracking search on a graph that forces a fourth colour.
- Reference: TheAlgorithms/Python backtracking/ (idea source only)

### 52. fewest-exits-first-tour · concept: knights-tour-warnsdorff · stretch · demand 1
- Audience and boundary: learner knows backtracking and greedy rules (four-queens-pruning, coin-greedy-trap) / does not know: that a one-line greedy rule often completes a tour that naive move order cannot
- Misconception: Walking a knight to any unvisited square is as good as any other rule.
- Prediction: "A knight starts in the corner of a 5x5 board and must visit every square once. Rule A: take the first legal move in a fixed order. Rule B: go to the square with the fewest onward moves. How many squares do they visit before getting stuck?" options: A) A 25 and B 25 / B) A 21 and B 25 / C) A 25 and B 21 (answer: B). Check (node, 2026-10-14): moves tried in order (1,2) (2,1) (2,-1) (1,-2) (-1,-2) (-2,-1) (-2,1) (-1,2); ties go to the first such move. 5x5 from (0,0): rule A visits 21, rule B visits 25. On 8x8: A 36, B 64 (script).
- Key state: the learner has run both rules to the end and seen A strand at 21 while B completes 25; reveal unlocks after both.
- Interaction: two lanes, "step" for each; squares show the number of onward moves; the visited counter; a restart.
- Payoff (reveal line): Going to the square with the fewest exits first uses up the hard-to-reach squares while they are still reachable. The rule has no guarantee (it can fail on some boards and starts) but in practice it is very effective.
- Claims to check: (1) 21 and 25 on 5x5, 36 and 64 on 8x8 with the stated move order and tie rule (simulation). (2) Warnsdorff's rule (1823); not guaranteed to succeed in general (Squirrel and Cull 1996, "A Warnsdorff-rule algorithm for knight's tours on square chessboards"). (3) A rule that helps in practice can still be heuristic, not a proof (derivation).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:knights-tour-warnsdorff; also none; prerequisites cs:n-queens-backtracking, cs:greedy-failure; level stretch; strand algorithms; references none
- Differs from: four-queens-pruning (prune a search) and coin-greedy-trap (greedy fails). Here a greedy tie-break rescues a search that would otherwise get stuck.
- Reference: TheAlgorithms/Python backtracking/ (idea source only)

### 53. karatsuba-three-not-four · concept: karatsuba · stretch · demand 1
- Audience and boundary: learner knows splitting a problem and combining (merge-sort-payoff) / does not know: that two-digit halves can be multiplied with 3 products instead of 4
- Misconception: Multiplying two n-digit numbers needs n x n single-digit multiplications and nothing can beat it.
- Prediction: "Split 11111111 and 11111111 into halves. Schoolbook multiplication uses 4 half-size products at each level; Karatsuba uses 3. Counting single-digit multiplications down to 1-digit pieces, how many does Karatsuba need for these 8-digit numbers, where no half-sum carries (schoolbook: 64)?" options: A) 16 / B) 27 / C) 48 (answer: B). Check (node, 2026-10-14): 3^3 = 27 vs 4^3 = 64 for 8 digits; for 1,024 digits 3^10 = 59,049 vs 1,048,576; a BigInt implementation multiplies 11111111 x 11111111 = 123,456,787,654,321 correctly with exactly 27 one-digit products, no half-sum carries (script); the same implementation needs 33 for 12345678 x 87654321 because 8765 + 4321 = 13086 carries, so those numbers were dropped.
- Key state: the learner has expanded the product tree one level at a time and seen 3 branches (a*c, b*d, (a+b)(c+d)) instead of 4; reveal unlocks at the 27 leaves.
- Interaction: tap "split" to expand every product into 4 or 3 smaller products (toggle), counter of leaves for 2, 4, 8 digits.
- Payoff (reveal line): (a+b)(c+d) minus ac and bd gives the cross terms, so one product is saved. Saving one of four at every level compounds to n^1.58 instead of n^2.
- Claims to check: (1) 27 and 64 leaf counts, 59,049 and 1,048,576 for 1,024 digits (simulation). (2) Identity ad + bc = (a+b)(c+d) - ac - bd (algebra). (3) Karatsuba (1962) runs in Theta(n^log2(3)) = Theta(n^1.585) (CLRS 4e ch. 4 problems).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:karatsuba; also none; prerequisites cs:divide-and-conquer, cs:big-o-growth; level stretch; strand algorithms; references clrs-4e ch. 4 (chapter only)
- Differs from: merge-sort-payoff (divide and conquer with equal-cost combine). This one cuts the number of sub-problems.
- Reference: TheAlgorithms/Python divide_and_conquer/ (idea source only)
- W-179 resolved (2026-10-14, cm-cs-algorithms): re-ran in node (split at half the longer length, base case when either factor < 10, result checked against BigInt): 12345678 x 87654321 uses 33 one-digit products (half-sums carry), 11111111 x 11111111 uses exactly 27 (schoolbook 64). Chose to switch the numbers to 11111111 x 11111111 per the spec, not the size-model rewording, so the stage can draw the real multiplication. Question, options and answer (B, 27) unchanged. Claim 1 now concerns these numbers; the builder should count real base-case calls and assert 27.

### 54. count-the-out-of-order-pairs · concept: inversion-count · core · demand 1
- Audience and boundary: learner knows merging two sorted lists (merge-sort-payoff) / does not know: that one pass of merging also counts how far a list is from sorted
- Misconception: Counting out-of-order pairs means checking every pair, which is n(n-1)/2 checks.
- Prediction: "In 2 4 1 3 5, how many pairs (earlier, later) are out of order, meaning the earlier one is bigger?" options: A) 2 / B) 3 / C) 5 (answer: B). Check (node, 2026-10-14): inversions: (2,1), (4,1), (4,3) = 3; reversed 5 cards 10; sorted 0 (script). The merge-count method gives 3 as well.
- Key state: the learner has merged the halves [2 4] and [1 3 5] and seen each card taken from the right jump over the cards still waiting on the left; reveal unlocks at 3.
- Interaction: tap "take next" in the merge: smaller front card moves out; when the right card is taken, the counter adds the number of cards left on the left.
- Payoff (reveal line): When a right-half card is taken before the left cards still waiting, it forms one inverted pair with each of them. Counting that during the merge costs nothing extra, so the total is O(n log n), not n^2.
- Claims to check: (1) 3, 10 and 0 inversions (simulation). (2) Counting during merge gives the same answer as brute force (simulation over all permutations of 6 cards). (3) O(n log n) counting by merge sort (CLRS 4e ch. 2, problem 2-4).
- Format: Single card
- Curriculum: primary cs:inversion-count; also cs:sort-lower-bound; prerequisites cs:divide-and-conquer; level core; strand algorithms; references clrs-4e ch. 2 (chapter only)
- Differs from: merge-sort-payoff (cost of merging) and sort-lower-bound (orderings). This is a measure of disorder.
- Reference: TheAlgorithms/Python divide_and_conquer/ (idea source only)

### 55. boyer-moore-skips-ahead · concept: boyer-moore-horspool · stretch · demand 1
- Audience and boundary: learner knows KMP never moves back in the text (kmp-never-steps-back) / does not know: that comparing the pattern from its end lets you skip text and look at fewer characters than the text has
- Misconception: Any search must look at every character of the text at least once.
- Prediction: "Find EXAMPLE in "HERE IS A SIMPLE EXAMPLE" (24 characters). Compare the pattern right to left; on a mismatch, slide by the distance to the last copy of the text letter under the pattern's end in the pattern (or its full length). How many character comparisons?" options: A) 27, like the plain method / B) 24, one per text letter / C) 15 (answer: C). Check (node, 2026-10-14): Horspool (the simple Boyer-Moore variant) takes 15 character comparisons in 4 alignments; the plain left-to-right method takes 27 comparisons over 18 alignments (script).
- Key state: the learner has slid the pattern to the match and read a comparison counter of 15; reveal unlocks at the match.
- Interaction: tap "compare" for one character check (right to left); on a mismatch, "slide" moves the pattern by the table shown under it.
- Payoff (reveal line): A mismatch against a letter that never occurs in the pattern means no alignment containing it can match, so the whole pattern jumps past it. Longer patterns skip further.
- Claims to check: (1) 15 and 27 comparisons, 4 and 18 alignments (simulation). (2) Boyer and Moore 1977, "A fast string searching algorithm", Commun. ACM; Horspool 1980, "Practical fast searching in strings", Software: Practice and Experience. (3) Sublinear on average for most texts, O(nm) worst case for Horspool (derivation; Horspool 1980).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:boyer-moore-horspool; also none; prerequisites cs:kmp-string-search; level stretch; strand algorithms; references clrs-4e ch. 32 (chapter only)
- Differs from: kmp-never-steps-back (reuses matched prefix, never skips text). This one skips text and reads the pattern backwards.
- Reference: TheAlgorithms/Python strings/ (idea source only)

### 56. palindromes-grow-from-centres · concept: palindrome-centres · core · demand 1
- Audience and boundary: learner knows two fingers moving apart or together (two-pointers-meet) / does not know: that the number of palindromes in a string can be counted by growing each centre outward
- Misconception: To count palindromic substrings you must test every substring.
- Prediction: "How many palindromic substrings (read the same backwards; each position pair counted separately) does "aaaa" have?" options: A) 4 / B) 7 / C) 10 (answer: C). Check (node, 2026-10-14): substrings of aaaa: 4+3+2+1 = 10, all palindromes; expanding around the 7 centres (4 letters, 3 gaps) gives 10 too; "abc" has 3, "racecar" has 10 (script).
- Key state: the learner has grown a palindrome from each of the 7 centres and seen the totals add to 10; reveal unlocks after the last centre.
- Interaction: tap a centre (a letter or a gap); a pair of arrows expands outward while letters match; counter adds each stop.
- Payoff (reveal line): A palindrome is a mirrored stretch around a centre; there are 2n-1 centres, and each grows until the mirror breaks. Manacher's algorithm reuses the mirror to make the whole count linear.
- Claims to check: (1) 10, 3 and 10 counts (simulation, brute force and centre expansion agree). (2) 2n-1 centres for a string of n letters (derivation). (3) Manacher's algorithm finds all maximal palindromes in O(n) (Manacher 1975, J. ACM).
- Format: Single card
- Curriculum: primary cs:palindrome-centres; also none; prerequisites cs:two-pointers; level core; strand algorithms; references none
- Differs from: two-pointers-meet (a pair scan on a sorted list). Here the pointers move outward from a centre on a string.
- Reference: TheAlgorithms/Python strings/ (idea source only)

### 57. same-letters-same-key · concept: anagram-grouping · intro · demand 1
- Audience and boundary: learner knows a hash table groups keys by their hash / does not know: that the sorted letters (or letter counts) of a word is a key that is the same for all its anagrams
- Misconception: To find anagrams you must compare each word against every other word.
- Prediction: "Words: listen, silent, enlist, tinsel, google, gogole, cat, act, tac, dog. Use each word's letters in alphabetical order as a key. How many groups?" options: A) 3 / B) 4 / C) 5 (answer: B). Check (node, 2026-10-14): keys: eilnst (4 words), eggloo (2), act (3), dgo (1): 4 groups (script).
- Key state: the learner has dropped all ten words into key-labelled bins and seen four bins; reveal unlocks after the last word.
- Interaction: tap a word: its letters sort in place and it drops into the bin with that key; a bin count.
- Payoff (reveal line): Two words are anagrams exactly when their sorted letters (or 26 letter counts) match, so one pass over the words, one key each, groups them; no word pair is compared.
- Claims to check: (1) Four groups with sizes 4, 2, 3, 1 (simulation). (2) Two words are anagrams iff their sorted-letter strings are equal (derivation). (3) Grouping by key uses a hash table in expected linear time in total letters (CLRS 4e ch. 11).
- Format: Single card
- Curriculum: primary cs:anagram-grouping; also none; prerequisites cs:counting-sort, cs:hashing-collisions; level intro; strand algorithms; references clrs-4e ch. 11 (chapter only)
- Differs from: hash-bucket-pileup (what happens when keys collide). Here we choose a key that makes the right words collide on purpose.
- Reference: TheAlgorithms/Python strings/ (idea source only)

### 58. new-server-moves-few-keys · concept: consistent-hashing · stretch · demand 1
- Audience and boundary: learner knows a key lands in the bucket given by hash mod size (hash-bucket-pileup) / does not know: that changing the number of servers by one moves most keys under mod, but about 1/n of them on a ring
- Misconception: Adding one server to a cache cluster moves only the keys the new server takes over.
- Prediction: "Keys sit on 4 servers by (key mod 4). A fifth server is added, so it is now (key mod 5). Of 20 consecutive key numbers, how many stay on the server they had?" options: A) 16 / B) 10 / C) 4 (answer: C). Check (node, 2026-10-14): k mod 4 = k mod 5 only for k = 0..3 (and 20 later) in each block of 20: 4 stay, 16 move (80%). On a hash ring with 1000 points per server (fnv1a-style 32-bit hash, 20,000 keys), 19.6% of keys move, and all of them go to the new server; with 100 points per server it is 24.1% (script).
- Key state: the learner has seen the 16 moved keys light up under mod and then the ring where only the keys between the new server and its neighbour move; reveal unlocks after both.
- Interaction: a toggle between "mod" and "ring"; "add server" button; moved keys flash; a percent-moved readout.
- Payoff (reveal line): On a ring, a key belongs to the next server clockwise, so a new server only takes keys from its neighbour: about 1/n of them. A fixed formula like mod n reshuffles nearly everything when n changes.
- Claims to check: (1) 16 of 20 keys move under mod 4 to mod 5 (derivation, enumeration). (2) 19.6% and 24.1% on the ring for 1000 and 100 points (simulation with the stated hash and seed; ideal is 20%). (3) Consistent hashing (Karger et al. 1997, "Consistent hashing and random trees", STOC).
- Format: Before / after toggle (needs spec)
- Curriculum: primary cs:consistent-hashing; also none; prerequisites cs:hashing-collisions; level stretch; strand algorithms; references none
- Differs from: hash-bucket-pileup and bad-hash-one-bucket (collisions inside a table). This is about what happens to keys when the table count changes. Neighbour in cs-systems: caching; none exist yet.
- Reference: TheAlgorithms/Python hashes/ (idea source only)

### 59. fenwick-hops-by-lowest-bit · concept: fenwick-tree · stretch · demand 1
- Audience and boundary: learner knows bit masks and two's complement (mask-the-flags, flip-and-add-one) / does not know: that x & -x gives a hop that makes prefix sums and updates both take log n cells
- Misconception: A running prefix-sum table is cheap to read, so changing one value only needs one cell touched.
- Prediction: "A Fenwick tree over 16 numbers stores in cell i the sum of the last (i & -i) numbers up to i. To add up the first 13 numbers, how many cells do you read?" options: A) 13 / B) 3 / C) 1 (answer: B). Check (node, 2026-10-14): 13 = 1101 in binary: read cells 13, 12, 8 (13 minus lowest set bit each hop: 13, 12, 8); prefix 15 reads 15, 14, 12, 8 (4 cells); a change at position 1 updates 1, 2, 4, 8, 16 (5 cells) (script).
- Key state: the learner has pressed "hop" three times from 13 and seen the three ranges tile 1..13; reveal unlocks at the third hop.
- Interaction: an index chip; "hop down" removes the lowest 1 bit; ranges drawn as brackets; "update" button hops up by adding the lowest bit.
- Payoff (reveal line): The lowest set bit of an index is the length of the range its cell covers. Hopping down by it covers the prefix in as many steps as there are 1 bits; hopping up by it updates every cell that holds the changed number.
- Claims to check: (1) 13 -> 12 -> 8 and the 5 cells updated from 1 (simulation). (2) Cell i covers (i - lowbit(i), i] (Fenwick 1994, "A new data structure for cumulative frequency tables", Software: Practice and Experience). (3) Both operations O(log n) (derivation: at most log2(n)+1 hops).
- Format: Single card
- Curriculum: primary cs:fenwick-tree; also none; prerequisites cs:bit-masks, cs:twos-complement; level stretch; strand algorithms; references none
- Differs from: mask-the-flags (bit masks for settings) and heap-bubble-up (log-height updates). This uses bit arithmetic as the tree shape.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 60. range-min-in-four-nodes · concept: segment-tree · stretch · demand 1
- Audience and boundary: learner knows halving a problem and a tree of results (merge-sort-payoff, heapify-from-the-bottom) / does not know: that any range query splits into a few stored nodes
- Misconception: The minimum over positions 3 to 12 needs 10 values looked at; a stored tree cannot help with an arbitrary range.
- Prediction: "A tree over 16 positions stores the minimum of every aligned half, quarter and eighth. To get the minimum over positions 3 to 12 (0-based), how many stored nodes do you combine?" options: A) 10 / B) 4 / C) 2 (answer: B). Check (node, 2026-10-14): range [3,12] splits into [3,3], [4,7], [8,11], [12,12] = 4 nodes; [1,14] uses 6 (script).
- Key state: the learner has selected 3 to 12 and seen the four node blocks light up; reveal unlocks once the four are combined.
- Interaction: drag two handles over the 16 positions; the tree shows chosen nodes; a count of nodes used; "change a value" button updates its path.
- Payoff (reveal line): Every range is a union of at most about 2 log2(n) stored blocks. A change updates just the nodes above it, so both questions take log n steps.
- Claims to check: (1) [3,12] = 4 nodes and [1,14] = 6 nodes (simulation). (2) At most 2 log2(n) nodes for any range (derivation). (3) Point update touches log2(n)+1 nodes (derivation).
- Format: Single card
- Curriculum: primary cs:segment-tree; also none; prerequisites cs:divide-and-conquer, cs:heap-priority-queue; level stretch; strand algorithms; references none
- Differs from: fenwick-hops-by-lowest-bit (this batch; sums only, bit-hop shape) and heap-bubble-up. A segment tree handles min, max and sum alike.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 61. rotation-untangles-the-chain · concept: avl-rotation · stretch · demand 1
- Audience and boundary: learner knows insert order shapes a search tree (lopsided-tree) / does not know: that a tree can fix itself with a local rotation and stay in order
- Misconception: Ordered input always gives a chain; the only cure is shuffling the input first.
- Prediction: "Keys 1 to 7 arrive in order. A plain search tree becomes a chain of height 7. A tree that rotates whenever one side is two levels deeper than the other: what height?" options: A) 7 / B) 5 / C) 3 (answer: C). Check (node, 2026-10-14): AVL insertion of 1..7: height 3, root 4, 4 rotations; plain BST height 7. Inserting 1,2,3 in order needs one rotation and gives root 2 (script).
- Key state: the learner has inserted 1, 2, 3 and watched one rotation make 2 the root; the reveal unlocks after the learner inserts all seven.
- Interaction: "insert next key" button; a toggle for plain or rotating tree; the tree and its height shown; the rotation is animated and labelled.
- Payoff (reveal line): A rotation lifts the middle key to the top and keeps the left-to-right order, so the search stays valid. Doing it whenever heights differ by two keeps height near log2(n).
- Claims to check: (1) Height 3 with 4 rotations vs 7 (simulation). (2) A rotation preserves in-order sequence (derivation; CLRS 4e section 13.2). (3) AVL trees keep height at most about 1.44 log2(n+2) (Adelson-Velsky and Landis 1962).
- Format: Before / after toggle (needs spec)
- Curriculum: primary cs:avl-rotation; also none; prerequisites cs:binary-search-tree; level stretch; strand algorithms; references clrs-4e ch. 13, section 13.2
- Differs from: lopsided-tree (shows order changes shape, no repair) and in-order-is-sorted. This is the repair.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 62. ring-buffer-wraps-around · concept: circular-buffer · intro · demand 1
- Audience and boundary: learner knows a queue lets items leave in arrival order (back-button-stack) / does not know: that a fixed array with a wrapping index keeps the newest N items with no copying
- Misconception: A queue in an array must shift every item left when one leaves.
- Prediction: "A buffer holds 4 items. You write 1, 2, 3, ..., 10 in turn, each into the next slot and wrapping from slot 3 back to slot 0, overwriting the oldest. What is in slots 0, 1, 2, 3?" options: A) 1, 2, 3, 4 / B) 7, 8, 9, 10 / C) 9, 10, 7, 8 (answer: C). Check (node, 2026-10-14): item i goes to slot (i-1) mod 4: slots end 9, 10, 7, 8; the newest four are 7 to 10 and the next write goes to slot 2 (script).
- Key state: the learner has written all ten items and seen slots 0 and 1 overwritten by 9 and 10; reveal unlocks after item 10.
- Interaction: "write next" button puts the next number at the pointer; the pointer moves round a ring of four slots; a faded "oldest" marker.
- Payoff (reveal line): The pointer is (count mod capacity), so the buffer always holds the latest N items in fixed memory with no shifting. Logs, audio streams and keyboard queues rely on it.
- Claims to check: (1) Slots 9, 10, 7, 8 and next write at slot 2 (simulation). (2) Write cost is O(1) per item (derivation). (3) Fixed memory: the buffer never grows or shifts (derivation).
- Format: Single card
- Curriculum: primary cs:circular-buffer; also none; prerequisites cs:stack-and-queue, cs:linked-list-vs-array; level intro; strand algorithms; references clrs-4e ch. 10 (chapter only)
- Differs from: two-stacks-make-a-queue and insert-at-front-cost. Those are about the cost of queue operations; this is a fixed-size queue with wrapped index.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 63. each-element-pops-once · concept: monotonic-stack · core · demand 2
- Audience and boundary: learner knows a stack gives last-in-first-out (back-button-stack) / does not know: that a stack of still-waiting values answers "next bigger to the right" in one pass
- Misconception: Finding the next bigger number for every position needs a scan to the right from each position: about n^2 checks.
- Prediction: "For each of 9 numbers in descending order (9 8 7 6 5 4 3 2 1), find the next bigger number to its right (there is none). Scanning right from each position costs 36 comparisons. Keeping a stack of values still waiting for their answer: how many comparisons?" options: A) 36 / B) About 18 / C) 8 (answer: C). Check (node, 2026-10-14): descending 9..1: scanning costs 8+7+...+1 = 36; the stack compares each new number with the top once: 8. For 5 3 8 1 9 2 7 4 the stack gives next-bigger 8 8 9 9 none 7 none none with 10 comparisons vs 11 by scanning (script).
- Key state: the learner has fed all nine numbers in and seen the stack hold everything; the counter reads 8; reveal unlocks after the last number.
- Interaction: "next number" button: compare with the stack top; pop and answer while top is smaller; push; a comparison counter beside the scan cost.
- Payoff (reveal line): A value waits on the stack until a bigger one arrives, and is popped exactly once, so total pushes plus pops is at most 2n and the whole pass is linear.
- Claims to check: (1) 36 vs 8 comparisons on the descending list; answers for 5 3 8 1 9 2 7 4 (simulation). (2) Each element is pushed once and popped at most once, so total work is at most 2n (derivation, amortised count). (3) Amortised analysis (CLRS 4e ch. 16).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:monotonic-stack; also none; prerequisites cs:stack-and-queue, cs:big-o-growth; level core; strand algorithms; references clrs-4e ch. 16 (chapter only)
- Differs from: postfix-stack-run (stack as expression evaluator) and two-pointers-meet (linear scans). This is a one-pass stack with a counted payoff.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 64. running-median-two-heaps · concept: two-heap-median · core · demand 1
- Audience and boundary: learner knows a heap hands back its top item fast (heap-bubble-up) / does not know: that a max-heap of the lower half and a min-heap of the upper half keeps a median at the tops
- Misconception: The median of a growing stream needs a re-sort every time a number arrives.
- Prediction: "Numbers arrive one at a time: 5, 15, 1, 3. What is the median after each one?" options: A) 5, 10, 5, 4 / B) 5, 15, 1, 3 / C) 5, 10, 7, 6 (answer: A). Check (node, 2026-10-14): sorted prefixes: [5] 5; [5,15] 10; [1,5,15] 5; [1,3,5,15] (3+5)/2 = 4 (script).
- Key state: the learner has fed all four numbers into the two heaps and read the medians off the tops; reveal unlocks after the fourth.
- Interaction: "next number" button: the number goes into the lower or upper heap and the heaps rebalance; the tops are highlighted.
- Payoff (reveal line): Keep the smaller half in a max-heap and the larger half in a min-heap, equal in size. The median is one top or the mean of both, and each new number costs log n.
- Claims to check: (1) Medians 5, 10, 5, 4 (simulation). (2) Heap insert and top removal are O(log n) (CLRS 4e ch. 6). (3) Two-heap running median is a standard technique (derivation).
- Format: Single card
- Curriculum: primary cs:two-heap-median; also cs:quickselect; prerequisites cs:heap-priority-queue; level core; strand algorithms; references clrs-4e ch. 6 (chapter only)
- Differs from: median-without-sorting (a fixed list, quickselect). This is a stream.
- Reference: TheAlgorithms/Python data_structures/ (idea source only)

### 65. clear-the-lowest-one · concept: clear-lowest-bit · core · demand 2
- Audience and boundary: learner knows bit masks keep or clear named bits (mask-the-flags) / does not know: that x & (x - 1) removes exactly the lowest set bit, so it counts ones and tests powers of two
- Misconception: Subtracting 1 changes only the last digit, as in decimal.
- Prediction: "Take 0b10110. Repeat x = x & (x - 1) until x is 0. How many repeats?" options: A) 5, one per bit position / B) 3, one per 1 bit / C) 2 (answer: B). Check (node, 2026-10-14): 10110 -> 10100 -> 10000 -> 0: 3 repeats; 2^30 takes 1 repeat vs 31 shifts to reach zero by shifting right; 255 takes 8 (script). x is a power of two iff x > 0 and x & (x - 1) = 0.
- Key state: the learner has pressed "x & (x-1)" three times and watched the lowest 1 vanish each time; reveal unlocks at x = 0.
- Interaction: an 8-bit toggle row; a button applies x & (x-1) and shows x-1 beside x; a repeat counter.
- Payoff (reveal line): Subtracting 1 flips the lowest 1 to 0 and the zeros below it to 1s, so the AND clears that bit and nothing else. Count the repeats and you have counted the ones; if one repeat gives zero, x was a power of two.
- Claims to check: (1) 10110 takes 3, 2^30 takes 1 (vs 31), 255 takes 8 (simulation). (2) x-1 flips the lowest set bit and all zeros below it (derivation). (3) Kernighan's bit-count loop (Kernighan and Ritchie, The C Programming Language, 2nd ed., exercise 2-9).
- Format: Single card
- Curriculum: primary cs:clear-lowest-bit; also none; prerequisites cs:bit-masks, cs:twos-complement; level core; strand algorithms; references none
- Differs from: mask-the-flags (fixed masks to select bits) and flip-and-add-one. Here the mask is computed from x itself.
- Reference: TheAlgorithms/Python bit_manipulation/ (idea source only)

### 66. gray-code-one-flip · concept: gray-code · core · demand 1
- Audience and boundary: learner knows binary counting (binary-numbers, titled Eight switches) / does not know: that a counting order exists where only one bit changes per step
- Misconception: Counting up in any base-2 order needs several bits to change at once at some steps.
- Prediction: "Counting 0 to 7 in ordinary binary, going from 3 (011) to 4 (100) flips 3 bits. Gray code is g = n XOR (n >> 1). How many bits flip between 3 and 4 in Gray code, and in total from 0 to 7?" options: A) 3 and 11, as binary / B) 1 and 7 / C) 1 and 11 (answer: B). Check (node, 2026-10-14): Gray sequence 000 001 011 010 110 111 101 100; 3->4 flips 1 bit; total flips 0->7 is 7 for Gray and 11 for binary (script).
- Key state: the learner has stepped through all eight numbers in both codes and read both flip totals; reveal unlocks after the last step.
- Interaction: "next" steps a counter; two rows of three lamps (binary and Gray), flipped lamps flash; running flip total.
- Payoff (reveal line): Gray code changes exactly one bit per step. Rotary encoders use it, because a sensor that reads a position between two codes can only be off by one.
- Claims to check: (1) Gray sequence and totals 7 vs 11 (simulation). (2) g = n XOR (n >> 1) changes one bit between consecutive n (derivation). (3) Gray patent 1953 (US 2,632,058, Frank Gray; check number before building).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:gray-code; also cs:hamming-code; prerequisites cs:binary-numbers, cs:bit-masks; level core; strand algorithms; references none
- Differs from: binary-numbers (switches count). This is a different counting order. Neighbour in math: binary-counting; none cover Gray.
- Reference: TheAlgorithms/Python bit_manipulation/ (idea source only)

### 67. pairs-cancel-under-xor · concept: xor-cancel · core · demand 1
- Audience and boundary: learner knows bitwise operators on a number (mask-the-flags) / does not know: that a XOR a is 0 and XOR is order-free, so one pass finds the lone value
- Misconception: Finding the one number without a partner in a list needs sorting or a table of counts.
- Prediction: "In 7 3 5 4 5 3 4, every number but one appears twice. XOR all seven together. What do you get?" options: A) 0 / B) 7 / C) 28 (answer: B). Check (node, 2026-10-14): 7^3^5^4^5^3^4 = 7; the same method gives 4 for 4 1 2 1 2 (script). A XOR A = 0 and A XOR 0 = A.
- Key state: the learner has folded the list one number at a time and seen the running value fall to 7; reveal unlocks at the last number.
- Interaction: "fold next" button XORs the next number into the running value; bit lamps show it; a toggle shuffles the order and keeps the result.
- Payoff (reveal line): XOR is its own undo and ignores order, so every pair cancels and only the single number is left. Same trick: swap two variables with no third.
- Claims to check: (1) Result 7 and 4 on the two lists (simulation, also on 1000 random shuffles). (2) XOR is associative and commutative with a ^ a = 0 (derivation). (3) Not a trick that works if numbers repeat three times (derivation).
- Format: Single card
- Curriculum: primary cs:xor-cancel; also none; prerequisites cs:bit-masks; level core; strand algorithms; references none
- Differs from: one-time-pad (XOR with a key to hide a message) and half-adder-wiring. This is XOR as cancellation inside one list.
- Reference: TheAlgorithms/Python bit_manipulation/ (idea source only)

### 68. undo-a-multiplication-mod-n · concept: modular-inverse · stretch · demand 2
- Audience and boundary: learner knows Euclid's remainders find a greatest common divisor (euclid-leftover-rectangle) / does not know: that the same steps run backwards give the x in 7x = 1 on a clock of 26
- Misconception: You can undo a multiplication on a clock the way you undo it on a number line, by dividing, or not at all.
- Prediction: "On a clock of 26 hours, multiplying by 7 scrambles the hours. Which x brings 7x back to 1 o'clock (7x leaves remainder 1 when divided by 26)?" options: A) 11 / B) 15 / C) 19 (answer: B). Check (node, 2026-10-14): 7 x 15 = 105 = 4 x 26 + 1; 15 is the only x in 0..25 (script); extended Euclid on (7, 26) gives coefficients -11 and 3, and -11 mod 26 = 15; 12 of the 25 non-zero residues have an inverse (those coprime to 26); 13 has none.
- Key state: the learner has run Euclid on 26 and 7 and back-substituted to 1 = 3 x 26 - 11 x 7; reveal unlocks when the learner reads off 15.
- Interaction: tap "divide" for each Euclid step; then "back up" to rewrite each remainder as a combination of 26 and 7; a final line shows x mod 26.
- Payoff (reveal line): If 1 = a x 26 + b x 7, then b x 7 is 1 on the 26-hour clock, so b is the undo. This exists exactly when the gcd is 1; it is the step RSA uses to make a private key.
- Claims to check: (1) Inverse of 7 mod 26 is 15, unique; 12 invertible residues (simulation). (2) Bezout identity from extended Euclid (CLRS 4e ch. 31). (3) The inverse exists iff gcd(a, n) = 1 (derivation).
- Format: Single card
- Curriculum: primary cs:modular-inverse; also none; prerequisites cs:euclid-gcd, cs:fast-exponentiation; level stretch; strand algorithms; references clrs-4e ch. 31 (chapter only)
- Differs from: euclid-leftover-rectangle (finds the gcd only) and math clock-arithmetic (clock-after-a-hundred: adding on a clock). Neighbour in cs-security: rsa-lock-with-public-key uses this step but does not teach it.
- Reference: TheAlgorithms/Python maths/ (idea source only)

### 69. every-base-fools-fermat · concept: carmichael-fermat · stretch · demand 1
- Audience and boundary: learner knows fast powers mod n (squaring-shortcut) / does not know: that a composite can pass Fermat's primality test for every base, and a stronger test catches it
- Misconception: If a^(n-1) leaves remainder 1 for a coprime base, then n is prime (or at worst fails for most bases).
- Prediction: "Fermat's test: for prime n, a^(n-1) mod n = 1. n = 561 = 3 x 11 x 17. For how many of the 320 bases coprime to 561 does a^560 mod 561 equal 1?" options: A) None, 561 is composite / B) About half / C) All 320 (answer: C). Check (node, 2026-10-14): 320 of 320 coprime bases give 1 (script). Miller-Rabin with base 2 reports composite; of bases 2..560 coprime to 561, 9 are liars (script). 22 composites below 10,000 pass the base-2 Fermat test.
- Key state: the learner has tried several bases and kept getting 1, then run the stronger square-root check and seen it fail for base 2; reveal unlocks after both.
- Interaction: a base chip and "compute a^560 mod 561" button with a result readout; a "stronger test" button that shows the repeated squaring chain.
- Payoff (reveal line): 561 is a Carmichael number: every coprime base behaves like a prime would. The stronger test also checks that no square root of 1 other than +-1 appears in the repeated squaring, and 561 fails that.
- Claims to check: (1) 320 of 320; 9 liars; 22 base-2 pseudoprimes below 10,000 (simulation). (2) 561 is the smallest Carmichael number (Carmichael 1910). (3) At most 1/4 of bases are Miller-Rabin liars for any odd composite (Rabin 1980; CLRS 4e ch. 31).
- Format: Single card
- Curriculum: primary cs:carmichael-fermat; also none; prerequisites cs:fast-exponentiation, cs:euclid-gcd; level stretch; strand algorithms; references clrs-4e ch. 31 (chapter only)
- Differs from: sieve-stops-at-five (finding primes by listing) and rsa-lock-with-public-key (needs big primes). This lesson is about how a program tests a number is prime without factoring.
- Reference: TheAlgorithms/Python maths/ (idea source only)

### 70. newton-doubles-the-digits · concept: newton-sqrt · core · demand 1
- Audience and boundary: learner knows decimals are approximations (pennies-dont-add-up) / does not know: that averaging a guess with 2/guess doubles the correct digits each step
- Misconception: Each guess gains about one more correct digit, so 12 digits needs about a dozen steps.
- Prediction: "Estimate sqrt(2) by repeating g = (g + 2/g) / 2, starting from g = 1. How many updates until g is right to 12 significant digits?" options: A) 4 / B) 8 / C) 12 (answer: A). Check (node, 2026-10-14): g: 1, 1.5, 1.41667, 1.41421569, 1.4142135623746899 (error 1.6e-12 after 4 updates); errors 0.41, 0.086, 0.0025, 2.1e-6, 1.6e-12, 2.2e-16 (script).
- Key state: the learner has pressed "update" four times and seen the matching-digits count roughly double; reveal unlocks at four updates.
- Interaction: "update" button; guess shown with matching digits highlighted; the error as a bar on a log scale.
- Payoff (reveal line): If g is too big, 2/g is too small, and their average lands much nearer. When the error is small, the new error is about its square, so digits double each step.
- Claims to check: (1) Errors 0.41, 0.086, 0.0025, 2.1e-6, 1.6e-12 (simulation, double precision). (2) Quadratic convergence: e_new is about e^2 / (2 sqrt(2)) (derivation). (3) Newton's method is the Babylonian square-root method (derivation).
- Format: Storyboard / scrub (needs spec)
- Curriculum: primary cs:newton-sqrt; also none; prerequisites cs:floating-point; level core; strand algorithms; references none
- Differs from: side-of-the-square and sqrt-as-side (math: what a root is) and pennies-dont-add-up. This is how a program computes it fast.
- Reference: TheAlgorithms/Python maths/ (idea source only)

### 71. hailstone-27-climbs · concept: collatz-steps · intro · demand 1
- Audience and boundary: learner knows a rule can be applied repeatedly (call-stack-depth) / does not know: that tiny rules make wildly different run lengths, and nobody has proved they all stop
- Misconception: If a rule is simple and the starting number is small, the run is short and predictable.
- Prediction: "Rule: if n is even, halve it; if odd, make it 3n + 1. Start at 27. How many steps until it reaches 1?" options: A) Under 30 / B) 111 / C) Never reaches 1 (answer: B). Check (node, 2026-10-14): 27 takes 111 steps and peaks at 9232; 26 takes 10, 28 takes 18; under 100 the longest start is 97 (118 steps) (script).
- Key state: the learner has run 27 to 1 and seen the peak 9232; reveal unlocks at 1.
- Interaction: "step" and "run to end" buttons; a line chart of the value; a start-number chip (26, 27, 28, 97).
- Payoff (reveal line): Every start that has been checked reaches 1, but 27 climbs to 9232 on the way and takes 111 steps while 26 takes 10. No proof is known that every start ends.
- Claims to check: (1) 111 steps, peak 9232, 10 and 18 steps for 26 and 28 (simulation). (2) Conjecture unproven (Lagarias 2010, The Ultimate Challenge: the 3x+1 problem). (3) Computers have checked every start up to about 2^68 (Barina 2021; check before building).
- Format: Storyboard / scrub (needs spec)
- Curriculum: primary cs:collatz-steps; also none; prerequisites cs:recursion; level intro; strand algorithms; references none
- Differs from: math/parity-rules (even and odd). No existing lesson runs this rule. A looping rule: tortoise-meets-hare is cycle detection; this has no known cycle apart from 4-2-1.
- Reference: TheAlgorithms/Python maths/ (idea source only)

### 72. every-second-seat-out · concept: josephus-problem · core · demand 1
- Audience and boundary: learner knows recursion simplifies to a smaller case (hanoi-tower-doubles) / does not know: that a counting-out game has a closed form based on the binary of n
- Misconception: The survivor of a circle where every second person is removed is somewhere unpredictable; you have to simulate.
- Prediction: "41 people stand in a circle numbered 1 to 41. Starting at 1, every second person is removed (2, 4, ... then round again) until one is left. Which number survives?" options: A) 1 / B) 19 / C) 41 (answer: B). Check (node, 2026-10-14): simulation gives 19; recurrence J(1)=0, J(n)=(J(n-1)+k) mod n, +1, gives 19; for k=2, n = 2^m + L gives 2L + 1: 41 = 32 + 9, so 19. n=7, k=3 gives 4 (script).
- Key state: the learner has run the circle to the end and seen 19 left; reveal unlocks there.
- Interaction: a circle of 41 dots; "remove next" or "run" button; a "people" chip (7, 10, 41).
- Payoff (reveal line): After the first lap of 41 people the circle shrinks to a smaller one whose survivor can be mapped back. For every second person, write n in binary and move the leading 1 to the end: 101001 becomes 010011 = 19.
- Claims to check: (1) Survivor 19; also 4 for n=7, k=3; 5 for n=10, k=2 (simulation). (2) Rotate-left-by-one in binary for k=2 (derivation by induction; Graham, Knuth, Patashnik, Concrete Mathematics, section 1.3). (3) The recurrence J(n) = (J(n-1) + k) mod n (derivation).
- Format: Storyboard / scrub (needs spec)
- Curriculum: primary cs:josephus-problem; also none; prerequisites cs:recursion; level core; strand algorithms; references none
- Differs from: hanoi-tower-doubles (recursion on a counting formula). A different recursion. Neighbour in math: none on Josephus.
- Reference: TheAlgorithms/Python maths/ (idea source only)

### 73. ray-counts-crossings · concept: point-in-polygon · core · demand 1
- Audience and boundary: learner knows what a polygon boundary is / does not know: that a ray from the point crossing an odd number of edges means inside, even for a notched shape
- Misconception: A point between the arms of a U-shaped polygon is inside because it is near the middle.
- Prediction: "A U-shaped polygon has corners (0,0) (6,0) (6,6) (4,6) (4,2) (2,2) (2,6) (0,6). The point (3,4) sits in the notch. Shoot a ray to the right. Is the point inside?" options: A) Inside: it is 1 crossing / B) Outside: it crosses an even number of edges / C) Cannot tell without area (answer: B). Check (node, 2026-10-14): ray from (3,4) rightwards crosses the edge x=4 and x=6: 2 crossings, outside; (1,4) crosses 3, inside; (5,4) crosses 1, inside; (3,1) crosses 1, inside; (7,4) crosses 0, outside (script).
- Key state: the learner has dragged the point into the notch and seen the crossing count read 2 (even); reveal unlocks there.
- Interaction: drag a point; a ray goes right; crossed edges light up; a count and a verdict.
- Payoff (reveal line): Each crossing flips inside to outside, and far to the right is always outside, so the parity of the crossings tells the answer. A point in the notch crosses in, then out.
- Claims to check: (1) Crossing counts 2, 3, 1, 1, 0 (simulation). (2) Jordan curve theorem for polygons (derivation; Shimrat 1962, Algorithm 112; Haines 1994). (3) Rays through a vertex need a half-open rule (derivation); the lesson avoids those cases.
- Format: Single card
- Curriculum: primary cs:point-in-polygon; also none; prerequisites none; level core; strand algorithms; references none
- Differs from: rubber-band-hull (outline of points). This tests a point against a shape and handles concave shapes.
- Reference: TheAlgorithms/Python geometry/ (idea source only)

### 74. shoelace-order-matters · concept: shoelace-area · core · demand 1
- Audience and boundary: learner knows coordinates of a point / does not know: that the shoelace sum gives area only if the corners are listed in order round the boundary
- Misconception: Area from corner coordinates depends only on which corners there are, not on the order you list them.
- Prediction: "A rectangle with corners (0,0) (4,0) (4,3) (0,3), listed in order, has shoelace area 12. List the same corners as (0,0) (4,3) (4,0) (0,3). What does the formula give?" options: A) 12, the same corners / B) 0 / C) 24 (answer: B). Check (node, 2026-10-14): sum of x_i*y_(i+1) - x_(i+1)*y_i over the closed path, halved: in order 12; reverse order -12; (0,0)(4,3)(4,0)(0,3) gives 0 (script). That order draws a bow-tie of two triangles of area 6 with opposite signs.
- Key state: the learner has dragged corners into the bow-tie order and seen the area read 0; reveal unlocks there.
- Interaction: tap corners in an order of your choice; the path is drawn; a live signed area readout; a "reset order" button.
- Payoff (reveal line): The formula adds signed slivers under each edge. A path that crosses itself makes some areas count positive and some negative, and these can cancel. The sign also tells you which way round the boundary runs.
- Claims to check: (1) 12, -12 and 0 (simulation). (2) The formula is the sum of cross products of consecutive vertices over 2 (derivation by Green's theorem). (3) Positive when corners go anticlockwise (derivation).
- Format: Single card
- Curriculum: primary cs:shoelace-area; also none; prerequisites none; level core; strand algorithms; references none
- Differs from: math/triangle-is-half and rubber-band-hull. This is area by coordinates and cross products.
- Reference: TheAlgorithms/Python geometry/ (idea source only)

### 75. groups-where-everyone-reaches-everyone · concept: strongly-connected-components · stretch · demand 1
- Audience and boundary: learner knows depth-first search; one-way edges give an order (which-order-is-allowed) / does not know: that a one-way graph splits into groups where everyone can reach everyone, and those groups form an ordering
- Misconception: In a graph with one-way roads, a town reachable from another is in the same cluster.
- Prediction: "One-way roads: 1 to 2, 2 to 3, 3 to 1, 3 to 4, 4 to 5, 5 to 6, 6 to 4, 7 to 6. How many groups are there where every town can reach every other in the group?" options: A) 2 / B) 3 / C) 7 (answer: B). Check (node, 2026-10-14): groups {1,2,3}, {4,5,6}, {7}: 3 (brute-force reachability and Kosaraju agree; script).
- Key state: the learner has run the two passes (finish order, then the reversed graph) and sees three colours; reveal unlocks at the third.
- Interaction: tap "pass 1" for finishing numbers, "reverse edges" and "pass 2" to flood groups; groups colour as they appear.
- Payoff (reveal line): Town 3 can reach 4 but 4 cannot reach back, so the two loops are different groups, and shrinking each group to a point leaves a graph with no loops. That is why the groups can be put in order.
- Claims to check: (1) Three groups (simulation). (2) Kosaraju's two-pass method (CLRS 4e section 20.5). (3) Contracting the groups gives an acyclic graph (CLRS 4e section 20.5).
- Format: Single card
- Curriculum: primary cs:strongly-connected-components; also none; prerequisites cs:depth-first-search, cs:topological-sort; level stretch; strand algorithms; references clrs-4e ch. 20, section 20.5
- Differs from: which-order-is-allowed (topological order on graphs with no loops). This finds the loops and their groups.
- Reference: TheAlgorithms/Python graphs/ (idea source only)

### 76. one-road-cuts-the-map · concept: bridges-in-graphs · core · demand 1
- Audience and boundary: learner knows depth-first search visits all connected towns (maze-depth-first) / does not know: that some single roads are critical, and how to spot them
- Misconception: The busiest town is the weak point; closing a road that is part of a loop does not matter and every other road does.
- Prediction: "Seven roads join six towns: a triangle 1-2-3, a road 3-4, and a triangle 4-5-6. Close one road at a time and test whether all towns stay connected. For how many roads does the network fall apart?" options: A) 0 / B) 1 / C) 7 (answer: B). Check (node, 2026-10-14): only 3-4 disconnects the network when closed; each triangle edge has a way round (script, remove each edge and flood-fill).
- Key state: the learner has closed all seven roads in turn and seen six keep the map whole; reveal unlocks after all seven tests.
- Interaction: tap a road to close it; a flood-fill shows reachable towns; a tally of "map stays whole" versus "map splits".
- Payoff (reveal line): A road on a loop has a detour; a bridge has none. Depth-first search finds all bridges in one pass by noting which towns can climb back above the edge.
- Claims to check: (1) Only 3-4 is a bridge (simulation). (2) A bridge is an edge on no cycle (derivation). (3) Linear-time bridge finding with low-link values (Tarjan 1974, "A note on finding the bridges of a graph").
- Format: Single card
- Curriculum: primary cs:bridges-in-graphs; also none; prerequisites cs:depth-first-search; level core; strand algorithms; references clrs-4e ch. 20 (chapter only)
- Differs from: math/bridge-parity (Konigsberg: crossing every bridge once) and undo-a-bad-push (flow). This is about single points of failure in a network.
- Reference: TheAlgorithms/Python graphs/ (idea source only)

### 77. keep-one-of-a-stream · concept: reservoir-sampling · core · demand 1
- Audience and boundary: learner knows a fair shuffle (fair-shuffle-trap) / does not know: that you can pick a uniform random item from a stream of unknown length in one pass
- Misconception: To choose a fair item from a stream you must store the whole stream first, or favour early items.
- Prediction: "A stream has 4 items. Keep item 1. For item i (i = 2, 3, 4), replace the kept one with the new item with probability 1/i. What is the chance that item 1 is the one kept at the end?" options: A) 1/2 / B) 1/4 / C) 1/8 (answer: B). Check (node, 2026-10-14): item 1 survives 1/2 x 2/3 x 3/4 = 1/4; every item's final chance is 1/4 (exact distribution, script).
- Key state: the learner has run the four draws and sees every item's bar at 1/4; reveal unlocks after the exact calculation.
- Interaction: "next item" button reveals item i and a seeded draw; bars show survival chance for each item.
- Payoff (reveal line): Later items are less likely to replace the kept one, but there are more chances to be replaced. The product cancels exactly, so each item ends with probability 1/n.
- Claims to check: (1) Every item ends with probability 1/4 (derivation and enumeration). (2) Algorithm R (Vitter 1985, "Random sampling with a reservoir", ACM TOMS; Knuth TAOCP vol. 2, section 3.4.2). (3) Memory use is one item (derivation).
- Format: Simulation run (needs spec)
- Curriculum: primary cs:reservoir-sampling; also none; prerequisites cs:fisher-yates-shuffle; level core; strand algorithms; references none
- Differs from: fair-shuffle-trap (fair permutations of a known list). This picks fairly from an unknown-length stream.
- Reference: TheAlgorithms/Python other/ (idea source only)

### 78. one-cell-rule-30 · concept: rule-30 · intro · demand 1
- Audience and boundary: learner knows a Game of Life grid updates by a neighbour rule (glider-walks) / does not know: that a one-row rule with three-cell neighbourhoods can look random from a single cell
- Misconception: A rule that treats every cell the same, started from a single cell, gives a simple tidy pattern.
- Prediction: "Rule 30: a cell's next value depends on itself and its left and right neighbours (111->0, 110->0, 101->0, 100->1, 011->1, 010->1, 001->1, 000->0). Start with one live cell. After 8 steps, how many cells are alive in the row?" options: A) 2 / B) 7 / C) 9 (answer: B). Check (node, 2026-10-14): live counts by step 0..8: 1, 3, 3, 6, 4, 9, 5, 12, 7; Rule 90 from one cell: 1, 2, 2, 4, 2, 4, 4, 8, 2 (script). Centre column steps 0..8: 110111001.
- Key state: the learner has stepped Rule 30 eight times and compared the row with Rule 90; reveal unlocks after step 8.
- Interaction: "step" button; rows stack downward; a toggle for Rule 90; a live-cell count.
- Payoff (reveal line): Rule 90 builds a tidy nested triangle. Rule 30 starts from the same single cell and gives rows with no pattern, and no formula for the count. The centre column has been used as a random number source.
- Claims to check: (1) Live counts and centre column (simulation). (2) Rule numbering (Wolfram 1983, Rev. Mod. Phys. 55). (3) Rule 30 centre column used as a pseudo-random source in Mathematica (Wolfram, A New Kind of Science 2002, p. 317; check page before building).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:rule-30; also none; prerequisites cs:game-of-life; level intro; strand algorithms; references none
- Differs from: glider-walks (2D Life). This is a one-dimensional rule, one row per step, and a simpler rule that still looks random.
- Reference: TheAlgorithms/Python cellular_automata/ (idea source only)

### 79. edges-are-differences · concept: edge-filter · intro · demand 1
- Audience and boundary: learner knows a pixel row is a list of brightness numbers (light-adds-to-yellow) / does not know: that edges are where the neighbours differ, found by sliding a tiny filter
- Misconception: An edge finder must recognise a bright or dark area first.
- Prediction: "A row of brightness values is 200 200 200 10 10 10. For each of the four inner pixels compute (right neighbour minus left neighbour). How many of the four are nonzero?" options: A) 0 / B) 2 / C) 4 (answer: B). Check (node, 2026-10-14): inner pixels (positions 2 to 5) give 0, -190, -190, 0 (script); a row 0 0 0 9 9 9 gives 0, 9, 9, 0.
- Key state: the learner has slid the filter along all four inner pixels and seen the two nonzero values sit at the step; reveal unlocks after the last pixel.
- Interaction: a draggable 3-pixel window over the row; the readout shows right minus left; a brightness-swap toggle.
- Payoff (reveal line): A flat patch gives zero whatever its brightness; only a change gives a big number. Sliding that tiny filter over every row of an image is a convolution, the building block of image processing.
- Claims to check: (1) 0, -190, -190, 0 (simulation). (2) The filter [-1 0 1] approximates the gradient (derivation; Gonzalez and Woods, Digital Image Processing). (3) Sliding a filter over a signal is a convolution/correlation (derivation).
- Format: Single card
- Curriculum: primary cs:edge-filter; also none; prerequisites cs:pixels-rgb; level intro; strand algorithms; references none
- Differs from: light-adds-to-yellow (colour mixing). First lesson on image filters in cs.
- Reference: TheAlgorithms/Python computer_vision/ (idea source only)

### 80. turns-beat-first-come-first · concept: round-robin-scheduling · intro · demand 1
- Audience and boundary: learner knows order of jobs changes average waiting (shortest-job-first-wait) / does not know: that time slices help short jobs when job lengths are unknown
- Misconception: Fairness takes longer on average: giving each job a turn must make the average wait worse than first-come-first-served.
- Prediction: "Three jobs arrive together taking 10, 1 and 1 time units. First-come-first-served makes the others wait 10 and 11, average wait (0+10+11)/3 = 7. With round-robin, one unit each in turn, what is the average wait (finish time minus work)?" options: A) 7, the same / B) About 1.7 / C) About 5 (answer: B). Check (node, 2026-10-14): round robin q=1 finish times 12, 2, 3; waits 2, 1, 2; average 1.67; q=2 gives 2.33; q=5 gives 4.33 (script).
- Key state: the learner has run both schedules for the three jobs and read both average waits; reveal unlocks after both.
- Interaction: two lanes, "tick" on each; jobs as bars; a quantum chip (1, 2, 5); average wait readout.
- Payoff (reveal line): Taking turns lets short jobs slip out early. Big quanta act like first-come-first-served; very small ones cost context switches in real systems, which this model ignores.
- Claims to check: (1) 1.67, 2.33, 4.33 vs 7 average waits (simulation). (2) The waiting-time definition used: finish time minus run time, all arrive at 0 (derivation). (3) Round-robin is fair by turns and avoids starvation (derivation; Silberschatz et al., Operating System Concepts, CPU scheduling chapter).
- Format: Side-by-side comparison (needs spec)
- Curriculum: primary cs:round-robin-scheduling; also none; prerequisites cs:shortest-job-first; level intro; strand algorithms; references none
- Differs from: shortest-job-first-wait (needs to know lengths). Round robin does not need them. Neighbour in cs-systems: none yet.
- Reference: TheAlgorithms/Python scheduling/ (idea source only)
