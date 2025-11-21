/**
 * Bit Manipulation in Node.js
 */

/**
 * Count number of set bits (Brian Kernighan's algorithm)
 * Time: O(log n), Space: O(1)
 */
function countSetBits(n) {
    let count = 0;
    while (n) {
        n &= n - 1; // Remove rightmost set bit
        count++;
    }
    return count;
}

/**
 * Check if number is power of 2
 * Time: O(1), Space: O(1)
 */
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Get position of rightmost set bit
 * Time: O(1), Space: O(1)
 */
function getRightmostSetBit(n) {
    return n & -n;
}

/**
 * Find single number (others appear twice)
 * Time: O(n), Space: O(1)
 */
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}

/**
 * Find two single numbers (others appear twice)
 * Time: O(n), Space: O(1)
 */
function singleNumberIII(nums) {
    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }

    // Get rightmost set bit
    const rightmost = xor & -xor;

    let num1 = 0, num2 = 0;
    for (const num of nums) {
        if (num & rightmost) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }

    return [num1, num2];
}

/**
 * Reverse bits of 32-bit number
 * Time: O(1), Space: O(1)
 */
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result |= n & 1;
        n >>= 1;
    }
    return result >>> 0; // Convert to unsigned
}

/**
 * Bitwise AND of numbers in range [m, n]
 * Time: O(log n), Space: O(1)
 */
function bitwiseAndRange(m, n) {
    let shift = 0;
    while (m < n) {
        m >>= 1;
        n >>= 1;
        shift++;
    }
    return m << shift;
}

/**
 * Swap two numbers without temporary variable
 * Time: O(1), Space: O(1)
 */
function swapWithoutTemp(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    return [a, b];
}

/**
 * Add two numbers without + operator
 * Time: O(1), Space: O(1)
 */
function addWithoutPlus(a, b) {
    while (b !== 0) {
        const carry = a & b;
        a = a ^ b;
        b = carry << 1;
    }
    return a;
}

/**
 * Find missing number in range [0, n]
 * Time: O(n), Space: O(1)
 */
function missingNumber(nums, n) {
    let result = n;
    for (let i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}

// Example usage
if (require.main === module) {
    console.log("Count set bits in 15:", countSetBits(15));
    console.log("Is 16 power of 2:", isPowerOfTwo(16));
    console.log("Rightmost set bit of 12:", getRightmostSetBit(12));
    console.log("Single number:", singleNumber([4, 1, 2, 1, 2]));
    console.log("Two single numbers:", singleNumberIII([1, 2, 1, 3, 2, 5]));
    console.log("Bitwise AND range [5,7]:", bitwiseAndRange(5, 7));
    let a = 5, b = 7;
    [a, b] = swapWithoutTemp(a, b);
    console.log("Swap 5 and 7:", a, b);
    console.log("Add 15 + 27:", addWithoutPlus(15, 27));
    console.log("Missing number:", missingNumber([3, 0, 1], 3));
}

module.exports = {
    countSetBits,
    isPowerOfTwo,
    getRightmostSetBit,
    singleNumber,
    singleNumberIII,
    reverseBits,
    bitwiseAndRange,
    swapWithoutTemp,
    addWithoutPlus,
    missingNumber
};

