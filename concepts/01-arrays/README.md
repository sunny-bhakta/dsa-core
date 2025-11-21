# 01. Arrays

**Navigation:** [Home](../../README.md) | [Next: Linked Lists](../02-linked-lists/README.md)

## Overview
An array is a collection of elements stored in contiguous memory locations. Arrays are one of the most fundamental data structures in computer science.

## Key Concepts

### Static Arrays
- Fixed size determined at declaration
- Memory allocated at compile time
- Fast access using index (O(1))
- Size cannot be changed after creation

### Dynamic Arrays
- Size can grow or shrink during runtime
- Automatically resizes when capacity is exceeded
- Maintains contiguous memory allocation
- Amortized O(1) insertion at end, O(n) worst case

### Multi-dimensional Arrays
- Arrays with more than one dimension
- 2D arrays (matrices), 3D arrays, etc.
- Stored in row-major or column-major order
- Implemented in [multi_dimensional_arrays.py](./python/multi_dimensional_arrays.py)
- Matrix operations: addition, multiplication, transpose

## Operations

### Time Complexity
- **Access**: O(1) - Direct access by index
- **Search**: O(n) - Linear search through elements
- **Insertion**: 
  - At end: O(1) amortized
  - At beginning/middle: O(n) - requires shifting
- **Deletion**: O(n) - requires shifting elements
- **Update**: O(1) - Direct access by index

### Space Complexity
- O(n) - where n is the number of elements

## Common Problems
1. Array rotation
2. Finding maximum/minimum subarray
3. Two sum problem
4. Merge sorted arrays
5. Remove duplicates
6. Product of array except self
7. Container with most water
8. Trapping rain water

## Use Cases
- Storing collections of similar data types
- Implementing other data structures (stacks, queues, heaps)
- Matrix operations
- Lookup tables
- Buffer management

