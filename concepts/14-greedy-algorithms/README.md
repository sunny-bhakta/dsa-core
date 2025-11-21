# 14. Greedy Algorithms

**Navigation:** [Home](../../README.md) | [Previous: Dynamic Programming](../13-dynamic-programming/README.md) | [Next: Backtracking](../15-backtracking/README.md)

## Overview
Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. They work when a greedy choice property holds.

## Greedy Choice Property
- A global optimum can be reached by making locally optimal choices
- No need to reconsider previous choices

## When to Use
- Optimization problems
- Problems with greedy choice property
- Problems where local optimum leads to global optimum

## Common Greedy Problems

### Activity Selection
- Select maximum non-overlapping activities
- Sort by finish time, greedily select

### Fractional Knapsack
- Items can be taken partially
- Sort by value/weight ratio

### Interval Scheduling
- Schedule maximum activities
- Similar to activity selection

### Huffman Coding
- Optimal prefix-free encoding
- Build tree greedily

### Minimum Spanning Tree
- Kruskal's Algorithm
- Prim's Algorithm

### Shortest Path
- Dijkstra's Algorithm (non-negative weights)

## Advantages
- Simple and intuitive
- Often efficient (O(n log n) with sorting)
- Easy to implement

## Disadvantages
- Doesn't always give optimal solution
- Hard to prove correctness
- May get stuck in local optimum

## Common Problems
1. Activity selection (Implemented)
2. Fractional knapsack (Implemented)
3. **Job Scheduling** (Implemented)
   - **Job Sequencing with Deadlines**: Maximize profit before deadlines (Greedy)
   - **Weighted Job Scheduling**: Maximum profit subset of non-overlapping jobs (DP)
   - **Earliest Deadline First (EDF)**: Minimize maximum lateness
   - Implemented in [greedy.py](./python/greedy.py) and [greedy.js](./node/greedy.js)
4. Minimum coins (greedy approach) (Implemented)
5. Interval problems (Implemented)
6. Huffman coding (Implemented)
7. Kruskal's/Prim's MST (Implemented in Graph Algorithms)

