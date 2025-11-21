# 11. Searching Algorithms

**Navigation:** [Home](../../README.md) | [Previous: Sorting Algorithms](../10-sorting-algorithms/README.md) | [Next: Recursion](../12-recursion/README.md)

## Overview
Searching algorithms find the location of a target value within a data structure. Different algorithms are suited for different data structures and scenarios.

## Linear Search
- **Time**: O(n)
- **Space**: O(1)
- Check each element sequentially
- Works on any data structure
- No prerequisites

## Binary Search
- **Time**: O(log n)
- **Space**: O(1) iterative, O(log n) recursive
- Requires sorted array
- Divide and conquer approach
- Most efficient for sorted arrays

## Ternary Search
- **Time**: O(log₃ n)
- **Space**: O(1)
- Divide array into three parts
- Similar to binary search but three-way split

## Interpolation Search
- **Time**: O(log log n) average, O(n) worst
- **Space**: O(1)
- Uses value distribution
- Best for uniformly distributed sorted data

## Exponential Search
- **Time**: O(log n)
- **Space**: O(1)
- Find range first, then binary search
- Useful for unbounded/infinite arrays

## Jump Search
- **Time**: O(√n)
- **Space**: O(1)
- Jump by fixed steps, then linear search
- Better than linear, worse than binary

## Algorithm Selection
- **Unsorted array**: Linear Search
- **Sorted array**: Binary Search
- **Uniformly distributed**: Interpolation Search
- **Unbounded array**: Exponential Search
- **Large sorted array**: Jump Search

## Common Problems
1. Search in rotated sorted array
2. Find first/last occurrence
3. Search in 2D matrix
4. Find peak element
5. Search in infinite array
6. Find element in sorted matrix

