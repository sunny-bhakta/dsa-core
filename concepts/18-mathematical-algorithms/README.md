# 18. Mathematical Algorithms

**Navigation:** [Home](../../README.md) | [Previous: String Algorithms](../17-string-algorithms/README.md) | [Next: Bit Manipulation](../19-bit-manipulation/README.md)

## Overview
Mathematical algorithms for number theory, arithmetic, and computational mathematics.

## Prime Numbers

### Sieve of Eratosthenes
- **Time**: O(n log log n)
- **Space**: O(n)
- Find all primes up to n
- Efficient for large ranges

### Prime Factorization
- Trial division method
- Pollard's rho algorithm

## Number Theory

### Greatest Common Divisor (GCD)
- Euclidean Algorithm
- **Time**: O(log min(a, b))
- Extended Euclidean Algorithm

### Least Common Multiple (LCM)
- Using GCD: LCM(a, b) = (a × b) / GCD(a, b)

### Modular Arithmetic
- Modular exponentiation (Implemented)
- Modular inverse (Implemented)
- **Chinese Remainder Theorem** (Implemented)
  - Solves system of congruences: x ≡ a₁ (mod m₁), x ≡ a₂ (mod m₂), ...
  - Returns smallest non-negative solution
  - Time: O(n log M) where M is product of moduli

## Exponentiation

### Fast Exponentiation
- Binary exponentiation
- **Time**: O(log n)
- Power of large numbers

## Sequences

### Fibonacci
- Recursive (inefficient)
- Iterative (efficient)
- Matrix exponentiation
- Binet's formula

### Factorial
- Recursive and iterative
- Large number handling

## Combinatorics

### Permutations
- Generate all permutations
- Next permutation

### Combinations
- Generate combinations
- Binomial coefficient

## Common Problems
1. Prime number generation (Implemented)
2. GCD/LCM calculation (Implemented)
3. Modular arithmetic (Implemented)
4. Fast exponentiation (Implemented)
5. Fibonacci sequence (Implemented)
6. Factorial calculation (Implemented)
7. Permutations and combinations (Implemented)
8. Chinese Remainder Theorem (Implemented)

