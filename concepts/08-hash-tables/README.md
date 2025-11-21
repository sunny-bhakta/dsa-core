# 08. Hash Tables

**Navigation:** [Home](../../README.md) | [Previous: Graphs](../07-graphs/README.md) | [Next: Strings](../09-strings/README.md)

## Overview
A hash table (hash map) is a data structure that maps keys to values using a hash function.

## Key Concepts

### Hash Function
- Maps keys to array indices
- Should be deterministic and uniform
- **Division Method**: h(k) = k mod m (Implemented)
- **Multiplication Method**: h(k) = floor(m * (k * A mod 1)) (Implemented)
  - A typically (√5 - 1) / 2 ≈ 0.618
  - Better distribution than division method
  - Implemented in [advanced_hashing.py](./python/advanced_hashing.py)

### Collision Resolution
- **Chaining**: Store collisions in linked list (Implemented)
- **Open Addressing**: Find next available slot (Implemented)
  - **Linear Probing**: (h(k) + i) mod m (Implemented)
  - **Quadratic Probing**: (h(k) + i²) mod m (Implemented)
  - **Double Hashing**: (h1(k) + i * h2(k)) mod m (Implemented)
    - Better than quadratic probing
    - Reduces clustering

## Operations

### Time Complexity (Average)
- **Insert**: O(1)
- **Search**: O(1)
- **Delete**: O(1)
- **Worst case**: O(n) if all keys hash to same index

### Space Complexity
- O(n) - where n is the number of key-value pairs

## Load Factor
- Ratio of entries to buckets
- Typically kept below 0.75
- Triggers rehashing when exceeded

## Common Problems
1. Two sum
2. Group anagrams
3. Longest substring without repeating
4. Design hash map
5. First unique character

## Use Cases
- Database indexing
- Caching
- Symbol tables
- Associative arrays
- Fast lookups

