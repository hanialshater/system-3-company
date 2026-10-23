# ABI (interface abi-doc, the architect's)

Between our own functions and with libc: the System V AMD64 ABI. Integer and pointer arguments in rdi, rsi, rdx, rcx,
r8, r9, then the stack right to left; the return value in rax; rbp-based frames, the stack 16-byte aligned at every
call; %al = the number of vector registers used when calling a variadic function. Data layout LP64 (CONTRACT.md 2).
