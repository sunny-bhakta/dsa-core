"""
Memoization Examples in Python

Memoization is an optimization technique that caches the results of expensive
function calls and returns the cached result when the same inputs occur again.
This is especially useful for recursive functions with overlapping subproblems.

Time complexity can be dramatically reduced (e.g., O(2^n) → O(n) for Fibonacci).
"""

def fibonacci_memoized(n, memo=None):
    """
    Fibonacci using Memoization (Top-down DP)
    Time: O(n), Space: O(n)
    Without memoization: O(2^n)
    
    Args:
        n: Fibonacci number to compute
        memo: Dictionary to cache results (default: None)
    
    Returns:
        nth Fibonacci number
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
    
    Args:
        n: Number to compute factorial of
        memo: Dictionary to cache results (default: None)
    
    Returns:
        Factorial of n
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
    Without memoization: O(2^(m+n))
    
    Args:
        m: Number of rows
        n: Number of columns
        memo: Dictionary to cache results (default: None)
    
    Returns:
        Number of unique paths
    """
    if memo is None:
        memo = {}
    
    key = f"{m},{n}"
    if key in memo:
        return memo[key]
    
    # Also check reverse (symmetric problem)
    reverse_key = f"{n},{m}"
    if reverse_key in memo:
        return memo[reverse_key]
    
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
    Without memoization: O(len(numbers)^target)
    
    Args:
        target: Target sum
        numbers: List of numbers to use
        memo: Dictionary to cache results (default: None)
    
    Returns:
        True if target can be achieved, False otherwise
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


def how_sum_memoized(target, numbers, memo=None):
    """
    How Sum - Return one way to achieve target sum
    Using Memoization
    Time: O(target^2 * len(numbers)), Space: O(target^2)
    
    Args:
        target: Target sum
        numbers: List of numbers to use
        memo: Dictionary to cache results (default: None)
    
    Returns:
        List of numbers that sum to target, or None
    """
    if memo is None:
        memo = {}
    
    if target in memo:
        return memo[target]
    
    if target == 0:
        return []
    if target < 0:
        return None
    
    for num in numbers:
        remainder = target - num
        remainder_result = how_sum_memoized(remainder, numbers, memo)
        if remainder_result is not None:
            memo[target] = [num] + remainder_result
            return memo[target]
    
    memo[target] = None
    return None


def best_sum_memoized(target, numbers, memo=None):
    """
    Best Sum - Return shortest way to achieve target sum
    Using Memoization
    Time: O(target^2 * len(numbers)), Space: O(target^2)
    
    Args:
        target: Target sum
        numbers: List of numbers to use
        memo: Dictionary to cache results (default: None)
    
    Returns:
        Shortest list of numbers that sum to target, or None
    """
    if memo is None:
        memo = {}
    
    if target in memo:
        return memo[target]
    
    if target == 0:
        return []
    if target < 0:
        return None
    
    shortest_combination = None
    
    for num in numbers:
        remainder = target - num
        remainder_result = best_sum_memoized(remainder, numbers, memo)
        if remainder_result is not None:
            combination = [num] + remainder_result
            if shortest_combination is None or len(combination) < len(shortest_combination):
                shortest_combination = combination
    
    memo[target] = shortest_combination
    return shortest_combination


# Decorator for automatic memoization
def memoize(func):
    """
    Memoization decorator
    Automatically caches function results based on arguments
    
    Usage:
        @memoize
        def expensive_function(n):
            # ... expensive computation
    """
    cache = {}
    
    def wrapper(*args, **kwargs):
        # Create key from arguments
        key = str(args) + str(sorted(kwargs.items()))
        if key in cache:
            return cache[key]
        result = func(*args, **kwargs)
        cache[key] = result
        return result
    
    wrapper.cache_clear = lambda: cache.clear()
    return wrapper


@memoize
def fibonacci_decorated(n):
    """
    Fibonacci with memoization decorator
    Automatically cached by decorator
    """
    if n <= 1:
        return n
    return fibonacci_decorated(n - 1) + fibonacci_decorated(n - 2)


@memoize
def expensive_computation(n):
    """
    Example of expensive computation that benefits from memoization
    """
    if n <= 1:
        return n
    return expensive_computation(n - 1) + expensive_computation(n - 2) + n


# Comparison: With vs Without Memoization
def fibonacci_naive(n):
    """
    Naive Fibonacci without memoization
    Time: O(2^n) - Very slow for large n
    """
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)


# Example usage
if __name__ == "__main__":
    import time
    
    print("=== MEMOIZATION EXAMPLES ===\n")
    
    # Fibonacci comparison
    n = 35
    print(f"Computing Fibonacci({n}):")
    
    start = time.time()
    result_naive = fibonacci_naive(n)
    time_naive = time.time() - start
    print(f"  Naive (no memoization): {result_naive} in {time_naive:.4f}s")
    
    start = time.time()
    result_memo = fibonacci_memoized(n)
    time_memo = time.time() - start
    print(f"  With memoization: {result_memo} in {time_memo:.4f}s")
    print(f"  Speedup: {time_naive/time_memo:.1f}x faster\n")
    
    # Factorial
    print(f"Factorial(10) (memoized): {factorial_memoized(10)}")
    
    # Grid Traveler
    print(f"\nGrid Traveler (3x3) (memoized): {grid_traveler_memoized(3, 3)}")
    print(f"Grid Traveler (10x10) (memoized): {grid_traveler_memoized(10, 10)}")
    
    # Can Sum
    print(f"\nCan Sum (7, [2, 3]) (memoized): {can_sum_memoized(7, [2, 3])}")
    print(f"Can Sum (7, [5, 3, 4, 7]) (memoized): {can_sum_memoized(7, [5, 3, 4, 7])}")
    print(f"Can Sum (300, [7, 14]) (memoized): {can_sum_memoized(300, [7, 14])}")
    
    # How Sum
    print(f"\nHow Sum (7, [2, 3]) (memoized): {how_sum_memoized(7, [2, 3])}")
    print(f"How Sum (7, [5, 3, 4, 7]) (memoized): {how_sum_memoized(7, [5, 3, 4, 7])}")
    
    # Best Sum
    print(f"\nBest Sum (8, [2, 3, 5]) (memoized): {best_sum_memoized(8, [2, 3, 5])}")
    print(f"Best Sum (100, [1, 2, 5, 25]) (memoized): {best_sum_memoized(100, [1, 2, 5, 25])}")
    
    # Decorated function
    print(f"\nFibonacci(40) with decorator: {fibonacci_decorated(40)}")
    print("Note: Decorator automatically caches results for faster subsequent calls")

