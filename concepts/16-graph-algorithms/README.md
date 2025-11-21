# 16. Graph Algorithms

**Navigation:** [Home](../../README.md) | [Previous: Backtracking](../15-backtracking/README.md) | [Next: String Algorithms](../17-string-algorithms/README.md)

## Overview
Advanced graph algorithms for shortest paths, minimum spanning trees, and other graph problems.

## Shortest Path Algorithms

### Dijkstra's Algorithm
- **Time**: O((V + E) log V) with priority queue
- **Space**: O(V)
- Finds shortest path from source to all vertices
- Works for non-negative edge weights
- Uses greedy approach with priority queue

### Bellman-Ford Algorithm
- **Time**: O(VE)
- **Space**: O(V)
- Finds shortest path with negative weights allowed
- Detects negative cycles
- Slower but more general than Dijkstra

### Floyd-Warshall Algorithm
- **Time**: O(V³)
- **Space**: O(V²)
- Finds shortest paths between all pairs
- Works with negative weights (no negative cycles)
- Dynamic programming approach

## Minimum Spanning Tree

### Kruskal's Algorithm
- **Time**: O(E log E) with union-find
- **Space**: O(V)
- Greedy algorithm
- Uses union-find data structure
- Sort edges by weight

### Prim's Algorithm
- **Time**: O((V + E) log V) with priority queue
- **Space**: O(V)
- Greedy algorithm
- Similar to Dijkstra
- Grows MST from a vertex

## Other Algorithms

### Strongly Connected Components
- **Kosaraju's Algorithm**: O(V + E) (Implemented)
- **Tarjan's Algorithm**: O(V + E) (Implemented)

### Articulation Points and Bridges
- **Articulation Points (Cut Vertices)**: O(V + E) (Implemented)
- **Bridges (Cut Edges)**: O(V + E) (Implemented)

### Bipartite Graph Check
- Two-color graph coloring

## Common Problems
1. Shortest path in weighted graph
2. Minimum spanning tree
3. All-pairs shortest path
4. Network flow problems
5. Strongly connected components
6. Critical path analysis

