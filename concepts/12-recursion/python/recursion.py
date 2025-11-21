"""
Recursion Examples in Python
"""

def factorial(n):
    """
    Factorial using recursion
    Time: O(n), Space: O(n)
    """
    if n <= 1:
        return 1
    return n * factorial(n - 1)


def fibonacci_recursive(n):
    """
    Fibonacci using recursion (inefficient)
    Time: O(2^n), Space: O(n)
    """
    if n <= 1:
        return n
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)


def power(base, exponent):
    """
    Power function using recursion
    Time: O(log n), Space: O(log n)
    """
    if exponent == 0:
        return 1
    if exponent < 0:
        return 1 / power(base, -exponent)
    
    half = power(base, exponent // 2)
    if exponent % 2 == 0:
        return half * half
    else:
        return half * half * base


def gcd(a, b):
    """
    Greatest Common Divisor using recursion
    Time: O(log min(a, b)), Space: O(log min(a, b))
    """
    if b == 0:
        return a
    return gcd(b, a % b)


def tower_of_hanoi(n, source, destination, auxiliary):
    """
    Tower of Hanoi
    Time: O(2^n), Space: O(n)
    """
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    
    tower_of_hanoi(n - 1, source, auxiliary, destination)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, destination, source)


def generate_permutations(arr):
    """
    Generate all permutations
    Time: O(n!), Space: O(n!)
    """
    if len(arr) <= 1:
        return [arr]
    
    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i + 1:]
        for perm in generate_permutations(rest):
            result.append([arr[i]] + perm)
    
    return result


def generate_subsets(arr):
    """
    Generate all subsets
    Time: O(2^n), Space: O(2^n)
    """
    if len(arr) == 0:
        return [[]]
    
    subsets = generate_subsets(arr[1:])
    return subsets + [[arr[0]] + subset for subset in subsets]


def binary_search_recursive(arr, target, left=0, right=None):
    """
    Binary search using recursion
    Time: O(log n), Space: O(log n)
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)


# ========== TAIL RECURSION ==========

def factorial_tail_recursive(n, accumulator=1):
    """
    Factorial using Tail Recursion
    The recursive call is the last operation
    Time: O(n), Space: O(1) if optimized by compiler
    """
    if n <= 1:
        return accumulator
    return factorial_tail_recursive(n - 1, n * accumulator)


def gcd_tail_recursive(a, b):
    """
    GCD using Tail Recursion
    Time: O(log min(a, b)), Space: O(1) if optimized
    """
    if b == 0:
        return a
    return gcd_tail_recursive(b, a % b)


def sum_array_tail_recursive(arr, index=0, accumulator=0):
    """
    Sum array using Tail Recursion
    Time: O(n), Space: O(1) if optimized
    """
    if index >= len(arr):
        return accumulator
    return sum_array_tail_recursive(arr, index + 1, accumulator + arr[index])


def power_tail_recursive(base, exponent, accumulator=1):
    """
    Power function using Tail Recursion
    Time: O(log n), Space: O(1) if optimized
    """
    if exponent == 0:
        return accumulator
    if exponent < 0:
        return 1 / power_tail_recursive(base, -exponent, 1)
    
    if exponent % 2 == 0:
        return power_tail_recursive(base * base, exponent // 2, accumulator)
    else:
        return power_tail_recursive(base, exponent - 1, accumulator * base)


# ========== MEMOIZATION ==========

def fibonacci_memoized(n, memo=None):
    """
    Fibonacci using Memoization (Top-down DP)
    Time: O(n), Space: O(n)
    """
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo)
    return memo[n]


def factorial_memoized(n, memo=None):
    """
    Factorial using Memoization
    Time: O(n), Space: O(n)
    """
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        memo[n] = 1
        return 1
    
    memo[n] = n * factorial_memoized(n - 1, memo)
    return memo[n]


def grid_traveler_memoized(m, n, memo=None):
    """
    Grid Traveler - Number of ways to travel from (0,0) to (m-1, n-1)
    Using Memoization
    Time: O(m * n), Space: O(m * n)
    """
    if memo is None:
        memo = {}
    
    key = f"{m},{n}"
    if key in memo:
        return memo[key]
    
    if m == 1 and n == 1:
        return 1
    if m == 0 or n == 0:
        return 0
    
    memo[key] = (grid_traveler_memoized(m - 1, n, memo) + 
                 grid_traveler_memoized(m, n - 1, memo))
    return memo[key]


def can_sum_memoized(target, numbers, memo=None):
    """
    Can Sum - Check if target can be achieved by summing numbers
    Using Memoization
    Time: O(target * len(numbers)), Space: O(target)
    """
    if memo is None:
        memo = {}
    
    if target in memo:
        return memo[target]
    
    if target == 0:
        return True
    if target < 0:
        return False
    
    for num in numbers:
        remainder = target - num
        if can_sum_memoized(remainder, numbers, memo):
            memo[target] = True
            return True
    
    memo[target] = False
    return False


# Decorator for automatic memoization
def memoize(func):
    """
    Memoization decorator
    Automatically caches function results
    """
    cache = {}
    
    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    
    return wrapper


@memoize
def fibonacci_decorated(n):
    """
    Fibonacci with memoization decorator
    """
    if n <= 1:
        return n
    return fibonacci_decorated(n - 1) + fibonacci_decorated(n - 2)


# Example usage
if __name__ == "__main__":
    print("Factorial(5):", factorial(5))
    print("Fibonacci(8):", fibonacci_recursive(8))
    print("Power(2, 10):", power(2, 10))
    print("GCD(48, 18):", gcd(48, 18))
    
    print("\nTower of Hanoi (3 disks):")
    tower_of_hanoi(3, 'A', 'C', 'B')
    
    print("\nPermutations of [1, 2, 3]:")
    print(generate_permutations([1, 2, 3]))
    
    print("\nSubsets of [1, 2, 3]:")
    print(generate_subsets([1, 2, 3]))
    
    print("\nBinary search:", binary_search_recursive([1, 3, 5, 7, 9], 5))
    
    # Tail Recursion Examples
    print("\n=== TAIL RECURSION ===")
    print("Factorial (tail recursive):", factorial_tail_recursive(5))
    print("GCD (tail recursive):", gcd_tail_recursive(48, 18))
    print("Sum array (tail recursive):", sum_array_tail_recursive([1, 2, 3, 4, 5]))
    print("Power (tail recursive):", power_tail_recursive(2, 10))
    
    # Memoization Examples
    print("\n=== MEMOIZATION ===")
    print("Fibonacci (memoized):", fibonacci_memoized(40))
    print("Factorial (memoized):", factorial_memoized(10))
    print("Grid Traveler (2x3):", grid_traveler_memoized(2, 3))
    print("Can Sum (7, [2, 3]):", can_sum_memoized(7, [2, 3]))
    print("Fibonacci (decorated):", fibonacci_decorated(40))

