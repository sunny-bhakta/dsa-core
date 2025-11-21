"""
Tail Recursion Examples in Python

Tail recursion is a special form of recursion where the recursive call is the last
operation in the function. This allows compilers/interpreters to optimize it to
iteration, reducing stack space from O(n) to O(1).

Note: Python doesn't optimize tail recursion by default, but the pattern is still
useful for understanding and can be optimized manually or with decorators.
"""

def factorial_tail_recursive(n, accumulator=1):
    """
    Factorial using Tail Recursion
    The recursive call is the last operation
    Time: O(n), Space: O(1) if optimized by compiler
    
    Args:
        n: Number to compute factorial of
        accumulator: Accumulates the result (default: 1)
    
    Returns:
        Factorial of n
    """
    if n <= 1:
        return accumulator
    return factorial_tail_recursive(n - 1, n * accumulator)


def gcd_tail_recursive(a, b):
    """
    GCD using Tail Recursion
    Time: O(log min(a, b)), Space: O(1) if optimized
    
    Args:
        a: First number
        b: Second number
    
    Returns:
        Greatest Common Divisor of a and b
    """
    if b == 0:
        return a
    return gcd_tail_recursive(b, a % b)


def sum_array_tail_recursive(arr, index=0, accumulator=0):
    """
    Sum array using Tail Recursion
    Time: O(n), Space: O(1) if optimized
    
    Args:
        arr: Array of numbers
        index: Current index (default: 0)
        accumulator: Running sum (default: 0)
    
    Returns:
        Sum of all elements in array
    """
    if index >= len(arr):
        return accumulator
    return sum_array_tail_recursive(arr, index + 1, accumulator + arr[index])


def power_tail_recursive(base, exponent, accumulator=1):
    """
    Power function using Tail Recursion
    Time: O(log n), Space: O(1) if optimized
    
    Args:
        base: Base number
        exponent: Exponent
        accumulator: Accumulates the result (default: 1)
    
    Returns:
        base raised to the power of exponent
    """
    if exponent == 0:
        return accumulator
    if exponent < 0:
        return 1 / power_tail_recursive(base, -exponent, 1)
    
    if exponent % 2 == 0:
        return power_tail_recursive(base * base, exponent // 2, accumulator)
    else:
        return power_tail_recursive(base, exponent - 1, accumulator * base)


def reverse_string_tail_recursive(s, index=0, result=""):
    """
    Reverse string using Tail Recursion
    Time: O(n), Space: O(1) if optimized
    
    Args:
        s: String to reverse
        index: Current index (default: 0)
        result: Accumulated reversed string (default: "")
    
    Returns:
        Reversed string
    """
    if index >= len(s):
        return result
    return reverse_string_tail_recursive(s, index + 1, s[index] + result)


def count_digits_tail_recursive(n, count=0):
    """
    Count digits in a number using Tail Recursion
    Time: O(log n), Space: O(1) if optimized
    
    Args:
        n: Number
        count: Current count (default: 0)
    
    Returns:
        Number of digits
    """
    if n == 0:
        return count if count > 0 else 1  # Handle case when n is 0
    return count_digits_tail_recursive(n // 10, count + 1)


def is_palindrome_tail_recursive(s, left=0, right=None):
    """
    Check if string is palindrome using Tail Recursion
    Time: O(n), Space: O(1) if optimized
    
    Args:
        s: String to check
        left: Left index (default: 0)
        right: Right index (default: None, set to len(s) - 1)
    
    Returns:
        True if palindrome, False otherwise
    """
    if right is None:
        right = len(s) - 1
    
    if left >= right:
        return True
    
    if s[left] != s[right]:
        return False
    
    return is_palindrome_tail_recursive(s, left + 1, right - 1)


# Comparison: Regular vs Tail Recursion
def factorial_regular(n):
    """
    Regular Recursion (NOT tail recursive)
    Operation happens AFTER recursive call
    """
    if n <= 1:
        return 1
    return n * factorial_regular(n - 1)  # Multiplication after recursion


# Example usage
if __name__ == "__main__":
    print("=== TAIL RECURSION EXAMPLES ===\n")
    
    # Factorial
    print(f"Factorial(5) (tail recursive): {factorial_tail_recursive(5)}")
    print(f"Factorial(5) (regular): {factorial_regular(5)}")
    
    # GCD
    print(f"\nGCD(48, 18) (tail recursive): {gcd_tail_recursive(48, 18)}")
    
    # Sum Array
    arr = [1, 2, 3, 4, 5]
    print(f"\nSum of {arr} (tail recursive): {sum_array_tail_recursive(arr)}")
    
    # Power
    print(f"\n2^10 (tail recursive): {power_tail_recursive(2, 10)}")
    print(f"2^-3 (tail recursive): {power_tail_recursive(2, -3)}")
    
    # Reverse String
    s = "hello"
    print(f"\nReverse of '{s}' (tail recursive): {reverse_string_tail_recursive(s)}")
    
    # Count Digits
    num = 12345
    print(f"\nDigits in {num} (tail recursive): {count_digits_tail_recursive(num)}")
    
    # Palindrome Check
    test_strings = ["racecar", "hello", "madam"]
    for test in test_strings:
        result = is_palindrome_tail_recursive(test)
        print(f"\n'{test}' is palindrome: {result}")

