/**
 * Tail Recursion Examples in Node.js
 * 
 * Tail recursion is a special form of recursion where the recursive call is the last
 * operation in the function. This allows compilers/interpreters to optimize it to
 * iteration, reducing stack space from O(n) to O(1).
 * 
 * Note: JavaScript (V8) doesn't optimize tail recursion by default, but the pattern
 * is still useful for understanding and can be optimized manually or with decorators.
 */

/**
 * Factorial using Tail Recursion
 * The recursive call is the last operation
 * Time: O(n), Space: O(1) if optimized by compiler
 * 
 * @param {number} n - Number to compute factorial of
 * @param {number} accumulator - Accumulates the result (default: 1)
 * @returns {number} Factorial of n
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
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Greatest Common Divisor of a and b
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
 * 
 * @param {number[]} arr - Array of numbers
 * @param {number} index - Current index (default: 0)
 * @param {number} accumulator - Running sum (default: 0)
 * @returns {number} Sum of all elements in array
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
 * 
 * @param {number} base - Base number
 * @param {number} exponent - Exponent
 * @param {number} accumulator - Accumulates the result (default: 1)
 * @returns {number} base raised to the power of exponent
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

/**
 * Reverse string using Tail Recursion
 * Time: O(n), Space: O(1) if optimized
 * 
 * @param {string} s - String to reverse
 * @param {number} index - Current index (default: 0)
 * @param {string} result - Accumulated reversed string (default: "")
 * @returns {string} Reversed string
 */
function reverseStringTailRecursive(s, index = 0, result = "") {
    if (index >= s.length) {
        return result;
    }
    return reverseStringTailRecursive(s, index + 1, s[index] + result);
}

/**
 * Count digits in a number using Tail Recursion
 * Time: O(log n), Space: O(1) if optimized
 * 
 * @param {number} n - Number
 * @param {number} count - Current count (default: 0)
 * @returns {number} Number of digits
 */
function countDigitsTailRecursive(n, count = 0) {
    if (n === 0) {
        return count > 0 ? count : 1; // Handle case when n is 0
    }
    return countDigitsTailRecursive(Math.floor(n / 10), count + 1);
}

/**
 * Check if string is palindrome using Tail Recursion
 * Time: O(n), Space: O(1) if optimized
 * 
 * @param {string} s - String to check
 * @param {number} left - Left index (default: 0)
 * @param {number} right - Right index (default: undefined, set to s.length - 1)
 * @returns {boolean} True if palindrome, False otherwise
 */
function isPalindromeTailRecursive(s, left = 0, right = undefined) {
    if (right === undefined) {
        right = s.length - 1;
    }

    if (left >= right) {
        return true;
    }

    if (s[left] !== s[right]) {
        return false;
    }

    return isPalindromeTailRecursive(s, left + 1, right - 1);
}

/**
 * Regular Recursion (NOT tail recursive)
 * Operation happens AFTER recursive call
 */
function factorialRegular(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorialRegular(n - 1); // Multiplication after recursion
}

// Example usage
if (require.main === module) {
    console.log("=== TAIL RECURSION EXAMPLES ===\n");

    // Factorial
    console.log(`Factorial(5) (tail recursive): ${factorialTailRecursive(5)}`);
    console.log(`Factorial(5) (regular): ${factorialRegular(5)}`);

    // GCD
    console.log(`\nGCD(48, 18) (tail recursive): ${gcdTailRecursive(48, 18)}`);

    // Sum Array
    const arr = [1, 2, 3, 4, 5];
    console.log(`\nSum of [${arr.join(', ')}] (tail recursive): ${sumArrayTailRecursive(arr)}`);

    // Power
    console.log(`\n2^10 (tail recursive): ${powerTailRecursive(2, 10)}`);
    console.log(`2^-3 (tail recursive): ${powerTailRecursive(2, -3)}`);

    // Reverse String
    const s = "hello";
    console.log(`\nReverse of '${s}' (tail recursive): ${reverseStringTailRecursive(s)}`);

    // Count Digits
    const num = 12345;
    console.log(`\nDigits in ${num} (tail recursive): ${countDigitsTailRecursive(num)}`);

    // Palindrome Check
    const testStrings = ["racecar", "hello", "madam"];
    for (const test of testStrings) {
        const result = isPalindromeTailRecursive(test);
        console.log(`\n'${test}' is palindrome: ${result}`);
    }
}

module.exports = {
    factorialTailRecursive,
    gcdTailRecursive,
    sumArrayTailRecursive,
    powerTailRecursive,
    reverseStringTailRecursive,
    countDigitsTailRecursive,
    isPalindromeTailRecursive,
    factorialRegular
};

