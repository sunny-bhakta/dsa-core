# 04. Queues

**Navigation:** [Home](../../README.md) | [Previous: Stacks](../03-stacks/README.md) | [Next: Trees](../05-trees/README.md)

## Overview
A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue).

## Key Concepts

### Queue Operations
- **Enqueue**: Add element to the rear - O(1)
- **Dequeue**: Remove element from the front - O(1)
- **Front/Peek**: View front element without removing - O(1)
- **isEmpty**: Check if queue is empty - O(1)
- **Size**: Get number of elements - O(1)

### Types of Queues
1. **Simple Queue**: Basic FIFO structure
2. **Circular Queue**: Efficient use of fixed-size array
3. **Priority Queue**: Elements with priority (heap-based)
4. **Deque (Double-ended Queue)**: Insert/delete from both ends

## Operations

### Time Complexity
- **Enqueue**: O(1)
- **Dequeue**: O(1)
- **Front**: O(1)
- **Search**: O(n)
- **Size**: O(1)

### Space Complexity
- O(n) - where n is the number of elements

## Applications

### Scheduling
- Process scheduling in OS
- Task scheduling
- Print queue management

### BFS Algorithm
- Level-order tree traversal
- Graph traversal
- Shortest path finding

### Other Uses
- Call center systems
- Message queues
- Buffer management
- Breadth-first search

## Common Problems
1. Implement queue using stacks
2. Sliding window maximum
3. First non-repeating character
4. Design circular queue
5. Priority queue operations
6. BFS traversal
7. Level-order tree traversal

## Use Cases
- BFS graph traversal
- Task scheduling
- Resource sharing
- Message passing
- Buffer management

