# 20. Sliding Window

**Navigation:** [Home](../../README.md) | [Previous: Bit Manipulation](../19-bit-manipulation/README.md) | [Next: Two Pointers](../21-two-pointers/README.md)

## Overview
Sliding window is a technique for solving subarray/substring problems by maintaining a window that slides through the array.

## Key Concepts

### Fixed Size Window
- Window size is constant
- Slide window one position at a time
- Example: Maximum in each window

### Variable Size Window
- Window size changes based on condition
- Expand or shrink window
- Example: Longest substring with k distinct

## Technique
1. Initialize window boundaries
2. Expand window (add elements)
3. Shrink window if condition violated
4. Update result at each step

## Time Complexity
- Usually O(n) - each element visited at most twice

## Common Problems
1. Maximum sum subarray of size k
2. Longest substring with k distinct
3. Minimum window substring
4. Longest substring without repeating
5. Subarray with given sum
6. Maximum in sliding window

## Use Cases
- Subarray problems
- Substring problems
- Optimization problems
- Range queries

