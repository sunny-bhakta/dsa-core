# 03. Stacks

**Navigation:** [Home](../../README.md) | [Previous: Linked Lists](../02-linked-lists/README.md) | [Next: Queues](../04-queues/README.md)

## Overview
A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top.

## Key Concepts

### Stack Operations
- **Push**: Add element to the top - O(1)
- **Pop**: Remove element from the top - O(1)
- **Peek/Top**: View top element without removing - O(1)
- **isEmpty**: Check if stack is empty - O(1)
- **Size**: Get number of elements - O(1)

### Implementation Methods
1. **Array-based**: Simple, efficient, fixed or dynamic size
2. **Linked List-based**: Dynamic size, extra memory for pointers

## Operations

### Time Complexity
- **Push**: O(1)
- **Pop**: O(1)
- **Peek**: O(1)
- **Search**: O(n)
- **Size**: O(1)

### Space Complexity
- O(n) - where n is the number of elements

## Applications

### Expression Evaluation
- Infix to Postfix conversion
- Postfix evaluation
- Prefix evaluation
- Balanced parentheses

### Function Calls
- Call stack in recursion
- Undo/redo operations
- Backtracking algorithms

### Other Uses
- Browser history
- String reversal
- Monotonic stack problems
- Largest rectangle in histogram
- Next greater element

## Common Problems
1. Valid parentheses
2. Next greater element
3. Largest rectangle in histogram
4. Trapping rain water
5. Min stack
6. Evaluate postfix expression
7. Infix to postfix conversion
8. Stock span problem

## Use Cases
- Expression parsing and evaluation
- Backtracking algorithms
- Memory management
- Undo mechanisms
- Syntax parsing
- Function call management

