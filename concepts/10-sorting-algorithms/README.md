# 10. Sorting Algorithms

**Navigation:** [Home](../../README.md) | [Previous: Strings](../09-strings/README.md) | [Next: Searching Algorithms](../11-searching-algorithms/README.md)

## Overview
Sorting algorithms arrange elements of a list in a particular order (ascending or descending). Different algorithms have different time/space complexities and use cases.

## Comparison-Based Sorts

### Bubble Sort
- **Time**: O(n²) worst/average, O(n) best
- **Space**: O(1)
- Compare adjacent elements and swap if needed
- Stable, in-place

### Selection Sort
- **Time**: O(n²)
- **Space**: O(1)
- Find minimum and place at beginning
- Not stable, in-place

### Insertion Sort
- **Time**: O(n²) worst/average, O(n) best
- **Space**: O(1)
- Build sorted array one element at a time
- Stable, in-place, efficient for small arrays

### Merge Sort
- **Time**: O(n log n)
- **Space**: O(n)
- Divide and conquer approach
- Stable, not in-place

### Quick Sort
- **Time**: O(n log n) average, O(n²) worst
- **Space**: O(log n) average
- Divide and conquer with pivot
- Not stable, in-place

### Heap Sort
- **Time**: O(n log n)
- **Space**: O(1)
- Uses heap data structure
- Not stable, in-place

## Non-Comparison Sorts

### Counting Sort
- **Time**: O(n + k) where k is range
- **Space**: O(k)
- Count occurrences of each value
- Stable, not in-place

### Radix Sort
- **Time**: O(d(n + k)) where d is digits
- **Space**: O(n + k)
- Sort by individual digits
- Stable, not in-place

### Bucket Sort
- **Time**: O(n + k) average, O(n²) worst
- **Space**: O(n)
- Distribute elements into buckets
- Stable, not in-place
- Implemented in [advanced_sorting.py](./python/advanced_sorting.py)

### Radix Sort
- **Time**: O(d(n + k)) where d is digits
- **Space**: O(n + k)
- Sort by individual digits
- Stable, not in-place
- Implemented in [advanced_sorting.py](./python/advanced_sorting.py)

### Tim Sort
- **Time**: O(n log n)
- **Space**: O(n)
- Hybrid stable sorting (merge + insertion)
- Used in Python's built-in sort
- Implemented in [advanced_sorting.py](./python/advanced_sorting.py)

## Algorithm Selection Guide
- **Small arrays (< 50)**: Insertion Sort
- **General purpose**: Quick Sort or Merge Sort
- **Stability required**: Merge Sort
- **Limited memory**: Heap Sort
- **Integer sorting**: Counting/Radix Sort

## Common Problems
1. Sort array of integers
2. Sort array of strings
3. Sort objects by multiple keys
4. Find kth largest/smallest
5. Merge k sorted arrays
6. Count inversions

