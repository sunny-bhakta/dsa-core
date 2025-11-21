/**
 * Memoization Examples in Node.js
 * 
 * Memoization is an optimization technique that caches the results of expensive
 * function calls and returns the cached result when the same inputs occur again.
 * This is especially useful for recursive functions with overlapping subproblems.
 * 
 * Time complexity can be dramatically reduced (e.g., O(2^n) → O(n) for Fibonacci).
 */

/**
 * Fibonacci using Memoization (Top-down DP)
 * Time: O(n), Space: O(n)
 * Without memoization: O(2^n)
 * 
 * @param {number} n - Fibonacci number to compute
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {number} nth Fibonacci number
 */
function fibonacciMemoized(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }

    if (n <= 1) {
        return n;
    }

    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

/**
 * Factorial using Memoization
 * Time: O(n), Space: O(n)
 * 
 * @param {number} n - Number to compute factorial of
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {number} Factorial of n
 */
function factorialMemoized(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }

    if (n <= 1) {
        memo[n] = 1;
        return 1;
    }

    memo[n] = n * factorialMemoized(n - 1, memo);
    return memo[n];
}

/**
 * Grid Traveler - Number of ways to travel from (0,0) to (m-1, n-1)
 * Using Memoization
 * Time: O(m * n), Space: O(m * n)
 * Without memoization: O(2^(m+n))
 * 
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {number} Number of unique paths
 */
function gridTravelerMemoized(m, n, memo = {}) {
    const key = `${m},${n}`;
    if (key in memo) {
        return memo[key];
    }

    // Also check reverse (symmetric problem)
    const reverseKey = `${n},${m}`;
    if (reverseKey in memo) {
        return memo[reverseKey];
    }

    if (m === 1 && n === 1) {
        return 1;
    }
    if (m === 0 || n === 0) {
        return 0;
    }

    memo[key] = gridTravelerMemoized(m - 1, n, memo) + gridTravelerMemoized(m, n - 1, memo);
    return memo[key];
}

/**
 * Can Sum - Check if target can be achieved by summing numbers
 * Using Memoization
 * Time: O(target * len(numbers)), Space: O(target)
 * Without memoization: O(len(numbers)^target)
 * 
 * @param {number} target - Target sum
 * @param {number[]} numbers - List of numbers to use
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {boolean} True if target can be achieved, False otherwise
 */
function canSumMemoized(target, numbers, memo = {}) {
    if (target in memo) {
        return memo[target];
    }

    if (target === 0) {
        return true;
    }
    if (target < 0) {
        return false;
    }

    for (const num of numbers) {
        const remainder = target - num;
        if (canSumMemoized(remainder, numbers, memo)) {
            memo[target] = true;
            return true;
        }
    }

    memo[target] = false;
    return false;
}

/**
 * How Sum - Return one way to achieve target sum
 * Using Memoization
 * Time: O(target^2 * len(numbers)), Space: O(target^2)
 * 
 * @param {number} target - Target sum
 * @param {number[]} numbers - List of numbers to use
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {number[]|null} List of numbers that sum to target, or null
 */
function howSumMemoized(target, numbers, memo = {}) {
    if (target in memo) {
        return memo[target];
    }

    if (target === 0) {
        return [];
    }
    if (target < 0) {
        return null;
    }

    for (const num of numbers) {
        const remainder = target - num;
        const remainderResult = howSumMemoized(remainder, numbers, memo);
        if (remainderResult !== null) {
            memo[target] = [num, ...remainderResult];
            return memo[target];
        }
    }

    memo[target] = null;
    return null;
}

/**
 * Best Sum - Return shortest way to achieve target sum
 * Using Memoization
 * Time: O(target^2 * len(numbers)), Space: O(target^2)
 * 
 * @param {number} target - Target sum
 * @param {number[]} numbers - List of numbers to use
 * @param {Object} memo - Dictionary to cache results (default: {})
 * @returns {number[]|null} Shortest list of numbers that sum to target, or null
 */
function bestSumMemoized(target, numbers, memo = {}) {
    if (target in memo) {
        return memo[target];
    }

    if (target === 0) {
        return [];
    }
    if (target < 0) {
        return null;
    }

    let shortestCombination = null;

    for (const num of numbers) {
        const remainder = target - num;
        const remainderResult = bestSumMemoized(remainder, numbers, memo);
        if (remainderResult !== null) {
            const combination = [num, ...remainderResult];
            if (shortestCombination === null || combination.length < shortestCombination.length) {
                shortestCombination = combination;
            }
        }
    }

    memo[target] = shortestCombination;
    return shortestCombination;
}

/**
 * Memoization decorator
 * Automatically caches function results based on arguments
 * 
 * Usage:
 *   const memoizedFn = memoize((n) => {
 *       // ... expensive computation
 *   });
 * 
 * @param {Function} func - Function to memoize
 * @returns {Function} Memoized function
 */
function memoize(func) {
    const cache = {};

    function memoized(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    }

    memoized.cacheClear = () => {
        Object.keys(cache).forEach(key => delete cache[key]);
    };

    return memoized;
}

/**
 * Fibonacci with memoization decorator
 * Automatically cached by decorator
 */
const fibonacciDecorated = memoize(function (n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciDecorated(n - 1) + fibonacciDecorated(n - 2);
});

/**
 * Example of expensive computation that benefits from memoization
 */
const expensiveComputation = memoize(function (n) {
    if (n <= 1) {
        return n;
    }
    return expensiveComputation(n - 1) + expensiveComputation(n - 2) + n;
});

/**
 * Naive Fibonacci without memoization
 * Time: O(2^n) - Very slow for large n
 */
function fibonacciNaive(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Example usage
if (require.main === module) {
    console.log("=== MEMOIZATION EXAMPLES ===\n");

    // Fibonacci comparison
    const n = 35;
    console.log(`Computing Fibonacci(${n}):`);

    let start = Date.now();
    const resultNaive = fibonacciNaive(n);
    const timeNaive = (Date.now() - start) / 1000;
    console.log(`  Naive (no memoization): ${resultNaive} in ${timeNaive.toFixed(4)}s`);

    start = Date.now();
    const resultMemo = fibonacciMemoized(n);
    const timeMemo = (Date.now() - start) / 1000;
    console.log(`  With memoization: ${resultMemo} in ${timeMemo.toFixed(4)}s`);
    console.log(`  Speedup: ${(timeNaive / timeMemo).toFixed(1)}x faster\n`);

    // Factorial
    console.log(`Factorial(10) (memoized): ${factorialMemoized(10)}`);

    // Grid Traveler
    console.log(`\nGrid Traveler (3x3) (memoized): ${gridTravelerMemoized(3, 3)}`);
    console.log(`Grid Traveler (10x10) (memoized): ${gridTravelerMemoized(10, 10)}`);

    // Can Sum
    console.log(`\nCan Sum (7, [2, 3]) (memoized): ${canSumMemoized(7, [2, 3])}`);
    console.log(`Can Sum (7, [5, 3, 4, 7]) (memoized): ${canSumMemoized(7, [5, 3, 4, 7])}`);
    console.log(`Can Sum (300, [7, 14]) (memoized): ${canSumMemoized(300, [7, 14])}`);

    // How Sum
    console.log(`\nHow Sum (7, [2, 3]) (memoized): [${howSumMemoized(7, [2, 3])?.join(', ')}]`);
    console.log(`How Sum (7, [5, 3, 4, 7]) (memoized): [${howSumMemoized(7, [5, 3, 4, 7])?.join(', ')}]`);

    // Best Sum
    console.log(`\nBest Sum (8, [2, 3, 5]) (memoized): [${bestSumMemoized(8, [2, 3, 5])?.join(', ')}]`);
    console.log(`Best Sum (100, [1, 2, 5, 25]) (memoized): [${bestSumMemoized(100, [1, 2, 5, 25])?.join(', ')}]`);

    // Decorated function
    console.log(`\nFibonacci(40) with decorator: ${fibonacciDecorated(40)}`);
}

module.exports = {
    fibonacciMemoized,
    factorialMemoized,
    gridTravelerMemoized,
    canSumMemoized,
    howSumMemoized,
    bestSumMemoized,
    memoize,
    fibonacciDecorated,
    expensiveComputation,
    fibonacciNaive
};

