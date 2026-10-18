# Algorithms concepts and subareas (2026-10-18)

Key: ✓ published · ◐ in review · ○ draft · ✗ no lesson. Source: content/curriculum/cs.json and src/demos/cs/*/meta.json.

## Core CS (unlabelled) (54)

- ✓ Binary search: halving the haystack
- ✓ Divide and conquer (merge)
- ✓ Hash tables and collisions
- ✓ Approximate counting (Count-Min Sketch)
- ✓ Binary numbers
- ✓ Shortest paths (BFS / Dijkstra)
- ✓ How running time grows
- ✓ Recursion: a function that calls itself
- ✓ Public-key cryptography (paint mixing)
- ✓ Insertion sort: sorting a hand of cards
- ✓ Stacks and queues: last-in vs first-in
- ✓ Arrays vs linked lists: the cost of inserting
- ✓ Logic gates: AND, OR, XOR
- ✓ Text as numbers (ASCII and Unicode)
- ✓ Run-length encoding: compression by counting runs
- ✓ Parity bits: detecting errors
- ✓ Pixels and colour as three numbers
- ✓ Finite state machines (a turnstile)
- ✓ Negative numbers: two's complement
- ✓ Floating point: why 0.1 + 0.2 is not 0.3
- ✓ Binary search trees and lopsided trees
- ✓ Heaps and priority queues
- ✓ Depth-first search and backtracking
- ✓ Huffman coding: shorter codes for common symbols
- ✓ Quicksort: partitioning around a pivot
- ✓ Memoization: not recomputing
- ✓ Greedy algorithms and when they fail
- ✓ Cryptographic hashes and the avalanche effect
- ✓ Caches and least-recently-used eviction
- ✓ Growing arrays by doubling (amortized cost)
- ✓ Combinatorial explosion (travelling salesperson)
- ✓ The halting problem: what no program can decide
- ✓ Bloom filters: maybe-yes, definitely-no
- ✓ Euclid's algorithm: greatest common divisor
- ✓ Sieve of Eratosthenes: crossing out to find primes
- ✓ Fast powers by repeated squaring
- ✓ Hexadecimal: four bits per digit
- ✓ Bit masks: reading and setting flags with AND, OR, XOR
- ✓ UTF-8: characters that take more than one byte
- ✓ Hamming code: error correction, not just detection
- ✓ One-time pad: XOR encryption and perfect secrecy
- ✓ Password strength as counting possibilities
- ✓ Evaluating expressions with a stack (postfix)
- ✓ Tree traversal: in-order reads a search tree sorted
- ✓ Topological sort: ordering tasks with dependencies
- ✓ Weighted shortest paths: fewest hops is not cheapest
- ✓ Minimum spanning tree: connecting everything cheaply
- ✓ Dynamic programming: counting routes cell by cell
- ✓ Counting sort: sorting without comparing
- ✓ Why comparison sorting cannot beat n log n
- ✓ Race conditions: two writers, one counter
- ✓ Deadlock: circular waiting and lock order
- ✓ References: two names, one list
- ✓ Sampling sound: aliasing and the sample rate

## Algorithms (original set) (91)

- ✓ Stable sorting: ties keep their order
- ✓ Quicksort's worst case: already-sorted input
- ✓ BFS vs DFS: a queue or a stack is the only difference
- ✓ 0/1 knapsack: best value per kilo is not best
- ✓ Edit distance: fewest edits between two words
- ✓ Frequency analysis: cracking a Caesar shift
- ✓ No compressor shrinks every file (counting argument)
- ✓ Interval scheduling: earliest finish first
- ✓ Two pointers on a sorted list
- ✓ Cycle detection: tortoise and hare
- ✓ Tries: lookup cost is word length, not word count
- ✓ Fair shuffling: why the naive swap is biased
- ✓ Interpolation search: guessing the page from the value
- ✓ Radix sort: last digit first
- ✓ Open addressing: linear probing and clusters
- ✓ Deleting from a probed hash table: tombstones
- ✓ Negative edges break Dijkstra (Bellman-Ford)
- ✓ A* search: a heuristic that aims at the goal
- ✓ Counting ways to make change: order does not matter
- ✓ Maximum subarray: drop a losing start (Kadane)
- ✓ Shortest job first minimises total waiting
- ✓ Game of Life: local rules, a moving glider
- ✓ Backtracking prunes: four queens
- ✓ Minimax: perfect tic-tac-toe is a draw
- ✓ RSA intuition: a lock anyone can close
- ✓ Two eggs, a hundred floors (dynamic programming)
- ✓ Longest increasing subsequence: patience piles
- ✓ Quickselect: the median without sorting
- ✓ Building a heap bottom-up is linear
- ✓ Prim's algorithm: any start, same cheapest network
- ✓ Union-find: who is connected, in a few hops
- ✓ Gas station circuit: start after the worst deficit
- ✓ Peak finding by halving
- ✓ A queue from two stacks (amortized cost)
- ✓ Rolling hash string search (Rabin-Karp)
- ✓ KMP string search: never step back in the text
- ✓ LZ77: copies that point backwards, even into themselves
- ✓ Stable matching: the proposing side gets its best
- ✓ Maximum flow: undoing a bad push (augmenting paths)
- ✓ Convex hull: the rubber band around points
- ✓ Shell sort: far-apart passes first
- ✓ Bubble sort: why a small value at the end crawls
- ✓ Bucket sort: speed depends on the spread
- ✓ Bogosort: the cost of try-again sorting
- ✓ Exponential search: doubling to find the range
- ✓ Ternary search: three parts cost more questions
- ✓ Longest common subsequence
- ◐ Rod cutting: the best price may be pieces
- ✓ Matrix chain: the order of multiplying sets the cost
- ✓ Kruskal: cheapest first unless it makes a loop
- ✓ Graph colouring by backtracking
- ✓ Knight's tour: fewest exits first
- ◐ Karatsuba: three multiplications, not four
- ✓ Counting inversions while merging
- ✓ Boyer-Moore: reading backwards to skip
- ✓ Palindromic substrings from each centre
- ✓ Grouping anagrams by letter counts
- ✓ Consistent hashing
- ✓ Prefix sums: any range total from two numbers
- ✓ Fenwick tree: prefix sums by lowest set bit
- ◐ Segment tree: ranges from a few nodes
- ✓ Rotations keep a search tree short
- ✓ Circular buffer: write index wraps
- ✓ Monotonic stack: next bigger value
- ✓ Running median with two heaps
- ✓ x & (x-1): clearing the lowest 1 bit
- ✓ Gray code: one bit flips per step
- ✓ XOR cancels pairs
- ✓ Extended Euclid and the modular inverse
- ✓ Fermat test fooled; Miller-Rabin not
- ✓ Newton's method for square roots
- ◐ The 3n+1 sequence
- ✓ Josephus: who survives?
- ✓ Point in polygon: count the crossings
- ✓ Shoelace area and corner order
- ✓ Strongly connected components
- ◐ Bridges: one edge whose loss disconnects
- ✓ Reservoir sampling
- ✓ Elementary cellular automata: Rule 30
- ✓ Edge detection by differencing neighbours
- ✓ Round-robin scheduling
- ✓ Edge betweenness and Girvan–Newman community splitting
- ✓ Hubs and authorities (HITS)
- ✓ PageRank as a random surfer's long-run share
- ✓ PageRank: one link from an important page beats many from obscure ones
- ✓ Constant factors: a slower-growing method can win on small inputs
- ✓ Checking an answer vs finding one (NP, subset sum)
- ✓ Nearest-neighbour tours: greedy routes can be the worst
- ✓ Majority vote with one counter (Boyer-Moore)
- ✗ Power of two choices: two random looks balance load
- ✓ Rank sinks: why PageRank needs random jumps

## Boundary search selection (10)

- ○ Where do the equals begin?
- ○ Where do the equals end?
- ○ A sorted list with a seam
- ○ Which corner can rule out a row?
- ○ How large must the container be?
- ○ Where should the two lists split?
- ○ Count the pairs before guessing
- ○ The gaps have their own order
- ○ Two slopes, one target
- ○ Half of the weight, not the cards

## Adaptive network sorting (10)

- ○ How many runs are already sorted?
- ○ Can this run be turned around?
- ○ Searching is cheaper than shifting
- ○ Which wires should compare?
- ○ Can fixed neighbours finish the sort?
- ○ How many writes are unavoidable?
- ○ Which stream supplies the next card?
- ○ When memory holds only three cards
- ○ A run longer than the memory
- ○ Can buckets live inside the array?

## Ordered augmented trees (10)

- ○ Which key has this rank?
- ○ How many keys come before this one?
- ○ Which interval can still overlap?
- ○ Two orders in one tree
- ○ What moves after a lookup?
- ○ A full page needs a middle key
- ○ Can a neighbour lend a key?
- ○ Where does the next record live?
- ○ Can yesterday's tree survive?
- ○ Split by position, not by value

## Priority queues meldable heaps (10)

- ○ The last card takes the root
- ○ Which card became urgent?
- ○ Repair can go either way
- ○ Equal sizes carry into a tree
- ○ Why keep the right side short?
- ○ What if we always swap children?
- ○ Which siblings should pair first?
- ○ A lower key can cut a subtree
- ○ The new minimum changes the buckets
- ○ More children, shorter paths

## Range sliding window (10)

- ○ Two marks can update a range
- ○ Why subtract the corner twice?
- ○ Can the two blocks overlap?
- ○ An update can wait in the parent
- ○ Which pending update wins?
- ○ Who can never be the maximum?
- ○ When is it safe to shrink?
- ○ Can the questions move less?
- ○ One changed card, one changed block
- ○ Count while the values split

## Disjoint offline connectivity (10)

- ○ Undo a merge without flattening
- ○ Does this edge force a contradiction?
- ○ The groups remember differences
- ○ Run the broken network backward
- ○ Which edges live at this time?
- ○ One representative, one subtotal
- ○ Move the smaller bag
- ○ Skip the cells already finished
- ○ At what weight did they meet?
- ○ Ask the ancestors after the branch

## Graph traversal decomposition (10)

- ○ How many branches can the root lose?
- ○ Where does a block end?
- ○ Can every road be used once?
- ○ A closed walk can absorb another
- ○ Arrows change the endpoint rule
- ○ What kind of arrow points backward?
- ○ Show the odd loop
- ○ One count per incoming route
- ○ Was the next task forced?
- ○ How dense is the hardest remainder?

## Path algorithms witnesses (10)

- ○ A route that keeps getting cheaper
- ○ Which detour is allowed this round?
- ○ Can negative roads become nonnegative?
- ○ A free move goes to the front
- ○ Which source reaches this cell first?
- ○ When can two searches stop?
- ○ Acyclic roads permit negative costs
- ○ Which route has the largest bottleneck?
- ○ How many shortest routes tie?
- ○ The cheapest label can hide a route

## Spanning matching flow (10)

- ○ Every island chooses a cable
- ○ Can this new cable improve the tree?
- ○ Equal weights need a witness
- ○ How much costs the next tree?
- ○ A match can change partners
- ○ Too many people, too few choices
- ○ The unmatched roots name a cover
- ○ Only forward layers carry this phase
- ○ Two full flows can cost differently
- ○ The minimum shipments create demands

## Sequence dynamic programming (10)

- ○ Which cuts make real words?
- ○ The star can take nothing
- ○ A wildcard has two directions
- ○ Two sources must keep their order
- ○ Equal letters can come from two places
- ○ The next talk may be worth more
- ○ Where should this string be cut?
- ○ When must the cell reset to zero?
- ○ One long gap or many short ones?
- ○ Rise first, then fall

## Resource subset dp (10)

- ○ May the same item be used again?
- ○ Only three copies remain
- ○ Which items built this total?
- ○ One target can split the whole set
- ○ Which towns and where are you?
- ○ Who has already taken a job?
- ○ Has the prefix fallen below the limit?
- ○ What sticks into the next column?
- ○ A chosen parent forbids a child
- ○ The battery is part of the state

## String indexing automata (10)

- ○ How much prefix begins right here?
- ○ One fallback serves many words
- ○ A match can end inside another
- ○ Sorted suffixes turn search into a range
- ○ Shared prefixes remove duplicate blocks
- ○ Why can one matched letter be kept?
- ○ Different ends can share a state
- ○ The mirror gives a lower bound
- ○ Which rotation can be discarded?
- ○ The matcher carries a distance budget

## Computational geometry (10)

- ○ Which side of the directed line?
- ○ Crossing or merely sharing a line?
- ○ Only active neighbours can cross next
- ○ Which neighbours inside the strip?
- ○ How much width is covered now?
- ○ The border can create new corners
- ○ An interval along the line
- ○ Which corner can be removed?
- ○ The farthest pair need not be neighbours
- ○ Can the other room hide a closer point?

## Number theoretic algorithms (10)

- ○ Does the total fit the common step?
- ○ Two clocks may disagree forever
- ○ Build the answer one radix at a time
- ○ A collision can reveal a factor
- ○ A factor hides in the exponent
- ○ Cross out primes in a distant window
- ○ Every composite gets one producer
- ○ Which residues can survive the wheel?
- ○ Square roots on a prime clock
- ○ Meet a power from both directions

## Numerical linear algebra (10)

- ○ A zero is not a dead end
- ○ One factorization, two right sides
- ○ Remove what the first vector explains
- ○ Can every symmetric matrix take a root?
- ○ The sign change guards the root
- ○ Two guesses draw the next one
- ○ Does repeating the rule settle down?
- ○ Where should the next sample go?
- ○ Keep the rounding that fell away
- ○ Two equivalent formulas disagree

## Randomized streaming (10)

- ○ More than one frequent candidate
- ○ A replacement inherits an error bar
- ○ Two sketches can share a register
- ○ The kth hash measures the unseen crowd
- ○ A heavier item gets a better key
- ○ One column, one coin
- ○ A summary keeps a rank interval
- ○ Half the cards get double weight
- ○ The first shared name estimates overlap
- ○ A short random check can catch a product

## Compression coding parsing (10)

- ○ A whole message fits one interval
- ○ The decoder learns the new word
- ○ Sort rotations, then keep one column
- ○ Repeated symbols change their address
- ○ The lengths can name the codes
- ○ When should the operator leave?
- ○ One token selects a grammar rule
- ○ A prefix is not a complete handle
- ○ Which split explains this span?
- ○ Which operator owns the next token?

## Combinatorial game search (10)

- ○ Can this branch still beat the best?
- ○ Each column must be covered once
- ○ Undo by reconnecting the neighbours
- ○ Can the unseen child change the choice?
- ○ Start shallow, still reach the depth
- ○ The next bound comes from the overrun
- ○ A cached bound is not an exact score
- ○ A value needs a supporting neighbour
- ○ Which variable can fail soonest?
- ○ Two small lists meet at the target

## Approximation online (10)

- ○ A matching supplies a cover bound
- ○ Pay per newly covered item
- ○ A walk can shortcut its repeats
- ○ Trade precision for smaller totals
- ○ Which machine is free first?
- ○ When should renting become buying?
- ○ One random order, many arrivals
- ○ Bad advice loses weight gradually
- ○ The best so far may be too early
- ○ The first gap may matter later

## Transforms convolution bitsets (10)

- ○ A pair shares most of its work
- ○ Undo the frequencies with a scale
- ○ Which terms land on this power?
- ○ Which prime can hold these roots?
- ○ Add every smaller mask once
- ○ Undo the subset accumulation
- ○ XOR changes which pairs combine
- ○ One shift adds the item everywhere
- ○ One row can add many reachable nodes
- ○ The bits remember matched prefixes
