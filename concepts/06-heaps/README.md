# 06. Heaps

**Navigation:** [Home](../../README.md) | [Previous: Trees](../05-trees/README.md) | [Next: Graphs](../07-graphs/README.md)

## Overview
A heap is a complete binary tree that satisfies the heap property. It's commonly implemented as an array.

## Key Concepts

### Min Heap
- Parent node is always smaller than or equal to children
- Root contains minimum element
- Used for priority queues

### Max Heap
- Parent node is always greater than or equal to children
- Root contains maximum element
- Used for heap sort

## Operations

### Time Complexity
- **Insert**: O(log n)
- **Extract Min/Max**: O(log n)
- **Peek**: O(1)
- **Build Heap**: O(n)
- **Heapify**: O(log n)

### Space Complexity
- O(n) - where n is the number of elements

## Array Representation
- Parent at index i: children at 2i+1 and 2i+2
- Child at index i: parent at floor((i-1)/2)

## Common Problems
1. Find kth largest/smallest
2. Merge k sorted arrays
3. Top k frequent elements
4. Median in stream
5. Priority queue implementation
6. Heap sort

## Use Cases
- Priority queues
- Heap sort
- Finding kth element
- Scheduling algorithms
- Graph algorithms (Dijkstra)

