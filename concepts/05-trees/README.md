# 05. Trees

**Navigation:** [Home](../../README.md) | [Previous: Queues](../04-queues/README.md) | [Next: Heaps](../06-heaps/README.md)

## Overview
A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has a root node and zero or more child nodes.

## Key Concepts

### Binary Tree
- Each node has at most two children (left and right)
- No ordering constraint
- Used for hierarchical data representation

### Binary Search Tree (BST)
- Left subtree contains nodes with values less than root
- Right subtree contains nodes with values greater than root
- Enables efficient search, insert, delete operations

### Tree Traversals
- **Inorder**: Left, Root, Right - O(n)
- **Preorder**: Root, Left, Right - O(n)
- **Postorder**: Left, Right, Root - O(n)
- **Level-order**: Level by level (BFS) - O(n)

## Operations

### Time Complexity (BST)
- **Search**: O(log n) average, O(n) worst
- **Insert**: O(log n) average, O(n) worst
- **Delete**: O(log n) average, O(n) worst
- **Traversal**: O(n)

### Space Complexity
- O(n) - where n is the number of nodes
- O(h) - for recursion stack, where h is height

## Types of Trees

### Balanced Trees
- **AVL Tree**: Height-balanced, rotations for balance (Implemented)
- **Red-Black Tree**: Self-balancing with color properties (Implemented)
  - Red-Black properties maintenance
  - Rotations for balancing
  - Black height calculation
- **B-Tree**: Multi-way search tree for databases (Implemented)
  - Multi-way search structure
  - Node splitting
  - Efficient for large datasets

### Special Trees
- **Trie (Prefix Tree)**: For string prefix matching (Implemented)
- **Segment Tree**: For range queries (Implemented)
- **Fenwick Tree**: For prefix sum queries (Implemented)
- **Suffix Tree**: For string suffix operations (Simplified Implementation)

## Common Problems
1. Tree traversal (all types)
2. Maximum depth/height
3. Validate BST
4. Lowest common ancestor
5. Path sum problems
6. Serialize/deserialize tree
7. Construct tree from traversals
8. Level-order traversal

## Use Cases
- File system representation
- Database indexing
- Expression parsing
- Decision trees
- Hierarchical data organization

