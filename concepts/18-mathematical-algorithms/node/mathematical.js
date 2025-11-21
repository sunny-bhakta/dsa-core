/**
 * Mathematical Algorithms in Node.js
 */

/**
 * Sieve of Eratosthenes - Find all primes up to n
 * Time: O(n log log n), Space: O(n)
 */
function sieveOfEratosthenes(n) {
    if (n < 2) {
        return [];
    }

    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }

    return primes;
}

/**
 * Greatest Common Divisor - Euclidean Algorithm
 * Time: O(log min(a, b)), Space: O(1)
 */
function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

/**
 * Extended Euclidean Algorithm
 * Returns [gcd, x, y] such that ax + by = gcd(a, b)
 */
function extendedGcd(a, b) {
    if (a === 0) {
        return [b, 0, 1];
    }

    const [gcdVal, x1, y1] = extendedGcd(b % a, a);
    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;

    return [gcdVal, x, y];
}

/**
 * Least Common Multiple
 * Time: O(log min(a, b)), Space: O(1)
 */
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

/**
 * Fast Exponentiation (Binary Exponentiation)
 * Time: O(log exponent), Space: O(1)
 */
function fastExponentiation(base, exponent, mod = null) {
    let result = 1;
    base = mod ? base % mod : base;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = mod ? (result * base) % mod : result * base;
        }
        exponent = Math.floor(exponent / 2);
        base = mod ? (base * base) % mod : base * base;
    }

    return result;
}

/**
 * Modular Inverse using Extended Euclidean
 * Returns x such that (a * x) % m = 1
 */
function modularInverse(a, m) {
    const [gcdVal, x] = extendedGcd(a, m);
    if (gcdVal !== 1) {
        return null; // Inverse doesn't exist
    }
    return ((x % m) + m) % m;
}

/**
 * Prime Factorization
 * Time: O(√n), Space: O(log n)
 */
function primeFactors(n) {
    const factors = [];
    let d = 2;

    while (d * d <= n) {
        while (n % d === 0) {
            factors.push(d);
            n = Math.floor(n / d);
        }
        d++;
    }

    if (n > 1) {
        factors.push(n);
    }

    return factors;
}

/**
 * Fibonacci - Iterative
 * Time: O(n), Space: O(1)
 */
function fibonacciIterative(n) {
    if (n <= 1) {
        return n;
    }

    let prev2 = 0;
    let prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Factorial
 * Time: O(n), Space: O(1)
 */
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Binomial Coefficient C(n, k)
 * Time: O(min(k, n-k)), Space: O(1)
 */
function binomialCoefficient(n, k) {
    if (k > n - k) {
        k = n - k;
    }

    let result = 1;
    for (let i = 0; i < k; i++) {
        result = result * (n - i) / (i + 1);
    }

    return result;
}

/**
 * Chinese Remainder Theorem
 * Solve: x ≡ remainders[i] (mod moduli[i])
 * Returns smallest non-negative solution
 * Time: O(n log M) where M is product of moduli, Space: O(1)
 */
function chineseRemainderTheorem(remainders, moduli) {
    if (remainders.length !== moduli.length) {
        throw new Error("Number of remainders must equal number of moduli");
    }

    // Calculate product of all moduli
    let prod = 1;
    for (const m of moduli) {
        prod *= m;
    }

    let result = 0;
    for (let i = 0; i < remainders.length; i++) {
        const mi = Math.floor(prod / moduli[i]);
        const [, inv] = extendedGcd(mi, moduli[i]);
        // Ensure inv is positive
        const positiveInv = ((inv % moduli[i]) + moduli[i]) % moduli[i];
        result += remainders[i] * positiveInv * mi;
    }

    return result % prod;
}

// Example usage
if (require.main === module) {
    console.log("Primes up to 30:", sieveOfEratosthenes(30));
    console.log("GCD(48, 18):", gcd(48, 18));
    console.log("LCM(12, 18):", lcm(12, 18));
    console.log("2^10:", fastExponentiation(2, 10));
    console.log("2^10 mod 7:", fastExponentiation(2, 10, 7));
    console.log("Prime factors of 60:", primeFactors(60));
    console.log("Fibonacci(10):", fibonacciIterative(10));
    console.log("Factorial(5):", factorial(5));
    console.log("C(5,2):", binomialCoefficient(5, 2));
    console.log("Modular inverse of 3 mod 11:", modularInverse(3, 11));

    // Chinese Remainder Theorem
    console.log("\n--- Chinese Remainder Theorem ---");
    // Example: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)
    // Solution: x = 23
    const remainders = [2, 3, 2];
    const moduli = [3, 5, 7];
    const result = chineseRemainderTheorem(remainders, moduli);
    console.log(`x ≡ [${remainders.join(', ')}] (mod [${moduli.join(', ')}])`);
    console.log(`Solution: x = ${result}`);
    // Verify
    for (let i = 0; i < remainders.length; i++) {
        console.log(`  ${result} mod ${moduli[i]} = ${result % moduli[i]} (expected ${remainders[i]})`);
    }
}

module.exports = {
    sieveOfEratosthenes,
    gcd,
    extendedGcd,
    lcm,
    fastExponentiation,
    modularInverse,
    primeFactors,
    fibonacciIterative,
    factorial,
    binomialCoefficient,
    chineseRemainderTheorem
};

