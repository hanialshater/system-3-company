*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): coin-greedy-trap
lesson version: v2
boundary: adult who uses a phone daily, has never programmed
Screenshots seen: yes (artifacts/walkthroughs/coin-greedy-trap/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: coins 1, 3, 4. The cashier always hands over the biggest coin that fits. How many coins for 6? (2 / 3 / 4.) The locked stage shows empty You / Greedy / Fewest rows, coin buttons and targets 6, 8, 10. Nothing leaks. "2" is the tempting wrong answer for someone who spots 3 + 3 and assumes the cashier does too.
- Explore: I build 6 myself (1 then 3; coins that no longer fit are greyed, which teaches "fits" without words). "Cashier's way" fills 4, 1, 1 = 3 in red; "Fewest possible" fills 3, 3 = 2 in green. Target 8: both 4 + 4 = 2. Target 10: greedy 4 + 4 + 1 + 1 = 4 against 4 + 3 + 3 = 3. Every reveal number is on the stage, and the red/green counts make the comparison at a glance.
- Reveal: restates the seen rows, explains why (taking 4 leaves 2, and only 1s fill 2), and uses 8 to show greedy is not always wrong. Earned.
- Finding (minor): switching to 8 and 10 fills Greedy and Fewest automatically and clears my own row, so I never try to beat the cashier at 10. It is the most interesting case, and it is handed over.
- Finding (minor): "Fewest: checks every combination" is a black box. Fine for this boundary, but a learner may wonder how it knows.
- Finding (minor): the chip says 70s.

## 2. Earlier findings (r2 review)

1. Card badge 70s: **not fixed** (product-owner item, not a learner blocker).
2. Trust link "2/4 claims checked": **fixed** (now 4/4).
3. Hook "sounds smart. Is it?" hints a little: **unchanged**, minor.

## 3. New findings

- Minor: the 10 case is handed over, not attempted. A learner could be asked to try 10 themselves before the rows fill.
- No FATAL.
