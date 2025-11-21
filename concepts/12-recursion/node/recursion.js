/**
 * Recursion Examples in Node.js
 */

/**
 * Factorial using recursion
 * Time: O(n), Space: O(n)
 */
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

/**
 * Fibonacci using recursion (inefficient)
 * Time: O(2^n), Space: O(n)
 */
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * Power function using recursion
 * Time: O(log n), Space: O(log n)
 */
function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    if (exponent < 0) {
        return 1 / power(base, -exponent);
    }

    const half = power(base, Math.floor(exponent / 2));
    if (exponent % 2 === 0) {
        return half * half;
    } else {
        return half * half * base;
    }
}

/**
 * Greatest Common Divisor using recursion
 * Time: O(log min(a, b)), Space: O(log min(a, b))
 */
function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

/**
 * Tower of Hanoi
 * Time: O(2^n), Space: O(n)
 */
function towerOfHanoi(n, source, destination, auxiliary) {
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${destination}`);
        return;
    }

    towerOfHanoi(n - 1, source, auxiliary, destination);
    console.log(`Move disk ${n} from ${source} to ${destination}`);
    towerOfHanoi(n - 1, auxiliary, destination, source);
}

/**
 * Generate all permutations
 * Time: O(n!), Space: O(n!)
 */
function generatePermutations(arr) {
    if (arr.length <= 1) {
        return [arr];
    }

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const perms = generatePermutations(rest);
        for (const perm of perms) {
            result.push([arr[i], ...perm]);
        }
    }

    return result;
}

/**
 * Generate all subsets
 * Time: O(2^n), Space: O(2^n)
 */
function generateSubsets(arr) {
    if (arr.length === 0) {
        return [[]];
    }

    const subsets = generateSubsets(arr.slice(1));
    return subsets.concat(subsets.map(subset => [arr[0], ...subset]));
}

/**
 * Binary search using recursion
 * Time: O(log n), Space: O(log n)
 */
function binarySearchRecursive(arr, target, left = 0, right = null) {
    if (right === null) {
        right = arr.length - 1;
    }

    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage
if (require.main === module) {
    console.log("Factorial(5):", factorial(5));
    console.log("Fibonacci(8):", fibonacciRecursive(8));
    console.log("Power(2, 10):", power(2, 10));
    console.log("GCD(48, 18):", gcd(48, 18));

    console.log("\nTower of Hanoi (3 disks):");
    towerOfHanoi(3, 'A', 'C', 'B');

    console.log("\nPermutations of [1, 2, 3]:");
    console.log(generatePermutations([1, 2, 3]));

    console.log("\nSubsets of [1, 2, 3]:");
    console.log(generateSubsets([1, 2, 3]));

    console.log("\nBinary search:", binarySearchRecursive([1, 3, 5, 7, 9], 5));

    // Tail Recursion Examples
    console.log("\n=== TAIL RECURSION ===");
    console.log("Factorial (tail recursive):", factorialTailRecursive(5));
    console.log("GCD (tail recursive):", gcdTailRecursive(48, 18));
    console.log("Sum array (tail recursive):", sumArrayTailRecursive([1, 2, 3, 4, 5]));
    console.log("Power (tail recursive):", powerTailRecursive(2, 10));

    // Memoization Examples
    console.log("\n=== MEMOIZATION ===");
    console.log("Fibonacci (memoized):", fibonacciMemoized(40));
    console.log("Factorial (memoized):", factorialMemoized(10));
    console.log("Grid Traveler (2x3):", gridTravelerMemoized(2, 3));
    console.log("Can Sum (7, [2, 3]):", canSumMemoized(7, [2, 3]));
    console.log("Fibonacci (decorated):", fibonacciDecorated(40));
}

// ========== TAIL RECURSION ==========

/**
 * Factorial using Tail Recursion
 * The recursive call is the last operation
 * Time: O(n), Space: O(1) if optimized by compiler
 */
function factorialTailRecursive(n, accumulator = 1) {
    if (n <= 1) {
        return accumulator;
    }
    return factorialTailRecursive(n - 1, n * accumulator);
}

/**
 * GCD using Tail Recursion
 * Time: O(log min(a, b)), Space: O(1) if optimized
 */
function gcdTailRecursive(a, b) {
    if (b === 0) {
        return a;
    }
    return gcdTailRecursive(b, a % b);
}

/**
 * Sum array using Tail Recursion
 * Time: O(n), Space: O(1) if optimized
 */
function sumArrayTailRecursive(arr, index = 0, accumulator = 0) {
    if (index >= arr.length) {
        return accumulator;
    }
    return sumArrayTailRecursive(arr, index + 1, accumulator + arr[index]);
}

/**
 * Power function using Tail Recursion
 * Time: O(log n), Space: O(1) if optimized
 */
function powerTailRecursive(base, exponent, accumulator = 1) {
    if (exponent === 0) {
        return accumulator;
    }
    if (exponent < 0) {
        return 1 / powerTailRecursive(base, -exponent, 1);
    }

    if (exponent % 2 === 0) {
        return powerTailRecursive(base * base, Math.floor(exponent / 2), accumulator);
    } else {
        return powerTailRecursive(base, exponent - 1, accumulator * base);
    }
}

// ========== MEMOIZATION ==========

/**
 * Fibonacci using Memoization (Top-down DP)
 * Time: O(n), Space: O(n)
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
 */
function gridTravelerMemoized(m, n, memo = {}) {
    const key = `${m},${n}`;
    if (key in memo) {
        return memo[key];
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
 * Memoization decorator
 * Automatically caches function results
 */
function memoize(func) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}

/**
 * Fibonacci with memoization decorator
 */
const fibonacciDecorated = memoize(function (n) {
    if (n <= 1) {
        return n;
    }
    return fibonacciDecorated(n - 1) + fibonacciDecorated(n - 2);
});

module.exports = {
    factorial,
    fibonacciRecursive,
    power,
    gcd,
    towerOfHanoi,
    generatePermutations,
    generateSubsets,
    binarySearchRecursive,
    factorialTailRecursive,
    gcdTailRecursive,
    sumArrayTailRecursive,
    powerTailRecursive,
    fibonacciMemoized,
    factorialMemoized,
    gridTravelerMemoized,
    canSumMemoized,
    fibonacciDecorated,
    memoize
};

