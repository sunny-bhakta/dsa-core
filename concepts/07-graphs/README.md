# 07. Graphs

**Navigation:** [Home](../../README.md) | [Previous: Heaps](../06-heaps/README.md) | [Next: Hash Tables](../08-hash-tables/README.md)

## Overview
A graph is a collection of nodes (vertices) connected by edges. Graphs represent relationships between objects.

## Key Concepts

### Graph Representation
- **Adjacency List**: List of neighbors for each vertex (Implemented)
- **Adjacency Matrix**: 2D matrix representing connections (Implemented)
- **Edge List**: List of all edges (Implemented)
  - Simple edge storage
  - Efficient for Kruskal's MST
  - Conversion to other representations

### Graph Types
- **Directed**: Edges have direction
- **Undirected**: Edges are bidirectional
- **Weighted**: Edges have weights
- **Unweighted**: All edges equal

## Operations

### Time Complexity
- **Add Vertex**: O(1)
- **Add Edge**: O(1)
- **Remove Vertex**: O(V + E)
- **Remove Edge**: O(E)
- **Search**: O(V + E) for BFS/DFS

### Space Complexity
- O(V + E) - where V is vertices, E is edges

## Common Problems
1. Graph traversal (BFS, DFS)
2. Shortest path
3. Cycle detection
4. Topological sort
5. Connected components
6. Minimum spanning tree

## Use Cases
- Social networks
- Web page links
- Road networks
- Dependency graphs
- Recommendation systems

