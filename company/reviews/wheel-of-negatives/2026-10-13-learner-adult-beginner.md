*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: wheel-of-negatives
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "In an 8-bit signed number (two's complement), what is 127 + 1 (01111111 + 1)?" "8-bit", "signed" and "two's complement" are not words I know; the hook ("127 is the biggest an 8-bit signed number can hold") tells me the sum overflows, which hints that 128 is a trap and gives away that something odd happens. The options 128, -128, 0 are a real guess (128 is the obvious answer from school arithmetic). The locked stage shows a dial with 0 at the top, 64 on the right, 127 at the bottom, a pointer on 127, and eight bit boxes; the top box reads "0" with a pink "?" under it, which is unexplained.
- What was SHOWN: "+ 1" moves the pointer one notch across a seam from the green half to the red half and the dial reads -128, the bits 10000000 and the top box label turns into "-128". "+ 128 (half turn)" goes to 0; "- 1" goes to -1 with all bits 1; "Back to 127" returns. The circle with a green positive half and a red negative half makes wrap-around visible: I can see 127 then -128 sitting side by side.
- Where understanding first broke: why the top switch is worth -128. On the stage it is printed in red as "-128" only after the first +1 (before that it is "?"). Nothing on the stage motivates it; it is a rule I am given by the picture. "+ 128 (half turn)" is also unexplained: why 128, and why it goes to 0 (the pointer moves half the dial, but a beginner may not connect that to 256 positions).
- Reveal: "You saw 127 + 1 = -128, -128 + 128 = 0, 0 - 1 = -1" matches the three taps. "01111111 + 1 is 10000000" matches the stage bits. "The 256 patterns sit on a circle... first half are 0 to 127, second half are the negatives" is on the dial. "11111111 is -128 + 127" is on the stage as -1. "That wrap is overflow: a counter that grows too big comes out negative" is told as a name; the real-world consequence is not shown. The reveal screenshot is clipped at the bottom mid-sentence.
- Reveal earned: yes: this is one of the better ones, though "two's complement" and "8-bit" remain jargon.
- Problems: (1) "8-bit signed" and "two's complement" jargon in the question; (2) hook hints at overflow; (3) -128 weight and half-turn button unmotivated; (4) reveal clipped.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows 8 switches reach 255 and negative numbers; my boundary lacks the switches, and the question uses 'two's complement' unexplained. The objective (top bit worth -128, circle from -128 to 127, 127 + 1 = -128, -1 + 1 wraps to 0) is mostly delivered by the dial; the -128 weight and half-turn button are given, not motivated. Misconception (adding 1 makes a bigger number) is hit by option 128, though the hook hints at overflow. Close to launch; the jargon in the question and the clipped reveal hold it back.
- Claims: not assessed here (fact-checker's job).

Verdict: revise
