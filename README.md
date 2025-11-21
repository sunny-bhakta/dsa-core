# Data Structures and Algorithms - Core Concepts

A comprehensive list of data structures and algorithms concepts for learning and reference.

## 📋 Quick Links

- **[📊 Complete Concepts Table](./concepts.md)** - Detailed table of all concepts and sub-concepts with implementation status
- **[📁 Project Structure](#-project-structure)** - Folder structure and organization
- **[📚 Detailed Concept Documentation](#-detailed-concept-documentation)** - Individual concept documentation below
- **[📈 Statistics](#-statistics)** - Implementation statistics and completion rates

---

## 📁 Project Structure

```
dsa-core/
│
├── README.md                    # This file - Main documentation
├── concepts.md                  # Complete table of all concepts and sub-concepts (if exists)
├── CONCEPTS_TABLE.md            # Complete table of all concepts and sub-concepts
│
└── concepts/                    # All concept implementations
    │
    ├── 01-arrays/
    │   ├── README.md
    │   ├── python/
    │   │   ├── array_basics.py
    │   │   ├── array_problems.py
    │   │   └── multi_dimensional_arrays.py
    │   └── node/
    │       ├── arrayBasics.js
    │       ├── arrayProblems.js
    │       └── multiDimensionalArrays.js
    │
    ├── 02-linked-lists/
    │   ├── README.md
    │   ├── python/
    │   │   ├── linked_list.py
    │   │   ├── linked_list_problems.py
    │   │   └── circular_linked_list.py
    │   └── node/
    │       ├── linkedList.js
    │       ├── linkedListProblems.js
    │       └── circularLinkedList.js
    │
    ├── 03-stacks/
    │   ├── README.md
    │   ├── python/
    │   │   ├── stack.py
    │   │   └── stack_problems.py
    │   └── node/
    │       ├── stack.js
    │       └── stackProblems.js
    │
    ├── 04-queues/
    │   ├── README.md
    │   ├── python/
    │   │   ├── queue.py
    │   │   └── queue_problems.py
    │   └── node/
    │       ├── queue.js
    │       └── queueProblems.js
    │
    ├── 05-trees/
    │   ├── README.md
    │   ├── python/
    │   │   ├── binary_tree.py
    │   │   ├── trie.py
    │   │   ├── advanced_trees.py
    │   │   ├── red_black_tree.py
    │   │   └── b_tree.py
    │   └── node/
    │       ├── binaryTree.js
    │       ├── trie.js
    │       ├── advancedTrees.js
    │       ├── redBlackTree.js
    │       └── bTree.js
    │
    ├── 06-heaps/
    │   ├── README.md
    │   ├── python/
    │   │   └── heap.py
    │   └── node/
    │       └── heap.js
    │
    ├── 07-graphs/
    │   ├── README.md
    │   ├── python/
    │   │   ├── graph.py
    │   │   └── edge_list.py
    │   └── node/
    │       ├── graph.js
    │       └── edgeList.js
    │
    ├── 08-hash-tables/
    │   ├── README.md
    │   ├── python/
    │   │   ├── hash_table.py
    │   │   └── advanced_hashing.py
    │   └── node/
    │       ├── hashTable.js
    │       └── advancedHashing.js
    │
    ├── 09-strings/
    │   ├── README.md
    │   ├── python/
    │   │   ├── string_algorithms.py
    │   │   ├── advanced_string_problems.py
    │   │   └── boyer_moore.py
    │   └── node/
    │       ├── stringAlgorithms.js
    │       ├── advancedStringProblems.js
    │       └── boyerMoore.js
    │
    ├── 10-sorting-algorithms/
    │   ├── README.md
    │   ├── python/
    │   │   ├── sorting.py
    │   │   └── advanced_sorting.py
    │   └── node/
    │       ├── sorting.js
    │       └── advancedSorting.js
    │
    ├── 11-searching-algorithms/
    │   ├── README.md
    │   ├── python/
    │   │   └── searching.py
    │   └── node/
    │       └── searching.js
    │
    ├── 12-recursion/
    │   ├── README.md
    │   ├── python/
    │   │   ├── recursion.py
    │   │   ├── tail_recursion.py
    │   │   └── memoization.py
    │   └── node/
    │       ├── recursion.js
    │       ├── tailRecursion.js
    │       └── memoization.js
    │
    ├── 13-dynamic-programming/
    │   ├── README.md
    │   ├── python/
    │   │   ├── dp_problems.py
    │   │   └── advanced_dp.py
    │   └── node/
    │       ├── dpProblems.js
    │       └── advancedDp.js
    │
    ├── 14-greedy-algorithms/
    │   ├── README.md
    │   ├── python/
    │   │   └── greedy.py
    │   └── node/
    │       └── greedy.js
    │
    ├── 15-backtracking/
    │   ├── README.md
    │   ├── python/
    │   │   └── backtracking.py
    │   └── node/
    │       └── backtracking.js
    │
    ├── 16-graph-algorithms/
    │   ├── README.md
    │   ├── python/
    │   │   ├── graph_algorithms.py
    │   │   └── advanced_graph_algorithms.py
    │   └── node/
    │       ├── graphAlgorithms.js
    │       └── advancedGraphAlgorithms.js
    │
    ├── 17-string-algorithms/
    │   └── README.md
    │
    ├── 18-mathematical-algorithms/
    │   ├── README.md
    │   ├── python/
    │   │   └── mathematical.py
    │   └── node/
    │       └── mathematical.js
    │
    ├── 19-bit-manipulation/
    │   ├── README.md
    │   ├── python/
    │   │   └── bit_manipulation.py
    │   └── node/
    │       └── bitManipulation.js
    │
    ├── 20-sliding-window/
    │   ├── README.md
    │   ├── python/
    │   │   └── sliding_window.py
    │   └── node/
    │       └── slidingWindow.js
    │
    └── 21-two-pointers/
        ├── README.md
        ├── python/
        │   └── two_pointers.py
        └── node/
            └── twoPointers.js
    │
    └── 22-interview-questions/
        ├── README.md
        ├── python/
        │   ├── arrays_strings.py
        │   ├── linked_lists.py
        │   ├── trees.py
        │   ├── dynamic_programming.py
        │   ├── graphs.py
        │   └── backtracking.py
        └── node/
            ├── arraysStrings.js
            ├── linkedLists.js
            ├── trees.js
            ├── dynamicProgramming.js
            ├── graphs.js
            └── backtracking.js
```

### Structure Notes

- **Numbered folders**: Each concept has a numbered folder (01-21) for easy navigation
- **README.md**: Each concept folder contains detailed documentation
- **python/**: Python implementations for each concept
- **node/**: Node.js implementations for each concept
- **Consistent naming**: Files follow consistent naming conventions (snake_case for Python, camelCase for Node.js)

---

## 📚 Detailed Concept Documentation

Each concept includes detailed documentation and example code in both Python and Node.js:

### Data Structures
1. [Arrays](./concepts/01-arrays/README.md) - Static/Dynamic arrays, operations, and problems
2. [Linked Lists](./concepts/02-linked-lists/README.md) - Singly/Doubly linked lists, operations
3. [Stacks](./concepts/03-stacks/README.md) - Stack implementation, expression evaluation
4. [Queues](./concepts/04-queues/README.md) - Queue types, BFS applications
5. [Trees](./concepts/05-trees/README.md) - Binary trees, BST, traversals
6. [Heaps](./concepts/06-heaps/README.md) - Min/Max heap, priority queues
7. [Graphs](./concepts/07-graphs/README.md) - Graph representation, types
8. [Hash Tables](./concepts/08-hash-tables/README.md) - Hash functions, collision resolution
9. [Strings](./concepts/09-strings/README.md) - String operations, pattern matching

### Algorithms
10. [Sorting Algorithms](./concepts/10-sorting-algorithms/README.md) - All major sorting algorithms
11. [Searching Algorithms](./concepts/11-searching-algorithms/README.md) - Linear, binary, and advanced searches
12. [Recursion](./concepts/12-recursion/README.md) - Recursive problem solving, Tail Recursion, Memoization
13. [Dynamic Programming](./concepts/13-dynamic-programming/README.md) - DP patterns and problems
14. [Greedy Algorithms](./concepts/14-greedy-algorithms/README.md) - Greedy problem solving
15. [Backtracking](./concepts/15-backtracking/README.md) - Constraint satisfaction problems

### Problem-Solving Techniques
19. [Bit Manipulation](./concepts/19-bit-manipulation/README.md) - Bitwise operations and tricks
20. [Sliding Window](./concepts/20-sliding-window/README.md) - Window-based problems
21. [Two Pointers](./concepts/21-two-pointers/README.md) - Pointer-based techniques

### Interview Preparation
22. [Interview Questions & Answers](./concepts/22-interview-questions/README.md) - 30+ common interview questions with solutions in Python and Node.js

## Table of Contents
- [Quick Links](#-quick-links)
- [Project Structure](#-project-structure)
- [Detailed Concept Documentation](#-detailed-concept-documentation)
- [Data Structures](#data-structures)
- [Algorithms](#algorithms)
- [Problem-Solving Techniques](#problem-solving-techniques)
- [Complexity Analysis](#complexity-analysis)
- [Practice Resources](#practice-resources)
- [Getting Started](#getting-started)

---

## Data Structures

### 1. Arrays
- Static Arrays
- Dynamic Arrays
- Multi-dimensional Arrays
- Array Manipulation
- Array Rotation
- Subarray Problems

### 2. Linked Lists
- Singly Linked List
- Doubly Linked List
- Circular Linked List
- Linked List Operations (Insert, Delete, Search)
- Linked List Reversal
- Cycle Detection
- Merge Linked Lists

### 3. Stacks
- Stack Implementation (Array-based, Linked List-based)
- Stack Operations (Push, Pop, Peek)
- Infix, Prefix, Postfix Expressions
- Balanced Parentheses
- Monotonic Stack
- Stack-based Problems

### 4. Queues
- Queue Implementation (Array-based, Linked List-based)
- Queue Operations (Enqueue, Dequeue)
- Circular Queue
- Priority Queue
- Deque (Double-ended Queue)
- Queue-based Problems

### 5. Trees
- Binary Tree
- Binary Search Tree (BST)
- Tree Traversal (Inorder, Preorder, Postorder, Level-order)
- Tree Construction
- Tree Height and Depth
- Balanced Trees (AVL Tree, Red-Black Tree)
- Segment Tree
- Fenwick Tree (Binary Indexed Tree)
- Trie (Prefix Tree)
- Suffix Tree

### 6. Heaps
- Min Heap
- Max Heap
- Heap Operations (Insert, Extract, Heapify)
- Heap Sort
- Priority Queue using Heap
- K-way Merge using Heap

### 7. Graphs
- Graph Representation (Adjacency List, Adjacency Matrix)
- Graph Traversal (BFS, DFS)
- Shortest Path Algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)
- Minimum Spanning Tree (Kruskal, Prim)
- Topological Sort
- Strongly Connected Components
- Graph Coloring
- Network Flow

### 8. Hash Tables
- Hash Functions
- Collision Resolution (Chaining, Open Addressing)
- Hash Map / Dictionary
- Hash Set
- Load Factor and Rehashing

### 9. Strings
- String Manipulation
- String Matching (Naive, KMP, Rabin-Karp, Boyer-Moore)
- String Compression
- Palindrome Problems
- Anagrams
- Longest Common Subsequence/Substring

### 10. Advanced Data Structures
- Disjoint Set (Union-Find)
- Skip List
- Bloom Filter
- B-Tree
- Splay Tree
- Treap

---

## Algorithms

### 1. Sorting Algorithms
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort
- Counting Sort
- Radix Sort
- Bucket Sort
- Tim Sort

### 2. Searching Algorithms
- Linear Search
- Binary Search
- Ternary Search
- Interpolation Search
- Exponential Search
- Jump Search

### 3. Recursion
- Basic Recursion
- Tail Recursion
- Backtracking
- Divide and Conquer
- Recursive Tree Traversal
- Memoization

### 4. Dynamic Programming
- 1D DP Problems
- 2D DP Problems
- Knapsack Problems (0/1, Unbounded, Fractional)
- Longest Common Subsequence (LCS)
- Longest Increasing Subsequence (LIS)
- Edit Distance
- Coin Change Problems
- Matrix Chain Multiplication
- Optimal Substructure
- Overlapping Subproblems

### 5. Greedy Algorithms
- Activity Selection
- Fractional Knapsack
- Huffman Coding
- Minimum Spanning Tree (Kruskal, Prim)
- Dijkstra's Algorithm
- Job Scheduling
- Interval Problems

### 6. Backtracking
- N-Queens Problem
- Sudoku Solver
- Permutations and Combinations
- Subset Generation
- Word Search
- Rat in a Maze
- Knight's Tour

### 7. Graph Algorithms
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Shortest Path:
  - Dijkstra's Algorithm
  - Bellman-Ford Algorithm
  - Floyd-Warshall Algorithm
  - A* Algorithm
- Minimum Spanning Tree:
  - Kruskal's Algorithm
  - Prim's Algorithm
- Topological Sort
- Strongly Connected Components (Kosaraju, Tarjan)
- Articulation Points and Bridges
- Bipartite Graph Check
- Cycle Detection

### 8. String Algorithms
- Pattern Matching:
  - Naive Algorithm
  - Knuth-Morris-Pratt (KMP)
  - Rabin-Karp
  - Boyer-Moore
- Longest Common Subsequence (LCS)
- Longest Common Substring
- Longest Palindromic Substring
- String Compression
- Edit Distance (Levenshtein Distance)

### 9. Mathematical Algorithms
- Prime Number Generation (Sieve of Eratosthenes)
- Greatest Common Divisor (GCD) - Euclidean Algorithm
- Least Common Multiple (LCM)
- Modular Arithmetic
- Fast Exponentiation
- Fibonacci Sequence
- Factorial
- Permutations and Combinations
- Number Theory Problems

### 10. Bit Manipulation
- Basic Bit Operations
- Bitwise AND, OR, XOR, NOT
- Left Shift, Right Shift
- Bit Masking
- Counting Set Bits
- Power of Two Check
- Single Number Problems

### 11. Sliding Window
- Fixed Size Window
- Variable Size Window
- Maximum/Minimum in Window
- Subarray with Given Sum
- Longest Substring Problems

### 12. Two Pointers
- Array Two Pointers
- Linked List Two Pointers
- Fast and Slow Pointers
- Meeting Point Problems
- Palindrome Check

### 13. Binary Search Variations
- Binary Search on Sorted Array
- Binary Search on Answer Space
- Search in Rotated Sorted Array
- Find Peak Element
- Search in 2D Matrix

### 14. Prefix Sum and Suffix Sum
- 1D Prefix Sum
- 2D Prefix Sum
- Range Sum Queries
- Subarray Sum Problems

### 15. Monotonic Stack/Queue
- Next Greater Element
- Next Smaller Element
- Largest Rectangle in Histogram
- Trapping Rain Water

---

## Problem-Solving Techniques

### 1. Problem Analysis
- Time Complexity Analysis
- Space Complexity Analysis
- Big O Notation
- Identifying Patterns

### 2. Approach Selection
- Brute Force
- Optimized Solutions
- Trade-offs (Time vs Space)

### 3. Common Patterns
- Two Pointers
- Sliding Window
- Prefix Sum
- Hash Map for Lookup
- Stack for Monotonic Problems
- Queue for BFS
- Recursion with Memoization
- Divide and Conquer
- Greedy Choice Property

### 4. Optimization Strategies
- Memoization
- Tabulation (DP)
- Space Optimization
- Time-Space Trade-offs

---

## Complexity Analysis

### Time Complexity
- O(1) - Constant Time
- O(log n) - Logarithmic Time
- O(n) - Linear Time
- O(n log n) - Linearithmic Time
- O(n²) - Quadratic Time
- O(n³) - Cubic Time
- O(2ⁿ) - Exponential Time
- O(n!) - Factorial Time

### Space Complexity
- Auxiliary Space
- Space Complexity Analysis
- In-place Algorithms

---

## Practice Resources

### Common Problem Categories
1. **Array Problems**: Rotations, Subarrays, Kadane's Algorithm
2. **String Problems**: Palindromes, Anagrams, Pattern Matching
3. **Tree Problems**: Traversal, Construction, Validation
4. **Graph Problems**: Shortest Path, MST, Connectivity
5. **Dynamic Programming**: Optimization, Counting, Decision
6. **Greedy Problems**: Scheduling, Selection, Optimization
7. **Backtracking**: Constraint Satisfaction, Enumeration

### Problem Difficulty Levels
- Easy: Basic implementations, simple logic
- Medium: Requires optimization, multiple concepts
- Hard: Complex algorithms, advanced techniques

---

## Notes
- This list covers fundamental and advanced concepts in Data Structures and Algorithms
- Each concept can be implemented in multiple programming languages
- Practice problems are essential for mastering these concepts
- Understanding time and space complexity is crucial for optimization

## Code Examples

All concepts include:
- **Python** implementations in `concepts/[XX-concept]/python/`
- **Node.js** implementations in `concepts/[XX-concept]/node/`
- Example problems and solutions
- Time and space complexity analysis
- Detailed README documentation

## 📊 Implementation Status

For a complete overview of implementation status for all concepts and sub-concepts, see:
- **[concepts.md](./concepts.md)** - Comprehensive table showing:
  - All 22 major concepts (21 core + 1 interview prep)
  - 260+ sub-concepts
  - 30+ interview questions with solutions
  - Implementation status (Python, Node.js, README)
  - Completion percentage (99%+)

## Getting Started

1. **Browse the [Concepts Table](./concepts.md)** to see all available concepts and their status
2. **Explore concepts by category** above (Data Structures, Algorithms, Problem-Solving Techniques, Interview Prep)
3. **Read the detailed README** for each concept (click on concept links)
4. **Study the Python and Node.js implementations** in each concept folder
5. **Practice with the included problem examples** - each file includes example usage
6. **Review [Interview Questions](./concepts/22-interview-questions/README.md)** - 30+ common interview problems with solutions
7. **Try solving similar problems** on coding platforms like LeetCode, HackerRank, etc.

## 📈 Statistics

- **Total Concepts**: 22 major concepts (21 core + 1 interview prep)
- **Total Sub-concepts**: 260+ sub-concepts
- **Python Files**: 80+ implementation files
- **Node.js Files**: 80+ implementation files
- **Documentation**: 22 detailed README files
- **Interview Questions**: 30+ common interview problems with solutions
- **Completion Rate**: 99%+ (see [CONCEPTS_TABLE.md](./CONCEPTS_TABLE.md) for details)

