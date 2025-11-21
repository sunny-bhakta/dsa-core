"""
Mathematical Algorithms in Python
"""

def sieve_of_eratosthenes(n):
    """
    Sieve of Eratosthenes - Find all primes up to n
    Time: O(n log log n), Space: O(n)
    """
    if n < 2:
        return []
    
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    
    return [i for i in range(2, n + 1) if is_prime[i]]


def gcd(a, b):
    """
    Greatest Common Divisor - Euclidean Algorithm
    Time: O(log min(a, b)), Space: O(1)
    """
    while b:
        a, b = b, a % b
    return abs(a)


def extended_gcd(a, b):
    """
    Extended Euclidean Algorithm
    Returns (gcd, x, y) such that ax + by = gcd(a, b)
    """
    if a == 0:
        return b, 0, 1
    
    gcd_val, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    
    return gcd_val, x, y


def lcm(a, b):
    """
    Least Common Multiple
    Time: O(log min(a, b)), Space: O(1)
    """
    return abs(a * b) // gcd(a, b)


def fast_exponentiation(base, exponent, mod=None):
    """
    Fast Exponentiation (Binary Exponentiation)
    Time: O(log exponent), Space: O(1)
    """
    result = 1
    base = base % mod if mod else base
    
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % mod if mod else result * base
        exponent //= 2
        base = (base * base) % mod if mod else base * base
    
    return result


def modular_inverse(a, m):
    """
    Modular Inverse using Extended Euclidean
    Returns x such that (a * x) % m = 1
    """
    gcd_val, x, _ = extended_gcd(a, m)
    if gcd_val != 1:
        return None  # Inverse doesn't exist
    return (x % m + m) % m


def prime_factors(n):
    """
    Prime Factorization
    Time: O(√n), Space: O(log n)
    """
    factors = []
    d = 2
    
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    
    if n > 1:
        factors.append(n)
    
    return factors


def fibonacci_iterative(n):
    """
    Fibonacci - Iterative
    Time: O(n), Space: O(1)
    """
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1


def fibonacci_matrix(n):
    """
    Fibonacci using Matrix Exponentiation
    Time: O(log n), Space: O(1)
    """
    def matrix_multiply(A, B):
        return [[A[0][0] * B[0][0] + A[0][1] * B[1][0],
                 A[0][0] * B[0][1] + A[0][1] * B[1][1]],
                [A[1][0] * B[0][0] + A[1][1] * B[1][0],
                 A[1][0] * B[0][1] + A[1][1] * B[1][1]]]
    
    def matrix_power(matrix, n):
        if n == 1:
            return matrix
        if n % 2 == 0:
            half = matrix_power(matrix, n // 2)
            return matrix_multiply(half, half)
        else:
            return matrix_multiply(matrix, matrix_power(matrix, n - 1))
    
    if n <= 1:
        return n
    
    base = [[1, 1], [1, 0]]
    result = matrix_power(base, n - 1)
    return result[0][0]


def factorial(n):
    """
    Factorial
    Time: O(n), Space: O(1)
    """
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


def binomial_coefficient(n, k):
    """
    Binomial Coefficient C(n, k)
    Time: O(min(k, n-k)), Space: O(1)
    """
    if k > n - k:
        k = n - k
    
    result = 1
    for i in range(k):
        result = result * (n - i) // (i + 1)
    
    return result


def chinese_remainder_theorem(remainders, moduli):
    """
    Chinese Remainder Theorem
    Solve: x ≡ remainders[i] (mod moduli[i])
    Returns smallest non-negative solution
    Time: O(n log M) where M is product of moduli, Space: O(1)
    """
    def extended_gcd(a, b):
        if a == 0:
            return b, 0, 1
        gcd_val, x1, y1 = extended_gcd(b % a, a)
        x = y1 - (b // a) * x1
        y = x1
        return gcd_val, x, y
    
    n = len(remainders)
    if n != len(moduli):
        raise ValueError("Number of remainders must equal number of moduli")
    
    # Calculate product of all moduli
    prod = 1
    for m in moduli:
        prod *= m
    
    result = 0
    for i in range(n):
        mi = prod // moduli[i]
        _, inv, _ = extended_gcd(mi, moduli[i])
        # Ensure inv is positive
        inv = (inv % moduli[i] + moduli[i]) % moduli[i]
        result += remainders[i] * inv * mi
    
    return result % prod


# Example usage
if __name__ == "__main__":
    print("Primes up to 30:", sieve_of_eratosthenes(30))
    print("GCD(48, 18):", gcd(48, 18))
    print("LCM(12, 18):", lcm(12, 18))
    print("2^10:", fast_exponentiation(2, 10))
    print("2^10 mod 7:", fast_exponentiation(2, 10, 7))
    print("Prime factors of 60:", prime_factors(60))
    print("Fibonacci(10):", fibonacci_iterative(10))
    print("Fibonacci matrix(10):", fibonacci_matrix(10))
    print("Factorial(5):", factorial(5))
    print("C(5,2):", binomial_coefficient(5, 2))
    print("Modular inverse of 3 mod 11:", modular_inverse(3, 11))
    
    # Chinese Remainder Theorem
    print("\n--- Chinese Remainder Theorem ---")
    # Example: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)
    # Solution: x = 23
    remainders = [2, 3, 2]
    moduli = [3, 5, 7]
    result = chinese_remainder_theorem(remainders, moduli)
    print(f"x ≡ {remainders} (mod {moduli})")
    print(f"Solution: x = {result}")
    # Verify
    for i in range(len(remainders)):
        print(f"  {result} mod {moduli[i]} = {result % moduli[i]} (expected {remainders[i]})")

