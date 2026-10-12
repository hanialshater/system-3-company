# CS lesson briefs: ranked backlog (cm-cs, 2026-10-12)

Ranking: demand first, then prerequisite order, then a spread of formats. Exploration briefs are marked and get the portfolio's "nobody asked yet" slot. Existing lessons (binary-numbers, binary-search, merge-sort-payoff) are not repeated. The board's planned merge-sort-payoff v2 is a revision, not a brief here. Every brief is a hand-run-the-algorithm lesson on a tiny input, with the scale-up in the reveal. No simulated review counts as learning evidence for any of these.

### 1. pennies-dont-add-up · concept: floating-point · core · demand 3
- Learner knows: binary place value (binary-numbers), decimals like 0.1 / does not know: that many decimals have no finite binary form, or that computers round them
- Misconception: A computer does decimal arithmetic exactly, so 0.1 + 0.2 is 0.3.
- Prediction: "A program adds 0.1 and 0.2 and asks if the result equals 0.3. What happens?" options: A) They are equal / B) The sum is a tiny bit more than 0.3 / C) The sum is a tiny bit less than 0.3 (answer: B). Check: in IEEE 754 double precision 0.1 + 0.2 = 0.30000000000000004, which is greater than 0.3 (runnable: `python3 -c "print(0.1+0.2)"`).
- Interaction: learner builds 0.1 from switches worth 1/2, 1/4, 1/8, 1/16 ... and tries to hit it; the running total keeps overshooting and undershooting, never landing. Readout shows the gap shrinking but never zero. 12 switches is enough to feel it.
- Payoff: 0.1 in binary repeats forever (0.000110011...), like 1/3 in decimal, so the machine stores the nearest fraction it can and small errors are normal.
- Claims to check: (1) 0.1 = 0.0001100110011... in binary, repeating "0011" (derive by repeated doubling: 0.1 -> 0.2 -> 0.4 -> 0.8 -> 1.6 -> 1.2 -> 0.4 ..., cycle found). (2) Python/JavaScript print 0.1 + 0.2 as 0.30000000000000004 (run it). (3) Doubles follow IEEE 754 binary64 (cite the standard). (4) 1/3 has no finite decimal form (long division).

### 2. fib-call-explosion · concept: memoization · core · demand 3
- Learner knows: what a function calling itself looks like (assumed, taught in the lesson by tapping through) / does not know: that naive recursion recomputes the same subproblem again and again
- Misconception: A recursive function does one piece of work per number, so fib(5) is about 5 steps.
- Prediction: "fib(n) = fib(n-1) + fib(n-2), with fib(0)=fib(1)=1 (each is one call). How many calls does fib(5) make in total?" options: A) 5 / B) 9 / C) 15 (answer: C). Check: calls C(n) = C(n-1) + C(n-2) + 1 with C(0)=C(1)=1 gives C(2)=3, C(3)=5, C(4)=9, C(5)=15.
- Interaction: learner taps the call tree open node by node; repeated subproblems light up in the same colour (fib(2) appears 3 times). Then taps "remember it" and the repeats collapse to lookups. 6 distinct values, not 15 calls.
- Payoff: remembering answers you already computed turns a tree of repeats into a single line of work.
- Claims to check: (1) call counts 3, 5, 9, 15 by the recurrence (run a counter). (2) fib(2) is computed 3 times in the fib(5) call tree (count). (3) With memoization fib(5) computes 6 distinct values, fib(0)..fib(5) (count). (4) Naive fib(30) makes 2,692,537 calls (run it: C(n) = 2*fib(n) - 1 with fib(0)=fib(1)=1, and fib(30) = 1,346,269 here; verify by running).

### 3. insertion-by-hand · concept: insertion-sort · intro · demand 3
- Learner knows: ordering numbers, what "sorted" means / does not know: any named sorting algorithm or that effort depends on how scrambled the input is
- Misconception: Sorting always costs the same effort for the same number of items.
- Prediction: "You sort 5 cards that arrive in reverse order (5, 4, 3, 2, 1) by sliding each new card left into place. How many one-step slides in total?" options: A) 4 / B) 10 / C) 15 (answer: B). Check: card k slides past all k-1 cards before it: 1+2+3+4 = 10; 5 cards already in order need 0.
- Interaction: learner drags each new card into a sorted hand; a slide counter ticks per card passed. A "shuffle" button swaps between sorted, reversed and nearly sorted starts, and the counter differs wildly. 6-8 cards.
- Payoff: insertion sort's work is the number of out-of-order pairs, so a nearly sorted hand is almost free and a reversed one is the worst case (n(n-1)/2).
- Claims to check: (1) slides in insertion sort equal the number of inversions (CLRS 2.1; Knuth Vol. 3, 5.2.1; verify by brute-force count). (2) reversed n cards need n(n-1)/2 slides: n=5 gives 10. (3) Already sorted input needs 0 slides.

### 4. hash-bucket-pileup · concept: hashing-collisions · core · demand 2
- Learner knows: a list of numbered slots / does not know: how a hash function picks a slot, or how soon two keys land in the same slot
- Misconception: With 10 slots you can store about 10 keys before collisions bother you.
- Prediction: "A hash table has 10 slots and each new key lands in a random slot. How many keys does it take before a collision is more likely than not?" options: A) 2 / B) 5 / C) 9 (answer: B). Check: P(no collision) = 1 x 0.9 x 0.8 x 0.7 = 0.504 for 4 keys (collision 49.6%), and x 0.6 = 0.3024 for 5 keys (collision 69.8%).
- Interaction: learner feeds keys one at a time (tap "next key"); a seeded hash drops each into a slot, collisions flash and chain. A reset replays with a different seed. Counter shows keys until the first collision across several runs.
- Payoff: collisions arrive long before the table is full, which is why real hash tables resize early and handle collisions on purpose. (Bridges to the birthday paradox.)
- Claims to check: (1) the product above (arithmetic). (2) First collision more likely than not at 5 keys for 10 slots (compute). (3) Chaining stores colliding keys in the same slot's list (CLRS 11.2). (4) Hash tables resize at a load factor below 1 (e.g. Java HashMap default load factor 0.75; cite docs).

### 5. sketch-the-counts · concept: count-min-sketch · stretch · demand 2 (board-planned)
- Learner knows: that a hash picks a counter slot (assumed; lesson 4 teaches it first if built in order) / does not know: that sharing counters can only overcount, never undercount
- Misconception: Counting a huge stream needs one counter per distinct item; a tiny shared table must be useless or randomly wrong.
- Prediction: "A table has 5 counters. 'cat' hashes to counter 2, 'dog' to counter 2, 'eel' to counter 4. The stream has cat x5, dog x3, eel x1. What does cat's counter read?" options: A) 5 / B) 8 / C) 3 (answer: B). Check: counter 2 receives cat's 5 plus dog's 3 = 8, while cat's true count is 5.
- Interaction: learner plays the stream item by item into a one-row table, sees the overcount, then adds a second row with a different hash and takes the smaller of the two readings. They can add rows (1 to 4) and watch the estimate settle on the truth.
- Payoff: collisions only add, so every row overestimates and the minimum across rows is the best guess; a small fixed table gives a count that is never too low.
- Claims to check: (1) an estimate is never below the true count (derivation: counters only add). (2) Taking the minimum across rows tightens the estimate (worked example, with row 2 hashing cat to a counter shared with nothing: reads 5, min(8,5) = 5). (3) Cormode and Muthukrishnan 2005: width ceil(e/eps), depth ceil(ln(1/delta)) give error at most eps x N with probability 1 - delta.

### 6. hanoi-tower-doubles · concept: recursion · core · demand 2
- Learner knows: moving one thing at a time, a rule that a big disk never sits on a small one / does not know: that solving n disks means solving n-1 disks twice
- Misconception: Each added disk adds a few more moves.
- Prediction: "3 disks need 7 moves. How many moves do 6 disks need?" options: A) 12 / B) 36 / C) 63 (answer: C). Check: moves T(n) = 2T(n-1) + 1 = 2^n - 1; 2^6 - 1 = 63.
- Interaction: learner moves 3 disks by tapping pegs, with a move counter. Then a "4th disk" button appears: they discover that the first 7 moves repeat to park the small tower. 3 to 5 disks playable.
- Payoff: to move n disks you move n-1, move one, move n-1 again, so every new disk doubles the work.
- Claims to check: (1) minimum moves for n disks is 2^n - 1 (induction; CLRS-style recurrence; brute-force BFS for n <= 5). (2) 6 disks = 63, 10 disks = 1,023, 64 disks = 18,446,744,073,709,551,615 moves (arithmetic). (3) Do not cite the "end of the world legend" as fact; if used, mark as folklore (Edouard Lucas, 1883 puzzle).

### 7. wave-from-the-corner · concept: graph-shortest-path · core · demand 2
- Learner knows: grids, up/down/left/right moves / does not know: that checking the nearest cells first finds shortest routes automatically
- Misconception: To find the shortest route you must try every route.
- Prediction: "On an open 5 x 5 grid, how many steps from one corner to the opposite corner, moving up, down, left or right?" options: A) 5 / B) 8 / C) 10 (answer: B). Check: 4 steps across plus 4 steps down = 8 (Manhattan distance).
- Interaction: learner taps to label cells step 1, step 2, ... outward from the start (a wave), and can drop walls to see the labels bend around them. The goal's label is the answer.
- Payoff: labelling by distance, nearest ring first, finds the shortest path without trying every route (breadth-first search).
- Claims to check: (1) open-grid distance is |dx| + |dy| (derivation). (2) BFS labels equal shortest distances in an unweighted graph (CLRS 22.2, Theorem 22.5). (3) The number of monotone corner-to-corner paths on 5 x 5 cells is C(8,4) = 70 (arithmetic), used in the reveal as what brute force would face.

### 8. huffman-by-merging · concept: huffman-coding · core · demand 2
- Learner knows: binary codes, bits per symbol (binary-numbers) / does not know: that codes can have different lengths and still be decodable
- Misconception: Every symbol needs the same number of bits, so a message of 8 symbols from 4 kinds costs 16 bits.
- Prediction: "A message has 4 A's, 2 B's, 1 C and 1 D. Fixed 2-bit codes cost 16 bits. How many bits does the best prefix code need?" options: A) 16 / B) 14 / C) 10 (answer: B). Check: merge C+D (2), then that with B (4), then with A (8): lengths A1, B2, C3, D3 gives 4x1 + 2x2 + 1x3 + 1x3 = 14.
- Interaction: learner repeatedly taps the two lightest nodes to merge them; the tree grows and each symbol's code is read off its path. Bit total updates after each merge.
- Payoff: giving short codes to common symbols and long codes to rare ones saves bits, and merging the two rarest first is how to build the best code.
- Claims to check: (1) Huffman's algorithm yields an optimal prefix code (Huffman 1952; CLRS 16.3). (2) The 14-bit total above (arithmetic). (3) No code word is a prefix of another in the produced code (check by listing: 0, 10, 110, 111).

### 9. coin-greedy-trap · concept: greedy-failure · core · demand 2
- Learner knows: making change / does not know: that taking the biggest coin each time can be wrong
- Misconception: Grabbing the best-looking option at each step always gives the best total.
- Prediction: "You have coins worth 1, 3 and 4. What is the fewest coins that make 6?" options: A) 2 / B) 3 / C) 4 (answer: A). Check: 3 + 3 = 6 with 2 coins; greedy takes 4 + 1 + 1 = 3 coins.
- Interaction: learner makes change by tapping coins for targets, first free-form, then watches "greedy" take over. Targets 6 and 8 (greedy 4+4 ok) are offered so they see it fail for some targets, not all.
- Payoff: greedy is fast but only right when the choices never block a better combination later; here the big coin does.
- Claims to check: (1) Minimum for 6 with {1,3,4} is 2 (exhaustive search). (2) Greedy gives 3 coins for 6 (run). (3) Greedy is optimal for standard coin systems like {1,5,10,25} (cite CLRS exercise 16.1-3 or Kozen and Zaks 1994; keep claim narrow to this set, checkable by program).

### 10. back-button-stack · concept: stack-and-queue · intro · demand 2
- Learner knows: visiting web pages / does not know: that "last in, first out" explains the back button
- Misconception: Back always returns to the page you looked at just before, in the order you visited them.
- Prediction: "You visit pages A, B, C, D, press Back twice, then visit E. You press Back once. Where are you?" options: A) C / B) B / C) D (answer: B). Check: stack A,B,C,D -> back twice leaves A,B -> visit E gives A,B,E -> back lands on B.
- Interaction: learner plays the browser: tap links and Back while a stack of pages (one column on the stage) grows and shrinks. A second mode swaps to a queue (line at a till) to feel the difference.
- Payoff: a stack gives back the newest thing first; visiting a new page after going back throws away the old forward pages.
- Claims to check: (1) the trace above (simulate). (2) Browsers keep a session history where navigating after going back discards forward entries (HTML Living Standard, "session history"; cite). (3) Stack is LIFO, queue is FIFO (CLRS 10.1).

### 11. lopsided-tree · concept: binary-search-tree · core · demand 2
- Learner knows: binary search halves a sorted list (binary-search) / does not know: that a search tree's shape depends on the insertion order
- Misconception: A binary search tree is always shallow, so a lookup always takes about log2 n steps.
- Prediction: "Insert 1, 2, 3, 4, 5, 6, 7 into an empty binary search tree in that order. How many levels deep is it?" options: A) 3 / B) 4 / C) 7 (answer: C). Check: each new key is larger than all before it, so it hangs as the right child of the last: a chain of 7. Inserting 4,2,6,1,3,5,7 gives 3 levels.
- Interaction: learner drags 7 numbered tokens into an order, then watches the tree form as each is inserted. Shuffling the order makes shape change; the readout shows depth and steps to find 7.
- Payoff: the tree is only as good as its insertion order; sorted input degrades it to a list, which is why balancing trees exist.
- Claims to check: (1) the depth results (simulate both orders). (2) Sorted insertion makes a degenerate tree with height n-1 (CLRS 12.1, 12.3). (3) A perfectly balanced tree of 7 nodes has height 3 levels (2^3 - 1 = 7).

### 12. lru-eviction-order · concept: lru-cache · core · demand 2
- Learner knows: that fetching from far away is slow / does not know: that caches evict by recent use, not by arrival
- Misconception: A full cache drops whatever arrived first.
- Prediction: "A cache holds 3 items. Requests arrive A, B, C, A, D. Which item is evicted when D arrives (least recently used rule)?" options: A) A / B) B / C) C (answer: B). Check: last uses are B at 2, C at 3, A at 4; B is oldest, so B goes. (First-in rule would evict A.)
- Interaction: learner plays a request stream by tapping items; a 3-slot cache shows recency order, and hits and misses are counted. A toggle swaps to first-in-first-out and the miss count changes on the same stream.
- Payoff: recently used things are likely to be used again, so evicting the least recently used keeps more hits.
- Claims to check: (1) the trace above (simulate). (2) LRU vs FIFO miss counts on the chosen stream (run both). (3) LRU is a standard replacement policy (Silberschatz, Operating System Concepts, page replacement; cite).

### 13. route-explosion · concept: combinatorial-explosion · stretch · demand 2
- Learner knows: that a route visits cities in some order / does not know: how fast the number of orders grows
- Misconception: Adding one more city adds a few more routes to check, so a computer just checks them all.
- Prediction: "Start at home and visit 9 other cities once each, in any order. How many different orders are there?" options: A) 81 / B) 362,880 / C) 3,628,800 (answer: B). Check: 9! = 9x8x7x6x5x4x3x2x1 = 362,880. (10! = 3,628,800 would count the start city too.)
- Interaction: learner lays out routes for 4 cities by hand and counts (3! = 6), then adds cities one at a time while a counter multiplies. A "checks per second" slider shows how long brute force would take.
- Payoff: each new city multiplies the routes by the number of cities, so brute force dies by about 20 cities.
- Claims to check: (1) factorial values: 3! = 6, 9! = 362,880 (arithmetic). (2) 20 cities leave 19! = 121,645,100,408,832,000 orders (arithmetic). (3) At a billion routes per second, 19! orders take about 3.9 years (121,645,100,408,832,000 / 10^9 / 31,557,600 = 3.85). (4) TSP is NP-hard (Karp 1972; Garey and Johnson); avoid claiming brute force is the only way.

### 14. list-doubling-copies · concept: dynamic-array-doubling · core · demand 2
- Learner knows: a list that has a fixed size / does not know: why appending is cheap on average even though resizing copies everything
- Misconception: Each time the list fills, copying everything makes appending slow, so n appends cost about n squared.
- Prediction: "A list starts with room for 1 item and doubles whenever it is full. After appending 16 items, how many item-copies did all resizes do in total?" options: A) 15 / B) 30 / C) 120 (answer: A). Check: resizes happen when adding item 2, 3, 5, 9, copying 1, 2, 4, 8 items: 1+2+4+8 = 15.
- Interaction: learner taps "append" and watches the row fill; when full, they must tap "grow" and see the copy counter jump. The running copies-per-append number settles below 1.
- Payoff: doubling means copy costs add up to less than one copy per append on average, so appending is cheap in the long run.
- Claims to check: (1) the copy count for 16 appends (simulate; 1+2+4+8 = 15). (2) For n = 2^k appends total copies are n - 1 (geometric sum). (3) Amortized O(1) append for doubling arrays (CLRS 17.4).

### 15. pivot-lands-home · concept: quicksort-partition · core · demand 2
- Learner knows: sorted order, merging (divide-and-conquer) / does not know: that one pass can fix a single item's final place
- Misconception: Sorting must compare everything before anything is in its final place.
- Prediction: "Partition [5, 2, 8, 1, 9, 3, 7] around pivot 5 (smaller values left, larger right). At which position (counting from 0) does 5 end up?" options: A) 2 / B) 3 / C) 4 (answer: B). Check: three values are smaller (2, 1, 3), so 5 sits after exactly three items, position 3.
- Interaction: learner sorts cards into "smaller" and "larger" piles around the pivot by tapping each card; the pivot snaps into its final slot. They then choose pivots for each pile and see the recursion shape.
- Payoff: one partition permanently places the pivot, and splitting around it leaves two independent smaller problems.
- Claims to check: (1) the pivot position equals the count of smaller items (derivation). (2) Quicksort averages about 1.39 n log2 n comparisons (Knuth Vol. 3, 5.2.2; CLRS 7.4). (3) Worst case n(n-1)/2 on sorted input with first-element pivot (CLRS 7.2).

### 16. maze-depth-first · concept: depth-first-search · core · demand 2
- Learner knows: a graph as places and links (introduced in lesson 7 if built in order) / does not know: that going deep first finds a path but not necessarily the shortest
- Misconception: The first path an exploring algorithm finds is the shortest.
- Prediction: "Three places: S links to A and G, and A links to G. Depth-first search from S tries neighbours alphabetically and goes deeper before trying others. Which path to G does it return?" options: A) S, G / B) S, A, G / C) S, A, S, G (answer: B). Check: from S take A first; A's neighbours are S (visited) and G; go to G: path S, A, G (2 steps, though S, G is 1 step).
- Interaction: learner walks a small maze with a stack of choices visible, pressing "dead end, back up" when stuck. A second maze shows a long winding path found first.
- Payoff: depth-first search commits to one branch until it dead-ends, which is easy to do and finds a path, but not the shortest one.
- Claims to check: (1) the trace above (simulate). (2) DFS does not guarantee shortest paths (CLRS 22.3). (3) DFS with a stack backtracks on dead ends (derivation).

### 17. two-flips-slip-by · concept: parity-check · intro · demand 1 [exploration]
- Learner knows: bits are 0 or 1 (binary-numbers) / does not know: how a check bit can detect corruption, or its limit
- Misconception: A check bit catches any corruption of the message.
- Prediction: "A message has an even-parity check bit. Two of its bits flip in transit. Does the receiver notice?" options: A) Always / B) Only if the flipped bits are next to each other / C) No, it can miss it (answer: C). Check: each flip changes the count of 1s by 1, so two flips restore the original parity and the check passes.
- Interaction: learner plays the noisy wire: taps bits to flip them in transit and watches the parity light. One flip: red. Two flips: green again. No slider and no explanatory text on stage; they discover the rule by trying 0 to 4 flips.
- Payoff: parity detects an odd number of flips and is blind to an even number.
- Claims to check: (1) a single bit flip always changes parity (derivation). (2) Any even number of flips leaves parity unchanged (derivation). (3) Parity is used in simple error detection (cite e.g. Hamming 1950, or textbook link-layer chapter).

### 18. runs-that-grow · concept: run-length-encoding · intro · demand 2 [exploration]
- Learner knows: reading a row of black and white squares / does not know: that a compression scheme can make some inputs bigger
- Misconception: Compression always makes things smaller.
- Prediction: "Write a row as count-then-letter: WWWW becomes 4W. For the row BWBWBWBW (8 pixels), is the coded version shorter, the same, or longer?" options: A) Shorter / B) The same / C) Longer (answer: C). Check: 1B1W1B1W1B1W1B1W is 16 characters versus 8.
- Interaction: learner builds the model: they paint pixels on an 8 to 16 cell strip and the encoded string builds live below. They try to find the row that compresses best and the row that expands most; the byte counter shows each.
- Payoff: run-length coding wins only when there are long runs; for patterns without runs it backfires, and no scheme shrinks everything.
- Claims to check: (1) the 16 versus 8 count (arithmetic). (2) An all-white row of 16 encodes as 16W (3 chars). (3) No lossless compressor can shrink every input (counting argument: 2^n strings, fewer than 2^n shorter strings; cite e.g. Sayood or CLRS-level text).

### 19. half-adder-wiring · concept: logic-gates · intro · demand 2 [exploration]
- Learner knows: binary addition of single bits / does not know: that arithmetic can be built from AND and XOR gates
- Misconception: A computer has to "know" arithmetic; it cannot be wires and switches.
- Prediction: "Adding two one-bit numbers, 1 + 1, with a circuit. What are the outputs (carry, sum)?" options: A) carry 1, sum 1 / B) carry 1, sum 0 / C) carry 0, sum 1 (answer: B). Check: 1 + 1 = 2 = 10 in binary, so carry 1, sum 0. Sum = A XOR B and carry = A AND B: 1 XOR 1 = 0, 1 AND 1 = 1.
- Interaction: learner builds the model: drags gates (AND, XOR) onto a tiny board and wires inputs to outputs, then toggles inputs to test all four cases against a target truth table. No slider and almost no text on stage.
- Payoff: adding is nothing more than two gates side by side: XOR for the digit, AND for the carry.
- Claims to check: (1) truth tables of AND and XOR (definition). (2) Half adder: sum = A XOR B, carry = A AND B (verify against all four rows). (3) Chaining full adders adds multi-bit numbers (cite Patterson and Hennessy; show 3 + 1 = 100).

### 20. wheel-of-negatives · concept: twos-complement · core · demand 2
- Learner knows: 8 switches reach 255 (binary-numbers) / does not know: how a negative number is stored, or that counters wrap
- Misconception: Adding 1 to the biggest number just makes a bigger number.
- Prediction: "In an 8-bit signed number (two's complement), what is 127 + 1 (01111111 + 1)?" options: A) 128 / B) -128 / C) 0 (answer: B). Check: the result pattern is 10000000; in two's complement the top switch is worth -128, so the value is -128.
- Interaction: learner turns a 256-position wheel (drag or step button), reading the 8 switches and the signed value together; they cross 127 to -128 and 255 back to 0 on the same wheel. One representation only.
- Payoff: numbers live on a circle, and negatives are the second half of it, so overflow wraps instead of growing.
- Claims to check: (1) top bit has weight -128 in 8-bit two's complement (definition; Patterson and Hennessy). (2) Range is -128 to 127 (arithmetic: -2^7 .. 2^7 - 1). (3) 11111111 = -1 (-128 + 127). (4) Adding 1 to 127 gives -128 in wraparound arithmetic (compute).

### 21. one-bit-avalanche · concept: cryptographic-hash · core · demand 2 [exploration]
- Learner knows: a hash maps data to a fixed-size output / does not know: that a good hash output looks unrelated after a tiny input change
- Misconception: Similar inputs give similar hashes, so a hash is a rough fingerprint of the content.
- Prediction: "SHA-256 hashes a message to 256 bits. You flip one bit of the message. About how many output bits change?" options: A) About 1 / B) About 128 / C) About 10 (answer: B). Check: a good hash behaves randomly, so each output bit flips with probability 1/2: expected 256/2 = 128 (runnable: compare `sha256` of two inputs that differ by one bit).
- Interaction: no slider and no prose. The learner taps single bits of a short input; a 16 x 16 grid of output bits recolours, with changed cells highlighted and a count. Each tap gives a fresh scatter of about half.
- Payoff: one input bit scrambles about half the output, so you cannot nudge a message toward a target hash.
- Claims to check: (1) SHA-256 produces 256 bits (FIPS 180-4). (2) Avalanche: about half of the output bits change for a one-bit input change (check by running 1,000 pairs; mean near 128). (3) The in-lesson implementation matches a reference SHA-256 on test vectors (e.g. "abc" = ba7816bf...).

### 22. the-contrary-program · concept: halting-problem · stretch · demand 2 [exploration]
- Learner knows: that programs run and sometimes loop forever / does not know: that no program can always tell which will happen
- Misconception: With enough cleverness, a program could check any other program for infinite loops.
- Prediction: "A checker H says whether a program halts. Program D asks H about itself, then does the opposite: loops if H says 'halts', halts if H says 'loops'. Can H be right about D?" options: A) Yes, if H is clever enough / B) No, whatever H says is wrong / C) Only for short programs (answer: B). Check: if H says D halts, D loops; if H says D loops, D halts; both answers are wrong.
- Interaction: learner plays the checker. They pick H's verdict on D (halts or loops) and watch D contradict it, then try other programs where a verdict can be right. Learner builds the argument by choosing; almost no text.
- Payoff: a perfect halting checker would defeat itself, so no such program can exist.
- Claims to check: (1) the case analysis above (two cases, each contradictory). (2) Turing 1936 proved the halting problem undecidable (cite; Sipser, Introduction to the Theory of Computation, Thm 4.11). (3) Specific programs can be analysed; only the general checker is impossible (state narrowly).
