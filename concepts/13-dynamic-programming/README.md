# 13. Dynamic Programming

**Navigation:** [Home](../../README.md) | [Previous: Recursion](../12-recursion/README.md) | [Next: Greedy Algorithms](../14-greedy-algorithms/README.md)

## Overview
Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into simpler subproblems and storing results to avoid recomputation.

## Key Principles

### Optimal Substructure
- Optimal solution contains optimal solutions to subproblems
- Problem can be broken into smaller subproblems

### Overlapping Subproblems
- Same subproblems are solved multiple times
- Memoization or tabulation stores results

## Approaches

### Top-Down (Memoization)
- Recursive approach with memoization
- Store results in cache/dictionary
- More intuitive, uses recursion stack

### Bottom-Up (Tabulation)
- Iterative approach with table
- Fill table from smallest to largest
- More efficient, no recursion overhead

## Problem Categories

### 1D DP
- Fibonacci sequence (Implemented)
- Climbing stairs (Implemented)
- House robber (Implemented)
- House robber II - Circular (Implemented)
- Coin change (counting ways) (Implemented)

### 2D DP
- Longest Common Subsequence (LCS) (Implemented)
- Edit Distance (Implemented)
- Unique Paths (Implemented)
- Unique Paths with Obstacles (Implemented)
- Knapsack problems (Implemented)

### String DP
- Longest Palindromic Substring
- Longest Common Substring
- Word Break
- Regular Expression Matching

## Common Patterns
1. **Knapsack**: 0/1 (Implemented), Unbounded (Implemented), Fractional (Greedy)
2. **LIS/LCS**: Longest Increasing/Common Subsequence (Implemented)
3. **Edit Distance**: Levenshtein distance (Implemented)
4. **Matrix Chain**: Optimal multiplication (Implemented)
5. **Partition**: Equal sum, palindrome partitioning

## Time Complexity
- Typically O(n) or O(n²) for 1D/2D DP
- Depends on state space and transitions

## Space Optimization
- Reduce 2D to 1D when possible
- Use rolling arrays
- Store only necessary states

## Common Problems
1. Fibonacci numbers
2. Climbing stairs
3. Coin change
4. Longest common subsequence
5. Edit distance
6. Knapsack problems
7. Longest increasing subsequence
8. Unique paths

