# 17. String Algorithms

**Navigation:** [Home](../../README.md) | [Previous: Graph Algorithms](../16-graph-algorithms/README.md) | [Next: Mathematical Algorithms](../18-mathematical-algorithms/README.md)

## Overview
Advanced string algorithms for pattern matching, text processing, and string analysis.

## Pattern Matching Algorithms

### Naive Algorithm
- **Time**: O(nm) where n=text, m=pattern
- **Space**: O(1)
- Simple brute force approach
- Check all positions

### Knuth-Morris-Pratt (KMP)
- **Time**: O(n + m)
- **Space**: O(m)
- Uses failure function (LPS array)
- Avoids redundant comparisons
- Linear time complexity

### Rabin-Karp
- **Time**: O(n + m) average, O(nm) worst
- **Space**: O(1)
- Uses rolling hash
- Good for multiple pattern matching
- Hash-based approach

### Boyer-Moore
- **Time**: O(nm) worst, O(n) best
- **Space**: O(m)
- Skips characters using bad character rule
- Efficient for long patterns
- Right-to-left scanning

## String Analysis

### Longest Common Subsequence (LCS)
- Dynamic programming approach
- O(nm) time and space

### Longest Common Substring
- Similar to LCS but contiguous
- O(nm) time and space

### Edit Distance (Levenshtein)
- Minimum operations to transform strings
- O(nm) time and space

## Common Problems
1. Pattern matching in text
2. String similarity
3. Text compression
4. DNA sequence alignment
5. Plagiarism detection
6. Search engines

