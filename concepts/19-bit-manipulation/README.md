# 19. Bit Manipulation

**Navigation:** [Home](../../README.md) | [Previous: Mathematical Algorithms](../18-mathematical-algorithms/README.md) | [Next: Sliding Window](../20-sliding-window/README.md)

## Overview
Bit manipulation involves working with individual bits in binary representations of numbers.

## Key Operations

### Basic Operations
- **AND (&)**: Both bits must be 1
- **OR (|)**: At least one bit must be 1
- **XOR (^)**: Bits must differ
- **NOT (~)**: Flip all bits
- **Left Shift (<<)**: Multiply by 2
- **Right Shift (>>)**: Divide by 2

## Common Tricks

### Check if Power of 2
- `n & (n - 1) == 0`

### Get Rightmost Set Bit
- `n & -n`

### Count Set Bits
- Brian Kernighan's algorithm
- `n & (n - 1)` removes rightmost set bit

### Swap Without Temp
- `a = a ^ b; b = a ^ b; a = a ^ b;`

## Common Problems
1. Single number
2. Counting bits
3. Power of two
4. Reverse bits
5. Missing number
6. Bitwise AND of range

## Use Cases
- Efficient arithmetic
- Flag management
- Compression
- Cryptography
- Low-level programming

