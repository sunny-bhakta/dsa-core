# 12. Recursion

**Navigation:** [Home](../../README.md) | [Previous: Searching Algorithms](../11-searching-algorithms/README.md) | [Next: Dynamic Programming](../13-dynamic-programming/README.md)

## Overview
Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem.

## Key Concepts

### Base Case
- Condition that stops recursion
- Prevents infinite recursion
- Returns a value without further recursion

### Recursive Case
- Function calls itself with modified parameters
- Moves toward base case
- Combines results from recursive calls

## Types

### Direct Recursion
- Function calls itself directly

### Indirect Recursion
- Function calls another function that calls it back

### Tail Recursion
- Recursive call is the last operation
- Can be optimized to iteration
- **Implemented**: 
  - [tail_recursion.py](./python/tail_recursion.py) - Dedicated Tail Recursion examples
  - [tailRecursion.js](./node/tailRecursion.js) - Dedicated Tail Recursion examples
  - Also in: [recursion.py](./python/recursion.py) | [recursion.js](./node/recursion.js)
- Examples:
  - Factorial (tail recursive)
  - GCD (tail recursive)
  - Sum array (tail recursive)
  - Power function (tail recursive)
- **Benefits**: 
  - Can be optimized by compiler/interpreter
  - Reduces stack space to O(1)
  - Prevents stack overflow

## When to Use
- Problems with recursive structure
- Tree/graph traversals
- Divide and conquer
- Backtracking

## Memoization

### Overview
- Technique to cache results of expensive function calls
- Stores results in a dictionary/map
- Returns cached result if available
- **Implemented**: 
  - [memoization.py](./python/memoization.py) - Dedicated Memoization examples
  - [memoization.js](./node/memoization.js) - Dedicated Memoization examples
  - Also in: [recursion.py](./python/recursion.py) | [recursion.js](./node/recursion.js)

### When to Use
- Functions with overlapping subproblems
- Expensive computations that repeat
- Recursive functions with repeated calls

### Examples Implemented
- **Fibonacci with Memoization**: O(2^n) → O(n) time
- **Factorial with Memoization**: Caches computed values
- **Grid Traveler**: Number of paths with memoization
- **Can Sum Problem**: Check if target achievable
- **Memoization Decorator**: Automatic caching wrapper

### Benefits
- Dramatically reduces time complexity
- Eliminates redundant calculations
- Bridge between recursion and dynamic programming

## Common Problems
1. Fibonacci sequence (Implemented - Regular, Tail Recursive, Memoized)
2. Factorial (Implemented - Regular, Tail Recursive, Memoized)
3. Tower of Hanoi (Implemented)
4. Tree traversals
5. Permutations/combinations (Implemented)
6. Binary search (recursive) (Implemented)
7. Grid Traveler (Implemented with Memoization)
8. Can Sum Problem (Implemented with Memoization)

## Advantages
- Clean, elegant code
- Natural for recursive structures
- Easy to understand
- **Tail Recursion**: Can be optimized to iteration
- **Memoization**: Dramatically improves performance for overlapping subproblems

## Disadvantages
- Stack overflow risk (mitigated by tail recursion)
- Overhead of function calls
- May be less efficient than iteration (unless tail-recursive optimized)
- **Memoization**: Uses extra space for caching

## Code Examples

### Regular Recursion vs Tail Recursion
```python
# Regular Recursion (not tail recursive)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Operation after recursive call

# Tail Recursion
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)  # Recursive call is last operation
```

### Memoization Example
```python
# Without Memoization: O(2^n)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# With Memoization: O(n)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
```

## Related Concepts
- [Dynamic Programming](../13-dynamic-programming/README.md) - Memoization is top-down DP
- [Backtracking](../15-backtracking/README.md) - Uses recursion
- [Tree Traversals](../05-trees/README.md) - Naturally recursive

