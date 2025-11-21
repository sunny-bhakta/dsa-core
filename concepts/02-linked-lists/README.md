# 02. Linked Lists

**Navigation:** [Home](../../README.md) | [Previous: Arrays](../01-arrays/README.md) | [Next: Stacks](../03-stacks/README.md)

## Overview
A linked list is a linear data structure where elements are stored in nodes, and each node contains a data field and a reference (link) to the next node in the sequence.

## Key Concepts

### Singly Linked List
- Each node points to the next node
- Last node points to null
- Unidirectional traversal
- Memory efficient (no wasted space)

### Doubly Linked List
- Each node points to both next and previous nodes
- Bidirectional traversal
- More memory overhead (extra pointer per node)
- Easier deletion operations

### Circular Linked List
- Last node points back to first node
- Can be singly or doubly linked
- Useful for round-robin scheduling
- Implemented in [circular_linked_list.py](./python/circular_linked_list.py)
- Applications: Josephus problem, round-robin scheduling

## Operations

### Time Complexity
- **Access**: O(n) - Must traverse from head
- **Search**: O(n) - Linear search
- **Insertion**: 
  - At head: O(1)
  - At tail: O(1) with tail pointer, O(n) without
  - At position: O(n)
- **Deletion**: 
  - At head: O(1)
  - At tail: O(1) with tail pointer, O(n) without
  - At position: O(n)

### Space Complexity
- O(n) - where n is the number of nodes

## Advantages
- Dynamic size (no need to know size in advance)
- Efficient insertion/deletion at beginning
- No memory waste (only uses what's needed)

## Disadvantages
- No random access (must traverse from head)
- Extra memory for pointers
- Cache performance is poor (not contiguous)

## Common Problems
1. Reverse linked list
2. Detect cycle
3. Merge two sorted lists
4. Find middle element
5. Remove nth node from end
6. Intersection of two lists
7. Palindrome check
8. Add two numbers represented as lists

## Use Cases
- Implementing stacks and queues
- Dynamic memory allocation
- Undo/redo functionality
- Browser history
- Polynomial representation

