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

## Round 2 (cm-cs, 2026-10-12): briefs #23-#55

Round 2 adds 20 concepts to the map and 13 second angles on existing concepts (each says how it differs). Every prediction answer was recomputed by `artifacts/scratch/cm-cs-r2/check.mjs` (output matches the "Check" lines). Each brief names the key state: the reveal unlocks only once the learner has reached it (earn-the-reveal), and the reveal is written from what they saw. Exploration briefs (marked) are 10 of 33. Still no simulated review counts as learning evidence.

### 23. bisect-the-bad-commit · concept: binary-search · intro · demand 3
- Learner knows: that binary search halves a sorted list (angle differs from the built binary-search lesson: here the "list" is history and the test is run, not read) / does not know: that any yes/no test that flips once can be halved
- Misconception: To find which of 1,000 versions broke something you must test them one by one, or about half of them.
- Prediction: "Version 1 works and version 1,000 is broken. Each test tells you only 'works' or 'broken' for one version. What is the most tests you could ever need to find the first broken one?" options: A) 10 / B) 500 / C) 1,000 (answer: A). Check: 2^9 = 512 < 1,000 <= 1,024 = 2^10, so 10 halvings suffice.
- Key state: after 3 tests the learner sees the suspect range shrink 1000 -> 500 -> 250 -> 125; the reveal unlocks once the range is under 10 versions.
- Interaction: tap a version to test it; the bar of suspects greys out the half you can rule out. One strip, nothing else.
- Payoff: any test that flips from "works" to "broken" once can be halved, so 1,000 versions cost 10 tests.
- Claims to check: (1) 2^10 = 1,024 >= 1,000 > 512 (arithmetic). (2) `git bisect` uses this method (git documentation). (3) The method needs the break to be permanent once it appears (state as the assumption).

### 24. quadratic-wall · concept: big-o-growth · core · demand 2
- Learner knows: counting steps for small inputs / does not know: that comparing every pair makes work grow with the square
- Misconception: 100 times more items means about 100 times more work.
- Prediction: "Checking every pair among 10 files takes 45 comparisons. About how many for 1,000 files?" options: A) 4,500 / B) 499,500 / C) 45,000,000 (answer: B). Check: 1000 x 999 / 2 = 499,500.
- Key state: the learner has grown the group from 5 to 10 to 20 and seen the pair count go 10, 45, 190, so doubling the group roughly quadruples the lines; the reveal unlocks at 20.
- Interaction: a group of dots with a slider for size (2 to 20); every pair gets a line and the counter updates. One picture.
- Payoff: pair-checking grows with the square: 100 times the items means about 10,000 times the work.
- Claims to check: (1) n(n-1)/2 for n=5,10,20,1000 gives 10, 45, 190, 499,500 (run). (2) 100x items gives 499,500/45 = 11,100x work here, tending to 10,000x (arithmetic).

### 25. bad-hash-one-bucket · concept: hashing-collisions · core · demand 2
- Learner knows: that a hash picks a slot (hash-bucket-pileup, #4) / does not know: that the hash function itself can be the cause of pileups
- Misconception: Any hash function spreads keys evenly; only the table size matters.
- Prediction: "A 10-slot table uses slot = key mod 10. You insert the keys 10, 20, 30, ... 100. How many different slots end up used?" options: A) 1 / B) 5 / C) 10 (answer: A). Check: every multiple of 10 has remainder 0 (run).
- Key state: the learner has dropped at least four keys and sees them all stack in slot 0 while nine slots stay empty.
- Interaction: tap keys from a tray into the table; a switch changes the rule to "mod 7" and the same keys spread out. One table.
- Payoff: a hash must break up the patterns in real keys; a bad one turns a table into one long list.
- Claims to check: (1) result above (run). (2) With mod 7 the 10 keys land in 7 different slots? (compute; check before using the switch). (3) Chaining cost grows with chain length (CLRS 11.2).

### 26. call-stack-depth · concept: recursion · core · demand 2
- Learner knows: calling a function (differs from hanoi-tower-doubles #6, which is about doubling work: here it is about calls waiting) / does not know: that each unfinished call waits with its own copy of the variables
- Misconception: A recursive call replaces the earlier one, so only one call exists at a time.
- Prediction: "factorial(n) = n x factorial(n-1) and factorial(0) = 1. At the deepest moment of factorial(3), how many calls are waiting or running?" options: A) 1 / B) 3 / C) 4 (answer: C). Check: calls for 3, 2, 1 and 0 are all open (instrument a depth counter: max 4).
- Key state: the learner has stepped in until the base case factorial(0) shows and four stacked boxes are visible; the reveal unlocks only after they step back out once and see 1, 1, 2, 6 come back.
- Interaction: a "step in" and "step out" pair of buttons on a vertical stack of boxes; each box shows its n and what it is waiting for.
- Payoff: each call waits for the one below it; the base case is what lets answers climb back up.
- Claims to check: (1) max depth 4 and return values 1, 1, 2, 6 (run). (2) Without a base case calls never stop and the stack overflows (run in node: RangeError).

### 27. tournament-second-best · concept: divide-and-conquer · core · demand 2 [exploration]
- Learner knows: finding the biggest by comparing / does not know: that a knockout bracket finds the runner-up with very few extra comparisons
- Misconception: After finding the champion of 8 you must search the other 7 again to find the second best.
- Prediction: "8 players, knockout rounds, the champion is found in 7 matches. Which players could be the second best?" options: A) All 7 others / B) Only the 3 the champion beat directly / C) Only the final's loser (answer: B). Check: the second best lost only to the best, so it met the champion in some round; the champion played 3 matches (script: over 3,000 random brackets there are always exactly 3 candidates and the true second is always among them).
- Key state: the learner has tapped the champion and sees exactly 3 players light up (their direct victims); the reveal unlocks after they have tried to make a non-victim the second best and failed.
- Interaction: no prose. The learner drags player strengths into a bracket, plays it, taps the champion, and tries to place the second-strongest anywhere outside the three. One bracket.
- Payoff: splitting into pairs finds the winner and, as a free side effect, a shortlist of 3 for second place: 2 more matches, 9 in all, not 13.
- Claims to check: (1) 7 + 2 = 9 matches versus 7 + 6 = 13 naive (arithmetic). (2) The second best is among those who lost to the champion (proof by contradiction). (3) Knuth Vol. 3, 5.3.3 treats selecting the second largest (cite; do not overstate optimality).

### 28. big-number-swallows-one · concept: floating-point · core · demand 3 [exploration]
- Learner knows: that 0.1 + 0.2 misbehaves (pennies-dont-add-up, #1) / does not know: that big numbers lose whole integers, not just tiny fractions
- Misconception: Rounding errors only hide in far decimal places; whole numbers are always safe.
- Prediction: "In JavaScript, 9007199254740992 + 1 is evaluated. What comes out?" options: A) 9007199254740993 / B) 9007199254740992 / C) An error (answer: B). Check: node prints `9007199254740992 + 1 === 9007199254740992` as true; 2^53 is the last point where every integer fits (and +2 gives ...994).
- Key state: the learner has slid a counter up through 2^53 - 1 (steps count) and seen +1 stop changing the display at 2^53; the reveal unlocks after at least one step beyond it.
- Interaction: a "+1" button on a big number whose digits animate; past 2^53 the number refuses to change, and a "+2" button then does.
- Payoff: a double has 53 bits of whole-number precision, so beyond 2^53 neighbours are 2 apart and adding 1 is rounded away.
- Claims to check: (1) result above (run in node). (2) IEEE 754 binary64 has a 53-bit significand (standard). (3) Number.MAX_SAFE_INTEGER = 2^53 - 1 (MDN/ECMAScript).

### 29. flip-and-add-one · concept: twos-complement · core · demand 2
- Learner knows: reading signed numbers on the wheel (wheel-of-negatives, #20) / does not know: how to get -5 from 5
- Misconception: Negative numbers are stored as the positive pattern with a minus-sign bit.
- Prediction: "In 8 bits, 5 is 00000101. Flip every bit, then add 1. What do you get?" options: A) 11111010 / B) 11111011 / C) 10000101 (answer: B). Check: flip gives 11111010, +1 gives 11111011 = -128 + 123 = -5 (run: `(~5+1)&0xff`).
- Key state: the learner has flipped all eight switches and added 1, then added the result to 5 and seen the wheel return to 0.
- Interaction: 8 tappable bits; a "flip all" and a "+1" button; a live signed readout. Learner finishes by adding 5 and the pattern to see 00000000.
- Payoff: flipping and adding 1 produces the pattern that cancels the number when added, which is why subtraction is just addition.
- Claims to check: (1) 11111011 is -5 (weights -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5). (2) 00000101 + 11111011 = 1 00000000, drop the carry, 0 (compute). (3) Patterson and Hennessy for the method.

### 30. heap-bubble-up · concept: heap-priority-queue · core · demand 1
- Learner knows: a tree as parent and children, comparison / does not know: how a heap keeps its smallest at the top cheaply
- Misconception: To keep the smallest item on top after each insert you must re-sort everything.
- Prediction: "A min-heap holds [2, 5, 3, 9, 6] (parent of index i is (i-1)/2 rounded down). You insert 1 at the end and swap up while smaller than the parent. What is the final array?" options: A) [1, 5, 2, 9, 6, 3] / B) [1, 2, 3, 9, 6, 5] / C) [2, 5, 3, 9, 6, 1] (answer: A). Check: 1 swaps with 3 (index 5 -> 2) then with 2 (index 2 -> 0): [1, 5, 2, 9, 6, 3] (run).
- Key state: the learner has watched 1 climb two levels, swapping with exactly two parents; the reveal unlocks once the 1 reaches the root.
- Interaction: tap "swap up" on the new item, which is shown in the tree; a counter shows swaps against the tree height.
- Payoff: an insert climbs at most the height of the tree, about log2 n swaps, so the smallest is always on top without sorting.
- Claims to check: (1) the swap sequence (run). (2) Height of an n-node heap is floor(log2 n) (CLRS 6.1). (3) Insert costs O(log n) (CLRS 6.5).

### 31. turnstile-remembers-state · concept: finite-state-machine · intro · demand 1
- Learner knows: pushing, coins / does not know: that a machine can remember only its state, not a count
- Misconception: The turnstile counts coins, so two coins in a row buy two passes.
- Prediction: "A turnstile is locked. Events: coin, push, push, coin, coin, push. How many people get through?" options: A) 2 / B) 3 / C) 4 (answer: A). Check: coin unlocks, push passes (locks), push blocked, coin unlocks, coin does nothing (already unlocked), push passes: 2 (run).
- Key state: the learner has tapped coin twice in a row and seen the state stay "unlocked", then pushed once and seen it lock.
- Interaction: two buttons (coin, push) on a two-circle diagram where the active state glows; a log of passes. One diagram.
- Payoff: a state machine's whole memory is which state it is in, so the second coin was simply lost.
- Claims to check: (1) trace above (run). (2) The turnstile is a standard two-state FSM example (Sipser or Sedgewick; cite).

### 32. paint-mix-shared-secret · concept: public-key-crypto · stretch · demand 1 [exploration]
- Learner knows: remainders (assumed) / does not know: that two people can agree on a secret in public
- Misconception: Two strangers cannot agree on a secret over a channel an eavesdropper hears completely.
- Prediction: "Public: modulus 23, base 5. Alice's secret 6 gives her public number 5^6 mod 23 = 8; Bob's secret 15 gives 19. Bob raises Alice's 8 to his 15 mod 23, Alice raises Bob's 19 to her 6 mod 23. What do they get?" options: A) The same number, 2 / B) The same number, 8 / C) Different numbers (answer: A). Check: 8^15 mod 23 = 2 = 19^6 mod 23 (run with BigInt).
- Key state: the learner has computed both sides on a small clock of 23 and sees the two readings land on the same marker; the reveal unlocks after one side is computed and the other matched.
- Interaction: a 23-position clock; the learner steps the multiplication by taps, first with Alice's secret, then Bob's. No algebra on stage.
- Payoff: because powers commute, both sides reach 5^(6x15) mod 23, while the listener has only the two public numbers.
- Claims to check: (1) 5^6 mod 23 = 8, 5^15 mod 23 = 19, shared 2 (run). (2) Diffie and Hellman 1976. (3) With tiny numbers the secret can be found by brute force (23 candidates); real systems use huge moduli (state, do not give key sizes unverified).

### 33. bloom-maybe-yes · concept: bloom-filter · stretch · demand 1 [exploration]
- Learner knows: hashing to a slot / does not know: that "all my bits are set" does not prove the item was added
- Misconception: If the filter says an item might be there, the item is there.
- Prediction: "A 10-bit filter. 'cat' set bits 1, 4, 7 and 'dog' set 2, 4, 8. Now 'eel' would check bits 1, 2, 7. What does the filter answer?" options: A) Definitely not added / B) Maybe added / C) Definitely added (answer: B). Check: bits 1, 2, 4, 7, 8 are on; 1, 2, 7 are all on though eel was never added (run).
- Key state: the learner has added two items and seen eel's three bits all lit by other items; the reveal unlocks after they also test an item that has an unset bit.
- Interaction: tap items to add them to a row of 10 bits, then tap query items; the filter lights a "no" or a "maybe". One strip.
- Payoff: a "no" is certain, a "yes" is only "maybe", and that one-sided doubt buys a tiny memory footprint.
- Claims to check: (1) the trace above. (2) A Bloom filter has no false negatives (Bloom 1970; derivation). (3) False-positive rate (1 - e^(-kn/m))^k (standard approximation; verify by simulation before quoting).

### 34. light-adds-to-yellow · concept: pixels-rgb · intro · demand 2 [exploration]
- Learner knows: three numbers describe a pixel (pixels-rgb) / does not know: that screens add light, so red + green looks yellow
- Misconception: Colours on a screen mix like paint, so red plus green gives brown.
- Prediction: "A pixel is set to red 255, green 255, blue 0. What colour appears?" options: A) Brown / B) Yellow / C) White (answer: B). Check: rgb(255,255,0) is the CSS colour yellow (#ffff00; CSS Color spec).
- Key state: the learner has moved red and green sliders to full with blue at zero and watched the swatch go yellow; the reveal unlocks only after blue is then raised and the swatch turns whiter.
- Interaction: three tappable channel bars with steps of 0, 128, 255; one big swatch. No text beyond the numbers.
- Payoff: screens add light, so mixing lights gets brighter, the opposite of mixing paint.
- Claims to check: (1) rgb(255,255,0) is yellow (CSS Color Module). (2) rgb(255,255,255) is white (same). (3) Additive versus subtractive mixing (state narrowly; cite a colour-science text).

### 35. insert-at-front-cost · concept: linked-list-vs-array · intro · demand 2
- Learner knows: a row of items / does not know: that an array must shift everything to insert at the front
- Misconception: Inserting is equally cheap in any structure.
- Prediction: "A 6-item array needs a new item at the front. How many existing items must move?" options: A) 1 / B) 6 / C) 7 (answer: B). Check: all 6 slide one slot right; a linked list changes 1 pointer (script).
- Key state: the learner has inserted at the front of the array and watched all six slide; the reveal unlocks after they have also reached the 4th item of the list and counted 3 hops.
- Interaction: toggle between an array row and a chain of nodes; "insert at front" and "go to item 4" buttons with a step counter.
- Payoff: arrays make reaching an item free and inserting costly; linked lists do the opposite.
- Claims to check: (1) shifts = n for insertion at front (derivation). (2) Reaching the k-th node of a linked list takes k-1 hops (derivation). (3) CLRS 10.2 for linked lists.

### 36. euclid-leftover-rectangle · concept: euclid-gcd · core · demand 2
- Learner knows: division with remainder / does not know: that gcd(a,b) = gcd(b, a mod b)
- Misconception: Finding the greatest common divisor means testing every smaller number.
- Prediction: "A 48 by 18 rectangle is tiled with the largest identical squares that fit exactly. How big is each square?" options: A) 3 / B) 6 / C) 9 (answer: B). Check: gcd(48,18) = 6 (48 = 2x18 + 12; 18 = 1x12 + 6; 12 = 2x6).
- Key state: the learner has cut off two 18-squares, then one 12-square, and the leftover is a 6 by 6; the reveal unlocks once the last strip is exactly tiled.
- Interaction: tap "cut a square" from the remaining rectangle; a strip is left over; repeat.
- Payoff: cutting off the biggest squares shrinks the problem until the leftover tiles perfectly, and its side is the common divisor.
- Claims to check: (1) gcd(48,18) = 6 (run). (2) Euclid, Elements VII.2 (cite). (3) The steps for 48,18 are 3 (run).

### 37. sieve-stops-at-five · concept: sieve-of-eratosthenes · intro · demand 2
- Learner knows: what a prime is / does not know: that you need only cross out multiples of numbers up to the square root
- Misconception: To find all primes up to 30 you must cross out multiples of every number up to 30.
- Prediction: "Crossing out multiples on a 2-to-30 grid, what is the largest number whose multiples you ever need to cross out?" options: A) 29 / B) 15 / C) 5 (answer: C). Check: any composite <= 30 has a factor <= 5 (since 6 x 6 = 36 > 30); script shows the sieve loop stops at 5 and leaves 10 primes.
- Key state: the learner has crossed out multiples of 2, 3, 5 and sees no unmarked composite remains; the reveal unlocks after they try 7 and nothing changes.
- Interaction: a 2-30 grid; tap a number to cross out its multiples; tapping a number whose multiples are all already gone does nothing visible, which the learner discovers.
- Payoff: every composite has a small factor, so crossing out up to the square root finds all primes.
- Claims to check: (1) the primes to 30 are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 (run). (2) A composite n has a prime factor <= sqrt(n) (proof). (3) Sieve of Eratosthenes; do not give an exact date for Eratosthenes' sieve, say "ancient".

### 38. squaring-shortcut · concept: fast-exponentiation · core · demand 2
- Learner knows: that powers are repeated multiplication / does not know: that results can be reused to double the exponent
- Misconception: 3^16 needs 15 multiplications.
- Prediction: "You may multiply any two numbers you already have. What is the fewest multiplications to get 3^16 from 3?" options: A) 4 / B) 8 / C) 15 (answer: A). Check: 3^2, 3^4, 3^8, 3^16 is 4; script's exhaustive search finds no 3-step chain, since each step at most doubles the exponent (2^3 = 8 < 16).
- Key state: the learner has squared 3 four times and sees 16 on the exponent line; the reveal unlocks after a try at 3^15 shows the extra step needed.
- Interaction: an exponent line; tap two held values to multiply and make a new marker; counter of multiplications.
- Payoff: squaring doubles the exponent each time, so 2^k needs k steps, and any exponent needs about log2 n of them.
- Claims to check: (1) the 4-step chain; no 3-step chain (exhaustive search script). (2) Square-and-multiply (Knuth Vol. 2, 4.6.3).

### 39. byte-in-two-digits · concept: hexadecimal · intro · demand 2
- Learner knows: reading 8 bits (binary-numbers) / does not know: that a hex digit is just four bits
- Misconception: Hex is a new, separate number system you must convert through decimal.
- Prediction: "The byte 11010110 is split into 1101 and 0110. What is it in hex?" options: A) D6 / B) C6 / C) 6D (answer: A). Check: 1101 = 13 = D, 0110 = 6 (run: parseInt('11010110',2).toString(16) = 'd6').
- Key state: the learner has set two groups of four switches and watched each group's hex digit appear independently; the reveal unlocks after changing the high group without the low group changing.
- Interaction: eight switches in two groups of four; each group shows one hex symbol 0-F.
- Payoff: hex is binary written four bits at a time, so a byte is exactly two digits.
- Claims to check: (1) 1101 = 13 = D (arithmetic). (2) Hex digits A-F stand for 10-15. (3) 2^4 = 16 digit values per four bits.

### 40. mask-the-flags · concept: bit-masks · core · demand 2
- Learner knows: AND, OR, XOR on single bits (logic-gates) / does not know: that a mask picks out chosen bits of a whole number at once
- Misconception: To check which of five settings are on you need five separate tests.
- Prediction: "Settings are 10110. You AND them with the mask 00110. What results?" options: A) 00110 / B) 10000 / C) 10110 (answer: A). Check: 1 AND 0 = 0 at the left; 0, 1, 1 survive in the masked places (run: `0b10110 & 0b00110`).
- Key state: the learner has built a mask by tapping bits and seen only masked bits survive; the reveal unlocks after they also use OR to turn a bit on and XOR to flip one.
- Interaction: two rows of five bits (value and mask) and a result row, with a three-way AND/OR/XOR toggle.
- Payoff: one AND reads many flags, one OR sets them and one XOR flips them, all at once.
- Claims to check: (1) result above (run). (2) OR sets and XOR toggles bits under a mask (definitions). (3) Permissions in Unix use this (cite one man page, e.g. chmod).

### 41. cafe-is-five-bytes · concept: utf8-variable-width · core · demand 2
- Learner knows: ASCII maps characters to numbers (text-encoding) / does not know: that UTF-8 uses 1 to 4 bytes, so length in bytes is not length in characters
- Misconception: One character is always one byte.
- Prediction: "The word 'café' has 4 characters. How many bytes in UTF-8?" options: A) 4 / B) 5 / C) 8 (answer: B). Check: 'é' encodes as two bytes (C3 A9) and the rest are one each: node `Buffer.byteLength('café')` = 5.
- Key state: the learner has typed or tapped four characters and seen one of them split into two byte boxes; the reveal unlocks after trying an emoji too.
- Interaction: tap characters from a small palette (c, a, f, é, 世, an emoji) to append; each shows its byte boxes in hex. One row.
- Payoff: UTF-8 spends one byte on ASCII and more on others, so bytes and characters are different counts.
- Claims to check: (1) 'é' = C3 A9 (run). (2) UTF-8 uses 1-4 bytes per code point (RFC 3629). (3) ASCII text is identical in UTF-8 (RFC 3629).

### 42. hamming-points-at-the-bug · concept: hamming-code · stretch · demand 1 [exploration]
- Learner knows: parity detects an odd number of flips (two-flips-slip-by, #17) / does not know: that several overlapping parity checks can locate the flipped bit
- Misconception: Error detection can say something is wrong but cannot say where.
- Prediction: "A 7-bit word has checks over positions {1,3,5,7}, {2,3,6,7} and {4,5,6,7}. After one bit flipped, the second and third checks fail and the first passes. Which position flipped?" options: A) 2 / B) 6 / C) 7 (answer: B). Check: only position 6 lies in the second and third checks but not the first; the failures read 110 in binary = 6 (script on word 0110001).
- Key state: the learner has flipped three different bits and seen a different check pattern each time; the reveal unlocks after they flip one bit and read its position off the lights.
- Interaction: no prose. Seven tappable bits and three check lights. The learner flips bits and sees the lights; a target asks them to repair a received word by reading lights only.
- Payoff: overlapping checks spell the position of the error in binary, so one flipped bit can be corrected, not just noticed.
- Claims to check: (1) word 0110011 is a valid Hamming(7,4) codeword for data 1011 (script). (2) Flipping position 6 makes checks 2 and 3 fail (script). (3) Hamming 1950.

### 43. every-message-is-possible · concept: one-time-pad · core · demand 2 [exploration]
- Learner knows: XOR (logic-gates) / does not know: that XOR with a random key hides the message completely
- Misconception: If you try all keys, the one that gives readable text reveals the message.
- Prediction: "A 4-bit message is XORed with a random 4-bit key used once, giving 1101. How many different 4-bit messages could it be hiding?" options: A) 1 / B) 4 / C) 16 (answer: C). Check: for each of the 16 messages m the key c XOR m exists and is unique; the script confirms 16 distinct keys (and 1011 XOR 0110 = 1101 undoes with the same key).
- Key state: the learner has chosen three different candidate messages and for each found a key that explains the same ciphertext; the reveal unlocks after the third.
- Interaction: no prose. Fixed ciphertext on stage; the learner taps a candidate message and the matching key appears. A 4-bit ciphertext is the whole stage.
- Payoff: every message is equally consistent with the ciphertext, so no amount of key-searching helps, but the key can never be reused.
- Claims to check: (1) 16 distinct keys, one per message (script). (2) Perfect secrecy of the one-time pad (Shannon 1949). (3) Reusing a key leaks the XOR of the messages (derivation: c1 XOR c2 = m1 XOR m2).

### 44. four-words-beat-eight-letters · concept: password-search-space · intro · demand 3
- Learner knows: that passwords can be guessed / does not know: how to compare strength by counting possibilities
- Misconception: A long-looking string of random letters is stronger than a few random words.
- Prediction: "Password 1: 8 random lowercase letters. Password 2: 4 random words from a 2,048-word list. Which has more possibilities?" options: A) 8 letters / B) 4 words / C) They are equal (answer: B). Check: 26^8 = 208,827,064,576 (about 2^37.6) versus 2048^4 = 17,592,186,044,416 (2^44), a factor of about 84.
- Key state: the learner has set both sliders and sees two counters; the reveal unlocks once they make one of them exceed the other by sliding length or alphabet.
- Interaction: two sliders (length, pool size), a log-scale bar of total possibilities, and an "at 10 billion guesses per second" time readout. One bar.
- Payoff: strength is the count of equally likely possibilities, so each added unit multiplies it, and a bigger pool or more units both matter.
- Claims to check: (1) the two counts (run). (2) This assumes truly random choices; human-chosen passwords are much weaker (state). (3) 2048 words is the BIP-39 list size (cite; or call it "a 2,048-word list").

### 45. postfix-stack-run · concept: stack-expression-eval · core · demand 2
- Learner knows: stacks (back-button-stack, #10) / does not know: that a stack can evaluate an expression with no brackets
- Misconception: Evaluating arithmetic needs brackets and precedence rules.
- Prediction: "Evaluate 5 1 2 + 4 * + 3 - . Numbers are pushed; an operator pops two and pushes the result. Final value?" options: A) 14 / B) 12 / C) 20 (answer: A). Check: 1+2 = 3; 3x4 = 12; 5+12 = 17; 17-3 = 14 (run).
- Key state: the learner has stepped through all eight tokens and the final stack holds one number; the reveal unlocks at the last token.
- Interaction: one tap per token; a vertical stack on stage pushes and pops with the operation animating.
- Payoff: the order of the tokens already encodes the order of operations, so a stack is all you need.
- Claims to check: (1) result and trace above (run). (2) Postfix notation was introduced by Lukasiewicz as prefix notation; reverse Polish is its postfix variant (cite; say "postfix"). (3) The maximum stack height here is 3 (run).

### 46. in-order-is-sorted · concept: tree-traversal · core · demand 2
- Learner knows: a BST is built by inserting (lopsided-tree, #11) / does not know: that reading left, node, right gives sorted order
- Misconception: Reading a search tree gives the keys in the order they were inserted.
- Prediction: "Insert 5, 3, 8, 1, 4, 9, 7 into a BST. Reading left subtree, node, then right subtree gives which order?" options: A) 5, 3, 8, 1, 4, 9, 7 / B) 5, 3, 1, 4, 8, 7, 9 / C) 1, 3, 4, 5, 7, 8, 9 (answer: C). Check: in-order = 1, 3, 4, 5, 7, 8, 9; pre-order = 5, 3, 1, 4, 8, 7, 9 (run).
- Key state: the learner has walked the tree by hand with a marker, visited the left side first, and seen the visited list grow in increasing order; the reveal unlocks at the last node.
- Interaction: tap the next node to visit by the rule "left, me, right"; a list under the tree fills.
- Payoff: a search tree is sorted data folded into a shape, and in-order unfolds it back.
- Claims to check: (1) in-order of a BST is sorted (CLRS 12.1). (2) The two orders above (run). (3) The tree shape for these inserts (run).

### 47. which-order-is-allowed · concept: topological-sort · core · demand 2
- Learner knows: depth-first search (maze-depth-first, #16) / does not know: that dependency graphs have valid orders and a cycle has none
- Misconception: Tasks with dependencies have only one valid order, or every set of dependencies can be satisfied.
- Prediction: "Tasks: A before B, A before C, B before D, C before D. How many valid orders of all four?" options: A) 1 / B) 2 / C) 4 (answer: B). Check: A B C D and A C B D (brute force over 24 orders).
- Key state: the learner has built two different valid orders by repeatedly pulling a task with nothing left before it; the reveal unlocks after they try adding D before A and find a cycle blocks everything.
- Interaction: tap tasks that have no unmet prerequisite to place them in a line; an extra arrow can be added that creates a loop.
- Payoff: repeatedly taking any task with no unmet prerequisite orders everything, and a cycle leaves nothing to take.
- Claims to check: (1) 2 valid orders (script). (2) A directed graph has a topological order iff it has no cycle (CLRS 22.4, Lemma 22.11). (3) A cycle A->B->A has no order (derivation).

### 48. cheapest-is-not-shortest · concept: weighted-shortest-path · core · demand 2
- Learner knows: BFS finds fewest steps (wave-from-the-corner, #7) / does not know: that with costs on roads the fewest-hop route can be the worst
- Misconception: The route with the fewest stops is the cheapest.
- Prediction: "S to G directly costs 10. The other route S, A, B, G costs 2 for each hop. What is the cheapest total?" options: A) 10 / B) 6 / C) 3 (answer: B). Check: 2+2+2 = 6 < 10 (script: relaxation gives S 0, A 2, B 4, G 6).
- Key state: the learner has finalised the nearest node first, then each next-nearest, and the G label has dropped from 10 to 6; the reveal unlocks once G is settled.
- Interaction: tap the unsettled node with the smallest label to settle it; its neighbours' labels update.
- Payoff: always settle the cheapest unsettled node next, and labels become true costs (Dijkstra).
- Claims to check: (1) the labels above (script). (2) Dijkstra's algorithm is correct for non-negative weights (Dijkstra 1959; CLRS 24.3). (3) It can fail with negative weights (CLRS; keep as a one-line note).

### 49. connect-the-towns-cheaply · concept: minimum-spanning-tree · core · demand 1
- Learner knows: greedy can fail (coin-greedy-trap, #9) / does not know: that for connecting a network greedy provably works
- Misconception: Since greedy failed on coins, it cannot be trusted to build the cheapest network.
- Prediction: "Cables: AB 1, BC 2, CD 1, AD 5, AC 4, BD 3. Fewest total cost to connect all four towns?" options: A) 4 / B) 5 / C) 7 (answer: A). Check: take AB 1, CD 1, BC 2 (skip anything that closes a loop) = 4; exhaustive check of all 3-cable sets confirms the minimum 4.
- Key state: the learner has added cables cheapest-first, skipping ones that make a loop, until all four towns are joined; the reveal unlocks once the network connects.
- Interaction: tap the cheapest unused cable; a cable that would form a loop turns red and is refused.
- Payoff: cheapest-first without loops is optimal here, and unlike coins the choice never blocks a better one later.
- Claims to check: (1) minimum 4 (script). (2) Kruskal's algorithm gives a minimum spanning tree (CLRS 23.2). (3) A tree on n nodes has n-1 edges, so 3 here.

### 50. blocked-cell-routes · concept: dp-grid-paths · core · demand 2
- Learner knows: memoization means reusing answers (fib-call-explosion, #2) / does not know: that routes to a cell equal the routes to its two neighbours added together
- Misconception: To count robot routes you must list every route; a blocked cell means redoing the work.
- Prediction: "A robot goes from top-left to bottom-right of a 4 x 4 grid moving only right or down. The cell in row 2, column 2 is blocked. How many routes?" options: A) 8 / B) 12 / C) 20 (answer: A). Check: 20 routes on the open grid; 12 pass through the blocked cell; 20 - 12 = 8 (script by cell-by-cell addition gives 8).
- Key state: the learner has filled in each cell's count as left plus above and sees the blocked cell contribute 0; the reveal unlocks at the corner cell.
- Interaction: tap each cell in order to fill it with the sum of its two neighbours; a long-press (or toggle) blocks a cell and the downstream counts change.
- Payoff: counting each cell once from its neighbours turns an enormous list of routes into 16 small additions.
- Claims to check: (1) 20 open and 8 blocked (script). (2) 12 routes pass through (row 2, col 2): 2 x 6 (arithmetic). (3) Cell recurrence is dynamic programming (CLRS ch. 15).

### 51. sorting-without-comparing · concept: counting-sort · core · demand 1
- Learner knows: sorting by comparing (insertion-by-hand, #3) / does not know: that sorting can use no comparisons at all when values are small whole numbers
- Misconception: Sorting always works by comparing items to each other.
- Prediction: "Ten exam scores, each a whole number from 0 to 5, are sorted by tallying how many of each score occur and writing them out. How many comparisons between scores does that take?" options: A) 0 / B) 9 / C) 33 (answer: A). Check: only tallies and writes, so no score is compared with another (script sorts [3,0,5,2,2,1,4,5,0,3] with tallies only).
- Key state: the learner has dropped each score into its bucket and read the buckets in order; the reveal unlocks once the buckets are read out.
- Interaction: tap each score to drop it into its numbered bucket, then tap "read out" bucket by bucket.
- Payoff: when the value range is small, an item's value can be its address, and no comparisons are needed.
- Claims to check: (1) the tallies and sorted output (script). (2) Counting sort is linear in n + k (CLRS 8.2). (3) It needs a known small range (state).

### 52. three-questions-six-orders · concept: sort-lower-bound · stretch · demand 1 [exploration]
- Learner knows: sorting by comparing / does not know: that information theory limits how few comparisons can ever work
- Misconception: With a clever enough method, any list can be sorted with just a few questions.
- Prediction: "3 distinct cards in unknown order. Each question is 'is X bigger than Y?'. What is the fewest questions that always suffices?" options: A) 2 / B) 3 / C) 6 (answer: B). Check: 3 cards have 6 orders; 2 questions give at most 4 answers; 3 give 8 (script: exhaustive search over question strategies gives depth 3 for 3 cards and 5 for 4 cards).
- Key state: the learner has asked two questions and still sees two orders left in some branch; the reveal unlocks after a third question separates them.
- Interaction: no prose. The six possible orders are shown as tiles; each question cuts the tiles by who is bigger; the learner picks the question that splits best.
- Payoff: each question at most halves the possible orders, so sorting n items needs at least log2(n!) questions, about n log n.
- Claims to check: (1) 3! = 6; ceil(log2 6) = 3 (arithmetic). (2) Optimal depth 3 for n = 3 and 5 for n = 4 (exhaustive script). (3) Comparison sorts need Omega(n log n) (CLRS 8.1).

### 53. two-writers-one-counter · concept: race-condition · core · demand 2 [exploration]
- Learner knows: a variable (assumed) / does not know: that two tasks can overwrite each other's updates
- Misconception: Two tasks each adding 1 to a counter always give 2.
- Prediction: "A counter is 0. Two threads each do: read, add 1, write. They run in the order A reads, B reads, A writes, B writes. What is the counter?" options: A) 2 / B) 1 / C) 0 (answer: B). Check: both read 0, both write 1 (script).
- Key state: the learner has dragged the steps of the two threads into an interleaving that ends at 1, and another that ends at 2; the reveal unlocks after both outcomes are produced.
- Interaction: no prose. Six step tiles in two lanes; the learner chooses which thread steps next; counter shows the result.
- Payoff: a read-modify-write is not one step, so the interleaving decides the answer, and that is why locks exist.
- Claims to check: (1) the order gives 1 (script); some orders give 2 (enumerate all 6 interleavings: 2 outcomes). (2) Race-condition definition (Silberschatz, Operating System Concepts). (3) Atomic operations or locks prevent this (state narrowly).

### 54. two-names-one-list · concept: references-aliasing · intro · demand 3
- Learner knows: assigning a variable / does not know: that assigning a list copies the name, not the list
- Misconception: `b = a` makes a separate copy of the list.
- Prediction: "a = [1, 2]; b = a; b.append(3). What is a?" options: A) [1, 2] / B) [1, 2, 3] / C) An error (answer: B). Check: both names point at one list; run in node/Python (node run returned [1,2,3]).
- Key state: the learner has appended through b and seen a's box change too; the reveal unlocks after they try "copy" and watch a stay put.
- Interaction: two name tags and a list box; arrows from tags; buttons "append via b" and "copy a into b".
- Payoff: names point at things, so two names can share one list and a change through either shows in both.
- Claims to check: (1) result above (run in node; same in Python). (2) Assignment copies the reference for lists (Python docs, data model; JavaScript spec). (3) A shallow copy of a list of numbers does not share changes (run).

### 55. alias-wave-wagon-wheel · concept: audio-sampling · core · demand 2 [exploration]
- Learner knows: that digital audio is a list of numbers (pixels-rgb idea transferred) / does not know: that too slow a sample rate turns a fast wave into a slower fake
- Misconception: Sampling a sound often enough or not, the samples always trace the original wave.
- Prediction: "A 4 Hz wave is sampled 5 times a second. Which slower wave passes through exactly the same sample points?" options: A) 2 Hz / B) 1 Hz / C) 0.5 Hz (answer: B). Check: cos(2 pi x 4 n/5) equals cos(2 pi x 1 n/5) at every n (script: identical to 4 d.p. for n = 0..4; the 2 Hz wave differs).
- Key state: the learner has dragged the wave frequency up past half the sample rate and seen the dots keep tracing a slower wave; the reveal unlocks once the faster wave and the slow wave share the same dots.
- Interaction: one slider (wave frequency 0.5 to 4 Hz) over a wave with 5 sample dots per second; the dots and a second "best-fit slow wave" update together. One picture.
- Payoff: above half the sample rate, a wave is indistinguishable from a slower one, which is why audio is sampled at more than twice the highest frequency.
- Claims to check: (1) the samples coincide (script). (2) Nyquist-Shannon sampling theorem (Shannon 1949; cite). (3) CD audio is sampled at 44.1 kHz, enough for 20 kHz hearing (Red Book / any audio-engineering text; cite).
