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
